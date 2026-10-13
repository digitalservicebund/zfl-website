var e=`---
summary: "Ob der allgemeine Kündigungsschutz des KSchG auf ein Arbeitsverhältnis anwendbar ist, abhängig von Organstellung, Wartezeit und der Betriebsgröße einschließlich der Bestandsschutzregelung für Alt-Arbeitnehmer."
---
flowchart TD
    A["Allgemeiner Kündigungsschutz (1.<br/>Abschnitt KSchG) anwendbar?"] --> Q1{"Arbeitnehmer ist Organmitglied<br/>der gesetzl. Vertretung (z.B.<br/>GmbH-Geschäftsführer)? — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>"}

    Q1 -->|Ja| Z1["1. Abschnitt gilt nicht"]
    Q1 -->|Nein| Q2{"Leitender Angestellter mit<br/>Einstellungs-/Entlassungsbefugnis?<br/>— <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>"}

    Q2 -->|Ja| Z2["1. Abschnitt gilt, außer <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a> (kein<br/>Einspruchsrecht beim Betriebsrat);<br/>Auflösungsantrag des Arbeitgebers ohne<br/>Begründung"]
    Q2 -->|Nein| Q3{"Arbeitsverhältnis<br/>ununterbrochen länger als 6<br/>Monate im selben<br/>Betrieb/Unternehmen? — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"}

    Q3 -->|Nein| Z3["Wartezeit nicht erfüllt — kein Schutz<br/>nach §§1-3, 8-14"]
    Q3 -->|Ja| Q4["Betriebsgröße ermitteln (<a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I</a>):<br/>Vollzeit = 1, Teilzeit ≤20h/Wo. = 0,5,<br/>Teilzeit ≤30h/Wo. = 0,75;<br/>Auszubildende zählen nicht mit"]

    Q4 --> Q5{"Wie viele Arbeitnehmer werden<br/>in der Regel beschäftigt?"}

    Q5 -->|"≤ 5"| Z4["§§1-3, 8-14 gelten nicht;<br/>nur §§4-7 und <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I S.1-2</a><br/>anwendbar — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I S.2</a>"]
    Q5 -->|"6 bis 10"| Q6{"Arbeitsverhältnis dieses<br/>Arbeitnehmers vor dem 1.1.2004<br/>begonnen? — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I S.3</a>"}
    Q5 -->|"> 10"| Z5["Voller Kündigungsschutz nach §§1-3, 8-14<br/>anwendbar"]

    Q6 -->|Ja| Z6["Bestandsschutz: voller Schutz für diesen<br/>'Alt-Arbeitnehmer' (zählt zudem nicht<br/>zur 10er-Schwelle mit) — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I S.3-4</a>"]
    Q6 -->|Nein| Z4

    style Z1 fill:#f5f5f5,stroke:#999
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#f5f5f5,stroke:#999
    style Z4 fill:#f5f5f5,stroke:#999
    style Z5 fill:#d4edda,stroke:#2d8a4a
    style Z6 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};