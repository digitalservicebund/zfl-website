var e=`---
summary: "Das kostenfreie Verfahren vor der Schiedsstelle beim Deutschen Patent- und Markenamt: Antrag, Zustellung an den anderen Beteiligten, Einigungsvorschlag mit einmonatiger Widerspruchsfrist und die Folgen einer erfolglosen Beendigung für eine spätere Klage."
---
swimlane-beta TD
    subgraph AS["Antragsteller (Arbeitgeber oder Arbeitnehmer)"]
        start(["Streitfall zwischen Arbeitgeber<br/>und Arbeitnehmer auf Grund<br/>des Gesetzes — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a>"])
        antrag["Schriftlicher Antrag mit kurzer<br/>Sachverhaltsdarstellung, Name<br/>und Anschrift des anderen<br/>Beteiligten — <a href='{{ELI}}#art-z31_abs-z1' target='_blank' rel='noopener'>§31 I</a>; ggf. zugleich<br/>Antrag auf erweiterte Besetzung<br/>— <a href='{{ELI}}#art-z32_abs-z' target='_blank' rel='noopener'>§32</a>"]
    end

    subgraph SST["Schiedsstelle beim DPMA"]
        zustellung["Vorsitzender stellt den Antrag zu,<br/>mit Frist zur schriftlichen<br/>Äußerung — <a href='{{ELI}}#art-z31_abs-z2' target='_blank' rel='noopener'>§31 II</a>"]
        erfolglos1(["Erfolglos beendet — <a href='{{ELI}}#art-z35_abs-z1' target='_blank' rel='noopener'>§35 I Nr. 1, 2</a>;<br/>Mitteilung durch den Vorsitzenden<br/>— <a href='{{ELI}}#art-z35_abs-z2' target='_blank' rel='noopener'>§35 II</a>; Klage zulässig<br/>— <a href='{{ELI}}#art-z37_abs-z1' target='_blank' rel='noopener'>§37 I</a>"])
        verfahren["Versucht eine gütliche Einigung<br/>— <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a>; bestimmt das Verfahren im<br/>Übrigen selbst — <a href='{{ELI}}#art-z33_abs-z2' target='_blank' rel='noopener'>§33 II</a>; keine<br/>Gebühren oder Auslagen — <a href='{{ELI}}#art-z36_abs-z' target='_blank' rel='noopener'>§36</a>"]
        vorschlag["Begründeter Einigungsvorschlag,<br/>mit Stimmenmehrheit beschlossen<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 I</a>; von allen Mitgliedern<br/>unterschrieben, mit Hinweis auf<br/>Widerspruch, den Beteiligten<br/>zugestellt — <a href='{{ELI}}#art-z34_abs-z2' target='_blank' rel='noopener'>§34 II</a>"]
        widerspruch{"Schriftlicher Widerspruch eines<br/>Beteiligten binnen 1 Monat nach<br/>Zustellung eingegangen?<br/>— <a href='{{ELI}}#art-z34_abs-z3' target='_blank' rel='noopener'>§34 III</a>, <a href='{{ELI}}#art-z35_abs-z1' target='_blank' rel='noopener'>§35 I Nr. 3</a><br/>(Wiedereinsetzung bei unabwend-<br/>barem Zufall — <a href='{{ELI}}#art-z34_abs-z4' target='_blank' rel='noopener'>§34 IV</a>)"}
        angenommen(["Vorschlag gilt als angenommen,<br/>entsprechende Vereinbarung<br/>ist zustande gekommen<br/>— <a href='{{ELI}}#art-z34_abs-z3' target='_blank' rel='noopener'>§34 III</a>"])
    end

    subgraph AB["Anderer Beteiligter"]
        einlassung{"Äußert sich fristgerecht und<br/>lässt sich auf das Verfahren ein?<br/>(Erweiterungsantrag binnen<br/>2 Wochen — <a href='{{ELI}}#art-z32_abs-z' target='_blank' rel='noopener'>§32</a>)<br/>— <a href='{{ELI}}#art-z35_abs-z1' target='_blank' rel='noopener'>§35 I Nr. 1, 2</a>"}
    end

    subgraph GER["Gericht"]
        klage(["Nach Mitteilung der erfolglosen<br/>Beendigung — <a href='{{ELI}}#art-z35_abs-z2' target='_blank' rel='noopener'>§35 II</a>:<br/>Klage zulässig — <a href='{{ELI}}#art-z37_abs-z1' target='_blank' rel='noopener'>§37 I</a>; ausschließlich zuständig<br/>sind die Gerichte für Patent-<br/>streitsachen — <a href='{{ELI}}#art-z39_abs-z1' target='_blank' rel='noopener'>§39 I</a>"])
    end

    start --> antrag
    antrag --> zustellung
    zustellung --> einlassung
    einlassung -->|Nein| erfolglos1
    einlassung -->|Ja| verfahren
    verfahren --> vorschlag
    vorschlag --> widerspruch
    widerspruch -->|Nein| angenommen
    widerspruch -->|"Ja: erfolglos<br/>beendet"| klage

    style angenommen fill:#d4edda,stroke:#2d8a4a
    style erfolglos1 fill:#f8d7da,stroke:#c0392b
    style klage fill:#fff3cd,stroke:#c9a227
`;export{e as default};