---
name: vorhaben-checks
description: Sucht ein Gesetz über die RIS-Search-API, lädt den Volltext und führt darüber Bürgercheck, Digitalcheck und Praxischeck aus. Ergebnisse werden als Markdown-Berichte im Potenziale-Tool (src/pages/werkzeuge/potenziale) gespeichert. Trigger bei "Vorhabencheck", "Bürgercheck", "Digitalcheck", "Praxischeck", "Gesetz auf Potenziale prüfen".
---

# Vorhaben-Checks

Dieser Skill führt den Nutzer durch einen 4-stufigen Ablauf, um einen
Gesetzestext mit drei standardisierten Prüfschemata (Bürgercheck,
Digitalcheck, Praxischeck) zu analysieren und die Ergebnisse in dieses Repo
einzupflegen (Tool unter `/werkzeuge/potenziale`).

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

## Schritt 3 — Die drei Checks ausführen

Die drei Prüfschemata liegen als eigenständige Anweisungsdateien in diesem
Skill-Verzeichnis vor:

- `.claude/skills/vorhaben-checks/buergercheck.md`
- `.claude/skills/vorhaben-checks/digitalcheck.md`
- `.claude/skills/vorhaben-checks/praxischeck.md`

Lies alle drei Dateien (falls noch nicht geschehen). Starte anschließend für
jeden Check **parallel** (alle drei Agent-Aufrufe in einem einzigen
Nachrichtenblock) einen Agenten mit `subagent_type: "fork"`. Jeder
Fork-Agent bekommt:

- den vollständigen Gesetzestext aus Schritt 2,
- die komplette Anweisung aus der jeweiligen Check-Datei (Rolle, Auftrag und
  alle 4 Prüfschritte),
- den Zielpfad, unter dem er sein Ergebnis selbst als Markdown-Datei
  speichern soll (siehe Schritt 4 für die genaue Namenskonvention),
- den Hinweis, dem Ausgabeformat aus "Schritt 4" der jeweiligen Check-Datei
  zu folgen (inkl. der Vorprüfung — bricht ein Check mangels Bezug ab, wird
  trotzdem genau dieses Ergebnis als kurzer Bericht gespeichert).

Da die Fork-Agenten deinen vollen Kontext erben, kennen sie den geladenen
Gesetzestext bereits — im Prompt trotzdem explizit referenzieren, welcher
Check auszuführen ist und wohin das Ergebnis geschrieben werden soll.

## Schritt 4 — Ergebnisse speichern

1. Bestimme `{shortTitle}` = amtliche oder gebräuchliche Abkürzung des
   Gesetzes (z.B. `KSchG`), nach denselben Regeln wie in
   `gesetz-visualisieren` Schritt 4.1: nur eine offizielle oder in der Praxis
   gebräuchliche Abkürzung verwenden (aus dem `abbreviation`-Feld der
   RIS-Trefferliste, dem Gesetzestext selbst oder einer verbreiteten
   Fundstelle) — niemals eine neue Abkürzung erfinden. Gibt es keine
   gebräuchliche deutsche Abkürzung, die im Ausland/EU-Kontext gebräuchliche
   Abkürzung verwenden. Ist auch das nicht auffindbar, den Nutzer fragen
   statt zu raten.
2. Für jeden der drei Checks eine Datei
   `src/pages/werkzeuge/potenziale/_data/{shortTitle}_{checkName}.md`
   speichern, mit `{checkName}` ∈ `buergercheck`, `digitalcheck`,
   `praxischeck` (identisch zu den Dateinamen der Anweisungsdateien ohne
   Endung). Inhalt: reines Markdown mit dem Prüfbericht im in der jeweiligen
   Check-Datei definierten Ausgabeformat (Schritt 4), kein YAML-Frontmatter.
3. Lege `src/pages/werkzeuge/potenziale/_data/{shortTitle}.yaml` an (reine
   YAML-Daten, kein Markdown-Frontmatter), passend zum `potenziale`-Schema
   aus `src/content.config.ts`:
   - `title`: offizieller Name des Gesetzes (ohne Abkürzung).
   - `eli`: ELI-Pfad aus Schritt 2 (optional — nur setzen, wenn das Gesetz
     über RIS gefunden wurde).
   - `checks`: ein Eintrag pro ausgeführtem Check mit
     - `type`: exakt `"Bürgercheck"`, `"Digitalcheck"` oder `"Praxischeck"`,
     - `filename`: Dateiname der `.md`-Datei aus Schritt 4.2 ohne
       Verzeichnis und Endung (z.B. `"KSchG_buergercheck"`).
4. Kurze Zusammenfassung an den Nutzer: welches Gesetz, welche Checks mit
   welchem Gesamtergebnis (Bürgerbezug/Digitalbezug/Unternehmensbezug
   ja/nein), wo gespeichert. Auf `/werkzeuge/potenziale` im lokalen
   Dev-Server verweisen, um die Ergebnisse zu prüfen.

Nicht committen, es sei denn der Nutzer bittet explizit darum.
