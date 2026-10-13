var e=`---
summary: "Die gemeinsame Beschaffung medizinischer Gegenmaßnahmen durch Kommission und teilnehmende Länder: Vereinbarung, Bewertung der Kommission, Interessenbekundung und Entscheidung über die Beteiligung."
---
swimlane-beta TD
    subgraph LAND["Mitgliedstaaten und weitere Länder"]
        start(["Vorabbeschaffung medizinischer<br/>Gegenmaßnahmen — <a href='{{ELI}}#012.001' target='_blank' rel='noopener'>Art. 12 Abs. 1</a> (offen<br/>für alle Mitgliedstaaten, EFTA-Staaten,<br/>Bewerberländer, Andorra, Monaco, San<br/>Marino und Vatikanstadt<br/>— <a href='{{ELI}}#012.003' target='_blank' rel='noopener'>Art. 12 Abs. 3 Buchst. a</a>)"])

        vereinbarung["Vereinbarung über die gemeinsame<br/>Beschaffung zwischen den Beteiligten:<br/>praktische Ausgestaltung, Auswahl des<br/>Verfahrens, Bewertung, Bieter und<br/>Auftragsvergabe — <a href='{{ELI}}#012.002' target='_blank' rel='noopener'>Art. 12 Abs. 2</a>"]
        interesse["Frühzeitige Interessenbekundung auf<br/>Grundlage der Bewertung; nur wer Interesse<br/>bekundet hat, entscheidet anschließend<br/>— <a href='{{ELI}}#012.003' target='_blank' rel='noopener'>Art. 12 Abs. 3 Buchst. c</a>"]
        beteiligung{"Entscheidung für die<br/>Beteiligung unter den mit<br/>der Kommission vereinbarten<br/>Bedingungen?<br/>— <a href='{{ELI}}#012.003' target='_blank' rel='noopener'>Art. 12 Abs. 3 Buchst. c</a>"}
        nein(["Keine Beteiligung; Rechte und Pflichten<br/>bleiben gewahrt, keine direkten<br/>finanziellen Auswirkungen auf den<br/>Haushalt — <a href='{{ELI}}#012.003' target='_blank' rel='noopener'>Art. 12 Abs. 3 Buchst. b, e</a>"])
        verfahren["Gemeinsames Beschaffungsverfahren<br/>nach Art. 165 Abs. 2 VO 2018/1046, ohne<br/>Beeinträchtigung des Binnenmarkts, ohne<br/>Diskriminierung, Handelsbeschränkung<br/>oder Wettbewerbsverzerrung<br/>— <a href='{{ELI}}#012.003' target='_blank' rel='noopener'>Art. 12 Abs. 3 Buchst. d</a>"]
    end

    subgraph KOM["Kommission"]
        bewertung["Bewertung der gemeinsamen Beschaffung<br/>vor Einleitung: allgemeine Bedingungen,<br/>mögliche Beschränkungen paralleler<br/>Beschaffungen und Verhandlungen,<br/>Versorgungssicherheit; Angaben u.a. zu<br/>Preisspannen, Herstellern, Lieferfristen<br/>und Frist für die Entscheidung über die<br/>Beteiligung — <a href='{{ELI}}#012.003' target='_blank' rel='noopener'>Art. 12 Abs. 3 Buchst. c</a>"]
        ep(["Information des Europäischen Parlaments<br/>über die Verfahren — <a href='{{ELI}}#012.005' target='_blank' rel='noopener'>Art. 12 Abs. 5</a>; auf<br/>Anfrage Zugang zu den Verträgen"])

    end

    start --> vereinbarung
    vereinbarung --> bewertung
    bewertung --> interesse
    interesse --> beteiligung
    beteiligung -->|Ja| verfahren
    beteiligung -->|Nein| nein
    verfahren --> ep
    verfahren ~~~ nein

    style nein fill:#fff3cd,stroke:#c9a227
    style ep fill:#d4edda,stroke:#2d8a4a
`;export{e as default};