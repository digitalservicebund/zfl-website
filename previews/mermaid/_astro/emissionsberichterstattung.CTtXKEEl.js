var e=`flowchart TD
    A["Verantwortlicher muss für jede<br/>Handelsperiode einen Überwachungsplan<br/>einreichen<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 1</a>"] --> B{"Ermittlung ausschließlich anhand von<br/>Standardemissionsfaktoren?<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 2</a>"}
    B -->|Ja| C["Vereinfachter Überwachungsplan<br/>genügt<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 2</a>"]
    B -->|Nein| D["Vollständiger Überwachungsplan<br/>erforderlich<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 1</a>"]
    C --> E{"Entspricht der Plan den Vorgaben<br/>der Rechtsverordnung?<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2 S. 1</a>, <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>Abs. 3 S. 1</a>"}
    D --> E
    E -->|Nein| F["Mängel innerhalb gesetzter Frist<br/>beseitigen und geänderten Plan<br/>vorlegen<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2 S. 2</a>"]
    F --> E
    E -->|"Ja (bei vereinfachtem Plan:<br/>keine Mängelrüge binnen<br/>2 Monaten)"| G["Genehmigung erteilt bzw. gilt<br/>als erteilt<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2 S. 1</a>, <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>Abs. 3 S. 3</a>"]
    G --> H["Ermittlung und Bericht über<br/>Brennstoffemissionen bis 31. Juli<br/>des Folgejahres<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1</a>"]
    H --> I{"Wurden die Angaben im<br/>Emissionsbericht von einer<br/>Prüfstelle verifiziert?<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 Abs. 3</a>"}
    I -->|Nein| Z1["Bericht genügt den<br/>Anforderungen nicht"]
    I -->|Ja| J["Abgabe der der berichteten<br/>Gesamtmenge entsprechenden<br/>Emissionszertifikate bis<br/>30. September<br/>— <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a>"]
    J --> Z2["Grundpflichten für das<br/>Kalenderjahr erfüllt"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};