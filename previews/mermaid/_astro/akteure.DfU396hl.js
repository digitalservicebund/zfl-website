var e=`---
summary: "Zeigt die zentralen Akteure des Geldwäschegesetzes rund um die Zentralstelle für Finanztransaktionsuntersuchungen (FIU): Verpflichtete, Aufsichtsbehörden, Transparenzregister, Strafverfolgung, Bundesministerium der Finanzen und ausländische Meldestellen, mit ihren Melde-, Aufsichts- und Kooperationsbeziehungen."
---
flowchart LR
    FIU["<b>Zentralstelle für Finanztransaktionsuntersuchungen (FIU)</b><br/>Zentrale Meldestelle — <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 I</a><br/>fachlich unabhängig — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II</a><br/>Sammelt und analysiert Meldungen, gibt Ergebnisse weiter — <a href='{{ELI}}#art-z28_abs-z1' target='_blank' rel='noopener'>§28 I</a>"]

    subgraph Wirtschaft["Wirtschaft"]
        VP["<b>Verpflichtete</b><br/>Banken, Versicherer, Güterhändler, Notare, Anwälte u. a. — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a><br/>Risikomanagement — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a><br/>Allgemeine Sorgfaltspflichten — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a>"]
        GWB["<b>Geldwäschebeauftragter</b><br/>Auf Führungsebene, zuständig für Einhaltung der Vorschriften — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a><br/>Ansprechpartner für FIU, Aufsicht, Strafverfolgung — <a href='{{ELI}}#art-z7_abs-z5' target='_blank' rel='noopener'>§7 V</a>"]
        VER["<b>Vereinigungen und Rechtsgestaltungen</b><br/>Juristische Personen, Personengesellschaften: Angabe wirtschaftlich Berechtigter — <a href='{{ELI}}#art-z20_abs-z1' target='_blank' rel='noopener'>§20 I</a><br/>Trusts: Angabe wirtschaftlich Berechtigter — <a href='{{ELI}}#art-z21_abs-z1' target='_blank' rel='noopener'>§21 I</a>"]
    end

    subgraph Behoerden["Behörden"]
        AUF["<b>Aufsichtsbehörden</b><br/>BaFin, Kammern, Landgerichtspräsidenten, Länderbehörden u. a. — <a href='{{ELI}}/art-z50' target='_blank' rel='noopener'>§50</a><br/>Aufsicht über die Verpflichteten — <a href='{{ELI}}#art-z51_abs-z1' target='_blank' rel='noopener'>§51 I</a><br/>Prüfungen — <a href='{{ELI}}#art-z51_abs-z3' target='_blank' rel='noopener'>§51 III</a>"]
        REG["<b>Registerführende Stelle</b><br/>Führt das Transparenzregister als hoheitliche Aufgabe — <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a><br/>Beliehene juristische Person — <a href='{{ELI}}#art-z25_abs-z1' target='_blank' rel='noopener'>§25 I</a><br/>oder Bundesoberbehörde — <a href='{{ELI}}#art-z25_abs-z7' target='_blank' rel='noopener'>§25 VII</a>"]
        BVA["<b>Bundesverwaltungsamt</b><br/>Rechts- und Fachaufsicht über das Transparenzregister — <a href='{{ELI}}#art-z25_abs-z6' target='_blank' rel='noopener'>§25 VI</a><br/>Bußgeldbehörde für Registerverstöße — <a href='{{ELI}}#art-z56_abs-z5' target='_blank' rel='noopener'>§56 V</a>"]
        STA["<b>Strafverfolgungsbehörden</b><br/>Staatsanwaltschaften und Polizei, erhalten Analyseergebnisse der FIU — <a href='{{ELI}}#art-z32_abs-z2' target='_blank' rel='noopener'>§32 II</a>"]
    end

    subgraph Bund["Bundesregierung und Bundestag"]
        BMF["<b>Bundesministerium der Finanzen</b><br/>Aufsicht über die FIU — <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II</a><br/>Koordiniert die nationale Risikoanalyse — <a href='{{ELI}}#art-z3a_abs-z2' target='_blank' rel='noopener'>§3a II</a>"]
        BT["<b>Gremium des Deutschen Bundestages</b><br/>Wird regelmäßig über die Arbeit der FIU unterrichtet — <a href='{{ELI}}#art-z28a_abs-z1' target='_blank' rel='noopener'>§28a I</a>"]
    end

    subgraph International["EU und International"]
        AFIU["<b>Zentrale Meldestellen anderer Staaten</b><br/>Datenaustausch mit EU-Mitgliedstaaten — <a href='{{ELI}}#art-z33_abs-z1' target='_blank' rel='noopener'>§33 I</a><br/>Informationsersuchen international — <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 I</a>"]
    end

    VP -->|"Verdachtsmeldung — <a href='{{ELI}}#art-z43_abs-z1' target='_blank' rel='noopener'>§43 I</a>"| FIU
    FIU -->|"Sofortmaßnahmen, Rückmeldung — <a href='{{ELI}}#art-z40_abs-z1' target='_blank' rel='noopener'>§40 I</a>, §41 I"| VP
    AUF -->|"Verdachtsmeldung — <a href='{{ELI}}#art-z44_abs-z1' target='_blank' rel='noopener'>§44 I</a>"| FIU
    FIU <-->|"Informationsaustausch — <a href='{{ELI}}#art-z28_abs-z1' target='_blank' rel='noopener'>§28 I Nr. 3</a>"| AUF
    AUF -->|"Aufsicht, Anordnungen — <a href='{{ELI}}#art-z51_abs-z2' target='_blank' rel='noopener'>§51 II</a>"| VP
    VP -->|"bestellt — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"| GWB
    FIU -->|"Analyseergebnis — <a href='{{ELI}}#art-z32_abs-z2' target='_blank' rel='noopener'>§32 II</a>"| STA
    STA -->|"Verfahrensausgang — <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I</a>"| FIU
    AUF -->|"Information bei Straftatverdacht — <a href='{{ELI}}#art-z55_abs-z1' target='_blank' rel='noopener'>§55 I</a>"| STA
    VER -->|"Mitteilung wirtschaftlich Berechtigter — <a href='{{ELI}}#art-z20_abs-z1' target='_blank' rel='noopener'>§20 I</a>, §21 I"| REG
    VP -->|"Unstimmigkeitsmeldung — <a href='{{ELI}}#art-z23a_abs-z1' target='_blank' rel='noopener'>§23a I</a>"| REG
    REG -->|"Datenübermittlung — <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a I</a>"| FIU
    BVA -->|"Rechts- und Fachaufsicht — <a href='{{ELI}}#art-z25_abs-z6' target='_blank' rel='noopener'>§25 VI</a>"| REG
    BMF -->|"Aufsicht — <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II</a>"| FIU
    BMF -->|"Unterrichtung — <a href='{{ELI}}#art-z28a_abs-z1' target='_blank' rel='noopener'>§28a I</a>"| BT
    FIU <-->|"Informationsaustausch — <a href='{{ELI}}#art-z33_abs-z1' target='_blank' rel='noopener'>§33 I</a>, §34 I"| AFIU

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class FIU zentral
    class AUF,REG,BVA,STA,AFIU behoerde
    class VP,GWB,VER privat
    class BMF parlament
    class BT gremium
`;export{e as default};