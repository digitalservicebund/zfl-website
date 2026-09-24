# Swimlane-Layout optimieren

Ergänzung zu Schritt 4 von `SKILL.md`. Gilt für `swimlane-beta` in Mermaid 12
(Beta). Jede Swimlane nach dem Erstellen rendern und das Layout prüfen:
Parse-Fehlerfreiheit sagt nichts über lange Umwege oder Kanten aus dem Nichts.

## Wie der Renderer Knoten anordnet

- **Eine Zeile pro Knoten und Lane.** Jede Lane ist eine einzelne Spalte;
  zwei Knoten derselben Lane stehen nie in derselben Zeile. Jede Verzweigung
  innerhalb einer Lane zwingt den einen Zweig, über die Knoten des anderen zu
  springen — daraus entstehen lange Kanten, die durch Nachbar-Lanes oder den
  Diagrammrand geführt werden.
- **Endknoten rutschen nach unten.** Knoten ohne ausgehende Kante
  (Endzustände, gestrichelte Hinweisknoten) landen in den letzten Zeilen,
  weit weg von ihrer Entscheidung.
- **Startknoten kleben oben.** Knoten ohne eingehende Kante stehen in den
  ersten Zeilen, auch wenn sie erst weiter unten gebraucht werden.
- **Lane-übergreifende Kanten legen beide Knoten in dieselbe Zeile.** Die
  freien Anschlüsse einer Raute bestimmen dann, wo Kanten eintreten; dabei
  entstehen gelegentlich kleine kosmetische Bögen, die sich kaum vermeiden
  lassen.
- Die Reihenfolge der Knoten- und Kantendefinition im Quelltext hat kaum
  Einfluss.

## Techniken

1. **Unsichtbare Kanten `A ~~~ B`** (nach den echten Kanten aufführen)
   legen die Zeile eines Knotens fest:
   - `endknoten ~~~ naechsterHauptknoten` hält einen seitlichen Endzustand
     direkt unter seiner Entscheidung,
   - `vorgaenger ~~~ startknoten` zieht einen Startknoten nach unten zu der
     Stelle, an der er gebraucht wird.

   Jeden Pin einzeln durch Rendern prüfen — ein Pin kann den Weg einer
   anderen Kante blockieren und das Layout verschlechtern.

2. **Hinweise ins Label statt als eigenen Knoten.** Gestrichelte
   Hinweisknoten (`-.- hinweis`) belegen in Swimlanes eine eigene Zeile und
   landen oft am unteren Rand. Stattdessen als Klammerzusatz ins Label des
   zugehörigen Knotens aufnehmen, z.B.
   `(auch Gesamtstrafen — <a …>§40 II</a>)`. Das weicht bewusst von der
   Hinweis-Konvention für `flowchart` in `SKILL.md` ab.
