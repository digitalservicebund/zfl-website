var e=`---
summary: "Der Ablauf des Asylverfahrens von der Antragstellung über Weiterleitung, Registrierung, persönliche Antragseinreichung und Anhörung bis zur Entscheidung des Bundesamtes über Schutzstatus oder Ablehnung mit Abschiebungsandrohung."
---
swimlane-beta TD
    subgraph BEH["Grenzbehörde, Ausländerbehörde, Polizei"]
        antragGB["Asylantrag bei der Grenzbehörde,<br/>erkennungsdienstliche Behandlung — <a href='{{ELI}}#art-z18_abs-z5' target='_blank' rel='noopener'>§18<br/>Abs. 5</a><br/>(Einreiseverweigerung in den Fällen des<br/><a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 Abs. 2</a>)"]
        antragAB["Asylantrag bei Ausländerbehörde,<br/>Bundespolizei oder Polizei eines Landes,<br/>erkennungsdienstliche Behandlung — <a href='{{ELI}}#art-z19_abs-z2' target='_blank' rel='noopener'>§19<br/>Abs. 2</a>"]
        weiter["Weiterleitung an die zuständige oder<br/>nächstgelegene Aufnahmeeinrichtung — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18<br/>Abs. 1</a>, <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 Abs. 1</a>"]
    end

    subgraph AE["Aufnahmeeinrichtung"]
        reg["Registrierung des Asylantrags durch die<br/>zuerst kontaktierte Aufnahmeeinrichtung<br/>— <a href='{{ELI}}/art-z13a' target='_blank' rel='noopener'>§13a</a>"]
        aufnahme["Aufnahme oder Weiterleitung an die<br/>zuständige Aufnahmeeinrichtung — <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22<br/>Abs. 1</a>"]
        info["Unterrichtung der zugeordneten<br/>Außenstelle, Zuleitung der Unterlagen<br/>— <a href='{{ELI}}#art-z20_abs-z2' target='_blank' rel='noopener'>§20 Abs. 2</a>, <a href='{{ELI}}#art-z21_abs-z3' target='_blank' rel='noopener'>§21 Abs. 3</a>"]
    end

    subgraph AUS["Ausländer"]
        start(["Ausländer möchte Asyl beantragen"])
        grenze{"An der Grenze ohne<br/>erforderliche Einreisepapiere?<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 Abs. 2</a>"}
        ort{"Asylantrag bei<br/>Ausländerbehörde oder Polizei?<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 Abs. 2</a>"}
        meldung["Persönliche Meldung in einer<br/>Aufnahmeeinrichtung — <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22 Abs. 1</a>"]
        einreichung["Persönliche Einreichung des Asylantrags<br/>bei der Außenstelle des Bundesamtes<br/>— <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 Abs. 1</a>"]
    end

    subgraph BA["Bundesamt für Migration und Flüchtlinge"]
        ident["Sicherung der Identität durch<br/>erkennungsdienstliche Maßnahmen — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16<br/>Abs. 1</a>"]
        anhoerung["Anhörung möglichst bald nach der<br/>Antragseinreichung — <a href='{{ELI}}#art-z25_abs-z3' target='_blank' rel='noopener'>§25 Abs. 3</a><br/>(späteres Vorbringen kann<br/>unberücksichtigt bleiben — <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 Abs. 2</a>)"]
        entscheidung["Entscheidung über den Asylantrag,<br/>unverzügliche Zustellung — <a href='{{ELI}}#art-z31_abs-z1' target='_blank' rel='noopener'>§31 Abs. 1</a><br/>(Unterrichtung der Ausländerbehörde<br/>— <a href='{{ELI}}#art-z31_abs-z4' target='_blank' rel='noopener'>§31 Abs. 4</a>)"]
        status{"Asylberechtigung,<br/>Flüchtlingseigenschaft oder<br/>subsidiärer Schutz zuerkannt?<br/>— <a href='{{ELI}}#art-z31_abs-z2' target='_blank' rel='noopener'>§31 Abs. 2</a>"}
        schutz(["Anerkennung bzw. Zuerkennung<br/>internationalen Schutzes"])
        ablehnung(["Ablehnung; schriftliche<br/>Abschiebungsandrohung, wenn die<br/>Voraussetzungen des <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1</a><br/>vorliegen, mit Ausreisefrist von einer<br/>Woche bzw. 30 Tagen — <a href='{{ELI}}#art-z38_abs-z1' target='_blank' rel='noopener'>§38 Abs. 1</a>, <a href='{{ELI}}#art-z38_abs-z2' target='_blank' rel='noopener'>Abs. 2</a>"])
    end

    start --> grenze
    grenze -->|Ja| antragGB
    grenze -->|Nein| ort
    ort -->|Ja| antragAB
    ort -->|Nein| meldung
    antragGB --> weiter
    antragAB --> weiter
    weiter -->|"Ausländer muss unverzüglich<br/>folgen, sonst gilt der Antrag<br/>nach fünf Tagen als nicht<br/>gestellt — <a href='{{ELI}}#art-z20_abs-z1' target='_blank' rel='noopener'>§20 Abs. 1</a>"| reg
    meldung --> reg
    reg --> aufnahme
    aufnahme --> info
    info --> einreichung
    einreichung --> ident
    ident --> anhoerung
    anhoerung --> entscheidung
    entscheidung --> status
    status -->|Ja| schutz
    status -->|Nein| ablehnung

    schutz ~~~ ablehnung

    style schutz fill:#d4edda,stroke:#2d8a4a
    style ablehnung fill:#f8d7da,stroke:#c0392b
`;export{e as default};