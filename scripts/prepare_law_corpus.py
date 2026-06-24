#!/usr/bin/env python3
"""Transform downloaded raw law files into parser-ready local corpora."""

from __future__ import annotations

import argparse
import shutil
import zipfile
from pathlib import Path

from laws_paths import LAW_PATHS


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prepare local corpus folders from downloaded source files.")
    parser.add_argument("--download-dir", default=str(LAW_PATHS["download_dir"]))
    parser.add_argument("--de-out-dir", default=str(LAW_PATHS["de_norm_xml_dir"]))
    parser.add_argument("--eu-out-dir", default=str(LAW_PATHS["eu_norm_html_dir"]))
    return parser.parse_args()


def extract_single_xml(zip_path: Path) -> bytes:
    with zipfile.ZipFile(zip_path) as zf:
        xml_names = [name for name in zf.namelist() if name.lower().endswith(".xml")]
        if not xml_names:
            raise RuntimeError(f"No XML entry found in {zip_path}")
        with zf.open(xml_names[0]) as f:
            return f.read()


def main() -> None:
    args = parse_args()
    download_dir = Path(args.download_dir)
    de_zip_dir = download_dir / "de"
    eu_source_dir = download_dir / "eu"
    de_out_dir = Path(args.de_out_dir)
    eu_out_dir = Path(args.eu_out_dir)

    de_out_dir.mkdir(parents=True, exist_ok=True)
    eu_out_dir.mkdir(parents=True, exist_ok=True)

    de_count = 0
    for zip_file in sorted(de_zip_dir.glob("*.zip")):
        slug = zip_file.stem
        xml_blob = extract_single_xml(zip_file)
        (de_out_dir / f"{slug}.xml").write_bytes(xml_blob)
        de_count += 1

    eu_count = 0
    for pattern in ("*.xhtml", "*.html"):
        for source_file in sorted(eu_source_dir.glob(pattern)):
            shutil.copy2(source_file, eu_out_dir / source_file.name)
            eu_count += 1

    print("Prepared corpus folders.")
    print(f"DE XML files: {de_count} -> {de_out_dir}")
    print(f"EU HTML/XHTML files: {eu_count} -> {eu_out_dir}")


if __name__ == "__main__":
    main()
