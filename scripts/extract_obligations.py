#!/usr/bin/env python3
"""Extract obligations from normalized norm paragraphs using an LLM."""

from __future__ import annotations

import argparse
import asyncio
import csv
import json
import shutil
import subprocess
from collections import defaultdict
from pathlib import Path
from typing import Union

import httpx
from openai import (
    APIConnectionError,
    APITimeoutError,
    AsyncOpenAI,
    InternalServerError,
    RateLimitError,
)

from laws_paths import LAW_PATHS
from pipeline_models import (
    OBLIGATION_CSV_COLUMNS,
    NormParagraph,
    ObligationExtraction,
)
from reference_sort import reference_sort_key

ROOT_DIR = Path(__file__).resolve().parents[1]
DEFAULT_PROGRESS_FILE = ROOT_DIR / "data" / "laws" / "cache" / "extraction_progress.json"
DEFAULT_PROMPT_FILE = Path(__file__).with_name("pflichten_prompt.txt")

LANGDOCK_OPENAI_BASE_URL = "https://api.langdock.com/openai/eu/v1"
LANGDOCK_GOOGLE_BASE_URL = "https://api.langdock.com/google/eu/v1beta"
DEFAULT_MODEL = "gpt-5.4-mini"
# "low" keeps worst-case paragraphs at ~10-15s with recall on par with much
# slower settings; "none" is faster but misses obligations.
DEFAULT_REASONING_EFFORT = "low"
DEFAULT_TEMPERATURE = 0.0
DEFAULT_SEED = 42
DEFAULT_MAX_CONCURRENCY = 5
DEFAULT_MAX_RETRIES = 5
# Amendment regulations can embed entire other laws as a single "paragraph" (80k+ chars).
# These are not processable in a single LLM call; truncate with a warning.
MAX_PARAGRAPH_CHARS = 8000

CSV_COLUMNS = OBLIGATION_CSV_COLUMNS

AnyClient = Union[AsyncOpenAI, httpx.AsyncClient]


def is_gemini_model(model: str) -> bool:
    return model.startswith("gemini-")


def _build_gemini_response_schema() -> dict:
    """Return an inlined JSON Schema for ObligationExtraction (no $defs/$ref).

    Gemini's responseSchema implementation does not reliably resolve $ref
    pointers, so we inline all sub-schemas manually.
    """
    norm_adressat_enum = [
        "Bürgerinnen und Bürger",
        "Wirtschaft",
        "Öffentliche Verwaltung",
    ]
    art_der_vorgabe_enum = [
        "Informationspflicht",
        "Handlungspflicht",
        "Unterlassungspflicht",
        "Duldungs-/Mitwirkungspflicht",
    ]
    return {
        "type": "object",
        "properties": {
            "obligations": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "referenz": {"type": "string"},
                        "art_der_vorgabe": {
                            "type": "string",
                            "enum": art_der_vorgabe_enum,
                        },
                        "pflichtstaerke": {
                            "type": "string",
                            "enum": ["muss", "soll"],
                        },
                        "normadressat_kategorie": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "enum": norm_adressat_enum,
                            },
                        },
                        "normadressat_text": {"type": "string"},
                        "zitat": {"type": "string"},
                        "vorgabe_zusammenfassung": {"type": "string"},
                        "sprachlicher_indikator": {"type": "string"},
                        "konfidenz": {"type": "number"},
                    },
                    "required": [
                        "referenz",
                        "art_der_vorgabe",
                        "pflichtstaerke",
                        "normadressat_kategorie",
                        "normadressat_text",
                        "zitat",
                        "vorgabe_zusammenfassung",
                        "sprachlicher_indikator",
                        "konfidenz",
                    ],
                },
            }
        },
        "required": ["obligations"],
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract obligations per paragraph and write per-law CSV files."
    )
    parser.add_argument("--in-file", default=str(LAW_PATHS["norm_paragraphs_file"]))
    parser.add_argument("--out-dir", default=str(LAW_PATHS["obligations_dir"]))
    parser.add_argument("--progress-file", default=str(DEFAULT_PROGRESS_FILE))
    parser.add_argument("--prompt-file", default=str(DEFAULT_PROMPT_FILE))
    parser.add_argument(
        "--norm",
        action="append",
        metavar="ABBREV",
        help="Process only these law abbreviations. Repeat and/or use comma-separated "
        "values, e.g. --norm BDSG --norm OZG or --norm BDSG,OZG,32016R0679",
    )
    parser.add_argument(
        "--norms-file",
        metavar="PATH",
        help="Text file with one law abbreviation per line (# starts a comment). "
        "Laws are processed sequentially in file order.",
    )
    parser.add_argument(
        "--rerun",
        action="store_true",
        help="Discard existing checkpoint entries and output CSV rows for the targeted "
        "law(s) before extracting again. Requires --norm or --norms-file when no "
        "--progress-file is given to avoid accidentally wiping all progress.",
    )
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument(
        "--reasoning-effort",
        default=DEFAULT_REASONING_EFFORT,
        help="Reasoning effort for GPT-5 models (e.g. none, low, medium). "
        "Pass an empty string to omit the parameter. Ignored for Gemini models.",
    )
    parser.add_argument("--temperature", type=float, default=DEFAULT_TEMPERATURE)
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    parser.add_argument("--max-concurrency", type=int, default=DEFAULT_MAX_CONCURRENCY)
    parser.add_argument("--max-retries", type=int, default=DEFAULT_MAX_RETRIES)
    return parser.parse_args()


