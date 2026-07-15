/**
 * Mock dataset for the "Recht erkunden" prototype (staging-only).
 *
 * Flow, intent, and known divergences: see ./README.md
 *
 * Everything here is illustrative sample data for a single fully worked
 * example (SGB II). Real law names and citations are used for realism, but
 * the connections between them (evidence, quotes, scores, keywords) are
 * invented for demonstration purposes and are NOT legally verified.
 *
 * In a real pipeline, "verweisung" and the citation-based parts of
 * "gemeinsame_nennung" (plus the term-to-law links backing the "Begriffe im
 * Fokus" strip) would be derived via citation/reference extraction,
 * while "thematische_naehe" (and the Rechtsgebiete/norm clustering in step 2)
 * would be derived via NLP similarity methods (e.g. word2vec/embedding
 * similarity, TF-IDF, keyword extraction). Designing that pipeline is out of
 * scope for this prototype - the mock `nlp` fields only illustrate what such
 * a pipeline's output could look like in the UI.
 */

export type HierarchyLevel =
  | "grundgesetz"
  | "eu"
  | "bundesgesetz"
  | "bundesverordnung"
  | "landesrecht";

export type RelevanceReason =
  | "verweisung"
  | "thematische_naehe"
  | "gemeinsame_nennung"; // in Rechtsprechung und Literatur

export type SearchableLaw = {
  id: string;
  label: string;
  name: string;
  hasData: boolean;
};

export type Norm = {
  id: string;
  ref: string;
  title: string;
  summary: string;
  fullText: string;
  url: string;
};

export type LawArea = {
  id: string;
  label: string;
  description: string;
  normIds: string[];
};

/** A reference to a concrete provision or external source, with link + full text. */
export type SourceRef = {
  label: string;
  url?: string;
  fullText: string;
};

export type Evidence = {
  quote: string;
  /** Always present: the concrete provision in the adjacent law. */
  adjacentNorm: SourceRef;
  /** Only for "gemeinsame_nennung": the verdict/literature passage that explicitly cites both norms. */
  citedIn?: SourceRef & { kind: "rechtsprechung" | "literatur" };
};

/** Mock NLP signal - only ever present on "thematische_naehe" relations. */
export type NlpSignal = { similarity: number; keywords: string[] };

export type Relation = {
  id: string;
  lawId: string;
  lawLabel: string;
  lawName: string;
  level: HierarchyLevel;
  reason: RelevanceReason;
  /** Affected SGB II norms - drives live filtering as Step 3 norms are toggled. */
  normIds: string[];
  evidence: Evidence[];
  nlp?: NlpSignal;
};

/** First-class term entity powering the "Begriffe im Fokus" strip and term mode. */
export type Term = {
  id: string;
  term: string;
  definition: string;
  /** Provision where the term is legally defined (may be outside the explored law). */
  definedIn: SourceRef;
  usedIn: {
    normIds: string[];
    adjacentNorms: {
      lawLabel: string;
      level: HierarchyLevel;
      ref: SourceRef;
    }[];
  };
};

export const HIERARCHY_LEVELS: {
  id: HierarchyLevel;
  label: string;
  badgeClass: string;
}[] = [
  {
    id: "grundgesetz",
    label: "Grundgesetz",
    badgeClass: "bg-cosmic-blue-base text-white",
  },
  { id: "eu", label: "EU-Recht", badgeClass: "bg-indigo-600 text-white" },
  {
    id: "bundesgesetz",
    label: "Bundesgesetze",
    badgeClass: "bg-lavender-base text-cosmic-blue-base",
  },
  {
    id: "bundesverordnung",
    label: "Bundesverordnungen",
    badgeClass: "bg-lavender-200 text-cosmic-blue-base",
  },
  {
    id: "landesrecht",
    label: "Landesrecht",
    badgeClass: "bg-yellow-200 text-yellow-900",
  },
];

export const RELEVANCE_REASONS: {
  id: RelevanceReason;
  label: string;
  fullLabel?: string;
  hint?: string;
}[] = [
  {
    id: "verweisung",
    label: "Verweisung",
  },
  {
    id: "gemeinsame_nennung",
    label: "Rechtsprechung & Literatur",
    fullLabel: "Gemeinsame Nennung in Rechtsprechung und Literatur",
    hint: "Basiert auf expliziten Normzitaten in Urteilen und Fachliteratur.",
  },
  {
    id: "thematische_naehe",
    label: "Thematische Nähe",
    hint: "Ermittelt über Textähnlichkeit (z. B. Wortvektoren, TF-IDF), nicht über explizite Verweise.",
  },
];

export const SEARCHABLE_LAWS: SearchableLaw[] = [
  {
    id: "sgb2",
    label: "SGB II",
    name: "Sozialgesetzbuch Zweites Buch – Bürgergeld, Grundsicherung für Arbeitsuchende",
    hasData: true,
  },
  {
    id: "sgb3",
    label: "SGB III",
    name: "Sozialgesetzbuch Drittes Buch – Arbeitsförderung",
    hasData: false,
  },
  {
    id: "arbschg",
    label: "ArbSchG",
    name: "Arbeitsschutzgesetz",
    hasData: false,
  },
  {
    id: "bdsg",
    label: "BDSG",
    name: "Bundesdatenschutzgesetz",
    hasData: false,
  },
  {
    id: "sgb12",
    label: "SGB XII",
    name: "Sozialgesetzbuch Zwölftes Buch – Sozialhilfe",
    hasData: false,
  },
  {
    id: "gg",
    label: "GG",
    name: "Grundgesetz für die Bundesrepublik Deutschland",
    hasData: false,
  },
];

