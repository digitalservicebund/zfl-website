/** Class added to nodes and edges that a chat refinement added or changed. */
export const CHANGED_CLASS = "diagram-changed";

// Mermaid renders flowchart and swimlane nodes as <g class="node" id="…">,
// with the id made of the render id, "flowchart-", the node ID from the
// source and a counter, e.g. "mermaid-diagram-7-flowchart-F1-3". The counter
// follows the definition order, so it shifts when a node is inserted.
const NODE_ID_PATTERN = /flowchart-(.+)-\d+$/;

/** The node ID from the Mermaid source, stable across renders. */
export function diagramNodeKey(element: Element): string | undefined {
  return element.id.match(NODE_ID_PATTERN)?.[1];
}

// Edges carry a data-id like "L_F1_F1B_0" on both the path and its label
function edgeLabelTexts(doc: Document): Map<string, string> {
  return new Map(
    [...doc.querySelectorAll(".edgeLabel [data-id]")].map((label) => [
      label.getAttribute("data-id")!,
      label.textContent ?? "",
    ]),
  );
}

// Parsed as HTML: the labels contain HTML like <br>, which isn't valid XML
function parseSvg(svg: string): Document {
  return new DOMParser().parseFromString(svg, "text/html");
}

/** Visible text of every node and edge in the render, by element. */
function texts(doc: Document): Map<Element, { key: string; text: string }> {
  const result = new Map<Element, { key: string; text: string }>();
  for (const node of doc.querySelectorAll("g.node")) {
    const key = diagramNodeKey(node);
    if (key) {
      result.set(node, { key: `node:${key}`, text: node.textContent ?? "" });
    }
  }
  const labels = edgeLabelTexts(doc);
  for (const edge of doc.querySelectorAll("path[data-id]")) {
    const id = edge.getAttribute("data-id")!;
    result.set(edge, { key: `edge:${id}`, text: labels.get(id) ?? "" });
  }
  return result;
}

/**
 * Returns `newSvg` with CHANGED_CLASS on every node and edge that is new
 * compared to `oldSvg` or whose text differs. Removed elements can't be
 * marked, and pure style changes aren't detected.
 */
export function markChanges(oldSvg: string, newSvg: string): string {
  const before = new Map(
    [...texts(parseSvg(oldSvg)).values()].map(({ key, text }) => [key, text]),
  );
  const doc = parseSvg(newSvg);
  const svgEl = doc.querySelector("svg");
  if (!svgEl) return newSvg;

  for (const [element, { key, text }] of texts(doc)) {
    if (before.get(key) !== text) element.classList.add(CHANGED_CLASS);
  }

  return svgEl.outerHTML;
}
