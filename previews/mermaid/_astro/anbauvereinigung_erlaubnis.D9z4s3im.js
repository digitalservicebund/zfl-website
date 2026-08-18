var e=`flowchart TD
    Start["Anbauvereinigung stellt Antrag auf<br/>Erlaubnis für gemeinschaftlichen<br/>Eigenanbau — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 Abs.1</a>, <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>Abs.2</a>"] --> F1{"Antrag enthält alle Angaben/<br/>Nachweise nach <a href='{{ELI}}#art-z11_abs-z4' target='_blank' rel='noopener'>§11 Abs.4</a><br/>(Führungszeugnis, Standort,<br/>Mengen, Präventions- und<br/>Schutzkonzept etc.)?"}

    F1 -->|Nein| UNVOLLST["Antrag unvollständig — die<br/>3-Monats-Entscheidungsfrist<br/>beginnt erst mit Vollständigkeit<br/>— <a href='{{ELI}}#art-z11_abs-z5' target='_blank' rel='noopener'>§11 Abs.5</a>"]
    UNVOLLST --> F1

    F1 -->|Ja| F2{"Zwingender Versagungsgrund<br/>nach <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 Abs.1</a> einschlägig?<br/>(fehlende Zuverlässigkeit/<br/>Geschäftsfähigkeit; kein<br/>Präventionsbeauftragter; kein<br/>Gesundheits-/Jugendschutz-<br/>konzept; Satzungsmängel;<br/>Standort <200 m zu Schule/<br/>Kita/Spielplatz, in Wohnung<br/>oder militärischem Bereich)"}

    F2 -->|Ja| VERSAGT["Erlaubnis ist zu versagen<br/>— <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 Abs.1</a>"]

    F2 -->|Nein| F3{"Ermessens-Versagungsgrund<br/>nach <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs.3</a> einschlägig?<br/>(baulicher Verbund/räumliche<br/>Nähe zu Anbauflächen anderer<br/>Anbauvereinigungen; konkrete<br/>Verstoßwahrscheinlichkeit)"}

    F3 -->|"Ja, Behörde übt<br/>Ermessen zulasten aus"| VERSAGT2["Erlaubnis kann<br/>versagt werden<br/>— <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs.3</a>"]

    F3 -->|"Nein bzw. Ermessen<br/>zugunsten der Vereinigung"| ERTEILT["Erlaubnis wird erteilt,<br/>befristet auf 7 Jahre — <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11<br/>Abs.3</a>, <a href='{{ELI}}#art-z14_abs-z' target='_blank' rel='noopener'>§14 S.1</a><br/><br/>Inhalt: Standortbindung, jährliche<br/>Anbau-/Weitergabemenge, ggf.<br/>Bedingungen/Auflagen — <a href='{{ELI}}/art-z13' target='_blank' rel='noopener'>§13</a>"]

    ERTEILT --> BETRIEB{"Während der Laufzeit:<br/>Widerrufsgrund nach <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 Abs.1</a><br/>erfüllt? (nicht genehmigter<br/>Standort; wiederholte Mengen-<br/>überschreitung; wiederholt zu<br/>hoher THC-Gehalt bei Weitergabe<br/>an Heranwachsende; 2 Jahre<br/>ungenutzt; wiederholte Verletzung<br/>der Mitwirkungspflichten)"}

    BETRIEB -->|Ja| WIDERRUF["Erlaubnis kann ganz oder<br/>teilweise widerrufen werden<br/>(nach VwVfG) — <a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15</a>"]

    BETRIEB -->|"Nein, Ablauf der<br/>7 Jahre naht"| VERLAENGERUNG{"Verlängerungsantrag<br/>frühestens nach 5 Jahren<br/>gestellt? — <a href='{{ELI}}#art-z14_abs-z' target='_blank' rel='noopener'>§14 S.2</a>"}

    VERLAENGERUNG -->|"Ja, Voraussetzungen<br/><a href='{{ELI}}/art-z11' target='_blank' rel='noopener'>§§11-13</a> weiter erfüllt"| ERTEILT
    VERLAENGERUNG -->|Nein| ABLAUF["Erlaubnis erlischt<br/>mit Fristablauf<br/>— <a href='{{ELI}}#art-z14_abs-z' target='_blank' rel='noopener'>§14 S.1</a>"]

    style ERTEILT fill:#d4edda,stroke:#2d8a4a
    style VERSAGT fill:#f8d7da,stroke:#c0392b
    style VERSAGT2 fill:#f8d7da,stroke:#c0392b
    style WIDERRUF fill:#f8d7da,stroke:#c0392b
    style ABLAUF fill:#f8d7da,stroke:#c0392b
    style UNVOLLST fill:#fff3cd,stroke:#c9a227
`;export{e as default};