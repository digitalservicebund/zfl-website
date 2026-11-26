var e=`---
summary: "Die Behörden und Stellen, die das PflBG bei Berufszulassung, Anerkennung ausländischer Abschlüsse und grenzüberschreitender Berufsausübung einbindet, ihre Zuständigkeiten und wie sie sich gegenseitig unterrichten."
---
flowchart TD
    ZB["<b>Zuständige Behörden der Länder</b><br/>entscheiden über die Erlaubnis — <a href='{{ELI}}#art-z52_abs-z1' target='_blank' rel='noopener'>§52 I</a><br/>entscheiden über partielle Berufsausübung — <a href='{{ELI}}#art-z52_abs-z1a' target='_blank' rel='noopener'>§52 Ia</a><br/>nehmen Meldungen von Dienstleistenden entgegen — <a href='{{ELI}}#art-z52_abs-z3' target='_blank' rel='noopener'>§52 III</a><br/>versenden Warnmitteilungen über IMI — <a href='{{ELI}}#art-z51_abs-z2' target='_blank' rel='noopener'>§51 II</a>"]

    subgraph DE["Länder und Bund"]
        Laender["<b>Länder</b><br/>bestimmen die zuständigen Behörden — <a href='{{ELI}}/art-z49' target='_blank' rel='noopener'>§49</a><br/>können Anerkennung auf ein anderes Land oder eine gemeinsame Einrichtung übertragen — <a href='{{ELI}}#art-z40_abs-z5' target='_blank' rel='noopener'>§40 V</a>"]
        BM["<b>Bundesministerium für Familie, Senioren, Frauen und Jugend und Bundesministerium für Gesundheit</b><br/>benennen gemeinsam die zuständigen Stellen nach RL 2005/36/EG — <a href='{{ELI}}#art-z50_abs-z3' target='_blank' rel='noopener'>§50 III</a><br/>erhalten Statistiken der Behörden und leiten sie an die Kommission weiter — <a href='{{ELI}}#art-z50_abs-z4' target='_blank' rel='noopener'>§50 IV</a>"]
    end

    subgraph EU["EU-Ebene und andere Staaten"]
        KOM["<b>Europäische Kommission</b><br/>erhält Benennung der zuständigen Stellen — <a href='{{ELI}}#art-z50_abs-z3' target='_blank' rel='noopener'>§50 III</a><br/>erhält Statistiken für den Bericht nach Art. 60 RL 2005/36/EG — <a href='{{ELI}}#art-z50_abs-z4' target='_blank' rel='noopener'>§50 IV</a>"]
        MS["<b>Zuständige Behörden der anderen EU-/EWR-Staaten und der Schweiz</b><br/>bescheinigen Nachweise und Berufserfahrung — <a href='{{ELI}}#art-z42_abs-z1' target='_blank' rel='noopener'>§42 I</a><br/>erteilen Auskünfte zur Niederlassung — <a href='{{ELI}}#art-z48_abs-z2' target='_blank' rel='noopener'>§48 II</a><br/>erhalten Warnmitteilungen — <a href='{{ELI}}#art-z51_abs-z1' target='_blank' rel='noopener'>§51 I</a>"]
    end

    subgraph Personen["Pflegefachpersonen"]
        PP["<b>Antragstellende und dienstleistungserbringende Personen</b><br/>beantragen die Erlaubnis — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a><br/>melden Dienstleistungen in Deutschland — <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 I</a><br/>erhalten auf Antrag Bescheinigung für Dienstleistungen im Ausland — <a href='{{ELI}}/art-z47' target='_blank' rel='noopener'>§47</a>"]
    end

    Laender -->|"bestimmen — <a href='{{ELI}}/art-z49' target='_blank' rel='noopener'>§49</a>"| ZB
    Laender -->|"teilen zuständige Stellen mit — <a href='{{ELI}}#art-z50_abs-z3' target='_blank' rel='noopener'>§50 III</a>"| BM
    BM -->|"Benennung, Statistiken — <a href='{{ELI}}#art-z50_abs-z3' target='_blank' rel='noopener'>§50 III</a>, IV"| KOM
    BM -->|"unterrichten über Benennung — <a href='{{ELI}}#art-z50_abs-z3' target='_blank' rel='noopener'>§50 III</a>"| MS
    ZB <-->|"Unterrichtung und Auskünfte — <a href='{{ELI}}#art-z50_abs-z1' target='_blank' rel='noopener'>§50 I</a>, II, §48, §51"| MS
    ZB -->|"erteilen, nehmen zurück, widerrufen Erlaubnis — <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>, §52"| PP

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class ZB zentral
    class MS,KOM behoerde
    class PP privat
    class Laender,BM parlament
`;export{e as default};