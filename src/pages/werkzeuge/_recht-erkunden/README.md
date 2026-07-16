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

1. **Begriffe im Fokus (Strip).** Ein gleichmäßiges Karten-Raster für die
   gemeinsamen Begriffe, die aus den aktiven Normen abgeleitet sind (Abwählen
   einer Norm entfernt ihre Begriffe). Jede Karte ist vollständig anklickbar
   (öffnet die Sidebar im Begriff-Modus) und fasst den Begriff als
   Kurzüberblick zusammen: Begriffsname, gekürzte Definition, definierende
   Norm („Definiert in …") sowie die Anzahl und die verbundenen Gesetze als
   Chips mit Hierarchie-Badge. Die Sidebar liefert dann die vollständige
   Definition, die definierende Norm im Volltext und alle nutzenden Normen.
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
  alle nutzenden Normen/Gesetze.
- **Evidenz-Modus** (aus einer Matrix-Zelle): Gesetzestitel + Hierarchie-Badge,
  Relevanzgrund, betroffene SGB-II-Normen (je anklickbar → Norm-Modus) und – je
  Verbindung – ein zusammenhängender Nachweis-Block. Dessen Überschrift richtet
  sich nach dem Relevanzgrund (_Verweisung(en)_, _Fundstelle(n)_ bzw.
  _Thematische Überschneidung(en)_). Jeder Block ist eine Karte, die Quelle,
  Begründung und referenzierte Normen visuell zusammenfasst: Bei _Gemeinsame
  Nennung_ steht oben die Fundstelle (Urteil/Literatur) mit einem Tag
  (Rechtsprechung/Literatur) und Link, darunter die Begründung, darunter die
  referenzierten Normen mit eigenem Link und ausklappbarem Volltext. Bei
  _Thematische Nähe_ zeigt die Sidebar zusätzlich die ermittelten Themen als
  Schlagwörter.

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
| **Rechtsprechung & Literatur** | Ko-Zitation in Urteilen/Literatur | explizite Zitate          |
| **Thematische Nähe**           | überlappendes Themenfeld          | **NLP** (Textähnlichkeit) |

Geteilte definierte Begriffe sind kein eigener Relevanzgrund in der Matrix,
sondern werden ausschließlich im Begriffe-Strip (Schritt 2.1) samt ihrer
verbundenen Gesetze dargestellt.

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
- **Vorführbeispiel:** Das Rechtsgebiet **„Leistungen zur Sicherung des
  Lebensunterhalts (Bürgergeld)"** (§§ 7, 8, 9, 19, 20 SGB II) ist als
  durchgehend belastbarer Demonstrationsfall ausgearbeitet: Die Matrix ist über
  alle fünf Hierarchieebenen (GG → EuGH/VO 883/2004 & RL 2004/38 → mehrere
  Bundesgesetze → Bürgergeld-V/RBSFV → Landesrecht) und alle drei Relevanzgründe
  gefüllt. Alle Verknüpfungen bleiben Beispieldaten, orientieren sich aber an
  real existierenden Bezügen (z. B. Existenzminimum-Rechtsprechung des BVerfG,
  Dano/Alimanovic beim EuGH, Verweis des § 20 Abs. 1a SGB II auf RBEG/RBSFV).
- **~23** Verbindungen zu angrenzenden Gesetzen über die drei Matrix-Relevanzgründe.
- **7** geteilte Begriffe: drei im Gesetz selbst definierte (Bedarfsgemeinschaft,
  Erwerbsfähigkeit, Regelbedarf) sowie **anderswo definierte** Begriffe, die in
  den betrachteten Normen genutzt werden (Einkommen → § 11 SGB II, Vermögen →
  § 12 SGB II, Angemessenheit der Unterkunft, Mitwirkungspflicht → § 60 SGB I).
  Jeder Begriff trägt Definition, definierende Norm und Nutzung über SGB-II- und
  angrenzende Normen; die Begriffe sind kongruent zu den Normtexten gewählt
  (z. B. „Einkommen"/„Vermögen" in §§ 9, 19 SGB II).

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

- **Begriff-Modus** gruppiert die Nutzungen aktuell nicht nach Hierarchie
  (flache Liste).
- Keine Unit-/E2E-Tests für den Prototyp; Prüfung über `pnpm typecheck`,
  `pnpm lint` und manuelle Sichtung im Dev-Server.

Bei Änderungen an Flow, Datenmodell oder Dateilayout dieses Dokument im selben
Change mit-aktualisieren (siehe Regel in `AGENTS.md`).