def get_langdock_token() -> str:
    op_path = shutil.which("op")
    if not op_path:
        raise SystemExit(
            "1Password CLI ('op') is required for Langdock access but was not found on PATH."
        )

    print("Retrieving Langdock API key from 1Password...")
    try:
        result = subprocess.run(
            [op_path, "read", "op://Employee/Langdock token/password"],
            capture_output=True,
            text=True,
            check=True,
        )
    except subprocess.CalledProcessError as exc:
        error_text = (exc.stderr or "").strip() or "Unknown 1Password CLI error"
        raise SystemExit(
            "Could not read Langdock token from 1Password. "
            "Run 'op signin' and ensure item 'Langdock token' exists in vault 'Employee' "
            "with field 'password'. "
            f"op error: {error_text}"
        ) from exc

    token = result.stdout.strip()
    if token:
        print("Using Langdock API key from 1Password.")
        return token

    raise SystemExit("Received empty Langdock token from 1Password item.")


def load_prompt(prompt_file: Path) -> str:
    if not prompt_file.exists():
        raise SystemExit(f"Prompt file not found: {prompt_file}")
    return prompt_file.read_text(encoding="utf-8")


def collect_norm_filters(norm_args: list[str] | None, norms_file: str | None) -> list[str] | None:
    """Return ordered unique law abbreviations from CLI flags and/or a norms file."""
    result: list[str] = []
    seen: set[str] = set()

    def add(value: str) -> None:
        value = value.strip()
        if value and value not in seen:
            seen.add(value)
            result.append(value)

    if norm_args:
        for arg in norm_args:
            for part in arg.split(","):
                add(part)

    if norms_file:
        path = Path(norms_file)
        if not path.exists():
            raise SystemExit(f"Norms file not found: {path}")
        for line in path.read_text(encoding="utf-8").splitlines():
            add(line.split("#", 1)[0])

    return result if result else None


