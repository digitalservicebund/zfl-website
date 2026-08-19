var e=`flowchart TD
    A["Liegt für die Fläche ein<br/>Kleingarten i.S.d. Gesetzes<br/>vor?"] --> Q1{"Dient die Fläche der nicht-<br/>erwerbsmäßigen gärtnerischen<br/>Nutzung (Eigenbedarf/Erholung)<br/>und liegt sie in einer Anlage mit<br/>mehreren Einzelgärten und<br/>gemeinschaftl. Einrichtungen?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"}

    Q1 -->|Nein| Z1["Kein Kleingarten i.S.d.<br/>Gesetzes — Gesetz nicht<br/>anwendbar"]
    Q1 -->|Ja| Q2{"Liegt einer der Ausschluss-<br/>tatbestände vor? — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a>"}

    Q2 -->|"Eigentümergarten<br/>— <a href='{{ELI}}#art-z1_abs-z2_inhalt-n1_liste-n1_listenelem-n1' target='_blank' rel='noopener'>Nr.1</a>"| Z1
    Q2 -->|"Wohnungsgarten<br/>— <a href='{{ELI}}#art-z1_abs-z2_inhalt-n1_liste-n1_listenelem-n2' target='_blank' rel='noopener'>Nr.2</a>"| Z1
    Q2 -->|"Arbeitnehmergarten<br/>— <a href='{{ELI}}#art-z1_abs-z2_inhalt-n1_liste-n1_listenelem-n3' target='_blank' rel='noopener'>Nr.3</a>"| Z1
    Q2 -->|"vertraglich beschränkter<br/>Anbau — <a href='{{ELI}}#art-z1_abs-z2_inhalt-n1_liste-n1_listenelem-n4' target='_blank' rel='noopener'>Nr.4</a>"| Z1
    Q2 -->|"Grabeland<br/>— <a href='{{ELI}}#art-z1_abs-z2_inhalt-n1_liste-n1_listenelem-n5' target='_blank' rel='noopener'>Nr.5</a>"| Z1
    Q2 -->|Nein| Q3{"Ist die Fläche im Bebauungs-<br/>plan für Dauerkleingärten<br/>festgesetzt? — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 III</a>"}

    Q3 -->|Ja| Z2["Dauerkleingarten: Pachtver-<br/>trag nur auf unbestimmte<br/>Zeit — <a href='{{ELI}}#art-z6' target='_blank' rel='noopener'>§6</a>; ordentliche Kündi-<br/>gung nur nach <a href='{{ELI}}#art-z9' target='_blank' rel='noopener'>§9</a>; Enteig-<br/>nung zugunsten Pachtwilliger<br/>möglich — <a href='{{ELI}}#art-z15' target='_blank' rel='noopener'>§15</a>"]
    Q3 -->|Nein| Z3["Einfacher Kleingarten:<br/>2. Abschnitt gilt, jedoch<br/>kein besonderer Bestands-<br/>schutz als Dauerkleingarten"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#fff3cd,stroke:#c9a227
`;export{e as default};