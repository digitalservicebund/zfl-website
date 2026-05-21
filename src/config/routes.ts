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
  path: "/preview/barrierefreiheit",
  title: "Barrierefreiheit",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const begleitungen = {
  key: "begleitungen",
  path: "/preview/begleitungen",
  title: "Regelungsbegleitung",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const datenschutz = {
  key: "datenschutz",
  path: "/preview/datenschutz",
  title: "Datenschutzerklärung",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const dev = {
  key: "dev",
  path: "/preview/dev",
  title: "Dev Seiten",
  parent: null,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const dev_astroKomponenten = {
  key: "dev_astroKomponenten",
  path: "/preview/dev/astro-komponenten",
  title: "Astro Komponenten",
  parent: dev,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const dev_kernKomponenten = {
  key: "dev_kernKomponenten",
  path: "/preview/dev/kern-komponenten",
  title: "KERN Komponenten",
  parent: dev,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const home = {
  key: "home",
  path: "/preview/",
  title: "Zentrum für Legistik",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const impressum = {
  key: "impressum",
  path: "/preview/impressum",
  title: "Impressum",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const kontakt = {
  key: "kontakt",
  path: "/preview/kontakt",
  title: "Kontakt",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const schulungen = {
  key: "schulungen",
  path: "/preview/schulungen",
  title: "Schulungen",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const sitemap = {
  key: "sitemap",
  path: "/preview/sitemap",
  title: "Sitemap",
  parent: null,
  sitemap: false,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const staging = {
  key: "staging",
  path: "/preview/staging",
  title: "Staging-Umgebung",
  parent: null,
  sitemap: false,
  isStagingOnly: true,
  navOrder: null,
  navLabel: null,
} as const;

export const ueber = {
  key: "ueber",
  path: "/preview/ueber",
  title: "Über uns",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const ueber_aktuelleMeldungen = {
  key: "ueber_aktuelleMeldungen",
  path: "/preview/ueber/aktuelle-meldungen",
  title: "Aktuelle Meldungen",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 3,
  navLabel: null,
} as const;

export const ueber_daranArbeitenWir = {
  key: "ueber_daranArbeitenWir",
  path: "/preview/ueber/daran-arbeiten-wir",
  title: "Daran arbeiten wir",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 1,
  navLabel: null,
} as const;

export const ueber_zahlenUndFakten = {
  key: "ueber_zahlenUndFakten",
  path: "/preview/ueber/zahlen-und-fakten",
  title: "Zahlen und Fakten",
  parent: ueber,
  sitemap: true,
  isStagingOnly: false,
  navOrder: 2,
  navLabel: null,
} as const;

export const werkzeuge = {
  key: "werkzeuge",
  path: "/preview/werkzeuge",
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
  kontakt,
  schulungen,
  sitemap,
  staging,
  ueber,
  ueber_aktuelleMeldungen,
  ueber_daranArbeitenWir,
  ueber_zahlenUndFakten,
  werkzeuge,
] as const;
