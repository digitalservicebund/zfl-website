# Implementation Plan: Pflichten-Extraktion & UI

## Goal

**Summary:** Extract regulatory obligations (Vorgaben/Pflichten) from German and EU financial law texts using LLM-based structured extraction, and make them exportable from a searchable law list in a static web UI.

**Details:** We want to build a tool for legislative drafting that automatically extracts obligations from existing German and EU law and displays them in a clear overview. The primary focus will be on obligations to act (e.g. information duties) that drive the majority of the compliance burden.

The goal is to provide legislative drafters (e.g. in ministries or academia) with a tool that makes bureaucratic hurdles visible and allows them to structurally analyze the systematic framework of legal texts.

The UI will feature a list of all relevant laws, a search to filter them by title/abbreviation (potentially text later on), and an option to select them. Once selected, a list of all relevant obligations present in these laws will be generated as a CSV file ready to be downloaded. The data includes the reference (law, paragraph, article etc.), norm addressee ("Normadressat"), quote of the obligation and a link to gesetze-im-internet / EUR-Lex for reference.

To evaluate the approach we're starting with a test case in the financial space using a limited amount of German and EU legislation.

---

## What Already Exists

| Layer                   | Status  | Location                                                                                                                                                                                          |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source download         | ✅ Done | `download_laws.py`                                                                                                                                                                                |
| Corpus preparation      | ✅ Done | `prepare_law_corpus.py`                                                                                                                                                                           |
| Law registry            | ✅ Done | `build_law_registry.py`                                                                                                                                                                           |
| Registry validation     | ✅ Done | `validate_law_registry.py`                                                                                                                                                                        |
| Paragraph normalization | ✅ Done | `build_norm_paragraphs.py`                                                                                                                                                                        |
| CSV merge               | ✅ Done | `concat_obligations_csv.py` — reads `public/data/obligations/Pflichten_LLM_*.csv` with `;` delimiter and UTF-8-BOM, writes `Pflichten_LLM_All.csv` using the column order of the first input file |
| Publish to UI           | ✅ Done | `publish_laws_ui_data.py`                                                                                                                                                                         |
| LLM extraction          | ✅ Done | `extract_obligations.py` + prompt/model wiring in `pflichten_prompt.txt` and `pipeline_models.py`                                                                                                 |
| Static UI page          | ✅ Done | `src/pages/werkzeuge/pflichten.astro`                                                                                                                                                             |

---

## Current State (2026-06-11)

### Implemented and verified

- `scripts/extract_obligations.py` is implemented and wired as `pnpm laws:extract-obligations`.
- Structured response models are implemented in `scripts/pipeline_models.py` (`Obligation`, `ObligationExtraction`).
- Prompt and `ArtDerVorgabe` / `Pflichtstaerke` enums are defined in `pflichten_prompt.txt` and enforced in the model schema.
- Extraction output format matches merge requirements (`;`, UTF-8-BOM, expected column order).
- Resume behavior via checkpoint file is implemented and verified in multiple smoke runs.
- Exponential backoff for transient/rate-limit errors is implemented.
- `scripts/reference_sort.py` provides natural-sort keys for German §/EU Art. references; used by `extract_obligations.py` (paragraph ordering) and `concat_obligations_csv.py` (merged output ordering).
- `scripts/fetch_gii_metadata.py` streams GII law ZIPs to extract `jurabk`/`kurzue`/`ausfertigung_datum`; results cached in `data/laws/cache/gii_metadata.json` and consumed by `build_law_registry.py`.
- Step B UI page (`src/pages/werkzeuge/pflichten.astro`) is implemented: law search, multi-select, obligation preview table, and CSV export with UTF-8-BOM and semicolon delimiter.

### Authentication and secrets

- Current implementation uses 1Password CLI (`op`) only for Langdock token retrieval.
- No API key fallback in code and no committed secrets.

### Validation completed

- Targeted EU smoke runs on DSGVO Art. 12-14 were executed repeatedly after prompt updates.
- Cost/workload estimates were computed for:
  - full corpus,
  - relevant-law subsets (`*_relevant.csv`),
  - DSGVO Art. 12-14 baseline.
- HGB-only extraction run completed successfully after resume/retry cycles (`--max-concurrency 1`), with terminal exit code `0`.

### Open items

- Step A.5 evaluation note is still missing as a committed artifact.
- `pnpm laws:concat-obligations` has not been re-verified end-to-end after the column schema changes (see Step A below).

---

## Step A: Build the LLM Extraction Script

**Implementation status:** ✅ Implemented (`scripts/extract_obligations.py`)

**Input:** `data/laws/normalized/norm_paragraphs.jsonl` (one `NormParagraph` record per paragraph/article — see `pipeline_models.py`).

**Output:** One CSV per law in `public/data/obligations/Pflichten_LLM_<law_abbrev>.csv` — same directory and filename pattern that `concat_obligations_csv.py` already expects.

### Output CSV columns (semicolon-delimited, UTF-8 with BOM)

The delimiter, encoding and column order must match `concat_obligations_csv.py` so the merge step works without changes.

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

### Prompt and structured output

