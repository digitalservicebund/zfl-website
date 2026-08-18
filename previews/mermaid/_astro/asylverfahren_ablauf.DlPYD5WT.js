var e=`flowchart TD
    A["Ausländer möchte<br/>Asyl beantragen"] --> B{"Im Besitz erforderlicher<br/>Einreisepapiere?<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 Abs. 2</a>"}
    B -->|Nein| C["Antrag bei der Grenzbehörde<br/>bzw. bei unerlaubter Einreise<br/>unverzügliche Meldung bei<br/>Aufnahmeeinrichtung oder Antrag<br/>bei Ausländerbehörde/Polizei<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 Abs. 2</a>, <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 Abs. 1</a>, <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 Abs. 1</a>"]
    B -->|Ja| D["Antrag bei Ausländerbehörde,<br/>Grenzbehörde oder Polizei<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 Abs. 2</a>"]
    C --> E
    D --> E["Weiterleitung an die zuständige<br/>Aufnahmeeinrichtung<br/>— <a href='{{ELI}}#art-z20_abs-z1' target='_blank' rel='noopener'>§20 Abs. 1</a>"]
    E --> F["Registrierung des Asylantrags<br/>durch die Aufnahmeeinrichtung<br/>— <a href='{{ELI}}#art-z13a_abs-z' target='_blank' rel='noopener'>§13a</a>"]
    F --> G["Persönliche Einreichung des<br/>Asylantrags bei der Außenstelle<br/>des Bundesamtes<br/>— <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 Abs. 1</a>"]
    G --> H["Sicherung der Identität durch<br/>erkennungsdienstliche Maßnahmen<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1</a>"]
    H --> I["Anhörung im Asylverfahren,<br/>soll möglichst bald nach der<br/>Antragseinreichung erfolgen<br/>— <a href='{{ELI}}#art-z25_abs-z3' target='_blank' rel='noopener'>§25 Abs. 3</a>"]
    I --> J{"Vorbringen erst nach der<br/>Anhörung, obwohl es die<br/>Entscheidung verzögern würde?<br/>— <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 Abs. 2</a>"}
    J -->|Ja| K["Verspätetes Vorbringen<br/>kann unberücksichtigt bleiben<br/>— <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 Abs. 2</a>"]
    J -->|Nein| L
    K --> L["Entscheidung des Bundesamtes<br/>über den Asylantrag<br/>— <a href='{{ELI}}#art-z31_abs-z2' target='_blank' rel='noopener'>§31 Abs. 2</a>"]
    L --> M{"Asylberechtigung, Flüchtlingseigenschaft<br/>oder subsidiärer Schutz zuerkannt?<br/>— <a href='{{ELI}}#art-z31_abs-z2' target='_blank' rel='noopener'>§31 Abs. 2</a>"}
    M -->|Ja| N["Anerkennung bzw. Zuerkennung<br/>internationalen Schutzes"]
    M -->|Nein| O["Ablehnung mit schriftlicher<br/>Abschiebungsandrohung<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1</a>"]
    O --> P["Ausreisefrist von<br/>i. d. R. einer Woche<br/>— <a href='{{ELI}}#art-z38_abs-z1' target='_blank' rel='noopener'>§38 Abs. 1</a>"]

    style N fill:#d4edda,stroke:#2d8a4a
    style O fill:#f8d7da,stroke:#c0392b
    style P fill:#fff3cd,stroke:#c9a227
`;export{e as default};