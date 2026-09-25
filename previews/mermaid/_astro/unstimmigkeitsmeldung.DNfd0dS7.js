var e=`---
summary: "Das Verfahren der Unstimmigkeitsmeldung an das Transparenzregister nach §23a GwG: Meldung durch Verpflichtete oder Behörden, Prüfung durch die registerführende Stelle unter Mitwirkung der betroffenen Vereinigung oder Rechtsgestaltung und gegebenenfalls Übergabe an das Bundesverwaltungsamt."
---
swimlane-beta TD
    subgraph ER["Erstatter der Meldung (Verpflichtete, Behörden)"]
        start("Unstimmigkeit festgestellt: Eintragungen<br/>nach §20 Abs. 1, §21 Abs. 1 und 2<br/>fehlen, Angaben nach §19 Abs. 1 weichen<br/>ab oder abweichende wirtschaftlich<br/>Berechtigte ermittelt (Ermittlung nach<br/>§3) — <a href='{{ELI}}#art-z23a_abs-z1' target='_blank' rel='noopener'>§23a Abs. 1</a>")
        ausnahme{"Ausnahme von der Meldepflicht?<br/>Verpflichtete: §43 Abs. 2<br/>entsprechend<br/>(Rechtsberatung/Prozessvertretung);<br/>Aufsichtsbehörden, Behörden<br/>nach §25 Abs. 6 und §56 Abs. 5<br/>S. 2, FIU: Aufgabenwahrnehmung<br/>würde beeinträchtigt — <a href='{{ELI}}#art-z23a_abs-z1' target='_blank' rel='noopener'>§23a<br/>Abs. 1 S. 2-3</a>"}
        keineMeldung(["Keine Meldepflicht"])
        meldung["Unverzügliche Meldung über die<br/>Vorkehrung auf der Internetseite des<br/>Transparenzregisters — <a href='{{ELI}}#art-z23a_abs-z1' target='_blank' rel='noopener'>§23a Abs. 1 S. 1</a>,<br/><a href='{{ELI}}#art-z23a_abs-z2' target='_blank' rel='noopener'>§23a Abs. 2</a>"]
        erhalt(["Erhält ermittelte Angaben und<br/>Übersichten;<br/>Verwendung nur zur Erfüllung eigener<br/>Sorgfaltspflichten, keine Weitergabe<br/>— <a href='{{ELI}}#art-z23a_abs-z5' target='_blank' rel='noopener'>§23a Abs. 5 S. 3</a>"])
    end

    subgraph RS["Registerführende Stelle"]
        vermerk["Vermerk auf dem Registerauszug:<br/>Angaben unterliegen der Prüfung — <a href='{{ELI}}#art-z23a_abs-z6' target='_blank' rel='noopener'>§23a<br/>Abs. 6 S. 1</a>"]
        pruefung["Unverzügliche Prüfung; kann vom<br/>Erstatter oder von der<br/>Vereinigung/Rechtsgestaltung<br/>erforderliche Informationen und<br/>Unterlagen verlangen — <a href='{{ELI}}#art-z23a_abs-z3' target='_blank' rel='noopener'>§23a Abs. 3</a>;<br/>erstellt, soweit im Einzelfall<br/>erforderlich, Eigentums- und<br/>Kontrollstrukturübersichten (nicht Teil<br/>der Eintragung) — <a href='{{ELI}}#art-z23a_abs-z3a' target='_blank' rel='noopener'>§23a Abs. 3a</a>"]
        ausgeraeumt{"Unstimmigkeit aufgrund der<br/>Erkenntnisse oder einer neuen<br/>oder berichtigenden Mitteilung<br/>ausgeräumt? — <a href='{{ELI}}#art-z23a_abs-z5' target='_blank' rel='noopener'>§23a Abs. 5 S. 4</a>"}
        abschluss["Verfahren abgeschlossen: Vermerk auf dem<br/>Registerauszug — <a href='{{ELI}}#art-z23a_abs-z6' target='_blank' rel='noopener'>§23a Abs. 6 S. 2</a>;<br/>unverzügliche Übermittlung der<br/>ermittelten Angaben nach §19 Abs. 1 und<br/>der Übersichten an den Erstatter — <a href='{{ELI}}#art-z23a_abs-z5' target='_blank' rel='noopener'>§23a<br/>Abs. 5 S. 1-2</a>"]
    end

    subgraph VR["Vereinigung (§20) / Rechtsgestaltung (§21)"]
        auskunft("Informationen und Unterlagen auf<br/>Verlangen — <a href='{{ELI}}#art-z23a_abs-z3' target='_blank' rel='noopener'>§23a Abs. 3 S. 2</a>; ggf. neue<br/>oder berichtigende Mitteilung — <a href='{{ELI}}#art-z23a_abs-z5' target='_blank' rel='noopener'>§23a<br/>Abs. 5 S. 4</a>")
    end

    subgraph BVA["Bundesverwaltungsamt"]
        uebergabe["Erhält Meldung mit allen erforderlichen<br/>Unterlagen zur Verfolgung von<br/>Ordnungswidrigkeiten nach §56 Abs. 1 S.<br/>1 Nr. 54-66 — <a href='{{ELI}}#art-z23a_abs-z4' target='_blank' rel='noopener'>§23a Abs. 4</a>,<br/><a href='{{ELI}}#art-z56_abs-z5' target='_blank' rel='noopener'>§56 Abs. 5 S. 2</a>"]
    end

    start --> ausnahme
    ausnahme -->|"Ja"| keineMeldung
    ausnahme -->|"Nein"| meldung
    meldung --> vermerk
    vermerk --> pruefung
    pruefung -.->|"Verlangen"| auskunft
    auskunft -.-> ausgeraeumt
    pruefung --> ausgeraeumt
    ausgeraeumt -->|"Ja"| abschluss
    ausgeraeumt -->|"Nein: Angaben nicht zutreffend<br/>oder Prüfung wegen unklarer<br/>Sachlage nicht abschließbar"| uebergabe
    uebergabe -->|"Unstimmigkeit ausgeräumt"| abschluss
    abschluss --> erhalt
    keineMeldung ~~~ meldung

    style keineMeldung fill:#d4edda,stroke:#2d8a4a
    style erhalt fill:#d4edda,stroke:#2d8a4a
    style uebergabe fill:#fff3cd,stroke:#c9a227
`;export{e as default};