export const NORMS: Norm[] = [
  {
    id: "n-sgb2-7",
    ref: "§ 7 SGB II",
    title: "Leistungsberechtigte",
    summary:
      "Legt fest, wer erwerbsfähig, hilfebedürftig und leistungsberechtigt ist - und wer ausgeschlossen ist.",
    fullText:
      "Leistungen nach diesem Buch erhalten Personen, die das 15. Lebensjahr vollendet und die Altersgrenze nach § 7a noch nicht erreicht haben, erwerbsfähig und hilfebedürftig sind und ihren gewöhnlichen Aufenthalt in der Bundesrepublik Deutschland haben. Ausgenommen sind unter anderem Ausländerinnen und Ausländer, die kein Aufenthaltsrecht haben oder sich allein zur Arbeitsuche in Deutschland aufhalten.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__7.html",
  },
  {
    id: "n-sgb2-8",
    ref: "§ 8 SGB II",
    title: "Erwerbsfähigkeit",
    summary:
      "Definiert Erwerbsfähigkeit als Fähigkeit, unter den üblichen Bedingungen des Arbeitsmarkts mindestens drei Stunden täglich erwerbstätig zu sein.",
    fullText:
      "Erwerbsfähig ist, wer nicht wegen Krankheit oder Behinderung auf absehbare Zeit außerstande ist, unter den üblichen Bedingungen des allgemeinen Arbeitsmarkts mindestens drei Stunden täglich erwerbstätig zu sein.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__8.html",
  },
  {
    id: "n-sgb2-9",
    ref: "§ 9 SGB II",
    title: "Hilfebedürftigkeit",
    summary:
      "Regelt, wann jemand hilfebedürftig ist, und den Nachrang gegenüber Einkommen, Vermögen und vorrangigen Ansprüchen Dritter.",
    fullText:
      "Hilfebedürftig ist, wer seinen Lebensunterhalt nicht oder nicht ausreichend aus dem zu berücksichtigenden Einkommen oder Vermögen sichern kann und die erforderliche Hilfe nicht von anderen, insbesondere von Angehörigen oder von Trägern anderer Sozialleistungen, erhält.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__9.html",
  },
  {
    id: "n-sgb2-19",
    ref: "§ 19 SGB II",
    title: "Bürgergeld und Sozialgeld",
    summary:
      "Beschreibt die Zusammensetzung des Bürgergelds aus Regelbedarf, Mehrbedarfen sowie Bedarfen für Unterkunft und Heizung und die Anrechnung von Einkommen und Vermögen.",
    fullText:
      "Das Bürgergeld umfasst den maßgebenden Regelbedarf, Mehrbedarfe sowie Bedarfe für Unterkunft und Heizung. Bei nicht erwerbsfähigen Angehörigen der Bedarfsgemeinschaft wird Sozialgeld in entsprechender Höhe erbracht. Der Bedarf mindert sich um das zu berücksichtigende Einkommen und Vermögen der Bedarfsgemeinschaft in einer festgelegten Reihenfolge.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__19.html",
  },
  {
    id: "n-sgb2-20",
    ref: "§ 20 SGB II",
    title: "Regelbedarf zur Sicherung des Lebensunterhalts",
    summary:
      "Bestimmt die Höhe des Regelbedarfs und verweist auf die Regelbedarfsstufen und deren Fortschreibung.",
    fullText:
      "Der Regelbedarf zur Sicherung des Lebensunterhalts umfasst insbesondere Ernährung, Kleidung, Körperpflege, Hausrat, Haushaltsenergie sowie persönliche Bedürfnisse des täglichen Lebens. Die Höhe richtet sich nach den Regelbedarfsstufen der Anlage zu § 28.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__20.html",
  },
  {
    id: "n-sgb2-14",
    ref: "§ 14 SGB II",
    title: "Grundsatz des Forderns und Förderns",
    summary:
      "Beschreibt das Zusammenspiel aus Eingliederungsleistungen und Mitwirkungspflichten der Leistungsberechtigten.",
    fullText:
      "Die Grundsicherung für Arbeitsuchende soll den Leistungsberechtigten ermöglichen, ein Leben unabhängig von der Grundsicherung zu führen. Die Träger unterstützen Leistungsberechtigte umfassend mit dem Ziel der Eingliederung in Arbeit; im Gegenzug wirken Leistungsberechtigte aktiv an der Eingliederung mit.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__14.html",
  },
  {
    id: "n-sgb2-16",
    ref: "§ 16 SGB II",
    title: "Leistungen zur Eingliederung in Arbeit",
    summary:
      "Verweist für Eingliederungsleistungen weitgehend auf die entsprechenden Instrumente des SGB III.",
    fullText:
      "Zur Eingliederung in Arbeit können die Träger die Leistungen nach § 16a bis 16j sowie entsprechend die Leistungen der aktiven Arbeitsförderung nach dem Dritten Buch erbringen, soweit dieses Buch nichts Abweichendes regelt.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__16.html",
  },
  {
    id: "n-sgb2-16i",
    ref: "§ 16i SGB II",
    title: "Teilhabe am Arbeitsmarkt",
    summary:
      "Regelt den Lohnkostenzuschuss für besonders arbeitsmarktferne Leistungsberechtigte.",
    fullText:
      "Arbeitgeber können für die Beschäftigung besonders arbeitsmarktferner, langzeitarbeitsloser Leistungsberechtigter einen Zuschuss zum Arbeitsentgelt erhalten, der im ersten und zweiten Jahr 100 Prozent und danach schrittweise sinkend gewährt wird.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__16i.html",
  },
  {
    id: "n-sgb2-22",
    ref: "§ 22 SGB II",
    title: "Bedarfe für Unterkunft und Heizung",
    summary:
      "Regelt die Übernahme angemessener Kosten der Unterkunft und Heizung sowie Kostensenkungsverfahren.",
    fullText:
      "Bedarfe für Unterkunft und Heizung werden in Höhe der tatsächlichen Aufwendungen anerkannt, soweit diese angemessen sind. Übersteigen die Aufwendungen die Angemessenheitsgrenze, sind sie in der Regel nur so lange zu berücksichtigen, wie es der leistungsberechtigten Person nicht möglich oder nicht zumutbar ist, die Aufwendungen zu senken.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__22.html",
  },
  {
    id: "n-sgb2-31",
    ref: "§ 31 SGB II",
    title: "Pflichtverletzungen",
    summary:
      "Definiert die Pflichtverletzungen, die zu einer Minderung des Bürgergelds führen können.",
    fullText:
      "Leistungsberechtigte verletzen ihre Pflichten, wenn sie sich trotz Belehrung über die Rechtsfolgen weigern, den Pflichten aus einem Kooperationsplan nachzukommen, insbesondere zumutbare Arbeit, Ausbildung oder Maßnahmen zur Eingliederung in Arbeit aufzunehmen oder fortzuführen.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__31.html",
  },
  {
    id: "n-sgb2-31a",
    ref: "§ 31a SGB II",
    title: "Rechtsfolgen bei Pflichtverletzungen",
    summary:
      "Legt die gestaffelte Minderung des Bürgergelds bei wiederholten Pflichtverletzungen fest.",
    fullText:
      "Bei einer Pflichtverletzung nach § 31 mindert sich das Bürgergeld in einer ersten Stufe um 10 Prozent des maßgebenden Regelbedarfs, bei wiederholter Pflichtverletzung innerhalb eines Jahres um weitere 20 Prozent; die Minderung darf zusammen mit einer Minderung wegen Meldeversäumnissen 30 Prozent des maßgebenden Regelbedarfs nicht übersteigen.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__31a.html",
  },
  {
    id: "n-sgb2-31b",
    ref: "§ 31b SGB II",
    title: "Beginn und Dauer der Minderung",
    summary:
      "Regelt, ab wann eine Minderung wirksam wird und wie lange sie andauert.",
    fullText:
      "Die Minderung des Bürgergelds tritt mit Wirkung des Kalendermonats ein, der auf das Wirksamwerden des Verwaltungsakts folgt, der die Pflichtverletzung feststellt, und dauert einen Zeitraum von einem Monat.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__31b.html",
  },
  {
    id: "n-sgb2-32",
    ref: "§ 32 SGB II",
    title: "Meldeversäumnisse",
    summary:
      "Regelt die Minderung des Bürgergelds bei unentschuldigtem Nichterscheinen zu Terminen.",
    fullText:
      "Kommt eine leistungsberechtigte Person trotz Belehrung über die Rechtsfolgen einer Aufforderung des Trägers, sich zu melden oder bei einem Arzt oder Psychologen zu einer Untersuchung zu erscheinen, nicht nach, mindert sich das Bürgergeld um 10 Prozent des maßgebenden Regelbedarfs.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__32.html",
  },
  {
    id: "n-sgb2-50",
    ref: "§ 50 SGB II",
    title: "Datenerhebung, -verarbeitung und -nutzung",
    summary:
      "Regelt die Grundlagen der Sozialdatenverarbeitung durch die Träger der Grundsicherung.",
    fullText:
      "Die Träger der Leistungen nach diesem Buch dürfen Sozialdaten erheben, verarbeiten und nutzen, soweit dies zur Erfüllung ihrer Aufgaben nach diesem Buch erforderlich ist; im Übrigen gelten die Vorschriften des Zehnten Buches über den Sozialdatenschutz.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__50.html",
  },
  {
    id: "n-sgb2-51b",
    ref: "§ 51b SGB II",
    title: "Automatisierter Datenabgleich",
    summary:
      "Ermächtigt zum automatisierten Abgleich von Daten mit anderen Trägern zur Aufdeckung von Leistungsmissbrauch.",
    fullText:
      "Die Träger sind berechtigt, personenbezogene Daten mit den Datenbeständen anderer Träger und Stellen automatisiert abzugleichen, soweit dies zur Feststellung von Voraussetzungen für den Leistungsanspruch erforderlich ist.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__51b.html",
  },
  {
    id: "n-sgb2-52",
    ref: "§ 52 SGB II",
    title: "Weitergehende Datenerhebung und -übermittlung",
    summary:
      "Regelt ergänzende Mitteilungspflichten anderer Stellen gegenüber den Trägern der Grundsicherung.",
    fullText:
      "Träger der Rentenversicherung, Familienkassen und weitere Stellen übermitteln den Trägern der Grundsicherung für Arbeitsuchende auf Anforderung die für die Feststellung der Leistungsvoraussetzungen erforderlichen Daten.",
    url: "https://www.gesetze-im-internet.de/sgb_2/__52.html",
  },
];

