import { allRoutes } from "@/config/routes";
import { getCollection } from "astro:content";

// Generates keywords from page titles and content collections for fuzzy search suggestions.
// Use in Astro frontmatter only

const WORD_SPLIT_REGEX = /[ .–()]+/;
const MIN_LENGTH = 4; // to exclude "der", "und", "die", etc.

const normalizeKeywords = (keywords: string[]) =>
  keywords
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length >= MIN_LENGTH);

const pageKeywords = allRoutes
  .filter((route) => !route.isStagingOnly)
  .flatMap((route) => route.title.split(WORD_SPLIT_REGEX));

const werkzeuge = await getCollection("werkzeuge");

export const werkzeugKeywords = normalizeKeywords(
  werkzeuge.flatMap((werkzeug) => werkzeug.data.title.split(WORD_SPLIT_REGEX)),
);

const staticKeywords = [
  "Regelung",
  "Vorhaben",
  "Gesetz",
  "Rechtsetzung",
  "Frühphase",
  "digital",
  "digitaltauglich",
  "Digitalisierung",
  "Normenkontrollrat",
  "Europa",
  "Interoperabilität",
  "Hilfsmittel",
  "Anleitung",
  "Leitfaden",
  "Methode",
  "Prozess",
  "Problem",
  "Analyse",
  "Visualisierung",
  "Rechtsförmlichkeit",
  "Folgen",
  "Gesetzesfolgen",
  "Bürokratie",
  "Bürokratieabbau",
  "Termine",
  "Übungen",
  "Modernisierungsagenda",
  "Staatsmodernisierung",
  "Angebot",
  "Schulung",
];

export const allKeywords = new Set(
  normalizeKeywords([...pageKeywords, ...werkzeugKeywords, ...staticKeywords]),
);
