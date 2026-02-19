export type NavItem = {
  path: string;
  title: string;
  children?: NavItem[];
};

export const routes: Record<string, NavItem> = {
  begleitungen: { path: "/begleitungen", title: "Begleitungen" },
  schulungen: { path: "/schulungen", title: "Schulungen" },
  // anleitungenUndHilfsmittel: {
  //   path: "/anleitungen-und-hilfsmittel",
  //   title: "Anleitungen und Hilfsmittel",
  // },
  // ueberUns: {
  //   path: "/ueber-uns",
  //   title: "Über uns",
  //   children: [
  //     { path: "/ueber-uns/zahlen-und-fakten", title: "Zahlen und Fakten" },
  //     { path: "/ueber-uns/daran-arbeiten-wir", title: "Daran arbeiten wir" },
  //   ],
  // },
};

export default Object.values(routes);
