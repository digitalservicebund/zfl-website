var e=`---
summary: "Die Voraussetzungen für ein zulässiges Überholen nach § 5 StVO, etwa fehlende Verkehrszeichen, klare Verkehrslage und ausreichende Sicht, sowie der Ablauf von Ankündigung, Seitenabstand und Wiedereinordnen."
---
flowchart TD
    A["Überholabsicht besteht — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>"] --> B{"Ist Überholen durch<br/>Verkehrszeichen (Zeichen 276,<br/>277) untersagt? — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3<br/>Nr. 2</a>"}
    B -->|Ja| Z1["Überholen unzulässig"]
    B -->|Nein| C{"Liegt eine unklare<br/>Verkehrslage vor? — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3<br/>Nr. 1</a>"}
    C -->|Ja| Z1
    C -->|Nein| D{"Kfz über 7,5 t und Sichtweite<br/>unter 50 m durch Nebel,<br/>Schneefall oder Regen? — <a href='{{ELI}}#art-z5_abs-z3a' target='_blank' rel='noopener'>§5<br/>Abs. 3a</a>"}
    D -->|Ja| Z1
    D -->|Nein| E{"Kann während des ganzen<br/>Überholvorgangs jede<br/>Behinderung des Gegenverkehrs<br/>ausgeschlossen werden? — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5<br/>Abs. 2 S. 1</a>"}
    E -->|Nein| Z1
    E -->|Ja| F{"Fährt man mit wesentlich<br/>höherer Geschwindigkeit als<br/>der zu Überholende? — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs.<br/>2 S. 2</a>"}
    F -->|Nein| Z1
    F -->|Ja| G["Ausscheren rechtzeitig und deutlich<br/>ankündigen (Fahrtrichtungsanzeiger) — <a href='{{ELI}}#art-z5_abs-z4a' target='_blank' rel='noopener'>§5<br/>Abs. 4a</a>"]
    G --> H{"Wird ein Linksabbieger oder<br/>Schienenfahrzeug überholt?<br/>— <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 Abs. 7</a>"}
    H -->|Ja| I["Rechts überholen — <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 Abs. 7</a>"]
    H -->|Nein| J["Links überholen — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"]
    I --> K["Ausreichenden Seitenabstand einhalten<br/>(≥1,5 m innerorts, ≥2 m außerorts bei<br/>Rad-/ Elektrokleinstfahrzeug) — <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs.<br/>4 S. 2-3</a>"]
    J --> K
    K --> L["So bald wie möglich wieder nach rechts<br/>einordnen, ohne den Überholten zu<br/>behindern — <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs. 4 S. 5-6</a>"]
    L --> Z2["Überholvorgang ordnungsgemäß<br/>abgeschlossen"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style G fill:#fff3cd,stroke:#c9a227
`;export{e as default};