---
name: vorhaben-checks
description: Sucht ein Gesetz über die RIS-Search-API, lädt den Volltext, führt darüber den Digitalcheck und den Bürgercheck aus und extrahiert die im Gesetz enthaltenen Pflichten. Ergebnisse werden im Potenziale-Tool (src/pages/werkzeuge/potenziale) gespeichert. Trigger bei "Vorhabencheck", "Digitalcheck", "Bürgercheck", "Pflichten extrahieren", "Gesetz auf Potenziale prüfen". (Praxischeck folgt später.)
---

# Vorhaben-Checks

Dieser Skill führt den Nutzer durch einen 4-stufigen Ablauf, um einen
Gesetzestext mit dem Digitalcheck und dem Bürgercheck zu analysieren, die
darin enthaltenen Pflichten zu extrahieren und das Ergebnis in dieses Repo
einzupflegen (Tool unter `/werkzeuge/potenziale`).
Praxischeck ist vorerst entfernt — er wird ergänzt, sobald für ihn ein
vergleichbares Prüfschema wie für Digitalcheck und Bürgercheck vorliegt
(strukturierte Findings statt Fließtext, siehe `digitalcheck.md` und
`buergercheck.md`).

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
   per curl laden. Die API bietet kein natives Markdown-Encoding (nur
   `text/html`, `application/xml`, `application/zip`) — das ist hier aber
   unproblematisch: Anders als bei `gesetz-visualisieren` werden für die
   Checks keine Absatz-Anker-IDs zum Verlinken gebraucht, es reicht der
   reine Lesetext. Lade daher das HTML direkt per curl (nicht per WebFetch:
   WebFetch leitet Inhalte durch ein kleineres, zusammenfassendes Modell und
   würde für eine vollständige Prüfung relevante Details verlieren) und
   reduziere es bei Bedarf auf lesbaren Text/Markdown (Tags entfernen). Die
   Prüfschemata brauchen den kompletten Gesetzestext, keine Zusammenfassung.
   Notiere außerdem den `legislationIdentifier` des Treffers (den
   **ELI-Pfad**, z.B. `eli/bund/bgbl-1/1951/s499/2021-06-18/1/deu`) für die
   Metadaten in Schritt 4.
4. Falls das Gesetz sehr lang ist (>~50 Paragraphen), genügt für die Checks
   trotzdem der volle Text — bei Bedarf in mehreren Leseabschnitten laden,
   damit nichts fehlt (im Gegensatz zu `gesetz-visualisieren` wird hier nicht
   nach einzelnen Prozess-Ausschnitten gefiltert, da alle drei Checks den
   gesamten Text nach unterschiedlichen Kriterien durchsuchen).

## Schritt 3 — Digitalcheck, Bürgercheck und Pflichten ausführen

Alle drei Anweisungsdateien liegen als eigenständige Dateien in diesem
Skill-Verzeichnis vor: `.claude/skills/vorhaben-checks/digitalcheck.md`,
`.claude/skills/vorhaben-checks/buergercheck.md` und
`.claude/skills/vorhaben-checks/pflichten.md`. Lies alle drei Dateien (falls
noch nicht geschehen).

Führe alle drei Analysen **parallel** aus: sie lesen nur den unveränderten
Gesetzestext aus Schritt 2 und schreiben oder annotieren keine Datei — die
Marker-Platzierung für Digitalcheck/Bürgercheck erfolgt einmalig und zentral
in Schritt 4, nachdem alle drei Ergebnisse vorliegen. Dadurch gibt es keine
Abhängigkeit zwischen den Analysen mehr und alle drei Agent-Aufrufe können in
**einer** Nachricht gestartet werden:

1. Ein Agent mit `subagent_type: "fork"` für den Digitalcheck. Der Fork-Agent
   bekommt:
   - den vollständigen Gesetzestext aus Schritt 2,
   - die komplette Anweisung aus `digitalcheck.md` (Rolle, Auftrag und alle
     4 Prüfschritte),
   - den Hinweis, das Ergebnis exakt im Ausgabeformat aus deren "Schritt 4"
     **als finale Nachricht zurückzugeben** (kurze Chat-Zusammenfassung sowie
     die strukturierte Findings-Liste als YAML, exakt im Format des
     `findings`-Arrays aus `src/content.config.ts`, inklusive `quote`) —
     inkl. der Vorprüfung: bricht der Check mangels Bezug ab, wird trotzdem
     genau dieses Ergebnis mit leerer Findings-Liste zurückgegeben.
