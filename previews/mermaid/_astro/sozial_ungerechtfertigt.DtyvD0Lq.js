var e=`---
summary: "Die schrittweise Prüfung nach dem KSchG, ob eine betriebs-, personen- oder verhaltensbedingte Kündigung sozial gerechtfertigt ist, einschließlich Weiterbeschäftigungsmöglichkeit, Betriebsratswiderspruch, Namensliste und Sozialauswahl."
---
flowchart TD
    Start["Prüfung: Ist die Kündigung sozial<br/>ungerechtfertigt? — <a href='{{ELI}}/art-z1' target='_blank' rel='noopener'>§1 II, III</a>"] --> G1{"Liegt ein Kündigungsgrund vor:<br/>personen-, verhaltens- oder<br/>betriebsbedingt? Beweislast:<br/>AG — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II S.1, S.4</a>"}

    G1 -->|Nein| SU1["Sozial ungerechtfertigt → Kündigung<br/>unwirksam"]
    G1 -->|Ja| R1{"Verstößt Kündigung gegen<br/>Auswahlrichtlinie (§95 BetrVG<br/>bzw. entspr. Richtlinie im<br/>öffentl. Dienst)? — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II S.2<br/>Nr.1a/2a</a>"}

    R1 -->|Ja| SU2["Sozial ungerechtfertigt → Kündigung<br/>unwirksam"]
    R1 -->|Nein| W1{"Weiterbeschäftigung an anderem<br/>Arbeitsplatz möglich (ggf.<br/>nach zumutbarer<br/>Umschulung/Fortbildung oder zu<br/>geänderten Bedingungen mit<br/>Zustimmung des AN)? — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II<br/>S.2/3</a>"}

    W1 -->|Nein| ArtGrund
    W1 -->|Ja| BRW{"Betriebsrat/Personalvertretung<br/>form- und fristgerecht<br/>widersprochen? — §102 II<br/>BetrVG"}

    BRW -->|Ja| SU3["Sozial ungerechtfertigt → Kündigung<br/>unwirksam"]
    BRW -->|Nein| ArtGrund{"Kündigungsgrund<br/>betriebsbedingt oder<br/>personen-/verhaltensbedingt?"}

    ArtGrund -->|"personen-/ verhaltensbedingt"| SG1["Sozial gerechtfertigt (vorbehaltlich<br/>Form-/Fristvorschriften)"]
    ArtGrund -->|betriebsbedingt| NL{"Namensliste im<br/>Interessenausgleich bei<br/>Betriebsänderung (§111<br/>BetrVG)? — <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 V</a>"}

    NL -->|"Ja, Sachlage seither<br/>unverändert"| VB["Vermutung: dringende betriebliche<br/>Erfordernisse liegen vor — <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 V S.1</a>"]
    NL -->|"Nein oder Sachlage wesentlich<br/>geändert"| SA{"Sozialauswahlkriterien (Dauer<br/>Betriebszugehörigkeit,<br/>Lebensalter,<br/>Unterhaltspflichten,<br/>Schwerbehinderung) hinreichend<br/>berücksichtigt? Beweislast: AN<br/>— <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 III S.1, S.3</a>"}

    VB --> SAG{"Sozialauswahl nur auf grobe<br/>Fehlerhaftigkeit überprüfbar<br/>— <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 V S.2</a>"}
    SAG -->|grob fehlerhaft| SU4["Sozial ungerechtfertigt → Kündigung<br/>unwirksam"]
    SAG -->|"nicht grob fehlerhaft"| SG2["Sozial gerechtfertigt"]

    SA -->|Nein| AUSN{"Ausnahme: Weiterbeschäftigung<br/>im berechtigten betrieblichen<br/>Interesse<br/>(Kenntnisse/Fähigkeiten/<br/>Personalstruktur)? — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 III<br/>S.2</a>"}
    AUSN -->|Ja| SG2
    AUSN -->|Nein| SU4

    SA -->|Ja| GEW{"Gewichtung der sozialen<br/>Gesichtspunkte durch<br/>Tarifvertrag/<br/>Betriebsvereinbarung/Richtlinie<br/>festgelegt? — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV</a>"}
    GEW -->|Ja| SG3["Sozial gerechtfertigt (gerichtl.<br/>Kontrolle nur auf grobe<br/>Fehlerhaftigkeit)"]
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