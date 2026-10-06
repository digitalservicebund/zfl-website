var e=`---
summary: "Die Registrierung einer kritischen Anlage beim Bundesamt für Bevölkerungsschutz und Katastrophenhilfe (BBK) nach §8 KRITIS-Dachgesetz: Registrierung durch den Betreiber oder ersatzweise durch das BBK, Weitergabe der Daten an BSI und zuständige Behörde und die daran anknüpfenden Fristen."
---
swimlane-beta TD
    subgraph BT["Betreiber kritischer Anlagen"]
        start(["Anlage gilt als kritische Anlage, z.B.<br/>ein Krankenhaus (nach Feststellung im<br/>Einzelfall: Aufforderung zur<br/>Registrierung durch das BBK — <a href='{{ELI}}#art-z5_abs-z5' target='_blank' rel='noopener'>§5 V S.2</a>)"])
        registrierung["Registrierung spätestens 3 Monate danach<br/>über die gemeinsame Möglichkeit von BSI<br/>und BBK, u.a. Name, Kontaktdaten, Sektor,<br/>kritische Dienstleistung, Versorgungsgrad,<br/>EU-Mitgliedstaaten, Kontaktstelle und<br/>kritische Komponenten — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"]
        pflichten(["Registriert: Änderungen melden<br/>(Versorgungsgrad jährlich, sonst binnen<br/>2 Wochen — <a href='{{ELI}}#art-z8_abs-z6' target='_blank' rel='noopener'>§8 VI</a>); Pflichten nach §12<br/>gelten nach 9 Monaten, nach §§13, 18, 20<br/>nach 10 Monaten — <a href='{{ELI}}#art-z8_abs-z7' target='_blank' rel='noopener'>§8 VII</a>"])
    end

    subgraph BBK["BBK"]
        frist{"Registrierung fristgerecht<br/>erfolgt? — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"}
        auskunft["Bei Tatsachen, die eine Verletzung<br/>der Registrierungspflicht annehmen<br/>lassen (auch auf Vorschlag von BSI oder<br/>zuständiger Behörde — <a href='{{ELI}}#art-z8_abs-z4' target='_blank' rel='noopener'>§8 IV</a>): Unterlagen<br/>und Auskünfte verlangen — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 II</a>"]
        selbst["Nach Anhörung des Betreibers:<br/>Registrierung durch das BBK selbst<br/>— <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III S.1</a>"]
        abschluss["Mitteilung über den Abschluss und die<br/>zuständige Behörde an den Betreiber,<br/>soll binnen 4 Wochen erfolgen — <a href='{{ELI}}#art-z8_abs-z5' target='_blank' rel='noopener'>§8 V S.1, 2</a>"]
        weitergabe["Registrierungsdaten unverzüglich an<br/>BSI und zuständige Behörde (Angaben zu<br/>kritischen Komponenten nur an das BSI)<br/>— <a href='{{ELI}}#art-z8_abs-z5' target='_blank' rel='noopener'>§8 V S.3, 4</a>"]
    end

    subgraph BSI["BSI"]
        bsiEinvernehmen["Einvernehmen zur Registrierung durch<br/>das BBK — <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III S.2</a>"]
        bsiDaten(["Registrierungsdaten liegen dem BSI vor"])
    end

    subgraph ZB["Zuständige Behörde"]
        zbEinvernehmen["Einvernehmen (Bundesbehörde) bzw.<br/>Benehmen (Landesbehörde) zur<br/>Registrierung durch das BBK<br/>— <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III S.2</a>"]
        zbDaten(["Registrierungsdaten liegen der<br/>zuständigen Behörde vor (Gesundheitswesen:<br/>vom Land bestimmte Behörde — <a href='{{ELI}}#art-z3_abs-z6' target='_blank' rel='noopener'>§3 VI</a>)"])
    end

    start --> registrierung
    registrierung --> frist
    frist -->|Ja| abschluss
    frist -->|"Nein (Ordnungswidrigkeit<br/>— <a href='{{ELI}}#art-z24_abs-z1' target='_blank' rel='noopener'>§24 I Nr. 1</a>)"| auskunft
    auskunft --> selbst
    selbst --> bsiEinvernehmen
    selbst --> zbEinvernehmen
    bsiEinvernehmen --> abschluss
    zbEinvernehmen --> abschluss
    abschluss --> pflichten
    abschluss --> weitergabe
    weitergabe --> bsiDaten
    weitergabe --> zbDaten

    style pflichten fill:#d4edda,stroke:#2d8a4a
    style bsiDaten fill:#d4edda,stroke:#2d8a4a
    style zbDaten fill:#d4edda,stroke:#2d8a4a
`;export{e as default};