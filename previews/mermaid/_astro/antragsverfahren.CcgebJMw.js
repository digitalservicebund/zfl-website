var e=`---
summary: "Zeigt den Ablauf vom Wohngeldantrag über die Entscheidung der Wohngeldbehörde bis zur Festlegung des Bewilligungszeitraums, einschließlich der Sonderregeln für den Beginn bei vorheriger Ablehnung einer Transferleistung."
---
flowchart TD
    A["Wohngeldantrag stellen — <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22 I</a>"] --> Q1{"Mehrere Personen erfüllen<br/>Voraussetzungen für denselben Wohnraum<br/>(§3 III)? — <a href='{{ELI}}#art-z22_abs-z2' target='_blank' rel='noopener'>§22 II</a>"}

    Q1 -->|Ja| Z1["Vermutung: antragstellende<br/>Person ist die von den anderen<br/>Haushaltsmitgliedern bestimmte<br/>wohngeldberechtigte Person — <a href='{{ELI}}#art-z22_abs-z2' target='_blank' rel='noopener'>§22 II</a>"]
    Q1 -->|Nein| Q2{"Wohngeldberechtigte Person zieht<br/>aus oder verstirbt? — <a href='{{ELI}}#art-z22_abs-z3' target='_blank' rel='noopener'>§22 III</a>"}

    Q2 -->|Ja| Z2["Anderes Haushaltsmitglied<br/>mit §3 I/II-Voraussetzungen<br/>kann Änderungsantrag stellen — <a href='{{ELI}}#art-z22_abs-z3' target='_blank' rel='noopener'>§22 III</a>"]
    Q2 -->|Nein| B["Wohngeldbehörde prüft<br/>Antrag — <a href='{{ELI}}/art-z24' target='_blank' rel='noopener'>§24</a>"]
    Z1 --> B
    Z2 --> B

    B --> Q3{"Antrag früher als 2 Monate<br/>vor Ablauf des laufenden Bewilligungs-<br/>zeitraums für die Zeit danach gestellt? —<br/><a href='{{ELI}}#art-z22_abs-z4' target='_blank' rel='noopener'>§22 IV</a>"}

    Q3 -->|Ja| Z3["Als Zeitpunkt der<br/>Antragstellung gilt der 1. des<br/>2. Monats vor Fristablauf — <a href='{{ELI}}#art-z22_abs-z4' target='_blank' rel='noopener'>§22 IV</a>"]
    Q3 -->|Nein| Z4["Tatsächlicher Zeitpunkt<br/>der Antragstellung gilt"]

    Z3 --> C["Entscheidung auf Basis der im<br/>Bewilligungszeitraum zu erwartenden<br/>Verhältnisse im Zeitpunkt der<br/>Antragstellung — <a href='{{ELI}}#art-z24_abs-z2' target='_blank' rel='noopener'>§24 II</a>"]
    Z4 --> C

    C --> D["Bewilligungsbescheid schriftlich<br/>erlassen — <a href='{{ELI}}#art-z24_abs-z2' target='_blank' rel='noopener'>§24 II</a>"]

    D --> Q4{"Wurde vor der Antragstellung<br/>eine Leistung nach §7 I abgelehnt (oder<br/>gilt der Ausschluss nach §8 I S.3/II als<br/>nicht erfolgt) und Antrag rechtzeitig<br/>gestellt? — <a href='{{ELI}}#art-z25_abs-z3' target='_blank' rel='noopener'>§25 III</a>"}

    Q4 -->|Ja| Z5["Bewilligungszeitraum beginnt<br/>am 1. des Monats der<br/>Leistungsablehnung — <a href='{{ELI}}#art-z25_abs-z3' target='_blank' rel='noopener'>§25 III</a>"]
    Q4 -->|Nein| Q5{"Voraussetzungen für die<br/>Bewilligung treten erst später ein? —<br/><a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 II</a>"}

    Q5 -->|Ja| Z6["Bewilligungszeitraum beginnt<br/>am 1. des Monats des<br/>späteren Eintritts — <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 II S.2</a>"]
    Q5 -->|Nein| Z7["Bewilligungszeitraum beginnt<br/>am 1. des Antragsmonats — <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 II S.1</a>"]

    Z5 --> E["Dauer festlegen: grundsätzlich<br/>12 Monate; verkürzbar, teilbar oder bei<br/>gleichbleibenden Verhältnissen bis zu<br/>24 Monate verlängerbar — <a href='{{ELI}}#art-z25_abs-z1' target='_blank' rel='noopener'>§25 I</a>"]
    Z6 --> E
    Z7 --> E

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z5 fill:#d4edda,stroke:#2d8a4a
    style Z6 fill:#d4edda,stroke:#2d8a4a
    style Z7 fill:#d4edda,stroke:#2d8a4a
    style E fill:#d4edda,stroke:#2d8a4a
`;export{e as default};