2. Ein zweiter Agent mit `subagent_type: "fork"` für den Bürgercheck, parallel
   zum ersten gestartet (gleiche Nachricht, zweiter Tool-Aufruf). Der
   Fork-Agent bekommt:
   - den vollständigen Gesetzestext aus Schritt 2 (denselben unannotierten
     Text wie der Digitalcheck-Fork — beide arbeiten auf derselben Vorlage),
   - die komplette Anweisung aus `buergercheck.md` (Rolle, Auftrag und alle
     4 Prüfschritte),
   - den gleichen Hinweis zum Ausgabeformat wie beim Digitalcheck-Fork
     (kurze Zusammenfassung, YAML-Findings-Liste inkl. `quote`-Feld).
3. Ein dritter Agent mit `subagent_type: "fork"` für die Pflichten-Extraktion,
   parallel zu den beiden anderen gestartet (gleiche Nachricht, dritter
   Tool-Aufruf). Der Fork-Agent bekommt:
   - den vollständigen Gesetzestext aus Schritt 2 (denselben Text wie die
     beiden anderen Forks),
   - die komplette Anweisung aus `pflichten.md`,
   - den Hinweis, das Ergebnis exakt im Ausgabeformat aus deren "Schritt 2"
     **als finale Nachricht zurückzugeben** (kurze Chat-Zusammenfassung sowie
     die strukturierte Pflichten-Liste als YAML, exakt im Format des
     `obligations`-Arrays aus `src/content.config.ts`, inklusive `id` und
     `quote`). Wie Findings werden Pflichten über ihr `quote`-Feld an eine
     Textstelle gebunden und vom Orchestrator zentral in Schritt 4 mit einem
     Marker-Paar (`<!--obligation:{id}:start-->` / `<!--obligation:{id}:end-->`)
     im Gesetzestext verankert.

Alle drei Fork-Agenten legen **keine Datei** an — sie geben ihr Ergebnis
ausschließlich als finale Nachricht zurück, die der Orchestrator in Schritt 4
zu einer Ergebnis-Datei (annotierter Gesetzestext plus Frontmatter)
zusammenführt.

Da die Fork-Agenten deinen vollen Kontext erben, kennen sie den geladenen
Gesetzestext bereits — im Prompt trotzdem explizit referenzieren, welche
Analyse jeweils auszuführen ist.

> Praxischeck ist aktuell nicht Teil dieses Ablaufs. Seine Anweisungsdatei
> (`praxischeck.md`) liegt weiterhin im Skill-Verzeichnis, liefert aber noch
> Fließtext statt strukturierter Findings und wird hier bewusst nicht
> aufgerufen — er wird ergänzt, sobald ein zu Digitalcheck/Bürgercheck
> äquivalentes Prüfschema für ihn vorliegt.

## Schritt 4 — Ergebnisse zusammenführen und speichern

1. Kombiniere die YAML-Findings-Listen aus den finalen Nachrichten der
   Digitalcheck- und Bürgercheck-Forks zu einer Liste (Digitalcheck-Findings
   gefolgt von Bürgercheck-Findings). Jedes Finding behält dabei sein
   `quote`-Feld — es ist Teil des `findings`-Schemas (`src/content.config.ts`)
   und wird mit gespeichert, nicht nur für die Marker-Platzierung in Schritt
   4.2 benutzt. Das hält die Tür offen, Marker künftig durch client-seitiges
   Matching auf `quote` zu ersetzen, ohne Skill oder Schema erneut anzufassen.
   Übernimm zusätzlich die YAML-Pflichten-Liste aus der finalen Nachricht des
   Pflichten-Forks unverändert (inklusive `id` und `quote`) — sie fließt
   separat in Schritt 4.2 mit ein, da sie ein eigenes Marker-Format
   (`obligation` statt `finding`) verwendet.
