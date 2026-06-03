#!/usr/bin/env python3
"""Build the canonical laws registry used by pipeline and UI."""

from __future__ import annotations

import argparse
import csv
import json
import re
from datetime import UTC, datetime
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from laws_paths import LAW_PATHS
from pipeline_models import RegistryEntry

SPARQL_ENDPOINT = "https://publications.europa.eu/webapi/rdf/sparql"
GII_INDEX_URL = "https://www.gesetze-im-internet.de/gii-toc.xml"
EU_METADATA_BATCH_SIZE = 120
EU_ACT_YEAR_FROM = 2016
EU_REGULATION_YEAR_FROM = 1990
INSTITUTION_DIRECTORY_KEYWORDS = {
    "institutions",
    "officials",
    "servants",
    "staff",
    "budget",
    "administration",
    "agencies",
    "privileges and immunities",
    "remuneration",
    "pensions",
    "european schools",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a unified laws registry from source indices.")
    parser.add_argument("--out-file", default=str(LAW_PATHS["registry_file"]))
    parser.add_argument("--gii-index-file", default="")
    parser.add_argument("--eu-index-csv", default=str(LAW_PATHS["eu_input_csv"]))
    parser.add_argument("--with-eu-sparql", action="store_true")
    parser.add_argument("--eu-limit", type=int, default=500)
    parser.add_argument("--eu-offset", type=int, default=0)
    parser.add_argument("--eu-max-rows", type=int, default=25000)
    return parser.parse_args()


def fetch_text(url: str, accept: str = "text/csv") -> str:
    req = Request(url, headers={"accept": accept, "user-agent": "zfl-law-registry/1.0"})
    with urlopen(req) as resp:
        return resp.read().decode("utf-8", errors="replace")


def decode_xml_entities(value: str) -> str:
    return (
        value.replace("&quot;", '"')
        .replace("&apos;", "'")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
    )


def extract_tag_value(xml: str, tag_name: str) -> str:
    m = re.search(rf"<{tag_name}[^>]*>([\s\S]*?)</{tag_name}>", xml, re.I)
    return m.group(1).strip() if m else ""


def slug_from_gii_link(link: str) -> str:
    m = re.search(r"gesetze-im-internet\.de/([^/]+)/xml\.zip", link, re.I)
    return m.group(1) if m else ""


def read_gii_index_xml(local_file: str) -> str:
    if local_file:
        return Path(local_file).read_text(encoding="utf-8")
    return fetch_text(GII_INDEX_URL, "application/xml,text/xml;q=0.9,*/*;q=0.1")


def build_german_registry_entries(gii_index_file: str) -> list[dict]:
    xml = read_gii_index_xml(gii_index_file)
    entries: list[dict] = []
    for block in re.findall(r"<item>([\s\S]*?)</item>", xml):
        title = decode_xml_entities(extract_tag_value(block, "title"))
        link = decode_xml_entities(extract_tag_value(block, "link")).replace("http://", "https://")
        slug = slug_from_gii_link(link)
        if not title or not slug:
            continue
        row = RegistryEntry(
            abbrev=slug,
            source="gesetze-im-internet",
            name=title,
            gii_slug=slug,
            gii_xml_zip_url=link,
            url=f"https://www.gesetze-im-internet.de/{slug}/index.html",
        )
        entries.append(row.model_dump())
    return entries


def normalize_celex(value: str) -> str:
    return str(value or "").strip().upper()


def is_base_legislation_celex(celex: str) -> bool:
    return bool(re.match(r"^3\d{4}[RL]\d{4}$", celex))


def is_regulation_celex(celex: str) -> bool:
    return bool(re.match(r"^3\d{4}R\d{4}$", celex))


def run_sparql_csv_query(query: str, context: str) -> list[dict[str, str]]:
    url = f"{SPARQL_ENDPOINT}?{urlencode({'query': query, 'format': 'text/csv'})}"
    last_error = ""
    for _ in range(3):
        try:
            text = fetch_text(url, "text/csv")
            return list(csv.DictReader(text.splitlines()))
        except Exception as exc:  # noqa: BLE001
            last_error = str(exc)
    raise RuntimeError(f"SPARQL query failed ({context}): {last_error}")


def query_eu_celex_batch_by_pattern(pattern: str, offset: int, limit: int) -> list[str]:
    query = f"""
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
SELECT ?celex
WHERE {{
  ?work a cdm:resource_legal .
  ?work cdm:resource_legal_id_celex ?celex .
  ?work cdm:resource_legal_in-force ?inForce .
  FILTER(?inForce = 1)
  FILTER(REGEX(STR(?celex), \"{pattern}\"))
}}
ORDER BY ?celex
LIMIT {limit}
OFFSET {offset}
"""
    rows = run_sparql_csv_query(query, f"{pattern}, offset={offset}")
    return [c for c in (normalize_celex(r.get("celex", "")) for r in rows) if is_base_legislation_celex(c)]


def query_eu_directory_labels(celex_batch: list[str]) -> dict[str, set[str]]:
    if not celex_batch:
        return {}
    values = " ".join(f'"{celex}"' for celex in celex_batch)
    query = f"""
PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?celex ?dirLabel
WHERE {{
  VALUES ?celex {{ {values} }}
  ?work a cdm:resource_legal ;
        cdm:resource_legal_id_celex ?celex .
  OPTIONAL {{
    ?work cdm:resource_legal_is_about_concept_directory-code ?dirCode .
    ?dirCode skos:prefLabel ?dirLabel .
    FILTER(LANG(?dirLabel) = \"en\")
  }}
}}
"""
    rows = run_sparql_csv_query(query, f"directory labels batch size={len(celex_batch)}")
    out = {celex: set() for celex in celex_batch}
    for row in rows:
        celex = normalize_celex(row.get("celex", ""))
        label = (row.get("dirLabel") or "").strip()
        if celex in out and label:
            out[celex].add(label)
    return out


def celex_year(celex: str) -> int:
    m = re.match(r"^3(\d{4})[RL]\d{4}$", celex)
    return int(m.group(1)) if m else 0


def should_exclude_institution_specific_regulation(celex: str, labels: list[str]) -> bool:
    if not is_regulation_celex(celex):
        return False
    if not labels:
        return celex_year(celex) < EU_REGULATION_YEAR_FROM
    lower_labels = [l.lower() for l in labels]
    if any(any(keyword in label for keyword in INSTITUTION_DIRECTORY_KEYWORDS) for label in lower_labels):
        return True
    return celex_year(celex) < EU_REGULATION_YEAR_FROM


def should_keep_eu_act_by_year(celex: str) -> bool:
    return celex_year(celex) >= EU_ACT_YEAR_FROM


def filter_institution_specific_regulations(celex_batch: list[str]) -> list[str]:
    keep: list[str] = []
    for i in range(0, len(celex_batch), EU_METADATA_BATCH_SIZE):
        slice_ = celex_batch[i : i + EU_METADATA_BATCH_SIZE]
        try:
            labels_by_celex = query_eu_directory_labels(slice_)
        except Exception as exc:  # noqa: BLE001
            print(f"Warning: {exc}; keeping unfiltered EU batch.")
            keep.extend(slice_)
            continue
        for celex in slice_:
            labels = list(labels_by_celex.get(celex, set()))
            if not should_exclude_institution_specific_regulation(celex, labels):
                keep.append(celex)
    return keep


def load_seed_eu_celex(eu_index_csv: str) -> set[str]:
    result: set[str] = set()
    if not eu_index_csv:
        return result

    with Path(eu_index_csv).open("r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f, delimiter=";"))
    for row in rows:
        celex = normalize_celex(row.get("celex", ""))
        if is_base_legislation_celex(celex):
            result.add(celex)
    return result


def add_filtered_batch(result: set[str], batch: list[str], eu_max_rows: int) -> None:
    filtered = filter_institution_specific_regulations(batch)
    for celex in filtered:
        if should_keep_eu_act_by_year(celex):
            result.add(celex)
            if len(result) >= eu_max_rows:
                break


def _collect_celex_for_pattern(
    result: set[str],
    pattern: str,
    eu_offset: int,
    eu_limit: int,
    eu_max_rows: int,
) -> None:
    offset = eu_offset
    while len(result) < eu_max_rows:
        try:
            batch = query_eu_celex_batch_by_pattern(pattern, offset, eu_limit)
        except Exception as exc:  # noqa: BLE001
            print(f"Warning: {exc}")
            break

        if not batch:
            break

        add_filtered_batch(result, batch, eu_max_rows)

        offset += eu_limit
        if len(batch) < eu_limit:
            break


def crawl_eu_celex(args: argparse.Namespace, result: set[str]) -> set[str]:
    current_year = datetime.now(UTC).year
    for year in range(1950, current_year + 2):
        for doc_type in ("R", "L"):
            pattern = rf"^3{year}{doc_type}[0-9]{{4}}$"
            _collect_celex_for_pattern(
                result,
                pattern,
                args.eu_offset,
                args.eu_limit,
                args.eu_max_rows,
            )

            if len(result) >= args.eu_max_rows:
                return result
    return result


def build_eu_celex_set(args: argparse.Namespace) -> set[str]:
    result = load_seed_eu_celex(args.eu_index_csv)

    if not args.with_eu_sparql:
        return result
    return crawl_eu_celex(args, result)


def dedupe_registry(entries: list[dict]) -> list[dict]:
    by_key: dict[str, dict] = {}
    for entry in entries:
        key = f"{entry['source']}:{entry['abbrev']}"
        if key not in by_key:
            by_key[key] = entry
    return list(by_key.values())


def sort_registry(entries: list[dict]) -> list[dict]:
    return sorted(entries, key=lambda e: (e["source"], e["abbrev"]))


def main() -> None:
    args = parse_args()
    out_file = Path(args.out_file)

    de_entries = build_german_registry_entries(args.gii_index_file)
    eu_celex = build_eu_celex_set(args)

    eu_entries = [
        RegistryEntry(
            abbrev=celex,
            source="eurlex",
            name=f"CELEX {celex}",
            celex=celex,
            url=f"https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:{celex}",
        ).model_dump()
        for celex in eu_celex
    ]

    registry = sort_registry(dedupe_registry([*de_entries, *eu_entries]))

    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    de_count = sum(1 for e in registry if e["source"] == "gesetze-im-internet")
    eu_count = sum(1 for e in registry if e["source"] == "eurlex")
    print(f"Wrote {len(registry)} laws to {out_file}")
    print(f"German index entries: {de_count}")
    print(f"EU index entries: {eu_count}")


if __name__ == "__main__":
    main()
