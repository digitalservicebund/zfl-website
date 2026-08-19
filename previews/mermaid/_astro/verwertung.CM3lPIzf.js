var e=`flowchart TD
    A["Fälligkeit des gesamten<br/>Darlehens ist eingetreten<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"] --> B{"Stimmt der Verpfänder nach<br/>Fälligkeit einer früheren<br/>Verwertung zu?<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"}
    B -->|Ja| C1["Verwertungsberechtigung<br/>tritt sofort ein"]
    B -->|Nein| C2["Verwertungsberechtigung tritt<br/>frühestens 1 Monat nach<br/>Fälligkeit ein<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"]
    C1 --> D{"Andere Verwertungsfrist auf<br/>Verlangen des Verpfänders<br/>vereinbart?<br/>— <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"}
    C2 --> D
    D -->|Ja| E1["Vereinbarte Frist gilt<br/>(gesetzliche 6-Monats-Frist<br/>nicht anwendbar)<br/>— <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"]
    D -->|Nein| E2{"Verhindert eine gerichtliche<br/>oder behördliche Maßnahme<br/>die fristgerechte Verwertung?<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.3</a>"}
    E2 -->|Ja| F1["Frist gehemmt bis zur<br/>Aufhebung der Maßnahme;<br/>Hemmungszeitraum zählt<br/>nicht mit<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.3</a>"]
    E2 -->|Nein| F2{"Verlängert die zuständige<br/>Behörde die 6-Monats-Frist auf<br/>Antrag aus wichtigem Grund?<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.2</a>"}
    F1 --> G["Verwertungsfrist: 6 Monate<br/>zzgl. Hemmungszeitraum<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"]
    F2 -->|Ja| G
    F2 -->|Nein| H["Verwertungsfrist: 6 Monate<br/>nach Eintritt der<br/>Verwertungsberechtigung<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II S.1</a>"]
    E1 --> I{"Wird die Versteigerung<br/>mindestens 1 Woche und<br/>höchstens 2 Wochen vorher in<br/>Zeitung oder auf Homepage<br/>bekanntgemacht (Ort, Zeit,<br/>Pfandbezeichnung,<br/>Vertragsnummern)?<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 IV</a>"}
    G --> I
    H --> I
    I -->|Ja| J["Pfand wird fristgerecht<br/>und formgerecht verwertet"]
    I -->|Nein| K["Ordnungswidrigkeit<br/>— <a href='{{ELI}}/art-z12a' target='_blank' rel='noopener'>§12a Nr.4</a>"]

    style J fill:#d4edda,stroke:#2d8a4a
    style K fill:#f8d7da,stroke:#c0392b
    style F1 fill:#fff3cd,stroke:#c9a227
`;export{e as default};