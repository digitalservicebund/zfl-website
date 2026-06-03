"""
llm_extract_base.py

Shared infrastructure for LLM-based extraction tasks on legal texts.

What this module provides:
- A generic ExtractionTask dataclass to define extraction jobs.
- A reusable run_extraction() orchestrator for end-to-end batch processing.
- Built-in chunking, retry behavior, and optional per-norm deduplication.
- Incremental CSV writing for interruption-safe long runs.

What run_extraction() handles:
    - CLI argument parsing
    - norm file discovery
    - text chunking
    - LLM calls with retries / rate-limit back-off
    - per-norm deduplication
    - CSV export

Repository note:
- The filename intentionally includes ONLY_INSPIRATION.
- Treat this as reference scaffolding, not as the canonical production pipeline
    script in this repository.

Usage
-----
See extract_meldepflichten_llm.py or extract_definitions_llm.py for examples.
"""

from __future__ import annotations

import argparse
import csv
import os
import re
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, List

import openai
from dotenv import load_dotenv
from openai import OpenAI

# Load variables from .env if present
load_dotenv()

# ---------------------------------------------------------------------------
# Global defaults (can be overridden per task)
# ---------------------------------------------------------------------------

ROOT_DIR = Path(__file__).parent.parent
NORMEN_DIR = ROOT_DIR / "content" / "norms-plain"

# ~4 chars/token → 50 000 chars ≈ 12 500 tokens (safe for 128 k-context models)
DEFAULT_CHUNK_CHARS = 50_000

TEMPERATURE = 0.0
SEED = 42

LLM_MODEL_DEFAULT = "gpt-5.1"

# ---------------------------------------------------------------------------
# ExtractionTask configuration dataclass
# ---------------------------------------------------------------------------


@dataclass
class ExtractionTask:
    """Describes one extraction job (meldepflichten, definitions, …).

    Attributes
    ----------
    description:
        Human-readable description used in the argparse help text.
    default_output:
        Default path for the output CSV.
    system_prompt:
        The system message sent to the LLM for every chunk.
    response_model:
        Top-level Pydantic model used as ``response_format`` in the API call.
    result_key:
        Name of the attribute on *response_model* that holds the list of
        extracted items (e.g. ``"meldepflichten"`` or ``"begriffe"``).
    to_row:
        ``Callable[[str, Any], dict]`` — maps ``(norm_name, item)`` to a CSV
        row dict.  The keys must match *fieldnames*.
    fieldnames:
        Ordered list of CSV column names.
    dedup_key:
        Optional ``Callable[[Any], tuple]`` — returns a hashable key for each
        item.  Duplicate keys within a norm are silently dropped.  Pass
        ``None`` to disable deduplication.
    normen_dir:
        Override the directory that contains the norm subdirectories.
        Defaults to ``NORMEN_DIR``.
    """

    description: str
    default_output: Path
    system_prompt: str
    response_model: type
    result_key: str
    to_row: Callable
    fieldnames: list[str]
    dedup_key: Callable | None = None
    normen_dir: Path | None = None


# ---------------------------------------------------------------------------
# Langdock / OpenAI client
# ---------------------------------------------------------------------------


def get_langdock_token() -> str:
    """Retrieve the Langdock API token.

    Resolution order:
    1. ``LANGDOCK_API_KEY`` environment variable  (fastest, always works)
    2. 1Password CLI (``op``) if found on PATH
    """
    token = os.environ.get("LANGDOCK_API_KEY", "").strip()
    if token:
        print("Using Langdock token from LANGDOCK_API_KEY environment variable.")
        return token

    op_path = shutil.which("op")
    if op_path:
        print(f"Retrieving Langdock token from 1Password ({op_path})…")
        result = subprocess.run(
            [op_path, "read", "op://Employee/Langdock token/password"],
            capture_output=True,
            text=True,
            check=True,
        )
        token = result.stdout.strip()
        if token:
            print("Got Langdock token from 1Password successfully.")
            return token

    raise ValueError(
        "No Langdock token found. Please set the LANGDOCK_API_KEY environment variable:\n"
        "  export LANGDOCK_API_KEY=your_token_here\n"
        "Alternatively, install the 1Password CLI ('op') and sign in."
    )


def get_llm_client(api_key: str | None = None, base_url: str | None = None) -> OpenAI:
    """Return an OpenAI-compatible client.

    If *base_url* is provided, it is used. Otherwise defaults to Langdock EU.
    If *api_key* is provided, it is used. Otherwise attempts discovery via env/1Password.
    """
    if not api_key:
        try:
            api_key = get_langdock_token()
        except Exception as e:
            # If a local base_url is provided, we might not need a real key.
            # Some local servers accept anything/nothing.
            if base_url:
                api_key = "local-no-key-needed"
            else:
                raise e

    if not base_url:
        base_url = "https://api.langdock.com/openai/eu/v1"

    print(f"Connecting to LLM at: {base_url}")
    return OpenAI(
        api_key=api_key,
        base_url=base_url,
    )


