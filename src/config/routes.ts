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

export const ueber_neueFruephase = {
  key: "ueber_neueFruephase",
  path: "/ueber/neue-fruephase",
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

export const vorhaben = {
  key: "vorhaben",
  path: "/vorhaben",
  title: "Vorhaben erarbeiten",
  parent: null,
  sitemap: true,
  isStagingOnly: false,
  navOrder: null,
  navLabel: "Ihr Vorhaben",
} as const;

export const vorhaben_fruephase2 = {
  key: "vorhaben_fruephase2",
  path: "/vorhaben/fruephase-2",
  title: "Frühphase II",
  parent: vorhaben,
  sitemap: false,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const vorhaben_fruephase2_schritt2 = {
  key: "vorhaben_fruephase2_schritt2",
  path: "/vorhaben/fruephase-2/schritt-2",
  title: "Einbeziehung Perspektiven externer Stakeholder",
  parent: vorhaben_fruephase2,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 1,
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
  kontakt,
  schulungen,
  sitemap,
  staging,
  ueber,
  ueber_aktuelleMeldungen,
  ueber_daranArbeitenWir,
  ueber_neueFruephase,
  ueber_zahlenUndFakten,
  vorhaben,
  vorhaben_fruephase2,
  vorhaben_fruephase2_schritt2,
  werkzeuge,
] as const;
