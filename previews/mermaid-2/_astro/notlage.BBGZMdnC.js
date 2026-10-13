var e=`---
summary: "Wie die Kommission eine gesundheitliche Notlage auf Unionsebene feststellt und wieder aufhebt: Beratung durch den Beratenden Ausschuss, Information der WHO, Durchführungsrechtsakt im Prüf- oder Dringlichkeitsverfahren und die Maßnahmen, die die Feststellung ermöglicht."
---
swimlane-beta TD
    subgraph BA["Beratender Ausschuss"]
        beratung["Stellungnahme zur Feststellung auf<br/>Ersuchen der Kommission oder des<br/>Gesundheitssicherheitsausschusses<br/>— <a href='{{ELI}}#024.001' target='_blank' rel='noopener'>Art. 24 Abs. 1 Buchst. a</a> (tritt auch<br/>auf Ersuchen eines Mitgliedstaats<br/>zusammen — <a href='{{ELI}}#024.005' target='_blank' rel='noopener'>Art. 24 Abs. 5</a>)"]
    end

    subgraph KOM["Kommission"]
        start(["Schwerwiegende grenzüberschreitende<br/>Gesundheitsgefahr — <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1</a>"])
        entscheidung{"Feststellung einer Notlage<br/>auf Unionsebene beabsichtigt,<br/>nach Berücksichtigung<br/>etwaiger Gutachten von ECDC,<br/>Agenturen oder Beratendem<br/>Ausschuss? (Ermessen)<br/>— <a href='{{ELI}}#023.001' target='_blank' rel='noopener'>Art. 23 Abs. 1</a>"}
        keine(["Keine Feststellung; Koordinierung der<br/>Reaktion nach <a href='{{ELI}}#art_21' target='_blank' rel='noopener'>Art. 21</a>"])
        dringlich{"Fall äußerster Dringlichkeit<br/>wegen Schwere oder<br/>Ausbreitungsgeschwindigkeit?<br/>— <a href='{{ELI}}#023.004' target='_blank' rel='noopener'>Art. 23 Abs. 4</a>"}
        sofort["Durchführungsrechtsakt mit sofortiger<br/>Wirkung im Dringlichkeitsverfahren<br/>— <a href='{{ELI}}#023.004' target='_blank' rel='noopener'>Art. 23 Abs. 4</a>, <a href='{{ELI}}#029.003' target='_blank' rel='noopener'>Art. 29 Abs. 3</a>"]
        festgestellt["Notlage auf Unionsebene festgestellt;<br/>ermöglicht u.a. Maßnahmen zu Arzneimitteln<br/>und Medizinprodukten, Mechanismen für<br/>medizinische Gegenmaßnahmen, Einsatz der<br/>EU-Gesundheits-Taskforce über das ECDC,<br/>Aktivierung der IPCR — <a href='{{ELI}}#art_25' target='_blank' rel='noopener'>Art. 25</a>"]
        aufhebung(["Aufhebung, sobald die Bedingung nach<br/>Abs. 1 nicht mehr erfüllt ist, ebenfalls<br/>per Durchführungsrechtsakt<br/>— <a href='{{ELI}}#023.002' target='_blank' rel='noopener'>Art. 23 Abs. 2</a>, <a href='{{ELI}}#023.004' target='_blank' rel='noopener'>Abs. 4</a> (Stellungnahme<br/>des Beratenden Ausschusses möglich<br/>— <a href='{{ELI}}#024.001' target='_blank' rel='noopener'>Art. 24 Abs. 1 Buchst. b</a>)"])
    end

    subgraph WHO["WHO"]
        who["Erhält vor der Feststellung die<br/>Lageanalyse der Kommission und die<br/>Information über ihre Absicht<br/>— <a href='{{ELI}}#023.003' target='_blank' rel='noopener'>Art. 23 Abs. 3</a>"]
    end

    subgraph AUS["Ausschuss nach Art. 29"]
        pruef["Prüfverfahren: ohne Stellungnahme des<br/>Ausschusses kein Erlass des<br/>Durchführungsrechtsakts<br/>— <a href='{{ELI}}#023.004' target='_blank' rel='noopener'>Art. 23 Abs. 4</a>, <a href='{{ELI}}#029.002' target='_blank' rel='noopener'>Art. 29 Abs. 2</a>"]

    end

    start -.->|"Ersuchen"| beratung
    beratung --> entscheidung
    entscheidung -->|Nein| keine
    entscheidung -->|Ja| who
    who --> dringlich
    dringlich -->|Ja| sofort
    dringlich -->|Nein| pruef
    sofort --> festgestellt
    pruef -->|"Stellungnahme"| festgestellt
    festgestellt --> aufhebung

    style keine fill:#fff3cd,stroke:#c9a227
    style festgestellt fill:#d4edda,stroke:#2d8a4a
    style aufhebung fill:#fff3cd,stroke:#c9a227
`;export{e as default};