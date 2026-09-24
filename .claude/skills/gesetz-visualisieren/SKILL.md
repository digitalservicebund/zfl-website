---
name: gesetz-visualisieren
description: Sucht ein Gesetz über die RIS-Search-API, identifiziert bis zu 5 Prozesse/Abläufe im Gesetzestext und erzeugt dafür Mermaid-Diagramme (Flowcharts oder Swimlanes), optional ergänzt um eine Akteursübersicht, die als .mmd-Dateien im Visualisierungs-Tool (src/pages/werkzeuge/visualisieren) gespeichert werden. Trigger bei "Gesetz visualisieren", "Mermaid-Diagramm für Gesetz", "Prozessvisualisierung Gesetzestext".
---

# Gesetz visualisieren

Dieser Skill führt den Nutzer durch einen 4-stufigen Ablauf, um aus einem
Gesetzestext bis zu 5 Mermaid-Diagramme (`flowchart` oder `swimlane`) und
optional eine Akteursübersicht (`actors`) zu erzeugen und in dieses Repo
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
   Das HTML als Datei speichern (für `check-anchors.mjs` in Schritt 4).
   Arbeitsdateien (HTML, Hilfsskripte, Renderings) in einem eigenen
   Unterordner `<scratchpad>/{Abkuerzung}/` ablegen, damit parallele Läufe
   für mehrere Gesetze sich nicht gegenseitig überschreiben.
4. Den Fassungsstand prüfen (Datum im ELI-Pfad). RIS enthält teils nur
   ältere Fassungen (z.B. LkSG: Stand 2023-01-01). Liegt der Stand mehr als
   ~1 Jahr zurück oder sind spätere Änderungen bekannt, den Nutzer darauf
   hinweisen, bevor Prozesse ausgewählt werden, die davon betroffen sein
   könnten.
5. Falls das Gesetz sehr lang ist (>~50 Paragraphen), zunächst nur das
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
Detailgrad, siehe `src/content/ki-visualisierungen/*.yaml`):

- KSchG: Anwendbarkeitsprüfung, Prüfschema "sozial ungerechtfertigt",
  Klagefristen-Kette (alle `flowchart`), Anzeigeverfahren Massenentlassung
  (`swimlane`)
- HeizkostenV: Geltungsbereich, Kürzungsrecht, Kostenverteilung, Pflichten
  des Gebäudeeigentümers (alle `flowchart`)

Wähle bis zu 5 Prozesse (weniger ist ok, wenn das Gesetz nicht mehr
hergibt) und benenne jeden kurz und prägnant (2-4 Wörter, wie oben).

Lege für jeden Prozess den Diagrammtyp (`visType`) fest:

- **`swimlane`** — bevorzugt für Abläufe mit verteilten Zuständigkeiten, bei
  denen mehrere Akteure (z.B. Arbeitgeber, Betriebsrat, Behörde) jeweils
  eigene Schritte übernehmen und Vorgänge zwischen ihnen übergeben werden
  (Anzeige-, Melde-, Antrags-, Beteiligungsverfahren). Jede Lane steht für
  einen Akteur.
