---
name: vorhaben-checks
description: Sucht ein Gesetz über die RIS-Search-API, lädt den Volltext und führt darüber den Digitalcheck und den Bürgercheck aus. Ergebnisse werden im Potenziale-Tool (src/pages/werkzeuge/potenziale) gespeichert. Trigger bei "Vorhabencheck", "Digitalcheck", "Bürgercheck", "Gesetz auf Potenziale prüfen". (Praxischeck folgt später.)
---

# Vorhaben-Checks

Dieser Skill führt den Nutzer durch einen 4-stufigen Ablauf, um einen
Gesetzestext mit dem Digitalcheck und dem Bürgercheck zu analysieren und das
Ergebnis in dieses Repo einzupflegen (Tool unter `/werkzeuge/potenziale`).
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

## Schritt 3 — Digitalcheck und Bürgercheck ausführen

Beide Prüfschemata liegen als eigenständige Anweisungsdateien in diesem
Skill-Verzeichnis vor: `.claude/skills/vorhaben-checks/digitalcheck.md` und
`.claude/skills/vorhaben-checks/buergercheck.md`. Lies beide Dateien (falls
noch nicht geschehen).

Führe die beiden Checks **sequenziell** aus (nicht parallel), da der
Bürgercheck-Fork im annotierten Text des Digitalcheck-Forks weiterarbeitet:

1. Starte einen Agenten mit `subagent_type: "fork"` für den Digitalcheck. Der
   Fork-Agent bekommt:
   - den vollständigen Gesetzestext aus Schritt 2,
   - die komplette Anweisung aus `digitalcheck.md` (Rolle, Auftrag und alle
     4 Prüfschritte),
   - den Hinweis, das Ergebnis exakt im Ausgabeformat aus deren "Schritt 4"
     **als finale Nachricht zurückzugeben** (kurze Chat-Zusammenfassung, die
     strukturierte Findings-Liste als YAML passend zum `findings`-Array aus
     `src/content.config.ts`, sowie den Pfad zur annotierten
     Gesetzestext-Datei im Scratchpad-Verzeichnis) — inkl. der Vorprüfung:
     bricht der Check mangels Bezug ab, wird trotzdem genau dieses Ergebnis
     (mit leerer Findings-Liste und unverändertem, unannotiertem
     Gesetzestext) zurückgegeben.
2. Starte danach einen zweiten Agenten mit `subagent_type: "fork"` für den
   Bürgercheck. Der Fork-Agent bekommt:
   - den vollständigen Gesetzestext aus Schritt 2,
   - die komplette Anweisung aus `buergercheck.md` (Rolle, Auftrag und alle
     4 Prüfschritte),
   - den expliziten Hinweis, dass er in deren Schritt 4 (Teil 3, Punkt 2)
     **nicht** den rohen Gesetzestext aus Schritt 2 dieses Skills als
     Ausgangsdatei verwenden soll, sondern die vom Digitalcheck-Fork bereits
     annotierte Datei (Pfad aus Schritt 1 dieser Aufzählung) — die darin
     enthaltenen `<!--finding:...:start/end-->`-Kommentare des Digitalcheck
     sind reiner Text und stören sein `indexOf`-Zitatmatching nicht, solange
     er seine Zitate weiterhin wortwörtlich aus dem Regelungstext entnimmt.
     Liegt ein Bürgercheck-Zitat ausnahmsweise exakt so, dass ein
     Digitalcheck-Marker mitten darin liegt (`indexOf` findet das Zitat
     dadurch nicht mehr), weicht er auf eine eindeutig lokalisierbare
     Teilstelle direkt davor oder danach aus, statt das Finding zu verwerfen.
   - den gleichen Hinweis zum Ausgabeformat wie beim Digitalcheck-Fork
     (kurze Zusammenfassung, YAML-Findings-Liste, Pfad zur — nun beide
     Marker-Sets enthaltenden — annotierten Datei).

Beide Fork-Agenten legen **keine eigene Datei im Zielverzeichnis** an — sie
geben ihr Ergebnis als finale Nachricht zurück, die vom Orchestrator in
Schritt 4 weiterverarbeitet wird. Nur die annotierten Zwischen-Dateien im
Scratchpad sind Dateien im eigentlichen Sinne; die aus Schritt 1 wird nach
Schritt 2 nicht mehr benötigt, sobald die aus Schritt 2 (mit beiden
Marker-Sets) vorliegt.

Da die Fork-Agenten deinen vollen Kontext erben, kennen sie den geladenen
Gesetzestext bereits — im Prompt trotzdem explizit referenzieren, welcher
Check jeweils auszuführen ist.

> Praxischeck ist aktuell nicht Teil dieses Ablaufs. Seine Anweisungsdatei
> (`praxischeck.md`) liegt weiterhin im Skill-Verzeichnis, liefert aber noch
> Fließtext statt strukturierter Findings und wird hier bewusst nicht
> aufgerufen — er wird ergänzt, sobald ein zu Digitalcheck/Bürgercheck
> äquivalentes Prüfschema für ihn vorliegt.

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
2. Lege genau eine Datei `src/pages/werkzeuge/potenziale/_data/{shortTitle}.md`
   an, passend zum `potenziale`-Schema aus `src/content.config.ts`:
   - **YAML-Frontmatter:**
     - `title`: offizieller Name des Gesetzes (ohne Abkürzung).
     - `eli`: ELI-Pfad aus Schritt 2 (optional — nur setzen, wenn das Gesetz
       über RIS gefunden wurde).
     - `findings`: die YAML-Findings-Listen aus den finalen Nachrichten
       beider Forks, **zu einer Liste zusammengeführt** (Digitalcheck-
       Findings gefolgt von Bürgercheck-Findings), unverändert übernommen
       (Schema exakt wie in `digitalcheck.md` bzw. `buergercheck.md`
       Schritt 4 spezifiziert).
   - **Body:** der Inhalt der **annotierten** Gesetzestext-Datei, deren Pfad
     der Bürgercheck-Fork in Schritt 4 (Teil 3) zurückgegeben hat — der
     vollständige Gesetzestext aus Schritt 2 inklusive aller darin
     eingefügten `<!--finding:{id}:start/end-->`-Marker beider Checks.
     Unverändert und vollständig übernehmen, nicht kürzen oder
     umformulieren — sonst gehen Findings ohne passendes Marker-Paar
     verloren.
3. Gib im Chat an den Nutzer die Kurzfassungen + Findings-Listen beider
   Checks aus.
4. Kurze Zusammenfassung an den Nutzer: welches Gesetz, Digital- und
   Bürgerbezug ja/nein, Anzahl Findings (je Check), wo der Gesetzestext
   gespeichert wurde. Auf `/werkzeuge/potenziale` im lokalen Dev-Server
   verweisen, um den Eintrag zu prüfen.

Nicht committen, es sei denn der Nutzer bittet explizit darum.
