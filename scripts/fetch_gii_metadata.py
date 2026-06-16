#!/usr/bin/env python3
"""Fetch jurabk / kurzue / ausfertigung_datum for every GII law in the registry.

Only the first ~8 KB of each ZIP is streamed (enough to reach the <metadaten>
block for virtually all laws), so this is much lighter than a full corpus
download.  Results are written to a JSON cache that build_law_registry.py reads
automatically.

Usage:
    pnpm laws:fetch-metadata                  # all GII laws without cached data
    pnpm laws:fetch-metadata --force          # re-fetch even already-cached slugs
    pnpm laws:fetch-metadata --limit 200      # process at most N laws per run
    pnpm laws:fetch-metadata --workers 20     # concurrent connections (default: 10)
    pnpm laws:fetch-metadata --retries 5      # retry transient network errors (default: 5)
"""

from __future__ import annotations

import argparse
import io
import json
import re
import socket
import ssl
import sys
import threading
import time
import zipfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from laws_paths import LAW_PATHS

USER_AGENT = "zfl-law-downloader/1.0 (+https://github.com/digitalservicebund/zfl-website)"
METADATA_CACHE_FILE = LAW_PATHS["registry_file"].parent.parent / "cache" / "gii_metadata.json"
# How many bytes to stream before giving up on finding <metadaten>
STREAM_CHUNK = 8 * 1024  # 8 KB


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch jurabk metadata for GII laws.")
    parser.add_argument(
        "--registry",
        default=str(LAW_PATHS["registry_file"]),
        help="Path to laws.json registry (default: registry_file from laws_paths)",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-fetch slugs that are already in the cache",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Stop after fetching N laws (0 = no limit)",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=10,
        help="Number of concurrent HTTP connections (default: 10)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.0,
        help="Seconds to wait between dispatching requests per worker (default: 0)",
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=5,
        help="Retry count for transient network errors (default: 5)",
    )
    parser.add_argument(
        "--retry-delay",
        type=float,
        default=1.0,
        help="Base seconds for exponential backoff between retries (default: 1.0)",
    )
    return parser.parse_args()


def decode_xml_entities(value: str) -> str:
    return (
        value.replace("&quot;", '"')
        .replace("&apos;", "'")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
    )


def is_transient_fetch_error(exc: BaseException) -> bool:
    """Return True for rate limits and other errors worth retrying."""
    if isinstance(exc, (ConnectionResetError, BrokenPipeError, TimeoutError, socket.timeout)):
        return True
    if isinstance(exc, URLError):
        reason = exc.reason
        if isinstance(
            reason,
            (ConnectionResetError, BrokenPipeError, TimeoutError, socket.timeout, ssl.SSLError),
        ):
            return True
        if isinstance(reason, OSError) and reason.errno in (54, 60, 61):
            return True
    if isinstance(exc, HTTPError) and exc.code in (429, 502, 503, 504):
        return True
    return False


def stream_zip_bytes(
    url: str,
    max_bytes: int,
    *,
    max_retries: int = 5,
    retry_delay: float = 1.0,
) -> bytes:
    """Stream up to max_bytes from a remote ZIP, enough to find <metadaten>."""
    last_exc: BaseException | None = None
    for attempt in range(max_retries + 1):
        try:
            req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
            with urlopen(req, timeout=30) as resp:
                return resp.read(max_bytes)
        except Exception as exc:  # noqa: BLE001
            last_exc = exc
            if attempt == max_retries or not is_transient_fetch_error(exc):
                raise
            time.sleep(retry_delay * (2**attempt))
    raise last_exc  # pragma: no cover


def extract_xml_from_zip_bytes(raw: bytes) -> str | None:
    """Try to open a (possibly truncated) ZIP and return the first XML entry."""
    try:
        with zipfile.ZipFile(io.BytesIO(raw)) as zf:
            for name in zf.namelist():
                if name.lower().endswith(".xml"):
                    return zf.read(name).decode("utf-8", errors="replace")
    except (zipfile.BadZipFile, KeyError, EOFError):
        pass
    # Truncated ZIP — the central directory is missing but raw bytes may still
    # contain the XML content; try to find it directly.
    try:
        return raw.decode("utf-8", errors="replace")
    except Exception:  # noqa: BLE001
        return None


def tag_value(xml: str, tag: str) -> str | None:
    m = re.search(rf"<{tag}[^>]*>([^<]+)</{tag}>", xml)
    return decode_xml_entities(m.group(1).strip()) if m else None


def fetch_metadata_for_slug(
    url: str,
    max_bytes: int,
    *,
    max_retries: int = 5,
    retry_delay: float = 1.0,
) -> dict:
    """Return {jurabk, kurzue, ausfertigung_datum} extracted from a GII zip URL."""
    raw = stream_zip_bytes(
        url,
        max_bytes,
        max_retries=max_retries,
        retry_delay=retry_delay,
    )
    xml = extract_xml_from_zip_bytes(raw) or ""
    return {
        "jurabk": tag_value(xml, "jurabk"),
        "kurzue": tag_value(xml, "kurzue"),
        "ausfertigung_datum": tag_value(xml, "ausfertigung-datum"),
    }


def load_cache(path: Path) -> dict:
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return {}


def save_cache(path: Path, cache: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    args = parse_args()

    registry = json.loads(Path(args.registry).read_text(encoding="utf-8"))
    gii_laws = [l for l in registry if l["source"] == "gesetze-im-internet" and l.get("gii_xml_zip_url")]

    cache = load_cache(METADATA_CACHE_FILE)
    cache_lock = threading.Lock()

    to_fetch = [l for l in gii_laws if args.force or l["abbrev"] not in cache]

    if args.limit:
        to_fetch = to_fetch[: args.limit]

    total = len(to_fetch)
    print(f"Laws to fetch: {total}  (cache already has {len(cache)} entries, workers={args.workers})")

    counter = {"fetched": 0, "errors": 0, "done": 0}

    def fetch_one(law: dict) -> tuple[str, dict | None, Exception | None]:
        if args.delay:
            time.sleep(args.delay)
        try:
            meta = fetch_metadata_for_slug(
                law["gii_xml_zip_url"],
                STREAM_CHUNK,
                max_retries=args.retries,
                retry_delay=args.retry_delay,
            )
            return law["abbrev"], meta, None
        except Exception as exc:  # noqa: BLE001
            return law["abbrev"], None, exc

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(fetch_one, law): law for law in to_fetch}
        for future in as_completed(futures):
            slug, meta, exc = future.result()
            counter["done"] += 1
            n = counter["done"]

            if exc is not None:
                counter["errors"] += 1
                print(f"[{n}/{total}] {slug:30s} ERROR: {exc}")
            else:
                counter["fetched"] += 1
                with cache_lock:
                    cache[slug] = meta
                jurabk = (meta or {}).get("jurabk") or "-"
                print(f"[{n}/{total}] {slug:30s} jurabk={jurabk}")

            if n % 100 == 0 or n == total:
                with cache_lock:
                    snapshot = dict(cache)
                save_cache(METADATA_CACHE_FILE, snapshot)
                print(f"  → cache saved ({len(snapshot)} entries)")

    with cache_lock:
        save_cache(METADATA_CACHE_FILE, cache)
    print(f"\nDone. fetched={counter['fetched']}, errors={counter['errors']}")
    print(f"Cache: {METADATA_CACHE_FILE}  ({len(cache)} total entries)")
    if counter["errors"]:
        sys.exit(1)


if __name__ == "__main__":
    main()
