import { allRoutes } from "@/config/routes";

const pageTitles = allRoutes
  .filter((route) => !route.isStagingOnly)
  .map((route) => route.title);

export const keywords = [
  ...pageTitles,
  "Regelung",
  "Vorhaben",
  "Gesetz",
  "Gesetzgebung",
  "Legistik",
  "Rechtsetzung",
  "Frühphase",
  "digital",
  "digitaltauglich",
  "Digitalcheck",
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
  "Rulemap",
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
];
