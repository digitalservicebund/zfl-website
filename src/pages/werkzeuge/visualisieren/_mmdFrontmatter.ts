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
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { summary: "", body: source };

  const frontmatter = match[1];
  const body = source.slice(match[0].length);
  const summaryMatch = frontmatter.match(
    /^summary:\s*"((?:[^"\\]|\\.)*)"\s*$/m,
  );
  const summary = summaryMatch
    ? summaryMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")
    : "";

  return { summary, body };
}
