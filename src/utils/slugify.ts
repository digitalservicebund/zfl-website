// Converts arbitrary text (e.g. a heading) into a stable, HTML-id-safe slug.
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    // Strips combining diacritical marks NFKD split off from their base
    // letter (e.g. "é" -> "e" + U+0301), leaving plain ASCII.
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
