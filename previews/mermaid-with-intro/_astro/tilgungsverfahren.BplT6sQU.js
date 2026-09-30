var e=`---
summary: "Das Verfahren zur Tilgung früherer cannabisbezogener Verurteilungen im Bundeszentralregister nach dem KCanG: Antrag der verurteilten Person, Prüfung und Feststellung der Tilgungsfähigkeit durch die Staatsanwaltschaft und Tilgung durch die Registerbehörde, einschließlich einer möglichen Rücknahme."
---
swimlane-beta TD
    subgraph VP["Verurteilte Person"]
        start(["Eintragung im Bundeszentralregister<br/>wegen Verurteilung nach §29 BtMG"])
        antrag["Antrag auf Feststellung der<br/>Tilgungsfähigkeit, schriftlich oder zu<br/>Protokoll bei jeder Staatsanwaltschaft<br/>— <a href='{{ELI}}#art-z41_abs-z1' target='_blank' rel='noopener'>§41 I</a>, <a href='{{ELI}}#art-z41_abs-z3' target='_blank' rel='noopener'>§41 III S.4</a>"]
        glaubhaft["Glaubhaftmachung der Voraussetzungen,<br/>ggf. eidesstattliche Versicherung — <a href='{{ELI}}#art-z41_abs-z2' target='_blank' rel='noopener'>§41<br/>II</a>"]
        bleibt(["Eintragung bleibt bestehen"])
        mitteilungErhalten("Erhält Mitteilung der Feststellung — <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42<br/>I S.1</a>")
        stellungnahme["Gelegenheit zur Stellungnahme vor der<br/>Rücknahme — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV S.2</a>"]
    end

    subgraph StA["Staatsanwaltschaft"]
        zustaendig["Örtlich zuständige StA: Gericht des<br/>ersten Rechtszugs, hilfsweise Wohnsitz,<br/>bei Wohnsitz im Ausland StA Berlin — <a href='{{ELI}}#art-z41_abs-z3' target='_blank' rel='noopener'>§41<br/>III S.1-3</a>"]
        voraussetzungen{"Verurteilt wegen unerlaubten<br/>Umgangs mit Cannabis oder<br/>Vermehrungsmaterial — <a href='{{ELI}}#art-z40_abs-z1' target='_blank' rel='noopener'>§40 I<br/>Nr.1</a>,<br/>heute straflos oder nur<br/>Geldbuße — <a href='{{ELI}}#art-z40_abs-z1' target='_blank' rel='noopener'>§40 I Nr.2</a>? (auch<br/>Gesamtstrafen — <a href='{{ELI}}#art-z40_abs-z2' target='_blank' rel='noopener'>§40 II</a>)"}
        q3{"Auch wegen weiterhin<br/>strafbarer Taten verurteilt?<br/>— <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III</a><br/>(auch Gesamtstrafen — <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III<br/>S.3</a>)"}
        ablehnung["Bescheidet die Person unter Angabe der<br/>Gründe — <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I S.2</a>"]
        feststellung["Stellt Tilgungsfähigkeit fest und teilt<br/>dies Registerbehörde und Person mit<br/>— <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I S.1</a>"]
        pruefRuecknahme["Feststellung erweist sich als zu Unrecht<br/>getroffen — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV</a>"]
        ruecknahme["Nimmt Feststellung zurück, teilt<br/>Rücknahme und Daten nach §5 BZRG der<br/>Registerbehörde mit — <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV S.1</a>"]
    end

    subgraph RB["Registerbehörde"]
        tilgung(["Tilgt die Eintragung im<br/>Bundeszentralregister — <a href='{{ELI}}#art-z42_abs-z2' target='_blank' rel='noopener'>§42 II</a>"])
        wiedereintragung(["Trägt getilgte Verurteilung wieder ein<br/>— <a href='{{ELI}}#art-z41_abs-z4' target='_blank' rel='noopener'>§41 IV S.1</a>"])
    end

    start --> antrag
    antrag --> glaubhaft
    glaubhaft --> zustaendig
    zustaendig --> voraussetzungen
    voraussetzungen -->|Nein| ablehnung
    voraussetzungen -->|Ja| q3
    q3 -->|"Ja: Tilgung ausgeschlossen"| ablehnung
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
`;export{e as default};