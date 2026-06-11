"""Natural sort keys for German § and EU Art. legal references."""

from __future__ import annotations

import re

_SUB_POSITION_PATTERNS: tuple[tuple[str, bool], ...] = (
    (r"(?:Absatz|Abs\.)\s*(\d+)", True),
    (r"(?:Satz|Sat\.)\s*(\d+)", True),
    (r"(?:Nummer|Nr\.)\s*(\d+)", True),
    (r"(?:Buchstabe|Buchst\.|lit\.)\s*([a-zA-Z])", False),
)


def _append_sub_positions(key: list, rest: str) -> None:
    for pattern, numeric in _SUB_POSITION_PATTERNS:
        for match in re.finditer(pattern, rest, re.IGNORECASE):
            value = match.group(1)
            key.append(int(value) if numeric else value.lower())


def reference_sort_key(reference: str) -> tuple:
    ref = reference.strip()

    section_match = re.match(r"^§\s*(\d+)\s*([a-zA-Z])?\b", ref, re.IGNORECASE)
    if section_match:
        key: list = [0, int(section_match.group(1)), section_match.group(2) or ""]
        _append_sub_positions(key, ref[section_match.end() :])
        return tuple(key)

    article_match = re.match(r"^Art\.?\s*(\d+)\b", ref, re.IGNORECASE)
    if article_match:
        key = [1, int(article_match.group(1))]
        _append_sub_positions(key, ref[article_match.end() :])
        return tuple(key)

    return (2, ref.lower())
