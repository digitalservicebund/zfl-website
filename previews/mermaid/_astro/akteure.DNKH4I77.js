var e=`---
summary: "Zeigt die Stellen, die nach der URV am Unternehmensregister beteiligt sind – registerführende Stelle, Landesjustizverwaltungen, Betreiber des Bundesanzeigers, Veröffentlichungs- und Offenlegungspflichtige, BaFin, Bundesministerium der Justiz, BSI, Betreiber der Steuerberaterplattform und Nutzer – sowie ihre Übermittlungs-, Aufsichts- und Mitwirkungsbeziehungen."
---
flowchart LR
    RS["<b>Registerführende Stelle</b><br/>erstellt Sicherheitskonzept — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III</a><br/>prüft übermittelte Daten, macht sie zugänglich,<br/>berichtigt und löscht sie — <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a><br/>kann entgeltliche Auskunftsdienstleistungen anbieten — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a>"]

    subgraph Bund["Bund"]
        BMJ["<b>Bundesministerium der Justiz und für Verbraucherschutz</b><br/>Kontroll- und Aufsichtsbehörde über das<br/>Unternehmensregister — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II S.3</a>"]
        BaFin["<b>Bundesanstalt für Finanzdienstleistungsaufsicht</b><br/>überwacht Mindestqualitätsnormen für<br/>kapitalmarktrechtliche Daten — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a><br/>übermittelt Daten nach §8b II Nr.13 HGB — <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III</a>"]
        BSI["<b>Bundesamt für Sicherheit in der Informationstechnik</b><br/>Einvernehmen zum Sicherheitskonzept — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III</a>"]
    end

    subgraph Laender["Länder"]
        LJV["<b>Landesjustizverwaltungen</b><br/>übermitteln Indexdaten — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a><br/>aktualisieren unverzüglich bzw. täglich — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a><br/>eröffnen Zugang zu den Originaldaten — <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II S.2</a>"]
    end

    subgraph Uebermittelnde["Übermittelnde"]
        BAZ["<b>Betreiber des Bundesanzeigers</b><br/>übermittelt veröffentlichte Daten bis Ablauf<br/>des folgenden Arbeitstages — <a href='{{ELI}}/art-z10' target='_blank' rel='noopener'>§10</a>"]
        VOP["<b>Veröffentlichungs- und Offenlegungspflichtige<br/>oder beauftragte Dritte</b><br/>übermitteln Daten nach Registrierung — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a><br/>übermitteln Rechnungslegungsunterlagen — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a><br/>können Berichtigung verlangen — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.4</a>"]
    end

    subgraph Weitere["Nutzer und Schnittstellen"]
        Nutzer["<b>Nutzer</b><br/>Einsichtnahme ohne Registrierung — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I S.2</a><br/>Kopien als Auszug aus dem Unternehmensregister — <a href='{{ELI}}#art-z13_abs-z3' target='_blank' rel='noopener'>§13 III</a>"]
        StB["<b>Betreiber der Steuerberaterplattform</b><br/>Nutzer dort identifiziert, keine erneute<br/>Identifikation nötig — <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV S.2</a>"]
    end

    LJV -->|"übermitteln Indexdaten — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>, §§6-8"| RS
    BAZ -->|"übermittelt Daten — <a href='{{ELI}}/art-z10' target='_blank' rel='noopener'>§10</a>"| RS
    VOP -->|"übermitteln Daten — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>, II"| RS
    BaFin -->|"überwacht, übermittelt Daten — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a>, §11 III"| RS
    BaFin -->|"wirkt auf Pflichterfüllung hin — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II S.3</a>"| BMJ
    BMJ -->|"Kontrolle und Aufsicht — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II S.3</a>"| RS
    BSI -->|"Einvernehmen — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III</a>"| RS
    RS -->|"verlangt Identifizierungsdaten — <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV S.3</a>"| StB
    RS -->|"Einsichtnahme, Suche — <a href='{{ELI}}/art-z13' target='_blank' rel='noopener'>§13</a>, §14"| Nutzer
    LJV -->|"eröffnen Zugang zu Originaldaten — <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II</a>"| Nutzer

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class RS zentral
    class BaFin,BSI,LJV behoerde
    class BAZ,VOP,Nutzer,StB privat
    class BMJ parlament
`;export{e as default};