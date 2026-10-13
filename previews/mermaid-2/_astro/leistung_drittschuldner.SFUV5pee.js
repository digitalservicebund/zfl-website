var e=`---
summary: "Wann der Drittschuldner nach der Überweisung einer gepfändeten Geldforderung an den Gläubiger leisten darf: Monatsfristen bei Kontoguthaben, Gemeinschaftskonten und nicht wiederkehrenden Vergütungen sowie Hinterlegung bei mehrfacher Pfändung."
---
flowchart TD
    start(["Überweisungsbeschluss wird dem<br/>Drittschuldner zugestellt — <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 III S.1</a>"])
    natPerson{"Ist der Schuldner eine<br/>natürliche Person?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 III S.2, IV</a>"}
    konto{"Guthaben bei einem<br/>Kreditinstitut gepfändet?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 III S.2</a>"}
    kontoFrist["Leistung an den Gläubiger oder<br/>Hinterlegung erst 1 Monat nach Zustellung<br/>des Überweisungsbeschlusses an den<br/>Drittschuldner — <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 III S.2</a>"]
    kuenftig["Künftiges Guthaben: auf Antrag erst<br/>1 Monat nach Gutschrift, Anordnung des<br/>Vollstreckungsgerichts — <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 III S.2</a>;<br/>beim Gemeinschaftskonto kraft Gesetzes<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__850l.html' target='_blank' rel='noopener'>§850l I S.2</a>"]
    verguetung{"Nicht wiederkehrende<br/>Vergütung für persönliche<br/>Arbeit/Dienste oder sonstige<br/>Einkünfte, die kein<br/>Arbeitseinkommen sind?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 IV</a>"}
    verguetungFrist["Leistung an den Gläubiger oder<br/>Hinterlegung erst 1 Monat nach Zustellung<br/>des Überweisungsbeschlusses — <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 IV</a>"]
    mehrfach{"Forderung für mehrere<br/>Gläubiger gepfändet? — <a href='https://www.gesetze-im-internet.de/zpo/__853.html' target='_blank' rel='noopener'>§853</a>"}
    hinterlegung(["Drittschuldner darf, auf Verlangen eines<br/>Überweisungsgläubigers muss er beim<br/>Amtsgericht des zuerst zugestellten<br/>Beschlusses hinterlegen (Sachlage<br/>anzeigen, Beschlüsse aushändigen) — <a href='https://www.gesetze-im-internet.de/zpo/__853.html' target='_blank' rel='noopener'>§853</a>"])
    zahlung(["Leistung an den Gläubiger"])

    start --> natPerson
    natPerson -->|Ja| konto
    natPerson -->|Nein| mehrfach
    konto -->|Ja| kontoFrist
    kontoFrist --> kuenftig
    kuenftig --> mehrfach
    konto -->|Nein| verguetung
    verguetung -->|Ja| verguetungFrist
    verguetung -->|Nein| mehrfach
    verguetungFrist --> mehrfach
    mehrfach -->|Ja| hinterlegung
    mehrfach -->|Nein| zahlung

    kontoFrist -.- gemeinschaft["Gemeinschaftskonto: Schuldner kann<br/>innerhalb der Frist die Übertragung seines<br/>Kopfteils auf ein Einzelkonto verlangen<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__850l.html' target='_blank' rel='noopener'>§850l II</a>"]
    zahlung -.- schutz["Drittschuldner ist geschützt, solange der<br/>Beschluss nicht aufgehoben und ihm die<br/>Aufhebung nicht bekannt ist — <a href='https://www.gesetze-im-internet.de/zpo/__836.html' target='_blank' rel='noopener'>§836 II</a>"]

    style zahlung fill:#d4edda,stroke:#2d8a4a
    style hinterlegung fill:#fff3cd,stroke:#c9a227
    style gemeinschaft fill:#f5f5f5,stroke:#999
    style schutz fill:#f5f5f5,stroke:#999
`;export{e as default};