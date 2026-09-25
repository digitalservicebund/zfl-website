var e=`---
summary: "Die Prüfung eines Asylfolgeantrags nach § 71 AsylG, ob ein weiteres Asylverfahren durchzuführen ist, und die Folgen für eine bereits bestehende Abschiebungsandrohung."
---
flowchart TD
    A["Ausländer stellt nach unanfechtbarem<br/>Abschluss des früheren Asylverfahrens<br/>erneut einen Antrag — <a href='{{ELI}}#art-z71_abs-z1' target='_blank' rel='noopener'>§71 Abs. 1</a>"] --> B{"Liegen die Voraussetzungen<br/>eines Folgeantrags nach Art. 3<br/>Nr. 19 VO (EU) 2024/1348 vor?<br/>— <a href='{{ELI}}#art-z71_abs-z1' target='_blank' rel='noopener'>§71 Abs. 1</a>"}
    B -->|Nein| C["Kein Folgeantrag: neuer Erstantrag mit<br/>regulärem Verfahren"]
    B -->|Ja| D["Persönliche Einreichung bei der<br/>zuständigen Außenstelle des Bundesamtes<br/>— <a href='{{ELI}}#art-z71_abs-z2' target='_blank' rel='noopener'>§71 Abs. 2</a>"]
    D --> E{"Prüfung nach Art. 55, 56 VO<br/>(EU) 2024/1348: ist ein<br/>weiteres Asylverfahren<br/>durchzuführen? — <a href='{{ELI}}#art-z71_abs-z1' target='_blank' rel='noopener'>§71 Abs. 1</a>"}
    E -->|Ja| F["Weiteres Asylverfahren:<br/>Anhörung und Entscheidung wie beim<br/>Erstantrag — <a href='{{ELI}}#art-z71_abs-z6' target='_blank' rel='noopener'>§71 Abs. 6</a>"]
    E -->|Nein| G["Ablehnung des Folgeantrags als<br/>unzulässig — <a href='{{ELI}}#art-z29_abs-z' target='_blank' rel='noopener'>§29 Nr. 6</a>"]
    G --> H{"Ist bereits eine frühere<br/>Abschiebungsandrohung oder<br/>-anordnung vollziehbar<br/>geworden? — <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3</a>"}
    H -->|Ja| I{"Fall des Art. 56 VO (EU)<br/>2024/1348 und Mitteilung des<br/>Bundesamtes über die<br/>Einhaltung des<br/>Refoulement-Verbots? — <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71<br/>Abs. 3 S. 2</a>"}
    I -->|Ja| J["Abschiebung ohne erneute Fristsetzung<br/>und Androhung zulässig — <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3 S.<br/>1, 2</a>"]
    I -->|Nein| K["Abschiebung erst nach Ablauf der<br/>Klagefrist bzw. nach Zustellung eines<br/>ablehnenden Eilbeschlusses — <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3<br/>S. 3</a>"]
    H -->|Nein| L["Neue Abschiebungsandrohung bzw.<br/>-anordnung erforderlich — <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1</a>,<br/><a href='{{ELI}}#art-z34a_abs-z1' target='_blank' rel='noopener'>§34a Abs. 1</a>"]

    style F fill:#d4edda,stroke:#2d8a4a
    style J fill:#f8d7da,stroke:#c0392b
    style K fill:#fff3cd,stroke:#c9a227
    style L fill:#fff3cd,stroke:#c9a227
`;export{e as default};