interface VisExample {
  name: string;
  filename: string;
}

interface LawExample {
  title: string;
  short: string;
  /** ELI-Pfad des Gesetzes auf rechtsinformationen.bund.de, z.B.
   * "eli/bund/bgbl-1/2000/s1966/2022-08-01/1/deu". Wird verwendet, um
   * "{{ELI}}"-Platzhalter in den .mmd-Dateien zu Norm-Links aufzulösen. */
  eli: string;
  visOptions: VisExample[];
}

export const examples: LawExample[] = [
  {
    title:
      "Verordnung über die verbrauchsabhängige Abrechnung der Heiz- und Warmwasserkosten",
    short: "HeizkostenV",
    eli: "eli/bund/bgbl-1/1981/s261/2024-10-01/1/deu",
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
    eli: "eli/bund/bgbl-1/1951/s499/2021-06-18/1/deu",
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
    eli: "eli/bund/bgbl-1/2024/109-2/2025-01-01/1/deu",
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
    eli: "eli/bund/bgbl-1/2003/s2347/2024-01-01/1/deu",
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
    eli: "eli/bund/bgbl-1/2000/s1966/2022-08-01/1/deu",
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