export const LAW_AREAS: LawArea[] = [
  {
    id: "area-lebensunterhalt",
    label: "Leistungen zur Sicherung des Lebensunterhalts (Bürgergeld)",
    description:
      "Wer ist leistungsberechtigt, was gehört zum Bürgergeld, wie wird der Regelbedarf bemessen und wie werden Einkommen und Vermögen berücksichtigt?",
    normIds: ["n-sgb2-7", "n-sgb2-8", "n-sgb2-9", "n-sgb2-19", "n-sgb2-20"],
  },
  {
    id: "area-eingliederung",
    label: "Eingliederung in Arbeit",
    description:
      "Fördern und Fordern: Eingliederungsleistungen, Zusammenspiel mit der Arbeitsförderung und Teilhabe am Arbeitsmarkt.",
    normIds: ["n-sgb2-14", "n-sgb2-16", "n-sgb2-16i"],
  },
  {
    id: "area-kdu",
    label: "Kosten der Unterkunft und Heizung",
    description:
      "Übernahme angemessener Wohnkosten sowie Kostensenkungsverfahren bei unangemessenen Aufwendungen.",
    normIds: ["n-sgb2-22"],
  },
  {
    id: "area-sanktionen",
    label: "Leistungsminderungen (Sanktionen)",
    description:
      "Pflichtverletzungen, Meldeversäumnisse und die daraus folgenden Minderungen des Bürgergelds.",
    normIds: ["n-sgb2-31", "n-sgb2-31a", "n-sgb2-31b", "n-sgb2-32"],
  },
  {
    id: "area-verfahren",
    label: "Verfahren, Datenschutz und Datenübermittlung",
    description:
      "Erhebung, Verarbeitung und automatisierter Abgleich von Sozialdaten durch die Träger.",
    normIds: ["n-sgb2-50", "n-sgb2-51b", "n-sgb2-52"],
  },
];

