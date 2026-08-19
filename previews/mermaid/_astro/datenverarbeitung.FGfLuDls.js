var e=`flowchart TD
    A{"Verfahren nach §2 I<br/>(Mitnutzung der vom Bundesamt<br/>benannten Prüfstellen)?"}

    A -->|Nein| B["§4 nicht einschlägig:<br/>keine Datenerhebungsbefugnis<br/>des Bundesamtes über<br/>eine Prüfstelle"]

    A -->|Ja| C["Bundesamt darf über die<br/>Prüfstelle Familienname, Vorname,<br/>Geburtsdatum, Geburtsort und<br/>Anschrift des Teilnehmers erheben<br/>und verwenden — <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 S.1</a>"]

    C --> D["Zweck: Durchführung des<br/>Einbürgerungstests und Ausstellung<br/>der Bescheinigung nach<br/>einheitlichem Vordruck<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 S.1</a>"]

    D --> E{"Sind seit Ausstellung der<br/>Bescheinigung 2 Jahre<br/>vergangen? — <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 S.2</a>"}

    E -->|Nein| D
    E -->|Ja| F["Daten sind spätestens jetzt<br/>zu löschen — <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 S.2</a>"]

    style B fill:#f5f5f5,stroke:#999
    style F fill:#d4edda,stroke:#2d8a4a
`;export{e as default};