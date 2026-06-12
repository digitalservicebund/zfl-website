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

export const vorhaben_steckbrief = {
  key: "vorhaben_steckbrief",
  path: "/vorhaben/steckbrief",
  title: "Steckbrief",
  parent: vorhaben,
  sitemap: false,
  isStagingOnly: false,
  navOrder: null,
  navLabel: null,
} as const;

export const vorhaben_steckbrief_schritt1 = {
  key: "vorhaben_steckbrief_schritt1",
  path: "/vorhaben/steckbrief/schritt-1",
  title: "1. Allgemeine Angaben",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 1,
  navLabel: null,
} as const;

export const vorhaben_steckbrief_schritt2 = {
  key: "vorhaben_steckbrief_schritt2",
  path: "/vorhaben/steckbrief/schritt-2",
  title: "2. Kontext & Genese",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 2,
  navLabel: null,
} as const;

export const vorhaben_steckbrief_schritt3 = {
  key: "vorhaben_steckbrief_schritt3",
  path: "/vorhaben/steckbrief/schritt-3",
  title: "3. Problembeschreibung",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 3,
  navLabel: "3. Problem",
} as const;

export const vorhaben_steckbrief_schritt4 = {
  key: "vorhaben_steckbrief_schritt4",
  path: "/vorhaben/steckbrief/schritt-4",
  title: "4. Vorläufige Zielsetzung",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 4,
  navLabel: "4. Zielsetzung",
} as const;

export const vorhaben_steckbrief_schritt5 = {
  key: "vorhaben_steckbrief_schritt5",
  path: "/vorhaben/steckbrief/schritt-5",
  title: "5. Einflussfaktoren & relevante Akteure",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 5,
  navLabel: "5. Einflussfaktoren",
} as const;

export const vorhaben_steckbrief_schritt6 = {
  key: "vorhaben_steckbrief_schritt6",
  path: "/vorhaben/steckbrief/schritt-6",
  title: "6. Vorhabensbeschreibung",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 6,
  navLabel: "6. Vorhaben",
} as const;

export const vorhaben_steckbrief_schritt7 = {
  key: "vorhaben_steckbrief_schritt7",
  path: "/vorhaben/steckbrief/schritt-7",
  title: "7. Zusammenfassung",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 7,
  navLabel: null,
} as const;

export const vorhaben_steckbrief_schritt8 = {
  key: "vorhaben_steckbrief_schritt8",
  path: "/vorhaben/steckbrief/schritt-8",
  title: "8. Herunterladen & Absenden",
  parent: vorhaben_steckbrief,
  sitemap: false,
  isStagingOnly: false,
  navOrder: 8,
  navLabel: "8. Abschluss",
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
  vorhaben_steckbrief,
  vorhaben_steckbrief_schritt1,
  vorhaben_steckbrief_schritt2,
  vorhaben_steckbrief_schritt3,
  vorhaben_steckbrief_schritt4,
  vorhaben_steckbrief_schritt5,
  vorhaben_steckbrief_schritt6,
  vorhaben_steckbrief_schritt7,
  vorhaben_steckbrief_schritt8,
  werkzeuge,
] as const;
