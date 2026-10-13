var e=`---
summary: "Das Indizierungsverfahren der Prüfstelle für jugendgefährdende Medien nach §§21, 23 und 25 JuSchG mit antragstellender Stelle, zentraler Aufsichtsstelle der Länder und Betroffenen: vom Antrag über Anhörung und vereinfachtes Verfahren bis zur Zustellung und Klage."
---
swimlane-beta TD
    subgraph AS["Antragsberechtigte oder anregende Stelle"]
        antrag("Antrag einer antragsberechtigten Stelle<br/>— <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 II</a> — oder Anregung einer anderen<br/>Behörde oder eines anerkannten Trägers<br/>der freien Jugendhilfe, wenn der Vorsitz<br/>das Verfahren im Interesse des<br/>Jugendschutzes für geboten hält — <a href='{{ELI}}#art-z21_abs-z4' target='_blank' rel='noopener'>§21 IV</a>")
        klageBehoerde(["Klage der antragstellenden Behörde im<br/>Verwaltungsrechtsweg gegen die<br/>Nichtaufnahme — <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 II</a>"])
    end

    subgraph ZAS["Zentrale Aufsichtsstelle der Länder für den Jugendmedienschutz"]
        stellungZAS["Vor Aufnahme eines digitalen Dienstes:<br/>Gelegenheit zur unverzüglichen<br/>Stellungnahme;<br/>Prüfstelle berücksichtigt sie<br/>maßgeblich, ohne Stellungnahme nach 5<br/>Werktagen Entscheidung möglich — <a href='{{ELI}}#art-z21_abs-z6' target='_blank' rel='noopener'>§21 VI</a>"]
    end

    subgraph PS["Prüfstelle für jugendgefährdende Medien"]
        vonAmts(["Tätigwerden von Amts wegen auf<br/>Veranlassung des Vorsitzes (z.B.<br/>Inhaltsgleichheit zweifelhaft,<br/>Aufnahmevoraussetzungen entfallen) — <a href='{{ELI}}#art-z21_abs-z5' target='_blank' rel='noopener'>§21<br/>V</a>"])
        offensichtlich{"Listenaufnahme oder Streichung<br/>offensichtlich nicht in<br/>Betracht? — <a href='{{ELI}}#art-z21_abs-z3' target='_blank' rel='noopener'>§21 III</a>"}
        eingestellt(["Vorsitz kann das Verfahren einstellen<br/>— <a href='{{ELI}}#art-z21_abs-z3' target='_blank' rel='noopener'>§21 III</a> (Klage der antragstellenden<br/>Behörde möglich — <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 II</a>)"])
        vereinfacht{"Vereinfachtes Verfahren:<br/>Medium offensichtlich<br/>jugendgefährdend (Nr. 1) oder<br/>digitaler Dienst auf Antrag<br/>oder nach Stellungnahme der<br/>zentralen Aufsichtsstelle (Nr.<br/>2)? (nicht für Aufnahme nach<br/>§22 — <a href='{{ELI}}#art-z23_abs-z2' target='_blank' rel='noopener'>§23 II</a>)<br/>— <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I S.1</a>"}
        einstimmig{"Einstimmige Entscheidung durch<br/>Vorsitz und zwei weitere<br/>Mitglieder (eines aus den<br/>Gruppen des §19 II Nr. 1-4)?<br/>— <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I S.2-3</a>"}
        zustellung["Zustellung an Urheber,<br/>Nutzungsrechtsinhaber bzw. Anbieter und<br/>antragstellende Behörde mit<br/>Verbreitungs- und Werbebeschränkungen;<br/>Begründung beifügen oder binnen einer<br/>Woche nachreichen; Übermittlung u.a. an<br/>zentrale Aufsichtsstelle — <a href='{{ELI}}#art-z21_abs-z8' target='_blank' rel='noopener'>§21 VIII</a>"]
    end

    subgraph PV["Prüfstelle in voller Besetzung"]
        voll["Entscheidung in voller Besetzung — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I<br/>S.4</a>, <a href='{{ELI}}#art-z19_abs-z5' target='_blank' rel='noopener'>§19 V</a>; Listenaufnahme mit<br/>Zwei-Drittel-Mehrheit — <a href='{{ELI}}#art-z19_abs-z6' target='_blank' rel='noopener'>§19 VI</a>"]
        vollNachAntrag["Entscheidung in voller Besetzung — <a href='{{ELI}}#art-z23_abs-z3' target='_blank' rel='noopener'>§23<br/>III</a>"]
    end

    subgraph BT["Urheber, Nutzungsrechtsinhaber, Anbieter (Betroffene)"]
        anhoerung["Gelegenheit zur Stellungnahme, soweit<br/>Anschriften bekannt oder mit zumutbarem<br/>Aufwand ermittelbar — <a href='{{ELI}}#art-z21_abs-z7' target='_blank' rel='noopener'>§21 VII</a>"]
        antragVoll{"Antrag auf Entscheidung in<br/>voller Besetzung binnen eines<br/>Monats nach Zustellung? — <a href='{{ELI}}#art-z23_abs-z3' target='_blank' rel='noopener'>§23<br/>III</a>"}
        keineKlage(["Klage erst nach Entscheidung in voller<br/>Besetzung — <a href='{{ELI}}#art-z25_abs-z4' target='_blank' rel='noopener'>§25 IV S.2</a>"])
        klage(["Klage im Verwaltungsrechtsweg gegen<br/>Aufnahme oder Ablehnung der Streichung<br/>— <a href='{{ELI}}#art-z25_abs-z1' target='_blank' rel='noopener'>§25 I</a>; gegen den Bund, vertreten durch<br/>die Bundeszentrale — <a href='{{ELI}}#art-z25_abs-z3' target='_blank' rel='noopener'>§25 III</a>;<br/>keine aufschiebende Wirkung — <a href='{{ELI}}#art-z25_abs-z4' target='_blank' rel='noopener'>§25 IV</a>"])
    end

    antrag --> offensichtlich
    vonAmts --> offensichtlich
    offensichtlich -->|Ja| eingestellt
    offensichtlich -->|Nein| anhoerung
    offensichtlich -.->|"Nein, bei digitalem Dienst"| stellungZAS
    stellungZAS -.-> vereinfacht
    anhoerung --> vereinfacht
    vereinfacht -->|Ja| einstimmig
    vereinfacht -->|Nein| voll
    einstimmig -->|"Nein"| voll
    einstimmig -->|"Ja"| zustellung
    voll --> zustellung
    zustellung -->|"nach vereinfachtem Verfahren"| antragVoll
    zustellung -->|"nach voller Besetzung"| klage
    zustellung -.->|"Nichtaufnahme"| klageBehoerde
    antragVoll -->|Ja| vollNachAntrag
    antragVoll -->|Nein| keineKlage
    vollNachAntrag --> klage

    style eingestellt fill:#f8d7da,stroke:#c0392b
    style keineKlage fill:#fff3cd,stroke:#c9a227
    style klage fill:#fff3cd,stroke:#c9a227
    style klageBehoerde fill:#fff3cd,stroke:#c9a227
`;export{e as default};