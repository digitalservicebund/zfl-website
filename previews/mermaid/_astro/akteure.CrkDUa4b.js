var e=`---
summary: "Zeigt die Akteure des Arbeitnehmererfindungsrechts: Arbeitnehmer und Arbeitgeber mit ihren wechselseitigen Pflichten, die Schiedsstelle beim Deutschen Patent- und Markenamt als zentrale Streitschlichtungsstelle sowie die Stellen, die sie besetzen, Richtlinien erlassen oder über Klagen entscheiden."
---
flowchart LR
    SST["<b>Schiedsstelle</b><br/>beim Deutschen Patent- und Markenamt errichtet — <a href='{{ELI}}#art-z29_abs-z1' target='_blank' rel='noopener'>§29 I</a><br/>versucht in Streitfällen gütliche Einigung — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a><br/>macht begründeten Einigungsvorschlag — <a href='{{ELI}}#art-z34_abs-z2' target='_blank' rel='noopener'>§34 II</a><br/>an Weisungen nicht gebunden — <a href='{{ELI}}#art-z30_abs-z6' target='_blank' rel='noopener'>§30 VI</a>"]

    subgraph Parteien["Arbeitsverhältnis"]
        AN["<b>Arbeitnehmer</b><br/>meldet Diensterfindungen — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a><br/>teilt freie Erfindungen mit — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a><br/>Anspruch auf angemessene Vergütung — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a><br/>Geheimhaltung bis zum Freiwerden — <a href='{{ELI}}#art-z24_abs-z2' target='_blank' rel='noopener'>§24 II</a>"]
        AG["<b>Arbeitgeber</b><br/>Inanspruchnahme oder Freigabe — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a><br/>Pflicht zur Schutzrechtsanmeldung — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a><br/>setzt Vergütung fest — <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 III</a><br/>Geheimhaltung gemeldeter Erfindungen — <a href='{{ELI}}#art-z24_abs-z1' target='_blank' rel='noopener'>§24 I</a>"]
        InsV["<b>Insolvenzverwalter</b><br/>zahlt Vergütung bei Verwertung aus der Masse — <a href='{{ELI}}#art-z27_abs-z' target='_blank' rel='noopener'>§27 Nr. 2</a><br/>bietet Erfindung sonst dem Arbeitnehmer an — <a href='{{ELI}}#art-z27_abs-z' target='_blank' rel='noopener'>§27 Nr. 3</a>"]
    end

    subgraph Bund["Richtlinien und Besetzung der Schiedsstelle"]
        Spitz["<b>Spitzenorganisationen der Arbeitgeber und Arbeitnehmer, Gewerkschaften</b><br/>vor Erlass der Vergütungsrichtlinien angehört — <a href='{{ELI}}#art-z11_abs-z' target='_blank' rel='noopener'>§11</a><br/>reichen Vorschlagslisten für Beisitzer ein — <a href='{{ELI}}#art-z30_abs-z4' target='_blank' rel='noopener'>§30 IV</a>"]
        BMJV["<b>Bundesministerium der Justiz und für Verbraucherschutz</b><br/>beruft Vorsitzenden für vier Jahre — <a href='{{ELI}}#art-z30_abs-z2' target='_blank' rel='noopener'>§30 II</a><br/>erlässt Durchführungsbestimmungen — <a href='{{ELI}}#art-z45_abs-z' target='_blank' rel='noopener'>§45</a>"]
        BMAS["<b>Bundesministerium für Arbeit und Soziales</b><br/>erlässt Vergütungsrichtlinien — <a href='{{ELI}}#art-z11_abs-z' target='_blank' rel='noopener'>§11</a>"]
        PDPMA["<b>Präsident des Deutschen Patent- und Markenamts</b><br/>beruft Beisitzer für den Streitfall — <a href='{{ELI}}#art-z30_abs-z3' target='_blank' rel='noopener'>§30 III</a><br/>bestellt Beisitzer aus Vorschlagslisten — <a href='{{ELI}}#art-z30_abs-z4' target='_blank' rel='noopener'>§30 IV</a><br/>Dienstaufsicht über den Vorsitzenden — <a href='{{ELI}}#art-z30_abs-z6' target='_blank' rel='noopener'>§30 VI</a>"]
    end

    subgraph Justiz["Gerichtsbarkeit"]
        Gericht["<b>Für Patentstreitsachen zuständige Gerichte</b><br/>ausschließlich zuständig für Erfindungsstreitigkeiten — <a href='{{ELI}}#art-z39_abs-z1' target='_blank' rel='noopener'>§39 I</a><br/>Klage grundsätzlich erst nach Schiedsverfahren — <a href='{{ELI}}#art-z37_abs-z1' target='_blank' rel='noopener'>§37 I</a>"]
    end

    AN -->|"Meldung, Mitteilung — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>, §18 I"| AG
    AG -->|"Inanspruchnahme, Vergütung — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>, §12 III"| AN
    AN & AG -->|"rufen an — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a>"| SST
    BMJV -->|"beruft Vorsitzenden — <a href='{{ELI}}#art-z30_abs-z2' target='_blank' rel='noopener'>§30 II</a>"| SST
    PDPMA -->|"beruft Beisitzer — <a href='{{ELI}}#art-z30_abs-z3' target='_blank' rel='noopener'>§30 III</a>, IV"| SST
    Spitz -->|"Vorschlagslisten — <a href='{{ELI}}#art-z30_abs-z4' target='_blank' rel='noopener'>§30 IV</a>"| PDPMA
    BMAS -->|"hört an — <a href='{{ELI}}#art-z11_abs-z' target='_blank' rel='noopener'>§11</a>"| Spitz
    BMAS -->|"Einvernehmen — <a href='{{ELI}}#art-z45_abs-z' target='_blank' rel='noopener'>§45</a>"| BMJV
    AN & AG -->|"Klage nach Schiedsverfahren — <a href='{{ELI}}#art-z37_abs-z1' target='_blank' rel='noopener'>§37 I</a>"| Gericht
    InsV -->|"Angebot, Vergütung — <a href='{{ELI}}#art-z27_abs-z' target='_blank' rel='noopener'>§27</a>"| AN

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class SST zentral
    class PDPMA,Gericht behoerde
    class AN,AG,Spitz,InsV privat
    class BMJV,BMAS parlament
`;export{e as default};