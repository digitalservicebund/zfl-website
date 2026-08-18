var e=`flowchart TD
    START["Arbeitgeber möchte von den<br/>Höchstarbeitszeit-/Ruhezeit-<br/>vorschriften abweichen"] --> Q1{"Vorübergehende Arbeiten in<br/>einem Notfall oder außergewöhn-<br/>lichen Fall, der unabhängig vom<br/>Willen der Beteiligten eintritt und<br/>dessen Folgen nicht anders zu<br/>beseitigen sind (z.B. drohender<br/>Verderb, Mißlingen der Arbeit)? — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>"}

    Q1 -->|Ja| ABW1["Abweichung von §§3-5, 6 II,<br/>§§7, 9-11 zulässig — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>"]

    Q1 -->|Nein| Q2{"Wird nur eine verhältnismäßig<br/>geringe Zahl von Arbeitnehmern<br/>vorübergehend beschäftigt, deren<br/>Nichterledigung das Arbeitsergebnis<br/>gefährden oder einen unverhältnis-<br/>mäßigen Schaden zur Folge hätte? — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II Nr.1</a>"}

    Q2 -->|Ja| ABW2["Abweichung von §§3-5, 6 II,<br/>§7, 11 I-III und §12 zulässig — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>"]

    Q2 -->|Nein| Q3{"Forschung/Lehre oder unauf-<br/>schiebbare Vor-/Abschlussarbeiten<br/>bzw. unaufschiebbare Pflege-/<br/>Behandlungsarbeiten an einzelnen<br/>Tagen, die dem Arbeitgeber nicht<br/>anders zugemutet werden können? — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II Nr.2</a>"}

    Q3 -->|Ja| ABW2

    Q3 -->|Nein| UNZUL["Keine Abweichung zulässig -<br/>reguläre Arbeitszeitvorschriften<br/>gelten"]

    ABW1 --> CAP{"Übersteigt die Arbeitszeit im<br/>Durchschnitt von 6 Kalender-<br/>monaten oder 24 Wochen<br/>48 Stunden wöchentlich? — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III</a>"}
    ABW2 --> CAP

    CAP -->|Ja| UEBERSCHRITTEN["Unzulässig: 48-Stunden-<br/>Durchschnittsgrenze<br/>überschritten"]

    CAP -->|Nein| ZULAESSIG["Abweichung insgesamt<br/>zulässig"]

    style ZULAESSIG fill:#d4edda,stroke:#2d8a4a
    style UNZUL fill:#f8d7da,stroke:#c0392b
    style UEBERSCHRITTEN fill:#f8d7da,stroke:#c0392b
    style ABW1 fill:#fff3cd,stroke:#c9a227
    style ABW2 fill:#fff3cd,stroke:#c9a227
`;export{e as default};