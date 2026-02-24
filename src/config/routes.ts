import { isPreview } from "@/config/stage";

export type Route = {
  path: string;
  title: string;
  isStagingOnly?: boolean;
  showInHeader?: boolean;
  children?: Record<string, Route>;
};

export const removeTrailingSlash = (path: string) =>
  path.replace(/\/+$/, "").replace(/^$/, "/");

/**
 * Builds a URL with the correct base path for internal links in preview builds.
 * External links and non-preview builds are returned as-is.
 */
const buildUrl = (href: string): string => {
  const baseUrl = removeTrailingSlash(
    import.meta.env?.BASE_URL || process.env.BASE_URL || "",
  );
  return isPreview ? `${baseUrl}${href}` : href;
};

export const routes = {
  home: {
    path: buildUrl("/"),
    title: "Zentrum für Legistik",
    showInHeader: false,
  },
  begleitungen: {
    path: buildUrl("/begleitungen"),
    title: "Begleitungen",
    showInHeader: true,
  },
  schulungen: {
    path: buildUrl("/schulungen"),
    title: "Schulungen",
    showInHeader: true,
  },
  anleitungenUndHilfsmittel: {
    path: buildUrl("/anleitungen-und-hilfsmittel"),
    title: "Anleitungen und Hilfsmittel",
    showInHeader: true,
  },
  ueberUns: {
    path: buildUrl("/ueber-uns"),
    title: "Über das Zentrum für Legistik",
    showInHeader: true,
    isStagingOnly: true,
    children: {
      zahlenUndFakten: {
        path: buildUrl("/ueber-uns/zahlen-und-fakten"),
        title: "Zahlen und Fakten",
      },
      daranArbeitenWir: {
        path: buildUrl("/ueber-uns/daran-arbeiten-wir"),
        title: "Daran arbeiten wir",
      },
    },
  },
  impressum: {
    path: buildUrl("/impressum"),
    title: "Impressum",
    showInHeader: false,
  },
  datenschutz: {
    path: buildUrl("/datenschutz"),
    title: "Datenschutzerklärung",
    showInHeader: false,
  },
  barrierefreiheit: {
    path: buildUrl("/barrierefreiheit"),
    title: "Barrierefreiheit",
    showInHeader: false,
  },
  sitemap: {
    path: buildUrl("/sitemap"),
    title: "Sitemap",
    showInHeader: false,
  },
} satisfies Record<string, Route>;
