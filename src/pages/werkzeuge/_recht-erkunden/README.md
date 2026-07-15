# Recht erkunden — Prototyp

> **Status:** Staging-only-Prototyp. Alle Verbindungen, Zitate, Volltexte und
> Ähnlichkeits-Werte sind **erfundene Beispieldaten** und **nicht rechtlich
> geprüft**. Gesetzesnamen und Normbezeichnungen sind real, die Verknüpfungen
> zwischen ihnen sind es nicht. Vollständig ausgearbeitet ist nur **SGB II**.

Team-Doku und laufende Referenz für den angestrebten Flow dieses Prototyps.

## Zweck

Ein explorationsorientierter Ansatz für Gesetzesvorhaben: Ausgehend von dem
Gesetz, das ein Vorhaben ändern will, arbeitet man sich zu den konkreten Normen
im Änderungsumfang vor (**„Zu änderndes Recht"**) und entdeckt anschließend das
umliegende Rechtsumfeld (**„Angrenzendes Recht"**) — strukturiert danach,
_warum_ ein Gesetz relevant ist und _wo_ es in der Normenhierarchie sitzt.

Der Prototyp _imitiert_ die Ausgabe einer NLP-/Zitations-Pipeline über
Beispieldaten; die Pipeline selbst ist ausdrücklich nicht Teil des Prototyps
(siehe [Pipeline-Kontext](#pipeline-kontext-out-of-scope)).

## Ansehen

```sh
pnpm dev
```

Dann `/werkzeuge/recht-erkunden` öffnen. Die Seite ist `isStagingOnly` und
`sitemap: false`, erscheint also nicht in Produktion und nicht in der Suche; im
Dev-Server ist sie sichtbar. Ein gelber Hinweis-Banner kennzeichnet sie als
illustrativen Prototyp mit Beispieldaten.

## Angestrebter Ablauf

Der Ablauf ist in **zwei Schritte** mit Teilschritten gegliedert, alles auf
einer Seite; spätere Schritte erscheinen erst, wenn die vorherige Auswahl
getroffen ist. Das Ändern von Gesetz oder Rechtsgebiet setzt nachgelagerten
Zustand zurück und schließt die Detail-Sidebar.

### Schritt 1 — Zu änderndes Recht bestimmen

1. **Gesetz suchen.** Suchfeld über einer kleinen, fest hinterlegten Liste
   echter Gesetze (SGB II, SGB III, ArbSchG, BDSG, SGB XII, GG). Nur **SGB II**
   trägt vollständige Daten; bei jedem anderen Gesetz erscheint ein
   freundlicher Hinweis („Für dieses Gesetz liegen noch keine Analysedaten
   vor …") mit einem Shortcut zu SGB II.
2. **Rechtsgebiet wählen.** Nach Auswahl von SGB II erscheinen fünf
   Karten-Rechtsgebiete des Gesetzbuchs (im echten System per Textanalyse
   ermittelt — hier Beispieldaten, gekennzeichnet über ein Info-Popover). Jede
   Karte zeigt Kurzbeschreibung und Normenzahl.
3. **Normen auswählen.** Die Normen des gewählten Rechtsgebiets werden als
   ab-/anwählbare Zeilen gelistet (Titel + Einzeiler). Alle starten aktiv;
   Abwählen einer Norm grenzt Schritt 2 live ein (Verbindungen ohne aktive Norm
   verschwinden). Jede Norm bietet eine „Volltext"-Ausklappung und öffnet auf
   Klick die Sidebar im **Norm-Modus**.

### Schritt 2 — Angrenzendes Recht erkunden

1. **Begriffe im Fokus (Strip).** Eine Chip-Reihe der gemeinsamen Begriffe, die
   aus den aktiven Normen abgeleitet sind (Abwählen einer Norm entfernt ihre
   Begriffe).
2. **Relevantes Recht explorieren (Matrix).**
   - **Zeilen = Normenhierarchie** (fünf Ebenen, siehe unten)
   - **Spalten = Relevanzgrund** (siehe unten)
   - Zellen enthalten kompakte Gesetzes-Chips; ein Klick öffnet die Sidebar im
     **Evidenz-Modus**. Leere Zellen zeigen einen gedämpften Bindestrich,
     Zeilen-/Spaltenköpfe tragen Zähler. Auf Desktop ein CSS-Grid, auf schmalen
     Bildschirmen gestapelte Hierarchie-Abschnitte mit Relevanzgrund-Untergruppen.

### Detail-Sidebar (drei Modi)

Ein einziges Panel (Desktop: sticky; Mobile: Slide-over) mit drei Inhalten je
nach Auslöser:

- **Norm-Modus** (aus Schritt 1): Referenz, Titel, Volltext der SGB-II-Norm.
- **Begriff-Modus** (aus dem Strip): Begriff, Definition, definierende Norm und
  alle nutzenden Normen/Gesetze mit Hierarchie-Badge.
- **Evidenz-Modus** (aus einer Matrix-Zelle): Gesetzestitel + Hierarchie-Badge,
  Relevanzgrund, betroffene SGB-II-Normen (je anklickbar → Norm-Modus) und die
  Begründung pro Verbindung. Bei _Gemeinsame Nennung_ zusätzlich die
  Fundstelle (Urteil/Literatur) mit Link und ausklappbarem Volltext. Bei
  _Thematische Nähe_ zusätzlich das NLP-Signal (Ähnlichkeitswert + Keywords).

## Schlüsselkonzepte

### Normenhierarchie — 5 Ebenen

1. Grundgesetz
2. EU-Recht
3. Bundesgesetze
4. Bundesverordnungen
5. Landesrecht

### Relevanzgründe

| Grund                          | Woher                             | Basis                     |
| ------------------------------ | --------------------------------- | ------------------------- |
| **Verweisung**                 | Norm zitiert / wird zitiert       | explizite Zitate          |
| **Begriffe**                   | geteilter definierter Begriff     | explizite Zitate          |
| **Thematische Nähe**           | überlappendes Themenfeld          | **NLP** (Textähnlichkeit) |
| **Rechtsprechung & Literatur** | Ko-Zitation in Urteilen/Literatur | explizite Zitate          |

Nur **Thematische Nähe** beruht auf NLP-Ähnlichkeit und trägt ein
Ähnlichkeitssignal (Score + Keywords). Alle anderen Gründe beruhen auf
expliziten Normverweisen und tragen keinen Score.

## Pipeline-Kontext (out of scope)

Im echten System würde eine Pipeline die Signale mischen: **Zitationsextraktion**
für explizite Verbindungen (Norm-zu-Norm-Verweise, Normzitate in Urteilen und
Literatur) und **NLP** für die unscharfen (Embedding-/word2vec-Ähnlichkeit,
TF-IDF, Keyword-Extraktion — auch für das Clustern der Rechtsgebiete in
Schritt 1). Der Prototyp bildet nur die _Ausgabe_ nach; die Pipeline zu
entwerfen ist explizit nicht Teil davon. Die UI macht sichtbar, wo NLP-abgeleitete
vs. zitationsabgeleitete Relevanz auftauchen würde.

## Umfang der Beispieldaten

- **1** vollständiges Gesetz (SGB II); 5 weitere nur als Suchtreffer ohne Daten.
- **5** Rechtsgebiete (Lebensunterhalt, Eingliederung, KdU, Sanktionen,
  Verfahren/Datenschutz).
- **~17** Verbindungen zu angrenzenden Gesetzen über die vier Relevanzgründe.
- **5** geteilte Begriffe (Bedarfsgemeinschaft, Erwerbsfähigkeit, Regelbedarf,
  Angemessenheit der Unterkunft, Mitwirkungspflicht) mit Definition,
  definierender Norm und Nutzung über SGB-II- und angrenzende Normen.

## Implementierung (Überblick)

```
src/pages/werkzeuge/
  recht-erkunden.astro          # Route: Layout, Hero, Hinweis-Banner
  _recht-erkunden/              # nicht geroutet (Unterstrich-Präfix)
    README.md                   # dieses Dokument
    data.ts                     # typisierter Beispiel-Datensatz
    store.ts                    # Alpine-Komponente `rechtErkunden`
    styles.ts                   # geteilte tv()-Slots
    Step1RechtBestimmen.astro   # Schritt 1: Suche → Gebiet → Normen
    Step2RechtErkunden.astro    # Schritt 2: Begriffe-Strip + Matrix
    DetailSidebar.astro         # Sidebar (Norm-/Begriff-/Evidenz-Modus)
    NormDisplay.astro           # feature-scoped Norm-Darstellung
    InfoPopover.astro           # feature-scoped Info-Popover
```

Die Daten werden typisiert über den Store importiert (kein `define:vars`-/
`window.__`-Muster, kein Fetch).

## Bekannte Abweichungen & Vereinfachungen

- **Begriffe-Spalte in der Matrix.** Begriffsbasierte Verbindungen existieren
  aktuell doppelt: als `reason: "begriff"`-Relationen (Matrix-Spalte) und als
  `TERMS`-Einträge (Strip) — mit Drift-Risiko, da `TERMS` bereits mehr Details
  enthalten. Zielbild: Spalte entfernen, Begriffe-Strip stattdessen um die
  verbundenen Gesetzes-Chips (mit Hierarchie-Badge) erweitern.
- **Begriff-Modus** gruppiert die Nutzungen aktuell nicht nach Hierarchie
  (flache Liste mit Badge je Eintrag).
- Keine Unit-/E2E-Tests für den Prototyp; Prüfung über `pnpm typecheck`,
  `pnpm lint` und manuelle Sichtung im Dev-Server.

Bei Änderungen an Flow, Datenmodell oder Dateilayout dieses Dokument im selben
Change mit-aktualisieren (siehe Regel in `AGENTS.md`).
