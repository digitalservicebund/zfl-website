var e=`---
summary: "Das Fahreignungs-Bewertungssystem nach dem StVG: Bewertung rechtskräftig geahndeter Verkehrsverstöße mit Punkten, die stufenweisen Maßnahmen der Fahrerlaubnisbehörde von der Ermahnung bis zur Entziehung und der Punktabzug durch ein freiwilliges Fahreignungsseminar."
---
flowchart TD
    start(["Straftat oder Ordnungswidrigkeit mit<br/>Bezug zur Verkehrssicherheit wird<br/>rechtskräftig geahndet — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 II S.1, S.3</a>"])
    anwendbar["Nicht anzuwenden, wenn sich die Entziehung<br/>bereits aus <a href='https://www.gesetze-im-internet.de/stvg/__3.html' target='_blank' rel='noopener'>§3 I</a> ergibt; neben den Regeln<br/>zur Fahrerlaubnis auf Probe — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 I S.3-4</a>"]
    bewertung["Bewertung nach der Rechtsverordnung:<br/>3 Punkte: Straftat mit Entziehung/Sperre,<br/>2 Punkte: sonstige Straftat oder besonders<br/>gefährdende Ordnungswidrigkeit,<br/>1 Punkt: sonstige Ordnungswidrigkeit<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 II S.2</a> (bei Tateinheit nur die<br/>höchste Punktzahl — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 II S.4</a>)"]
    kba["Kraftfahrt-Bundesamt übermittelt bei<br/>Erreichen der Punktestände die Eintragungen<br/>aus dem Fahreignungsregister an die<br/>Fahrerlaubnisbehörde — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VIII S.1</a>"]
    stand{"Punktestand bei<br/>Begehung der letzten Tat?<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 V S.5</a>"}
    vormerkung(["Vormerkung, noch keine<br/>Maßnahme — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 IV</a>"])
    ermahnung["Schriftliche Ermahnung mit Hinweis auf<br/>das freiwillige Fahreignungsseminar<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 V S.1 Nr.1, S.2</a>"]
    vorstufe6{"Ermahnung bereits<br/>ergriffen? — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VI S.1</a>"}
    ermahnungNach(["Stattdessen Ermahnung; Punktestand<br/>sinkt auf 5 Punkte — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VI S.2-3</a>"])
    verwarnung["Schriftliche Verwarnung: Seminar möglich,<br/>aber ohne Punktabzug; bei 8 Punkten<br/>wird die Fahrerlaubnis entzogen<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 V S.1 Nr.2, S.2-3</a>"]
    vorstufe8{"Verwarnung bereits<br/>ergriffen? — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VI S.1</a>"}
    verwarnungNach(["Stattdessen Verwarnung; Punktestand<br/>sinkt auf 7 Punkte — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VI S.2-3</a>"])
    entziehung["Gilt als ungeeignet, Fahrerlaubnis ist<br/>zu entziehen — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 V S.1 Nr.3</a><br/>(Widerspruch und Klage ohne<br/>aufschiebende Wirkung — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 IX</a>)"]
    sperre(["Neue Fahrerlaubnis frühestens 6 Monate<br/>nach Wirksamkeit der Entziehung, in der<br/>Regel mit Fahreignungsgutachten<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 X</a>"])
    seminar{"Seminar besucht und<br/>Bescheinigung binnen<br/>2 Wochen vorgelegt?<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VII S.1</a>"}
    abzugMoeglich{"Punktestand 1 bis 5 und<br/>kein Abzug in den letzten<br/>5 Jahren? — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VII S.1-2</a>"}
    abzug(["Abzug eines Punktes; maßgeblich ist das<br/>Ausstellungsdatum der Bescheinigung<br/>— <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VII S.1, S.3</a>"])
    keinAbzug(["Kein Punktabzug — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 VII</a>"])
    tilgung["Punktestand: nur Taten, deren Tilgungsfrist<br/>(<a href='https://www.gesetze-im-internet.de/stvg/__29.html' target='_blank' rel='noopener'>§29</a>) bei Begehung der letzten Tat noch<br/>nicht abgelaufen war; spätere Tilgungen<br/>bleiben unberücksichtigt — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 V S.6-7</a>"]
    neuerteilung["Bei Neuerteilung einer Fahrerlaubnis<br/>werden frühere Punkte gelöscht — <a href='https://www.gesetze-im-internet.de/stvg/__4.html' target='_blank' rel='noopener'>§4 III</a>"]

    start --> bewertung
    start -.- anwendbar
    bewertung --> kba
    kba --> stand
    stand -.- tilgung
    stand -->|"1 bis 3 Punkte"| vormerkung
    stand -->|"4 oder 5 Punkte"| ermahnung
    stand -->|"6 oder 7 Punkte"| vorstufe6
    stand -->|"8 oder mehr Punkte"| vorstufe8
    vorstufe6 -->|Ja| verwarnung
    vorstufe6 -->|Nein| ermahnungNach
    vorstufe8 -->|Ja| entziehung
    vorstufe8 -->|Nein| verwarnungNach
    entziehung --> sperre
    sperre -.- neuerteilung
    ermahnung -->|freiwillig| seminar
    seminar -->|Ja| abzugMoeglich
    seminar -->|Nein| keinAbzug
    abzugMoeglich -->|Ja| abzug
    abzugMoeglich -->|Nein| keinAbzug

    style vormerkung fill:#fff3cd,stroke:#c9a227
    style ermahnungNach fill:#fff3cd,stroke:#c9a227
    style verwarnungNach fill:#fff3cd,stroke:#c9a227
    style abzug fill:#d4edda,stroke:#2d8a4a
    style keinAbzug fill:#fff3cd,stroke:#c9a227
    style sperre fill:#f8d7da,stroke:#c0392b
    style entziehung fill:#f8d7da,stroke:#c0392b
    style anwendbar fill:#f5f5f5,stroke:#999
    style tilgung fill:#f5f5f5,stroke:#999
    style neuerteilung fill:#f5f5f5,stroke:#999
`;export{e as default};