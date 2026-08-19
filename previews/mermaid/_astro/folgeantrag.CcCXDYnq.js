var e=`---
summary: "Zeigt die Prüfung eines Asylfolgeantrags nach § 71 AsylG, ob ein weiteres Asylverfahren durchzuführen ist, und die Folgen für eine bereits bestehende Abschiebungsandrohung."
---
flowchart TD
    A["Ausländer stellt nach<br/>unanfechtbarem Abschluss des<br/>früheren Asylverfahrens erneut<br/>einen Antrag<br/>— <a href='{{ELI}}#art-z71_abs-z1' target='_blank' rel='noopener'>§71 Abs. 1</a>"] --> B{"Liegen die Voraussetzungen<br/>eines Folgeantrags nach<br/>Art. 3 Nr. 19 VO (EU)<br/>2024/1348 vor?<br/>— <a href='{{ELI}}#art-z71_abs-z1' target='_blank' rel='noopener'>§71 Abs. 1</a>"}
    B -->|Nein| C["Kein Folgeantrag: neuer<br/>Erstantrag mit regulärem<br/>Verfahren"]
    B -->|Ja| D["Persönliche Einreichung bei<br/>der zuständigen Außenstelle<br/>des Bundesamtes<br/>— <a href='{{ELI}}#art-z71_abs-z2' target='_blank' rel='noopener'>§71 Abs. 2</a>"]
    D --> E{"Prüfung nach Art. 55, 56<br/>VO (EU) 2024/1348: ist ein<br/>weiteres Asylverfahren<br/>durchzuführen?<br/>— <a href='{{ELI}}#art-z71_abs-z1' target='_blank' rel='noopener'>§71 Abs. 1</a>"}
    E -->|Ja| F["Weiteres Asylverfahren:<br/>Anhörung und Entscheidung<br/>wie beim Erstantrag<br/>— <a href='{{ELI}}#art-z71_abs-z6' target='_blank' rel='noopener'>§71 Abs. 6</a>"]
    E -->|Nein| G["Ablehnung des Folgeantrags<br/>als unzulässig<br/>— <a href='{{ELI}}#art-z29_abs-z' target='_blank' rel='noopener'>§29 Nr. 6</a>"]
    G --> H{"Ist bereits eine frühere<br/>Abschiebungsandrohung oder<br/>-anordnung vollziehbar<br/>geworden?<br/>— <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3</a>"}
    H -->|Ja| I{"Fall des Art. 56 VO (EU)<br/>2024/1348 und Mitteilung des<br/>Bundesamtes über die Einhaltung<br/>des Refoulement-Verbots?<br/>— <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3 S. 2</a>"}
    I -->|Ja| J["Abschiebung ohne erneute<br/>Fristsetzung und Androhung<br/>zulässig<br/>— <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3 S. 1, 2</a>"]
    I -->|Nein| K["Abschiebung erst nach Ablauf<br/>der Klagefrist bzw. nach<br/>Zustellung eines ablehnenden<br/>Eilbeschlusses<br/>— <a href='{{ELI}}#art-z71_abs-z3' target='_blank' rel='noopener'>§71 Abs. 3 S. 3</a>"]
    H -->|Nein| L["Neue Abschiebungsandrohung<br/>bzw. -anordnung erforderlich<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1</a>, <a href='{{ELI}}#art-z34a_abs-z1' target='_blank' rel='noopener'>§34a Abs. 1</a>"]

    style F fill:#d4edda,stroke:#2d8a4a
    style J fill:#f8d7da,stroke:#c0392b
    style K fill:#fff3cd,stroke:#c9a227
    style L fill:#fff3cd,stroke:#c9a227
`;export{e as default};