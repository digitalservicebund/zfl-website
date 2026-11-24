// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { CHANGED_CLASS, markChanges } from "./_diagramDiff.ts";

type Edge = { id: string; label?: string };

// Mimics the structure of mermaid's flowchart/swimlane SVG output
function svg(renderId: string, nodes: string[][], edges: Edge[] = []) {
  const nodeEls = nodes
    .map(
      ([id, text], index) =>
        `<g class="node default" id="${renderId}-flowchart-${id}-${index}"><foreignObject><div>${text}<br>—&nbsp;§1</div></foreignObject></g>`,
    )
    .join("");
  const edgeEls = edges
    .map(({ id }) => `<path data-id="${id}" class="flowchart-link"></path>`)
    .join("");
  const labelEls = edges
    .map(
      ({ id, label = "" }) =>
        `<g class="edgeLabel"><g class="label" data-id="${id}">${label}</g></g>`,
    )
    .join("");
  return `<svg id="${renderId}"><g class="edgePaths">${edgeEls}</g><g class="edgeLabels">${labelEls}</g><g class="nodes">${nodeEls}</g></svg>`;
}

function changed(result: string): string[] {
  const doc = new DOMParser().parseFromString(result, "text/html");
  return [...doc.querySelectorAll(`.${CHANGED_CLASS}`)].map(
    (element) => element.id || element.getAttribute("data-id")!,
  );
}

describe("markChanges", () => {
  it("marks inserted nodes and edges, ignoring the shifted counters and render id", () => {
    const before = svg(
      "mermaid-diagram-1",
      [
        ["C", "Antrag"],
        ["D", "Bescheid"],
      ],
      [{ id: "L_C_D_0" }],
    );
    const after = svg(
      "mermaid-diagram-2",
      [
        ["C", "Antrag"],
        ["X", "Prüfung"],
        ["D", "Bescheid"],
      ],
      [{ id: "L_C_X_0" }, { id: "L_X_D_0" }],
    );

    expect(changed(markChanges(before, after))).toEqual([
      "L_C_X_0",
      "L_X_D_0",
      "mermaid-diagram-2-flowchart-X-1",
    ]);
  });

  it("marks nodes and edges whose text changed", () => {
    const before = svg(
      "a",
      [
        ["A", "alt"],
        ["B", "gleich"],
      ],
      [{ id: "L_A_B_0", label: "Ja" }],
    );
    const after = svg(
      "b",
      [
        ["A", "neu"],
        ["B", "gleich"],
      ],
      [{ id: "L_A_B_0", label: "Nein" }],
    );

    expect(changed(markChanges(before, after))).toEqual([
      "L_A_B_0",
      "b-flowchart-A-0",
    ]);
  });

  it("marks nothing when only the render changed, e.g. after flipping", () => {
    const nodes = [
      ["A", "eins"],
      ["B", "zwei"],
    ];
    const edges = [{ id: "L_A_B_0", label: "Ja" }];

    expect(
      changed(markChanges(svg("a", nodes, edges), svg("b", nodes, edges))),
    ).toEqual([]);
  });

  it("keeps the HTML labels intact", () => {
    const after = svg("b", [["A", "eins"]]);

    expect(markChanges(svg("a", []), after)).toContain("eins<br>—&nbsp;§1");
  });
});
