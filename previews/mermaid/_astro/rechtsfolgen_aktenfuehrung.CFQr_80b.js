var e=`---
summary: "Zeigt je nach Ausgang des Anerkennungsverfahrens nach dem KDVG (Anerkennung, Ablehnung, Widerruf, Rücknahme oder Verzicht), wie lange die zugehörigen Akten aufbewahrt werden müssen und wann sie zu vernichten sind."
---
flowchart TD
    A{"Wie endet das<br/>Anerkennungsverfahren?"}
    A -->|"Anerkennung als<br/>Kriegsdienstverweigerer/in"| B["Im Spannungs- oder<br/>Verteidigungsfall: Zivildienst<br/>außerhalb der Bundeswehr statt<br/>Wehrdienst zu leisten<br/>— <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 Abs. 2</a>"]
    B --> C{"Zivildienstpflichtig nach<br/>Art. 12a Abs. 2 GG?"}
    C -->|Ja| D["Anerkennungsbescheid wird<br/>aufbewahrt, solange dies zur<br/>Erfüllung der Wehrpflicht<br/>erforderlich ist<br/>— <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs. 2 S. 1</a>"]
    D --> E["Übrige Akten: Vernichtung<br/>spätestens 6 Monate nach<br/>Ableistung des Zivildienstes<br/>(sonst nach Vollendung des<br/>32. Lebensjahres)<br/>— <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs. 2 S. 2</a>"]
    C -->|Nein| F["Akten (außer<br/>Anerkennungsbescheid):<br/>Vernichtung 1 Jahr nach<br/>Abschluss des<br/>Anerkennungsverfahrens<br/>— <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs. 2 S. 3</a>"]
    A -->|"Ablehnung, Widerruf<br/>oder Rücknahme der<br/>Anerkennung"| G["Übermittlung der Personalakte<br/>an die zuständige<br/>Personalführungsstelle bzw. das<br/>Bundesamt für das Personal-<br/>management der Bundeswehr,<br/>sobald die Entscheidung<br/>unanfechtbar geworden ist<br/>— <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs. 3 S. 1</a>"]
    A -->|"Rücknahme des Antrags<br/>oder Verzicht auf die<br/>Anerkennung"| G
    G --> H["Akten über das<br/>Anerkennungsverfahren werden<br/>so lange aufbewahrt, wie dies<br/>zur Erfüllung der Wehrpflicht<br/>erforderlich ist<br/>— <a href='{{ELI}}#art-z12_abs-z4' target='_blank' rel='noopener'>§12 Abs. 4 S. 1</a>"]
    H --> I["Nach Ablauf der<br/>Aufbewahrungsfrist: unver-<br/>zügliche Vernichtung (auch<br/>gespeicherter personenbezogener<br/>Daten)<br/>— <a href='{{ELI}}#art-z12_abs-z4' target='_blank' rel='noopener'>§12 Abs. 4 S. 3-4</a>"]

    style E fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};