- **`flowchart`** — wenn es vor allem um Entscheidungslogik geht und weniger
  um Zuständigkeiten: Prüfschemata, Anwendbarkeitsprüfungen,
  Anspruchsvoraussetzungen, Fristenketten, Berechnungen. Auch wenn im
  Wesentlichen nur ein Akteur handelt (z.B. "Pflichten des
  Gebäudeeigentümers").

Andere Mermaid-Diagrammtypen (`sequenceDiagram`, `stateDiagram`, `gantt`,
`erDiagram` usw.) nicht verwenden.

### Zusätzlich: Akteursübersicht (`actors`)

Unabhängig von den bis zu 5 Prozessen prüfen, ob sich eine
**Akteursübersicht** lohnt: ein Diagramm, das zeigt, welche Akteure das
Gesetz einrichtet oder adressiert, wofür jeder zuständig ist und wie sie
zueinander stehen (Aufsicht, Zusammenarbeit, Melde-/Berichtspflichten,
Weisungen, Anordnungen, Beteiligung). Es ist weder Ablauf noch Prüfschema,
sondern zeigt Rollen ohne zeitliche Reihenfolge.

- Nur erstellen, wenn das Gesetz **mindestens drei Akteure mit gesetzlich
  bestimmten Rollen** und ausdrücklich geregelte Beziehungen zwischen ihnen
  enthält (typisch: Behördenorganisation, Aufsichts- und Meldestrukturen,
  Rollenmodelle wie Verantwortlicher/Auftragsverarbeiter). Gute Beispiele:
  DDG, GwG, IfSG (Meldewesen), DSGVO, KCanG.
- Nicht erstellen bei Gesetzen, die im Wesentlichen einen Akteur
  adressieren oder vor allem Berechnungen, Definitionen oder Tarife regeln
  (z.B. SolZG, BetrKV, GKG).
- Höchstens **ein** Akteursdiagramm pro Gesetz, zusätzlich zu den bis zu
  5 Prozessdiagrammen.
- Bei sehr umfangreichen Gesetzen auf einen klar benannten Teilbereich
  eingrenzen (z.B. IfSG: "Akteure im Meldewesen") statt alles abzubilden.

## Schritt 4 — Mermaid-Diagramme erstellen und speichern

Für jeden identifizierten Prozess ein Diagramm des in Schritt 3 gewählten
Typs erstellen: `flowchart TD` bzw. `swimlane-beta TD`; für die
Akteursübersicht `flowchart LR`. Jede `.mmd`-Datei
beginnt mit einem Frontmatter-Block (Repo-Konvention, keine Mermaid-Syntax —
wird von `_mmdFrontmatter.ts` vor dem Rendern entfernt) mit einem
`summary`-Feld: 1-2 Sätze, die den visualisierten Prozess beschreiben
(erscheint im Wizard unter den Auswahl-Chips). Format:

```
---
summary: "Kurze Zusammenfassung des Diagramms in ein bis zwei Sätzen."
---
flowchart TD
    ...
```

bzw. für Swimlanes `swimlane-beta TD` statt `flowchart TD`.

Der Summary-Text muss auf einer einzigen Zeile stehen (keine `<br/>` oder
echte Zeilenumbrüche), in doppelten Anführungszeichen; enthaltene `"` als
`\"` und `\` als `\\` escapen.

Stilkonventionen für das Diagramm selbst (siehe existierende Dateien unter
`src/content/ki-visualisierungen/{Abkuerzung}/*.mmd` für Beispiele):

- Knotenlabels in doppelten Anführungszeichen, Zeilenumbrüche mit `<br/>`
  (nicht `\n`), damit lange Texte lesbar bleiben.
- Zeilenlänge (sichtbarer Text ohne HTML-Tags) pro `<br/>`-Zeile:
  - **Rauten `{"..."}`: ~25-30 Zeichen.** Mermaid bemisst die Raute an der
    Textbox; lange Zeilen ergeben riesige, flache Rauten mit viel Leerraum.
  - **Alle anderen Knoten und Kantenbeschriftungen: ~40 Zeichen**, bevorzugt
    an inhaltlichen Grenzen umbrechen (eine Aussage mit ihrem Verweis pro
    Zeile).
  - Keine Silbentrennung per `-<br/>` und keine sehr kurzen Zeilen
    (< ~20 Zeichen) — das macht Knoten unnötig schmal und hoch.
  - Den Verweis nicht vom Paragraphenzeichen trennen (`— §17 I S.1` bleibt
    zusammen).
  - Gilt für `flowchart TD` und `swimlane`. Wizard und `render-check.mjs`
    brechen bei diesen erst ab 400px automatisch um, bei `flowchart LR`
    (Akteure) schon ab 200px — dort siehe die Akteurs-Konventionen unten.
- Jede inhaltliche Aussage mit Paragraphen-/Artikelverweis versehen
  (z.B. `— §4 S.4`), damit die Diagramme rechtlich nachvollziehbar bleiben.
- Entscheidungen als Raute `{"..."}`, Ja/Nein bzw. Fristablauf-Pfade als
  beschriftete Kanten (`-->|Ja|`, `-->|Nein|`).
- Terminale Endzustände farblich hervorheben:
  `style <Knoten> fill:#d4edda,stroke:#2d8a4a` (positiv/grün),
  `style <Knoten> fill:#f8d7da,stroke:#c0392b` (negativ/rot),
  `style <Knoten> fill:#fff3cd,stroke:#c9a227` (Zwischenschritt/gelb).
- Nur den Prozess selbst modellieren, keine Meta-Kommentare im Diagramm.
- Ergänzende Hinweise (z.B. Rechte Dritter, Nebenpflichten) als eigenen
  Knoten mit gestrichelter Linie anhängen
  (`Knoten -.- Hinweis["..."]`, `style Hinweis fill:#f5f5f5,stroke:#999`)
  statt den Hauptablauf damit zu überfrachten.
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
  Paragraphen ohne nummerierte Absätze haben im HTML den Anker
  `art-zN_abs-z` (leere Absatznummer) — darauf verlinken
  (`{{ELI}}#art-zN_abs-z`), wie in den bestehenden Diagrammen.
  Das gilt für `flowchart` und `swimlane` gleichermaßen (Swimlanes nutzen
  dieselbe Knotensyntax).
- Nach dem Schreiben alle Anker gegen das HTML aus Schritt 2 prüfen:
  `node .claude/skills/gesetz-visualisieren/check-anchors.mjs <gesetz.html> src/content/ki-visualisierungen/{Abkuerzung}/*.mmd`
  (meldet jeden Link, dessen Anker-ID im HTML fehlt).
- Jedes Diagramm (nicht nur Swimlanes) mit `render-check.mjs` rendern und
  das PNG ansehen (siehe `swimlane-layout.md`, Abschnitt „Rendern und
  prüfen"), auch Flowcharts und Akteursübersichten.

Zusätzlich für `swimlane`-Diagramme. Die Syntax ist neu (Beta, ab Mermaid
12), daher vor dem Erstellen die Referenz lesen:
https://mermaid.ai/open-source/syntax/swimlanes.html

- Header `swimlane-beta TD` (Richtung immer explizit angeben, wie bei
  `flowchart TD`).
- Jede Lane ist ein Top-Level-`subgraph` mit Akteur als Label, z.B.
  `subgraph AG["Arbeitgeber"] ... end`. Knoten innerhalb des `subgraph`
  definieren, auf dessen Akteur der Schritt entfällt.
- Knoten- und Kantensyntax wie bei `flowchart`: `id["..."]` Aufgabe,
  `id("...")` Ereignis, `id(["..."])` Start/Ende, `id{"..."}` Entscheidung;
  `-->`, `-->|Label|`, `-.->` (gestrichelt).
- Entscheidungen in die Lane des Akteurs legen, der entscheidet, und die
  Ergebnisse zu den Lanes führen, die darauf handeln.
- Kanten zwischen Lanes stehen für Übergaben. Nebenläufige Übergaben
  (z.B. Abschriften, optionale Stellungnahmen) gestrichelt (`-.->`).
- Kanten erst nach allen `subgraph`-Blöcken aufführen.
- Beispiel: `src/content/ki-visualisierungen/KSchG/massenentlassung.mmd`.
- Der Swimlane-Renderer ordnet Knoten anders an als `flowchart` (eine Zeile
  pro Knoten und Lane, Endknoten rutschen nach unten), was schnell zu langen
  Umwegkanten führt. Vor dem Erstellen `swimlane-layout.md` in diesem
  Skill-Verzeichnis lesen, die dortigen Techniken anwenden (u.a. Hinweise
  ins Label statt als eigenen Knoten, unsichtbare Kanten `~~~`, keine
  Rückkanten) und jede Swimlane mit `render-check.mjs` rendern und
  visuell prüfen.

Zusätzlich für die Akteursübersicht (`actors`):

- Header `flowchart LR`. Keine Entscheidungsrauten, keine Nummerierung,
  keine zeitliche Reihenfolge.
- 6-12 Akteure; Randakteure, die nur in einem Nebensatz vorkommen,
  weglassen statt das Diagramm zu überladen. Lange Aufzählungen
  gleichartiger Akteure (z.B. die Aufsichtsbehörden nach §50 GwG) zu
  einem Knoten zusammenfassen. Akteure mit Namen aus dem Gesetzestext
  benennen (z.B. "nach den medienrechtlichen Bestimmungen der Länder
  benannte Stellen", nicht "Landesmedienanstalten", wenn das Gesetz diesen
  Begriff nicht verwendet); überlässt das Gesetz die Zuständigkeit dem
  Landesrecht, die Rolle benennen ("Zuständige Behörde").
- Zentraler Akteur zuerst: der Akteur mit den meisten Beziehungen (nicht
  zwingend der Hauptadressat des Gesetzes, z.B. KCanG: zuständige Behörde
  statt Anbauvereinigung). Gibt es keinen klaren Mittelpunkt, keinen
  Akteur als zentral markieren.
- Ein Knoten pro Akteur: erste Zeile der Name in `<b>…</b>`, danach eine
  Zeile pro Zuständigkeit/Pflicht/Befugnis, jede mit eigenem
  Paragraphenverweis (statt alle Verweise gesammelt am Ende); höchstens
  5 Zeilen insgesamt. Innerhalb einer Zeile keine weiteren `<br/>` setzen
  (abweichend von der Zeilenlängen-Regel oben) — bei `flowchart LR` bricht
  der Renderer ab 200px selbst um, so bleiben die Knoten schmal und das
  Diagramm nicht zu breit. Beispiel:
  `KDD["<b>Koordinierungsstelle für digitale Dienste</b><br/>Durchsetzung des DSA — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a><br/>völlig unabhängig — <a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15</a>"]`
- Kanten sind Beziehungen und immer beschriftet: Beziehungsart + genau
  **ein** verlinkter Paragraphenverweis (weitere Verweise als Klartext),
  kurz halten (Beschriftungen werden sonst im LR-Layout sehr breit), z.B.
  `BNetzA -->|"beherbergt — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>"| KDD`.
  - `-->` gerichtete Beziehungen (Aufsicht, Weisung, Anordnung, Meldung,
    Bericht, Beauftragung).
  - `<-->` gegenseitige Beziehungen (Zusammenarbeit, Informationsaustausch).
  - `-.-` lose Anbindung (Beratung, Beirat, freiwillige Mitwirkung).
  - Stehen zwei Akteure in beide Richtungen in unterschiedlicher Beziehung
    (z.B. Meldung an die Behörde, Anordnungen der Behörde), zwei
    gerichtete Kanten statt einer `<-->`-Kante mit Sammelbeschriftung.
    Jede solche Gegenkante läuft im LR-Layout aber als Bogen um das ganze
    Diagramm (die Anordnung folgt allein der Kantenrichtung; Reihenfolge
    von Knoten, Gruppen und Kanten im Quelltext ändert daran nichts). Ist
    eine der beiden Richtungen nur eine Nebenbeziehung, sie stattdessen als
    Zeile in den Knoten des handelnden Akteurs aufnehmen (z.B. BetrVG:
    „beantragt Maßnahmen beim BR — §70 I" im Knoten der JAV) und nur die
    Hauptbeziehung als Kante zeichnen.
  - Kanten möglichst in eine Richtung laufen lassen (von den Akteuren, die
    einrichten, beaufsichtigen oder anordnen, zu denen, die ausführen), dann
    bleiben die Kanten kurz. Beziehungen dafür, wo sinnvoll, aus Sicht des
    zentralen Akteurs formulieren (z.B. „nimmt Beschwerden entgegen" statt
    einer Gegenkante „beschwert sich").
  - Höchstens ~15 verbundene Akteurspaare (ein Paar mit zwei
    Gegenrichtungskanten zählt einfach).
  - Beziehung zu mehreren Akteuren gleichzeitig: `A --> B & C`.
- Akteure mit top-level `subgraph ID["Label"] ... end` nach Ebene oder
  Rolle gruppieren (z.B. `Bund["Bundesbehörden"]`, `Laender["Länder"]`,
  `EU["EU-Ebene"]`, `Verpflichtete["Verpflichtete"]`), 2-4 Gruppen. ID
  ohne Bindestriche und Umlaute, Anzeigename im Label. Der zentrale Akteur
  darf außerhalb der Gruppen stehen. Zerfällt das Gesetz in getrennte
  Akteursinseln, die nichts miteinander zu tun haben, nur den
  zusammenhängenden Kern abbilden; eine kleine Insel darf als Gruppe
  `Weitere["Weitere Akteure"]` dazukommen, wenn sie für das Verständnis
  wichtig ist.
- Farben per `classDef` am Ende, in allen Akteursdiagrammen einheitlich:
  ```
      classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
      classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
      classDef privat fill:#f5f5f5,stroke:#999
      classDef parlament fill:#ede7f6,stroke:#7e57c2
      classDef gremium fill:#e6f4ea,stroke:#2d8a4a
      class KDD zentral
      class BNetzA,BfDI behoerde
  ```
  `zentral` für den zentralen Akteur (auch wenn er selbst eine Behörde
  ist), `behoerde` für Behörden, Institute und Gerichte, `privat` für
  Verpflichtete, Unternehmen, Vereinigungen und Bürger, `parlament` für
  Parlamente, Regierungen und Ministerien, `gremium` für Beiräte,
  Ausschüsse und EU-Gremien. Knoten-IDs dürfen nicht wie eine
  `classDef` heißen (z.B. nicht `behoerde`).
- Die Verlinkungskonventionen oben gelten unverändert (bei EU-Rechtsakten
  ohne ELI Verweise als Klartext wie in den übrigen Diagrammen des
  Gesetzes).
- Beispiel: `src/content/ki-visualisierungen/DDG/akteure.mmd`.

Speichern:

1. Lege pro Prozess eine Datei
   `src/content/ki-visualisierungen/{Abkuerzung}/{slug}.mmd`
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
2. Ergänze `src/content/ki-visualisierungen/{Abkuerzung}.yaml`:
   - Falls das Gesetz dort noch keine Metadaten-Datei hat, eine neue Datei
     `{Abkuerzung}.yaml` (identisch zum Ordnernamen aus Schritt 1, z.B.
     `KSchG.yaml`) mit `title` (offizieller Name ohne Abkürzung), `eli`
     (ELI-Pfad aus Schritt 2, Pflichtfeld) und leerem `visOptions`-Array
     anlegen. Die Datei ist reine YAML-Daten, kein Markdown-Frontmatter.
   - Für jedes Prozessdiagramm ein `visOptions`-Objekt mit `name` (Prozessname aus
     Schritt 3), `visType` (`flowchart` oder `swimlane`, siehe Schritt 3),
     `filename` (Dateiname der `.mmd`-Datei ohne Verzeichnis und
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
     Aus den `art-zN`-Ankern der `{{ELI}}`-Links der so identifizierten
     Hauptparagraphen ableiten (nur die Zahl+Buchstabe vor `_abs-z`, nicht
     die Absatznummer) und mit "§" versehen, außer bei EU-Rechtsakten
     (siehe Schritt 2/4-Linkkonvention), dort das im Diagramm verwendete
     "Art. N"-Format übernehmen. Verweise auf andere Gesetze nicht
     aufnehmen. Kein Prozess ohne Paragraphenbezug → `articles: []`.
   - Für die Akteursübersicht (falls erstellt) ein `visOptions`-Objekt mit
     `name: Akteure und Zuständigkeiten` (bei eingegrenztem Teilbereich
     entsprechend, z.B. `Akteure im Meldewesen`), `visType: actors`,
     `filename: akteure` und immer `articles: []` — die Übersicht beruht auf
     dem gesamten Gesetzestext, nicht auf einzelnen Paragraphen.
3. Kurze Zusammenfassung an den Nutzer: welches Gesetz, welche Prozesse
   (jeweils mit Diagrammtyp) und ob eine Akteursübersicht erstellt wurde
   (falls nicht, kurz warum), wo gespeichert. Stellen auflisten, an denen
   das Diagramm über den Wortlaut hinausgeht oder vereinfacht (z.B. aus
   allgemeinem Verfahrensrecht oder Rechtsprechung abgeleitete Schritte,
   bewusst weggelassene Ausnahmen), damit sie fachlich geprüft werden
   können. Auf `/werkzeuge/visualisieren` im lokalen Dev-Server verweisen,
   um die Diagramme zu prüfen.

Nicht committen, es sei denn der Nutzer bittet explizit darum.
