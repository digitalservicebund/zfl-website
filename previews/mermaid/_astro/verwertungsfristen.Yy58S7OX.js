var e=`---
summary: "Berechnet die Fristen der Pfandverwertung: ab wann der Pfandleiher sich aus dem Pfand befriedigen darf und bis wann er es verwerten muss, einschließlich vereinbarter Frist, behördlicher Verlängerung, Hemmung und Bekanntmachungsfrist vor der Versteigerung."
---
flowchart TD
    A["Fälligkeit des gesamten Darlehens ist<br/>eingetreten — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"] --> B{"Stimmt der Verpfänder nach<br/>Fälligkeit einer früheren<br/>Verwertung zu? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"}
    B -->|Ja| C1["Verwertungsberechtigung ab Zustimmung"]
    B -->|Nein| C2["Verwertungsberechtigung frühestens 1<br/>Monat nach Fälligkeit — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"]
    C1 --> D{"Andere Verwertungsfrist auf<br/>Verlangen des Verpfänders<br/>vereinbart? — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"}
    C2 --> D
    D -->|Ja| E1["Vereinbarte Frist gilt (§9 II S.1 findet<br/>keine Anwendung) — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"]
    D -->|Nein| E2["Verwertung spätestens 6 Monate nach<br/>Eintritt der Verwertungsberechtigung<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.1</a>"]
    E2 --> F{"Verlängert die zuständige<br/>Behörde die Frist auf Antrag<br/>des Pfandleihers aus wichtigem<br/>Grund? — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.2</a>"}
    F -->|Ja| G1["Verlängerte Frist gilt — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.2</a>"]
    F -->|Nein| G2["6-Monats-Frist gilt — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.1</a>"]
    G1 --> H{"Ist der Pfandleiher durch eine<br/>gerichtliche oder behördliche<br/>Maßnahme an der fristgerechten<br/>Verwertung verhindert? — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II<br/>S.3</a>"}
    G2 --> H
    H -->|Ja| I["Frist gehemmt bis zur Aufhebung der<br/>Maßnahme;<br/>Hemmungszeitraum wird nicht eingerechnet<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.3</a>"]
    H -->|Nein| J
    I --> J["Versteigerung mind. 1 und höchstens 2<br/>Wochen vorher bekanntmachen lassen — <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9<br/>IV S.1</a>"]
    E1 --> J
    J --> K["Pfand wird innerhalb der maßgeblichen<br/>Frist verwertet"]

    style K fill:#d4edda,stroke:#2d8a4a
    style I fill:#fff3cd,stroke:#c9a227
`;export{e as default};