3. **Zusammenfassen, wo die Rechtslogik es erlaubt:**
   - kumulative Voraussetzungen (Nr. 1 _und_ Nr. 2) in eine Entscheidung,
   - gleichartige alternative Ergebnisse in einen Knoten mit beschrifteten
     eingehenden Kanten (z.B. KSchG: „Entlassungen werden wirksam" mit den
     Kanten „Ja: vorzeitig", „Nein: nach 1 Monat", „Ja: nach bis zu
     2 Monaten").
4. **Mehrwege-Entscheidungen aufteilen** in aufeinanderfolgende
   Ja/Nein-Fragen (z.B. DSGVO Art. 34 III: erst lit. a/b, dann lit. c).
5. **Keine Rückkanten.** Schleifen zu früheren Schritten werden immer zu
   langen Bögen. Stattdessen einen (gelben) Endknoten, z.B. „Beanstandung
   wird dem Versender mitgeteilt".
6. **Weitreichende lane-übergreifende Kanten in den Text verlagern.** Wirkt
   ein Akteur auf eine Entscheidung weit unten ein, seine Mitwirkung ins
   Label der Entscheidung aufnehmen und nur die Kante des zuletzt handelnden
   Akteurs behalten (z.B. GwG: Untersagung durch die FIU nach §40 im Label
   der Fristentscheidung, Kante nur von der Staatsanwaltschaft).
7. **Bedingte Fortsetzung über beschriftete Kanten.** Hängt der weitere Weg
   davon ab, über welchen Zweig ein gemeinsamer Knoten erreicht wurde, die
   Kante beschriften statt den Knoten zu duplizieren, z.B.
   `meldung -->|"Transaktion<br/>angehalten"| frist`.
8. **„Nichts passiert"-Zweige an den nächsten Akteur übergeben.** Ein
   solcher Zweig kann als beschriftete Kante direkt zum nächsten
   handelnden Akteur führen, statt einen zusätzlichen Endknoten in der Lane
   anzulegen (z.B. DSGVO: „Nein: keine Benachrichtigung" direkt zur
   Entscheidung der Aufsichtsbehörde).
9. **Fristentscheidungen in die Lane der wartenden Partei.** Wartet ein
   Akteur auf die Reaktion eines anderen (z.B. ArbnErfG §16 II: Arbeitgeber
   wartet 3 Monate auf das Übertragungsverlangen), die Entscheidung
   „binnen Frist reagiert?" in die Lane des Wartenden legen. Liegt sie in
   der Lane des Reagierenden, läuft der „Nein"-Zweig oft unten herum
   zurück.
10. **Empfangsknoten in der Ziel-Lane.** Läuft eine Übergabe an eine Lane,
    deren erster Knoten eine Entscheidung ist, kann ein kurzer Knoten wie
    „Antrag geht ein" davor eine Kante verhindern, die über den ganzen
    Diagrammkopf läuft (BetrVG §§99, 100: Arbeitsgericht).
11. **Selten genutzte Lanes an den Rand.** Eine Lane, die erst ganz am Ende
    einen Knoten bekommt (z.B. LkSG: Öffentliche Auftraggeber), als erste
    oder letzte Lane anlegen; dann kreuzt nur eine gerade Kante eine leere
    Nachbar-Lane statt mehrerer.
12. **Gerichtliche Nebenverfahren als gestrichelte Kante zu einem
    Ergebnisknoten** (z.B. BetrVG §102 V S.2: „auf Antrag des AG" →
    „Entbindung per einstweiliger Verfügung, wenn …"), statt einer
    Ja/Nein-Raute in der Gerichts-Lane, die fast immer lange Umlaufkanten
    erzeugt.
13. **Wartezeiten ins Kantenlabel** statt als eigener Knoten, z.B. IFG
    §8 II S.2: `-->|"Ja: zwei Wochen nach<br/>Bekanntgabe der Anordnung"|`.
14. **Gemeinsam handelnde Akteure in eine Lane**, wenn sie im Verfahren nur
    zusammen auftreten (z.B. BetrVG §76: „Arbeitgeber und Betriebsrat"
    gegenüber der Einigungsstelle). Spart Lane-Wechsel.

## Rechtslogik geht vor

- Layout-Umbauten dürfen die Prüfreihenfolge nicht verändern: Voraussetzungen
  vor Folgefragen (z.B. GwG: „Betrifft der Sachverhalt eine Transaktion?"
  vor §46 II „Aufschub unmöglich?").
- Beim Zusammenfassen oder Kürzen keine Formulierungen ergänzen, die nicht
  im Normtext stehen, und keine Tatbestandsmerkmale weglassen (z.B.
  „unerlaubten Umgangs mit Cannabis _oder Vermehrungsmaterial_").
- Beim Einarbeiten von Hinweisen die Verweise dem richtigen Knoten zuordnen
  (z.B. §40 II zur Voraussetzung, §40 III S.3 zum Ausschlussgrund).

## Rendern und prüfen

Aus dem Repo-Root:

```sh
node .claude/skills/gesetz-visualisieren/render-check.mjs \
  src/content/ki-visualisierungen/{Abkuerzung}/{slug}.mmd \
  <scratchpad>/{Abkuerzung}/{slug}.png
```

Das Skript nutzt die im Repo installierte Mermaid-Version mit derselben
Konfiguration wie `_Wizard.svelte` (inkl. `wrappingWidth`: 400px für
TD-Diagramme, 200px für `flowchart LR`). Chromium startet nicht in der Sandbox
(Mach-Port-Registrierung wird verweigert) — den Befehl außerhalb der
Sandbox ausführen. Danach das PNG ansehen und prüfen:

- Verlaufen Kanten durch fremde Lanes oder den Diagrammrand?
- Stehen Endzustände direkt bei ihrer Entscheidung?
- Kommen Kanten „aus dem Nichts" (von oben/links außerhalb der Knoten)?

Nachbessern, erneut rendern, bis nur noch kurze, lokale Kanten übrig sind.
Ein verbleibender langer, aber gerader Pfeil ist in Ordnung, wenn er einen
echten zeitlichen Abstand abbildet (z.B. Wartefrist parallel zu Schritten
anderer Akteure).
