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
  {
    title: "Arbeitszeitgesetz",
    short: "ArbZG",
    eli: "eli/bund/bgbl-1/1994/s1171/2025-01-01/1/deu",
    visOptions: [
      {
        name: "Werktägliche Höchstarbeitszeit",
        filename: "hoechstarbeitszeit",
      },
      { name: "Ruhepausen", filename: "ruhepausen" },
      { name: "Ruhezeit & Verkürzung", filename: "ruhezeit" },
      { name: "Sonn-/Feiertagsbeschäftigung", filename: "sonn_feiertage" },
      { name: "Notfall-Abweichungen", filename: "notfall_abweichungen" },
    ],
  },
  {
    title: "Allgemeines Gleichbehandlungsgesetz",
    short: "AGG",
    eli: "eli/bund/bgbl-1/2006/s1897/2025-01-01/1/deu",
    visOptions: [
      {
        name: "Prüfschema Benachteiligung",
        filename: "pruefschema_benachteiligung",
      },
      {
        name: "Rechtfertigung im Beschäftigungsverhältnis",
        filename: "rechtfertigung_beschaeftigung",
      },
      {
        name: "Beschwerde- & Schutzpflichten",
        filename: "beschwerde_schutzpflichten",
      },
      {
        name: "Entschädigungs- & Klagefristen",
        filename: "entschaedigung_fristen",
      },
      {
        name: "Zivilrechtliche Ansprüche",
        filename: "zivilrecht_ansprueche",
      },
    ],
  },
  {
    title: "Rennwett- und Lotteriegesetz",
    short: "RennwLottG",
    eli: "eli/bund/bgbl-1/2021/s2065/2022-01-01/1/deu",
    visOptions: [
      { name: "Erlaubnisverfahren", filename: "erlaubnisverfahren" },
      { name: "Straftat vs. Ordnungswidrigkeit", filename: "straftat_owi" },
      {
        name: "Zuordnung der Spielsteuerart",
        filename: "steuerartenzuordnung",
      },
      {
        name: "Lotteriesteuerbefreiung",
        filename: "lotteriesteuerbefreiung",
      },
      { name: "Besteuerungsverfahren", filename: "besteuerungsverfahren" },
    ],
  },
  {
    title: "Jugendschutzgesetz",
    short: "JuSchG",
    eli: "eli/bund/bgbl-1/2002/s2730/2024-05-14/1/deu",
    visOptions: [
      { name: "Aufenthalt in Gaststätten", filename: "gaststaetten" },
      { name: "Abgabe alkoholischer Getränke", filename: "alkoholabgabe" },
      {
        name: "Zutritt zu Filmveranstaltungen",
        filename: "filmveranstaltungen",
      },
      {
        name: "Indizierungsverfahren",
        filename: "indizierungsverfahren",
      },
      {
        name: "Vorsorgemaßnahmen der Anbieter",
        filename: "vorsorgemassnahmen",
      },
    ],
  },
  {
    title: "Digitale-Dienste-Gesetz",
    short: "DDG",
    eli: "eli/bund/bgbl-1/2024/149/2026-07-01/1/deu",
    visOptions: [
      { name: "Anwendungsbereichsprüfung", filename: "anwendungsbereich" },
      {
        name: "Haftungsprivileg & Sperrungsanspruch",
        filename: "haftungsprivileg",
      },
      { name: "Beschlagnahmeverfahren", filename: "beschlagnahme" },
      { name: "Durchsetzungsverfahren", filename: "durchsetzungsverfahren" },
      {
        name: "Gerichtliche Zugangsbeschränkung",
        filename: "zugangsbeschraenkung",
      },
    ],
  },
  {
    title: "Gesetz über das Aufspüren von Gewinnen aus schweren Straftaten",
    short: "GwG",
    eli: "eli/bund/bgbl-1/2017/s1822/2026-06-27/1/deu",
    visOptions: [
      {
        name: "Kundensorgfaltspflichten-Prüfschema",
        filename: "kundensorgfaltspflichten",
      },
      {
        name: "Wirtschaftlich Berechtigter-Ermittlung",
        filename: "wirtschaftlich_berechtigter",
      },
      {
        name: "Verstärkte Sorgfaltspflichten Hochrisiko",
        filename: "verstaerkte_sorgfaltspflichten",
      },
      {
        name: "Verdachtsmeldeverfahren",
        filename: "verdachtsmeldeverfahren",
      },
      {
        name: "Risikomanagement & interne Sicherung",
        filename: "risikomanagement",
      },
    ],
  },
  {
    title: "Straßenverkehrs-Ordnung",
    short: "StVO",
    eli: "eli/bund/bgbl-1/2013/s367/2025-01-01/1/deu",
    visOptions: [
      { name: "Vorfahrtsregeln-Prüfschema", filename: "vorfahrt" },
      {
        name: "Überholvorgang-Voraussetzungen",
        filename: "ueberholen",
      },
      { name: "Halten/Parken-Verbotsschema", filename: "halten_parken" },
      { name: "Verhalten bei Unfall", filename: "unfall" },
      { name: "Abbiegen an Kreuzungen", filename: "abbiegen" },
    ],
  },
  {
    title:
      "Verordnung über die Berechtigung zum Tragen der Uniform außerhalb eines Wehrdienstverhältnisses",
    short: "UnifV",
    eli: "eli/bund/bgbl-1/2008/s778/2019-08-09/1/deu",
    visOptions: [
      { name: "Genehmigungsvoraussetzungen", filename: "voraussetzungen" },
      { name: "Zuständigkeitsprüfung", filename: "zustaendigkeit" },
      { name: "Form und Dauer", filename: "form_und_dauer" },
      { name: "Widerrufsverfahren", filename: "widerruf" },
    ],
  },
  {
    title:
      "Gesetz über die Verweigerung des Kriegsdienstes mit der Waffe aus Gewissensgründen",
    short: "KDVG",
    eli: "eli/bund/bgbl-1/2003/s1593/2026-01-01/1/deu",
    visOptions: [
      { name: "Antragsverfahren", filename: "antragsverfahren" },
      { name: "Rechtsbehelfsverfahren", filename: "rechtsbehelfsverfahren" },
      {
        name: "Spannungs- und Verteidigungsfall",
        filename: "spannungs_verteidigungsfall",
      },
      { name: "Vorgezogener Antrag", filename: "vorgezogener_antrag" },
      {
        name: "Rechtsfolgen & Aktenführung",
        filename: "rechtsfolgen_aktenfuehrung",
      },
    ],
  },
  {
    title: "Solidaritätszuschlaggesetz",
    short: "SolZG",
    eli: "eli/bund/bgbl-1/1991/s1318/1992-02-29/1/deu",
    visOptions: [
      { name: "Abgabepflicht-Prüfung", filename: "abgabepflicht" },
      {
        name: "Bemessungsgrundlagen-Ermittlung",
        filename: "bemessungsgrundlage",
      },
      { name: "Tarifberechnung", filename: "tarifberechnung" },
      {
        name: "Anrechnung bei Doppelbesteuerung",
        filename: "doppelbesteuerung",
      },
    ],
  },
  {
    title:
      "Verordnung zur Erstellung einer Entgeltbescheinigung nach § 108 Absatz 3 Satz 1 der Gewerbeordnung",
    short: "EBV",
    eli: "eli/bund/bgbl-1/2012/s2712/2025-01-01/1/deu",
    visOptions: [
      {
        name: "Ausstellungspflicht Entgeltbescheinigung",
        filename: "ausstellungspflicht",
      },
      { name: "Berechnungskaskade Entgelt", filename: "berechnungskaskade" },
    ],
  },
  {
    title: "Gesetz zum Elterngeld und zur Elternzeit",
    short: "BEEG",
    eli: "eli/bund/bgbl-1/2006/s2748/2026-01-01/1/deu",
    visOptions: [
      {
        name: "Anspruchsvoraussetzungen Elterngeld",
        filename: "anspruchsvoraussetzungen",
      },
      {
        name: "Basiselterngeld, Plus & Bonus",
        filename: "basiselterngeld_plus_bonus",
      },
      {
        name: "Bezugsdauer & Partnermonate",
        filename: "bezugsdauer_partnermonate",
      },
      {
        name: "Elternzeit-Anmeldeverfahren",
        filename: "elternzeit_anmeldung",
      },
      {
        name: "Einkommensgrenzen & -anrechnung",
        filename: "einkommensgrenzen_anrechnung",
      },
    ],
  },
  {
    title: "Asylgesetz",
    short: "AsylG",
    eli: "eli/bund/bgbl-1/1992/s1126/2026-07-29/1/deu",
    visOptions: [
      { name: "Asylverfahren-Ablauf", filename: "asylverfahren_ablauf" },
      {
        name: "Unzulässigkeits-/Dublin-Prüfung",
        filename: "unzulaessigkeit_dublin",
      },
      {
        name: "Offensichtlich unbegründet & Klagefristen",
        filename: "offensichtlich_unbegruendet_klagefristen",
      },
      {
        name: "Sicherer Herkunfts-/Drittstaat",
        filename: "sicherer_herkunftsstaat_drittstaat",
      },
      { name: "Folgeantrag-Prüfung", filename: "folgeantrag" },
    ],
  },
  {
    title: "Gerichtskostengesetz",
    short: "GKG",
    eli: "eli/bund/bgbl-1/2004/s718/2026-01-01/1/deu",
    visOptions: [
      {
        name: "Fälligkeit der Gerichtsgebühren",
        filename: "faelligkeit_gebuehren",
      },
      {
        name: "Kostenvorschusspflicht-Prüfschema",
        filename: "kostenvorschusspflicht",
      },
      { name: "Streitwertfestsetzung", filename: "streitwertfestsetzung" },
      {
        name: "Ermäßigung bei vorzeitiger Erledigung",
        filename: "ermaessigung_vorzeitige_erledigung",
      },
      {
        name: "PKH-Auswirkung auf Kostenerhebung",
        filename: "pkh_kostenerhebung",
      },
    ],
  },
  {
    title: "Verordnung über das Unternehmensregister",
    short: "URV",
    eli: "eli/bund/bgbl-1/2007/s217/2024-10-11/1/deu",
    visOptions: [
      { name: "Registrierung der Nutzer", filename: "registrierung" },
      { name: "Identifikation der Nutzer", filename: "identifikation" },
      {
        name: "Datenübermittlung & Prüfung",
        filename: "datenuebermittlung_pruefung",
      },
      { name: "Einsichtnahme ins Register", filename: "einsichtnahme" },
      {
        name: "Aktualisierungsfristen Indexdaten",
        filename: "aktualisierungsfristen",
      },
    ],
  },
  {
    title: "Luftverkehrsgesetz",
    short: "LuftVG",
    eli: "eli/bund/banz-at/1922/s681/2026-07-29/1/deu",
    visOptions: [
      {
        name: "Betriebsgenehmigung Luftfahrtunternehmen",
        filename: "betriebsgenehmigung",
      },
      { name: "Haftung für Fluggastschäden", filename: "haftung_fluggast" },
      {
        name: "Schlichtungsverfahren Fluggastrechte",
        filename: "schlichtungsverfahren",
      },
      {
        name: "Register über Betreiber unbemannter Fluggeräte",
        filename: "register_drohnenbetreiber",
      },
      {
        name: "Ordnungswidrigkeiten beim Drohnenbetrieb",
        filename: "bussgeld_drohnenbetrieb",
      },
    ],
  },
  {
    title:
      "Gesetz über einen nationalen Zertifikatehandel für Brennstoffemissionen",
    short: "BEHG",
    eli: "eli/bund/bgbl-1/2019/s2728/2025-03-06/1/deu",
    visOptions: [
      { name: "Verantwortlicher-Bestimmung", filename: "verantwortlicher" },
      {
        name: "Emissionsberichterstattung & -abgabe",
        filename: "emissionsberichterstattung",
      },
      { name: "Preispfad Festpreis/Versteigerung", filename: "preispfad" },
      {
        name: "Carbon-Leakage-Kompensation",
        filename: "carbon_leakage",
      },
      { name: "Sanktionen bei Pflichtverletzung", filename: "sanktionen" },
    ],
  },
];
