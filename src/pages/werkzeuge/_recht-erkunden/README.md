# Recht erkunden — Prototyp

> [!WARNING]
> Staging-only-Prototyp. Gesetzesnamen, Normbezeichnungen und viele verlinkte
> Quellen sind real. Die dargestellten Verbindungen, Nachweistexte,
> Textauszüge („Volltexte") und Themen-Keywords sind jedoch **illustrative
> Beispieldaten** und **nicht rechtlich geprüft**. Analysedaten sind
> ausschließlich für **SGB II** hinterlegt; auch dort ist die Abdeckung je
> Rechtsgebiet unterschiedlich.

## Zweck

Ein explorationsorientierter Ansatz für Gesetzesvorhaben: Ausgehend von dem
Gesetz, das ein Vorhaben ändern will, arbeitet man sich zu den konkreten Normen
im Änderungsumfang vor (**„Zu änderndes Recht"**) und entdeckt anschließend das
umliegende Rechtsumfeld (**„Angrenzendes Recht"**) — strukturiert danach,
_warum_ ein Gesetz relevant ist und _wo_ es in der Normenhierarchie sitzt.

> [!NOTE]
> Der Prototyp _imitiert_ die Ausgabe einer NLP-/Zitations-Pipeline über
> Beispieldaten; die Pipeline selbst ist ausdrücklich nicht Teil des Prototyps
> (siehe [Pipeline-Kontext](#pipeline-kontext-out-of-scope)).

## Ansehen

```sh
pnpm dev
```

Dann `/werkzeuge/recht-erkunden` öffnen. Die Seite ist `isStagingOnly` und
`sitemap: false`, erscheint also nicht in Produktion und nicht in der Suche; im
Dev-Server ist sie sichtbar. Ein gelber Hinweis-Banner kennzeichnet sie als
illustrativen Prototyp mit Beispieldaten.

## Annahmen und zu prüfende Hypothesen

Der Prototyp basiert auf folgenden Annahmen. Sie sind keine bereits
validierten Erkenntnisse, sondern sollen durch weitere Tests und Rückmeldungen geprüft
werden:

- Nutzer:innen eines Gesetzesvorhabens kennen in der Regel mindestens das
  Gesetz, das geändert werden soll. Die schrittweise Eingrenzung über Gesetz,
  Rechtsgebiet und konkrete Normen ist verständlicher als der direkte Einstieg
  in ein vollständiges Netz rechtlicher Beziehungen.
- In der frühen Phase eines Gesetzesvorhabens ist es besonders wichtig, den
  nötigen Kontext des angrenzenden Rechts übersichtlich erkundbar zu machen.
- Für die Bewertung angrenzenden Rechts sind zwei Fragen entscheidend:
  _Warum ist etwas relevant?_ und _auf welcher Hierarchieebene liegt es?_
- Nutzer:innen möchten Verbindungen unmittelbar anhand konkreter Normen und
  Quellen nachvollziehen, ohne den aktuellen Explorationskontext zu verlassen.
- Ein fachlich plausibler, durchgängiger Demonstrationsfall ist für die erste
  Bewertung des Interaktionskonzepts wichtiger als eine breite Abdeckung vieler
  Gesetze. Statt sich direkt Gedanken zu machen, wie Daten vollständig
  aufbereitet werden, sollte zuerst Evidenz für Mehrwert der jeweiligen Funktionen
  gesammelt werden.

## Möglicher Ablauf

Der Ablauf ist in **zwei Schritte** mit Teilschritten gegliedert, alles auf
einer Seite; spätere Schritte erscheinen erst, wenn die vorherige Auswahl
getroffen ist. Das Ändern von Gesetz oder Rechtsgebiet setzt nachgelagerten
Zustand zurück und schließt die Detail-Sidebar.

### Schritt 1 — Zu änderndes Recht bestimmen

1. **Gesetz suchen.** Suchfeld über einer kleinen, fest hinterlegten Liste
   echter Gesetze (SGB II, SGB III, ArbSchG, BDSG, SGB XII, GG). Nur **SGB II**
   trägt Analysedaten; bei jedem anderen Gesetz erscheint ein
   freundlicher Hinweis („Für dieses Gesetz liegen noch keine Analysedaten
   vor …") mit einem Shortcut zu SGB II.
2. **Rechtsgebiet wählen.** Nach Auswahl von SGB II erscheinen fünf
   Karten-Rechtsgebiete des Gesetzbuchs (im echten System per Textanalyse
   ermittelt — hier Beispieldaten, gekennzeichnet über ein Info-Popover). Jede
   Karte zeigt Kurzbeschreibung und Normenzahl.
3. **Normen auswählen.** Die Normen des gewählten Rechtsgebiets werden als
   ab-/anwählbare Zeilen gelistet (Titel + Einzeiler). Alle starten aktiv;
   Abwählen einer Norm grenzt Schritt 2 live ein (Verbindungen ohne aktive Norm
   verschwinden). Jede Norm bietet eine „Volltext"-Ausklappung und einen Link
   zur Quelle.

### Schritt 2 — Angrenzendes Recht erkunden

1. **Begriffe im Fokus (Strip).** Ein gleichmäßiges Karten-Raster für
   Begriffe, die mindestens einer aktiven Norm zugeordnet sind
   (Abwählen einer Norm entfernt Begriffe, sobald keine aktive Norm mehr
   zugeordnet ist). Jede Karte ist vollständig anklickbar (öffnet die Sidebar
   im Begriff-Modus) und fasst den Begriff als Kurzüberblick zusammen:
   Begriffsname, gekürzte Definition, definierende Norm („Definiert in …")
   sowie die Anzahl und die verbundenen Gesetze als Chips mit
   Hierarchie-Badge. Die Sidebar liefert dann die Definition, einen Auszug aus
   der definierenden Norm, die ausgewählten SGB-II-Normen und die zugehörigen
   Normen des angrenzenden Rechts.
2. **Relevantes Recht explorieren (Matrix).**
   - **Zeilen = Normenhierarchie** (fünf Ebenen, siehe unten)
   - **Spalten = Relevanzgrund** (siehe unten)
   - Zellen enthalten kompakte Gesetzes-Chips; ein Klick öffnet die Sidebar im
     **Evidenz-Modus**. Leere Zellen zeigen einen gedämpften Bindestrich,
     Zeilen-/Spaltenköpfe tragen Zähler. Auf Desktop ein CSS-Grid, auf schmalen
     Bildschirmen gestapelte Hierarchie-Abschnitte mit Relevanzgrund-Untergruppen.

3. **Detail-Sidebar (aktueller Prototyp).** Ein einziges Panel (Desktop:
   sticky; Mobile: Slide-over) zeigt je nach Auslöser zwei Inhalte:

   - **Begriff-Modus** (aus dem Strip): Begriff, Definition, definierende Norm
     und alle nutzenden Normen/Gesetze.
   - **Evidenz-Modus** (aus einer Matrix-Zelle): Gesetzestitel +
     Hierarchie-Badge, Relevanzgrund, betroffene Normen und ein
     zusammenhängender Nachweis-Block. Im aktuellen Prototyp ist dieser
     norm-/gesetzeszentriert: Seine Überschrift richtet sich nach dem
     Relevanzgrund (_Verweisung(en)_, _Fundstelle(n)_ bzw. _Thematische
     Überschneidung(en)_). Jeder Block ist eine Karte, die Quelle, Begründung
     und referenzierte Normen visuell zusammenfasst: Bei _Gemeinsame Nennung_
     steht oben die Fundstelle (Urteil/Literatur) mit einem Tag
     (Rechtsprechung/Literatur) und Link, darunter die Begründung, darunter die
     referenzierten Normen mit eigenem Link und ausklappbarem Volltext. Bei
     _Thematische Nähe_ zeigt die Sidebar zusätzlich die ermittelten Themen als
     Schlagwörter. Ob Fundstellen und Themen künftig selbst die primäre
     Perspektive der Darstellung sein sollten, ist unter
     [Offene Gestaltungsfragen für Schritt 2](#offene-gestaltungsfragen-für-schritt-2)
     festgehalten.

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

Nur **Thematische Nähe** beruht auf NLP-Ähnlichkeit und trägt automatisch
ermittelte Themen-Keywords. **Verweisungen** beruhen auf direkten
Norm-zu-Norm-Bezügen; **Rechtsprechung & Literatur** auf der Ko-Zitation von
Normen in einer Fundstelle.

### Offene Gestaltungsfragen für Schritt 2

Die aktuelle Aufteilung der Komponenten in Schritt 2 ist eine Arbeitshypothese
und sollte noch einmal grundsätzlich geprüft werden:

- **Begriffe** werden derzeit gesondert dargestellt, weil sie keine
  1:1-Beziehung zwischen zwei Normen beschreiben. Ein Begriff kann mehrere
  Normen innerhalb eines Gesetzes und über Gesetzesgrenzen hinweg verbinden.
- Diese Mehrfachbeziehung besteht jedoch auch bei **Rechtsprechung und
  Literatur** sowie bei **Thematischer Nähe**: Eine Fundstelle oder ein Thema
  kann für mehrere Normen relevant sein – und ist es voraussichtlich in vielen
  Fällen. Die primäre Perspektive könnte hier daher eher die Fundstelle
  beziehungsweise das Thema sein als die einzelne angrenzende Norm.
  Möglicherweise benötigt jeder Relevanzgrund eine eigene, seiner Struktur
  entsprechende Darstellungsform statt einer gemeinsamen Matrixdarstellung.
- Zu prüfen ist außerdem, ob **Thematische Nähe** auf Normebene richtig
  angesiedelt ist oder besser Normencluster miteinander verknüpfen sollte – etwa
  die in Schritt 1 verwendeten Rechtsgebiete – mit anschließendem Drill-down zu
  den einzelnen Normen.
- Auch die Trennung von **Verweisen und Begriffen** ist zu hinterfragen.
  Explizite Normverweise bilden direkte Abhängigkeiten ab, während gemeinsam
  verwendete oder definierte Begriffe indirekte Abhängigkeiten erzeugen können.
  Es ist offen, ob diese Fälle klar trennbar sind oder als unterschiedliche
  Ausprägungen eines gemeinsamen Beziehungsspektrums modelliert werden sollten.
- Gibts es weitere Relevanzgründe, die im Prototyp noch berücksichtigt werden sollten?
- Um welche Funktionalitäten könnte das System noch erweitert werden, um
  die Nutzer:innen noch besser unterstützen zu können?

## Pipeline-Kontext (out of scope)

Im echten System würde eine Pipeline mehrere Signale mischen:
**Zitationsextraktion** für Norm-zu-Norm-Verweise und Normzitate in Urteilen
oder Literatur, **Terminologie- und Definitionserkennung** samt Entity
Resolution für Begriffe sowie **NLP** für unscharfe Ähnlichkeit
(Embeddings/word2vec, TF-IDF, Keyword-Extraktion und Clustering). Der Prototyp
bildet nur die _Ausgabe_ nach; die Pipeline zu entwerfen ist ausdrücklich nicht
Teil davon. Die UI macht sichtbar, aus welcher Art von Signal eine dargestellte
Relevanz stammen würde.

**Thematische Nähe** in Schritt 2 und die **Rechtsgebiete** in Schritt 1 würden
dabei mit ähnlichen Verfahren aus den Normtexten abgeleitet. Der wesentliche
Unterschied liegt derzeit in ihrer Verwendung: Rechtsgebiete gruppieren Normen
innerhalb des Ausgangsgesetzes, während Thematische Nähe Beziehungen zum
angrenzenden Recht beschreibt. Die Begriffe und alle Zuordnungen sind im
Prototyp manuell kuratiert.

## Umfang der Beispieldaten

- **1** Gesetz mit Analysedaten (SGB II); 5 weitere nur als Suchtreffer ohne
  Daten. Die Abdeckung innerhalb des SGB II ist bewusst ungleichmäßig.
- **5** Rechtsgebiete (Lebensunterhalt, Eingliederung, KdU, Sanktionen,
  Verfahren/Datenschutz).
- **Vorführbeispiel:** Das Rechtsgebiet **„Leistungen zur Sicherung des
  Lebensunterhalts (Bürgergeld)"** (§§ 7, 8, 9, 19, 20 SGB II) ist als
  dichtester Demonstrationsfall ausgearbeitet: Die Matrix enthält Verbindungen
  über vier Hierarchieebenen (GG, EU-Recht, Bundesgesetze und
  Bundesverordnungen) und alle drei Relevanzgründe. Der Landesrechts-Fall gehört
  zum Rechtsgebiet KdU. Alle Verknüpfungen bleiben Beispieldaten, orientieren
  sich aber an real existierenden Bezügen (z. B.
  Existenzminimum-Rechtsprechung des BVerfG, Dano/Alimanovic beim EuGH, Verweis
  des § 20 Abs. 1a SGB II auf RBEG/RBSFV).
- **22** Verbindungsdatensätze zu angrenzenden Gesetzen über die drei
  Matrix-Relevanzgründe. Ein Gesetz kann in mehreren Datensätzen vorkommen;
  Zähler in der Matrix zählen derzeit Datensätze, nicht zwingend eindeutige
  Gesetze.
- **7** kuratierte Begriffe: drei sind in Normen des Vorführbeispiels definiert
  (Bedarfsgemeinschaft, Erwerbsfähigkeit, Regelbedarf), drei in anderen
  SGB-II-Normen (Einkommen → § 11, Vermögen → § 12, Angemessenheit der
  Unterkunft → § 22) und einer außerhalb des SGB II (Mitwirkungspflicht → § 60
  SGB I). Jeder Begriff trägt eine Definition, eine definierende Norm und
  manuell zugeordnete Nutzungen in SGB-II- und angrenzenden Normen.

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
    DetailSidebar.astro         # Sidebar (Begriff-/Evidenz-Modus)
    NormDisplay.astro           # feature-scoped Norm-Darstellung
    InfoPopover.astro           # feature-scoped Info-Popover
  _recht-erkunden-bindings.test.ts
                               # Guardrail für Alpine-Template/Store-Bindings
```

Die UI verwendet den lokalen typisierten Datensatz ohne Backend oder Fetch.
Der Binding-Test prüft, ob Alpine-Ausdrücke auf vorhandene Store-Member
verweisen. Er testet weder den vollständigen Nutzerfluss noch die fachliche
Qualität oder Konsistenz der Beispieldaten.

> [!IMPORTANT]
> Bei Änderungen an Flow, Datenmodell oder Dateilayout dieses Dokument im selben
> Change mit-aktualisieren (siehe Regel in `AGENTS.md`).
