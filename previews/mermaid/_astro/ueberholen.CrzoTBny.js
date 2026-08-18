var e=`flowchart TD
    A["Überholabsicht besteht<br/>— <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>"] --> B{"Ist Überholen durch<br/>Verkehrszeichen (Zeichen<br/>276, 277) untersagt?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3 Nr. 2</a>"}
    B -->|Ja| Z1["Überholen unzulässig"]
    B -->|Nein| C{"Liegt eine unklare<br/>Verkehrslage vor?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3 Nr. 1</a>"}
    C -->|Ja| Z1
    C -->|Nein| D{"Kfz über 7,5 t und<br/>Sichtweite unter 50 m<br/>durch Nebel, Schneefall<br/>oder Regen?<br/>— <a href='{{ELI}}#art-z5_abs-z3a' target='_blank' rel='noopener'>§5 Abs. 3a</a>"}
    D -->|Ja| Z1
    D -->|Nein| E{"Kann während des ganzen<br/>Überholvorgangs jede<br/>Behinderung des<br/>Gegenverkehrs<br/>ausgeschlossen werden?<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2 S. 1</a>"}
    E -->|Nein| Z1
    E -->|Ja| F{"Fährt man mit wesentlich<br/>höherer Geschwindigkeit<br/>als der zu Überholende?<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2 S. 2</a>"}
    F -->|Nein| Z1
    F -->|Ja| G["Ausscheren rechtzeitig<br/>und deutlich ankündigen<br/>(Fahrtrichtungsanzeiger)<br/>— <a href='{{ELI}}#art-z5_abs-z4a' target='_blank' rel='noopener'>§5 Abs. 4a</a>"]
    G --> H{"Wird ein Linksabbieger<br/>oder Schienenfahrzeug<br/>überholt?<br/>— <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 Abs. 7</a>"}
    H -->|Ja| I["Rechts überholen<br/>— <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 Abs. 7</a>"]
    H -->|Nein| J["Links überholen<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"]
    I --> K["Ausreichenden<br/>Seitenabstand einhalten<br/>(≥1,5 m innerorts,<br/>≥2 m außerorts bei Rad-/<br/>Elektrokleinstfahrzeug)<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs. 4 S. 2-3</a>"]
    J --> K
    K --> L["So bald wie möglich<br/>wieder nach rechts<br/>einordnen, ohne den<br/>Überholten zu behindern<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs. 4 S. 5-6</a>"]
    L --> Z2["Überholvorgang<br/>ordnungsgemäß abgeschlossen"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style G fill:#fff3cd,stroke:#c9a227
`;export{e as default};