var e=`---
summary: "Zeigt die Akteure des nationalen Brennstoffemissionshandels mit dem Umweltbundesamt als zuständiger Behörde im Zentrum: Pflichten der Verantwortlichen, Verifizierung durch Prüfstellen, Datenübermittlung anderer Behörden sowie Evaluierung durch Bundesregierung und Bundestag."
---
flowchart LR
    UBA["<b>Umweltbundesamt</b><br/>zuständige Behörde — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a><br/>überwacht die Durchführung des Gesetzes — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a><br/>veräußert die Emissionszertifikate — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a><br/>führt das nationale Emissionshandelsregister — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a>"]

    subgraph Bund["Bundesregierung und Bundestag"]
        BReg["<b>Bundesregierung</b><br/>evaluiert das Gesetz, legt Erfahrungsbericht vor — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I</a><br/>regelt Ermittlung und Berichterstattung per Rechtsverordnung — <a href='{{ELI}}#art-z7_abs-z4' target='_blank' rel='noopener'>§7 IV</a>"]
        BMWK["<b>Bundesministerium für Wirtschaft und Klimaschutz</b><br/>erhält Daten zur Rechts- und Fachaufsicht — <a href='{{ELI}}#art-z14_abs-z5' target='_blank' rel='noopener'>§14 V</a><br/>beteiligt die betroffenen Bundesministerien am Erfahrungsbericht — <a href='{{ELI}}#art-z23_abs-z2' target='_blank' rel='noopener'>§23 II</a>"]
        BT["<b>Bundestag</b><br/>erhält den Erfahrungsbericht — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I</a><br/>stimmt Rechtsverordnungen zur Kompensation zu — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>, III"]
    end

    subgraph Weitere["Weitere Behörden"]
        Andere["<b>Andere Behörden</b><br/>Daten aus Energiesteuer-, §37c-BImSchG- und Herkunftsnachweisverfahren — <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV</a>"]
    end

    subgraph Beteiligte["Verantwortliche, Prüfstellen und Unternehmen"]
        VA["<b>Verantwortliche</b><br/>Überwachungsplan einreichen — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a><br/>Brennstoffemissionen ermitteln und berichten — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a><br/>Emissionszertifikate abgeben — <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a><br/>Zutritt, Prüfungen und Auskünfte gestatten — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>"]
        PS["<b>Prüfstellen</b><br/>akkreditierte Prüfstellen, Umweltgutachter, weitere nach Rechtsverordnung — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a><br/>nehmen Aufgaben nur im öffentlichen Interesse wahr — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a>"]
        UN["<b>Betroffene Unternehmen</b><br/>Kompensation bei unzumutbarer Härte auf Antrag — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>"]
    end

    VA -->|"Überwachungsplan, Bericht, Abgabe — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>, §7 I, §8"| UBA
    UBA -->|"Genehmigung, Überwachung, Sanktionen — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>, §14, §§20, 21"| VA
    PS -->|"verifizieren den Emissionsbericht — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"| VA
    UBA -->|"kann Formularvorlagen vorschreiben — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a>"| PS
    UBA -->|"Kompensation auf Antrag — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>"| UN
    Andere -->|"Datenübermittlung auf Ersuchen — <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV</a>"| UBA
    UBA -->|"Daten, Unterstützung beim Erfahrungsbericht — <a href='{{ELI}}#art-z23_abs-z2' target='_blank' rel='noopener'>§23 II</a>, §14 V"| BMWK
    BReg -->|"Erfahrungsbericht — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I</a>"| BT
    BT -->|"Zustimmung zu Rechtsverordnungen — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>, III"| BReg
    BReg -->|"kann weiteren Stellen Prüfberechtigung erteilen — <a href='{{ELI}}#art-z15_abs-z2' target='_blank' rel='noopener'>§15 II</a>"| PS

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class UBA zentral
    class Andere behoerde
    class VA,PS,UN privat
    class BReg,BMWK,BT parlament
`;export{e as default};