export const TERMS: Term[] = [
  {
    id: "term-bedarfsgemeinschaft",
    term: "Bedarfsgemeinschaft",
    definition:
      "Kreis der Personen, deren Einkommen und Vermögen bei der Prüfung der Hilfebedürftigkeit gemeinsam berücksichtigt wird (u. a. Partner, im Haushalt lebende Kinder).",
    definedIn: {
      label: "§ 7 Abs. 3 SGB II",
      url: "https://www.gesetze-im-internet.de/sgb_2/__7.html",
      fullText:
        "Zur Bedarfsgemeinschaft gehören die erwerbsfähige leistungsberechtigte Person, die im Haushalt lebenden Eltern eines unverheirateten erwerbsfähigen Kindes, das das 25. Lebensjahr noch nicht vollendet hat, als Partnerin oder Partner der erwerbsfähigen leistungsberechtigten Person die Person, die mit dieser in einem gemeinsamen Haushalt zusammenlebt, sowie die dem Haushalt angehörenden unverheirateten Kinder.",
    },
    usedIn: {
      normIds: ["n-sgb2-7", "n-sgb2-9", "n-sgb2-19", "n-sgb2-22"],
      adjacentNorms: [
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 19 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__19.html",
            fullText:
              "Hilfe zum Lebensunterhalt ist Personen zu leisten, die ihren notwendigen Lebensunterhalt nicht oder nicht ausreichend aus eigenen Kräften und Mitteln bestreiten können.",
          },
        },
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 20 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__20.html",
            fullText:
              "Leben Ehegatten oder Lebenspartner nicht getrennt, ist bei der Ermittlung des Bedarfs eines Ehegatten oder Lebenspartners auch das Einkommen und Vermögen des anderen Ehegatten oder Lebenspartners zu berücksichtigen.",
          },
        },
        {
          lawLabel: "Wohngeldgesetz (WoGG)",
          level: "bundesgesetz",
          ref: {
            label: "§ 5 WoGG",
            url: "https://www.gesetze-im-internet.de/wogg/__5.html",
            fullText:
              "Zum Haushalt zählen die wohngeldberechtigte Person sowie die zu berücksichtigenden Familienmitglieder, die mit ihr in einer Wohnung wohnen.",
          },
        },
        {
          lawLabel: "Bundeskindergeldgesetz (BKGG)",
          level: "bundesgesetz",
          ref: {
            label: "§ 6a BKGG",
            url: "https://www.gesetze-im-internet.de/bkgg_1996/__6a.html",
            fullText:
              "Der Kinderzuschlag wird für im Haushalt lebende unverheiratete Kinder gezahlt, soweit dadurch Hilfebedürftigkeit im Sinne des Zweiten Buches Sozialgesetzbuch vermieden wird.",
          },
        },
      ],
    },
  },
  {
    id: "term-erwerbsfaehigkeit",
    term: "Erwerbsfähigkeit",
    definition:
      "Fähigkeit, unter den üblichen Bedingungen des allgemeinen Arbeitsmarkts mindestens drei Stunden täglich erwerbstätig zu sein - zentrale Zugangsvoraussetzung zum SGB II.",
    definedIn: {
      label: "§ 8 SGB II",
      url: "https://www.gesetze-im-internet.de/sgb_2/__8.html",
      fullText:
        "Erwerbsfähig ist, wer nicht wegen Krankheit oder Behinderung auf absehbare Zeit außerstande ist, unter den üblichen Bedingungen des allgemeinen Arbeitsmarkts mindestens drei Stunden täglich erwerbstätig zu sein.",
    },
    usedIn: {
      normIds: ["n-sgb2-7", "n-sgb2-8"],
      adjacentNorms: [
        {
          lawLabel: "SGB VI",
          level: "bundesgesetz",
          ref: {
            label: "§ 43 SGB VI",
            url: "https://www.gesetze-im-internet.de/sgb_6/__43.html",
            fullText:
              "Anspruch auf Rente wegen teilweiser Erwerbsminderung haben Versicherte, die teilweise erwerbsgemindert sind, in den letzten fünf Jahren vor Eintritt der Erwerbsminderung drei Jahre Pflichtbeiträge haben und die Wartezeit erfüllt haben.",
          },
        },
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 41 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__41.html",
            fullText:
              "Grundsicherung im Alter und bei Erwerbsminderung erhalten Personen, die dauerhaft voll erwerbsgemindert sind und damit nicht dem Personenkreis des SGB II unterfallen.",
          },
        },
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 43 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__43.html",
            fullText:
              "Einkommen und Vermögen der leistungsberechtigten Person und ihres nicht getrennt lebenden Ehegatten oder Lebenspartners sind bei der Grundsicherung im Alter und bei Erwerbsminderung zu berücksichtigen.",
          },
        },
      ],
    },
  },
  {
    id: "term-regelbedarf",
    term: "Regelbedarf",
    definition:
      "Der pauschalierte Betrag zur Deckung des laufenden Lebensunterhalts, gestaffelt nach Regelbedarfsstufen.",
    definedIn: {
      label: "§ 20 SGB II",
      url: "https://www.gesetze-im-internet.de/sgb_2/__20.html",
      fullText:
        "Der Regelbedarf zur Sicherung des Lebensunterhalts umfasst insbesondere Ernährung, Kleidung, Körperpflege, Hausrat, Haushaltsenergie sowie persönliche Bedürfnisse des täglichen Lebens.",
    },
    usedIn: {
      normIds: ["n-sgb2-19", "n-sgb2-20"],
      adjacentNorms: [
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 27a SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__27a.html",
            fullText:
              "Die Regelsätze werden auf der Grundlage der Ergebnisse der Einkommens- und Verbrauchsstichprobe unter Berücksichtigung der Regelbedarfsstufen ermittelt.",
          },
        },
        {
          lawLabel: "Regelbedarfsermittlungsgesetz (RBEG)",
          level: "bundesgesetz",
          ref: {
            label: "§ 2 RBEG",
            url: "https://www.gesetze-im-internet.de/rbeg/__2.html",
            fullText:
              "Die Höhe der Regelbedarfsstufen wird auf der Grundlage der Sonderauswertung der Einkommens- und Verbrauchsstichprobe fortgeschrieben.",
          },
        },
      ],
    },
  },
  {
    id: "term-einkommen",
    term: "Einkommen",
    definition:
      "Als Einkommen sind grundsätzlich alle Einnahmen in Geld zu berücksichtigen, vermindert um Absetzbeträge (§ 11b) und um nicht anrechenbare Einnahmen (§ 11a). Der Begriff bestimmt, in welchem Umfang eigene Mittel den Bürgergeld-Anspruch mindern.",
    definedIn: {
      label: "§ 11 SGB II",
      url: "https://www.gesetze-im-internet.de/sgb_2/__11.html",
      fullText:
        "Als Einkommen zu berücksichtigen sind Einnahmen in Geld abzüglich der nach § 11b abzusetzenden Beträge mit Ausnahme der in § 11a genannten Einnahmen. Nicht als Einkommen gelten insbesondere Leistungen nach diesem Buch sowie bestimmte zweckbestimmte Einnahmen.",
    },
    usedIn: {
      normIds: ["n-sgb2-9", "n-sgb2-19"],
      adjacentNorms: [
        {
          lawLabel: "Bürgergeld-V",
          level: "bundesverordnung",
          ref: {
            label: "§ 1 Bürgergeld-V",
            url: "https://www.gesetze-im-internet.de/alg_ii-v_2008/__1.html",
            fullText:
              "Die Verordnung konkretisiert, welche Einnahmen als Einkommen im Sinne des § 11 des Zweiten Buches Sozialgesetzbuch zu berücksichtigen sind und wie sie zu berechnen sind.",
          },
        },
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 82 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__82.html",
            fullText:
              "Zum Einkommen gehören alle Einkünfte in Geld oder Geldeswert mit Ausnahme der Leistungen nach diesem Buch, der Grundrente nach dem Bundesversorgungsgesetz und bestimmter zweckbestimmter Leistungen.",
          },
        },
        {
          lawLabel: "EStG",
          level: "bundesgesetz",
          ref: {
            label: "§ 2 EStG",
            url: "https://www.gesetze-im-internet.de/estg/__2.html",
            fullText:
              "Der Einkommensteuer unterliegen die dort abschließend aufgezählten Einkunftsarten; das Einkommen ist der Gesamtbetrag der Einkünfte nach Abzug der gesetzlich vorgesehenen Beträge. Der steuerrechtliche Einkommensbegriff weicht vom sozialrechtlichen ab.",
          },
        },
      ],
    },
  },
  {
    id: "term-vermoegen",
    term: "Vermögen",
    definition:
      "Als Vermögen sind alle verwertbaren Vermögensgegenstände zu berücksichtigen. Nicht berücksichtigt werden Schonvermögen und - in der Karenzzeit - Vermögen unterhalb erheblicher Grenzen.",
    definedIn: {
      label: "§ 12 SGB II",
      url: "https://www.gesetze-im-internet.de/sgb_2/__12.html",
      fullText:
        "Als Vermögen sind alle verwertbaren Vermögensgegenstände zu berücksichtigen. In der Karenzzeit von einem Jahr wird Vermögen nur berücksichtigt, wenn es erheblich ist; daneben bleiben bestimmte Vermögensgegenstände als Schonvermögen unberücksichtigt.",
    },
    usedIn: {
      normIds: ["n-sgb2-9", "n-sgb2-19"],
      adjacentNorms: [
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 90 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__90.html",
            fullText:
              "Einzusetzen ist das gesamte verwertbare Vermögen. Die Sozialhilfe darf nicht abhängig gemacht werden vom Einsatz oder von der Verwertung eines angemessenen Hausgrundstücks sowie weiterer geschützter Vermögensgegenstände.",
          },
        },
        {
          lawLabel: "Bürgergeld-V",
          level: "bundesverordnung",
          ref: {
            label: "§ 12 Bürgergeld-V",
            url: "https://www.gesetze-im-internet.de/alg_ii-v_2008/",
            fullText:
              "Die Verordnung enthält ergänzende Regelungen zur Berücksichtigung und Bewertung von Vermögen im Sinne des § 12 des Zweiten Buches Sozialgesetzbuch.",
          },
        },
      ],
    },
  },
  {
    id: "term-angemessenheit-unterkunft",
    term: "Angemessenheit der Unterkunft",
    definition:
      "Unbestimmter Rechtsbegriff, der die Obergrenze für die Übernahme von Wohnkosten anhand von Wohnungsgröße und örtlichem Mietniveau bestimmt.",
    definedIn: {
      label: "§ 22 SGB II",
      url: "https://www.gesetze-im-internet.de/sgb_2/__22.html",
      fullText:
        "Bedarfe für Unterkunft und Heizung werden in Höhe der tatsächlichen Aufwendungen anerkannt, soweit diese angemessen sind.",
    },
    usedIn: {
      normIds: ["n-sgb2-22"],
      adjacentNorms: [
        {
          lawLabel: "SGB XII",
          level: "bundesgesetz",
          ref: {
            label: "§ 35 SGB XII",
            url: "https://www.gesetze-im-internet.de/sgb_12/__35.html",
            fullText:
              "Bedarfe für Unterkunft und Heizung werden in Höhe der tatsächlichen Aufwendungen anerkannt, soweit diese angemessen sind; entspricht die Größe oder Ausstattung der Wohnung nicht den Verhältnissen, sind Bemühungen zur Kostensenkung zu verlangen.",
          },
        },
        {
          lawLabel: "Wohngeldgesetz (WoGG)",
          level: "bundesgesetz",
          ref: {
            label: "§ 12 WoGG",
            url: "https://www.gesetze-im-internet.de/wogg/__12.html",
            fullText:
              "Die Miete wird bis zur Höhe des Höchstbetrags berücksichtigt, der sich nach der Anzahl der zu berücksichtigenden Haushaltsmitglieder und der Mietenstufe der Gemeinde richtet.",
          },
        },
      ],
    },
  },
  {
    id: "term-mitwirkungspflicht",
    term: "Mitwirkungspflicht",
    definition:
      "Allgemeine Pflicht von Antragstellenden und Leistungsberechtigten, an der Aufklärung des Sachverhalts mitzuwirken; ihre Verletzung im SGB-II-Kontext kann eine Pflichtverletzung nach § 31 begründen.",
    definedIn: {
      label: "§ 60 SGB I",
      url: "https://www.gesetze-im-internet.de/sgb_1/__60.html",
      fullText:
        "Wer Sozialleistungen beantragt oder erhält, hat alle Tatsachen anzugeben, die für die Leistung erheblich sind, und auf Verlangen des zuständigen Leistungsträgers der Erteilung der erforderlichen Auskünfte durch Dritte zuzustimmen.",
    },
    usedIn: {
      normIds: ["n-sgb2-31"],
      adjacentNorms: [
        {
          lawLabel: "SGB I",
          level: "bundesgesetz",
          ref: {
            label: "§ 60 SGB I",
            url: "https://www.gesetze-im-internet.de/sgb_1/__60.html",
            fullText:
              "Wer Sozialleistungen beantragt oder erhält, hat alle Tatsachen anzugeben, die für die Leistung erheblich sind, und auf Verlangen der Erteilung der erforderlichen Auskünfte durch Dritte zuzustimmen.",
          },
        },
        {
          lawLabel: "SGB I",
          level: "bundesgesetz",
          ref: {
            label: "§ 66 SGB I",
            url: "https://www.gesetze-im-internet.de/sgb_1/__66.html",
            fullText:
              "Kommt derjenige, der eine Sozialleistung beantragt oder erhält, seinen Mitwirkungspflichten nach den §§ 60 bis 62, 65 nicht nach, kann der Leistungsträger die Leistung ohne weitere Ermittlungen bis zur Nachholung der Mitwirkung versagen oder entziehen.",
          },
        },
      ],
    },
  },
];

