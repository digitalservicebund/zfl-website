"""Central default paths for the legal pipeline."""

from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]

LAW_PATHS = {
    "registry_file": ROOT_DIR / "data" / "laws" / "registry" / "laws.json",
    "eu_input_csv": ROOT_DIR / "data" / "laws" / "import" / "test_obligations_eu.csv",
    "de_input_csv": ROOT_DIR / "data" / "laws" / "import" / "gesetze_und_verordnungen.csv",
    "download_dir": ROOT_DIR / "data" / "laws" / "cache" / "downloads",
    "de_norm_xml_dir": ROOT_DIR / "data" / "laws" / "sources" / "de" / "xml",
    "eu_norm_html_dir": ROOT_DIR / "data" / "laws" / "sources" / "eu" / "html",
    "norm_paragraphs_file": ROOT_DIR / "data" / "laws" / "normalized" / "norm_paragraphs.jsonl",
    "obligations_dir": ROOT_DIR / "public" / "data" / "obligations",
    "obligations_all_csv": ROOT_DIR / "public" / "data" / "obligations" / "Pflichten_LLM_All.csv",
    "ui_registry_file": ROOT_DIR / "public" / "data" / "laws.json",
}
