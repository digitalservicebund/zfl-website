var e=`---
summary: "Zeigt die Prüfung, ob für einen Herkunfts- oder Drittstaat eine gesetzliche Sicherheitsvermutung nach dem AsylG greift, und welche Folgen dies für die Berufung auf das Asylrecht und die Einstufung des Antrags hat."
---
flowchart TD
    A["Prüfung, ob eine gesetzliche<br/>Sicherheitsvermutung für einen<br/>Staat eingreift"] --> B{"Einreise aus einem Drittstaat<br/>i. S. d. Art. 16a Abs. 2 GG<br/>(EU-Mitgliedstaaten und<br/>Anlage I)?<br/>— <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a Abs. 1</a>, <a href='{{ELI}}#art-z26a_abs-z2' target='_blank' rel='noopener'>Abs. 2</a>"}
    B -->|Ja| C{"Ausnahme: Aufenthaltstitel<br/>bei Einreise, Zuständigkeit<br/>Deutschlands oder Anordnung<br/>nach §18 Abs. 4 Nr. 2?<br/>— <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a Abs. 1 Nr. 1-3</a>"}
    C -->|Ja| D["Berufung auf Art. 16a Abs. 1<br/>GG möglich, reguläres<br/>Asylverfahren"]
    C -->|Nein| E["Keine Berufung auf das<br/>Asylgrundrecht, keine Anerkennung<br/>als Asylberechtigter; Einreise-<br/>verweigerung bzw. Zurückschiebung<br/>an der Grenze<br/>— <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a Abs. 1 S. 1, 2</a>, <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 Abs. 2 Nr. 1</a>"]
    B -->|Nein| F{"Staat durch Rechtsverordnung<br/>als sicherer Drittstaat<br/>i. S. d. Art. 64 VO (EU)<br/>2024/1348 bestimmt?<br/>— <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 Abs. 1</a>"}
    F -->|Ja| G["Unzulässigkeit möglich, sofern<br/>Übernahme oder Rückübernahme<br/>durch diesen Staat gesichert ist<br/>— <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 Abs. 1</a>"]
    F -->|Nein| H{"Herkunftsstaat (Staats-<br/>angehörigkeit) in Anlage II als<br/>sicherer Herkunftsstaat i. S. d.<br/>Art. 16a Abs. 3 GG gelistet?<br/>— <a href='{{ELI}}#art-z29a_abs-z2' target='_blank' rel='noopener'>§29a Abs. 2</a>"}
    H -->|Ja| I["Regelvermutung: offensichtlich<br/>unbegründet, im Einzelfall<br/>widerlegbar<br/>— <a href='{{ELI}}#art-z29a_abs-z1' target='_blank' rel='noopener'>§29a Abs. 1</a>"]
    H -->|Nein| J{"Herkunftsstaat durch Rechts-<br/>verordnung als sicherer<br/>Herkunftsstaat i. S. d. Art. 64<br/>VO (EU) 2024/1348 bestimmt?<br/>— <a href='{{ELI}}#art-z29b_abs-z1' target='_blank' rel='noopener'>§29b Abs. 1</a>"}
    J -->|Ja| K["Beschleunigte Begründetheits-<br/>prüfung, ggf. Ausschluss<br/>bestimmter Vergünstigungen<br/>— <a href='{{ELI}}#art-z29b_abs-z1' target='_blank' rel='noopener'>§29b Abs. 1</a>, <a href='{{ELI}}#art-z29b_abs-z2' target='_blank' rel='noopener'>Abs. 2</a>"]
    J -->|Nein| L["Keine gesetzliche<br/>Sicherheitsvermutung: reguläres<br/>Asylverfahren"]

    style D fill:#d4edda,stroke:#2d8a4a
    style E fill:#f8d7da,stroke:#c0392b
    style G fill:#fff3cd,stroke:#c9a227
    style I fill:#fff3cd,stroke:#c9a227
    style K fill:#fff3cd,stroke:#c9a227
    style L fill:#d4edda,stroke:#2d8a4a
`;export{e as default};