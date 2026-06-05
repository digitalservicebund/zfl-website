import { allRoutes } from "@/config/routes";
import { getCollection } from "astro:content";

// Generates keywords from page titles and content collections for fuzzy search suggestions.
// Use in Astro frontmatter only

const WORD_SPLIT_REGEX = /[ .–()]+/;
const MIN_LENGTH = 4; // to exclude "der", "und", "die", etc.

const pageKeywords = allRoutes
  .filter((route) => !route.isStagingOnly)
  .flatMap((route) => route.title.split(WORD_SPLIT_REGEX));

const werkzeuge = await getCollection("werkzeuge");

export const werkzeugKeywords = werkzeuge.flatMap((werkzeug) =>
  werkzeug.data.title.split(WORD_SPLIT_REGEX),
);

export const allKeywords = new Set(
  [
    ...pageKeywords,
    ...werkzeugKeywords,
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
  ].filter((keyword) => keyword.length >= MIN_LENGTH),
);
