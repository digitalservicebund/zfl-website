export interface SearchEntry {
  /** Unique per diagram, e.g. "BEEG/anspruchsvoraussetzungen" */
  key: string;
  /** Law short title, e.g. "BEEG" */
  short: string;
  lawTitle: string;
  /** Name of the visualisation */
  name: string;
  summary: string;
  filename: string;
  href: string;
}

export const MIN_QUERY_LENGTH = 2;

// A term found in a more specific field ranks the entry higher.
const FIELD_WEIGHTS = [
  ["short", 8],
  ["name", 4],
  ["lawTitle", 2],
  ["summary", 1],
] as const satisfies [keyof SearchEntry, number][];

/** Case- and diacritic-insensitive, so "zustandigkeit" finds "Zuständigkeit". */
export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("de")
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "");
}

/**
 * Entries containing every term of the query, best matches first. Entries
 * with the same score keep their original order.
 */
export function searchDiagrams(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.join(" ").length < MIN_QUERY_LENGTH) return [];

  return entries
    .map((entry, index) => {
      const fields = FIELD_WEIGHTS.map(
        ([field, weight]) => [normalize(entry[field]), weight] as const,
      );
      let score = 0;
      for (const term of terms) {
        const termScore = Math.max(
          0,
          ...fields.map(([text, weight]) => (text.includes(term) ? weight : 0)),
        );
        if (termScore === 0) return undefined;
        score += termScore;
      }
      return { entry, index, score };
    })
    .filter((match) => match !== undefined)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ entry }) => entry);
}
