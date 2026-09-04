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

const markerPattern = /<!--finding:[^:]+:(?:start|end)-->/g;

// Strips finding markers belonging to other findings so they never leak into
// the rendered output.
function stripMarkers(text: string): string {
  return text.replace(markerPattern, "");
}

// Highlights the span wrapped by the <!--finding:{id}:start/end--> marker
// pair with a <mark>. Markers are embedded directly in the stored markdown
// body (see vorhaben-checks skill), so they stay valid even if unrelated
// parts of the text are edited later - unlike numeric offsets, which would
// silently drift.
export function highlightBody(body: string, id: string): string {
  const startMarker = `<!--finding:${id}:start-->`;
  const endMarker = `<!--finding:${id}:end-->`;
  const startIndex = body.indexOf(startMarker);
  const endIndex = body.indexOf(endMarker);
  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return escapeHtml(stripMarkers(body));
  }

  const before = escapeHtml(stripMarkers(body.slice(0, startIndex)));
  const match = escapeHtml(
    stripMarkers(body.slice(startIndex + startMarker.length, endIndex)),
  );
  const after = escapeHtml(
    stripMarkers(body.slice(endIndex + endMarker.length)),
  );
  return `${before}<mark class="finding-highlight bg-yellow-200">${match}</mark>${after}`;
}
