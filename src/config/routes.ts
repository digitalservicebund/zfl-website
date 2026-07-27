// ⚠️ This file is auto-generated — do not edit manually. ⚠️

export type Route = {
  readonly key: string;
  readonly path: string;
  readonly title: string;
  readonly parent: Route | null;
  readonly sitemap: boolean;
  readonly isStagingOnly: boolean;
  readonly navOrder: number | null;
  readonly navLabel: string | null;
};

export const barrierefreiheit = {
  key: "barrierefreiheit",
  path: "/barrierefreiheit",
  title: "Barrierefreiheit",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const begleitungen = {
  key: "begleitungen",
  path: "/begleitungen",
  title: "Regelungsbegleitung",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const datenschutz = {
  key: "datenschutz",
  path: "/datenschutz",
  title: "Datenschutzerklärung",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const dev = {
  key: "dev",
  path: "/dev",
  title: "Dev Seiten",
  parent: null,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const dev_astroKomponenten = {
  key: "dev_astroKomponenten",
  path: "/dev/astro-komponenten",
  title: "Astro Komponenten",
  parent: dev,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const dev_kernKomponenten = {
  key: "dev_kernKomponenten",
  path: "/dev/kern-komponenten",
  title: "KERN Komponenten",
  parent: dev,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const home = {
  key: "home",
  path: "/",
  title: "Zentrum für Legistik",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const impressum = {
  key: "impressum",
  path: "/impressum",
  title: "Impressum",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const kompetenzen = {
  key: "kompetenzen",
  path: "/kompetenzen",
  title: "Kompetenzen",
  parent: null,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 5,
  navLabel: "Kompetenzen",
} as const;

export const kompetenzen_buergerzentriertheit = {
  key: "kompetenzen_buergerzentriertheit",
  path: "/kompetenzen/buergerzentriertheit",
  title: "Bürgerzentriertheit",
  parent: kompetenzen,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 5,
  navLabel: "Bürgerzentriertheit",
} as const;

export const kompetenzen_digitaltauglichkeit = {
  key: "kompetenzen_digitaltauglichkeit",
  path: "/kompetenzen/digitaltauglichkeit",
  title: "Was ist Digitaltauglichkeit",
  parent: kompetenzen,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 3,
  navLabel: "Digitaltauglichkeit",
} as const;

export const kompetenzen_digitaltauglichkeit_beispiele = {
  key: "kompetenzen_digitaltauglichkeit_beispiele",
  path: "/kompetenzen/digitaltauglichkeit/beispiele",
  title: "Beispiele am Gesetzestext",
  parent: kompetenzen_digitaltauglichkeit,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 1,
  navLabel: "Beispiele am Gesetzestext",
} as const;

export const kompetenzen_euInteroperablitaet = {
  key: "kompetenzen_euInteroperablitaet",
  path: "/kompetenzen/eu-interoperablitaet",
  title: "EU Interoperabilität",
  parent: kompetenzen,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 2,
  navLabel: "EU-Interoperabilität",
} as const;

export const kompetenzen_euInteroperablitaet_dCATAP = {
  key: "kompetenzen_euInteroperablitaet_dCATAP",
  path: "/kompetenzen/eu-interoperablitaet/DCAT-AP",
  title: "SCAT-AP",
  parent: kompetenzen_euInteroperablitaet,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 2,
  navLabel: "DCAT-AP",
} as const;

export const kompetenzen_euInteroperablitaet_sematicVocab = {
  key: "kompetenzen_euInteroperablitaet_sematicVocab",
  path: "/kompetenzen/eu-interoperablitaet/sematic-vocab",
  title: "Sematic Vocabularies",
  parent: kompetenzen_euInteroperablitaet,
  sitemap: true,
  isStagingOnly: true,
  navOrder: 1,
  navLabel: "Sematic Vocab",
} as const;

export const kompetenzen_praxistauglichkeit = {
  key: "kompetenzen_praxistauglichkeit",
  path: "/kompetenzen/praxistauglichkeit",
  title: "Praxistauglichkeit",
  parent: kompetenzen,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: "Praxistauglichkeit",
} as const;

export const kompetenzen_werkzeuge = {
  key: "kompetenzen_werkzeuge",
  path: "/kompetenzen/werkzeuge",
  title: "Werkzeuge",
  parent: kompetenzen,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const kontakt = {
  key: "kontakt",
  path: "/kontakt",
  title: "Kontakt",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const schulungen = {
  key: "schulungen",
  path: "/schulungen",
  title: "Schulungen",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const sitemap = {
  key: "sitemap",
  path: "/sitemap",
  title: "Sitemap",
  parent: null,
  sitemap: false,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const staging = {
  key: "staging",
  path: "/staging",
  title: "Staging-Umgebung",
  parent: null,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const ueber = {
  key: "ueber",
  path: "/ueber",
  title: "Über uns",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const ueber_aktuelleMeldungen = {
  key: "ueber_aktuelleMeldungen",
  path: "/ueber/aktuelle-meldungen",
  title: "Aktuelle Meldungen",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 3,
  navLabel: null,
} as const;

export const ueber_daranArbeitenWir = {
  key: "ueber_daranArbeitenWir",
  path: "/ueber/daran-arbeiten-wir",
  title: "Daran arbeiten wir",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 1,
  navLabel: null,
} as const;

export const ueber_neueFruehphase = {
  key: "ueber_neueFruehphase",
  path: "/ueber/neue-fruehphase",
  title: "Die neue Frühphase",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 4,
  navLabel: null,
} as const;

export const ueber_zahlenUndFakten = {
  key: "ueber_zahlenUndFakten",
  path: "/ueber/zahlen-und-fakten",
  title: "Zahlen und Fakten",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 2,
  navLabel: null,
} as const;

export const werkzeuge = {
  key: "werkzeuge",
  path: "/werkzeuge",
  title: "Werkzeuge",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const allRoutes = [
  barrierefreiheit,
  begleitungen,
  datenschutz,
  dev,
  dev_astroKomponenten,
  dev_kernKomponenten,
  home,
  impressum,
  kompetenzen,
  kompetenzen_buergerzentriertheit,
  kompetenzen_digitaltauglichkeit,
  kompetenzen_digitaltauglichkeit_beispiele,
  kompetenzen_euInteroperablitaet,
  kompetenzen_euInteroperablitaet_dCATAP,
  kompetenzen_euInteroperablitaet_sematicVocab,
  kompetenzen_praxistauglichkeit,
  kompetenzen_werkzeuge,
  kontakt,
  schulungen,
  sitemap,
  staging,
  ueber,
  ueber_aktuelleMeldungen,
  ueber_daranArbeitenWir,
  ueber_neueFruehphase,
  ueber_zahlenUndFakten,
  werkzeuge,
] as const;
