# Pflichten-Extraktion: Pipeline, Daten & UI

This document covers the Python-based legal pipeline tooling and the static UI page used to download, normalize, validate, extract, and publish regulatory obligations (Vorgaben/Pflichten) from German and EU financial law.

## Goal

**Summary:** Extract regulatory obligations from German and EU financial law texts using LLM-based structured extraction, and make them exportable from a searchable law list in a static web UI.

**Details:** This is a tool for legislative drafting that automatically extracts obligations from existing German and EU law and displays them in a clear overview. The primary focus is on obligations to act (e.g. information duties) that drive the majority of the compliance burden.

The goal is to provide legislative drafters (e.g. in ministries or academia) with a tool that makes bureaucratic hurdles visible and allows them to structurally analyze the systematic framework of legal texts.

The UI features a list of all relevant laws, a search to filter them by title/abbreviation, and an option to select them. Once selected, a list of all relevant obligations present in these laws is generated as a CSV file ready to be downloaded. The data includes the reference (law, paragraph, article etc.), norm addressee ("Normadressat"), a quote of the obligation, and a link to gesetze-im-internet / EUR-Lex for reference.

To evaluate the approach we started with a test case in the financial space using a limited amount of German and EU legislation.

## Architecture overview

The system has two halves:

- **Pipeline (Python):** a sequence of idempotent steps that download law sources, prepare a parsable corpus, build and validate a canonical law registry, normalize laws into paragraph-level records, run LLM extraction of obligations, merge the results, and publish data to the static UI.
- **UI (Astro/JS):** a static page (`src/pages/werkzeuge/pflichten.astro`) that reads the published data from `public/data/` and lets users search laws, select them, preview obligations, and export a CSV.

| Layer                   | Status  | Location                                                                                                                                                                                          |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source download         | ✅ Done | `download_laws.py`                                                                                                                                                                                |
| Corpus preparation      | ✅ Done | `prepare_law_corpus.py`                                                                                                                                                                           |
| Law registry            | ✅ Done | `build_law_registry.py`                                                                                                                                                                           |
| Registry validation     | ✅ Done | `validate_law_registry.py`                                                                                                                                                                        |
| Paragraph normalization | ✅ Done | `build_norm_paragraphs.py`                                                                                                                                                                        |
| LLM extraction          | ✅ Done | `extract_obligations.py` + prompt/model wiring in `pflichten_prompt.txt` and `pipeline_models.py`                                                                                                 |
| CSV merge               | ✅ Done | `concat_obligations_csv.py` — reads `public/data/obligations/Pflichten_LLM_*.csv` with `;` delimiter and UTF-8-BOM, writes `Pflichten_LLM_All.csv` using the column order of the first input file |
| Publish to UI           | ✅ Done | `publish_laws_ui_data.py`                                                                                                                                                                         |
| Static UI page          | ✅ Done | `src/pages/werkzeuge/pflichten.astro`                                                                                                                                                             |

## Getting started

Install the Python pipeline dependencies once:

```sh
python3 -m pip install -r scripts/requirements-pipeline.txt
```

The Astro/JS UI reads static assets from `public/data/` and requires no extra setup beyond the standard project install.

All pipeline commands below are run from the project root and wrap their underlying Python script via `./scripts/run_pipeline_python.sh` (which manages the virtualenv).

## Pipeline (recommended order)

```sh
pnpm laws:download              # 1. Fetch raw DE/EU law sources
pnpm laws:prepare-corpus        # 2. Unpack into parseable format
pnpm laws:fetch-metadata        # 3. (optional) Enrich registry with jurabk/kurzue
pnpm laws:build-registry        # 4. Build canonical law list
pnpm laws:validate-registry     # 5. Validate registry integrity
pnpm laws:build-paragraphs      # 6. Normalize into paragraph JSONL
pnpm laws:extract-obligations   # 7. LLM extraction → per-law CSVs
pnpm laws:concat-obligations    # 8. Merge CSVs into Pflichten_LLM_All.csv
pnpm laws:publish-ui-data       # 9. Copy registry to public/
```

