import { allRoutes } from "@/config/routes";

export const keywords = allRoutes
  .filter((route) => {
    return !route.isStagingOnly;
  })
  .map((route) => {
    return route.title;
  });

function levenshteinDistanz(word: string, keyword: string) {
  const a = word.trim().toLowerCase();
  const b = keyword.trim().toLowerCase();

  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let previousRow = Array.from({ length: b.length + 1 }, (_, index) => index);
  let currentRow = new Array<number>(b.length + 1);

  for (let row = 1; row <= a.length; row += 1) {
    currentRow[0] = row;

    for (let column = 1; column <= b.length; column += 1) {
      const substitutionCost = a[row - 1] === b[column - 1] ? 0 : 1;

      currentRow[column] = Math.min(
        previousRow[column] + 1,
        currentRow[column - 1] + 1,
        previousRow[column - 1] + substitutionCost,
      );
    }

    [previousRow, currentRow] = [currentRow, previousRow];
  }

  const distanceVal = previousRow[b.length];
  return distanceVal;
}

export function getBestMatch(term: string, maxDistance: number): string | null {
  const normalizedTerm = term.trim();
  if (!normalizedTerm) return null;

  let bestKeyword: string | null = null;
  let bestDistance: number = 10; //maybe equal to the longest word?

  keywords.forEach((element) => {
    const distance = levenshteinDistanz(normalizedTerm, element);

    if (distance < bestDistance && distance <= maxDistance && distance != 0) {
      bestDistance = distance;
      bestKeyword = element;
    }
  });

  return bestKeyword || null;
}
