export type Route = {
  url: string;
  title: string;
};

export const routes: Route[] = [
  { url: "/", title: "Zentrum für Legistik" },
  { url: "/barrierefreiheit", title: "Barrierefreiheit" },
  { url: "/begleitungen", title: "Begleitungen" },
  { url: "/daran-arbeiten-wir", title: "Daran arbeiten wir" },
  { url: "/datenschutz", title: "Datenschutzerklärung" },
  { url: "/impressum", title: "Impressum" },
  { url: "/schulungen", title: "Schulungen" },
  { url: "/zahlen-und-fakten", title: "Zahlen und Fakten" },
];
