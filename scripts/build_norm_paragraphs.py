#!/usr/bin/env python3
"""Parse DE XML and EU XHTML sources into normalized NormParagraph JSONL records."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

from laws_paths import LAW_PATHS
from pipeline_models import NormParagraph


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build normalized NormParagraph records.")
    parser.add_argument("--de-dir", default=str(LAW_PATHS["de_norm_xml_dir"]))
    parser.add_argument("--eu-dir", default=str(LAW_PATHS["eu_norm_html_dir"]))
    parser.add_argument("--out-file", default=str(LAW_PATHS["norm_paragraphs_file"]))
    return parser.parse_args()


def strip_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def slug_from_file(file_name: str) -> str:
    return re.sub(r"\.[^.]+$", "", file_name)


def extract_paragraph_number(reference: str) -> str:
    match = re.match(r"^§\s*(\d+[a-zA-Z]?)", reference)
    return match.group(1) if match else ""


def resolve_law_abbrev(soup: BeautifulSoup, slug: str) -> str:
    first_norm = soup.find("norm")
    if not first_norm:
        return slug

    root_amtabk = first_norm.find("amtabk")
    root_jurabk = first_norm.find("jurabk")
    return strip_text(
        (root_amtabk.text if root_amtabk else "")
        or (root_jurabk.text if root_jurabk else "")
        or slug
    )


def build_german_paragraph(
    norm,
    slug: str,
    law_abbrev: str,
) -> NormParagraph | None:
    enbez = norm.find("enbez")
    reference = strip_text(enbez.text if enbez else "")
    if not reference or "inhaltsübersicht" in reference.lower():
        return None

    content = norm.find("Content")
    text = strip_text(content.get_text(" ", strip=True) if content else "")
    if not text:
        return None

    doknr = norm.get("doknr", "")
    paragraph_number = extract_paragraph_number(reference)
    url = (
        f"https://www.gesetze-im-internet.de/{slug}/__{paragraph_number}.html"
        if paragraph_number
        else f"https://www.gesetze-im-internet.de/{slug}/index.html"
    )

    return NormParagraph(
        law_abbrev=law_abbrev,
        source="gesetze-im-internet",
        reference=reference,
        text=text,
        url=url,
        paragraph_id=f"de:{law_abbrev}:{doknr or reference}",
    )


def parse_german_file(file_path: Path) -> list[NormParagraph]:
    xml = file_path.read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(xml, "xml")
    slug = slug_from_file(file_path.name)
    law_abbrev = resolve_law_abbrev(soup, slug)

    rows: list[NormParagraph] = []
    for norm in soup.find_all("norm"):
        row = build_german_paragraph(norm, slug, law_abbrev)
        if row is not None:
            rows.append(row)

    return rows


def parse_eu_eli_file(soup: BeautifulSoup, celex: str) -> list[NormParagraph]:
    rows: list[NormParagraph] = []
    for div in soup.find_all("div", class_="eli-subdivision"):
        div_id = div.get("id", "")
        if not div_id.startswith("art_"):
            continue
        art = div_id.replace("art_", "", 1)
        text = strip_text(div.get_text(" ", strip=True))
        if not text:
            continue

        rows.append(
            NormParagraph(
                law_abbrev=celex,
                source="eurlex",
                reference=f"Art. {art}",
                text=text,
                url=f"https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:{celex}#{div_id}",
                paragraph_id=f"eu:{celex}:{div_id}",
            )
        )

    return rows


EU_ARTICLE_HEADING_RE = re.compile(r"^Artikel\s+(\d+[a-z]?)\s*$", re.I)


EU_OPERATIVE_START_RE = re.compile(
    r"HA(?:T|BEN) FOLGENDE (?:RICHTLINIE|VERORDNUNG) ERLASSEN",
    re.I,
)


def parse_eu_legacy_html_file(soup: BeautifulSoup, celex: str) -> list[NormParagraph]:
    content_root = soup.find("txt_te") or soup.find(id="TexteOnly")
    if content_root is None:
        return []

    rows: list[NormParagraph] = []
    current_art: str | None = None
    current_parts: list[str] = []
    operative_started = False

    def flush_article() -> None:
        nonlocal current_art, current_parts
        if current_art is None or not current_parts:
            current_art = None
            current_parts = []
            return

        text = strip_text(" ".join(current_parts))
        if text:
            div_id = f"art_{current_art}"
            rows.append(
                NormParagraph(
                    law_abbrev=celex,
                    source="eurlex",
                    reference=f"Art. {current_art}",
                    text=text,
                    url=f"https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:{celex}#{div_id}",
                    paragraph_id=f"eu:{celex}:{div_id}",
                )
            )
        current_art = None
        current_parts = []

    for paragraph in content_root.find_all("p"):
        text = strip_text(paragraph.get_text(" ", strip=True))
        if not text:
            continue

        if EU_OPERATIVE_START_RE.search(text):
            operative_started = True
            continue

        match = EU_ARTICLE_HEADING_RE.match(text)
        if match and operative_started:
            flush_article()
            current_art = match.group(1)
            continue

        if current_art is not None:
            current_parts.append(text)

    flush_article()
    return rows


def parse_eu_file(file_path: Path) -> list[NormParagraph]:
    html = file_path.read_text(encoding="utf-8", errors="replace")
    celex = file_path.stem.split(".")[0]
    parser = "xml" if file_path.suffix.lower() == ".xhtml" else "html.parser"
    soup = BeautifulSoup(html, parser)

    rows = parse_eu_eli_file(soup, celex)
    if rows:
        return rows

    return parse_eu_legacy_html_file(soup, celex)


def main() -> None:
    args = parse_args()
    de_dir = Path(args.de_dir)
    eu_dir = Path(args.eu_dir)
    out_file = Path(args.out_file)

    rows: list[NormParagraph] = []

    for xml_file in sorted(de_dir.glob("*.xml")):
        rows.extend(parse_german_file(xml_file))

    for eu_file in sorted(set(eu_dir.glob("*.xhtml")) | set(eu_dir.glob("*.html"))):
        rows.extend(parse_eu_file(eu_file))

    out_file.parent.mkdir(parents=True, exist_ok=True)
    with out_file.open("w", encoding="utf-8") as f:
        for row in rows:
            f.write(json.dumps(row.model_dump(), ensure_ascii=False) + "\n")

    de_count = sum(1 for row in rows if row.source == "gesetze-im-internet")
    eu_count = sum(1 for row in rows if row.source == "eurlex")

    print(f"Wrote {len(rows)} NormParagraph records to {out_file}")
    print(f"DE records: {de_count}")
    print(f"EU records: {eu_count}")


if __name__ == "__main__":
    main()
