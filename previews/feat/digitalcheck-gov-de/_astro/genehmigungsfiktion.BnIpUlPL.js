var e=`---
summary: "Die Entscheidungsfristen der Krankenkasse für einen Leistungsantrag nach §13 Abs. 3a SGB V und was passiert, wenn sie nicht eingehalten werden: Genehmigungsfiktion und Erstattung selbst beschaffter Leistungen."
---
flowchart TD
    start(["Leistungsberechtigte stellen bei der<br/>Krankenkasse einen Antrag auf Leistungen<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.1</a>"])
    reha{"Leistung zur<br/>medizinischen<br/>Rehabilitation?<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.9</a>"}
    rehaEnde(["Koordinierung und Erstattung selbst<br/>beschaffter Leistungen nach §§14-24 SGB IX<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.9</a>"])
    gutachten{"Hält die Krankenkasse eine<br/>gutachtliche Stellungnahme<br/>für erforderlich?<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.2</a>"}
    frist3["Frist: zügig, spätestens 3 Wochen<br/>nach Antragseingang — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.1</a>"]
    einholen["Krankenkasse holt die Stellungnahme<br/>unverzüglich ein und unterrichtet die<br/>Leistungsberechtigten — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.2</a>"]
    zahn{"Zahnärztliches<br/>Gutachterverfahren nach<br/>Bundesmantelvertrag<br/>(§87 Ic)? — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.4</a>"}
    frist5["Frist: 5 Wochen nach Antragseingang<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.1</a>; der Medizinische<br/>Dienst nimmt binnen 3 Wochen Stellung<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.3</a>"]
    frist6["Frist: 6 Wochen ab Antragseingang;<br/>der Gutachter nimmt binnen 4 Wochen<br/>Stellung — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.4</a>"]
    entschieden{"Entscheidet die<br/>Krankenkasse innerhalb<br/>der Frist?"}
    fristgerecht(["Fristgerechte Entscheidung über den<br/>Antrag — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.1</a>"])
    mitteilung{"Rechtzeitige schriftliche<br/>oder elektronische<br/>Mitteilung eines<br/>hinreichenden Grundes?<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.5, S.6</a>"}
    keineFiktion(["Keine Genehmigungsfiktion<br/>— <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.6</a>"])
    fiktion["Leistung gilt nach Ablauf der Frist als<br/>genehmigt — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.6</a>"]
    erstattung(["Krankenkasse erstattet die Kosten einer<br/>nach Fristablauf selbst beschafften,<br/>erforderlichen Leistung — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.7</a>"])

    start --> reha
    reha -->|Ja| rehaEnde
    reha -->|Nein| gutachten
    gutachten -->|Nein| frist3
    gutachten -->|Ja| einholen
    einholen --> zahn
    zahn -->|Nein| frist5
    zahn -->|Ja| frist6
    frist3 --> entschieden
    frist5 --> entschieden
    frist6 --> entschieden
    entschieden -->|Ja| fristgerecht
    entschieden -->|Nein| mitteilung
    mitteilung -->|Ja| keineFiktion
    mitteilung -->|Nein| fiktion
    fiktion -->|"Leistungsberechtigte<br/>beschaffen sich die<br/>Leistung selbst"| erstattung

    mitteilung -.- bericht["Krankenkasse berichtet dem GKV-Spitzenverband<br/>jährlich über Fristüberschreitungen und<br/>Kostenerstattungen — <a href='https://www.gesetze-im-internet.de/sgb_5/__13.html' target='_blank' rel='noopener'>§13 IIIa S.8</a>"]

    style rehaEnde fill:#fff3cd,stroke:#c9a227
    style fristgerecht fill:#d4edda,stroke:#2d8a4a
    style keineFiktion fill:#fff3cd,stroke:#c9a227
    style fiktion fill:#d4edda,stroke:#2d8a4a
    style erstattung fill:#d4edda,stroke:#2d8a4a
    style bericht fill:#f5f5f5,stroke:#999
`;export{e as default};