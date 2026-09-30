var e=`---
summary: "Das allgemeine Prüfschema, ob eine Behandlung eine unzulässige Benachteiligung nach dem AGG darstellt, von den geschützten Merkmalen über mögliche Rechtfertigungen bis zur Beweislastverteilung im Streitfall."
---
flowchart TD
    A["Behandlung im sachlichen<br/>Anwendungsbereich — <a href='{{ELI}}/art-z2' target='_blank' rel='noopener'>§2</a>"] --> B{"Erfolgt sie wegen Rasse/ethn.<br/>Herkunft, Geschlecht,<br/>Religion/ Weltanschauung,<br/>Behinderung, Alter oder<br/>sexueller Identität? — <a href='{{ELI}}#art-z1_abs-z' target='_blank' rel='noopener'>§1</a>"}
    B -->|Nein| Z1["Keine Benachteiligung i.S.d. AGG"]
    B -->|Ja| C{"Dient sie dem Ausgleich<br/>bestehender Nachteile durch<br/>geeignete, angemessene<br/>Maßnahme? — <a href='{{ELI}}#art-z5_abs-z' target='_blank' rel='noopener'>§5</a>"}
    C -->|Ja| Z2["Zulässige positive Maßnahme"]
    C -->|Nein| D["Benachteiligung liegt vor als<br/>unmittelbare/mittelbare Benachteiligung,<br/>Belästigung oder Anweisung dazu — <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>"]
    D --> E{"Beruht sie auf mehreren<br/>§1-Gründen gleichzeitig? — <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4</a>"}
    E -->|"Ja: Rechtfertigung muss alle<br/>Gründe abdecken"| F
    E -->|Nein| F{"Ist die unterschiedliche<br/>Behandlung gerechtfertigt nach<br/><a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a>, <a href='{{ELI}}/art-z9' target='_blank' rel='noopener'>§9</a>, <a href='{{ELI}}/art-z10' target='_blank' rel='noopener'>§10</a> oder <a href='{{ELI}}/art-z20' target='_blank' rel='noopener'>§20</a>?"}
    F -->|Ja| Z2
    F -->|Nein| G["Verstoß gegen Benachteiligungsverbot<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1</a>"]
    G --> H{"Beweist eine Partei im<br/>Streitfall Indizien, die eine<br/>Benachteiligung vermuten<br/>lassen? — <a href='{{ELI}}#art-z22_abs-z' target='_blank' rel='noopener'>§22</a>"}
    H -->|Nein| Z3["Anspruch scheitert an der Beweislast"]
    H -->|Ja| Z4["Beweislast für fehlenden Verstoß trägt<br/>die andere Partei — <a href='{{ELI}}#art-z22_abs-z' target='_blank' rel='noopener'>§22</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#d4edda,stroke:#2d8a4a
    style G fill:#fff3cd,stroke:#c9a227
`;export{e as default};