def load_paragraphs(
    in_file: Path, norm_filters: set[str] | None
) -> dict[str, list[NormParagraph]]:
    if not in_file.exists():
        raise SystemExit(f"Input file not found: {in_file}")

    grouped: dict[str, list[NormParagraph]] = defaultdict(list)
    with in_file.open("r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line:
                continue
            paragraph = NormParagraph.model_validate_json(line)
            if norm_filters and paragraph.law_abbrev not in norm_filters:
                continue
            grouped[paragraph.law_abbrev].append(paragraph)

    for law_abbrev in grouped:
        grouped[law_abbrev].sort(
            key=lambda item: (reference_sort_key(item.reference), item.paragraph_id)
        )

    return dict(sorted(grouped.items(), key=lambda item: item[0]))


def load_progress(progress_file: Path) -> dict[str, bool]:
    if not progress_file.exists():
        return {}

    with progress_file.open("r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, dict):
        raise SystemExit(f"Invalid progress file format in {progress_file}")

    return {str(key): bool(value) for key, value in data.items()}


def save_progress(progress_file: Path, progress: dict[str, bool]) -> None:
    progress_file.parent.mkdir(parents=True, exist_ok=True)
    tmp_file = progress_file.with_suffix(progress_file.suffix + ".tmp")
    with tmp_file.open("w", encoding="utf-8") as f:
        json.dump(progress, f, ensure_ascii=False, indent=2, sort_keys=True)
    tmp_file.replace(progress_file)


def ensure_csv_file(out_file: Path) -> None:
    out_file.parent.mkdir(parents=True, exist_ok=True)
    if out_file.exists() and out_file.stat().st_size > 0:
        return

    with out_file.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS, delimiter=";")
        writer.writeheader()


def append_rows(out_file: Path, rows: list[dict[str, str]]) -> None:
    if not rows:
        return

    with out_file.open("a", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS, delimiter=";")
        writer.writerows(rows)


def build_reference(paragraph_reference: str, obligation_reference: str) -> str:
    sub_reference = obligation_reference.strip()
    if not sub_reference:
        return paragraph_reference
    if sub_reference.lower().startswith(paragraph_reference.lower()):
        return sub_reference
    return f"{paragraph_reference} {sub_reference}"


def obligation_to_row(paragraph: NormParagraph, obligation) -> dict[str, str]:
    return {
        "norm": paragraph.law_abbrev,
        "quelle": paragraph.url,
        "referenz": build_reference(paragraph.reference, obligation.referenz),
        "art_der_vorgabe": obligation.art_der_vorgabe,
        "pflichtstaerke": obligation.pflichtstaerke,
        "sprachlicher_indikator": obligation.sprachlicher_indikator,
        "normadressat_kategorie": ", ".join(obligation.normadressat_kategorie),
        "normadressat_text": obligation.normadressat_text,
        "zitat": obligation.zitat,
        "vorgabe_zusammenfassung": obligation.vorgabe_zusammenfassung,
    }


def _truncate_text(paragraph: NormParagraph) -> str:
    text = paragraph.text
    if len(text) > MAX_PARAGRAPH_CHARS:
        print(
            f"  WARNING: {paragraph.paragraph_id} text truncated "
            f"({len(text)} -> {MAX_PARAGRAPH_CHARS} chars). "
            "Likely an amendment article embedding a full law — obligations near the end will be missed."
        )
        return text[:MAX_PARAGRAPH_CHARS] + "\n[… Text gekürzt]"
    return text


async def _extract_openai(
    client: AsyncOpenAI,
    prompt: str,
    paragraph: NormParagraph,
    model: str,
    temperature: float,
    seed: int,
    max_retries: int,
    reasoning_effort: str,
) -> ObligationExtraction:
    user_input = (
        f"Rechtsakt: {paragraph.law_abbrev}\n"
        f"Quelle: {paragraph.source}\n"
        f"Referenz: {paragraph.reference}\n"
        f"URL: {paragraph.url}\n\n"
        f"Text:\n{_truncate_text(paragraph)}"
    )

    extra_kwargs = {}
    if reasoning_effort:
        extra_kwargs["reasoning_effort"] = reasoning_effort

    for attempt in range(max_retries):
        try:
            completion = await client.beta.chat.completions.parse(
                model=model,
                temperature=temperature,
                seed=seed,
                messages=[
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": user_input},
                ],
                response_format=ObligationExtraction,
                **extra_kwargs,
            )
            parsed = completion.choices[0].message.parsed
            if parsed is None:
                raise ValueError(
                    f"No structured response for paragraph_id={paragraph.paragraph_id}"
                )
            return parsed
        except (RateLimitError, APIConnectionError, APITimeoutError, InternalServerError) as exc:
            if attempt >= max_retries - 1:
                raise
            wait_seconds = min(30.0, 5 * (2**attempt))
            print(
                f"Retrying paragraph_id={paragraph.paragraph_id} after {type(exc).__name__} "
                f"(attempt {attempt + 1}/{max_retries}, wait {wait_seconds:.1f}s)."
            )
            await asyncio.sleep(wait_seconds)

    raise RuntimeError("Unexpected retry loop exit")


async def _extract_gemini(
    client: httpx.AsyncClient,
    prompt: str,
    paragraph: NormParagraph,
    model: str,
    temperature: float,
    max_retries: int,
) -> ObligationExtraction:
    user_input = (
        f"Rechtsakt: {paragraph.law_abbrev}\n"
        f"Quelle: {paragraph.source}\n"
        f"Referenz: {paragraph.reference}\n"
        f"URL: {paragraph.url}\n\n"
        f"Text:\n{_truncate_text(paragraph)}"
    )

    generation_config: dict = {
        "temperature": temperature,
        "responseMimeType": "application/json",
        "responseSchema": _build_gemini_response_schema(),
    }
    if model.startswith("gemini-2"):
        # Disable thinking for speed. NOTE: As of 2026-06 Langdock strips
        # thinkingConfig from generationConfig before forwarding to Vertex,
        # so this has no effect yet — kept so it applies once Langdock
        # passes it through. (Gemini 3.x models reject thinkingBudget.)
        generation_config["thinkingConfig"] = {"thinkingBudget": 0}

    payload = {
        "model": model,
        "systemInstruction": {
            "role": "system",
            "parts": [{"text": prompt}],
        },
        "contents": [
            {
                "role": "user",
                "parts": [{"text": user_input}],
            }
        ],
        "generationConfig": generation_config,
    }

    url = f"{LANGDOCK_GOOGLE_BASE_URL}/models/{model}:generateContent"

    for attempt in range(max_retries):
        try:
            response = await client.post(url, json=payload)

            if response.status_code == 429:
                if attempt >= max_retries - 1:
                    response.raise_for_status()
                wait_seconds = min(30.0, 5 * (2**attempt))
                print(
                    f"Retrying paragraph_id={paragraph.paragraph_id} after HTTP 429 "
                    f"(attempt {attempt + 1}/{max_retries}, wait {wait_seconds:.1f}s)."
                )
                await asyncio.sleep(wait_seconds)
                continue

            if response.status_code >= 500:
                if attempt >= max_retries - 1:
                    print(f"HTTP {response.status_code} response body: {response.text}")
                    response.raise_for_status()
                wait_seconds = min(30.0, 5 * (2**attempt))
                print(
                    f"Retrying paragraph_id={paragraph.paragraph_id} after HTTP {response.status_code} "
                    f"(attempt {attempt + 1}/{max_retries}, wait {wait_seconds:.1f}s)."
                )
                await asyncio.sleep(wait_seconds)
                continue

            if response.status_code >= 400:
                print(f"HTTP {response.status_code} response body: {response.text}")
                response.raise_for_status()

            data = response.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            return ObligationExtraction.model_validate_json(text)

        except httpx.TimeoutException:
            if attempt >= max_retries - 1:
                raise
            wait_seconds = min(30.0, 5 * (2**attempt))
            print(
                f"Retrying paragraph_id={paragraph.paragraph_id} after timeout "
                f"(attempt {attempt + 1}/{max_retries}, wait {wait_seconds:.1f}s)."
            )
            await asyncio.sleep(wait_seconds)
        except httpx.ConnectError as exc:
            if attempt >= max_retries - 1:
                raise
            wait_seconds = min(30.0, 5 * (2**attempt))
            print(
                f"Retrying paragraph_id={paragraph.paragraph_id} after connect error "
                f"(attempt {attempt + 1}/{max_retries}, wait {wait_seconds:.1f}s)."
            )
            await asyncio.sleep(wait_seconds)

    raise RuntimeError("Unexpected retry loop exit")


async def extract_paragraph_obligations(
    client: AnyClient,
    prompt: str,
    paragraph: NormParagraph,
    model: str,
    temperature: float,
    seed: int,
    max_retries: int,
    reasoning_effort: str,
) -> ObligationExtraction:
    if is_gemini_model(model):
        assert isinstance(client, httpx.AsyncClient)
        return await _extract_gemini(
            client=client,
            prompt=prompt,
            paragraph=paragraph,
            model=model,
            temperature=temperature,
            max_retries=max_retries,
        )
    assert isinstance(client, AsyncOpenAI)
    return await _extract_openai(
        client=client,
        prompt=prompt,
        paragraph=paragraph,
        model=model,
        temperature=temperature,
        seed=seed,
        max_retries=max_retries,
        reasoning_effort=reasoning_effort,
    )


async def process_law(
    client: AnyClient,
    law_abbrev: str,
    paragraphs: list[NormParagraph],
    out_dir: Path,
    progress: dict[str, bool],
    progress_file: Path,
    prompt: str,
    model: str,
    temperature: float,
    seed: int,
    max_concurrency: int,
    max_retries: int,
    reasoning_effort: str,
) -> tuple[int, int, int]:
    out_file = out_dir / f"Pflichten_LLM_{law_abbrev}.csv"
    ensure_csv_file(out_file)

    pending = [p for p in paragraphs if not progress.get(p.paragraph_id, False)]
    already_done = len(paragraphs) - len(pending)
    if not pending:
        print(f"[{law_abbrev}] Nothing to do. All {len(paragraphs)} paragraphs already processed.")
        return 0, len(paragraphs), 0

    print(
        f"[{law_abbrev}] Processing {len(pending)} of {len(paragraphs)} paragraphs "
        f"({already_done} already done from checkpoint)."
    )

    semaphore = asyncio.Semaphore(max_concurrency)

    async def worker(paragraph: NormParagraph) -> list[dict[str, str]]:
        async with semaphore:
            extraction = await extract_paragraph_obligations(
                client=client,
                prompt=prompt,
                paragraph=paragraph,
                model=model,
                temperature=temperature,
                seed=seed,
                max_retries=max_retries,
                reasoning_effort=reasoning_effort,
            )
        return [obligation_to_row(paragraph, item) for item in extraction.obligations]

    tasks = {paragraph.paragraph_id: asyncio.create_task(worker(paragraph)) for paragraph in pending}

    extracted_rows = 0
    for index, paragraph in enumerate(pending, start=1):
        rows = await tasks[paragraph.paragraph_id]
        append_rows(out_file, rows)
        extracted_rows += len(rows)
        progress[paragraph.paragraph_id] = True
        save_progress(progress_file, progress)
        print(
            f"[{law_abbrev}] {index}/{len(pending)} done: {paragraph.paragraph_id} "
            f"-> {len(rows)} obligations"
        )

    return len(pending), len(paragraphs), extracted_rows


async def async_main(args: argparse.Namespace) -> None:
    in_file = Path(args.in_file)
    out_dir = Path(args.out_dir)
    progress_file = Path(args.progress_file)
    prompt_file = Path(args.prompt_file)

    prompt = load_prompt(prompt_file)
    norm_filters = collect_norm_filters(args.norm, args.norms_file)
    grouped_paragraphs = load_paragraphs(
        in_file, set(norm_filters) if norm_filters else None
    )
    progress = load_progress(progress_file)

    if args.rerun:
        if not norm_filters and progress_file == DEFAULT_PROGRESS_FILE:
            raise SystemExit(
                "--rerun without --norm/--norms-file would wipe all progress. "
                "Pass law abbreviations to target specific laws, "
                "or --progress-file to use a dedicated file."
            )
        laws_to_rerun = list(grouped_paragraphs.keys())
        cleared = 0
        for paragraph_id in list(progress.keys()):
            parts = paragraph_id.split(":")
            law = parts[1] if len(parts) >= 3 else parts[0]
            if law in laws_to_rerun:
                del progress[paragraph_id]
                cleared += 1
        if cleared:
            save_progress(progress_file, progress)
            print(f"[rerun] Cleared {cleared} checkpoint entries for: {', '.join(laws_to_rerun)}")
        for law_abbrev in laws_to_rerun:
            csv_file = out_dir / f"Pflichten_LLM_{law_abbrev}.csv"
            if csv_file.exists():
                with csv_file.open("w", encoding="utf-8-sig", newline="") as f:
                    writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS, delimiter=";")
                    writer.writeheader()
                print(f"[rerun] Reset CSV for {law_abbrev}: {csv_file.name}")

    if not grouped_paragraphs:
        if norm_filters:
            missing = ", ".join(norm_filters)
            print(f"No paragraphs found for requested norm(s): {missing} in {in_file}.")
        else:
            print(f"No paragraphs found in {in_file}.")
        return

    if norm_filters:
        law_order = norm_filters
        missing = [abbrev for abbrev in norm_filters if abbrev not in grouped_paragraphs]
        if missing:
            print(f"Warning: no paragraphs found for norm(s): {', '.join(missing)}")
    else:
        law_order = sorted(grouped_paragraphs.keys())

    total_paragraphs = sum(len(grouped_paragraphs[a]) for a in law_order if a in grouped_paragraphs)
    already_done_total = sum(
        sum(1 for p in grouped_paragraphs[a] if progress.get(p.paragraph_id, False))
        for a in law_order
        if a in grouped_paragraphs
    )
    pending_total = total_paragraphs - already_done_total

    print("=" * 60)
    print("Obligations extraction run")
    print("=" * 60)
    print(f"  Model:          {args.model}")
    print(f"  Reasoning:      {args.reasoning_effort or '(none)'}")
    print(f"  Concurrency:    {args.max_concurrency} parallel paragraphs")
    print(f"  Input:          {in_file}")
    print(f"  Output dir:     {out_dir}")
    print(f"  Progress file:  {progress_file}")
    print(f"  Laws ({len(law_order)}):       {', '.join(law_order)}")
    for abbrev in law_order:
        paragraphs_for_law = grouped_paragraphs.get(abbrev, [])
        done = sum(1 for p in paragraphs_for_law if progress.get(p.paragraph_id, False))
        pending = len(paragraphs_for_law) - done
        print(f"    {abbrev}: {len(paragraphs_for_law)} paragraphs ({done} cached, {pending} pending)")
    print(f"  Total pending:  {pending_total} / {total_paragraphs} paragraphs")
    if args.rerun:
        print("  Mode:           --rerun (checkpoint cleared)")
    print("=" * 60)

    token = get_langdock_token()

    if is_gemini_model(args.model):
        # Langdock forces Gemini "thinking" on (thinkingConfig is stripped),
        # so large paragraphs can take 30-60s+; a generous timeout avoids
        # wasteful retries of requests that would have succeeded.
        client: AnyClient = httpx.AsyncClient(
            headers={"Authorization": f"Bearer {token}"},
            timeout=httpx.Timeout(300.0, connect=10.0),
        )
    else:
        client = AsyncOpenAI(api_key=token, base_url=LANGDOCK_OPENAI_BASE_URL)

    try:
        total_new_paragraphs = 0
        total_target_paragraphs = 0
        total_rows = 0

        for law_abbrev in law_order:
            paragraphs = grouped_paragraphs.get(law_abbrev)
            if not paragraphs:
                continue
            new_count, target_count, row_count = await process_law(
                client=client,
                law_abbrev=law_abbrev,
                paragraphs=paragraphs,
                out_dir=out_dir,
                progress=progress,
                progress_file=progress_file,
                prompt=prompt,
                model=args.model,
                temperature=args.temperature,
                seed=args.seed,
                max_concurrency=args.max_concurrency,
                max_retries=args.max_retries,
                reasoning_effort=args.reasoning_effort,
            )
            total_new_paragraphs += new_count
            total_target_paragraphs += target_count
            total_rows += row_count

    finally:
        if isinstance(client, httpx.AsyncClient):
            await client.aclose()

    print("Extraction completed.")
    print(f"Processed paragraphs this run (new): {total_new_paragraphs}")
    print(
        "Processed paragraphs total (incl. cached): "
        f"{total_target_paragraphs}/{total_target_paragraphs}"
    )
    print(f"Extracted obligations this run: {total_rows}")
    print(f"Progress file: {progress_file}")


def main() -> None:
    args = parse_args()
    asyncio.run(async_main(args))


if __name__ == "__main__":
    main()
