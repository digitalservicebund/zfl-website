var e=`---
summary: "Zeigt die Anhörung des Betriebsrats vor jeder Kündigung: Mitteilung der Gründe durch den Arbeitgeber, Fristen für Bedenken und Widerspruch des Betriebsrats und den Weiterbeschäftigungsanspruch des Arbeitnehmers bis zum Abschluss des Kündigungsschutzprozesses."
---
swimlane-beta TD
    subgraph AG["Arbeitgeber"]
        start(["Kündigung eines Arbeitnehmers<br/>beabsichtigt"])
        anhoerung["Anhörung des Betriebsrats:<br/>Mitteilung der Kündigungsgründe — <a href='{{ELI}}#art-z102_abs-z1' target='_blank' rel='noopener'>§102 I S.1-2</a><br/>(ohne Anhörung ausgesprochene<br/>Kündigung unwirksam — <a href='{{ELI}}#art-z102_abs-z1' target='_blank' rel='noopener'>§102 I S.3</a>)"]
        kuendigung(["Kündigung kann ausgesprochen werden<br/>(kein Weiterbeschäftigungsanspruch<br/>nach <a href='{{ELI}}#art-z102_abs-z5' target='_blank' rel='noopener'>§102 V</a>)"])
    end

    subgraph BR["Betriebsrat"]
        stellungnahme["Bedenken schriftlich mit Gründen:<br/>ordentliche Kündigung: binnen 1 Woche,<br/>außerordentliche: unverzüglich, max. 3 Tage — <a href='{{ELI}}#art-z102_abs-z2' target='_blank' rel='noopener'>§102 II S.1, S.3</a><br/>(soll ggf. vorher den AN hören — <a href='{{ELI}}#art-z102_abs-z2' target='_blank' rel='noopener'>§102 II S.4</a>;<br/>Schweigen bei ordentlicher Kündigung<br/>= Zustimmung — <a href='{{ELI}}#art-z102_abs-z2' target='_blank' rel='noopener'>§102 II S.2</a>)"]
        widerspruch{"Fristgerechter Widerspruch<br/>gegen ordentliche Kündigung<br/>(Gründe Nr. 1-5)? — <a href='{{ELI}}#art-z102_abs-z3' target='_blank' rel='noopener'>§102 III</a>"}
    end

    subgraph AN["Arbeitnehmer"]
        erhalt("Erhält Kündigung mit Abschrift<br/>der Stellungnahme des BR — <a href='{{ELI}}#art-z102_abs-z4' target='_blank' rel='noopener'>§102 IV</a>")
        klage{"KSchG-Klage erhoben und<br/>Weiterbeschäftigung<br/>verlangt? — <a href='{{ELI}}#art-z102_abs-z5' target='_blank' rel='noopener'>§102 V S.1</a>"}
        keinAnspruch(["Kein Weiterbeschäftigungs-<br/>anspruch nach <a href='{{ELI}}#art-z102_abs-z5' target='_blank' rel='noopener'>§102 V</a>"])
        weiterbeschaeftigung(["Weiterbeschäftigung nach Ablauf der<br/>Kündigungsfrist bis zum rechtskräftigen<br/>Abschluss, zu unveränderten<br/>Arbeitsbedingungen — <a href='{{ELI}}#art-z102_abs-z5' target='_blank' rel='noopener'>§102 V S.1</a>"])
    end

    subgraph ArbG["Arbeitsgericht"]
        gericht(["Entbindung per einstweiliger Verfügung,<br/>wenn Klage aussichtslos oder mutwillig,<br/>unzumutbare wirtschaftliche Belastung<br/>oder Widerspruch offensichtlich<br/>unbegründet — <a href='{{ELI}}#art-z102_abs-z5' target='_blank' rel='noopener'>§102 V S.2 Nr. 1-3</a>"])
    end

    start --> anhoerung
    anhoerung --> stellungnahme
    stellungnahme --> widerspruch
    widerspruch -->|"Nein: Zustimmung,<br/>Bedenken oder Schweigen"| kuendigung
    widerspruch -->|"Ja: Kündigung trotz<br/>Widerspruch"| erhalt
    erhalt --> klage
    klage -->|Nein| keinAnspruch
    klage -->|Ja| weiterbeschaeftigung
    weiterbeschaeftigung -.->|"auf Antrag<br/>des AG"| gericht


    style kuendigung fill:#fff3cd,stroke:#c9a227
    style weiterbeschaeftigung fill:#d4edda,stroke:#2d8a4a
    style gericht fill:#fff3cd,stroke:#c9a227
    style keinAnspruch fill:#fff3cd,stroke:#c9a227
`;export{e as default};