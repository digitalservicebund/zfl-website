var e=`---
summary: "Wann der Drittschuldner nach einer Forderungspfändung eine Erklärung abgeben muss, welche Angaben sie enthält, wem gegenüber sie abgegeben werden kann und was bei Nichterfüllung folgt."
---
flowchart TD
    start(["Pfändungsbeschluss wird dem<br/>Drittschuldner zugestellt — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 III</a>"])
    aufforderung{"Aufforderung zur Erklärung<br/>zusammen mit dem Beschluss<br/>übermittelt? — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 II S.1</a>"}
    keinePflicht(["Keine Erklärungspflicht nach <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 I</a>"])
    frist["Frist: 2 Wochen ab Zustellung des<br/>Pfändungsbeschlusses — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 I</a>"]
    inhalt["Erklärung an den Gläubiger:<br/>1. ob und inwieweit er die Forderung als<br/>begründet anerkennt und zahlungsbereit ist<br/>2. ob und welche Ansprüche andere<br/>Personen an die Forderung machen<br/>3. ob und wegen welcher Ansprüche sie<br/>für andere Gläubiger gepfändet ist<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 I Nr. 1-3</a>"]
    konto{"Ist Guthaben auf einem<br/>Konto gepfändet?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 I Nr. 4, 5</a>"}
    kontoAngaben["Zusätzlich:<br/>4. ob in den letzten 12 Monaten für das<br/>Konto die Unpfändbarkeit des Guthabens<br/>festgesetzt wurde — <a href='https://www.gesetze-im-internet.de/zpo/__907.html' target='_blank' rel='noopener'>§907</a><br/>5. ob es ein Pfändungsschutzkonto<br/>(<a href='https://www.gesetze-im-internet.de/zpo/__850k.html' target='_blank' rel='noopener'>§850k</a>) oder Gemeinschaftskonto (<a href='https://www.gesetze-im-internet.de/zpo/__850l.html' target='_blank' rel='noopener'>§850l</a>)<br/>ist; beim Gemeinschaftskonto auch, ob der<br/>Schuldner nur gemeinsam mit anderen<br/>verfügungsbefugt ist — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 I Nr. 4, 5</a>"]
    erfuellt{"Erklärungspflicht<br/>fristgerecht erfüllt?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 II S.2</a>"}
    ok(["Erklärungspflicht erfüllt"])
    haftung(["Drittschuldner haftet dem Gläubiger für<br/>den aus der Nichterfüllung entstehenden<br/>Schaden — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 II S.2</a>"])

    start --> aufforderung
    aufforderung -->|Nein| keinePflicht
    aufforderung -->|Ja| frist
    frist --> inhalt
    inhalt --> konto
    konto -->|Ja| kontoAngaben
    konto -->|Nein| erfuellt
    kontoAngaben --> erfuellt
    erfuellt -->|Ja| ok
    erfuellt -->|Nein| haftung

    frist -.- adressat["Abgabe gegenüber dem Gläubiger oder<br/>innerhalb der Frist gegenüber dem<br/>Gerichtsvollzieher — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 III S.1</a>;<br/>bei Abgabe während der Zustellung nach<br/><a href='https://www.gesetze-im-internet.de/zpo/__193.html' target='_blank' rel='noopener'>§193</a>: Aufnahme in die Zustellungsurkunde,<br/>vom Drittschuldner zu unterschreiben<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 III S.2</a>"]

    style ok fill:#d4edda,stroke:#2d8a4a
    style haftung fill:#f8d7da,stroke:#c0392b
    style keinePflicht fill:#fff3cd,stroke:#c9a227
    style adressat fill:#f5f5f5,stroke:#999
`;export{e as default};