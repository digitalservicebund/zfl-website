interface VisExample {
  name: string;
  filename: string;
}

interface LawExample {
  title: string;
  short: string;
  visOptions: VisExample[];
}

export const examples: LawExample[] = [
  {
    title:
      "Verordnung über die verbrauchsabhängige Abrechnung der Heiz- und Warmwasserkosten",
    short: "HeizkostenV",
    visOptions: [
      { name: "Geltungsbereich", filename: "geltungsbereich" },
      { name: "Kürzungsrecht", filename: "kuerzungsrecht" },
      { name: "Kostenverteilung", filename: "kostenverteilung" },
      {
        name: "Pflichten des Gebäudeeigentümers",
        filename: "pflichtenkreislauf",
      },
    ],
  },
  {
    title: "Kündigungsschutzgesetz",
    short: "KSchG",
    visOptions: [
      { name: "Anwendbarkeitsprüfung", filename: "anwendbarkeit" },
      {
        name: 'Prüfschema "sozial ungerechtfertigt"',
        filename: "sozial_ungerechtfertigt",
      },
      { name: "Klagefristen-Kette", filename: "klagefristen" },
      {
        name: "Sonderkündigungsschutz-Zeiträume",
        filename: "sonderkuendigungsschutz",
      },
      {
        name: "Anzeigeverfahren Massenentlassung",
        filename: "massenentlassung",
      },
    ],
  },
  {
    title: "Gesetz zum Umgang mit Konsumcannabis",
    short: "KCanG",
    visOptions: [
      { name: "Besitzmengen-Ampel", filename: "besitzmengen" },
      { name: "Privater Eigenanbau", filename: "privater_eigenanbau" },
      {
        name: "Erlaubnisverfahren Anbauvereinigung",
        filename: "anbauvereinigung_erlaubnis",
      },
      { name: "Straf- und Bußgeldschema", filename: "straf_bussgeld" },
      {
        name: "Tilgungsverfahren Bundeszentralregister",
        filename: "tilgungsverfahren",
      },
    ],
  },
  {
    title: "Betriebskostenverordnung",
    short: "BetrKV",
    visOptions: [
      { name: "Abgrenzung Betriebskosten", filename: "abgrenzung" },
      {
        name: "Kabelanschluss-/Antennenkosten",
        filename: "kabelanschluss",
      },
      { name: "Heiz- und Warmwasserkosten", filename: "heizwarmwasser" },
    ],
  },
  {
    title: "Gesetz über Teilzeitarbeit und befristete Arbeitsverträge",
    short: "TzBfG",
    visOptions: [
      {
        name: "Zulässigkeit der Befristung",
        filename: "befristung_zulaessigkeit",
      },
      {
        name: "Anspruch auf Arbeitszeitverringerung",
        filename: "verringerung_arbeitszeit",
      },
      { name: "Brückenteilzeit", filename: "bruecken_teilzeit" },
      {
        name: "Verlängerung der Arbeitszeit",
        filename: "verlaengerung_arbeitszeit",
      },
      {
        name: "Folgen unwirksamer Befristung",
        filename: "unwirksame_befristung",
      },
    ],
  },
];