- The system prompt is loaded at runtime from `scripts/pflichten_prompt.txt` (no string duplication in code).
- `pipeline_models.py` includes:
  - `Obligation` with `Literal` constraints for `art_der_vorgabe` (`Informationspflicht` | `Handlungspflicht` | `Unterlassungspflicht` | `Duldungs-/Mitwirkungspflicht`), `pflichtstaerke` (`muss` | `soll`), and `normadressat_kategorie` values.
  - `konfidenz: float` field (0.0–1.0) on `Obligation` — written to model, not to CSV.
  - `ObligationExtraction` (`{ "obligations": list[Obligation] }`) used as LLM `response_format`.
- The script assembles each CSV row by combining the LLM's `Obligation` fields with the paragraph metadata (`law_abbrev`, `url`, `reference`).

### LLM provider

- Use **Langdock** via the OpenAI Python SDK, consistent with `llm_extract_base_ONLY_INSPIRATION.py` (reference-only — do not import from it).
- API key resolution: 1Password CLI lookup (`op`) in current implementation.
- Defaults: `model=gpt-5.4-mini`, `reasoning_effort=low`, `temperature=0.0`, `seed=42`.
- Gemini models (`--model gemini-*`) go through Langdock's Google endpoint instead. Caveat: Langdock strips `thinkingConfig`, so Gemini thinking cannot be disabled — requests take 30-60s+ per large paragraph.

### Extraction logic

1. Load JSONL paragraphs, optionally filter by `--norm <abbrev>`, group by `law_abbrev`. Within each law, paragraphs are sorted by `reference_sort_key` (from `reference_sort.py`) then `paragraph_id`.
2. For each paragraph, call the LLM with the system prompt and the paragraph text, requesting `ObligationExtraction` as structured output.
3. Validate the response via Pydantic. All extracted obligations are kept regardless of `konfidenz` — the score is in the model for consumers but is not written to the CSV.
4. Assemble CSV rows (LLM fields + paragraph metadata) and write incrementally to the per-law CSV.
5. Maintain a checkpoint file at `data/laws/cache/extraction_progress.json` mapping `paragraph_id → done` for safe resume after interruption. Processed paragraphs are skipped on re-run.

### Non-functional requirements

- Async HTTP with semaphore (max 5 concurrent calls).
- Exponential backoff on rate-limit errors.
- Deterministic output order (sort by `paragraph_id` within each law).
- No secrets in code, frontend, or committed config files.

### Wiring

Implemented in `package.json`:

```json
"laws:extract-obligations": "./scripts/run_pipeline_python.sh scripts/extract_obligations.py"
```

### Command

```sh
pnpm laws:extract-obligations [--norm <abbrev>] [--model gpt-5.1]
```

`--norm` value casing must match the registry (`KWG`, `KAGB`, `32013R0575`, …).

---

## Step A.5: Evaluation

Because this is an evaluation of the approach, add a light-weight quality check before declaring the pipeline usable:

- Pick one German law and one EU regulation as a gold sample.
- Manually review LLM output for ~20 paragraphs each and record obvious false positives / missed obligations.
- Capture findings in a short note (no formal precision/recall required for the first pass) and feed adjustments back into `pflichten_prompt.txt`.

---

## Step B: Build the Static UI Page

**Implementation status:** ✅ Implemented (`src/pages/werkzeuge/pflichten.astro`)

**Data sources (fetched client-side):**

- `/data/laws.json` — law registry for the selector
- `/data/obligations/Pflichten_LLM_All.csv` — merged extraction results (falls back to `Pflichten_LLM_HGB.csv` if the all-file is not yet present)

### UI components

1. **Law selector** — searchable multi-select list of laws filtered by title, abbreviation, and `jurabk`. Laws with extraction data show an analysis badge (`N Pflichten in M Paragraphen/Artikeln`); unanalysed laws show a muted "Noch nicht analysiert" label. Bulk-select ("Treffer auswählen") and clear-selection buttons. Selected laws shown as removable chips.
2. **Obligation preview table** — shows a few example rows of the current filtered view with all export columns.
3. **CSV export** — downloads the full filtered obligation set as semicolon-delimited, UTF-8-BOM CSV; filename: `Pflichten_Export_<YYYY-MM-DD>.csv`.

### Key implementation notes

- EU law abbreviations (CELEX numbers) are decoded to short DE references for display (e.g. `32013R0575` → `Verordnung (EU) Nr. 2013/575`).
- `jurabk` is used as the primary match key when joining obligations CSV rows back to registry laws (handles cases where the extraction uses `jurabk` rather than the registry `abbrev`).
- `reference_sort_key` logic is mirrored in TypeScript (`referenceSortKey` / `compareObligations`) for client-side sorting of the preview and CSV export.
- Uses Alpine.js and `tailwind-variants` per project conventions.

---

## Step C: Wire Everything Together

After Steps A and B are implemented, a full run looks like:

```sh
pnpm laws:download              # 1. Fetch raw law sources
pnpm laws:prepare-corpus        # 2. Unpack into parseable format
pnpm laws:build-registry        # 3. Build canonical law list
pnpm laws:validate-registry     # 4. Validate registry integrity
pnpm laws:build-paragraphs      # 5. Normalize into paragraph JSONL
pnpm laws:extract-obligations   # 6. LLM extraction → per-law CSVs
pnpm laws:concat-obligations    # 7. Merge CSVs into Pflichten_LLM_All.csv
pnpm laws:publish-ui-data       # 8. Copy registry to public/
```

The static site build (`pnpm build`) then picks up `public/data/*` automatically.

---

## Key Files Reference

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
| Scripts docs              | `PFLICHTEN_README.md`                                                                         |

---

## Acceptance Criteria

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
