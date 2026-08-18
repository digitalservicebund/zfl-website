var e=`flowchart TD
    Start["Person möchte Cannabis<br/>privat anbauen"] --> Q1{"Person hat das 18. Lebensjahr<br/>vollendet? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs.1</a>"}

    Q1 -->|Nein| VERBOT["Privater Eigenanbau<br/>nicht erlaubt"]
    Q1 -->|Ja| Q2{"Anbau am eigenen Wohnsitz<br/>oder gewöhnlichen Aufenthalt<br/>im Geltungsbereich? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs.1</a>"}

    Q2 -->|Nein| VERBOT2["Privater Eigenanbau<br/>an diesem Ort nicht erlaubt"]
    Q2 -->|Ja| Q3{"Gleichzeitig insgesamt<br/>nicht mehr als 3<br/>Cannabispflanzen? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs.1</a>"}

    Q3 -->|Nein| STRAF["Straftat: Freiheitsstrafe<br/>bis 3 Jahre oder Geldstrafe<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs.1 Nr.2a</a>"]
    Q3 -->|Ja| Q4{"Herkunft von Samen/<br/>Stecklingen für den Anbau?"}

    Q4 -->|"Einfuhr aus<br/>Nicht-EU-Staat"| OWI["Ordnungswidrigkeit<br/>— <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36 Abs.1 Nr.3</a>, <a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>Abs.2</a><br/>(entgegen <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 Abs.2</a>)"]
    Q4 -->|"Erlaubter Umgang (<a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs.1</a>)<br/>bzw. Einfuhr aus EU"| Q5{"Cannabis und Vermehrungs-<br/>material vor Zugriff Dritter<br/>(insb. Kinder/Jugendliche)<br/>geschützt? — <a href='{{ELI}}#art-z10_abs-z' target='_blank' rel='noopener'>§10</a>"}

    Q5 -->|Nein| OWI2["Ordnungswidrigkeit<br/>— <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36 Abs.1 Nr.6</a>, <a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>Abs.2</a>"]
    Q5 -->|Ja| Q6{"Weitergabe des angebauten<br/>Cannabis an Dritte<br/>geplant? — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs.2</a>"}

    Q6 -->|Ja| VERBOT3["Weitergabe aus privatem<br/>Eigenanbau ist untersagt<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs.2</a>"]
    Q6 -->|Nein| LEGAL["Privater Eigenanbau<br/>zulässig"]

    style LEGAL fill:#d4edda,stroke:#2d8a4a
    style VERBOT fill:#f8d7da,stroke:#c0392b
    style VERBOT2 fill:#f8d7da,stroke:#c0392b
    style VERBOT3 fill:#f8d7da,stroke:#c0392b
    style STRAF fill:#f8d7da,stroke:#c0392b
    style OWI fill:#fff3cd,stroke:#c9a227
    style OWI2 fill:#fff3cd,stroke:#c9a227
`;export{e as default};