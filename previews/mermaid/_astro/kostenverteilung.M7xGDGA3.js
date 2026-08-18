var e=`flowchart TD
    S["Gesamtkosten der Versorgung<br/>mit Wärme und/oder Warmwasser"] --> Q1{"Zentrale Wärme- und<br/>Warmwasseranlage<br/>baulich verbunden? — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"}

    Q1 -->|Ja| C9["Einheitlich entstandene Kosten aufteilen<br/>nach Brennstoff-/Energieverbrauchsanteilen<br/>(Heizkessel) bzw. Wärmeverbrauchsanteilen<br/>(Wärmepumpe/gew. Wärmelieferung) — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"]
    C9 --> C9Q["Warmwasser-Wärmeanteil (Q) messen<br/>oder berechnen: Q = 2,5 × V × (tw−10),<br/>hilfsweise Q = 32 × A_Wohn — <a href='{{ELI}}/art-z9' target='_blank' rel='noopener'>§9 II/III</a>"]
    C9Q --> KW["Kostenblock: Wärme"]
    C9Q --> KWW["Kostenblock: Warmwasser"]

    Q1 -->|Nein, getrennte Anlagen| KW
    Q1 -->|Nein, getrennte Anlagen| KWW

    KW --> R1{"Verbrauch mit unterschiedlichen<br/>Ausstattungen erfasst?<br/>(Vorerfassung nötig) — <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 VII</a>"}
    KWW --> R2{"Verbrauch mit unterschiedlichen<br/>Ausstattungen erfasst?<br/>(Vorerfassung nötig) — <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 VII</a>"}

    R1 -->|Ja| VGW["Vorerfassung: mind. 50% nach<br/>Verbrauchsanteil der Nutzergruppen,<br/>Rest nach Fläche/Raum je Gruppe<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 II Nr.1</a>"]
    R2 -->|Ja| VGWW["Vorerfassung: mind. 50% nach<br/>Verbrauchsanteil der Nutzergruppen,<br/>Rest nach Fläche je Gruppe<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 II Nr.2</a>"]

    R1 -->|Nein| G1{"Sonderfall Gebäude-/<br/>Leitungsdämmung? — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"}
    G1 -->|"Altbau vor WärmeschutzV 1994,<br/>Öl/Gas, Leitungen gedämmt"| F70["Zwingend 70% nach<br/>erfasstem Wärmeverbrauch<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.2</a>"]
    G1 -->|"Leitungen überwiegend<br/>ungedämmt"| FSCH["Wärmeverbrauch nach anerkannten<br/>Regeln der Technik geschätzt,<br/>gilt als erfasster Verbrauch — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.3/4</a>"]
    G1 -->|"Regelfall"| FWAHL["Eigentümer wählt frei zwischen<br/>50–70% nach erfasstem<br/>Wärmeverbrauch — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.1</a>"]
    F70 --> REST_W["Rest nach Wohn-/Nutzfläche<br/>oder umbautem Raum — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.5</a>"]
    FSCH --> REST_W
    FWAHL --> REST_W

    R2 -->|Nein| FWW["Eigentümer wählt frei zwischen<br/>50–70% nach erfasstem<br/>Warmwasserverbrauch — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"]
    FWW --> REST_WW["Rest nach Wohn-/<br/>Nutzfläche — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"]

    VGW --> IND
    VGWW --> IND
    REST_W --> IND
    REST_WW --> IND

    IND["Individuelle Verteilung<br/>auf jeden Nutzer — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>"] --> END["Abrechnung + Verbrauchsinformation<br/>an den Nutzer — <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6</a>, <a href='{{ELI}}/art-z6a' target='_blank' rel='noopener'>§6a</a>"]

    classDef preStep fill:#cfe2f3,stroke:#2b6ea3
    classDef waerme fill:#ffe5cc,stroke:#cc7a00
    classDef wasser fill:#d9f2f0,stroke:#1a8f87
    classDef final fill:#d4edda,stroke:#2d8a4a

    class S,Q1,C9,C9Q,KW,KWW preStep
    class R1,G1,F70,FSCH,FWAHL,REST_W,VGW waerme
    class R2,FWW,REST_WW,VGWW wasser
    class IND,END final
`;export{e as default};