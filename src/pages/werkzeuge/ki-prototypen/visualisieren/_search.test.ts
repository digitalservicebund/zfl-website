import { describe, expect, it } from "vitest";
import { normalize, searchDiagrams, type SearchEntry } from "./_search";

function entry(
  short: string,
  name: string,
  { lawTitle = "", summary = "" } = {},
): SearchEntry {
  return {
    key: `${short}/${name}`,
    short,
    lawTitle,
    name,
    summary,
    filename: name,
    href: "",
  };
}

const beegAnspruch = entry("BEEG", "Anspruchsvoraussetzungen Elterngeld", {
  lawTitle: "Gesetz zum Elterngeld und zur Elternzeit",
  summary: "Prüfung der Anspruchsvoraussetzungen für Elterngeld",
});
const beegAntrag = entry("BEEG", "Elterngeld-Antragsverfahren", {
  lawTitle: "Gesetz zum Elterngeld und zur Elternzeit",
});
const asylAblauf = entry("AsylG", "Asylverfahren-Ablauf", {
  lawTitle: "Asylgesetz",
  summary: "Vom Antrag bis zur Entscheidung über den Asylantrag",
});
const ozgAkteure = entry("OZG", "Akteure und Zuständigkeiten", {
  lawTitle: "Onlinezugangsgesetz",
});
const entries = [beegAnspruch, beegAntrag, asylAblauf, ozgAkteure];

describe("normalize", () => {
  it("ignores case and diacritics", () => {
    expect(normalize("Zuständigkeit ÄÖÜ")).toBe("zustandigkeit aou");
  });
});

describe("searchDiagrams", () => {
  it("returns nothing for queries shorter than two characters", () => {
    expect(searchDiagrams(entries, "")).toEqual([]);
    expect(searchDiagrams(entries, " a ")).toEqual([]);
  });

  it("finds entries by law short title, case-insensitively", () => {
    expect(searchDiagrams(entries, "beeg")).toEqual([beegAnspruch, beegAntrag]);
  });

  it("ignores diacritics in the query", () => {
    expect(searchDiagrams(entries, "zustandigkeit")).toEqual([ozgAkteure]);
  });

  it("requires every term to match", () => {
    expect(searchDiagrams(entries, "elterngeld antrag")).toEqual([beegAntrag]);
  });

  it("matches terms across different fields", () => {
    expect(searchDiagrams(entries, "beeg voraussetzungen")).toEqual([
      beegAnspruch,
    ]);
  });

  it("ranks name matches above summary-only matches", () => {
    // "antrag" is in the name of beegAntrag but only in the summary of asylAblauf
    expect(searchDiagrams(entries, "antrag")).toEqual([beegAntrag, asylAblauf]);
  });

  it("keeps the original order for equal scores", () => {
    expect(searchDiagrams(entries, "verfahren")).toEqual([
      beegAntrag,
      asylAblauf,
    ]);
  });
});
