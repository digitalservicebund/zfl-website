# Scripts Overview

This folder contains the Python-based legal pipeline tooling for downloading, normalizing, validating, and publishing law data for obligations extraction.

## Commands

Run all commands from the project root.

- `pnpm laws:download`
  - Runs `./scripts/run_pipeline_python.sh scripts/download_laws.py`
  - Downloads DE/EU source files into local cache.

- `pnpm laws:prepare-corpus`
  - Runs `./scripts/run_pipeline_python.sh scripts/prepare_law_corpus.py`
  - Converts raw downloads into parser-ready source folders.

- `pnpm laws:build-registry`
  - Runs `./scripts/run_pipeline_python.sh scripts/build_law_registry.py`
  - Builds canonical law registry JSON.
  - Default mode uses curated EU CSV only; add `--with-eu-sparql` for full CELEX crawl.

- `pnpm laws:validate-registry`
  - Runs `./scripts/run_pipeline_python.sh scripts/validate_law_registry.py`
  - Validates registry consistency and formats.

- `pnpm laws:build-paragraphs`
  - Runs `./scripts/run_pipeline_python.sh scripts/build_norm_paragraphs.py`
  - Builds normalized paragraph-level JSONL dataset.

- `pnpm laws:fetch-metadata`
  - Runs `./scripts/run_pipeline_python.sh scripts/fetch_gii_metadata.py`
  - Streams the first ~8 KB of each GII law ZIP to extract `jurabk`, `kurzue`, and `ausfertigung_datum`.
  - Results are cached in `data/laws/cache/gii_metadata.json` and read automatically by `build_law_registry.py`.
  - Supports `--force`, `--limit N`, `--workers N`, `--delay S`.

- `pnpm laws:extract-obligations [--norm <ABBREV>] [--model gpt-5.4-mini] [--reasoning-effort low] [--rerun]`
  - Runs `./scripts/run_pipeline_python.sh scripts/extract_obligations.py`
  - Extracts obligations with structured LLM output and writes per-law CSV files.
  - Resumes safely via `data/laws/cache/extraction_progress.json`.

- `pnpm laws:concat-obligations`
  - Runs `./scripts/run_pipeline_python.sh scripts/concat_obligations_csv.py`
  - Merges per-law obligations CSV files into one aggregate.

- `pnpm laws:publish-ui-data`
  - Runs `./scripts/run_pipeline_python.sh scripts/publish_laws_ui_data.py`
  - Copies registry into static UI data location.

## LLM model choice

### Why `gpt-5.4-mini` with `reasoning_effort: low`

We benchmarked all models available on the Langdock API (June 2026) against a real worst-case paragraph from the ELTIF Regulation (Art. 1, 8 000 chars after truncation) using our actual prompt and response schema. Results:

| Model             | Config                      | Wall time         | Obligations found |
| ----------------- | --------------------------- | ----------------- | ----------------- |
| gpt-5.1           | default                     | timeout (>20 min) | —                 |
| gpt-5.4           | `reasoning_effort: none`    | 14 s              | 6                 |
| gpt-5.4           | `reasoning_effort: low`     | 28 s              | 6                 |
| **gpt-5.4-mini**  | **`reasoning_effort: low`** | **12 s**          | **7**             |
| gpt-5.4-mini      | `reasoning_effort: none`    | 11 s              | 5                 |
| gpt-5.4-mini      | default (no reasoning)      | 5 s               | 4                 |
| gpt-5-chat-latest | default                     | 2 s               | 1                 |
| gpt-5-mini        | default                     | 2 s               | 0                 |
| gemini-2.5-flash  | —                           | 30–38 s           | 7                 |

`gpt-5.4-mini` with `low` was the only model that matched Gemini's recall at a third of the latency. Faster configs visibly dropped obligations — unacceptable for a legal extraction task. `gpt-5.1` hung on large paragraphs because its unbounded default reasoning accumulates too many thinking tokens.

### Why Gemini does not work reliably

The Langdock API proxies Gemini through Google Vertex AI. We verified empirically (June 2026) that **Langdock strips `thinkingConfig` from `generationConfig` before forwarding to Vertex** — passing `thinkingBudget: 0` has no effect (identical `thoughtsTokenCount` with and without the field). This means thinking cannot be disabled via the Langdock route. As a result, large paragraphs trigger 30–60 s+ thinking steps that push against the HTTP client timeout, making the extraction slow and fragile. Additionally, the previous model name `gemini-3-flash-preview` does not exist on Langdock — the valid identifiers are `gemini-2.5-flash`, `gemini-2.5-pro`, and `gemini-3.5-flash`.

Gemini support remains in the codebase via `--model gemini-*` for comparison purposes if Langdock ever exposes `thinkingConfig`.

## Python dependencies

- Install once for the pipeline:
  - `python3 -m pip install -r scripts/requirements-pipeline.txt`
- The Astro/JS UI remains unchanged and still reads static assets from `public/data/`.

## Pipeline (recommended order)

1. `pnpm laws:download`
2. `pnpm laws:prepare-corpus`
3. `pnpm laws:fetch-metadata` _(optional — enriches registry with jurabk/kurzue)_
4. `pnpm laws:build-registry`
5. `pnpm laws:validate-registry`
6. `pnpm laws:build-paragraphs`
7. `pnpm laws:extract-obligations`
8. `pnpm laws:concat-obligations`
9. `pnpm laws:publish-ui-data`

## Folder Structure

Canonical pipeline and UI folders:

```text
data/laws/
  import/                          # Curated input CSV lists
  cache/downloads/                 # Raw downloaded DE/EU files + reports
  sources/de/xml/                  # Prepared DE XML corpus
  sources/eu/html/                 # Prepared EU XHTML corpus
  normalized/norm_paragraphs.jsonl # Paragraph-level normalized records
  registry/laws.json               # Canonical laws registry

public/data/
  laws.json                        # Published registry for static UI
  obligations/
    Pflichten_LLM_<abbrev>.csv     # Per-law extraction outputs
    Pflichten_LLM_All.csv          # Merged extraction output
```

## Script Inventory

- `download_laws.py`: network ingestion step
- `prepare_law_corpus.py`: raw-to-source transformation step
- `fetch_gii_metadata.py`: lightweight GII ZIP metadata crawler (jurabk/kurzue/ausfertigung_datum), results cached in `data/laws/cache/gii_metadata.json`
- `build_law_registry.py`: canonical registry builder
- `validate_law_registry.py`: registry quality gate
- `build_norm_paragraphs.py`: source parser to normalized JSONL
- `extract_obligations.py`: Langdock-backed obligations extraction with resumable progress tracking
- `concat_obligations_csv.py`: obligations merge utility; sorts output by `(norm, referenz)` using `reference_sort_key`
- `publish_laws_ui_data.py`: pipeline-to-public publish utility
- `laws_paths.py`: centralized default paths
- `pipeline_models.py`: shared Pydantic models for records
- `reference_sort.py`: natural sort keys for German §/EU Art. legal references (shared by extraction and merge steps)
- `llm_extract_base_ONLY_INSPIRATION.py`: reference scaffolding for custom LLM extraction implementations
- `pflichten_prompt.txt`: system prompt for obligations extraction
