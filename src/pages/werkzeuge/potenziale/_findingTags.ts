import type { Finding } from "@/content.config";

// Titles from digitalcheck.md Schritt 2 — keep in sync when that file changes.
const DIGITALCHECK_TAG_TITLES: Record<string, string> = {
  "Prinzip 1.1": "Ermöglichen Sie digitale Kommunikation und Bearbeitung",
  "Prinzip 1.2": "Formulieren Sie die Regelung technologieoffen",
  "Prinzip 1.3": "Denken Sie an Antragstellung, Bearbeitung und Bescheid",
  "Prinzip 1.4": "Denken Sie Barrierefreiheit von Anfang an mit",
  "Prinzip 1.5": "Stellen Sie eine nutzerfreundliche Umsetzung sicher",
  "Prinzip 2.1": "Nutzen Sie harmonisierte Rechtsbegriffe",
  "Prinzip 2.2": "Nutzen Sie existierende Daten",
  "Prinzip 2.3": "Machen Sie erhobene Daten für andere nutzbar",
  "Prinzip 2.4": "Nutzen Sie bestehende technische Standards",
  "Prinzip 2.5": "Suchen Sie frühzeitig den Austausch mit allen Beteiligten",
  "Prinzip 3.1":
    "Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen",
  "Prinzip 3.2":
    "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
  "Prinzip 4.1": "Berücksichtigen Sie bestehende Prozesse und Zuständigkeiten",
  "Prinzip 4.2": "Bündeln Sie Aufgaben im Vollzug",
  "Prinzip 4.3": "Nutzen Sie Automatisierungspotenziale",
  "Prinzip 4.4": "Unterscheiden Sie Regel, Ausnahme und Ermessen",
  "Prinzip 4.5": "Schreiben Sie einfach, eindeutig, konsistent",
  "Prinzip 5.1": "Stellen Sie den Datenschutz sicher",
  "Prinzip 5.2": "Stellen Sie die Informationssicherheit sicher",
  "EU-Interoperabilität": "Zusatzmodul: EU-Interoperabilität",
};

export function findingTagMeta(tag: Finding["tag"]) {
  const principleMatch = /^Prinzip (\d)\./.exec(tag);
  return {
    title: DIGITALCHECK_TAG_TITLES[tag] ?? tag,
    badgeClass: principleMatch
      ? `kern-badge--prinzip-${principleMatch[1]}`
      : "kern-badge--tag",
  };
}
