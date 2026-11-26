// Mermaid's default (200px) re-wraps the <br/>-separated lines in top-down
// diagrams, making nodes narrow and diagrams very tall. Left-right actor
// overviews keep the default: their one-line-per-duty labels would
// otherwise make the diagram very wide and flat.
export function wrappingWidthFor(source: string): number {
  return /^\s*flowchart\s+(LR|RL)\b/.test(source) ? 200 : 400;
}
