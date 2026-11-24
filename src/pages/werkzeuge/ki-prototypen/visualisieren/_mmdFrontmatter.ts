/**
 * .mmd files in ./_data carry an optional YAML-ish frontmatter block before
 * the actual Mermaid source, e.g.:
 *
 *   ---
 *   summary: "Kurze Beschreibung des Diagramms."
 *   ---
 *   flowchart TD
 *     ...
 *
 * This is a repo-local convention (not a Mermaid feature), so it must be
 * stripped before the remaining source is handed to mermaid.render() or the
 * flowchart/Rulemap-XML helpers.
 */
export function parseMmdFrontmatter(source: string): {
  summary: string;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { summary: "", body: source };

  const frontmatter = match[1];
  const body = source.slice(match[0].length);
  const summaryMatch = /^summary:\s*"((?:[^"\\]|\\.)*)"\s*$/m.exec(frontmatter);
  const summary = summaryMatch
    ? summaryMatch[1].replaceAll('\\"', '"').replaceAll("\\\\", "\\")
    : "";

  return { summary, body };
}
