var e=`---
summary: "Der Kern der Sorgfaltspflichten: jährliche und anlassbezogene Risikoanalyse, Präventionsmaßnahmen bei festgestellten Risiken und Abhilfemaßnahmen bei eingetretenen oder drohenden Verletzungen bis hin zum Abbruch einer Geschäftsbeziehung als letztem Mittel."
---
flowchart TD
    anlass(["Jährlich und anlassbezogen bei<br/>wesentlich veränderter Risikolage<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 IV S.1</a>"])
    analyse["Risikoanalyse: eigener Geschäftsbereich<br/>und unmittelbare Zulieferer — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.1</a>"]
    mittelbar["Mittelbare Zulieferer: bei<br/>substantiierter Kenntnis anlassbezogen<br/>Analyse, Prävention, Konzept — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"]
    gewichten["Risiken gewichten und priorisieren<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>;<br/>Ergebnisse intern an Entscheidungsträger<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a>"]
    risiko{"Risiko festgestellt? — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>"}
    keinRisiko["Im Bericht plausibel darlegen: kein<br/>Risiko festgestellt — <a href='{{ELI}}#art-z10_abs-z3' target='_blank' rel='noopener'>§10 III</a>"]
    grundsatz["Grundsatzerklärung der<br/>Unternehmensleitung — <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 II</a>"]
    praevention["Unverzüglich Prävention im eigenen<br/>Geschäftsbereich — <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 III</a><br/>und bei unmittelbaren Zulieferern<br/>— <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV</a>"]
    verletzung{"Verletzung eingetreten oder<br/>unmittelbar bevorstehend?<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.1</a>"}
    wo{"Im eigenen Geschäftsbereich?<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"}
    abhilfeEigen["Unverzüglich Abhilfe; im Inland muss sie<br/>zur Beendigung führen, im Ausland in der<br/>Regel — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.3, 4</a>"]
    absehbar{"In absehbarer Zeit beendbar?<br/>— <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II S.1</a>"}
    abhilfeZ["Unverzüglich Abhilfe: Verletzung<br/>verhindern, beenden, minimieren<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.1</a>"]
    konzept["Konzept mit konkretem Zeitplan erstellen<br/>und umsetzen (z.B. Brancheninitiative,<br/>temporäres Aussetzen) — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"]
    abbruch{"Sehr schwerwiegend, Konzept<br/>erfolglos, keine milderen<br/>Mittel? — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.1</a>"}
    abbruchJa(["Abbruch der Geschäftsbeziehung geboten<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.1</a>"])
    ratifikation["Fehlende Ratifikation eines<br/>Übereinkommens allein genügt nicht<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.2</a>"]
    wirksamkeit(["Wirksamkeit jährlich und anlassbezogen<br/>prüfen, ggf. aktualisieren — <a href='{{ELI}}#art-z6_abs-z5' target='_blank' rel='noopener'>§6 V</a>, <a href='{{ELI}}#art-z7_abs-z4' target='_blank' rel='noopener'>§7 IV</a>"])

    anlass --> analyse
    analyse --> gewichten
    gewichten --> risiko
    risiko -->|Nein| keinRisiko
    risiko -->|Ja| grundsatz
    grundsatz --> praevention
    praevention --> verletzung
    keinRisiko --> verletzung
    verletzung -->|Nein| wirksamkeit
    verletzung -->|Ja| wo
    wo -->|Ja| abhilfeEigen
    wo -->|"Nein: unmittelbarer Zulieferer"| absehbar
    absehbar -->|Ja| abhilfeZ
    absehbar -->|Nein| konzept
    konzept --> abbruch
    abbruch -->|Ja| abbruchJa
    abbruch -->|"Nein: Konzept fortführen"| wirksamkeit
    abhilfeEigen --> wirksamkeit
    abhilfeZ --> wirksamkeit
    analyse -.- mittelbar
    abbruch -.- ratifikation

    style wirksamkeit fill:#d4edda,stroke:#2d8a4a
    style abbruchJa fill:#f8d7da,stroke:#c0392b
    style keinRisiko fill:#fff3cd,stroke:#c9a227
    style mittelbar fill:#f5f5f5,stroke:#999
    style ratifikation fill:#f5f5f5,stroke:#999
`;export{e as default};