# ---------------------------------------------------------------------------
# Chunking: split plaintext by paragraph/Artikel headings
# ---------------------------------------------------------------------------

# Matches section headings like "§ 32", "§32", "Art. 5", "Artikel 5"
HEADING_RE = re.compile(
    r"(?:^|\n)(?=\s*(?:§\s*\d+|Art(?:ikel|\.)?)\s*\d+\b)",
    re.MULTILINE,
)


def _split_into_n_parts(text: str, n: int) -> List[str]:
    """Split *text* into exactly *n* roughly equal parts.

    Splits are made at the nearest ``\\n\\n`` boundary to each target position.
    Falls back to a hard character split if no paragraph boundary is found nearby.
    """
    if n <= 1:
        return [text]
    part_size = len(text) // n
    parts: List[str] = []
    start = 0
    for i in range(1, n):
        target = start + part_size
        if target >= len(text):
            break
        # Search for a \n\n near the target (within ±10 % of part_size)
        window = max(200, part_size // 10)
        search_start = max(start, target - window)
        search_end = min(len(text), target + window)
        best = text.rfind("\n\n", search_start, target)
        if best == -1 or best <= start:
            best = text.find("\n\n", target, search_end)
        if best == -1 or best <= start:
            best = target  # hard split
        else:
            best += 2  # skip past the \n\n
        parts.append(text[start:best].strip())
        start = best
    if start < len(text):
        parts.append(text[start:].strip())
    return [p for p in parts if p]


def split_into_chunks(text: str, max_chars: int) -> List[str]:
    """Split norm text into processable chunks.

    Strategy:
    1. Split on paragraph / Artikel headings.
    2. If a resulting section is larger than *max_chars*, split further by
       double newlines (Absätze), still respecting *max_chars*.
    3. If individual Absätze exceed *max_chars*, hard-split at *max_chars*.
    """
    sections = HEADING_RE.split(text)
    sections = [s.strip() for s in sections if s.strip()]

    chunks: List[str] = []
    current_chunk = ""

    for section in sections:
        if len(current_chunk) + len(section) + 2 <= max_chars:
            current_chunk = (current_chunk + "\n\n" + section).strip()
        else:
            if current_chunk:
                chunks.append(current_chunk)
            if len(section) > max_chars:
                absaetze = section.split("\n\n")
                sub_chunk = ""
                for absatz in absaetze:
                    if len(sub_chunk) + len(absatz) + 2 <= max_chars:
                        sub_chunk = (sub_chunk + "\n\n" + absatz).strip()
                    else:
                        if sub_chunk:
                            chunks.append(sub_chunk)
                        if len(absatz) > max_chars:
                            for i in range(0, len(absatz), max_chars):
                                chunks.append(absatz[i : i + max_chars])
                            sub_chunk = ""
                        else:
                            sub_chunk = absatz
                if sub_chunk:
                    chunks.append(sub_chunk)
                current_chunk = ""
            else:
                current_chunk = section

    if current_chunk:
        chunks.append(current_chunk)

    return chunks


# ---------------------------------------------------------------------------
# Norm file discovery
# ---------------------------------------------------------------------------


def discover_norm_files(
    normen_dir: Path, filter_norms: List[str] | None
) -> List[tuple[str, Path]]:
    """Walk *normen_dir* and return ``(norm_name, file_path)`` pairs.

    Prefers ``*_Volltext_Plaintext.txt``; falls back to any ``*_Plaintext.txt``.
    Optionally filtered to the norm names in *filter_norms*.
    """
    found = []
    for subdir in sorted(normen_dir.iterdir()):
        if not subdir.is_dir():
            continue
        norm_name = subdir.name
        if filter_norms and norm_name not in filter_norms:
            continue
        candidates = sorted(subdir.glob("*_Plaintext.txt"))
        if not candidates:
            print(f"[SKIP] No Plaintext file in {subdir}")
            continue
        preferred = [c for c in candidates if "_Volltext_Plaintext" in c.name]
        chosen = preferred[0] if preferred else candidates[0]
        found.append((norm_name, chosen))
    return found


# ---------------------------------------------------------------------------
# CSV export
# ---------------------------------------------------------------------------


def clear_csv(output_path: Path, fieldnames: List[str]) -> None:
    """Initialize an empty CSV file with headers and UTF-8 BOM."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=";")
        writer.writeheader()


def append_csv_rows(results: List[dict], output_path: Path, fieldnames: List[str]) -> None:
    """Append *results* to an existing CSV file (without rewriting header)."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "a", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=";")
        writer.writerows(results)


def write_csv(results: List[dict], output_path: Path, fieldnames: List[str]) -> None:
    """Write *results* to a semicolon-delimited CSV with UTF-8 BOM."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=";")
        writer.writeheader()
        writer.writerows(results)


# ---------------------------------------------------------------------------
# LLM extraction (single chunk)
# ---------------------------------------------------------------------------


def _extract_from_chunk(
    chunk: str,
    norm_name: str,
    task: ExtractionTask,
    client: OpenAI,
    model_name: str,
) -> list:
    """Send one chunk to the LLM; return parsed items with rate-limit retries."""
    max_retries = 5
    retry_delay = 10  # seconds

    for attempt in range(max_retries):
        try:
            completion = client.beta.chat.completions.parse(
                model=model_name,
                temperature=TEMPERATURE,
                seed=SEED,
                messages=[
                    {"role": "system", "content": task.system_prompt},
                    {
                        "role": "user",
                        "content": (
                            f"Norm: {norm_name}\n\n"
                            f"Gesetzestext:\n{chunk}"
                        ),
                    },
                ],
                response_format=task.response_model,
            )
            parsed = completion.choices[0].message.parsed
            if parsed is None:
                print(
                    f"  [WARN] LLM returned no parsed output for a chunk in {norm_name}."
                )
                return []
            return getattr(parsed, task.result_key)

        except openai.RateLimitError as e:
            if attempt < max_retries - 1:
                print(
                    f"\n  [RATE LIMIT] {e.message}. "
                    f"Waiting {retry_delay}s and retrying "
                    f"(Attempt {attempt + 1}/{max_retries})…"
                )
                time.sleep(retry_delay)
                retry_delay *= 2
            else:
                print(
                    f"\n  [ERROR] Rate limit exceeded after {max_retries} retries "
                    f"for {norm_name}."
                )
                raise
        except Exception as e:
            print(f"  [ERROR] Failed to extract from chunk in {norm_name}: {e}")
            return []

    return []


# ---------------------------------------------------------------------------
# Per-norm orchestration
# ---------------------------------------------------------------------------

def _extract_from_norm(
    norm_name: str,
    file_path: Path,
    task: ExtractionTask,
    client: OpenAI,
    model_name: str,
    chunk_size: int,
    output_path: Path | None = None,
    skip_chunks: int = 0,
    max_chunks: int | None = None,
    sub_chunks: int = 1,
) -> int:
    """Process one norm file: chunk → LLM → deduplicate → write to CSV.
    
    Results are written incrementally to output_path after each chunk.
    Returns the number of unique entries processed for this norm.
    """
    print(f"\n{'='*60}")
    print(f"Processing: {norm_name}  ({file_path.name})")

    with open(file_path, encoding="utf-8") as f:
        content = f.read()

    chunks = split_into_chunks(content, max_chars=chunk_size)
    print(f"  Chunks: {len(chunks)}, total chars: {len(content):,}")

    if skip_chunks > 0:
        print(f"  Skipping first {skip_chunks} chunks as requested.")

    seen: set = set()
    total_entries = 0

    processed_count = 0
    for i, chunk in enumerate(chunks, 1):
        if i <= skip_chunks:
            continue
        if max_chunks is not None and processed_count >= max_chunks:
            print(f"  Reached max-chunks limit ({max_chunks}). Stopping for {norm_name}.")
            break

        sub_chunk_list: List[str]
        if sub_chunks > 1:
            sub_chunk_list = _split_into_n_parts(chunk, sub_chunks)
            print(
                f"  Chunk {i}/{len(chunks)} ({len(chunk):,} chars) "
                f"→ subdivided into {len(sub_chunk_list)} sub-chunks…"
            )
        else:
            sub_chunk_list = [chunk]
            print(f"  Chunk {i}/{len(chunks)} ({len(chunk):,} chars)…", end=" ", flush=True)

        items: list = []
        for si, sub_chunk in enumerate(sub_chunk_list, 1):
            if sub_chunks > 1:
                print(
                    f"    Sub-chunk {si}/{len(sub_chunk_list)} ({len(sub_chunk):,} chars)…",
                    end=" ",
                    flush=True,
                )
            sub_items = _extract_from_chunk(sub_chunk, norm_name, task, client, model_name)
            if sub_chunks > 1:
                print(f"→ {len(sub_items)} Einträge gefunden")
            items.extend(sub_items)

        if sub_chunks <= 1:
            print(f"→ {len(items)} Einträge gefunden")
        processed_count += 1

        chunk_results: List[dict] = []
        for item in items:
            if task.dedup_key is not None:
                key = task.dedup_key(item)
                if key in seen:
                    continue
                seen.add(key)
            row = task.to_row(norm_name, item)
            chunk_results.append(row)
            total_entries += 1
        
        # Write chunk results incrementally if output_path is provided
        if output_path and chunk_results:
            append_csv_rows(chunk_results, output_path, task.fieldnames)

    print(f"  → {total_entries} unique Einträge for {norm_name}")
    return total_entries


# ---------------------------------------------------------------------------
# CLI argument builder
# ---------------------------------------------------------------------------


def build_arg_parser(description: str, default_output: Path) -> argparse.ArgumentParser:
    """Return a pre-configured ArgumentParser shared by all extraction scripts."""
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument(
        "--norm",
        metavar="NAME",
        action="append",
        dest="norms",
        help=(
            "Process only this norm (folder name under content/norms-plain/). "
            "Can be repeated."
        ),
    )
    parser.add_argument(
        "--output",
        metavar="PATH",
        default=str(default_output),
        help=f"Path for the output CSV. Default: {default_output}",
    )
    parser.add_argument(
        "--skip-chunks",
        type=int,
        default=0,
        help="Number of chunks to skip from the beginning (useful for resuming).",
    )
    parser.add_argument(
        "--max-chunks",
        type=int,
        default=None,
        help="Maximum number of chunks to process per norm (useful for testing).",
    )
    parser.add_argument(
        "--chunk-size",
        type=int,
        default=DEFAULT_CHUNK_CHARS,
        help=f"Maximum characters per chunk. Default: {DEFAULT_CHUNK_CHARS}",
    )
    parser.add_argument(
        "--base-url",
        metavar="URL",
        default=None,
        help="Custom LLM API base URL (e.g. http://localhost:1234/v1 for LM Studio).",
    )
    parser.add_argument(
        "--model",
        metavar="NAME",
        default=LLM_MODEL_DEFAULT,
        help=f"Model name to use. Default: {LLM_MODEL_DEFAULT}",
    )
    parser.add_argument(
        "--api-key",
        metavar="KEY",
        default=None,
        help="Custom API key. If omitted, uses discovery logic (env var or 1Password).",
    )
    parser.add_argument(
        "--sub-chunks",
        type=int,
        default=1,
        metavar="N",
        help=(
            "Split each selected chunk into N roughly equal sub-chunks before sending "
            "to the LLM. Useful when a chunk causes server timeouts due to size. "
            "Default: 1 (no subdivision)."
        ),
    )
    return parser


# ---------------------------------------------------------------------------
# Top-level entry point
# ---------------------------------------------------------------------------


def run_extraction(task: ExtractionTask) -> None:
    """Parse CLI args, run the extraction loop, and write the output CSV.

    Call this from the ``if __name__ == '__main__':`` block of each task script.
    """
    normen_dir = task.normen_dir or NORMEN_DIR
    parser = build_arg_parser(task.description, task.default_output)
    args = parser.parse_args()

    output_path = Path(args.output)
    norm_files = discover_norm_files(normen_dir, args.norms)

    # If exactly one norm is requested and the user did not override --output,
    # append the norm slug to the default output filename for convenience.
    if (
        args.norms
        and len(args.norms) == 1
        and args.output == str(task.default_output)
    ):
        stem = task.default_output.stem  # e.g. "Meldepflichten_LLM"
        norm_slug = args.norms[0]
        output_path = task.default_output.parent / f"{stem}_{norm_slug}.csv"

    if not norm_files:
        print(
            "No norm files found. "
            "Check --norm argument or the content/norms-plain/ directory."
        )
        sys.exit(1)

    print(f"Will process {len(norm_files)} norm(s).")

    # Initialize output file with headers
    clear_csv(output_path, task.fieldnames)

    client = get_llm_client(api_key=args.api_key, base_url=args.base_url)

    # Use chunk size from args
    chunk_size = args.chunk_size

    total_results = 0
    for norm_name, file_path in norm_files:
        count = _extract_from_norm(
            norm_name,
            file_path,
            task,
            client,
            model_name=args.model,
            chunk_size=chunk_size,
            output_path=output_path,
            skip_chunks=args.skip_chunks,
            max_chunks=args.max_chunks,
            sub_chunks=args.sub_chunks,
        )
        total_results += count

    print(f"\n{'='*60}")
    print(f"Done. {total_results} Einträge written to {output_path}")