The static site build (`pnpm build`) then picks up `public/data/*` automatically.

## Commands

- `pnpm laws:download [-- --de-csv <path>] [-- --eu-csv <path>]`
  - Runs `scripts/download_laws.py`. Downloads DE/EU source files into local cache.
  - Defaults: `data/laws/import/gesetze_und_verordnungen.csv` (DE) and `data/laws/import/eu_regelungen_zu_finanzgesetzen.csv` (EU).
  - Pass custom import lists via `--de-csv` and/or `--eu-csv` (see evaluation test corpus below).

- `pnpm laws:prepare-corpus`
  - Runs `scripts/prepare_law_corpus.py`. Converts raw downloads into parser-ready source folders.

- `pnpm laws:fetch-metadata`
  - Runs `scripts/fetch_gii_metadata.py`. Streams the first ~8 KB of each GII law ZIP to extract `jurabk`, `kurzue`, and `ausfertigung_datum`.
  - Results are cached in `data/laws/cache/gii_metadata.json` and read automatically by `build_law_registry.py`.
  - Supports `--force`, `--limit N`, `--workers N`, `--delay S`.

- `pnpm laws:build-registry`
  - Runs `scripts/build_law_registry.py`. Builds canonical law registry JSON.
  - Default mode uses curated EU CSV only; add `--with-eu-sparql` for full CELEX crawl.

- `pnpm laws:validate-registry`
  - Runs `scripts/validate_law_registry.py`. Validates registry consistency and formats.

- `pnpm laws:build-paragraphs`
  - Runs `scripts/build_norm_paragraphs.py`. Builds normalized paragraph-level JSONL dataset.

- `pnpm laws:extract-obligations [--norm <ABBREV>] [--norms-file <path>] [--model gpt-5.4-mini] [--reasoning-effort low] [--rerun]`
  - Runs `scripts/extract_obligations.py`. Extracts obligations with structured LLM output and writes per-law CSV files.
  - Resumes safely via `data/laws/cache/extraction_progress.json`.
  - Filter laws with `--norm` (repeatable or comma-separated) and/or `--norms-file` (one abbreviation per line). Multiple laws run **sequentially** in list order; within each law, up to 5 paragraphs are processed concurrently.
  - `--norm` value casing must match the registry (`KWG`, `KAGB`, `32013R0575`, …).

- `pnpm laws:concat-obligations`
  - Runs `scripts/concat_obligations_csv.py`. Merges per-law obligations CSV files into one aggregate, sorted by `(norm, referenz)` via `reference_sort_key`.

- `pnpm laws:publish-ui-data`
  - Runs `scripts/publish_laws_ui_data.py`. Copies registry into the static UI data location.

## Folder structure

Canonical pipeline and UI folders:

