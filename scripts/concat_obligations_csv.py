#!/usr/bin/env python3
"""Merge per-law obligations CSV files into one UI-ready aggregate file."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

from laws_paths import LAW_PATHS
from pipeline_models import OBLIGATION_CSV_COLUMNS
from reference_sort import reference_sort_key


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Merge per-law obligations CSV files into one file.")
    parser.add_argument("--in-dir", default=str(LAW_PATHS["obligations_dir"]))
    parser.add_argument("--out-file", default=str(LAW_PATHS["obligations_all_csv"]))
    parser.add_argument("--file-prefix", default="Pflichten_LLM_")
    return parser.parse_args()


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def main() -> None:
    args = parse_args()
    in_dir = Path(args.in_dir)
    out_file = Path(args.out_file)

    input_files = sorted(
        p
        for p in in_dir.glob("*.csv")
        if p.name.startswith(args.file_prefix) and p.name != out_file.name
    )
    if not input_files:
        raise SystemExit(
            f"No input files found in {in_dir} with prefix '{args.file_prefix}'."
        )

    merged_rows: list[dict[str, str]] = []

    for file_path in input_files:
        merged_rows.extend(read_csv(file_path))

    if not merged_rows:
        raise SystemExit("Input files are empty or have no rows.")

    extra_columns = sorted(
        {
            key
            for row in merged_rows
            for key in row
            if key not in OBLIGATION_CSV_COLUMNS
        }
    )
    columns = [*OBLIGATION_CSV_COLUMNS, *extra_columns]

    merged_rows.sort(
        key=lambda row: (
            row.get("norm", "").lower(),
            reference_sort_key(row.get("referenz", "")),
        )
    )

    out_file.parent.mkdir(parents=True, exist_ok=True)
    with out_file.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=columns, delimiter=";")
        writer.writeheader()
        writer.writerows(merged_rows)

    print(f"Merged {len(input_files)} files into {out_file}")
    print(f"Total rows: {len(merged_rows)}")


if __name__ == "__main__":
    main()
