#!/usr/bin/env python3
"""Download DE and EU law source files into the local pipeline cache.

This is the Python equivalent of the old JS downloader.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from laws_paths import LAW_PATHS

USER_AGENT = "zfl-law-downloader/1.0 (+https://github.com/digitalservicebund/zfl-website)"
GII_TOC_URL = "https://www.gesetze-im-internet.de/gii-toc.xml"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Download EU and German source law files.")
    parser.add_argument("--eu-csv", default=str(LAW_PATHS["eu_input_csv"]))
    parser.add_argument("--de-csv", default=str(LAW_PATHS["de_input_csv"]))
    parser.add_argument("--out-dir", default=str(LAW_PATHS["download_dir"]))
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def normalize_title(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value.lower())
    normalized = re.sub(r"[^a-z0-9]+", " ", normalized).strip()
    return normalized


def token_set(value: str) -> set[str]:
    return {t for t in normalize_title(value).split() if len(t) >= 3}


def jaccard_similarity(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    intersection = len(a.intersection(b))
    union = len(a) + len(b) - intersection
    return 0.0 if union == 0 else intersection / union


def slugify(value: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"\s+", "-", normalize_title(value))).strip("-")[:120]


def fetch_bytes(url: str, accept: str = "*/*") -> tuple[bytes, str]:
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": accept})
    with urlopen(req) as resp:
        content_type = resp.headers.get("Content-Type", "")
        return resp.read(), content_type


def fetch_text(url: str) -> str:
    body, _ = fetch_bytes(
        url,
        "application/rdf+xml, application/xml, text/xml, text/plain, text/html;q=0.8, */*;q=0.1",
    )
    return body.decode("utf-8", errors="replace")


def parse_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def decode_xml_entities(value: str) -> str:
    return (
        value.replace("&quot;", '"')
        .replace("&apos;", "'")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
    )


def fetch_gii_toc() -> list[dict[str, str]]:
    xml = fetch_text(GII_TOC_URL)
    entries: list[dict[str, str]] = []
    for block in re.findall(r"<item>([\s\S]*?)</item>", xml):
        title_m = re.search(r"<title[^>]*>([\s\S]*?)</title>", block, re.I)
        link_m = re.search(r"<link[^>]*>([\s\S]*?)</link>", block, re.I)
        if not title_m or not link_m:
            continue
        title = decode_xml_entities(title_m.group(1).strip())
        link = decode_xml_entities(link_m.group(1).strip())
        if title and link:
            entries.append({"title": title, "normalized": normalize_title(title), "link": link})
    return entries


def extract_gii_slug(url: str) -> str:
    m = re.search(r"gesetze-im-internet\.de/([^/]+)/xml\.zip", url, re.I)
    return m.group(1) if m else ""


def gii_candidates(search_title: str, gii_index: list[dict[str, str]], limit: int = 3) -> list[dict[str, str]]:
    search_tokens = token_set(search_title)
    ranked: list[dict[str, str]] = []
    for entry in gii_index:
        score = jaccard_similarity(search_tokens, token_set(entry["title"]))
        if score <= 0:
            continue
        ranked.append({**entry, "score": score, "slug": extract_gii_slug(entry["link"])})
    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked[:limit]


def best_gii_match(search_title: str, gii_index: list[dict[str, str]]) -> dict[str, str] | None:
    normalized = normalize_title(search_title)
    if not normalized:
        return None
    for entry in gii_index:
        if entry["normalized"] == normalized:
            return entry
    candidates = [c for c in gii_candidates(search_title, gii_index, 1) if c["score"] >= 0.65]
    return candidates[0] if candidates else None


def extension_from_content_type(content_type: str, fallback: str) -> str:
    value = content_type.lower()
    if "xhtml" in value:
        return "xhtml"
    if "xml" in value:
        return "xml"
    if "pdf" in value:
        return "pdf"
    if "zip" in value:
        return "zip"
    if "text/plain" in value:
        return "txt"
    return fallback


def celex_from_row(row: dict[str, str]) -> str:
    celex = (row.get("celex") or "").strip().upper()
    if celex:
        return celex

    source = row.get("Nummer", "")
    kind = (row.get("Art der Regelung", "") or "").lower()

    regulation_likely = "verordnung" in kind or re.search(r"\bvo\b", source, re.I)
    directive_likely = "richtlinie" in kind or re.search(r"\brl\b", source, re.I)

    nr_pattern = re.search(r"(\d{1,4})\s*/\s*(\d{4})", source)
    if nr_pattern and regulation_likely:
        number = nr_pattern.group(1).zfill(4)
        year = nr_pattern.group(2)
        return f"3{year}R{number}"

    year_first = re.search(r"(\d{4})\s*/\s*(\d{1,4})", source)
    if year_first:
        year = year_first.group(1)
        number = year_first.group(2).zfill(4)
        if regulation_likely:
            return f"3{year}R{number}"
        if directive_likely:
            return f"3{year}L{number}"

    return ""


def pick_eu_languages(row: dict[str, str]) -> list[str]:
    raw = (row.get("eu_languages") or "").strip()
    if raw:
        return [x.strip().upper() for x in raw.split(",") if x.strip()]
    return ["DEU", "ENG"]


def pick_eu_manifestations(row: dict[str, str]) -> list[str]:
    raw = (row.get("eu_manifestations") or "").strip()
    if raw:
        return [x.strip() for x in raw.split(",") if x.strip()]
    return ["xhtml", "fmx4", "pdfa2a"]


def extract_resources_by_predicate(rdf: str, predicate_name: str) -> list[str]:
    values = re.findall(rf"{predicate_name}\s+rdf:resource=\"([^\"]+)\"", rdf)
    return list(dict.fromkeys(values))


def extract_item_url_from_manifestation_rdf(rdf: str) -> str:
    m = re.search(r'rdf:resource="(http://publications\.europa\.eu/resource/cellar/[^"]+/DOC_\d+)"', rdf)
    return m.group(1) if m else ""


def parse_language_from_expression_url(url: str) -> str:
    last = url.split(".")[-1]
    return last.upper() if len(last) == 3 else ""


def guess_manifestation_type_from_url(url: str) -> str:
    return url.split(".")[-1]


def _sort_expressions_by_language(expressions: list[str], languages: list[str]) -> list[str]:
    def lang_score(url: str) -> int:
        lang = parse_language_from_expression_url(url)
        return languages.index(lang) if lang in languages else 999

    return sorted(expressions, key=lang_score)


def _resolve_from_expression(expression_url: str, manifestations: list[str]) -> tuple[str, str] | None:
    expression_rdf = fetch_text(expression_url)
    manifestation_urls = extract_resources_by_predicate(
        expression_rdf, "expression_manifested_by_manifestation"
    )
    if not manifestation_urls:
        return None

    def kind_score(url: str) -> int:
        kind = guess_manifestation_type_from_url(url)
        return manifestations.index(kind) if kind in manifestations else 999

    for manifestation_url in sorted(manifestation_urls, key=kind_score):
        kind = guess_manifestation_type_from_url(manifestation_url)
        manifestation_rdf = fetch_text(manifestation_url)
        item_url = extract_item_url_from_manifestation_rdf(manifestation_rdf)
        if item_url:
            return item_url, kind

    return None


def resolve_eu_item_url(celex: str, languages: list[str], manifestations: list[str]) -> tuple[str, str, str]:
    celex_rdf = fetch_text(f"http://publications.europa.eu/resource/celex/{celex}")
    expressions = extract_resources_by_predicate(celex_rdf, "work_has_expression")
    if not expressions:
        raise RuntimeError(f"No expressions found for CELEX {celex}")

    ordered_expressions = _sort_expressions_by_language(expressions, languages)
    last_error = "No matching manifestation found."

    for expression_url in ordered_expressions:
        expression_lang = parse_language_from_expression_url(expression_url) or "UNK"
        try:
            resolved = _resolve_from_expression(expression_url, manifestations)
            if resolved:
                item_url, kind = resolved
                return item_url, expression_lang, kind
        except Exception as exc:  # noqa: BLE001
            last_error = str(exc)

    raise RuntimeError(last_error)


def process_eu_rows(
    eu_rows: list[dict[str, str]], out_dir: Path, dry_run: bool
) -> list[dict[str, str]]:
    results: list[dict[str, str]] = []
    for row in eu_rows:
        title = row.get("Name", "")
        celex = celex_from_row(row)
        if not celex:
            results.append(
                {
                    "source": "EU",
                    "title": title,
                    "id": "",
                    "status": "error",
                    "output_file": "",
                    "source_url": "",
                    "details": "Missing CELEX. Provide celex column in CSV.",
                }
            )
            continue

        try:
            item_url, language, manifestation = resolve_eu_item_url(
                celex, pick_eu_languages(row), pick_eu_manifestations(row)
            )
            output_file = ""
            if not dry_run:
                blob, content_type = fetch_bytes(item_url)
                ext = extension_from_content_type(content_type, manifestation)
                filename = f"{celex}.{language}.{ext}"
                output_file = f"eu/{filename}"
                (out_dir / output_file).write_bytes(blob)

            results.append(
                {
                    "source": "EU",
                    "title": title,
                    "id": celex,
                    "status": "ok",
                    "output_file": output_file,
                    "source_url": item_url,
                    "details": f"manifestation={manifestation}; language={language}",
                }
            )
        except Exception as exc:  # noqa: BLE001
            results.append(
                {
                    "source": "EU",
                    "title": title,
                    "id": celex,
                    "status": "error",
                    "output_file": "",
                    "source_url": "",
                    "details": str(exc),
                }
            )
    return results


def process_de_rows(
    de_rows: list[dict[str, str]], gii_index: list[dict[str, str]], out_dir: Path, dry_run: bool
) -> list[dict[str, str]]:
    results: list[dict[str, str]] = []
    for row in de_rows:
        title = row.get("Gesetz_Verordnung", "")
        zip_url = gii_zip_url_for_row(row, gii_index)
        if not zip_url:
            candidates = " | ".join(
                f"{c.get('slug', '')} ({c.get('title', '')})" for c in gii_candidates(title, gii_index)
            )
            details = (
                "No matching gii URL. Add gii_slug or gii_xml_zip_url."
                if not candidates
                else f"No matching gii URL. Add gii_slug or gii_xml_zip_url. Candidates: {candidates}"
            )
            results.append(
                {
                    "source": "DE",
                    "title": title,
                    "id": "",
                    "status": "error",
                    "output_file": "",
                    "source_url": "",
                    "details": details,
                }
            )
            continue

        try:
            output_file = ""
            if not dry_run:
                blob, content_type = fetch_bytes(zip_url)
                slug = (row.get("gii_slug") or "").strip() or extract_gii_slug(zip_url) or slugify(title)
                ext = extension_from_content_type(content_type, "zip")
                filename = f"{slug}.{ext}"
                output_file = f"de/{filename}"
                (out_dir / output_file).write_bytes(blob)

            results.append(
                {
                    "source": "DE",
                    "title": title,
                    "id": (row.get("gii_slug") or "").strip() or extract_gii_slug(zip_url),
                    "status": "ok",
                    "output_file": output_file,
                    "source_url": zip_url,
                    "details": "",
                }
            )
        except Exception as exc:  # noqa: BLE001
            results.append(
                {
                    "source": "DE",
                    "title": title,
                    "id": (row.get("gii_slug") or "").strip(),
                    "status": "error",
                    "output_file": "",
                    "source_url": zip_url,
                    "details": str(exc),
                }
            )
    return results


def gii_zip_url_for_row(row: dict[str, str], gii_index: list[dict[str, str]]) -> str:
    if row.get("gii_xml_zip_url"):
        return row["gii_xml_zip_url"].strip()
    if row.get("gii_slug"):
        return f"https://www.gesetze-im-internet.de/{row['gii_slug'].strip()}/xml.zip"

    search_title = (row.get("gii_title") or row.get("Gesetz_Verordnung") or "").strip()
    if not search_title:
        return ""
    match = best_gii_match(search_title, gii_index)
    return (match["link"].replace("http://", "https://") if match else "")


def write_reports(out_dir: Path, rows: list[dict[str, str]]) -> None:
    headers = ["source", "title", "id", "status", "output_file", "source_url", "details"]
    out_dir.mkdir(parents=True, exist_ok=True)

    with (out_dir / "download_report.csv").open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers, delimiter=";")
        writer.writeheader()
        writer.writerows(rows)

    with (out_dir / "download_report.json").open("w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
        f.write("\n")


def main() -> None:
    args = parse_args()
    eu_csv = Path(args.eu_csv)
    de_csv = Path(args.de_csv)
    out_dir = Path(args.out_dir)

    out_dir.mkdir(parents=True, exist_ok=True)
    eu_rows = parse_csv(eu_csv)
    de_rows = parse_csv(de_csv)

    print(f"Loaded {len(eu_rows)} EU rows and {len(de_rows)} DE rows.")

    gii_index = fetch_gii_toc()
    print(f"Loaded {len(gii_index)} entries from Gesetze-im-Internet TOC.")

    eu_dir = out_dir / "eu"
    de_dir = out_dir / "de"
    eu_dir.mkdir(parents=True, exist_ok=True)
    de_dir.mkdir(parents=True, exist_ok=True)
    results = process_eu_rows(eu_rows, out_dir, args.dry_run)
    results.extend(process_de_rows(de_rows, gii_index, out_dir, args.dry_run))

    write_reports(out_dir, results)
    ok_count = sum(1 for row in results if row["status"] == "ok")
    print(f"Finished. {ok_count} succeeded, {len(results) - ok_count} failed.")
    print(f"Report: {out_dir / 'download_report.csv'}")


if __name__ == "__main__":
    main()
