function escapeHtml(text: string): string {
  return text.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );
}

// Highlights body[offsetFrom:offsetTo] with a <mark>. Escapes and slices the
// raw text directly (no markdown rendering) so the offsets - computed by the
// check against this exact string - stay valid; rendering as markdown/HTML
// first would shift character positions relative to the stored offsets.
export function highlightBody(
  body: string,
  offsetFrom: number,
  offsetTo: number,
): string {
  const before = escapeHtml(body.slice(0, offsetFrom));
  const match = escapeHtml(body.slice(offsetFrom, offsetTo));
  const after = escapeHtml(body.slice(offsetTo));
  return `${before}<mark class="finding-highlight bg-yellow-200">${match}</mark>${after}`;
}
