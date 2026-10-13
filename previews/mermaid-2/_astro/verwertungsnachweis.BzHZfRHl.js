var e=`---
summary: "Der Weg eines Altfahrzeugs vom Fahrzeugeigner über Sammelstelle oder zugelassene Behandlungsanlage bis zum Verwertungsnachweis, dessen elektronischer Übermittlung an die zuständigen Behörden und der Aufhebung der Zulassung."
---
swimlane-beta TD
    subgraph Eigner["Fahrzeugeigner"]
        start(["Fahrzeug wird zum Altfahrzeug"])
        kosten["Kostenlose Übergabe, außer es fehlen<br/>wesentliche Teile oder Abfälle wurden<br/>hinzugefügt — <a href='{{ELI}}#024.002' target='_blank' rel='noopener'>Art. 24 Abs. 2</a> (kostenlos<br/>trotz fehlender Batterie mit<br/>Behandlungsnachweis oder bei<br/>Totalschaden — <a href='{{ELI}}#024.004' target='_blank' rel='noopener'>Abs. 4</a>, <a href='{{ELI}}#024.005' target='_blank' rel='noopener'>Abs. 5</a>)"]
        uebergabe{"Unverzügliche Übergabe an …<br/>— <a href='{{ELI}}#024.001' target='_blank' rel='noopener'>Art. 24 Abs. 1</a>"}
    end

    subgraph SSt["Sammelstelle"]
        erhalt["Elektronische Empfangsbestätigung an<br/>Eigner und zuständige Behörden — <a href='{{ELI}}#023.006' target='_blank' rel='noopener'>Art. 23<br/>Abs. 6</a>"]
        verbringen["Verbringung in eine zugelassene<br/>Behandlungsanlage binnen zwei Monaten<br/>— <a href='{{ELI}}#023.005' target='_blank' rel='noopener'>Art. 23 Abs. 5 Buchst. c</a>"]
    end

    subgraph BA["Zugelassene Behandlungsanlage"]
        nachweis["Verwertungsnachweis für den letzten<br/>Eigner nach Muster Anhang X — <a href='{{ELI}}#025.001' target='_blank' rel='noopener'>Art. 25<br/>Abs. 1</a>"]
        mitteilung["Elektronische Übermittlung an die<br/>zuständigen Behörden, Kopie an den<br/>Eigner — <a href='{{ELI}}#025.002' target='_blank' rel='noopener'>Art. 25 Abs. 2</a>"]
    end

    subgraph ZB["Zuständige Behörden"]
        anderer{"Fahrzeug in einem anderen<br/>Mitgliedstaat zugelassen?<br/>— <a href='{{ELI}}#025.003' target='_blank' rel='noopener'>Art. 25 Abs. 3</a>"}
        unterrichtung["Mitteilung an die zuständigen Behörden<br/>des Zulassungsmitgliedstaats (Nachweis<br/>wird dort anerkannt — <a href='{{ELI}}#025.005' target='_blank' rel='noopener'>Art. 25 Abs. 5</a>)<br/>— <a href='{{ELI}}#025.003' target='_blank' rel='noopener'>Art. 25 Abs. 3</a>"]
    end

    subgraph FZB["Fahrzeugzulassungsbehörde"]
        aufhebung(["Aufhebung der Zulassung erst nach Erhalt<br/>des Verwertungsnachweises — <a href='{{ELI}}#025.004' target='_blank' rel='noopener'>Art. 25 Abs.<br/>4</a>"])
    end

    start --> kosten
    kosten --> uebergabe
    uebergabe -->|"an Sammelstelle"| erhalt
    uebergabe -->|"an Behandlungsanlage"| nachweis
    erhalt --> verbringen
    verbringen --> nachweis
    nachweis --> mitteilung
    mitteilung --> anderer
    anderer -->|Ja| unterrichtung
    anderer -->|Nein| aufhebung
    unterrichtung --> aufhebung

    style aufhebung fill:#d4edda,stroke:#2d8a4a
`;export{e as default};