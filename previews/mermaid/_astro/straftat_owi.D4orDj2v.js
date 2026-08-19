var e=`---
summary: "Zeigt, welche Handlungen bei unerlaubter Beteiligung an Rennwetten als Straftat oder als Ordnungswidrigkeit einzustufen sind, etwa der Betrieb eines Totalisators ohne Erlaubnis oder das unerlaubte Verbreiten von Rennvoraussagen."
---
flowchart TD
    START{"Unerlaubte Beteiligung an<br/>Rennwetten — welche Handlung<br/>liegt vor?"}

    START -->|"Betreibt ohne Erlaubnis einen<br/>Totalisator oder schließt/vermittelt<br/>gewerbsmäßig Rennwetten"| STRAF1["Straftat: Freiheitsstrafe bis zu<br/>zwei Jahren oder Geldstrafe — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"]

    START -->|"Fordert gewerbsmäßig zum<br/>Abschluss/zur Vermittlung auf,<br/>erbietet sich oder nimmt<br/>Angebote entgegen"| ZUGELASSEN{"Handelt es sich um einen<br/>zugelassenen Wettunternehmer<br/>oder dessen erlaubten Vermittler<br/>im Auftrag? — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.2</a>"}

    ZUGELASSEN -->|Nein| STRAF2["Straftat: Freiheitsstrafe bis zu<br/>sechs Monaten oder Geldstrafe<br/>bis 180 Tagessätze — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.1</a>"]
    ZUGELASSEN -->|Ja| KEIN_VERSTOSS["Kein Verbotsverstoß"]

    START -->|"Buchmacher/Gehilfe schließt oder<br/>vermittelt Wetten außerhalb der<br/>erlaubten Örtlichkeiten"| OWI1["Ordnungswidrigkeit — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"]

    START -->|"Verbreitet gegen Entgelt<br/>Voraussagen über den<br/>Ausgang von Rennen"| REDAKTION{"Redaktionelle Veröffentlichung in<br/>periodisch erscheinender Druckschrift,<br/>die nicht überwiegend der Verbreitung<br/>von Voraussagen dient? — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a>"}

    REDAKTION -->|Ja| KEINE_OWI["Ausnahme greift:<br/>keine Ordnungswidrigkeit"]
    REDAKTION -->|Nein| OWI2["Ordnungswidrigkeit — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II Nr.2</a>"]

    START -->|"Sonstiges pflichtwidriges<br/>Verhalten (unerlaubte Werbung<br/>für Wettabschluss, Duldung in<br/>nicht zugelassenen Räumen,<br/>Aufzeichnungs-/Mitteilungs-<br/>pflichtverstoß)"| OWI3["Ordnungswidrigkeit — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II Nr.1, 3-5</a>"]

    OWI1 --> BUSSGELD["Geldbuße bis zu<br/>5.000 Euro — <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 IV</a>"]
    OWI2 --> BUSSGELD
    OWI3 --> BUSSGELD

    style STRAF1 fill:#f8d7da,stroke:#c0392b
    style STRAF2 fill:#f8d7da,stroke:#c0392b
    style BUSSGELD fill:#fff3cd,stroke:#c9a227
    style KEIN_VERSTOSS fill:#d4edda,stroke:#2d8a4a
    style KEINE_OWI fill:#d4edda,stroke:#2d8a4a
`;export{e as default};