```text
data/laws/
  import/                          # Curated input CSV lists
    gesetze_und_verordnungen.csv   # Full DE download list (financial-law corpus)
    eu_regelungen_zu_finanzgesetzen.csv
    test_obligations_de.csv        # Evaluation subset: BDSG, OZG, ZPO, GVG
    test_obligations_eu.csv        # Evaluation subset: DSGVO (32016R0679)
    test_obligations_norms.txt     # Evaluation extraction list (for --norms-file)
  cache/downloads/                 # Raw downloaded DE/EU files + reports
  cache/gii_metadata.json          # Cached GII metadata (jurabk/kurzue/ausfertigung_datum)
  cache/extraction_progress.json   # Resume checkpoint for LLM extraction
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

## Implementation details

### LLM extraction (`extract_obligations.py`)

**Input:** `data/laws/normalized/norm_paragraphs.jsonl` (one `NormParagraph` record per paragraph/article — see `pipeline_models.py`).

**Output:** One CSV per law in `public/data/obligations/Pflichten_LLM_<law_abbrev>.csv` — the same directory and filename pattern that `concat_obligations_csv.py` expects.

#### Output CSV columns (semicolon-delimited, UTF-8 with BOM)

The delimiter, encoding, and column order must match `concat_obligations_csv.py` so the merge step works without changes.

| Column                    | Source                                 | Notes                                                                                                                          |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `norm`                    | `NormParagraph.law_abbrev`             | from input metadata, not LLM                                                                                                   |
| `referenz`                | paragraph `reference` + LLM `referenz` | Script prepends the paragraph's §/Article number to the sub-position string returned by the LLM (e.g. `§ 12 Absatz 2 Satz 1`). |
| `vorgabe_zusammenfassung` | LLM                                    | one-sentence summary of the required action                                                                                    |
| `zitat`                   | LLM                                    | exact quote containing the obligation                                                                                          |
| `art_der_vorgabe`         | LLM                                    | `Informationspflicht` \| `Handlungspflicht` \| `Unterlassungspflicht` \| `Duldungs-/Mitwirkungspflicht`                        |
| `pflichtstaerke`          | LLM                                    | `muss` \| `soll`                                                                                                               |
| `sprachlicher_indikator`  | LLM                                    | the modal phrase triggering the obligation                                                                                     |
| `normadressat_kategorie`  | LLM                                    | comma-joined list of: `Bürgerinnen und Bürger`, `Wirtschaft`, `Öffentliche Verwaltung`                                         |
| `normadressat_text`       | LLM                                    | verbatim addressee text from statute                                                                                           |
| `quelle`                  | `NormParagraph.url`                    | full URL to the paragraph (gesetze-im-internet down to § level; EUR-Lex to the whole act)                                      |

Note: `konfidenz` is part of the `Obligation` Pydantic model (validated 0.0–1.0) but is **not** written to the CSV.

#### Prompt and structured output

- The system prompt is loaded at runtime from `scripts/pflichten_prompt.txt` (no string duplication in code).
- `pipeline_models.py` includes:
  - `Obligation` with `Literal` constraints for `art_der_vorgabe` (`Informationspflicht` | `Handlungspflicht` | `Unterlassungspflicht` | `Duldungs-/Mitwirkungspflicht`), `pflichtstaerke` (`muss` | `soll`), and `normadressat_kategorie` values.
  - `konfidenz: float` field (0.0–1.0) on `Obligation` — written to model, not to CSV.
  - `ObligationExtraction` (`{ "obligations": list[Obligation] }`) used as the LLM `response_format`.
- The script assembles each CSV row by combining the LLM's `Obligation` fields with the paragraph metadata (`law_abbrev`, `url`, `reference`).

#### Extraction logic

1. Load JSONL paragraphs, optionally filter by `--norm` / `--norms-file`, group by `law_abbrev`. Laws are processed sequentially in list order; within each law, paragraphs are sorted by `reference_sort_key` (from `reference_sort.py`) then `paragraph_id`.
2. For each paragraph, call the LLM with the system prompt and the paragraph text, requesting `ObligationExtraction` as structured output.
3. Validate the response via Pydantic. All extracted obligations are kept regardless of `konfidenz` — the score is in the model for consumers but is not written to the CSV.
4. Assemble CSV rows (LLM fields + paragraph metadata) and write incrementally to the per-law CSV.
5. Maintain a checkpoint file at `data/laws/cache/extraction_progress.json` mapping `paragraph_id → done` for safe resume after interruption. Processed paragraphs are skipped on re-run.

#### Non-functional requirements

- Async HTTP with semaphore (max 5 concurrent calls).
- Exponential backoff on transient/rate-limit errors.
- Deterministic output order (sort by `paragraph_id` within each law).
- No secrets in code, frontend, or committed config files.

#### LLM provider

- Uses **Langdock** via the OpenAI Python SDK, consistent with `llm_extract_base_ONLY_INSPIRATION.py` (reference-only — do not import from it).
- API key resolution: 1Password CLI lookup (`op`). No API key fallback in code and no committed secrets.
- Defaults: `model=gpt-5.4-mini`, `reasoning_effort=low`, `temperature=0.0`, `seed=42`.
- Gemini models (`--model gemini-*`) go through Langdock's Google endpoint instead. Caveat: Langdock strips `thinkingConfig`, so Gemini thinking cannot be disabled — requests take 30–60s+ per large paragraph.

### LLM model choice

#### Why `gpt-5.4-mini` with `reasoning_effort: low`

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

#### Why Gemini does not work reliably

The Langdock API proxies Gemini through Google Vertex AI. We verified empirically (June 2026) that **Langdock strips `thinkingConfig` from `generationConfig` before forwarding to Vertex** — passing `thinkingBudget: 0` has no effect (identical `thoughtsTokenCount` with and without the field). This means thinking cannot be disabled via the Langdock route. As a result, large paragraphs trigger 30–60 s+ thinking steps that push against the HTTP client timeout, making the extraction slow and fragile. Additionally, the previous model name `gemini-3-flash-preview` does not exist on Langdock — the valid identifiers are `gemini-2.5-flash`, `gemini-2.5-pro`, and `gemini-3.5-flash`.

Gemini support remains in the codebase via `--model gemini-*` for comparison purposes if Langdock ever exposes `thinkingConfig`.

### Static UI page (`src/pages/werkzeuge/pflichten.astro`)

**Data sources (fetched client-side):**

- `/data/laws.json` — law registry for the selector
- `/data/obligations/Pflichten_LLM_All.csv` — merged extraction results (falls back to `Pflichten_LLM_HGB.csv` if the all-file is not yet present)

**UI components:**

1. **Law selector** — searchable multi-select list of laws filtered by title, abbreviation, and `jurabk`. Laws with extraction data show an analysis badge (`N Pflichten in M Paragraphen/Artikeln`); unanalysed laws show a muted "Noch nicht analysiert" label. Bulk-select ("Treffer auswählen") and clear-selection buttons. Selected laws shown as removable chips.
2. **Obligation preview table** — shows a few example rows of the current filtered view with all export columns.
3. **CSV export** — downloads the full filtered obligation set as semicolon-delimited, UTF-8-BOM CSV; filename: `Pflichten_Export_<YYYY-MM-DD>.csv`.

**Key implementation notes:**

- EU law abbreviations (CELEX numbers) are decoded to short DE references for display (e.g. `32013R0575` → `Verordnung (EU) Nr. 2013/575`).
- `jurabk` is used as the primary match key when joining obligations CSV rows back to registry laws (handles cases where the extraction uses `jurabk` rather than the registry `abbrev`).
- `reference_sort_key` logic is mirrored in TypeScript (`referenceSortKey` / `compareObligations`) for client-side sorting of the preview and CSV export.
- Uses Alpine.js and `tailwind-variants` per project conventions.

### Evaluation

Because this is an evaluation of the approach, a light-weight quality check accompanies the pipeline before declaring it usable:

- Pick one German law and one EU regulation as a gold sample.
- Manually review LLM output for ~20 paragraphs each and record obvious false positives / missed obligations.
- Capture findings in a short note (no formal precision/recall required for the first pass) and feed adjustments back into `pflichten_prompt.txt`.

#### Test corpus

Curated evaluation laws live in `data/laws/import/test_obligations_*.csv` and are also listed in the main import CSVs so they appear in the registry:

| Law        | `--norm` for extraction | Paragraphs (approx.) | Purpose                  |
| ---------- | ----------------------- | -------------------- | ------------------------ |
| DSGVO (EU) | `32016R0679`            | 99                   | General legislation (EU) |
| BDSG (DE)  | `BDSG`                  | 86                   | General legislation (DE) |
| OZG (DE)   | `OZG`                   | 16                   | General legislation (DE) |
| ZPO (DE)   | `ZPO`                   | 1 077                | BMJV / Scholz demo       |
| GVG (DE)   | `GVG`                   | 200                  | BMJV / Scholz demo       |

`--norm` values come from `jurabk` in the parsed XML (DE) or CELEX (EU), not from the GII slug (`bdsg_2018` → `BDSG`).

Prepare the test corpus (steps 1–6, no LLM):

```sh
pnpm laws:download -- \
  --de-csv data/laws/import/test_obligations_de.csv \
  --eu-csv data/laws/import/test_obligations_eu.csv
