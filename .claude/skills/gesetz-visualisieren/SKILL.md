---
name: gesetz-visualisieren
description: Sucht ein Gesetz über die RIS-Search-API, identifiziert bis zu 5 Prozesse/Abläufe im Gesetzestext und erzeugt dafür Mermaid-Flowcharts, die als .mmd-Dateien im Visualisierungs-Tool (src/pages/werkzeuge/visualisieren) gespeichert werden. Trigger bei "Gesetz visualisieren", "Mermaid-Diagramm für Gesetz", "Prozessvisualisierung Gesetzestext".
---

# Gesetz visualisieren

Dieser Skill führt den Nutzer durch einen 4-stufigen Ablauf, um aus einem
Gesetzestext bis zu 5 Mermaid-Flowcharts zu erzeugen und in dieses Repo
einzupflegen (Tool unter `/werkzeuge/visualisieren`).

Ein optionales Argument kann bereits den Gesetznamen enthalten
(`$ARGUMENTS`). Wenn vorhanden, überspringe Schritt 1.

## Schritt 1 — Gesetzname abfragen

Frage den Nutzer nach dem Namen oder der Abkürzung des Gesetzes (z.B.
"Kündigungsschutzgesetz" oder "KSchG"), falls nicht schon als Argument
übergeben.

## Schritt 2 — Gesetzestext über die RIS-Search-API laden

