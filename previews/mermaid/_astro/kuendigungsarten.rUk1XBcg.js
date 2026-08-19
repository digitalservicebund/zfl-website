var e=`flowchart TD
    A["Verpächter möchte den Klein-<br/>gartenpachtvertrag beenden"] --> Q0{"Kündigung in schriftlicher<br/>Form erklärt? — <a href='{{ELI}}#art-z7_abs-z' target='_blank' rel='noopener'>§7</a>"}

    Q0 -->|Nein| Z0["Kündigung formunwirksam"]
    Q0 -->|Ja| Q1{"Grund zur außerordentlichen<br/>Kündigung ohne Frist?<br/>— <a href='{{ELI}}#art-z8_abs-z' target='_blank' rel='noopener'>§8</a>"}

    Q1 -->|"Zahlungsverzug ≥ 1/4 Jahr,<br/>trotz Mahnung nicht binnen<br/>2 Monaten erfüllt<br/>— <a href='{{ELI}}#art-z8_abs-z_inhalt-n1_liste-n1_listenelem-n1' target='_blank' rel='noopener'>Nr.1</a>"| Z1["Kündigung sofort wirksam,<br/>keine Frist einzuhalten"]
    Q1 -->|"schwerwiegende Pflicht-<br/>verletzung, nachhaltige<br/>Störung des Friedens<br/>— <a href='{{ELI}}#art-z8_abs-z_inhalt-n1_liste-n1_listenelem-n2' target='_blank' rel='noopener'>Nr.2</a>"| Z1

    Q1 -->|Nein| Q2{"Liegt ein Grund zur ordent-<br/>lichen Kündigung vor?<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"}

    Q2 -->|Nein| Z2["Keine Kündigung möglich"]
    Q2 -->|"Eigenbedarf des Eigen-<br/>tümers — <a href='{{ELI}}#art-z9_abs-z1_inhalt-n1_liste-n1_listenelem-n3' target='_blank' rel='noopener'>Nr.3</a> oder andere<br/>Nutzung planungsrechtl.<br/>zulässig — <a href='{{ELI}}#art-z9_abs-z1_inhalt-n1_liste-n1_listenelem-n4' target='_blank' rel='noopener'>Nr.4</a>"| Q3{"Vertrag auf bestimmte Zeit<br/>geschlossen? — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"}
    Q2 -->|"Pflichtverletzung — <a href='{{ELI}}#art-z9_abs-z1_inhalt-n1_liste-n1_listenelem-n1' target='_blank' rel='noopener'>Nr.1</a>,<br/>Neuordnung — <a href='{{ELI}}#art-z9_abs-z1_inhalt-n1_liste-n1_listenelem-n2' target='_blank' rel='noopener'>Nr.2</a>, Bebauungs-<br/>plan — <a href='{{ELI}}#art-z9_abs-z1_inhalt-n1_liste-n1_listenelem-n5' target='_blank' rel='noopener'>Nr.5</a> oder Planfest-<br/>stellung — <a href='{{ELI}}#art-z9_abs-z1_inhalt-n1_liste-n1_listenelem-n6' target='_blank' rel='noopener'>Nr.6</a>"| Q4

    Q3 -->|Ja| Z3["Kündigung nach Nr.3/4<br/>unzulässig — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"]
    Q3 -->|Nein| Q4{"Welcher Grund bestimmt<br/>die Kündigungsfrist?<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"}

    Q4 -->|Nr.1| F1["Kündigung spätestens am<br/>3. Werktag im August,<br/>Vertragsende: 30. November<br/>— <a href='{{ELI}}#art-z9_abs-z2_inhalt-n1_liste-n1_listenelem-n1' target='_blank' rel='noopener'>§9 II Nr.1</a>"]
    Q4 -->|"Nr.2, 3 oder 4"| F2["Kündigung spätestens am<br/>3. Werktag im Februar,<br/>Vertragsende: 30. November<br/>— <a href='{{ELI}}#art-z9_abs-z2_inhalt-n1_liste-n1_listenelem-n2' target='_blank' rel='noopener'>§9 II Nr.2</a>"]
    Q4 -->|"Nr.5 oder 6"| Q5{"Erfordern dringende Gründe<br/>die vorzeitige Inanspruch-<br/>nahme der Fläche?<br/>— <a href='{{ELI}}#art-z9_abs-z2_inhalt-n1_text-n2' target='_blank' rel='noopener'>§9 II S.2</a>"}

    Q5 -->|Nein| F2
    Q5 -->|Ja| F3["Verkürzte Frist: Kündigung<br/>spätestens am 3. Werktag<br/>eines Monats, Vertragsende:<br/>Ablauf des nächsten Monats<br/>— <a href='{{ELI}}#art-z9_abs-z2_inhalt-n1_text-n2' target='_blank' rel='noopener'>§9 II S.2</a>"]

    style Z0 fill:#f8d7da,stroke:#c0392b
    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style F1 fill:#d4edda,stroke:#2d8a4a
    style F2 fill:#d4edda,stroke:#2d8a4a
    style F3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};