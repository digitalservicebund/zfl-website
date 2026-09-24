var e=`---
summary: "Prüft schrittweise die Voraussetzungen des privaten Eigenanbaus von Cannabis nach dem KCanG, etwa Alter, Anbauort, Pflanzenanzahl, Herkunft des Vermehrungsmaterials, Kindersicherung und Weitergabeverbot."
---
flowchart TD
    Start["Person möchte Cannabis privat anbauen"] --> Q1{"Person hat das 18. Lebensjahr<br/>vollendet? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs.1</a>"}

    Q1 -->|Nein| VERBOT["Privater Eigenanbau nicht erlaubt"]
    Q1 -->|Ja| Q2{"Anbau am eigenen Wohnsitz oder<br/>gewöhnlichen Aufenthalt im<br/>Geltungsbereich? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs.1</a>"}

    Q2 -->|Nein| VERBOT2["Privater Eigenanbau an diesem Ort nicht<br/>erlaubt"]
    Q2 -->|Ja| Q3{"Gleichzeitig insgesamt nicht<br/>mehr als 3 Cannabispflanzen?<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs.1</a>"}

    Q3 -->|Nein| STRAF["Straftat: Freiheitsstrafe bis 3 Jahre<br/>oder Geldstrafe — <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs.1 Nr.2a</a>"]
    Q3 -->|Ja| Q4{"Herkunft von Samen/<br/>Stecklingen für den Anbau?"}

    Q4 -->|"Einfuhr aus Nicht-EU-Staat"| OWI["Ordnungswidrigkeit — <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36 Abs.1 Nr.3</a>,<br/><a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>Abs.2</a><br/>(entgegen <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 Abs.2</a>)"]
    Q4 -->|"Erlaubter Umgang (<a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs.1</a>)<br/>bzw. Einfuhr aus EU"| Q5{"Cannabis und<br/>Vermehrungsmaterial vor<br/>Zugriff Dritter (insb.<br/>Kinder/Jugendliche) geschützt?<br/>— <a href='{{ELI}}#art-z10_abs-z' target='_blank' rel='noopener'>§10</a>"}

    Q5 -->|Nein| OWI2["Ordnungswidrigkeit — <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36 Abs.1 Nr.6</a>,<br/><a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>Abs.2</a>"]
    Q5 -->|Ja| Q6{"Weitergabe des angebauten<br/>Cannabis an Dritte geplant?<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs.2</a>"}

    Q6 -->|Ja| VERBOT3["Weitergabe aus privatem Eigenanbau ist<br/>untersagt — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs.2</a>"]
    Q6 -->|Nein| LEGAL["Privater Eigenanbau zulässig"]

    style LEGAL fill:#d4edda,stroke:#2d8a4a
    style VERBOT fill:#f8d7da,stroke:#c0392b
    style VERBOT2 fill:#f8d7da,stroke:#c0392b
    style VERBOT3 fill:#f8d7da,stroke:#c0392b
    style STRAF fill:#f8d7da,stroke:#c0392b
    style OWI fill:#fff3cd,stroke:#c9a227
    style OWI2 fill:#fff3cd,stroke:#c9a227
`;export{e as default};