var e=`---
summary: "Wer als natürliche Person wohngeldberechtigt ist (Mietzuschuss oder Lastenzuschuss), wie bei mehreren Berechtigten im selben Haushalt zu verfahren ist und welche Zusatzvoraussetzungen für ausländische Personen gelten."
---
flowchart TD
    A["Wohngeldberechtigung prüfen"] --> Q1{"Wohnraum gemietet und selbst<br/>genutzt (oder gleichgestellt:<br/>mietähnl. Nutzung, Bewohner im<br/>eigenen Haus &gt;2 Wohnungen,<br/>Heimbewohner)? — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>"}

    Q1 -->|Ja| Z1["Berechtigt für Mietzuschuss — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>"]
    Q1 -->|Nein| Q2{"Eigentum an selbstgenutztem<br/>Wohnraum (oder gleichgestellt:<br/>Erbbaurecht, Dauerwohnrecht,<br/>Wohnungsrecht, Nießbrauch,<br/>Übertragungsanspruch)? — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a>"}

    Q2 -->|Ja| Z2["Berechtigt für Lastenzuschuss — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a>"]
    Q2 -->|Nein| Q3{"Vom Wohngeld ausgeschlossen<br/>(§§7, 8 I), aber wohnt mit<br/>mind. einem zu<br/>berücksichtigenden<br/>Haushaltsmitglied (§6)<br/>zusammen? — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 IV</a>"}

    Q3 -->|Ja| Z3["Dennoch wohngeldberechtigt nach Maßgabe<br/>von Abs. 1-3 — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 IV</a>"]
    Q3 -->|Nein| Z4["Nicht wohngeldberechtigt"]

    Z1 --> Q4{"Erfüllen mehrere Personen für<br/>denselben Wohnraum die<br/>Voraussetzungen und sind sie<br/>zugleich Haushaltsmitglieder<br/>(§5)? — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III</a>"}
    Z2 --> Q4

    Q4 -->|Ja| Z5["Nur eine dieser Personen ist<br/>wohngeldberechtigt; die Personen<br/>bestimmen, welche — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III</a>"]
    Q4 -->|Nein| Z6["Berechtigung besteht wie festgestellt"]

    Z5 --> Q5{"Ausländische Person (§2 I<br/>AufenthG)? — <a href='{{ELI}}#art-z3_abs-z5' target='_blank' rel='noopener'>§3 V</a>"}
    Z6 --> Q5
    Z3 --> Q5

    Q5 -->|Nein| Z7["Berechtigung bleibt bestehen"]
    Q5 -->|Ja| Q6{"Tatsächlicher Aufenthalt im<br/>Bundesgebiet und<br/>Aufenthaltsrecht/ -titel,<br/>Duldung, völkerrechtl.<br/>Aufenthaltsrecht,<br/>Aufenthaltsgestattung,<br/>heimatlose Ausländer oder<br/>Befreiung? — <a href='{{ELI}}#art-z3_abs-z5' target='_blank' rel='noopener'>§3 V S.1</a>"}

    Q6 -->|Nein| Z8["Nicht wohngeldberechtigt"]
    Q6 -->|Ja| Q7{"Durch völkerrechtl.<br/>Vereinbarung von deutschen<br/>Vorschriften zur sozialen<br/>Sicherheit befreit? — <a href='{{ELI}}#art-z3_abs-z5' target='_blank' rel='noopener'>§3 V S.2</a>"}

    Q7 -->|Ja| Z9["Nicht wohngeldberechtigt"]
    Q7 -->|Nein| Q8{"Aufenthaltstitel nur zur<br/>Ausbildungs-/<br/>Arbeitsplatzsuche,<br/>Chancenkarte, Studienpraktikum<br/>oder europ.<br/>Freiwilligendienst? — <a href='{{ELI}}#art-z3_abs-z5' target='_blank' rel='noopener'>§3 V S.3</a>"}

    Q8 -->|Ja| Z10["In der Regel nicht wohngeldberechtigt"]
    Q8 -->|Nein| Z11["Wohngeldberechtigt"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#f8d7da,stroke:#c0392b
    style Z5 fill:#fff3cd,stroke:#c9a227
    style Z6 fill:#d4edda,stroke:#2d8a4a
    style Z7 fill:#d4edda,stroke:#2d8a4a
    style Z8 fill:#f8d7da,stroke:#c0392b
    style Z9 fill:#f8d7da,stroke:#c0392b
    style Z10 fill:#f8d7da,stroke:#c0392b
    style Z11 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};