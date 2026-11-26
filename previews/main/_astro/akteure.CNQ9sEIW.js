var e=`---
summary: "Die Behörden, Ministerien und Stellen, die das KRITIS-Dachgesetz einbindet, ihre Zuständigkeiten und wie sie mit dem Bundesamt für Bevölkerungsschutz und Katastrophenhilfe als zentraler Anlaufstelle, den Betreibern kritischer Anlagen und der EU-Ebene zusammenarbeiten."
---
flowchart TD
    BBK["<b>Bundesamt für Bevölkerungsschutz und Katastrophenhilfe (BBK)</b><br/>zentrale Anlaufstelle nach der CER-Richtlinie — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a><br/>führt die Registrierung kritischer Anlagen durch — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a><br/>nimmt Vorfallmeldungen entgegen, erstellt Lagebilder — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a><br/>unterstützt Betreiber mit Vorlagen, Leitlinien, Schulungen — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a>"]

    subgraph Ministerien["Ministerien und Parlament"]
        BMI["<b>Bundesministerium des Innern (BMI)</b><br/>bestimmt kritische Dienstleistungen und Schwellenwerte — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 III</a><br/>stellt Erheblichkeit im Einzelfall fest — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a><br/>koordiniert die nationalen Risikoanalysen — <a href='{{ELI}}#art-z11_abs-z4' target='_blank' rel='noopener'>§11 IV</a><br/>erteilt Ausnahmebescheide — <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22 I</a>"]
        Fachmin["<b>Bundes- und Landesministerien</b><br/>Einvernehmen zur Sektor-Verordnung, u.a. BMG — <a href='{{ELI}}#art-z4_abs-z4' target='_blank' rel='noopener'>§4 IV</a><br/>Risikoanalysen für ihre kritischen Dienstleistungen — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a><br/>liefern Informationen für EU-Berichte an das BBK — <a href='{{ELI}}#art-z21_abs-z5' target='_blank' rel='noopener'>§21 V</a>"]
        Parl["<b>Bundestag und Bundesregierung</b><br/>erhalten die Berichte an die Kommission — <a href='{{ELI}}#art-z21_abs-z4' target='_blank' rel='noopener'>§21 IV</a>"]
    end

    subgraph Behoerden["Behörden in Bund und Ländern"]
        BSI["<b>Bundesamt für Sicherheit in der Informationstechnik (BSI)</b><br/>gemeinsame Registrierung und Meldestelle mit dem BBK — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a><br/>Einvernehmen zur Registrierung durch das BBK — <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III</a>"]
        ZB["<b>Zuständige Behörden</b><br/>Bundesbehörden für einzelne Dienstleistungen, z.B. BNetzA, BaFin — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a><br/>sonst vom Land bestimmte Behörden, z.B. Gesundheitswesen — <a href='{{ELI}}#art-z3_abs-z6' target='_blank' rel='noopener'>§3 VI</a><br/>prüfen Nachweise, ordnen Mängelbeseitigung an — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II</a><br/>berichten jährlich über Überprüfungen — <a href='{{ELI}}#art-z21_abs-z6' target='_blank' rel='noopener'>§21 VI</a>"]
        LAP["<b>Zentrale Ansprechpartner der Länder</b><br/>sektorenübergreifende Angelegenheiten — <a href='{{ELI}}#art-z3_abs-z5' target='_blank' rel='noopener'>§3 V</a>"]
    end

    subgraph EU["EU-Ebene"]
        KOM["<b>Europäische Kommission</b><br/>teilt Einstufung als Einrichtung von besonderer Bedeutung für Europa mit — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a><br/>Beratungsmissionen — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a>"]
        MS["<b>Andere EU-Mitgliedstaaten</b><br/>zentrale Anlaufstellen und zuständige Behörden — <a href='{{ELI}}#art-z3_abs-z8' target='_blank' rel='noopener'>§3 VIII</a>"]
    end

    subgraph Verpflichtete["Verpflichtete"]
        BT["<b>Betreiber kritischer Anlagen</b><br/>Registrierung — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a><br/>Risikoanalyse und Risikobewertung — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a><br/>Resilienzmaßnahmen und Resilienzplan — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a><br/>Meldung von Vorfällen binnen 24 Stunden — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a><br/>Geschäftsleitung setzt Maßnahmen um und haftet — <a href='{{ELI}}#art-z20_abs-z1' target='_blank' rel='noopener'>§20 I</a>"]
    end

    BMI -->|"Verordnungsermächtigung übertragbar — <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 III</a>, §14 I"| BBK
    BMI -->|"koordiniert Risikoanalysen — <a href='{{ELI}}#art-z11_abs-z4' target='_blank' rel='noopener'>§11 IV</a>"| Fachmin
    BMI -->|"Berichte — <a href='{{ELI}}#art-z21_abs-z4' target='_blank' rel='noopener'>§21 IV</a>"| Parl
    BMI -->|"Berichte, Informationen — <a href='{{ELI}}#art-z21_abs-z1' target='_blank' rel='noopener'>§21 I</a>, §9 II"| KOM
    BBK <-->|"gemeinsame Registrierung und Meldestelle — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"| BSI
    BBK <-->|"wechselseitiger Informationsaustausch — <a href='{{ELI}}#art-z3_abs-z7' target='_blank' rel='noopener'>§3 VII</a>"| ZB
    BBK -->|"Auswertungen, Lagebilder — <a href='{{ELI}}#art-z18_abs-z7' target='_blank' rel='noopener'>§18 VII</a>"| LAP
    BBK -->|"nimmt Registrierung und Meldungen entgegen — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>, §8"| BT
    BBK -->|"konsultiert, unterrichtet bei Vorfällen — <a href='{{ELI}}#art-z18_abs-z4' target='_blank' rel='noopener'>§18 IV</a>, §3 VIII"| MS
    BBK <-->|"Vorfallmeldung, Weiterleitung der Einstufung — <a href='{{ELI}}#art-z18_abs-z5' target='_blank' rel='noopener'>§18 V</a>, §9 III"| KOM
    Fachmin -->|"Fach- oder Rechtsaufsicht — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>"| ZB
    BSI -->|"übersendet BSIG-Nachweise über das BBK — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a>"| ZB
    ZB -->|"Nachweise, Überprüfung, Anordnungen — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II</a>"| BT

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class BBK zentral
    class BSI,ZB,LAP,MS behoerde
    class BT privat
    class BMI,Fachmin,Parl,KOM parlament
`;export{e as default};