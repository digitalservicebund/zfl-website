// Renders diagram previews one at a time. Mermaid serialises renders anyway
// and can't cancel one that has started, so previews that were removed in the
// meantime (e.g. while the user keeps typing a search) are skipped before
// their turn instead of piling up.

// Fits the diagram to the preview's width, so it is never cropped at the
// sides; tall diagrams are cropped at the bottom by the parent instead. Small
// diagrams don't blow up beyond this zoom (relative to their natural size).
const MAX_SCALE = 0.5;

const svgCache = new Map<string, string>();
let queue: Promise<unknown> = Promise.resolve();
let renderCount = 0;

const loadMermaid = async () => {
  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({ startOnLoad: false });
  return mermaid;
};
let mermaidPromise: ReturnType<typeof loadMermaid> | undefined;

export function cachedPreview(key: string): string | undefined {
  return svgCache.get(key);
}

/**
 * The preview's SVG, or undefined if `signal` was aborted before it was
 * rendered. Results are cached by `key` for the page visit.
 */
export async function renderPreview(
  key: string,
  loadSource: () => Promise<string>,
  signal: AbortSignal,
): Promise<string | undefined> {
  const cached = svgCache.get(key);
  if (cached) return cached;

  const source = await loadSource();
  const job = queue.then(async () => {
    if (signal.aborted) return undefined;
    mermaidPromise ??= loadMermaid();
    const mermaid = await mermaidPromise;
    const { svg } = await mermaid.render(
      `diagram-preview-${++renderCount}`,
      source,
    );
    // The first max-width is the one on the root <svg>, holding its natural
    // width.
    const fitted = svg.replace(
      /max-width:\s*([\d.]+)px/,
      (_, width: string) =>
        `width: 100%; max-width: ${Number(width) * MAX_SCALE}px`,
    );
    svgCache.set(key, fitted);
    return fitted;
  });
  queue = job.catch(() => undefined);
  return job;
}
