import { werkzeuge_digitaltauglichkeit_beispiele } from "@/config/routes";
import type { Finding } from "@/content.config";

interface TagMeta {
  title: string;
  subtitle?: string;
  badgeClass?: string;
  links?: { label: string; href: string }[];
}

// Titles from digitalcheck.md Schritt 2 — keep in sync when that file changes.
const DIGITALCHECK_TAG_META: Record<string, TagMeta> = {
  "Prinzip 1.1": {
    title: "Ermöglichen Sie digitale Kommunikation und Bearbeitung",
    badgeClass: "kern-badge--prinzip-1",
    links: [
      {
        label: "Mehr zum Prinzip 1.1",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten#digitale-kommunikation",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-1`,
      },
    ],
  },
  "Prinzip 1.2": {
    title: "Formulieren Sie die Regelung technologieoffen",
    badgeClass: "kern-badge--prinzip-1",
    links: [
      {
        label: "Mehr zum Prinzip 1.2",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten#technologieoffenheit",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-1`,
      },
    ],
  },
  "Prinzip 1.3": {
    title: "Denken Sie an Antragstellung, Bearbeitung und Bescheid",
    badgeClass: "kern-badge--prinzip-1",
    links: [
      {
        label: "Mehr zum Prinzip 1.3",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten#antragsprozess-beachten",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-1`,
      },
    ],
  },
  "Prinzip 1.4": {
    title: "Denken Sie Barrierefreiheit von Anfang an mit",
    badgeClass: "kern-badge--prinzip-1",
    links: [
      {
        label: "Mehr zum Prinzip 1.4",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten#barrierefreiheit",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-1`,
      },
    ],
  },
  "Prinzip 1.5": {
    title: "Stellen Sie eine nutzerfreundliche Umsetzung sicher",
    badgeClass: "kern-badge--prinzip-1",
    links: [
      {
        label: "Mehr zum Prinzip 1.5",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten#nutzerfreundlichkeit",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-1`,
      },
    ],
  },
  "Prinzip 2.1": {
    title: "Nutzen Sie harmonisierte Rechtsbegriffe",
    badgeClass: "kern-badge--prinzip-2",
    links: [
      {
        label: "Mehr zum Prinzip 2.1",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht#harmonisierung-von-rechtsbegriffen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-2`,
      },
    ],
  },
  "Prinzip 2.2": {
    title: "Nutzen Sie existierende Daten",
    badgeClass: "kern-badge--prinzip-2",
    links: [
      {
        label: "Mehr zum Prinzip 2.2",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht#existierende-daten-nachnutzen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-2`,
      },
    ],
  },
  "Prinzip 2.3": {
    title: "Machen Sie erhobene Daten für andere nutzbar",
    badgeClass: "kern-badge--prinzip-2",
    links: [
      {
        label: "Mehr zum Prinzip 2.3",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht#datennachnutzung-erm-glichen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-2`,
      },
    ],
  },
  "Prinzip 2.4": {
    title: "Nutzen Sie bestehende technische Standards",
    badgeClass: "kern-badge--prinzip-2",
    links: [
      {
        label: "Mehr zum Prinzip 2.4",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht#technische-standards-nutzen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-2`,
      },
    ],
  },
  "Prinzip 2.5": {
    title: "Suchen Sie frühzeitig den Austausch mit allen Beteiligten",
    badgeClass: "kern-badge--prinzip-2",
    links: [
      {
        label: "Mehr zum Prinzip 2.5",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht#fr-hzeitigen-austausch-suchen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-2`,
      },
    ],
  },
  "Prinzip 3.1": {
    title: "Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen",
    badgeClass: "kern-badge--prinzip-3",
    links: [
      {
        label: "Mehr zum Prinzip 3.1",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/etablierte-technologien-ermoeglichen-effiziente-umsetzung#vorhandene-l-sungen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-3`,
      },
    ],
  },
  "Prinzip 3.2": {
    title: "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
    badgeClass: "kern-badge--prinzip-3",
    links: [
      {
        label: "Mehr zum Prinzip 3.2",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/etablierte-technologien-ermoeglichen-effiziente-umsetzung#open-source-software",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-3`,
      },
    ],
  },
  "Prinzip 4.1": {
    title: "Berücksichtigen Sie bestehende Prozesse und Zuständigkeiten",
    badgeClass: "kern-badge--prinzip-4",
    links: [
      {
        label: "Mehr zum Prinzip 4.1",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen#bestehende-prozesse",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-4`,
      },
    ],
  },
  "Prinzip 4.2": {
    title: "Bündeln Sie Aufgaben im Vollzug",
    badgeClass: "kern-badge--prinzip-4",
    links: [
      {
        label: "Mehr zum Prinzip 4.2",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen#aufgabenb-ndelung",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-4`,
      },
    ],
  },
  "Prinzip 4.3": {
    title: "Nutzen Sie Automatisierungspotenziale",
    badgeClass: "kern-badge--prinzip-4",
    links: [
      {
        label: "Mehr zum Prinzip 4.3",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen#automatisierung",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-4`,
      },
    ],
  },
  "Prinzip 4.4": {
    title: "Unterscheiden Sie Regel, Ausnahme und Ermessen",
    badgeClass: "kern-badge--prinzip-4",
    links: [
      {
        label: "Mehr zum Prinzip 4.4",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen#unterscheidungen",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-4`,
      },
    ],
  },
  "Prinzip 4.5": {
    title: "Schreiben Sie einfach, eindeutig, konsistent",
    badgeClass: "kern-badge--prinzip-4",
    links: [
      {
        label: "Mehr zum Prinzip 4.5",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen#schreibstil",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-4`,
      },
    ],
  },
  "Prinzip 5.1": {
    title: "Stellen Sie den Datenschutz sicher",
    badgeClass: "kern-badge--prinzip-5",
    links: [
      {
        label: "Mehr zum Prinzip 5.1",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenschutz-und-informationssicherheit-schaffen-vertrauen#datenschutz",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-5`,
      },
    ],
  },
  "Prinzip 5.2": {
    title: "Stellen Sie die Informationssicherheit sicher",
    badgeClass: "kern-badge--prinzip-5",
    links: [
      {
        label: "Mehr zum Prinzip 5.2",
        href: "https://digitalcheck.bund.de/methoden/fuenf-prinzipien/datenschutz-und-informationssicherheit-schaffen-vertrauen#informationssicherheit",
      },
      {
        label: "Beispiele ansehen",
        href: `${werkzeuge_digitaltauglichkeit_beispiele.path}#prinzip-5`,
      },
    ],
  },
  "EU-Interoperabilität": {
    title: "Zusatzmodul: EU-Interoperabilität",
    badgeClass: "kern-badge--tag",
  },
};

// Titles from buergercheck.md Schritt 2 — keep in sync when that file changes.
const BUERGERCHECK_TAG_META: Record<string, TagMeta> = {
  "Prinzip 1": {
    title: "Strukturierte Zielgruppen-/Adressatenanalyse sicherstellen",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 2": {
    title: "Handlungsfähigkeit der Zielgruppen sicherstellen",
    subtitle:
      "Gewährleisten, dass Zielgruppen die erforderlichen Handlungsfähigkeiten besitzen, um den Erfordernissen des Regelungsvorhabens nachzukommen",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 3": {
    title: "Lebenslagen der Bürgerinnen und Bürger berücksichtigen",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 4": {
    title: "Verbraucherinformationen nutzerfreundlich gestalten",
    subtitle:
      "Verbraucherinformationen und Kontaktpunkte zu den Bürgerinnen und Bürgern nutzerfreundlich, praxistauglich und wo möglich automatisiert gestalten",
    badgeClass: "kern-badge--tag",
  },
  "Prinzip 5": {
    title: "Einzelfallgerechtigkeit und Automatisierbarkeit abwägen",
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
