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
https://docs.rechtsinformationen.bund.de/v3/api-docs)

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
Detailgrad, siehe `src/pages/werkzeuge/visualisieren/_data/*.yaml`):

- KSchG: Anwendbarkeitsprüfung, Prüfschema "sozial ungerechtfertigt",
  Klagefristen-Kette, Sonderkündigungsschutz-Zeiträume, Anzeigeverfahren
  Massenentlassung
- HeizkostenV: Geltungsbereich, Kürzungsrecht, Kostenverteilung, Pflichten
  des Gebäudeeigentümers

Wähle bis zu 5 Prozesse (weniger ist ok, wenn das Gesetz nicht mehr
hergibt) und benenne jeden kurz und prägnant (2-4 Wörter, wie oben).

## Schritt 4 — Mermaid-Diagramme erstellen und speichern

Für jeden identifizierten Prozess ein `flowchart TD`-Diagramm erstellen.
Jede `.mmd`-Datei beginnt mit einem Frontmatter-Block (Repo-Konvention, keine
Mermaid-Syntax — wird von `_mmdFrontmatter.ts` vor dem Rendern entfernt) mit
einem `summary`-Feld: 1-2 Sätze, die den visualisierten Prozess beschreiben
(erscheint im Wizard unter den Auswahl-Chips). Format:

```
---
summary: "Kurze Zusammenfassung des Diagramms in ein bis zwei Sätzen."
---
flowchart TD
    ...
```

Der Summary-Text muss auf einer einzigen Zeile stehen (keine `<br/>` oder
echte Zeilenumbrüche), in doppelten Anführungszeichen; enthaltene `"` als
`\"` und `\` als `\\` escapen.

Stilkonventionen für das Diagramm selbst (siehe existierende Dateien unter
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
   z.B. `KSchG/klagefristen.mmd`). Frontmatter-Block (siehe oben) gefolgt
   vom reinen Mermaid-Code hineinschreiben, keine Markdown-Codefences.
   Für `Abkuerzung` nur eine offizielle oder in der Praxis gebräuchliche
   Abkürzung verwenden (z.B. aus dem `abbreviation`-Feld der RIS-Trefferliste
   aus Schritt 2, aus dem Gesetzestext selbst oder einer verbreiteten
   Fundstelle) — niemals eine neue Abkürzung erfinden (z.B. durch
   Kombinieren von Fragmenten wie einem englischen Akronym mit "VO"). Gibt
   es keine gebräuchliche deutsche Abkürzung (z.B. bei neueren EU-Verordnungen),
   die im Ausland/EU-Kontext gebräuchliche Abkürzung verwenden (z.B. `ELVR`
   statt einer selbst konstruierten wie `ELVVO`). Ist auch das nicht
   auffindbar, den Nutzer nach der gewünschten Abkürzung fragen statt zu raten.
2. Ergänze `src/pages/werkzeuge/visualisieren/_data/{Abkuerzung}.yaml`:
   - Falls das Gesetz dort noch keine Metadaten-Datei hat, eine neue Datei
     `{Abkuerzung}.yaml` (identisch zum Ordnernamen aus Schritt 1, z.B.
     `KSchG.yaml`) mit `title` (offizieller Name ohne Abkürzung), `eli`
     (ELI-Pfad aus Schritt 2, Pflichtfeld) und leerem `visOptions`-Array
     anlegen. Die Datei ist reine YAML-Daten, kein Markdown-Frontmatter.
   - Für jeden Prozess ein `visOptions`-Objekt mit `name` (Prozessname aus
     Schritt 3), `filename` (Dateiname der `.mmd`-Datei ohne Verzeichnis und
     Endung, z.B. `"klagefristen"`) und `articles` hinzufügen: die Liste der
     **Haupt-Paragraphen/Artikel**, in denen die im Diagramm visualisierte
     Logik tatsächlich verankert ist (die Norm(en), aus denen sich Fristen,
     Voraussetzungen, Prüfschritte oder Rechtsfolgen des Diagramms ergeben) —
     nicht jede im Diagramm verlinkte Nebenfundstelle. Reine Querverweise
     (z.B. eine Begriffsbestimmungsnorm, ein "vgl. §X"-Verweis, eine
     Verfahrensvorschrift, die im Diagramm nur am Rande erwähnt wird, ohne
     dass ihre eigene Prüflogik abgebildet ist) gehören nicht in `articles`,
     auch wenn im Knotenlabel auf sie verlinkt wird. Faustregel: Nur Normen
     aufnehmen, ohne die das Diagramm seinen Sinn verliert, weil eine
     zentrale Frist, Voraussetzung oder Rechtsfolge fehlen würde — nicht
     jede Norm, die irgendwo im Diagramm auftaucht. In der Praxis meist 1-2
     Paragraphen pro Prozess. Im Zweifel (z.B. bei einer Ausnahmeregel, die
     eine eigene Voraussetzungsprüfung enthält) mit gesundem Menschenverstand
     entscheiden, ob die Norm tragend oder nur begleitend ist.
     Dedupliziert, jeweils mit dem im Gesetzestext verwendeten Präfix
     (z.B. `"§29a"` bei deutschen Gesetzen/Verordnungen, `"Art. 17"` bei
     EU-Rechtsakten — Schreibweise wie in den Knotenlabels der `.mmd`-Datei
     übernehmen). Mindestens drei unmittelbar aufeinanderfolgende Paragraphen/
     Artikel zu einem Bereich zusammenfassen statt einzeln aufzulisten, z.B.
     `"§7", "§8", "§9"` → `"§§7-9"` (Doppel-Paragraphenzeichen bei
     Bereichen deutscher Normen) und `"Art. 3", "Art. 4", "Art. 5"` →
     `"Art. 3-5"`. Bei nur zwei aufeinanderfolgenden oder bei Lücken in der
     Nummerierung einzeln auflisten (z.B. `"§7", "§9"` bleibt getrennt, da
     §8 fehlt).
     Bei `flowchart`/`stateDiagram`-Diagrammen aus den
     `art-zN`-Ankern der `{{ELI}}`-Links der so identifizierten
     Hauptparagraphen ableiten (nur die Zahl+Buchstabe vor `_abs-z`, nicht
     die Absatznummer) und mit "§" versehen, außer bei EU-Rechtsakten
     (siehe Schritt 2/4-Linkkonvention), dort das im Diagramm verwendete
     "Art. N"-Format übernehmen; bei `sequenceDiagram`/`gantt` ohne Links
     direkt aus den unverlinkten Textverweisen im jeweils verwendeten
     Format übernehmen. Verweise auf andere Gesetze nicht aufnehmen. Kein
     Prozess ohne Paragraphenbezug → `articles: []`.
3. Kurze Zusammenfassung an den Nutzer: welches Gesetz, welche Prozesse,
   wo gespeichert. Auf `/werkzeuge/visualisieren` im lokalen Dev-Server
   verweisen, um die Diagramme zu prüfen.

Nicht committen, es sei denn der Nutzer bittet explizit darum.