pnpm laws:prepare-corpus
pnpm laws:build-registry
pnpm laws:build-paragraphs
```

Then run LLM extraction (long-running; requires Langdock API key via 1Password CLI). Process all evaluation laws in one sequential run:

```sh
pnpm laws:extract-obligations -- --norms-file data/laws/import/test_obligations_norms.txt
```

Or pass abbreviations directly (same order):

```sh
pnpm laws:extract-obligations -- --norm 32016R0679,BDSG,OZG,GVG,ZPO
```

Single-law runs still work, e.g. `pnpm laws:extract-obligations -- --norm BDSG`.

Each run writes `public/data/obligations/Pflichten_LLM_<norm>.csv` and resumes via `data/laws/cache/extraction_progress.json` after interruption. When all runs finish:

```sh
pnpm laws:concat-obligations
pnpm laws:publish-ui-data
```

## Script inventory

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
- `pipeline_models.py`: shared Pydantic models (`NormParagraph`, `Obligation`, `ObligationExtraction`, `RegistryEntry`)
- `reference_sort.py`: natural sort keys for German §/EU Art. legal references (shared by extraction and merge steps)
- `llm_extract_base_ONLY_INSPIRATION.py`: reference scaffolding for custom LLM extraction implementations (do not import)
- `pflichten_prompt.txt`: system prompt for obligations extraction

## Key files reference

| Purpose                   | Path                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| Shared path constants     | `laws_paths.py`                                                                               |
| Shared Pydantic models    | `pipeline_models.py` (`NormParagraph`, `Obligation`, `ObligationExtraction`, `RegistryEntry`) |
| Legal reference sort keys | `reference_sort.py`                                                                           |
| Extraction prompt         | `pflichten_prompt.txt`                                                                        |
| GII metadata crawler      | `fetch_gii_metadata.py`                                                                       |
| GII metadata cache        | `data/laws/cache/gii_metadata.json`                                                           |
| Inspiration/scaffold      | `llm_extract_base_ONLY_INSPIRATION.py` (reference only — do not import)                       |
| Python deps               | `requirements-pipeline.txt`                                                                   |
| Venv runner               | `run_pipeline_python.sh`                                                                      |
| Pipeline docs             | `doc/laws-pipeline.md`                                                                        |

## Acceptance criteria

1. `pnpm laws:extract-obligations --norm HGB` completes, writes a CSV into `public/data/obligations/`, and resumes cleanly after Ctrl+C via the checkpoint file.
   Status: ✅ Verified (`[HGB] 401/401 done`, `Extraction completed.`, `Processed paragraphs this run: 401`, `Extracted obligations this run: 619`, progress file `data/laws/cache/extraction_progress_hgb.json`).
2. `pnpm laws:concat-obligations` consumes the per-law CSVs without modification and produces a valid `Pflichten_LLM_All.csv`.
   Status: ⚠️ Not yet re-verified after the column schema change (`normadressaten` → `normadressat_kategorie`, `konfidenz`/`url` removed from CSV).
3. UI page loads, law search works, obligation preview shows, CSV export downloads correctly.
   Status: ✅ Implemented. Not yet verified against a full pipeline run.
4. No API keys or secrets in frontend code or committed files.
   Status: ✅ Verified (1Password CLI integration, no checked-in secrets).
5. Non-LLM pipeline steps are idempotent — re-running produces identical output. The LLM extraction step is _resumable_ (already-processed paragraphs are skipped via the checkpoint) but byte-identical output across runs is not guaranteed.
   Status: ✅ Verified for resumability in smoke and resumed law runs.
