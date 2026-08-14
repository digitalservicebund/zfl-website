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
  {
    title: "Gesetz zum Umgang mit Konsumcannabis (KCanG)",
    visOptions: [
      {
        type: "Besitzmengen-Ampel",
        loadMermaid: () =>
          import("./_data/kcang_besitzmengen.mmd?raw").then((m) => m.default),
      },
      {
        type: "Privater Eigenanbau",
        loadMermaid: () =>
          import("./_data/kcang_privater_eigenanbau.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Erlaubnisverfahren Anbauvereinigung",
        loadMermaid: () =>
          import("./_data/kcang_anbauvereinigung_erlaubnis.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Straf- und Bußgeldschema",
        loadMermaid: () =>
          import("./_data/kcang_straf_bussgeld.mmd?raw").then((m) => m.default),
      },
      {
        type: "Tilgungsverfahren Bundeszentralregister",
        loadMermaid: () =>
          import("./_data/kcang_tilgungsverfahren.mmd?raw").then(
            (m) => m.default,
          ),
      },
    ],
  },
  {
    title: "Betriebskostenverordnung (BetrKV)",
    visOptions: [
      {
        type: "Abgrenzung Betriebskosten",
        loadMermaid: () =>
          import("./_data/betrkv_abgrenzung.mmd?raw").then((m) => m.default),
      },
      {
        type: "Kabelanschluss-/Antennenkosten",
        loadMermaid: () =>
          import("./_data/betrkv_kabelanschluss.mmd?raw").then(
            (m) => m.default,
          ),
      },
      {
        type: "Heiz- und Warmwasserkosten",
        loadMermaid: () =>
          import("./_data/betrkv_heizwarmwasser.mmd?raw").then(
            (m) => m.default,
          ),
      },
    ],
  },
];
