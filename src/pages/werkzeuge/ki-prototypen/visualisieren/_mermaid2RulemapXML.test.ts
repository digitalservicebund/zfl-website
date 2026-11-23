import { describe, expect, test } from "vitest";
import {
  isMermaidFlowchart,
  mermaidFlowchartToRulemapXml,
} from "./_mermaid2RulemapXML";

describe("isMermaidFlowchart", () => {
  test("recognizes a flowchart source", () => {
    expect(isMermaidFlowchart("flowchart TD\n    A --> B")).toBe(true);
  });

  test("rejects other diagram types", () => {
    expect(isMermaidFlowchart("stateDiagram-v2\n    [*] --> A")).toBe(false);
    expect(isMermaidFlowchart("sequenceDiagram\n    A->>B: hi")).toBe(false);
  });
});

describe("mermaidFlowchartToRulemapXml", () => {
  test("converts a simple decision chain", () => {
    const source = `flowchart TD
    A["Im Anwendungsbereich?"] --> B{"Ausnahme einschlägig?"}
    B -->|Ja| Z1["Nicht anwendbar"]
    B -->|Nein| Z2["Anwendbar"]`;

    const xml = mermaidFlowchartToRulemapXml(source, "Testfall");

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      '<rulemap title="Testfall" application="query-action-ai">',
    );
    expect(xml).toContain('title="Im Anwendungsbereich?"');
    expect(xml).toContain(
      'title="Ausnahme einschlägig?" alttext="" logic="xor"',
    );
    expect(xml).toContain(
      'title="Ja: Nicht anwendbar" alttext="" logic="virtual"',
    );
    expect(xml).toContain('title="Nein: Anwendbar" alttext="" logic="virtual"');
  });

  test("strips HTML link/line-break markup from titles", () => {
    const source = `flowchart TD
    A["Erste Zeile<br/>Zweite Zeile — <a href='https://example.com' target='_blank'>§1</a>"] --> B["Ende"]`;

    const xml = mermaidFlowchartToRulemapXml(source, "Testfall");

    expect(xml).toContain('title="Erste Zeile Zweite Zeile — §1"');
    expect(xml).not.toContain("<a href");
    expect(xml).not.toContain("<br/>");
  });

  test("collapses a single outgoing edge into an and-node", () => {
    const source = `flowchart TD
    A["Start"] --> B["Ende"]`;

    const xml = mermaidFlowchartToRulemapXml(source, "Testfall");

    expect(xml).toContain('title="Start" alttext="" logic="and"');
  });

  test("duplicates a converging node under each of its parents", () => {
    const source = `flowchart TD
    A["Start"] --> B{"Verzweigung"}
    B -->|"Erster Weg"| F
    B -->|Zweiter| F["Ziel"]`;

    const xml = mermaidFlowchartToRulemapXml(source, "Testfall");

    expect(xml).toContain('title="Erster Weg: Ziel"');
    expect(xml).toContain('title="Zweiter: Ziel"');
  });

  test("assigns sequential ids to every node", () => {
    const source = `flowchart TD
    A["Start"] --> B{"Frage"}
    B -->|Ja| C["Ende Ja"]
    B -->|Nein| D["Ende Nein"]`;

    const xml = mermaidFlowchartToRulemapXml(source, "Testfall");
    const ids = [...xml.matchAll(/id="(\d+)"/g)].map(([, id]) => Number(id));

    expect(ids).toEqual([1, 2, 3, 4]);
  });
});
