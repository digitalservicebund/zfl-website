var e=`---
summary: "Zeigt das Verfahren zur Tilgung früherer cannabisbezogener Verurteilungen im Bundeszentralregister nach dem KCanG: Antrag der verurteilten Person, Prüfung und Feststellung der Tilgungsfähigkeit durch die Staatsanwaltschaft und Tilgung durch die Registerbehörde, einschließlich einer möglichen Rücknahme."
---
swimlane-beta TD
    subgraph VP["Verurteilte Person"]
        start(["Eintragung im Bundeszentralregister<br/>wegen Verurteilung nach §29 BtMG"])
        antrag["Antrag auf Feststellung der<br/>Tilgungsfähigkeit, schriftlich oder zu<br/>Protokoll bei jeder Staatsanwaltschaft<br/>— <a href='{{ELI}}#art-z41_abs-z1' target='_blank' rel='noopener'>§41 I</a>, <a href='{{ELI}}#art-z41_abs-z3' target='_blank' rel='noopener'>§41 III S.4</a>"]
        glaubhaft["Glaubhaftmachung der Voraussetzungen,<br/>ggf. eidesstattliche Versicherung<br/>— <a href='{{ELI}}#art-z41_abs-z2' target='_blank' rel='noopener'>§41 II</a>"]
        bleibt(["Eintragung bleibt bestehen"])
        mitteilungErhalten("Erhält Mitteilung<br/>der Feststellung — <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I S.1</a>")
        stellungnahme["Gelegenheit zur Stellungnahme<br/>vor der Rücknahme — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV S.2</a>"]
    end

    subgraph StA["Staatsanwaltschaft"]
        zustaendig["Örtlich zuständige StA: Gericht des<br/>ersten Rechtszugs, hilfsweise Wohnsitz,<br/>bei Wohnsitz im Ausland StA Berlin<br/>— <a href='{{ELI}}#art-z41_abs-z3' target='_blank' rel='noopener'>§41 III S.1-3</a>"]
        q1{"Verurteilt wegen unerlaubten<br/>Umgangs mit Cannabis oder<br/>Vermehrungsmaterial?<br/>— <a href='{{ELI}}#art-z40_abs-z1' target='_blank' rel='noopener'>§40 I Nr.1</a>"}
        q2{"Sieht das geltende Recht keine<br/>Strafe mehr oder nur noch<br/>Geldbuße vor?<br/>— <a href='{{ELI}}#art-z40_abs-z1' target='_blank' rel='noopener'>§40 I Nr.2</a>"}
        q3{"Auch wegen weiterhin<br/>strafbarer Taten verurteilt?<br/>— <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III</a>"}
        hinweisGesamt["Gilt entsprechend für nachträglich<br/>gebildete Gesamtstrafen<br/>— <a href='{{ELI}}#art-z40_abs-z2' target='_blank' rel='noopener'>§40 II</a>, <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III S.3</a>"]
        ablehnung["Bescheidet die Person<br/>unter Angabe der Gründe<br/>— <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I S.2</a>"]
        feststellung["Stellt Tilgungsfähigkeit fest und<br/>teilt dies Registerbehörde und<br/>Person mit — <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I S.1</a>"]
        pruefRuecknahme["Feststellung erweist sich als<br/>zu Unrecht getroffen — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV</a>"]
        ruecknahme["Nimmt Feststellung zurück, teilt<br/>Rücknahme und Daten nach §5 BZRG<br/>der Registerbehörde mit — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV S.1</a>"]
    end

    subgraph RB["Registerbehörde"]
        tilgung(["Tilgt die Eintragung im<br/>Bundeszentralregister — <a href='{{ELI}}#art-z42_abs-z2' target='_blank' rel='noopener'>§42 II</a>"])
        wiedereintragung(["Trägt getilgte Verurteilung<br/>wieder ein — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV S.1</a>"])
    end

    start --> antrag
    antrag --> glaubhaft
    glaubhaft --> zustaendig
    zustaendig --> q1
    q1 -.- hinweisGesamt
    q1 -->|Nein| ablehnung
    q1 -->|Ja| q2
    q2 -->|Nein| ablehnung
    q2 -->|Ja| q3
    q3 -->|"Ja: Tilgung<br/>ausgeschlossen"| ablehnung
    q3 -->|Nein| feststellung
    ablehnung --> bleibt
    feststellung --> tilgung
    feststellung -.-> mitteilungErhalten
    tilgung -.->|"später"| pruefRuecknahme
    pruefRuecknahme --> stellungnahme
    stellungnahme --> ruecknahme
    ruecknahme --> wiedereintragung

    style tilgung fill:#d4edda,stroke:#2d8a4a
    style bleibt fill:#f8d7da,stroke:#c0392b
    style wiedereintragung fill:#fff3cd,stroke:#c9a227
    style hinweisGesamt fill:#f5f5f5,stroke:#999
`;export{e as default};