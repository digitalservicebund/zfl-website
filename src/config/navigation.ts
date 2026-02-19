import { isStaging } from "./stage";

export type NavItem = {
  path: string;
  title: string;
  showInHeader?: boolean;
  children?: NavItem[];
};

export const routes: Record<string, NavItem> = {
  begleitungen: { path: "/begleitungen", title: "Begleitungen" },
  schulungen: { path: "/schulungen", title: "Schulungen" },
  anleitungenUndHilfsmittel: {
    path: "/anleitungen-und-hilfsmittel",
    title: "Anleitungen und Hilfsmittel",
    showInHeader: isStaging,
  },
  ueberUns: {
    path: "/ueber-uns",
    title: "Über uns",
    showInHeader: isStaging,
    children: [
      { path: "/ueber-uns/zahlen-und-fakten", title: "Zahlen und Fakten" },
      { path: "/ueber-uns/daran-arbeiten-wir", title: "Daran arbeiten wir" },
    ],
  },
  impressum: { path: "/impressum", title: "Impressum" },
  datenschutz: { path: "/datenschutz", title: "Datenschutzerklärung" },
  barrierefreiheit: { path: "/barrierefreiheit", title: "Barrierefreiheit" },
  sitemap: { path: "/sitemap", title: "Sitemap" },
};

export default Object.values(routes);
