var e=`---
summary: "Zeigt die Anmeldefristen für die Elternzeit nach § 16 BEEG je nach Zeitraum, mögliche Ausnahmen bei dringenden Gründen und die Regeln für die Verteilung der Elternzeit auf mehrere Abschnitte."
---
flowchart TD
    A["Arbeitnehmer/in möchte<br/>Elternzeit beanspruchen"] --> B{"Für welchen Zeitraum soll<br/>die Elternzeit genommen<br/>werden?<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1</a>"}
    B -->|"Bis zum vollendeten<br/>3. Lebensjahr des Kindes"| C["Anmeldefrist: spätestens<br/>7 Wochen vor Beginn, in<br/>Textform beim Arbeitgeber,<br/>mit Festlegung für 2 Jahre<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 1 Nr. 1, S. 2</a>"]
    B -->|"Zwischen 3. Geburtstag<br/>und vollendetem<br/>8. Lebensjahr"| D["Anmeldefrist: spätestens<br/>13 Wochen vor Beginn,<br/>in Textform beim Arbeitgeber<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 1 Nr. 2</a>"]

    C --> E{"Liegen dringende Gründe<br/>für eine kürzere Frist vor?<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 3</a>"}
    D --> E
    E -->|Ja| F["Ausnahmsweise angemessene<br/>kürzere Frist möglich<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 3</a>"]
    E -->|Nein| G["Regelfrist muss<br/>eingehalten werden"]

    F --> H{"Konnte die Frist aus einem<br/>nicht zu vertretenden Grund<br/>nicht rechtzeitig eingehalten<br/>werden (Anschluss an<br/>Mutterschutz)?<br/>— <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 Abs. 2</a>"}
    G --> H
    H -->|Ja| I["Nachholung innerhalb<br/>einer Woche nach Wegfall<br/>des Grundes möglich<br/>— <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 Abs. 2</a>"]
    H -->|Nein| J{"Soll die Elternzeit auf<br/>mehrere Zeitabschnitte<br/>verteilt werden?<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 6, 7</a>"}
    I --> J

    J -->|"Bis zu 3 Abschnitte"| K["Verteilung ohne Zustimmung<br/>des Arbeitgebers zulässig<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 6</a>"]
    J -->|"Weiterer (4.) Abschnitt"| L{"Liegt der weitere Abschnitt<br/>zwischen 3. und 8. Geburtstag<br/>des Kindes?<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 7</a>"}
    L -->|Ja| M["Arbeitgeber kann binnen<br/>8 Wochen nach Zugang aus<br/>dringenden betrieblichen<br/>Gründen ablehnen<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 7</a>"]
    L -->|Nein| N["Nur mit Zustimmung<br/>des Arbeitgebers zulässig<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 Abs. 1 S. 6</a>"]

    K --> Z["Elternzeit wirksam<br/>angemeldet<br/>— <a href='{{ELI}}/art-z16' target='_blank' rel='noopener'>§16</a>"]
    M --> Z
    N --> Z

    style Z fill:#d4edda,stroke:#2d8a4a
`;export{e as default};