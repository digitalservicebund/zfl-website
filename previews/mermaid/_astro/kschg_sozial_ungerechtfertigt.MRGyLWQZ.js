var e=`flowchart TD
    Start["Prüfung: Ist die Kündigung<br/>sozial ungerechtfertigt? — §1 II, III"] --> G1{"Liegt ein Kündigungsgrund vor:<br/>personen-, verhaltens- oder<br/>betriebsbedingt? Beweislast: AG<br/>— §1 II S.1, S.4"}

    G1 -->|Nein| SU1["Sozial ungerechtfertigt<br/>→ Kündigung unwirksam"]
    G1 -->|Ja| R1{"Verstößt Kündigung gegen<br/>Auswahlrichtlinie (§95 BetrVG<br/>bzw. entspr. Richtlinie im<br/>öffentl. Dienst)? — §1 II S.2 Nr.1a/2a"}

    R1 -->|Ja| SU2["Sozial ungerechtfertigt<br/>→ Kündigung unwirksam"]
    R1 -->|Nein| W1{"Weiterbeschäftigung an anderem<br/>Arbeitsplatz möglich (ggf. nach<br/>zumutbarer Umschulung/Fortbildung<br/>oder zu geänderten Bedingungen<br/>mit Zustimmung des AN)? — §1 II S.2/3"}

    W1 -->|Nein| ArtGrund
    W1 -->|Ja| BRW{"Betriebsrat/Personalvertretung<br/>form- und fristgerecht<br/>widersprochen? — §102 II BetrVG"}

    BRW -->|Ja| SU3["Sozial ungerechtfertigt<br/>→ Kündigung unwirksam"]
    BRW -->|Nein| ArtGrund{"Kündigungsgrund betriebsbedingt<br/>oder personen-/verhaltensbedingt?"}

    ArtGrund -->|"personen-/<br/>verhaltensbedingt"| SG1["Sozial gerechtfertigt<br/>(vorbehaltlich Form-/Fristvorschriften)"]
    ArtGrund -->|betriebsbedingt| NL{"Namensliste im Interessen-<br/>ausgleich bei Betriebsänderung<br/>(§111 BetrVG)? — §1 V"}

    NL -->|"Ja, Sachlage seither<br/>unverändert"| VB["Vermutung: dringende betriebliche<br/>Erfordernisse liegen vor — §1 V S.1"]
    NL -->|"Nein oder Sachlage<br/>wesentlich geändert"| SA{"Sozialauswahlkriterien (Dauer<br/>Betriebszugehörigkeit, Lebensalter,<br/>Unterhaltspflichten, Schwer-<br/>behinderung) hinreichend<br/>berücksichtigt? Beweislast: AN<br/>— §1 III S.1, S.3"}

    VB --> SAG{"Sozialauswahl nur auf grobe<br/>Fehlerhaftigkeit überprüfbar<br/>— §1 V S.2"}
    SAG -->|grob fehlerhaft| SU4["Sozial ungerechtfertigt<br/>→ Kündigung unwirksam"]
    SAG -->|"nicht grob<br/>fehlerhaft"| SG2["Sozial gerechtfertigt"]

    SA -->|Nein| AUSN{"Ausnahme: Weiterbeschäftigung<br/>im berechtigten betrieblichen<br/>Interesse (Kenntnisse/Fähigkeiten/<br/>Personalstruktur)? — §1 III S.2"}
    AUSN -->|Ja| SG2
    AUSN -->|Nein| SU4

    SA -->|Ja| GEW{"Gewichtung der sozialen<br/>Gesichtspunkte durch Tarifvertrag/<br/>Betriebsvereinbarung/Richtlinie<br/>festgelegt? — §1 IV"}
    GEW -->|Ja| SG3["Sozial gerechtfertigt<br/>(gerichtl. Kontrolle nur auf<br/>grobe Fehlerhaftigkeit)"]
    GEW -->|Nein| SG2

    style SU1 fill:#f8d7da,stroke:#c0392b
    style SU2 fill:#f8d7da,stroke:#c0392b
    style SU3 fill:#f8d7da,stroke:#c0392b
    style SU4 fill:#f8d7da,stroke:#c0392b
    style SG1 fill:#d4edda,stroke:#2d8a4a
    style SG2 fill:#d4edda,stroke:#2d8a4a
    style SG3 fill:#d4edda,stroke:#2d8a4a
    style VB fill:#fff3cd,stroke:#c9a227
`;export{e as default};