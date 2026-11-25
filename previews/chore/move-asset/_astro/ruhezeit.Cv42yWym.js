var e=`---
summary: "Die Berechnung der gesetzlichen Mindestruhezeit von elf Stunden nach Ende der täglichen Arbeitszeit nach dem ArbZG sowie die zulässigen Verkürzungen in bestimmten Branchen und deren Ausgleich."
---
flowchart TD
    START["Beendigung der täglichen Arbeitszeit"] --> BASE["Grundsatz: ununterbrochene Ruhezeit von<br/>mindestens 11 Stunden — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"]

    BASE --> Q1{"Tätigkeit in<br/>Krankenhaus/Pflege,<br/>Gaststätte/Beherbergung,<br/>Verkehrsbetrieb, Rundfunk,<br/>Landwirtschaft oder<br/>Tierhaltung? — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"}

    Q1 -->|Nein| STANDARD["11 Stunden Ruhezeit sind einzuhalten"]

    Q1 -->|Ja| Q1B{"Kürzung durch Inanspruchnahme<br/>während Rufbereitschaft in<br/>Krankenhaus/Pflegeeinrichtung?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a>"}

    Q1B -->|Ja| Q3B{"Beträgt die Inanspruchnahme<br/>nicht mehr als die Hälfte der<br/>Ruhezeit und wird sie zu<br/>anderen Zeiten ausgeglichen?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a>"}

    Q3B -->|Ja| VERKUERZT2["Verkürzung durch Rufbereitschaft<br/>zulässig"]
    Q3B -->|Nein| UNZUL["Unzulässig: Ruhezeit nicht ordnungsgemäß<br/>gewahrt"]

    Q1B -->|Nein| Q2{"Verkürzung der Ruhezeit um bis<br/>zu eine Stunde vorgesehen?<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"}

    Q2 -->|Nein| STANDARD

    Q2 -->|Ja| Q3{"Wird die Verkürzung innerhalb<br/>eines Kalendermonats oder vier<br/>Wochen durch Verlängerung<br/>einer anderen Ruhezeit auf<br/>mindestens 12 Stunden<br/>ausgeglichen? — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"}

    Q3 -->|Ja| VERKUERZT["Verkürzung um bis zu 1 Stunde zulässig"]
    Q3 -->|Nein| UNZUL

    style STANDARD fill:#d4edda,stroke:#2d8a4a
    style VERKUERZT fill:#d4edda,stroke:#2d8a4a
    style VERKUERZT2 fill:#d4edda,stroke:#2d8a4a
    style UNZUL fill:#f8d7da,stroke:#c0392b
`;export{e as default};