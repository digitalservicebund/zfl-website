var e=`---
summary: "Stellt dar, unter welchen Voraussetzungen die Registrierung eines homöopathischen Tierarzneimittels zurückgenommen, widerrufen oder zum Ruhen gebracht wird und welche Folgen dies für das Inverkehrbringen hat."
---
flowchart TD
    A["Nach Erteilung der Registrierung festgestellter Sachverhalt"] --> B{"Hat ein Versagungsgrund nach §1 Abs. 5 Nr. 2-9 bereits bei der Erteilung vorgelegen?<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1</a>"}
    B -->|Ja| C["Registrierung ist zurückzunehmen (gebunden)<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1</a>"]
    B -->|Nein| D{"Hat der Versagungsgrund nach §1 Abs. 5 Nr. 1 vorgelegen oder wurden im Antrag<br/>bzw. den Unterlagen unrichtige Angaben gemacht?<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2</a>"}
    D -->|Ja| E["Registrierung kann zurückgenommen werden (Ermessen)<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2</a>"]
    D -->|Nein| F{"Ist ein Versagungsgrund nach §1 Abs. 5 nachträglich eingetreten?<br/>— <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs. 3</a>"}
    F -->|Ja| G["Registrierung ist zu widerrufen (gebunden)<br/>— <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs. 3</a>"]
    F -->|Nein| H{"Liegt ein sonstiger Widerrufsgrund vor?<br/>(u.a. Auflage nicht erfüllt, Pharmakovigilanz-System/-Pflichten verletzt,<br/>homöopathisches Zubereitungsverfahren nicht eingehalten)<br/>— <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 Abs. 4</a>"}
    H -->|Ja, behebbar| I["Bundesoberbehörde kann zur Antragstellung auf Änderung der Registrierung auffordern<br/>— <a href='{{ELI}}#art-z6_abs-z6' target='_blank' rel='noopener'>§6 Abs. 6</a>"]
    H -->|Ja| J["Registrierung kann widerrufen werden (Ermessen)<br/>— <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 Abs. 4</a>"]
    H -->|Nein| K["Registrierung bleibt bestehen"]
    O["Inhaberin/Inhaber verzichtet auf die Registrierung<br/>(Erlöschen entsprechend §9 Abs. 5 TAMG)<br/>— <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7</a>"] --> N
    C --> L["Statt Rücknahme/Widerruf ist auch ein befristetes Ruhen der Registrierung möglich<br/>— <a href='{{ELI}}#art-z6_abs-z5' target='_blank' rel='noopener'>§6 Abs. 5</a>"]
    E --> L
    G --> L
    J --> L
    L --> M["Tierarzneimittel darf nicht mehr auf dem Markt bereitgestellt werden;<br/>Rückgabe an Inhaberin/Inhaber der Registrierung bleibt zulässig<br/>— <a href='{{ELI}}#art-z6_abs-z7' target='_blank' rel='noopener'>§6 Abs. 7</a>"]
    M --> N["Bekanntmachung im Bundesanzeiger<br/>— <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a>"]
    style C fill:#f8d7da,stroke:#c0392b
    style E fill:#f8d7da,stroke:#c0392b
    style G fill:#f8d7da,stroke:#c0392b
    style J fill:#f8d7da,stroke:#c0392b
    style K fill:#d4edda,stroke:#2d8a4a
    style I fill:#fff3cd,stroke:#c9a227
    style L fill:#fff3cd,stroke:#c9a227
    style O fill:#fff3cd,stroke:#c9a227
    style N fill:#fff3cd,stroke:#c9a227
`;export{e as default};