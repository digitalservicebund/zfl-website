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

from openai import (
    APIConnectionError,
    APITimeoutError,
    AsyncOpenAI,
    InternalServerError,
    RateLimitError,
)

from laws_paths import LAW_PATHS
from pipeline_models import NormParagraph, ObligationExtraction

ROOT_DIR = Path(__file__).resolve().parents[1]
DEFAULT_PROGRESS_FILE = ROOT_DIR / "data" / "laws" / "cache" / "extraction_progress.json"
DEFAULT_PROMPT_FILE = Path(__file__).with_name("pflichten_prompt.txt")

LANGDOCK_BASE_URL = "https://api.langdock.com/openai/eu/v1"
DEFAULT_MODEL = "gpt-5.1"
DEFAULT_TEMPERATURE = 0.0
DEFAULT_SEED = 42
DEFAULT_MAX_CONCURRENCY = 5
DEFAULT_MAX_RETRIES = 5

CSV_COLUMNS = [
    "norm",
    "quelle",
    "referenz",
    "art_der_vorgabe",
    "pflichtstaerke",
    "normadressaten",
    "normadressat_text",
    "zitat",
    "handlung",
    "bestandteile",
    "sprachlicher_indikator",
    "konfidenz",
    "url",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract obligations per paragraph and write per-law CSV files."
    )
    parser.add_argument("--in-file", default=str(LAW_PATHS["norm_paragraphs_file"]))
    parser.add_argument("--out-dir", default=str(LAW_PATHS["obligations_dir"]))
    parser.add_argument("--progress-file", default=str(DEFAULT_PROGRESS_FILE))
    parser.add_argument("--prompt-file", default=str(DEFAULT_PROMPT_FILE))
    parser.add_argument("--norm", help="Only process one law abbreviation, e.g. KAGB")
    parser.add_argument("--model", default=DEFAULT_MODEL)
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


def load_paragraphs(in_file: Path, norm_filter: str | None) -> dict[str, list[NormParagraph]]:
    if not in_file.exists():
        raise SystemExit(f"Input file not found: {in_file}")

    grouped: dict[str, list[NormParagraph]] = defaultdict(list)
    with in_file.open("r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line:
                continue
            paragraph = NormParagraph.model_validate_json(line)
            if norm_filter and paragraph.law_abbrev != norm_filter:
                continue
            grouped[paragraph.law_abbrev].append(paragraph)

    for law_abbrev in grouped:
        grouped[law_abbrev].sort(key=lambda item: item.paragraph_id)

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
        "quelle": paragraph.source,
        "referenz": build_reference(paragraph.reference, obligation.referenz),
        "art_der_vorgabe": obligation.art_der_vorgabe,
        "pflichtstaerke": obligation.pflichtstaerke,
        "normadressaten": ", ".join(obligation.normadressaten),
        "normadressat_text": obligation.normadressat_text,
        "zitat": obligation.zitat,
        "handlung": obligation.handlung,
        "bestandteile": " | ".join(obligation.bestandteile),
        "sprachlicher_indikator": obligation.sprachlicher_indikator,
        "konfidenz": str(obligation.konfidenz),
        "url": paragraph.url,
    }


async def extract_paragraph_obligations(
    client: AsyncOpenAI,
    prompt: str,
    paragraph: NormParagraph,
    model: str,
    temperature: float,
    seed: int,
    max_retries: int,
) -> ObligationExtraction:
    user_input = (
        f"Rechtsakt: {paragraph.law_abbrev}\n"
        f"Quelle: {paragraph.source}\n"
        f"Referenz: {paragraph.reference}\n"
        f"URL: {paragraph.url}\n\n"
        f"Text:\n{paragraph.text}"
    )

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


async def process_law(
    client: AsyncOpenAI,
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
    grouped_paragraphs = load_paragraphs(in_file, args.norm)
    progress = load_progress(progress_file)

    if not grouped_paragraphs:
        norm_text = f" for norm {args.norm}" if args.norm else ""
        print(f"No paragraphs found{norm_text} in {in_file}.")
        return

    token = get_langdock_token()
    client = AsyncOpenAI(api_key=token, base_url=LANGDOCK_BASE_URL)

    total_new_paragraphs = 0
    total_target_paragraphs = 0
    total_rows = 0

    for law_abbrev, paragraphs in grouped_paragraphs.items():
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
        )
        total_new_paragraphs += new_count
        total_target_paragraphs += target_count
        total_rows += row_count

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
