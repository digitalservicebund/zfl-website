import { keywords } from "./keywords";

export function getFuzzyMatch(term: string, maxDistance: number) {
  const normalizedTerm = term.trim();
  if (!normalizedTerm) return;

  let bestKeyword: string | undefined;
  let bestDistance: number = 10; //maybe equal to the longest word?

  keywords.forEach((keyword) => {
    const distance = levenshteinDistance(normalizedTerm, keyword);

    if (distance && distance < bestDistance && distance <= maxDistance) {
      bestDistance = distance;
      bestKeyword = keyword;
    }
  });

  return bestKeyword;
}

function levenshteinDistance(word: string, keyword: string) {
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
