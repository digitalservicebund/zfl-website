var e=`---
summary: "Stellt dar, wie Art und Höhe der Erfindervergütung nach Inanspruchnahme geregelt werden: durch Vereinbarung oder, wenn diese nicht zustande kommt, durch Festsetzung des Arbeitgebers, der der Arbeitnehmer binnen zwei Monaten widersprechen kann."
---
swimlane-beta TD
    subgraph AG["Arbeitgeber"]
        start(["Diensterfindung in Anspruch<br/>genommen: Anspruch auf<br/>angemessene Vergütung<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"])
        vereinbarung{"Vereinbarung über Art und<br/>Höhe in angemessener Frist?<br/>(bei mehreren Erfindern für<br/>jeden gesondert — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II</a>)<br/>— <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a>"}
        festgestellt(["Vergütung durch<br/>Vereinbarung festgestellt<br/>— <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a>"])
        festsetzung["Festsetzung durch begründete<br/>Erklärung in Textform und Zahlung<br/>entsprechend der Festsetzung;<br/>spätestens 3 Monate nach<br/>Schutzrechtserteilung<br/>— <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 III</a>"]
        neu(["Festsetzung für alle Beteiligten<br/>nicht verbindlich; Arbeitgeber<br/>darf für alle neu festsetzen<br/>— <a href='{{ELI}}#art-z12_abs-z5' target='_blank' rel='noopener'>§12 V</a>"])
    end

    subgraph AN["Arbeitnehmer"]
        widerspruch{"Widerspruch in Textform<br/>binnen 2 Monaten?<br/>— <a href='{{ELI}}#art-z12_abs-z4' target='_blank' rel='noopener'>§12 IV S.1</a>"}
        verbindlich(["Festsetzung für beide Teile<br/>verbindlich — <a href='{{ELI}}#art-z12_abs-z4' target='_blank' rel='noopener'>§12 IV S.2</a><br/>(unwirksam, soweit in erheblichem<br/>Maße unbillig — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I</a>)"])
        anteil{"Widerspruch eines Miterfinders:<br/>sein Anteil sei unrichtig<br/>festgesetzt?<br/>— <a href='{{ELI}}#art-z12_abs-z5' target='_blank' rel='noopener'>§12 V S.1</a>"}
        streit(["Festsetzung nicht verbindlich:<br/>Streitfall, Schiedsstelle kann<br/>angerufen werden — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a>"])
    end

    start --> vereinbarung
    vereinbarung -->|Ja| festgestellt
    vereinbarung -->|Nein| festsetzung
    festsetzung --> widerspruch
    widerspruch -->|Nein| verbindlich
    widerspruch -->|Ja| anteil
    anteil -->|Ja| neu
    anteil -->|Nein| streit
    festgestellt ~~~ festsetzung
    verbindlich ~~~ anteil

    style festgestellt fill:#d4edda,stroke:#2d8a4a
    style verbindlich fill:#d4edda,stroke:#2d8a4a
    style neu fill:#fff3cd,stroke:#c9a227
    style streit fill:#fff3cd,stroke:#c9a227
`;export{e as default};