export const RELATIONS: Relation[] = [
  {
    id: "rel-gg-existenzminimum",
    lawId: "gg",
    lawLabel: "GG",
    lawName: "Grundgesetz für die Bundesrepublik Deutschland",
    level: "grundgesetz",
    reason: "gemeinsame_nennung",
    normIds: ["n-sgb2-9", "n-sgb2-19", "n-sgb2-20"],
    evidence: [
      {
        quote:
          "Das BVerfG leitet aus Art. 1 Abs. 1 i. V. m. Art. 20 Abs. 1 GG einen Anspruch auf ein menschenwürdiges Existenzminimum ab, der die Regelbedarfsbemessung nach § 20 SGB II und die Bestimmung der Hilfebedürftigkeit verfassungsrechtlich einhegt.",
        adjacentNorm: {
          label: "Art. 1 Abs. 1, Art. 20 Abs. 1 GG",
          url: "https://www.gesetze-im-internet.de/gg/art_1.html",
          fullText:
            "Art. 1 Abs. 1: Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt. Art. 20 Abs. 1: Die Bundesrepublik Deutschland ist ein demokratischer und sozialer Bundesstaat.",
        },
        citedIn: {
          kind: "rechtsprechung",
          label:
            "BVerfG, Urteil v. 09.02.2010 – 1 BvL 1/09, 1 BvL 3/09, 1 BvL 4/09",
          url: "https://www.bundesverfassungsgericht.de/SharedDocs/Entscheidungen/DE/2010/02/ls20100209_1bvl000109.html",
          fullText:
            "Der Gesetzgeber muss die Regelbedarfe nachvollziehbar auf Grundlage tragfähiger empirischer Daten und schlüssiger Berechnungsverfahren ermitteln, um dem Grundrecht auf Gewährleistung eines menschenwürdigen Existenzminimums zu genügen.",
        },
      },
    ],
  },
  {
    id: "rel-gg-sanktionen",
    lawId: "gg",
    lawLabel: "GG",
    lawName: "Grundgesetz für die Bundesrepublik Deutschland",
    level: "grundgesetz",
    reason: "gemeinsame_nennung",
    normIds: ["n-sgb2-31", "n-sgb2-31a", "n-sgb2-31b"],
    evidence: [
      {
        quote:
          "Im Sanktionenurteil verknüpft das BVerfG die Regelungen zu Leistungsminderungen (§§ 31 ff. SGB II) unmittelbar mit dem grundrechtlich geschützten Existenzminimum.",
        adjacentNorm: {
          label: "Art. 1 Abs. 1, Art. 20 Abs. 1 GG",
          url: "https://www.gesetze-im-internet.de/gg/art_1.html",
          fullText:
            "Art. 1 Abs. 1: Die Würde des Menschen ist unantastbar. Art. 20 Abs. 1: Die Bundesrepublik Deutschland ist ein demokratischer und sozialer Bundesstaat.",
        },
        citedIn: {
          kind: "rechtsprechung",
          label: "BVerfG, Urteil v. 05.11.2019 – 1 BvL 7/16",
          url: "https://www.bundesverfassungsgericht.de/SharedDocs/Entscheidungen/DE/2019/11/ls20191105_1bvl000716.html",
          fullText:
            "Vollständige Leistungsminderungen ohne Rücksicht auf den Einzelfall sind mit dem Grundrecht auf Gewährleistung eines menschenwürdigen Existenzminimums nicht vereinbar, wenn sie über einen Zeitraum von mehr als drei Monaten hinaus ausnahmslos angewendet werden.",
        },
      },
    ],
  },
  {
    id: "rel-eu-vo883",
    lawId: "vo-883-2004",
    lawLabel: "VO (EG) 883/2004",
    lawName:
      "Verordnung (EG) Nr. 883/2004 zur Koordinierung der Systeme der sozialen Sicherheit",
    level: "eu",
    reason: "thematische_naehe",
    normIds: ["n-sgb2-7", "n-sgb2-9"],
    nlp: {
      similarity: 0.81,
      keywords: [
        "soziale Sicherheit",
        "Leistungsansprüche",
        "Aufenthaltsstatus",
      ],
    },
    evidence: [
      {
        quote:
          "Die Verordnung regelt grenzüberschreitende Ansprüche auf Sozialleistungen und überschneidet sich thematisch mit den Leistungsvoraussetzungen des § 7 SGB II für Unionsbürgerinnen und Unionsbürger.",
        adjacentNorm: {
          label: "Art. 4, Art. 70 VO (EG) 883/2004",
          url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32004R0883",
          fullText:
            "Art. 4: Personen, für die diese Verordnung gilt, haben die gleichen Rechte und Pflichten aufgrund der Rechtsvorschriften eines Mitgliedstaats wie die Staatsangehörigen dieses Staats. Art. 70: Sonderregelung für beitragsunabhängige Geldleistungen.",
        },
      },
    ],
  },
  {
    id: "rel-eu-rl2004-38",
    lawId: "rl-2004-38",
    lawLabel: "RL 2004/38/EG",
    lawName:
      "Richtlinie 2004/38/EG über das Recht der Unionsbürger und ihrer Familienangehörigen auf Freizügigkeit",
    level: "eu",
    reason: "verweisung",
    normIds: ["n-sgb2-7"],
    evidence: [
      {
        quote:
          "§ 7 Abs. 1 SGB II nimmt für den Leistungsausschluss bestimmter Unionsbürgerinnen und Unionsbürger auf das unionsrechtliche Aufenthaltsrecht Bezug.",
        adjacentNorm: {
          label: "Art. 6, Art. 14 RL 2004/38/EG",
          url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32004L0038",
          fullText:
            "Art. 6: Unionsbürgern steht das Recht auf Aufenthalt im Hoheitsgebiet eines anderen Mitgliedstaats für bis zu drei Monate zu. Art. 14: Das Aufenthaltsrecht bleibt bestehen, solange die Unionsbürger die Voraussetzungen erfüllen und die Sozialhilfe des Aufnahmemitgliedstaats nicht unangemessen in Anspruch nehmen.",
        },
      },
    ],
  },
  {
    id: "rel-eu-eugh",
    lawId: "vo-883-2004",
    lawLabel: "VO (EG) 883/2004",
    lawName:
      "Verordnung (EG) Nr. 883/2004 zur Koordinierung der Systeme der sozialen Sicherheit",
    level: "eu",
    reason: "gemeinsame_nennung",
    normIds: ["n-sgb2-7", "n-sgb2-9"],
    evidence: [
      {
        quote:
          "Der EuGH prüft den Leistungsausschluss nicht erwerbstätiger Unionsbürgerinnen und Unionsbürger nach § 7 Abs. 1 SGB II gemeinsam mit Art. 4 VO (EG) 883/2004 und der Freizügigkeitsrichtlinie und hält ihn für unionsrechtskonform.",
        adjacentNorm: {
          label: "Art. 4, Art. 70 VO (EG) 883/2004",
          url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32004R0883",
          fullText:
            "Art. 4: Gleichbehandlungsgrundsatz. Art. 70: besondere beitragsunabhängige Geldleistungen, die zugleich Merkmale der Sozialhilfe tragen und daher im Wohnmitgliedstaat beschränkt werden dürfen.",
        },
        citedIn: {
          kind: "rechtsprechung",
          label: "EuGH, Urteil v. 11.11.2014 – C-333/13 (Dano)",
          url: "https://curia.europa.eu/juris/liste.jsf?num=C-333/13",
          fullText:
            "Ein Mitgliedstaat darf nicht erwerbstätige Unionsbürger, die allein zur Erlangung von Sozialhilfe von der Freizügigkeit Gebrauch machen und kein Aufenthaltsrecht nach der Richtlinie 2004/38/EG besitzen, von beitragsunabhängigen Geldleistungen ausschließen.",
        },
      },
      {
        quote:
          "In der Rechtssache Alimanovic hat der EuGH auf Vorlage des BSG bestätigt, dass der Ausschluss arbeitsuchender Unionsbürger von SGB-II-Leistungen ohne Einzelfall-Verhältnismäßigkeitsprüfung zulässig ist.",
        adjacentNorm: {
          label: "Art. 4 VO (EG) 883/2004 i. V. m. Art. 24 RL 2004/38/EG",
          url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32004R0883",
          fullText:
            "Art. 24 Abs. 2 RL 2004/38/EG erlaubt es, Personen in der Phase der Arbeitsuche einen Anspruch auf Sozialhilfe zu versagen; das abgestufte System der Richtlinie berücksichtigt die individuellen Umstände bereits typisierend.",
        },
        citedIn: {
          kind: "rechtsprechung",
          label: "EuGH, Urteil v. 15.09.2015 – C-67/14 (Alimanovic)",
          url: "https://curia.europa.eu/juris/liste.jsf?num=C-67/14",
          fullText:
            "Das Unionsrecht steht einer Regelung nicht entgegen, nach der Staatsangehörige anderer Mitgliedstaaten in der Situation der Arbeitsuche von bestimmten besonderen beitragsunabhängigen Geldleistungen ausgeschlossen werden, während eigene Staatsangehörige in gleicher Lage diese Leistungen erhalten.",
        },
      },
    ],
  },
  {
    id: "rel-sgb3-verweis",
    lawId: "sgb3",
    lawLabel: "SGB III",
    lawName: "Sozialgesetzbuch Drittes Buch – Arbeitsförderung",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-16", "n-sgb2-16i"],
    evidence: [
      {
        quote:
          "§ 16 SGB II verweist für zahlreiche Eingliederungsleistungen auf die entsprechenden Vorschriften des SGB III.",
        adjacentNorm: {
          label: "§ 35, § 45 SGB III",
          url: "https://www.gesetze-im-internet.de/sgb_3/__35.html",
          fullText:
            "§ 35: Die Agentur für Arbeit unterstützt Ausbildungsuchende, Arbeitsuchende und Arbeitgeber bei der Anbahnung von Ausbildungs- und Arbeitsverhältnissen. § 45: Förderung von Maßnahmen bei einem Träger zur Aktivierung und beruflichen Eingliederung.",
        },
      },
    ],
  },
  {
    id: "rel-sgb3-rechtsprechung",
    lawId: "sgb3",
    lawLabel: "SGB III",
    lawName: "Sozialgesetzbuch Drittes Buch – Arbeitsförderung",
    level: "bundesgesetz",
    reason: "gemeinsame_nennung",
    normIds: ["n-sgb2-16"],
    evidence: [
      {
        quote:
          "Das BSG hat in mehreren Entscheidungen die Abgrenzung von Eingliederungsleistungen nach § 16 SGB II und Förderleistungen nach dem SGB III konkretisiert.",
        adjacentNorm: {
          label: "§ 45 SGB III",
          url: "https://www.gesetze-im-internet.de/sgb_3/__45.html",
          fullText:
            "Förderung von Maßnahmen bei einem Träger zur Aktivierung und beruflichen Eingliederung, insbesondere zur Heranführung an den Ausbildungs- und Arbeitsmarkt.",
        },
        citedIn: {
          kind: "rechtsprechung",
          label: "BSG, Urteil v. 06.04.2011 – B 4 AS 3/10 R",
          url: "#",
          fullText:
            "Das BSG stellt klar, dass ergänzende Eingliederungsleistungen nach § 16 SGB II die Fördermöglichkeiten des SGB III nicht verdrängen, sondern ergänzen, soweit dieses Buch keine abweichende Regelung trifft.",
        },
      },
    ],
  },
  {
    id: "rel-sgb10",
    lawId: "sgb10",
    lawLabel: "SGB X",
    lawName:
      "Sozialgesetzbuch Zehntes Buch – Sozialverwaltungsverfahren und Sozialdatenschutz",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-50", "n-sgb2-51b"],
    evidence: [
      {
        quote:
          "§ 50 SGB II verweist für die Datenverarbeitung im Übrigen auf die Vorschriften des Sozialdatenschutzes im SGB X.",
        adjacentNorm: {
          label: "§ 67 ff. SGB X",
          url: "https://www.gesetze-im-internet.de/sgb_10/__67.html",
          fullText:
            "Die Verarbeitung von Sozialdaten ist nur zulässig, soweit dieses oder ein anderes Gesetz sie erlaubt oder anordnet oder die betroffene Person eingewilligt hat.",
        },
      },
    ],
  },
  {
    id: "rel-sgb12-thema",
    lawId: "sgb12",
    lawLabel: "SGB XII",
    lawName: "Sozialgesetzbuch Zwölftes Buch – Sozialhilfe",
    level: "bundesgesetz",
    reason: "thematische_naehe",
    normIds: ["n-sgb2-20", "n-sgb2-22"],
    nlp: {
      similarity: 0.88,
      keywords: ["Regelbedarf", "Existenzsicherung", "Unterkunft und Heizung"],
    },
    evidence: [
      {
        quote:
          "Die Regelbedarfsstufen und die Bemessung der Kosten der Unterkunft folgen im SGB XII derselben Methodik wie im SGB II.",
        adjacentNorm: {
          label: "§ 27a, § 35 SGB XII",
          url: "https://www.gesetze-im-internet.de/sgb_12/__27a.html",
          fullText:
            "§ 27a: Die Regelsätze werden auf der Grundlage der Ergebnisse der Einkommens- und Verbrauchsstichprobe ermittelt. § 35: Bedarfe für Unterkunft und Heizung werden in Höhe der tatsächlichen Aufwendungen anerkannt, soweit diese angemessen sind.",
        },
      },
    ],
  },
  {
    id: "rel-sgb12-literatur",
    lawId: "sgb12",
    lawLabel: "SGB XII",
    lawName: "Sozialgesetzbuch Zwölftes Buch – Sozialhilfe",
    level: "bundesgesetz",
    reason: "gemeinsame_nennung",
    normIds: ["n-sgb2-31", "n-sgb2-31a"],
    evidence: [
      {
        quote:
          "In der sozialrechtlichen Kommentarliteratur werden die Leistungsminderungen des SGB II regelmäßig den Kürzungstatbeständen der Sozialhilfe gegenübergestellt.",
        adjacentNorm: {
          label: "§ 39a SGB XII",
          url: "https://www.gesetze-im-internet.de/sgb_12/__39a.html",
          fullText:
            "Bei Pflichtverletzungen nach § 26 kann der Regelsatz gemindert werden, soweit dies nach den Umständen des Einzelfalls angemessen ist.",
        },
        citedIn: {
          kind: "literatur",
          label: "Löns/Herold-Tews, SGB II, Kommentar, § 31a Rn. 12",
          url: "#",
          fullText:
            "Die Kommentierung stellt die Voraussetzungen und Grenzen der Leistungsminderung nach § 31a SGB II den vergleichbaren Kürzungsregelungen des SGB XII gegenüber und verweist auf die einschränkende Wirkung der Rechtsprechung des Bundesverfassungsgerichts.",
        },
      },
    ],
  },
  {
    id: "rel-wogg",
    lawId: "wogg",
    lawLabel: "WoGG",
    lawName: "Wohngeldgesetz",
    level: "bundesgesetz",
    reason: "thematische_naehe",
    normIds: ["n-sgb2-22"],
    nlp: {
      similarity: 0.74,
      keywords: ["Unterkunftskosten", "Angemessenheit", "Mietstufe"],
    },
    evidence: [
      {
        quote:
          "Das Wohngeldgesetz verwendet für die Angemessenheit der Wohnkosten ein vergleichbares Mietstufen-System wie die kommunalen KdU-Richtlinien nach § 22 SGB II.",
        adjacentNorm: {
          label: "§ 12 WoGG",
          url: "https://www.gesetze-im-internet.de/wogg/__12.html",
          fullText:
            "Die Miete wird bis zur Höhe des Höchstbetrags berücksichtigt, der sich nach der Anzahl der zu berücksichtigenden Haushaltsmitglieder und der Mietenstufe der Gemeinde richtet.",
        },
      },
    ],
  },
  {
    id: "rel-bkgg",
    lawId: "bkgg",
    lawLabel: "BKGG",
    lawName: "Bundeskindergeldgesetz",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-19"],
    evidence: [
      {
        quote:
          "§ 6a BKGG (Kinderzuschlag) verweist zur Vermeidung von SGB-II-Hilfebedürftigkeit ausdrücklich auf die Bedarfsberechnung nach § 19 SGB II.",
        adjacentNorm: {
          label: "§ 6a BKGG",
          url: "https://www.gesetze-im-internet.de/bkgg_1996/__6a.html",
          fullText:
            "Kinderzuschlag wird für im Haushalt lebende unverheiratete Kinder zur Vermeidung von Hilfebedürftigkeit im Sinne des Zweiten Buches Sozialgesetzbuch geleistet.",
        },
      },
    ],
  },
  {
    id: "rel-asylblg",
    lawId: "asylblg",
    lawLabel: "AsylbLG",
    lawName: "Asylbewerberleistungsgesetz",
    level: "bundesgesetz",
    reason: "thematische_naehe",
    normIds: ["n-sgb2-7"],
    nlp: {
      similarity: 0.69,
      keywords: [
        "Existenzsicherung",
        "Leistungsausschluss",
        "Aufenthaltsstatus",
      ],
    },
    evidence: [
      {
        quote:
          "Für Personen ohne Leistungsanspruch nach § 7 SGB II regelt das AsylbLG ein eigenständiges, ähnlich strukturiertes Existenzsicherungssystem.",
        adjacentNorm: {
          label: "§ 1, § 3 AsylbLG",
          url: "https://www.gesetze-im-internet.de/asylblg/__1.html",
          fullText:
            "§ 1: Leistungsberechtigt nach diesem Gesetz sind Ausländerinnen und Ausländer, die sich tatsächlich im Bundesgebiet aufhalten und über keinen gesicherten Aufenthaltsstatus verfügen. § 3: Grundleistungen zur Deckung des Bedarfs an Ernährung, Unterkunft, Heizung, Kleidung, Gesundheitspflege und Gebrauchsgütern des Haushalts.",
        },
      },
    ],
  },
  {
    id: "rel-bgb",
    lawId: "bgb",
    lawLabel: "BGB",
    lawName: "Bürgerliches Gesetzbuch",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-9"],
    evidence: [
      {
        quote:
          "Der Nachranggrundsatz des § 9 SGB II tritt hinter vorrangig zu realisierende Unterhaltsansprüche nach dem Unterhaltsrecht des BGB zurück.",
        adjacentNorm: {
          label: "§ 1601 ff. BGB",
          url: "https://www.gesetze-im-internet.de/bgb/__1601.html",
          fullText:
            "Verwandte in gerader Linie sind verpflichtet, einander Unterhalt zu gewähren.",
        },
      },
    ],
  },
  {
    id: "rel-buergergeld-v",
    lawId: "buergergeld-v",
    lawLabel: "Bürgergeld-V",
    lawName:
      "Verordnung zur Berechnung von Einkommen sowie zur Nichtberücksichtigung von Einkommen und Vermögen beim Bürgergeld (Bürgergeld-Verordnung)",
    level: "bundesverordnung",
    reason: "verweisung",
    normIds: ["n-sgb2-9", "n-sgb2-19", "n-sgb2-20"],
    evidence: [
      {
        quote:
          "§ 13 SGB II ermächtigt zum Erlass der Bürgergeld-Verordnung, die die Berechnung des zu berücksichtigenden Einkommens für die Bedarfsdeckung nach §§ 9, 19, 20 SGB II konkretisiert.",
        adjacentNorm: {
          label: "§ 1, § 6 Bürgergeld-V",
          url: "https://www.gesetze-im-internet.de/alg_ii-v_2008/",
          fullText:
            "§ 1: Zu berücksichtigendes Einkommen im Sinne des § 11 des Zweiten Buches Sozialgesetzbuch. § 6: Vom Einkommen sind Steuern, Sozialversicherungsbeiträge sowie geförderte Altersvorsorgebeiträge abzusetzen.",
        },
      },
    ],
  },
  {
    id: "rel-landessatzung-kdu",
    lawId: "landessatzung-kdu",
    lawLabel: "Kommunale Satzung (§ 22a SGB II)",
    lawName:
      "Satzung zur Bestimmung angemessener Unterkunftskosten nach § 22a SGB II (Beispiel eines Landes-/Kommunalrechts)",
    level: "landesrecht",
    reason: "verweisung",
    normIds: ["n-sgb2-22"],
    evidence: [
      {
        quote:
          "§ 22a SGB II ermächtigt die Länder, die Träger der Grundsicherung zu ermächtigen, die Angemessenheit der Unterkunftskosten per Satzung zu konkretisieren.",
        adjacentNorm: {
          label: "§ 22a, § 22b SGB II i. V. m. kommunaler Satzung",
          url: "https://www.gesetze-im-internet.de/sgb_2/__22a.html",
          fullText:
            "Die Länder können die Träger der Grundsicherung für Arbeitsuchende durch Gesetz ermächtigen, durch Satzung zu bestimmen, in welcher Höhe Bedarfe nach § 22 Absatz 1 angemessen sind.",
        },
      },
    ],
  },
  {
    id: "rel-rbeg",
    lawId: "rbeg",
    lawLabel: "RBEG",
    lawName: "Regelbedarfs-Ermittlungsgesetz",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-20"],
    evidence: [
      {
        quote:
          "§ 20 Abs. 1a SGB II verweist für die Höhe der Regelbedarfsstufen ausdrücklich auf § 28 SGB XII in Verbindung mit dem Regelbedarfs-Ermittlungsgesetz.",
        adjacentNorm: {
          label: "§ 8 RBEG",
          url: "https://www.gesetze-im-internet.de/rbeg_2021/__8.html",
          fullText:
            "Die Regelbedarfsstufen werden auf Grundlage der Sonderauswertung der Einkommens- und Verbrauchsstichprobe ermittelt und der Höhe nach für die einzelnen Stufen festgesetzt.",
        },
      },
    ],
  },
  {
    id: "rel-aufenthg",
    lawId: "aufenthg",
    lawLabel: "AufenthG",
    lawName: "Aufenthaltsgesetz",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-7"],
    evidence: [
      {
        quote:
          "§ 7 Abs. 1 SGB II knüpft die Leistungsberechtigung an ein Aufenthaltsrecht und nimmt damit auf die aufenthaltsrechtlichen Titel des Aufenthaltsgesetzes Bezug.",
        adjacentNorm: {
          label: "§ 4, § 7 AufenthG",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__4.html",
          fullText:
            "§ 4: Ausländer bedürfen für die Einreise und den Aufenthalt eines Aufenthaltstitels, soweit nicht anders bestimmt. § 7: Die Aufenthaltserlaubnis ist ein befristeter Aufenthaltstitel, der zu einem bestimmten Aufenthaltszweck erteilt wird.",
        },
      },
    ],
  },
  {
    id: "rel-bafoeg",
    lawId: "bafoeg",
    lawLabel: "BAföG",
    lawName: "Bundesausbildungsförderungsgesetz",
    level: "bundesgesetz",
    reason: "verweisung",
    normIds: ["n-sgb2-7"],
    evidence: [
      {
        quote:
          "§ 7 Abs. 5 SGB II schließt Auszubildende, deren Ausbildung dem Grunde nach nach dem BAföG förderfähig ist, grundsätzlich von Leistungen zur Sicherung des Lebensunterhalts aus.",
        adjacentNorm: {
          label: "§ 2 BAföG",
          url: "https://www.gesetze-im-internet.de/baf_g/__2.html",
          fullText:
            "Ausbildungsförderung wird für den Besuch der dort genannten Ausbildungsstätten geleistet; die Förderfähigkeit dem Grunde nach richtet sich nach der Art der Ausbildungsstätte.",
        },
      },
    ],
  },
  {
    id: "rel-sgb6-erwerbsminderung",
    lawId: "sgb6",
    lawLabel: "SGB VI",
    lawName: "Sozialgesetzbuch Sechstes Buch – Gesetzliche Rentenversicherung",
    level: "bundesgesetz",
    reason: "thematische_naehe",
    normIds: ["n-sgb2-8"],
    nlp: {
      similarity: 0.79,
      keywords: ["Erwerbsfähigkeit", "Erwerbsminderung", "drei Stunden"],
    },
    evidence: [
      {
        quote:
          "Die Erwerbsfähigkeit nach § 8 SGB II grenzt sich anhand derselben Zeitschwelle von der Erwerbsminderung nach dem Rentenrecht ab; wer voll erwerbsgemindert ist, fällt aus dem SGB II heraus.",
        adjacentNorm: {
          label: "§ 43 SGB VI",
          url: "https://www.gesetze-im-internet.de/sgb_6/__43.html",
          fullText:
            "Voll erwerbsgemindert sind Versicherte, die außerstande sind, unter den üblichen Bedingungen des allgemeinen Arbeitsmarkts mindestens drei Stunden täglich erwerbstätig zu sein.",
        },
      },
    ],
  },
  {
    id: "rel-sgb12-lebensunterhalt-lit",
    lawId: "sgb12",
    lawLabel: "SGB XII",
    lawName: "Sozialgesetzbuch Zwölftes Buch – Sozialhilfe",
    level: "bundesgesetz",
    reason: "gemeinsame_nennung",
    normIds: ["n-sgb2-9", "n-sgb2-20"],
    evidence: [
      {
        quote:
          "Rechtsprechung und Kommentarliteratur ziehen für die Auslegung von Hilfebedürftigkeit und Regelbedarf regelmäßig die parallelen Vorschriften der Sozialhilfe heran, da beide Systeme dasselbe Existenzminimum konkretisieren.",
        adjacentNorm: {
          label: "§ 27a SGB XII",
          url: "https://www.gesetze-im-internet.de/sgb_12/__27a.html",
          fullText:
            "Der notwendige Lebensunterhalt umfasst den dort beschriebenen Bedarf; die Regelsätze werden auf Grundlage der Einkommens- und Verbrauchsstichprobe ermittelt und decken sich methodisch mit dem Regelbedarf des SGB II.",
        },
        citedIn: {
          kind: "rechtsprechung",
          label: "BSG, Urteil v. 17.02.2016 – B 4 AS 24/14 R",
          url: "https://www.juraforum.de/urteile/bsg/bsg-urteil-vom-17-02-2016-az-b-4-as-24-14-r",
          fullText:
            "Das BSG stellt klar, dass Unionsbürger ohne materielles Aufenthaltsrecht zwar von SGB-II-Leistungen ausgeschlossen sein können, unter Umständen aber existenzsichernde Leistungen der Sozialhilfe nach dem SGB XII in Betracht kommen.",
        },
      },
    ],
  },
  {
    id: "rel-rbsfv",
    lawId: "rbsfv",
    lawLabel: "RBSFV",
    lawName: "Regelbedarfsstufen-Fortschreibungsverordnung",
    level: "bundesverordnung",
    reason: "verweisung",
    normIds: ["n-sgb2-20"],
    evidence: [
      {
        quote:
          "In Jahren ohne Neuermittlung stellt § 20 Abs. 1a SGB II für die Höhe des Regelbedarfs auf die jeweils geltende Regelbedarfsstufen-Fortschreibungsverordnung ab.",
        adjacentNorm: {
          label: "§ 1 RBSFV",
          url: "https://www.gesetze-im-internet.de/rbsfv_2024/__1.html",
          fullText:
            "Die Regelbedarfsstufen nach der Anlage zu § 28 SGB XII werden zum 1. Januar des Folgejahres mit dem maßgeblichen Fortschreibungssatz angepasst; ein Besitzschutz verhindert ein Absinken unter den Vorjahreswert.",
        },
      },
    ],
  },
  {
    id: "rel-landesblindengeld",
    lawId: "landesblindengeld",
    lawLabel: "Landesblindengeld (Beispiel)",
    lawName:
      "Landesblindengeldgesetz (Beispiel eines Landesrechts mit Nachteilsausgleich)",
    level: "landesrecht",
    reason: "thematische_naehe",
    normIds: ["n-sgb2-19"],
    nlp: {
      similarity: 0.63,
      keywords: [
        "Nachteilsausgleich",
        "Einkommensanrechnung",
        "existenzsichernde Leistung",
      ],
    },
    evidence: [
      {
        quote:
          "Landesrechtliche Nachteilsausgleiche wie das Blindengeld überschneiden sich thematisch mit dem Bürgergeld, weil sie als zweckbestimmte Leistungen bei der Einkommensanrechnung nach § 19 SGB II gesondert zu bewerten sind.",
        adjacentNorm: {
          label: "§ 2 Landesblindengeldgesetz (Beispiel)",
          url: "#",
          fullText:
            "Blinde Menschen erhalten zum Ausgleich der blindheitsbedingten Mehraufwendungen ein monatliches Blindengeld; die Leistung ist einkommens- und vermögensunabhängig ausgestaltet.",
        },
      },
    ],
  },
];
