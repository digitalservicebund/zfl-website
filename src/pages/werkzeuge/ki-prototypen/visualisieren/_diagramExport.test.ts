import { describe, expect, test } from "vitest";
import { boldToMarkdown, stripLinks } from "./_diagramExport";

describe("stripLinks", () => {
  test("keeps only the link text", () => {
    expect(
      stripLinks(
        `A["Pflicht — <a href='https://example.org#p1' target='_blank'>§1 I</a>"]`,
      ),
    ).toBe(`A["Pflicht — §1 I"]`);
  });
});

describe("boldToMarkdown", () => {
  test("turns labels with <b> into markdown strings", () => {
    expect(boldToMarkdown(`A["<b>Behörde</b><br/>prüft den Antrag"]`)).toBe(
      'A["`**Behörde**<br/>prüft den Antrag`"]',
    );
  });

  test("trims whitespace inside the bold text", () => {
    expect(boldToMarkdown(`A["<b> Behörde </b>"]`)).toBe('A["`**Behörde**`"]');
  });

  test("leaves labels without <b> unchanged", () => {
    const source = `flowchart TD\n  A["Antrag"] --> B["Prüfung"]`;
    expect(boldToMarkdown(source)).toBe(source);
  });

  test("leaves labels that already are markdown strings unchanged", () => {
    const source = 'A["`**Behörde**`"]';
    expect(boldToMarkdown(source)).toBe(source);
  });
});
