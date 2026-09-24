var e=`---
summary: "Zeigt die Beschlagnahme von Beweismitteln nach §26 DDG mit Koordinierungsstelle bzw. zuständiger Behörde, Betroffenen und Amtsgericht: Bekanntgabe, Pflicht zur Beantragung der gerichtlichen Bestätigung binnen drei Tagen und das jederzeitige Antragsrecht der Betroffenen."
---
swimlane-beta TD
    subgraph BH["Koordinierungsstelle für digitale Dienste / zuständige Behörde"]
        start(["Beschlagnahme von Gegenständen, die als<br/>Beweismittel für die Ermittlung von<br/>Bedeutung sein können — <a href='{{ELI}}#art-z26_abs-z1' target='_blank' rel='noopener'>§26 I S.1</a>"])
        bekanntgabe["Unverzügliche Bekanntgabe an die<br/>Betroffenen — <a href='{{ELI}}#art-z26_abs-z1' target='_blank' rel='noopener'>§26 I S.2</a>;<br/>Belehrung über das Antragsrecht — <a href='{{ELI}}#art-z26_abs-z2' target='_blank' rel='noopener'>§26 II<br/>S.2</a>"]
        anwesend{"Bei der Beschlagnahme weder<br/>Betroffene/r noch erwachsene/r<br/>Angehörige/r anwesend (Nr.1)<br/>oder ausdrücklicher<br/>Widerspruch der/des<br/>Betroffenen bzw. bei<br/>Abwesenheit einer/eines<br/>erwachsenen Angehörigen<br/>(Nr.2)? — <a href='{{ELI}}#art-z26_abs-z1' target='_blank' rel='noopener'>§26 I S.3</a>"}
        keinBestaetigungsantrag(["Kein Antrag auf gerichtliche Bestätigung<br/>erforderlich"])
        bestaetigungsantrag["Antrag auf gerichtliche Bestätigung<br/>innerhalb von drei Tagen — <a href='{{ELI}}#art-z26_abs-z1' target='_blank' rel='noopener'>§26 I S.3</a>"]
    end

    subgraph BT["Betroffene/r"]
        antrag["Kann jederzeit eine gerichtliche<br/>Entscheidung beantragen — <a href='{{ELI}}#art-z26_abs-z2' target='_blank' rel='noopener'>§26 II S.1</a>"]
    end

    subgraph AG["Amtsgericht"]
        bestaetigung(["Gerichtliche Bestätigung durch das<br/>Amtsgericht, in dessen Bezirk die<br/>Beschlagnahme stattgefunden hat — <a href='{{ELI}}#art-z26_abs-z1' target='_blank' rel='noopener'>§26 I<br/>S.3</a>"])
        entscheidung["Das nach Abs. 1 S.3 zuständige Gericht<br/>entscheidet über den Antrag — <a href='{{ELI}}#art-z26_abs-z2' target='_blank' rel='noopener'>§26 II S.3</a>"]
        beschwerde(["Gegen die gerichtliche Entscheidung ist<br/>die Beschwerde zulässig; §§306-310 und<br/>§311a StPO gelten entsprechend — <a href='{{ELI}}#art-z26_abs-z2' target='_blank' rel='noopener'>§26 II<br/>S.4, 5</a>"])
    end

    start --> bekanntgabe
    bekanntgabe --> anwesend
    bekanntgabe -.->|"jederzeit"| antrag
    anwesend -->|Nein| keinBestaetigungsantrag
    anwesend -->|Ja| bestaetigungsantrag
    bestaetigungsantrag --> bestaetigung
    antrag -.->|Antrag| entscheidung
    entscheidung --> beschwerde
    keinBestaetigungsantrag ~~~ bestaetigungsantrag

    style keinBestaetigungsantrag fill:#d4edda,stroke:#2d8a4a
    style bestaetigung fill:#fff3cd,stroke:#c9a227
    style beschwerde fill:#fff3cd,stroke:#c9a227
`;export{e as default};