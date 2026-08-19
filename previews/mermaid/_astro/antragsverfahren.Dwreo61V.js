var e=`---
summary: "Zeigt das Anerkennungsverfahren für Kriegsdienstverweigerer nach dem KDVG, von der Antragstellung über die Prüfung von Vollständigkeit, Musterung und Beweggründen bis zur schriftlichen oder mündlichen Anhörung und der Entscheidung."
---
flowchart TD
    A["Antrag auf Anerkennung als<br/>Kriegsdienstverweigerer/in wird<br/>schriftlich oder zur Niederschrift<br/>beim Bundesamt für das<br/>Personalmanagement der Bundeswehr<br/>gestellt — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2</a>"] --> B["Bundesamt für das Personalmanagement<br/>bestätigt Eingang und nimmt Antrag<br/>zur Grundakte — <a href='{{ELI}}#art-z2_abs-z6' target='_blank' rel='noopener'>§2 Abs. 6</a>"]
    B --> C["Zuleitung der Grundakte an das<br/>Bundesamt für Familie und<br/>zivilgesellschaftliche Aufgaben<br/>(unverzüglich, bei ungedienten<br/>Wehrpflichtigen nach unanfechtbarem<br/>Musterungsbescheid) — <a href='{{ELI}}#art-z2_abs-z6' target='_blank' rel='noopener'>§2 Abs. 6</a>"]
    C --> D0{"Soldatin/Soldat, einberufener<br/>ungedienter Wehrpflichtiger oder<br/>einberufene Reservistin/Reservist?<br/>— <a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>"}
    D0 -->|Ja| D1["Vorrangige Entscheidung<br/>über den Antrag<br/>— <a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>"]
    D0 -->|Nein| D2
    D1 --> D2{"Ist der Antrag vollständig?<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2</a>"}
    D2 -->|Nein| D3["Bundesamt fordert zur<br/>Vervollständigung binnen<br/>1 Monat auf<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 2</a>"]
    D3 --> D4{"Innerhalb der Frist<br/>vervollständigt?"}
    D4 -->|Nein| Z1["Ablehnung des Antrags<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 2</a>"]
    D4 -->|Ja| E1
    D2 -->|Ja| E1{"Wehrpflichtiger: Musterung<br/>verweigert?<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 1</a>"}
    E1 -->|Ja| Z1
    E1 -->|Nein| F1{"Begründen die dargelegten<br/>Beweggründe das Recht auf<br/>Kriegsdienstverweigerung?<br/>— <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 Nr. 2</a>"}
    F1 -->|Nein| Z1b["Ablehnung — auch nach<br/>schriftlicher und ggf.<br/>mündlicher Anhörung nicht<br/>ausgeräumt<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 3</a>"]
    F1 -->|Ja| G1{"Bestehen Zweifel an der<br/>Wahrheit der Angaben?<br/>— <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 Nr. 3</a>"}
    G1 -->|Nein| Z2["Anerkennung als<br/>Kriegsdienstverweigerer/in<br/>— <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>"]
    G1 -->|Ja| G2["Schriftliche Anhörung:<br/>Äußerung/Belege binnen<br/>1 Monat (ggf. Anforderung<br/>eines Führungszeugnisses)<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 1</a>"]
    G2 --> G3{"Zweifel danach<br/>ausgeräumt?"}
    G3 -->|Ja| Z2
    G3 -->|Nein| G4["Mündliche Anhörung<br/>(nicht öffentlich, mit<br/>Protokoll)<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 2</a>"]
    G4 --> G5{"Ladung zur mündlichen<br/>Anhörung befolgt?"}
    G5 -->|Nein| G6["Entscheidung nach<br/>Aktenlage<br/>— <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 Abs. 2</a>"]
    G5 -->|Ja| G7{"Zweifel danach<br/>ausgeräumt?"}
    G6 --> G7
    G7 -->|Ja| Z2
    G7 -->|Nein| Z3["Ablehnung des Antrags<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 4</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z1b fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};