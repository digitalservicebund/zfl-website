/**
 * Converts a mermaid flowchart into the XML format understood by the
 * Rulemapping Builder (https://builder.rulemapping.org/). The format itself
 * isn't documented, so this is a best-effort, structural conversion rather
 * than a semantically faithful one:
 *
 * - A decision node (`{"..."}`) with more than one outgoing branch becomes an
 *   `xor` node, since its branches (e.g. "Ja"/"Nein" or a set of ranges) are
 *   normally mutually exclusive.
 * - A node with exactly one outgoing edge is just a sequential step, so it
 *   becomes `and` regardless of its shape.
 * - A non-decision node with several outgoing edges (rare in these charts)
 *   becomes `or`.
 * - A node with no outgoing edges is a leaf ("virtual").
 *
 * Edge labels (branch conditions) have no equivalent in the Rulemap format,
 * so they're folded into the title of the node they point to.
 */

interface FlowNode {
  shape: "rect" | "diamond" | "unknown";
  label: string;
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

interface ParsedFlowchart {
  nodes: Map<string, FlowNode>;
  edges: FlowEdge[];
}

interface RulemapNode {
  title: string;
  logic: "and" | "or" | "xor" | "virtual";
  children: RulemapNode[];
}

export function isMermaidFlowchart(source: string): boolean {
  const firstLine = source.trim().split("\n")[0]?.trim() ?? "";
  return /^flowchart\b/i.test(firstLine);
}

function cleanLabel(raw: string): string {
  return raw
    .replace(/<a\b[^>]*>(.*?)<\/a>/gis, "$1")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function escapeXmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const NODE_DEF_RE = /([A-Za-z0-9_]+)(\[|\{)"((?:\\.|[^"\\])*)"(\]|\})/g;
const EDGE_RE =
  /([A-Za-z0-9_]+)\s*--+>\s*(?:\|\s*(?:"([^"]*)"|([^|]*?))\s*\|\s*)?([A-Za-z0-9_]+)/g;

function parseFlowchart(source: string): ParsedFlowchart {
  const nodes = new Map<string, FlowNode>();

  for (const [, id, openBracket, rawLabel] of source.matchAll(NODE_DEF_RE)) {
    nodes.set(id, {
      shape: openBracket === "{" ? "diamond" : "rect",
      label: cleanLabel(rawLabel),
    });
  }

  const structureOnly = source.replace(NODE_DEF_RE, (_match, id) => id);

  const edges: FlowEdge[] = [];
  for (const [, from, quotedLabel, plainLabel, to] of structureOnly.matchAll(
    EDGE_RE,
  )) {
    const rawLabel = quotedLabel ?? plainLabel;
    edges.push({
      from,
      to,
      label: rawLabel ? cleanLabel(rawLabel) : undefined,
    });
  }

  for (const { from, to } of edges) {
    if (!nodes.has(from)) nodes.set(from, { shape: "unknown", label: from });
    if (!nodes.has(to)) nodes.set(to, { shape: "unknown", label: to });
  }

  return { nodes, edges };
}

function buildTree(parsed: ParsedFlowchart): RulemapNode {
  const outgoingByNode = new Map<string, FlowEdge[]>();
  for (const edge of parsed.edges) {
    const list = outgoingByNode.get(edge.from) ?? [];
    list.push(edge);
    outgoingByNode.set(edge.from, list);
  }

  const hasIncoming = new Set(parsed.edges.map((edge) => edge.to));
  const roots = [...parsed.nodes.keys()].filter((id) => !hasIncoming.has(id));
  if (roots.length === 0 && parsed.nodes.size > 0) {
    roots.push(parsed.nodes.keys().next().value as string);
  }

  function buildNode(
    id: string,
    edgeLabel: string | undefined,
    ancestors: ReadonlySet<string>,
  ): RulemapNode {
    const node = parsed.nodes.get(id);
    const baseTitle = node?.label ?? id;
    const title = edgeLabel ? `${edgeLabel}: ${baseTitle}` : baseTitle;

    // Guards against cycles (e.g. a flowchart looping back to an earlier
    // step); genuine DAG convergence is fine and duplicates the subtree.
    if (ancestors.has(id)) {
      return { title, logic: "virtual", children: [] };
    }

    const outgoing = outgoingByNode.get(id) ?? [];
    if (outgoing.length === 0) {
      return { title, logic: "virtual", children: [] };
    }

    const nextAncestors = new Set(ancestors);
    nextAncestors.add(id);
    const children = outgoing.map((edge) =>
      buildNode(edge.to, edge.label, nextAncestors),
    );

    const logic: RulemapNode["logic"] =
      children.length === 1 ? "and" : node?.shape === "diamond" ? "xor" : "or";

    return { title, logic, children };
  }

  if (roots.length === 1) {
    return buildNode(roots[0], undefined, new Set());
  }

  return {
    title: "Start",
    logic: "or",
    children: roots.map((id) => buildNode(id, undefined, new Set())),
  };
}

function serializeTree(root: RulemapNode): string {
  let nextId = 1;

  function serializeNode(node: RulemapNode, depth: number): string {
    const indent = "  ".repeat(depth);
    const attrs = `id="${nextId++}" title="${escapeXmlAttr(node.title)}" alttext="" logic="${node.logic}"`;

    if (node.children.length === 0) {
      return `${indent}<node ${attrs}/>`;
    }

    const childrenXml = node.children
      .map((child) => serializeNode(child, depth + 1))
      .join("\n");
    return `${indent}<node ${attrs}>\n${childrenXml}\n${indent}</node>`;
  }

  return serializeNode(root, 1);
}

export function mermaidFlowchartToRulemapXml(
  source: string,
  title: string,
): string {
  const tree = buildTree(parseFlowchart(source));
  const body = serializeTree(tree);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rulemap title="${escapeXmlAttr(title)}" application="query-action-ai">\n${body}\n</rulemap>\n`;
}
