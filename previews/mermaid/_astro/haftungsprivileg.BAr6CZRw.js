var e=`flowchart TD
    S["Nutzer begeht eine rechtswidrige<br/>Handlung über einen digitalen Dienst<br/>(z.B. Verletzung geistigen Eigentums)"] --> Q1{"Ist der Diensteanbieter nach<br/>Art. 4-6 VO (EU) 2022/2065<br/>von der Haftung freigestellt<br/>(Mere-Conduit-/Hosting-Privileg)?<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"}

    Q1 -->|Nein| Z1["Kein Haftungsprivileg nach dem DDG —<br/>allgemeine Haftungsvorschriften<br/>gelten uneingeschränkt"]

    Q1 -->|Ja| Q2{"Arbeitet der Diensteanbieter<br/>absichtlich mit dem Nutzer<br/>zusammen, um die rechtswidrige<br/>Handlung zu begehen?<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.2</a>"}

    Q2 -->|Ja| Z2["Haftungsprivileg entfällt:<br/>Schadensersatz-, Beseitigungs- und<br/>Unterlassungsansprüche sowie<br/>Kostenerstattung sind möglich<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.2</a>"]

    Q2 -->|Nein| T1["Kein Schadensersatz-, Beseitigungs-<br/>oder Unterlassungsanspruch gegen<br/>den Diensteanbieter; keine Kosten-<br/>erstattung — auch bei unentgeltlichem<br/>oder öffentlichem Dienst<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.1</a>, <a href='{{ELI}}#art-z7_abs-z4' target='_blank' rel='noopener'>IV</a>"]

    T1 --> H["Gerichtliche oder behördliche<br/>Anordnungen zur Entfernung/Sperrung<br/>von Informationen nach den allgemeinen<br/>Gesetzen bleiben unberührt<br/>— <a href='{{ELI}}#art-z8_abs-z4' target='_blank' rel='noopener'>§8 IV S.2</a>"]

    T1 --> Q3{"Geht es um eine Verletzung des<br/>Rechts am geistigen Eigentum durch<br/>Übermittlung von Informationen oder<br/>Vermittlung des Netzzugangs<br/>(z.B. WLAN-Access-Dienst)?<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"}

    Q3 -->|Nein| Z3["Kein Sperrungsanspruch<br/>nach §8"]

    Q3 -->|Ja| Q4{"Besteht für den Rechtsinhaber<br/>keine andere Möglichkeit, der<br/>Rechtsverletzung abzuhelfen?<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"}

    Q4 -->|Nein| Z4["Sperrungsanspruch subsidiär<br/>ausgeschlossen"]

    Q4 -->|Ja| Q5{"Ist die verlangte Sperrung<br/>dem Diensteanbieter zumutbar<br/>und verhältnismäßig?<br/>— <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 II</a>"}

    Q5 -->|Nein| Z5["Kein Anspruch auf die<br/>verlangte Sperrung"]

    Q5 -->|Ja| Z6["Anspruch auf Sperrung der Nutzung<br/>der Information zur Verhinderung<br/>der Wiederholung — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>;<br/>Kostenerstattung nur bei bewusster<br/>Kollusion — <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III</a>"]

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style H fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#f8d7da,stroke:#c0392b
    style Z5 fill:#f8d7da,stroke:#c0392b
    style Z6 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};