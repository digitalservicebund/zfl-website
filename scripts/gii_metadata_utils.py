"""Shared helpers for jurabk / kurzue extraction from GII law XML."""

from __future__ import annotations

import re

# Strip trailing legal citation blocks commonly appended to ``langue`` titles.
_CITATION_SUFFIX_RE = re.compile(
    r"\s*\((?:Artikel|Art\.|Gesetz vom|BGBl\.)\b.*",
    re.I,
)


def derive_kurzue_from_langue(langue: str | None) -> str | None:
    """Use ``langue`` as kurzue when the dedicated tag is absent.

    Single-segment values (e.g. ``Zivilprozessordnung``) are returned as-is.
    Multi-segment titles separated by `` - `` use the last substantive segment
    after citation suffixes are removed (works for compound titles such as
    ``Sozialgesetzbuch … - … - Gesetzliche Krankenversicherung - (Artikel …)``).
    """
    if not langue:
        return None

    trimmed = langue.strip()
    if not trimmed:
        return None

    if " - " not in trimmed:
        return trimmed

    candidates: list[str] = []
    for part in trimmed.split(" - ")[1:]:
        short = _CITATION_SUFFIX_RE.sub("", part).strip()
        if short and not short.startswith("("):
            candidates.append(short)

    return candidates[-1] if candidates else None


def enrich_gii_metadata(
    *,
    jurabk: str | None,
    amtabk: str | None,
    kurzue: str | None,
    langue: str | None,
) -> tuple[str | None, str | None]:
    """Fill missing jurabk/kurzue from other GII metadata fields."""
    resolved_jurabk = jurabk or amtabk
    resolved_kurzue = kurzue or derive_kurzue_from_langue(langue)
    return resolved_jurabk, resolved_kurzue
