#!/usr/bin/env python3
"""Publish registry data from pipeline storage into static UI public assets."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from laws_paths import LAW_PATHS


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Publish laws registry for static UI consumption.")
    parser.add_argument("--registry-in", default=str(LAW_PATHS["registry_file"]))
    parser.add_argument("--registry-out", default=str(LAW_PATHS["ui_registry_file"]))
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    registry_in = Path(args.registry_in)
    registry_out = Path(args.registry_out)

    registry_out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(registry_in, registry_out)

    print(f"Published {registry_in} -> {registry_out}")


if __name__ == "__main__":
    main()
