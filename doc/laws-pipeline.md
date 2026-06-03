# Laws Pipeline Structure

This project now uses a single canonical folder layout for the obligations extraction pipeline.

## Canonical folders

```text
data/laws/
  import/                          # Manual input lists (CSV)
    gesetze_und_verordnungen.csv
    eu_regelungen_zu_finanzgesetzen.csv

  cache/
    downloads/                     # Raw downloaded source files + reports
      de/*.zip
      eu/*.xhtml
      download_report.csv
      download_report.json

  sources/
    de/xml/*.xml                   # Prepared German XML corpus
    eu/html/*.xhtml                # Prepared EU HTML corpus

  normalized/
    norm_paragraphs.jsonl          # Shared NormParagraph records

  registry/
    laws.json                      # Single source of truth for processable laws

public/data/obligations/           # UI-served CSV artifacts
  Pflichten_LLM_<abbrev>.csv
  Pflichten_LLM_All.csv
```

## Script defaults

All law pipeline scripts now default to the canonical paths above:

- `pnpm laws:download`
- `pnpm laws:prepare-corpus`
- `pnpm laws:build-registry`
- `pnpm laws:validate-registry`
- `pnpm laws:build-paragraphs`
- `pnpm laws:concat-obligations`
- `pnpm laws:publish-ui-data`

You can still override paths using CLI flags on each script.

## Typical run order

1. `pnpm laws:download`
2. `pnpm laws:prepare-corpus`
3. `pnpm laws:build-registry`
4. `pnpm laws:validate-registry`
5. `pnpm laws:build-paragraphs`
6. Run LLM extraction per law into `public/data/obligations/Pflichten_LLM_<abbrev>.csv`
7. `pnpm laws:concat-obligations`
8. `pnpm laws:publish-ui-data`
