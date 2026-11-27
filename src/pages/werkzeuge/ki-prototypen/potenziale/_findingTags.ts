import { DIGITALCHECK_PRINZIPIEN_URL } from "@/config/constants";
import { werkzeuge_digitaltauglichkeit_beispiele } from "@/config/routes";
import type { Finding } from "@/content.config";

interface TagMeta {
  title: string;
  subtitle?: string;
  badgeClass?: string;
  links?: { label: string; href: string }[];
}

// Pages under DIGITALCHECK_PRINZIPIEN_URL, one per principle group.
const PRINZIP_PAGES: Record<string, string> = {
  "1": "digitale-angebote-fuer-alle-nutzbar-gestalten",
  "2": "datenwiederverwendung-benoetigt-einheitliches-recht",
  "3": "etablierte-technologien-ermoeglichen-effiziente-umsetzung",
  "4": "automatisierung-basiert-auf-eindeutigen-regelungen",
  "5": "datenschutz-und-informationssicherheit-schaffen-vertrauen",
};

function prinzip(
  number: string,
  title: string,
  anchor: string,
): [string, TagMeta] {
  const group = number.split(".")[0];
  return [
    `Prinzip ${number}`,
    {
      title,
      badgeClass: `kern-badge--prinzip-${group}`,
      links: [
        {
          label: `Mehr zum Prinzip ${number}`,
          href: `${DIGITALCHECK_PRINZIPIEN_URL.url}/${PRINZIP_PAGES[group]}#${anchor}`,
        },
        {
          label: "Beispiele ansehen",
          href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-${group}`,
        },
      ],
    },
  ];
}

// Titles from digitalcheck.md Schritt 2 — keep in sync when that file changes.
const DIGITALCHECK_TAG_META: Record<string, TagMeta> = {
  ...Object.fromEntries([
    prinzip(
      "1.1",
      "Ermöglichen Sie digitale Kommunikation und Bearbeitung",
      "digitale-kommunikation",
    ),
    prinzip(
      "1.2",
      "Formulieren Sie die Regelung technologieoffen",
      "technologieoffenheit",
    ),
    prinzip(
      "1.3",
      "Denken Sie an Antragstellung, Bearbeitung und Bescheid",
      "antragsprozess-beachten",
    ),
    prinzip(
      "1.4",
      "Denken Sie Barrierefreiheit von Anfang an mit",
      "barrierefreiheit",
    ),
    prinzip(
      "1.5",
      "Stellen Sie eine nutzerfreundliche Umsetzung sicher",
      "nutzerfreundlichkeit",
    ),
    prinzip(
      "2.1",
      "Nutzen Sie harmonisierte Rechtsbegriffe",
      "harmonisierung-von-rechtsbegriffen",
    ),
    prinzip(
      "2.2",
      "Nutzen Sie existierende Daten",
      "existierende-daten-nachnutzen",
    ),
    prinzip(
      "2.3",
      "Machen Sie erhobene Daten für andere nutzbar",
      "datennachnutzung-erm-glichen",
    ),
    prinzip(
      "2.4",
      "Nutzen Sie bestehende technische Standards",
      "technische-standards-nutzen",
    ),
    prinzip(
      "2.5",
      "Suchen Sie frühzeitig den Austausch mit allen Beteiligten",
      "fr-hzeitigen-austausch-suchen",
    ),
    prinzip(
      "3.1",
      "Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen",
      "vorhandene-l-sungen",
    ),
    prinzip(
      "3.2",
      "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
      "open-source-software",
    ),
    prinzip(
      "4.1",
      "Berücksichtigen Sie bestehende Prozesse und Zuständigkeiten",
      "bestehende-prozesse",
    ),
    prinzip("4.2", "Bündeln Sie Aufgaben im Vollzug", "aufgabenb-ndelung"),
    prinzip("4.3", "Nutzen Sie Automatisierungspotenziale", "automatisierung"),
    prinzip(
      "4.4",
      "Unterscheiden Sie Regel, Ausnahme und Ermessen",
      "unterscheidungen",
    ),
    prinzip(
      "4.5",
      "Schreiben Sie einfach, eindeutig, konsistent",
      "schreibstil",
    ),
    prinzip("5.1", "Stellen Sie den Datenschutz sicher", "datenschutz"),
    prinzip(
      "5.2",
      "Stellen Sie die Informationssicherheit sicher",
      "informationssicherheit",
    ),
  ]),
  "EU-Interoperabilität": {
    title: "Zusatzmodul: EU-Interoperabilität",
    badgeClass: "kern-badge--tag",
  },
};

// Titles from buergercheck.md Schritt 2 — keep in sync when that file changes.
const BUERGERCHECK_TAG_META: Record<string, TagMeta> = {
  "Prinzip 1": {
    title: "Zielgruppen- und Adressatenanalyse",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 2": {
    title: "Handlungsfähigkeit gewährleisten",
    subtitle:
      "Gewährleisten, dass Zielgruppen die erforderlichen Handlungsfähigkeiten besitzen, um den Erfordernissen des Regelungsvorhabens nachzukommen",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 3": {
    title: "Lebenslagen berücksichtigen",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 4": {
    title: "Nutzerfreundliche Kontaktpunkte",
    subtitle:
      "Verbraucherinformationen und Kontaktpunkte zu den Bürgerinnen und Bürgern nutzerfreundlich, praxistauglich und wo möglich automatisiert gestalten",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 5": {
    title: "Einzelfallgerechtigkeit vs. Automatisierbarkeit",
    subtitle:
      "Trade-off zwischen Einzelfallgerechtigkeit und Inanspruchnahme / Automatisierbarkeit von Prozessen berücksichtigen",
    badgeClass: "kern-badge--tag",
  },
};

const PRAXISCHECK_TAG_META: Record<string, TagMeta> = {
  "Placeholder PC": {
    title: "Placeholder PC",
    badgeClass: "kern-badge--tag",
  },
};

const TAG_META_BY_TYPE: Record<Finding["type"], Record<string, TagMeta>> = {
  Digitalcheck: DIGITALCHECK_TAG_META,
  Bürgercheck: BUERGERCHECK_TAG_META,
  Praxischeck: PRAXISCHECK_TAG_META,
};

export function findingTagMeta(finding: Finding): TagMeta {
  return (
    TAG_META_BY_TYPE[finding.type][finding.tag] ?? {
      title: finding.tag,
      badgeClass: "kern-badge--tag",
    }
  );
}
