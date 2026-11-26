var e=`---
summary: "Unter welchen Voraussetzungen Personen, deren Qualifikation aus EU, EWR oder Schweiz einem Pflegeberuf nur teilweise entspricht, eine Erlaubnis zur partiellen Berufsausübung oder eine Genehmigung für vorübergehende Dienstleistungen erhalten."
---
flowchart TD
    start(["Antrag auf partielle Berufsausübung —<br/>bei der Behörde des Landes der Tätigkeit<br/>bzw. der Dienstleistung — <a href='{{ELI}}#art-z52_abs-z1a' target='_blank' rel='noopener'>§52 Ia</a>"])
    ziel{"Dauerhafte Ausübung oder<br/>vorübergehende und<br/>gelegentliche Dienstleistung?"}
    staat{"Staatsangehörige von<br/>EU, EWR oder Schweiz?<br/>— <a href='{{ELI}}#art-z48b_abs-z1' target='_blank' rel='noopener'>§48b I Nr.1</a>"}
    niedergelassen{"Dort rechtmäßig<br/>niedergelassen?<br/>— <a href='{{ELI}}#art-z48b_abs-z1' target='_blank' rel='noopener'>§48b I Nr.2</a>"}
    regl{"Beruf im Niederlassungsstaat<br/>reglementiert?<br/>— <a href='{{ELI}}#art-z48b_abs-z1' target='_blank' rel='noopener'>§48b I Nr.2 a</a>"}
    praxis{"Mindestens 1 Jahr Praxis<br/>in den letzten 10 Jahren?<br/>— <a href='{{ELI}}#art-z48b_abs-z1' target='_blank' rel='noopener'>§48b I Nr.2 b</a>"}
    n1{"In EU, EWR oder Schweiz<br/>uneingeschränkt qualifiziert<br/>für eine Tätigkeit, die einem<br/>Pflegeberuf nur partiell<br/>entspricht? — <a href='{{ELI}}#art-z48a_abs-z1' target='_blank' rel='noopener'>§48a I Nr.1</a>"}
    n2{"Unterschiede so groß, dass<br/>Anpassungsmaßnahmen einer<br/>vollständigen Ausbildung<br/>gleichkämen?<br/>— <a href='{{ELI}}#art-z48a_abs-z1' target='_blank' rel='noopener'>§48a I Nr.2</a>"}
    n3{"Tätigkeit umfasst<br/>vorbehaltene Aufgaben<br/>nach §4? — <a href='{{ELI}}#art-z48a_abs-z1' target='_blank' rel='noopener'>§48a I Nr.3</a>"}
    n4{"Voraussetzungen nach<br/>§2 Nr.2-4 erfüllt?<br/>— <a href='{{ELI}}#art-z48a_abs-z1' target='_blank' rel='noopener'>§48a I Nr.4</a>"}
    schutz{"Steht Patientenschutz<br/>oder Schutz der öffentlichen<br/>Gesundheit entgegen?<br/>— <a href='{{ELI}}#art-z48a_abs-z2' target='_blank' rel='noopener'>§48a II Nr.1</a>"}
    auto{"Automatische Anerkennung<br/>möglich?<br/>— <a href='{{ELI}}#art-z48a_abs-z2' target='_blank' rel='noopener'>§48a II Nr.2</a>"}
    nein(["Keine Erlaubnis bzw. Genehmigung<br/>zur partiellen Berufsausübung"])
    neinDL(["Keine Genehmigung zur<br/>Dienstleistungserbringung — <a href='{{ELI}}#art-z48b_abs-z1' target='_blank' rel='noopener'>§48b I</a>"])
    versagt(["Darf nicht erteilt werden — <a href='{{ELI}}#art-z48a_abs-z2' target='_blank' rel='noopener'>§48a II</a>"])
    erlaubnis(["Erlaubnis zur partiellen Berufsausübung,<br/>beschränkt auf die nachgewiesenen<br/>Tätigkeiten — <a href='{{ELI}}#art-z48a_abs-z1' target='_blank' rel='noopener'>§48a I</a>, <a href='{{ELI}}#art-z48a_abs-z3' target='_blank' rel='noopener'>§48a III</a>"])
    genehmigung(["Genehmigung zur Dienstleistungserbringung<br/>im Rahmen partieller Berufsausübung<br/>— <a href='{{ELI}}#art-z48b_abs-z1' target='_blank' rel='noopener'>§48b I</a>"])
    hinweisE["Tätigkeit unter der Berufsbezeichnung des<br/>Herkunftsstaats mit Hinweis auf Staat und<br/>Tätigkeit — <a href='{{ELI}}#art-z48a_abs-z4' target='_blank' rel='noopener'>§48a IV</a>; im Umfang der Erlaubnis<br/>gleiche Rechte und Pflichten — <a href='{{ELI}}#art-z48a_abs-z5' target='_blank' rel='noopener'>§48a V</a>;<br/>Rücknahme, Widerruf, Ruhen nach §3 — <a href='{{ELI}}#art-z48a_abs-z6' target='_blank' rel='noopener'>§48a VI</a>"]
    hinweisG["Gleiche Rechte und Pflichten im Umfang<br/>der Genehmigung — <a href='{{ELI}}#art-z48b_abs-z2' target='_blank' rel='noopener'>§48b II</a>; Meldung nach<br/>§46, Bezeichnung nach §48a IV, §3 und<br/>§44 II, III gelten entsprechend — <a href='{{ELI}}#art-z48b_abs-z3' target='_blank' rel='noopener'>§48b III</a>"]

    start --> ziel
    ziel -->|"Dauerhaft — <a href='{{ELI}}/art-z48a' target='_blank' rel='noopener'>§48a</a>"| n1
    ziel -->|"Dienstleistung — <a href='{{ELI}}/art-z48b' target='_blank' rel='noopener'>§48b</a>"| staat
    staat -->|Ja| niedergelassen
    staat -->|Nein| neinDL
    niedergelassen -->|Ja| regl
    niedergelassen -->|Nein| neinDL
    regl -->|Ja| n1
    regl -->|Nein| praxis
    praxis -->|Ja| n1
    praxis -->|Nein| neinDL
    n1 -->|Ja| n2
    n1 -->|Nein| nein
    n2 -->|Ja| n3
    n2 -->|Nein| nein
    n3 -->|Ja| n4
    n3 -->|Nein| nein
    n4 -->|Ja| schutz
    n4 -->|Nein| nein
    schutz -->|Ja| versagt
    schutz -->|"Nein, bei dauerhafter<br/>Ausübung"| auto
    schutz -->|"Nein, bei<br/>Dienstleistung"| genehmigung
    auto -->|Ja| versagt
    auto -->|Nein| erlaubnis
    erlaubnis -.- hinweisE
    genehmigung -.- hinweisG

    style erlaubnis fill:#d4edda,stroke:#2d8a4a
    style genehmigung fill:#d4edda,stroke:#2d8a4a
    style neinDL fill:#f8d7da,stroke:#c0392b
    style nein fill:#f8d7da,stroke:#c0392b
    style versagt fill:#f8d7da,stroke:#c0392b
    style hinweisE fill:#f5f5f5,stroke:#999
    style hinweisG fill:#f5f5f5,stroke:#999
`;export{e as default};