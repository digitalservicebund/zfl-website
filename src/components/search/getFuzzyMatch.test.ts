import { describe, expect, it } from "vitest";
import { getFuzzyMatch } from "./getFuzzyMatch";

const keywords = ["Kontakt", "Schulungen", "Werkzeuge", "Analyse", "FIM"];

describe("getFuzzyMatch", () => {
  describe("empty / no-op cases", () => {
    it("returns undefined for empty term", () => {
      expect(getFuzzyMatch("", keywords)).toBeUndefined();
    });

    it("returns undefined for whitespace-only term", () => {
      expect(getFuzzyMatch("   ", keywords)).toBeUndefined();
    });

    it("returns undefined for empty keywords", () => {
      expect(getFuzzyMatch("Kontakt", [])).toBeUndefined();
    });

    it("returns undefined for exact match (no suggestion needed)", () => {
      expect(getFuzzyMatch("Kontakt", keywords)).toBeUndefined();
    });

    it("is case-insensitive for exact match detection", () => {
      expect(getFuzzyMatch("kontakt", keywords)).toBeUndefined();
    });

    it("returns undefined when keyword starts with term (prefix match)", () => {
      expect(
        getFuzzyMatch("Schulung", ["Schulungen", "Werkzeuge"]),
      ).toBeUndefined();
    });

    it("returns undefined when term starts with keyword", () => {
      // "Schulungg" starts with "Schulung" → early return, no suggestion
      expect(
        getFuzzyMatch("Schulungg", ["Schulung", "Schulungen"]),
      ).toBeUndefined();
    });
  });

  describe("early return for short terms (≤ 3 chars)", () => {
    it("returns undefined for a 3-char term with 1 edit", () => {
      expect(getFuzzyMatch("FOM", keywords)).toBeUndefined(); // FIM, distance 1
    });

    it("returns undefined for a 2-char term", () => {
      expect(getFuzzyMatch("FI", keywords)).toBeUndefined();
    });
  });

  describe("dynamic tolerance for longer terms", () => {
    it("matches with 1 edit for a 4–6 char term (maxDistance 1)", () => {
      // "kntakt" (6 chars) → maxDistance floor(6*0.3)=1, distance to "Kontakt" = 1
      expect(getFuzzyMatch("kntakt", keywords)).toBe("Kontakt");
    });

    it("returns undefined when edits exceed tolerance for a 4–6 char term", () => {
      // "kntak" (5 chars) → maxDistance 1, distance to "Kontakt" = 2
      expect(getFuzzyMatch("kntak", keywords)).toBeUndefined();
    });

    it("matches with 2 edits for a longer term", () => {
      // "Schulugen" (9 chars) → maxDistance floor(9*0.3)=2, distance to "Schulungen" = 2
      expect(getFuzzyMatch("Schulugen", keywords)).toBe("Schulungen");
    });
  });

  describe("best match selection", () => {
    it("returns the closer of two keywords both within tolerance", () => {
      // "Analysse" (8 chars) → maxDistance floor(8*0.3)=2
      // distance to "Analyse"  = 1 (delete extra 's')
      // distance to "Analysen" = 2 (substitute s→e, e→n)
      expect(getFuzzyMatch("Analysse", ["Analysen", "Analyse"])).toBe(
        "Analyse",
      );
    });
  });
});
