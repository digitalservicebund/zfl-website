interface VisExample {
  type: string;
  loadMermaid: () => Promise<string>;
}

interface LawExample {
  title: string;
  visOptions: VisExample[];
}

export const examples: LawExample[] = [
  {
    title:
      "Verordnung über die verbrauchsabhängige Abrechnung der Heiz- und Warmwasserkosten (HeizkostenV)",
    visOptions: [
      {
        type: "Geltungsbereich",
        loadMermaid: () =>
          import("./_data/heizkostenv_geltungsbereich.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Kürzungsrecht",
        loadMermaid: () =>
          import("./_data/heizkostenv_kuerzungsrecht.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Kostenverteilung",
        loadMermaid: () =>
          import("./_data/heizkostenv_kostenverteilung.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Pflichten des Gebäudeeigentümers",
        loadMermaid: () =>
          import("./_data/heizkostenv_pflichtenkreislauf.mmd?raw").then(
            (m) => m.default,
          ),
      },
    ],
  },
  {
    title: "Kündigungsschutzgesetz (KSchG)",
    visOptions: [
      {
        type: "Anwendbarkeitsprüfung",
        loadMermaid: () =>
          import("./_data/kschg_anwendbarkeit.mmd?raw").then((m) => m.default),
      },
      {
        type: 'Prüfschema "sozial ungerechtfertigt"',
        loadMermaid: () =>
          import("./_data/kschg_sozial_ungerechtfertigt.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Klagefristen-Kette",
        loadMermaid: () =>
          import("./_data/kschg_klagefristen.mmd?raw").then((m) => m.default),
      },
      {
        type: "Sonderkündigungsschutz-Zeiträume",
        loadMermaid: () =>
          import("./_data/kschg_sonderkuendigungsschutz.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Anzeigeverfahren Massenentlassung",
        loadMermaid: () =>
          import("./_data/kschg_massenentlassung.mmd?raw").then(
            (m) => m.default,
          ),
      },
    ],
  },
];
