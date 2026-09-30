var e=`---
summary: "Wie lange die Akten je nach Ausgang des Anerkennungsverfahrens nach dem KDVG (Anerkennung, Ablehnung, Widerruf, Rücknahme oder Verzicht) aufbewahrt werden müssen und wann sie zu vernichten sind."
---
flowchart TD
    A{"Wie endet das<br/>Anerkennungsverfahren?"}
    A -->|"Anerkennung als<br/>Kriegsdienstverweigerer/in"| B["Im Spannungs- oder Verteidigungsfall:<br/>Zivildienst außerhalb der Bundeswehr<br/>statt Wehrdienst zu leisten — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 Abs. 2</a>"]
    B --> C{"Zivildienstpflichtig nach Art.<br/>12a Abs. 2 GG?"}
    C -->|Ja| D["Anerkennungsbescheid wird aufbewahrt,<br/>solange dies zur Erfüllung der<br/>Wehrpflicht erforderlich ist — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs.<br/>2 S. 1</a>"]
    D --> E["Übrige Akten: Vernichtung spätestens 6<br/>Monate nach Ableistung des Zivildienstes<br/>(sonst nach Vollendung des<br/>32. Lebensjahres) — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs. 2 S. 2</a>"]
    C -->|Nein| F["Akten (außer Anerkennungsbescheid):<br/>Vernichtung 1 Jahr nach Abschluss des<br/>Anerkennungsverfahrens — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs. 2 S. 3</a>"]
    A -->|"Ablehnung, Widerruf oder<br/>Rücknahme der Anerkennung"| G["Übermittlung der Personalakte an die<br/>zuständige Personalführungsstelle bzw.<br/>das Bundesamt für das Personalmanagement<br/>der Bundeswehr, sobald die Entscheidung<br/>unanfechtbar geworden ist — <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs. 3<br/>S. 1</a>"]
    A -->|"Rücknahme des Antrags oder<br/>Verzicht auf die Anerkennung"| G
    G --> H["Akten über das Anerkennungsverfahren<br/>werden so lange aufbewahrt, wie dies zur<br/>Erfüllung der Wehrpflicht erforderlich<br/>ist — <a href='{{ELI}}#art-z12_abs-z4' target='_blank' rel='noopener'>§12 Abs. 4 S. 1</a>"]
    H --> I["Nach Ablauf der Aufbewahrungsfrist:<br/>unverzügliche Vernichtung (auch<br/>gespeicherter personenbezogener Daten)<br/>— <a href='{{ELI}}#art-z12_abs-z4' target='_blank' rel='noopener'>§12 Abs. 4 S. 3-4</a>"]

    style E fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};