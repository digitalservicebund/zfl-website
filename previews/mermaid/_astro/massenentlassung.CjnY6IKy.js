var e=`---
summary: "Stellt den Ablauf einer Massenentlassungsanzeige nach dem KSchG dar: Unterrichtung und Beratung mit dem Betriebsrat, Anzeige bei der Agentur für Arbeit und die anschließende Sperrfrist bis zur Wirksamkeit der Entlassungen."
---
swimlane-beta TD
    subgraph AG["Arbeitgeber"]
        start(["Beabsichtigt anzeigepflichtige Entlassung<br/>(Schwellenwerte) — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a>"])
        unterrichtung["Rechtzeitige schriftliche Unterrichtung des BR<br/>(Gründe, Zahl/Berufsgruppen, Zeitraum,<br/>Auswahl-/Abfindungskriterien) — <a href='{{ELI}}#art-z17_abs-z2' target='_blank' rel='noopener'>§17 II</a>"]
        beratung["Beratung: Vermeidung/Einschränkung<br/>der Entlassungen, Folgenmilderung — <a href='{{ELI}}#art-z17_abs-z2' target='_blank' rel='noopener'>§17 II S.2</a>"]
        anzeigeMit["Anzeige samt Stellungnahme des BR — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III S.2</a>"]
        anzeigeOhne["Anzeige mit Glaubhaftmachung:<br/>BR mind. 2 Wochen vorher unterrichtet,<br/>Stand der Beratungen dargelegt — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III S.3</a>"]
        abschriftAnzeige["Abschrift der Anzeige an BR — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III S.6</a>"]
        vorzeitig["Entlassungen können<br/>vorzeitig wirksam werden"]
        einMonat["Entlassungen erst nach Ablauf<br/>eines Monats wirksam — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"]
        zweiMonate["Entlassungen erst nach Ablauf<br/>von bis zu 2 Monaten wirksam — <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a>"]
        frist90{"Innerhalb 90 Tagen nach<br/>Zulässigkeit durchgeführt? — <a href='{{ELI}}#art-z18_abs-z4' target='_blank' rel='noopener'>§18 IV</a>"}
        erledigt(["Entlassungen durchgeführt"])
        erneut(["Erneute Anzeige erforderlich — <a href='{{ELI}}#art-z18_abs-z4' target='_blank' rel='noopener'>§18 IV</a>"])
    end

    subgraph BR["Betriebsrat"]
        beratungsergebnis("Beratungsergebnis")
        stellungnahme{"Schriftliche Stellungnahme<br/>abgegeben? — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III S.2</a>"}
        weitereStellungnahme["Weitere Stellungnahme an AfA,<br/>Abschrift an AG — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III S.7</a>"]
    end

    subgraph AfA["Agentur für Arbeit"]
        abschriftMitteilung("Abschrift der Mitteilung an BR<br/>(mind. Angaben Nr. 1-5) — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III S.1</a>")
        eingang["Eingang der Anzeige:<br/>Sperrfrist beginnt — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"]
        zustimmung{"Zustimmung vor<br/>Fristablauf? — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"}
        verlaengerung{"Verlängerung im<br/>Einzelfall? — <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a>"}
    end

    start --> unterrichtung
    unterrichtung -.-> abschriftMitteilung
    unterrichtung --> beratung
    beratung --> beratungsergebnis
    beratungsergebnis --> stellungnahme
    stellungnahme -->|Ja| anzeigeMit
    stellungnahme -->|Nein| anzeigeOhne
    anzeigeMit --> eingang
    anzeigeOhne --> eingang
    anzeigeMit --> abschriftAnzeige
    anzeigeOhne --> abschriftAnzeige
    abschriftAnzeige -.->|optional| weitereStellungnahme
    weitereStellungnahme -.-> zustimmung
    eingang --> zustimmung
    zustimmung -->|"Ja (ggf. rückwirkend<br/>bis Antragstellung)"| vorzeitig
    zustimmung -->|Nein| verlaengerung
    verlaengerung -->|Nein| einMonat
    verlaengerung -->|Ja| zweiMonate
    vorzeitig --> frist90
    einMonat --> frist90
    zweiMonate --> frist90
    frist90 -->|Ja| erledigt
    frist90 -->|Nein| erneut
`;export{e as default};