Basis-URL: `https://testphase.rechtsinformationen.bund.de`
(OpenAPI-Spec zur Referenz:
https://raw.githubusercontent.com/digitalservicebund/ris-search/refs/heads/main/frontend/src/public/openapi.json)

1. Suche das Gesetz:
   `GET /v1/legislation?searchTerm={name}&size=10&pageIndex=0`
   (bei bekannter Abkürzung zusätzlich/alternativ `abbreviation={abk}`
   verwenden, das schränkt präziser ein).
2. Prüfe die Treffer in `member[]`. Vergleiche `name`, `abbreviation` und
   `alternateName` mit der Nutzereingabe. Bei mehreren plausiblen Treffern
   dem Nutzer die Kandidaten (Name + Abkürzung + Datum) zur Auswahl
   vorlegen — nicht raten.
3. Aus dem gewählten Treffer das `encoding[]`-Array auslesen und die
   HTML-Manifestation (Content-Type `text/html`, meist
   `.../regelungstext-1.html` oder `.../regelungstext-verkuendung-1.html`)
   per WebFetch/curl laden. Das ist der vollständige, konsolidierte
   Gesetzestext — er enthält bei jedem Absatz bereits eine Anker-ID
   (`id="art-zN_abs-zM"`), die in Schritt 4 zum Verlinken gebraucht wird.
   Außerdem den `legislationIdentifier` des Treffers notieren (den
   **ELI-Pfad**, z.B. `eli/bund/bgbl-1/1951/s499/2021-06-18/1/deu`).
4. Falls das Gesetz sehr lang ist (>~50 Paragraphen), zunächst nur das
   Inhaltsverzeichnis/die Paragraphenüberschriften sichten und gezielt die
   Abschnitte nachladen, die für Ablaufprüfungen relevant wirken (Fristen,
   Verfahren, Anspruchsvoraussetzungen, Anzeige-/Meldepflichten).

## Schritt 3 — Bis zu 5 visualisierbare Prozesse identifizieren

Gesucht sind Passagen mit klarer Ablauflogik: Fristenketten,
Anwendbarkeits-/Prüfschemata, Entscheidungsbäume mit Wenn-Dann-Verzweigungen,
Verfahrens-/Anzeigepflichten mit mehreren Akteuren, Ausnahmetatbestände.
Reine Definitionskataloge oder unstrukturierte Aufzählungen eignen sich
nicht.

Bereits vorhandene Beispiele in diesem Repo (als Referenz für den
Detailgrad, siehe `src/pages/werkzeuge/visualisieren/_data.ts`):

- KSchG: Anwendbarkeitsprüfung, Prüfschema "sozial ungerechtfertigt",
  Klagefristen-Kette, Sonderkündigungsschutz-Zeiträume, Anzeigeverfahren
  Massenentlassung
- HeizkostenV: Geltungsbereich, Kürzungsrecht, Kostenverteilung, Pflichten
  des Gebäudeeigentümers

Wähle bis zu 5 Prozesse (weniger ist ok, wenn das Gesetz nicht mehr
hergibt) und benenne jeden kurz und prägnant (2-4 Wörter, wie oben).

## Schritt 4 — Mermaid-Diagramme erstellen und speichern

Für jeden identifizierten Prozess ein `flowchart TD`-Diagramm erstellen.
Stilkonventionen (siehe existierende Dateien unter
`src/pages/werkzeuge/visualisieren/_data/{Abkuerzung}/*.mmd` für Beispiele):

- Knotenlabels in doppelten Anführungszeichen, Zeilenumbrüche mit `<br/>`
  (nicht `\n`), damit lange Texte lesbar bleiben.
- Jede inhaltliche Aussage mit Paragraphen-/Artikelverweis versehen
  (z.B. `— §4 S.4`), damit die Diagramme rechtlich nachvollziehbar bleiben.
- Entscheidungen als Raute `{"..."}`, Ja/Nein bzw. Fristablauf-Pfade als
  beschriftete Kanten (`-->|Ja|`, `-->|Nein|`).
- Terminale Endzustände farblich hervorheben:
  `style <Knoten> fill:#d4edda,stroke:#2d8a4a` (positiv/grün),
  `style <Knoten> fill:#f8d7da,stroke:#c0392b` (negativ/rot),
  `style <Knoten> fill:#fff3cd,stroke:#c9a227` (Zwischenschritt/gelb).
- Nur den Prozess selbst modellieren, keine Meta-Kommentare im Diagramm.
- Jeden Paragraphenverweis (nur den Verweis, nicht das ganze Knotenlabel)
  als Link auf die Norm setzen:
  `<a href='{{ELI}}#art-zN_abs-zM' target='_blank' rel='noopener'>§N M</a>`
  (Anker-ID aus dem in Schritt 2 geladenen HTML übernehmen, nicht raten).
  `{{ELI}}` ist ein Platzhalter, den die Wizard-Komponente zur Laufzeit
  auflöst — nicht die volle URL eintragen. Einfache statt doppelte
  Anführungszeichen im `<a>`-Tag verwenden, da das Knotenlabel selbst in
  doppelten Anführungszeichen steht. Bezieht sich ein Knoten auf mehrere
  Absätze oder nur pauschal auf den ganzen Paragraphen, stattdessen auf
  `{{ELI}}/art-zN` verlinken; Verweise auf andere Gesetze nicht verlinken.
  Das funktioniert nur bei `flowchart`- und `stateDiagram`-Diagrammen
  (HTML-Labels); bei `sequenceDiagram` und `gantt` gibt es dafür keine
  Entsprechung — dort Verweise unverlinkt lassen.

Speichern:

1. Lege pro Prozess eine Datei
   `src/pages/werkzeuge/visualisieren/_data/{Abkuerzung}/{slug}.mmd`
   an (`Abkuerzung` = amtliche Abkürzung des Gesetzes, z.B. `KSchG`;
   `slug` = kurzer, kebab-freier snake_case-Bezeichner ohne Abkürzungspräfix,
   z.B. `KSchG/klagefristen.mmd`). Nur den reinen Mermaid-Code
   hineinschreiben, keine Markdown-Codefences.
2. Ergänze `src/pages/werkzeuge/visualisieren/_data.ts`:
   - Falls das Gesetz dort noch keinen Eintrag hat, einen neuen
     `LawExample`-Eintrag mit `title` (offizieller Name ohne Abkürzung),
     `short` (Abkürzung, z.B. `"KSchG"`, identisch zum Ordnernamen aus
     Schritt 1), `eli` (ELI-Pfad aus Schritt 2, Pflichtfeld) und leerem
     `visOptions`-Array anlegen.
   - Für jeden Prozess ein `visOptions`-Objekt mit `name` (Prozessname aus
     Schritt 3) und `filename` (Dateiname der `.mmd`-Datei ohne
     Verzeichnis und Endung, z.B. `"klagefristen"`) hinzufügen.
3. Kurze Zusammenfassung an den Nutzer: welches Gesetz, welche Prozesse,
   wo gespeichert. Auf `/werkzeuge/visualisieren` im lokalen Dev-Server
   verweisen, um die Diagramme zu prüfen.

Nicht committen, es sei denn der Nutzer bittet explizit darum.