2. Platziere die Marker **einmalig und zentral** im unveränderten
   Gesetzestext aus Schritt 2 (nicht mehr pro Fork):
   1. Schreibe den kompletten, unannotierten Gesetzestext aus Schritt 2
      unverändert in eine Datei im Scratchpad-Verzeichnis.
   2. Ermittle **programmatisch** (per Node/Python-Skript, nicht von Hand)
      für **jedes** Finding aus der kombinierten Liste und für **jede**
      Pflicht aus der Pflichten-Liste (beide aus Schritt 4.1) mit
      `text.indexOf(quote)` bzw. `text.find(quote)` Start- und Ende-Offset
      seines `quote`-Werts im unannotierten Text. Kommt ein Zitat mehrfach
      vor, das richtige Vorkommen anhand des Kontexts (z. B. der
      Gliederungsangabe aus `locationLabel`) gezielt auswählen, nicht
      einfach das erste nehmen.
   3. Sortiere alle so ermittelten Einfüge-Positionen (Start und Ende aller
      Findings und Pflichten zusammen) **absteigend** und füge die
      Marker-Paare ein — für Findings `<!--finding:{id}:start-->` /
      `<!--finding:{id}:end-->`, für Pflichten `<!--obligation:{id}:start-->`
      / `<!--obligation:{id}:end-->` — in dieser Reihenfolge in den Text ein.
      Rückwärts einfügen ist Pflicht, sonst verschieben frühere Einfügungen
      die noch offenen Offsets. Überlappende oder ineinanderliegende
      Textstellen verschiedener Findings/Pflichten (auch checkübergreifend,
      z. B. ein Digitalcheck-Finding und eine Pflicht im selben Satz) sind
      unproblematisch — die Marker sind reine Textmarken ohne
      Verschachtelungszwang, und da alle Zitat-Listen gegen denselben
      unveränderten Ausgangstext aufgelöst werden, kann keine
      Marker-Insertion einer Liste das Zitat-Matching einer anderen stören.
   4. Schreibe den so annotierten Volltext in eine weitere Datei im
      Scratchpad-Verzeichnis.
3. Bestimme `{shortTitle}` = amtliche oder gebräuchliche Abkürzung des
   Gesetzes (z.B. `KSchG`), nach denselben Regeln wie in
   `gesetz-visualisieren` Schritt 4.1: nur eine offizielle oder in der Praxis
   gebräuchliche Abkürzung verwenden (aus dem `abbreviation`-Feld der
   RIS-Trefferliste, dem Gesetzestext selbst oder einer verbreiteten
   Fundstelle) — niemals eine neue Abkürzung erfinden. Gibt es keine
   gebräuchliche deutsche Abkürzung, die im Ausland/EU-Kontext gebräuchliche
   Abkürzung verwenden. Ist auch das nicht auffindbar, den Nutzer fragen
   statt zu raten.
4. Lege genau eine Datei `src/content/potenziale/{shortTitle}.md`
   an, passend zum `potenziale`-Schema aus `src/content.config.ts`:
   - **YAML-Frontmatter:**
     - `title`: offizieller Name des Gesetzes (ohne Abkürzung).
     - `eli`: ELI-Pfad aus Schritt 2 (optional — nur setzen, wenn das Gesetz
       über RIS gefunden wurde).
     - `findings`: die kombinierte Findings-Liste aus Schritt 4.1, unverändert
       übernommen (inklusive `quote` je Finding).
     - `obligations`: die Pflichten-Liste aus Schritt 4.1, unverändert
       übernommen (inklusive `id` und `quote` je Pflicht).
   - **Body:** der Inhalt der annotierten Gesetzestext-Datei aus Schritt 4.2.4
     — der vollständige Gesetzestext aus Schritt 2 inklusive aller darin
     eingefügten `<!--finding:{id}:start/end-->`- und
     `<!--obligation:{id}:start/end-->`-Marker. Unverändert und vollständig
     übernehmen, nicht kürzen oder umformulieren — sonst gehen Findings bzw.
     Pflichten ohne passendes Marker-Paar verloren.
5. Gib im Chat an den Nutzer die Kurzfassungen + Findings-Listen beider
   Checks sowie die Kurzfassung + Pflichten-Liste aus.
6. Kurze Zusammenfassung an den Nutzer: welches Gesetz, Digital- und
   Bürgerbezug ja/nein, Anzahl Findings (je Check), Anzahl extrahierter
   Pflichten, wo der Gesetzestext gespeichert wurde. Auf
   `/werkzeuge/potenziale` im lokalen Dev-Server verweisen, um den Eintrag zu
   prüfen.

Nicht committen, es sei denn der Nutzer bittet explizit darum.
