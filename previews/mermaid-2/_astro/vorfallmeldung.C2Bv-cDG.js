var e=`---
summary: "Der Meldeweg bei Vorfällen nach §18 KRITIS-Dachgesetz: Erstmeldung des Betreibers binnen 24 Stunden an die gemeinsame Meldestelle von BSI und BBK, Aktualisierung und Abschlussbericht, Rückmeldung des BBK sowie Weitergabe an zuständige Behörden, Länder und EU-Ebene."
---
swimlane-beta TD
    subgraph BT["Betreiber kritischer Anlagen"]
        start(["Vorfall: Ereignis, das die kritische<br/>Dienstleistung erheblich beeinträchtigt<br/>oder beeinträchtigen könnte, z.B. Ausfall<br/>der Versorgung in einem Krankenhaus<br/>(ohne reine IT-Sicherheitsvorfälle) — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr. 9</a>"])
        erstmeldung["Erstmeldung an das BBK über die<br/>gemeinsame Meldestelle von BSI und BBK:<br/>unverzüglich, spätestens 24 Stunden nach<br/>Kenntnis — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I S.1</a>; mit Zahl der<br/>Betroffenen, Dauer und Gebiet — <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a><br/>(andere Meldepflichten bleiben — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I S.4</a>)"]
        update["Bei andauerndem Vorfall: Erstmeldung<br/>aktualisieren — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I S.2</a>"]
        bericht(["Ausführlicher Bericht spätestens<br/>1 Monat nach Kenntnis — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I S.3</a>"])
    end

    subgraph BBK["BBK"]
        eingang["Eingangsbestätigung und sachdienliche<br/>Folgeinformationen (z.B. Leitlinien zur<br/>Reaktion) unverzüglich — <a href='{{ELI}}#art-z18_abs-z6' target='_blank' rel='noopener'>§18 VI</a>"]
        auswertung["Auswertungen und Lagebilder; bei<br/>öffentlichem Interesse ggf. Information<br/>der Öffentlichkeit — <a href='{{ELI}}#art-z18_abs-z9' target='_blank' rel='noopener'>§18 IX</a>"]
    end

    subgraph ZB["Zuständige Behörden und Länder"]
        zb(["Zuständige Behörden, zentrale<br/>Ansprechpartner der Länder und<br/>Ministerien nach §11 I<br/>erhalten Auswertungen und Lagebilder<br/>— <a href='{{ELI}}#art-z18_abs-z7' target='_blank' rel='noopener'>§18 VII</a>, <a href='{{ELI}}#art-z18_abs-z8' target='_blank' rel='noopener'>VIII</a>"])
    end

    subgraph EU["EU-Ebene"]
        anlauf(["BBK unterrichtet die zentralen<br/>Anlaufstellen der betroffenen<br/>Mitgliedstaaten — <a href='{{ELI}}#art-z18_abs-z4' target='_blank' rel='noopener'>§18 IV</a>; bei Auswirkungen<br/>in mind. 6 Mitgliedstaaten zusätzlich<br/>Meldung an die Europäische Kommission<br/>— <a href='{{ELI}}#art-z18_abs-z5' target='_blank' rel='noopener'>§18 V</a>"])
    end

    start --> erstmeldung
    erstmeldung --> eingang
    erstmeldung --> update
    update --> bericht
    eingang --> auswertung
    eingang -->|"bei (möglichen) erheblichen<br/>Auswirkungen in mind. einem<br/>anderen Mitgliedstaat — <a href='{{ELI}}#art-z18_abs-z4' target='_blank' rel='noopener'>§18 IV</a>"| anlauf
    auswertung --> zb

    style bericht fill:#d4edda,stroke:#2d8a4a
    style zb fill:#d4edda,stroke:#2d8a4a
    style anlauf fill:#d4edda,stroke:#2d8a4a
`;export{e as default};