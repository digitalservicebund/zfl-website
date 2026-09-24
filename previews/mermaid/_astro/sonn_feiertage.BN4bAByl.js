var e=`---
summary: "Zeigt, unter welchen Voraussetzungen eine Beschäftigung an Sonn- und Feiertagen nach dem ArbZG zulässig ist und welcher Ersatzruhetag sowie welche Mindestzahl beschäftigungsfreier Sonntage im Jahr einzuhalten sind."
---
flowchart TD
    START["Geplante Beschäftigung eines<br/>Arbeitnehmers"] --> Q1{"Liegt der Einsatz an einem<br/>Sonntag oder gesetzlichen<br/>Feiertag (0-24 Uhr)? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"}

    Q1 -->|Nein| ZUL["Zulässig - allgemeine Werktagsregeln<br/>gelten"]

    Q1 -->|Ja| Q2{"Fällt die Tätigkeit unter<br/>einen Ausnahmetatbestand des<br/>Katalogs (z.B.<br/>Not-/Rettungsdienst,<br/>Krankenhaus, Gaststätte,<br/>Energie-/Wasserversorgung,<br/>Rundfunk u.a.)? — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a>"}

    Q2 -->|Nein| VERBOTEN["Beschäftigung unzulässig"]

    Q2 -->|Ja| Q3{"Können die Arbeiten an<br/>Werktagen vorgenommen werden?<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a>"}

    Q3 -->|Ja| VERBOTEN

    Q3 -->|Nein| Q4{"Beschäftigung an einem Sonntag<br/>(statt an einem Feiertag)?<br/>— <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III</a>"}

    Q4 -->|Ja| ERSATZ_SO["Ersatzruhetag innerhalb eines den<br/>Beschäftigungstag einschließenden<br/>Zeitraums von 2 Wochen — <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III S.1</a>"]

    Q4 -->|Nein, Feiertag<br/>auf Werktag| ERSATZ_FT["Ersatzruhetag innerhalb eines den<br/>Beschäftigungstag einschließenden<br/>Zeitraums von 8 Wochen — <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III S.2</a>"]

    ERSATZ_SO --> Q5{"Bleiben mindestens 15 Sonntage<br/>im Jahr beschäftigungsfrei?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>"}

    Q5 -->|Ja| KOMBI["Ersatzruhetag ist unmittelbar mit einer<br/>Ruhezeit nach §5 zu verbinden, soweit<br/>technisch/ organisatorisch möglich — <a href='{{ELI}}#art-z11_abs-z4' target='_blank' rel='noopener'>§11<br/>IV</a>"]

    Q5 -->|Nein| UNZUL_JAHR["Unzulässig: Jahresmindestzahl<br/>beschäftigungsfreier Sonntage<br/>unterschritten"]

    ERSATZ_FT --> KOMBI

    KOMBI --> OK["Sonn-/Feiertagsbeschäftigung und<br/>Ausgleich ordnungsgemäß"]

    style ZUL fill:#d4edda,stroke:#2d8a4a
    style OK fill:#d4edda,stroke:#2d8a4a
    style VERBOTEN fill:#f8d7da,stroke:#c0392b
    style UNZUL_JAHR fill:#f8d7da,stroke:#c0392b
    style ERSATZ_SO fill:#fff3cd,stroke:#c9a227
    style ERSATZ_FT fill:#fff3cd,stroke:#c9a227
`;export{e as default};