import { stripLinks } from "./_diagramExport.ts";
import { wrappingWidthFor } from "./_mermaidConfig.ts";
import { parseMmdFrontmatter } from "./_mmdFrontmatter.ts";

// Lazy: in the browser, each diagram is its own chunk that is only fetched
// when its preview is about to be rendered.
const mermaidSources = import.meta.glob<string>(
  "/src/content/ki-visualisierungen/*/*.mmd",
  { query: "?raw", import: "default" },
);

function sourceLoader(short: string, filename: string) {
  return mermaidSources[
    `/src/content/ki-visualisierungen/${short}/${filename}.mmd`
  ];
}

export function hasMmd(short: string, filename: string | undefined): boolean {
  return !!filename && !!sourceLoader(short, filename);
}

/** The .mmd file split into its repo-local frontmatter and Mermaid body. */
export async function loadMmd(short: string, filename: string) {
  const load = sourceLoader(short, filename);
  if (!load) throw new Error(`No diagram ${short}/${filename}.mmd`);
  return parseMmdFrontmatter(await load());
}

/**
 * Mermaid source for a preview: links stripped (they'd end up nested in the
 * preview card's link) and its own config prepended. Several previews render
 * on one page, so the global mermaid.initialize() config can't be switched
 * per diagram.
 */
export async function loadPreviewSource(
  short: string,
  filename: string,
): Promise<string> {
  const body = stripLinks((await loadMmd(short, filename)).body);
  return `---
config:
  htmlLabels: true
  flowchart:
    htmlLabels: true
    wrappingWidth: ${wrappingWidthFor(body)}
---
${body}`;
}
