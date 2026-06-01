import { allRoutes } from "@/config/routes";

const pageTitles = allRoutes
  .filter((route) => !route.isStagingOnly)
  .map((route) => route.title);

export const keywords = [
  ...pageTitles,
  "Regelung",
  "Vorhaben",
  "Legistik",
  "Frühphase",
  "digital",
  "Digitalcheck",
  "Interoperabilität",
  "Gesetzgebung",
  "Hilfsmittel",
  "Rechtsförmlichkeit",
];
