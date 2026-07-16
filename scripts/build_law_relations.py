#!/usr/bin/env python3
"""Build related-law mappings for the Pflichten export UI."""

from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
from pathlib import Path

from download_laws import celex_from_row
from laws_paths import LAW_PATHS

FINANZ_GROUP_LABEL = "Finanzmarkt-Korpus"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build related-law mappings for the Pflichten UI.")
    parser.add_argument("--registry-file", default=str(LAW_PATHS["ui_registry_file"]))
    parser.add_argument(
        "--finanz-csv",
        default=str(LAW_PATHS["de_input_csv"]),
        help="German financial corpus list (one title per row)",
    )
    parser.add_argument(
        "--eu-mapping-csv",
        default=str(LAW_PATHS["eu_finanz_mapping_csv"]),
    )
    parser.add_argument(
        "--out-file",
        default=str(LAW_PATHS["law_relations_file"]),
    )
    return parser.parse_args()


def normalize_title(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value.lower())
    normalized = re.sub(r"[^a-z0-9]+", " ", normalized).strip()
    return normalized


def parse_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle, delimiter=";"))


def load_finanz_titles(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8-sig")
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if not lines:
        return []
    if lines[0].lower() == "gesetz_verordnung":
        return lines[1:]
    return lines


def find_de_law_abbrev(title: str, registry: list[dict]) -> str | None:
    normalized = normalize_title(title)
    if not normalized:
        return None

    de_laws = [entry for entry in registry if entry.get("source") == "gesetze-im-internet"]

    for entry in de_laws:
        kurzue = normalize_title(str(entry.get("kurzue") or ""))
        name = normalize_title(str(entry.get("name") or ""))
        if kurzue == normalized or name == normalized:
            return str(entry["abbrev"])

    for entry in de_laws:
        kurzue = normalize_title(str(entry.get("kurzue") or ""))
        if kurzue and (kurzue.startswith(normalized) or normalized.startswith(kurzue)):
            return str(entry["abbrev"])

    return None


def find_de_law_by_jurabk(jurabk: str, registry: list[dict]) -> str | None:
    target = jurabk.strip().lower()
    if not target:
        return None

    for entry in registry:
        if entry.get("source") != "gesetze-im-internet":
            continue
        candidate = str(entry.get("jurabk") or "").strip().lower()
        if not candidate:
            continue
        if candidate == target or candidate.startswith(f"{target} "):
            return str(entry["abbrev"])
    return None


def parse_national_law_refs(value: str) -> list[str]:
    parts = [part.strip() for part in value.split(",") if part.strip()]
    refs: list[str] = []
    for part in parts:
        match = re.search(r"\(([^)]+)\)", part)
        refs.append(match.group(1).strip() if match else part)
    return refs


def resolve_national_law_ref(ref: str, registry: list[dict]) -> str | None:
    by_jurabk = find_de_law_by_jurabk(ref, registry)
    if by_jurabk:
        return by_jurabk
    return find_de_law_abbrev(ref, registry)


def build_finanz_group(titles: list[str], registry: list[dict]) -> tuple[dict, list[str]]:
    abbrevs: list[str] = []
    unresolved: list[str] = []

    for title in titles:
        abbrev = find_de_law_abbrev(title, registry)
        if abbrev:
            abbrevs.append(abbrev)
        else:
            unresolved.append(title)

    return (
        {
            "id": "finanz",
            "label": FINANZ_GROUP_LABEL,
            "abbrevs": sorted(dict.fromkeys(abbrevs)),
        },
        unresolved,
    )


def build_eu_de_links(rows: list[dict[str, str]], registry: list[dict]) -> tuple[list[dict], list[str]]:
    known_abbrevs = {entry["abbrev"] for entry in registry}
    links: list[dict] = []
    warnings: list[str] = []

    for row in rows:
        eu_abbrev = celex_from_row(row)
        if not eu_abbrev:
            warnings.append(f"Could not derive CELEX for {row.get('Name', '')}")
            continue

        de_abbrevs: list[str] = []
        for ref in parse_national_law_refs(row.get("Relevante nationale Gesetze", "")):
            abbrev = resolve_national_law_ref(ref, registry)
            if abbrev:
                de_abbrevs.append(abbrev)
            else:
                warnings.append(f"Could not map national law '{ref}' ({row.get('Name', '')})")

        de_abbrevs = sorted(dict.fromkeys(de_abbrevs))
        if eu_abbrev not in known_abbrevs:
            warnings.append(f"EU law {eu_abbrev} not in registry ({row.get('Name', '')})")

        links.append(
            {
                "eu_abbrev": eu_abbrev,
                "de_abbrevs": de_abbrevs,
                "relation_label": (row.get("Name") or eu_abbrev).strip(),
            }
        )

    return links, warnings


def main() -> None:
    args = parse_args()
    registry_path = Path(args.registry_file)
    out_file = Path(args.out_file)

    registry = json.loads(registry_path.read_text(encoding="utf-8"))
    finanz_titles = load_finanz_titles(Path(args.finanz_csv))
    eu_rows = parse_csv(Path(args.eu_mapping_csv))

    finanz_group, unresolved_titles = build_finanz_group(finanz_titles, registry)
    eu_de_links, warnings = build_eu_de_links(eu_rows, registry)

    payload = {
        "groups": [finanz_group],
        "eu_de_links": eu_de_links,
    }

    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Wrote {out_file}")
    print(f"Finanz corpus: {len(finanz_group['abbrevs'])} laws")
    print(f"EU↔DE links: {len(eu_de_links)}")
    if unresolved_titles:
        print(f"Unresolved finanz titles: {len(unresolved_titles)}")
        for title in unresolved_titles:
            print(f"  - {title}")
    if warnings:
        print(f"Warnings: {len(warnings)}")
        for warning in warnings:
            print(f"  - {warning}")


if __name__ == "__main__":
    main()
