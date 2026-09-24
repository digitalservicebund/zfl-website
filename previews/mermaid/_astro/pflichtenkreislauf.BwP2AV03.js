var e=`---
summary: "Veranschaulicht den jährlich wiederkehrenden Pflichtenkreislauf der Heizkostenverordnung von der Installation der Erfassungsausstattung über Verbrauchserfassung und unterjährige Verbrauchsinformation bis zur Abrechnung, sowie die Verknüpfung mit dem Kürzungsrecht bei Pflichtverstößen."
---
flowchart TD
    Start(["Start"]) --> Ausstattung["Ausstattung installieren & warten<br/>(<a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>, <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>)"]

    Ausstattung -->|Ausstattung betriebsbereit| Erfassung["Verbrauch laufend erfassen<br/>(<a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>)"]

    Erfassung --> Zwischeninfo["Unterjährige Verbrauchsinformation<br/>(<a href='{{ELI}}#art-z6a_abs-z1' target='_blank' rel='noopener'>§6a I</a>)"]

    Zwischeninfo --> Zeitraum{"Ende des<br/>Abrechnungszeitraums?"}
    Zeitraum -->|"Nein: nächster Monat /<br/>nächstes Quartal"| Zwischeninfo
    Zeitraum -->|Ja| Ablesung["Ablesung / Verbrauchsermittlung<br/>(<a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>)"]

    Ablesung --> Kostenverteilung["Kostenverteilung nach §§6-9 durchführen"]

    Kostenverteilung --> Abrechnungserstellung["Abrechnung inkl. Pflichtangaben erstellen<br/>(<a href='{{ELI}}#art-z6a_abs-z3' target='_blank' rel='noopener'>§6a III</a>)"]

    Abrechnungserstellung --> Mitteilung["Abrechnung an Nutzer mitteilen<br/>(<a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6</a>, <a href='{{ELI}}/art-z6a' target='_blank' rel='noopener'>§6a</a>)"]

    Mitteilung -->|nächster Abrechnungszeitraum beginnt| Erfassung

    Ausstattung -.- NoteAusstattung["Nutzer kann Erfüllung dieser<br/>Pflicht verlangen — <a href='{{ELI}}#art-z4_abs-z4' target='_blank' rel='noopener'>§4 IV</a>"]
    Erfassung -.- NoteErfassung["Datenerhebung/-verarbeitung nur<br/>zweckgebunden zulässig — <a href='{{ELI}}#art-z6b_abs-z' target='_blank' rel='noopener'>§6b</a>"]
    Mitteilung -.- NoteMitteilung["Pflichtverletzung entlang des<br/>Kreislaufs löst Kürzungsrecht<br/>des Nutzers aus — <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a><br/>(15% / 3%, ggf. kumulativ)"]

    style NoteAusstattung fill:#f5f5f5,stroke:#999
    style NoteErfassung fill:#f5f5f5,stroke:#999
    style NoteMitteilung fill:#f5f5f5,stroke:#999
`;export{e as default};