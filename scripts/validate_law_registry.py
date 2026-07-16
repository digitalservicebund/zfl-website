#!/usr/bin/env python3
"""Validate structural and semantic integrity of the generated laws registry."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from laws_paths import LAW_PATHS
from pipeline_models import RegistryEntry


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate generated laws registry.")
    parser.add_argument("--registry-file", default=str(LAW_PATHS["registry_file"]))
    return parser.parse_args()


def is_celex_base_act(value: str) -> bool:
    return bool(re.match(r"^3\d{4}[RLD]\d{4}$", str(value or "")))


def validate_eurlex_entry(parsed: RegistryEntry, tag: str, errors: list[str]) -> None:
    if not parsed.celex:
        errors.append(f"{tag}: eurlex entry missing celex")
    elif not is_celex_base_act(parsed.celex):
        errors.append(f"{tag}: invalid CELEX format {parsed.celex}")

    if "eur-lex.europa.eu" not in parsed.url:
        errors.append(f"{tag}: eurlex entry url must point to eur-lex")


def validate_gii_entry(parsed: RegistryEntry, tag: str, errors: list[str]) -> None:
    if not parsed.gii_slug:
        errors.append(f"{tag}: gii entry missing gii_slug")
    if "gesetze-im-internet.de" not in str(parsed.gii_xml_zip_url or ""):
        errors.append(f"{tag}: gii entry missing/invalid gii_xml_zip_url")
    if "gesetze-im-internet.de" not in parsed.url:
        errors.append(f"{tag}: gii entry url must point to gesetze-im-internet")


def validate_row(row: dict, idx: int, seen: set[str], errors: list[str]) -> None:
    tag = f"entry[{idx}]"
    try:
        parsed = RegistryEntry.model_validate(row)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"{tag}: schema validation failed ({exc})")
        return

    key = f"{parsed.source}:{parsed.abbrev}"
    if key in seen:
        errors.append(f"{tag}: duplicate key {key}")
    seen.add(key)

    if parsed.source == "eurlex":
        validate_eurlex_entry(parsed, tag, errors)
    elif parsed.source == "gesetze-im-internet":
        validate_gii_entry(parsed, tag, errors)


def main() -> None:
    args = parse_args()
    registry_file = Path(args.registry_file)
    rows = json.loads(registry_file.read_text(encoding="utf-8"))

    errors: list[str] = []
    seen: set[str] = set()

    for i, row in enumerate(rows):
        validate_row(row, i, seen, errors)

    if errors:
        print(f"Registry validation failed with {len(errors)} issue(s):")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    by_source: dict[str, int] = {}
    for row in rows:
        source = row.get("source", "")
        by_source[source] = by_source.get(source, 0) + 1

    print(f"Registry validation passed: {len(rows)} entries")
    print(f"- gesetze-im-internet: {by_source.get('gesetze-im-internet', 0)}")
    print(f"- eurlex: {by_source.get('eurlex', 0)}")


if __name__ == "__main__":
    main()
