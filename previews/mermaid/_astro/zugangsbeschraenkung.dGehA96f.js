var e=`flowchart TD
    S["Koordinierungsstelle für digitale<br/>Dienste oder zuständige Behörde will<br/>eine Maßnahme nach Art. 51 III<br/>Unterabs.1 Buchst. b VO (EU)<br/>2022/2065 erwirken (z.B. Zugangs-<br/>oder Schnittstellenbeschränkung)"] --> Q1{"Wird der Antrag von der<br/>Koordinierungsstelle oder der<br/>zuständigen Behörde nach §12 II S.1,<br/>III gestellt? — <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>§29 III S.1</a>"}

    Q1 -->|Nein| Z1["Antrag unzulässig — das Gericht<br/>darf die Maßnahme nur auf Antrag<br/>dieser Stellen anordnen"]

    Q1 -->|Ja| A1["Antrag ist beim zuständigen<br/>Amtsgericht (Sitz der<br/>Koordinierungsstelle) zu begründen<br/>— <a href='{{ELI}}#art-z29_abs-z1' target='_blank' rel='noopener'>§29 I S.1</a>, <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>III S.2</a>"]

    A1 --> Q2{"Enthält die Begründung Angaben zu:<br/>Voraussetzungen (Nr.1), Art der<br/>Einschränkung – Zugang oder<br/>Online-Schnittstelle (Nr.2),<br/>Kommissionsverlangen (Nr.3) und ggf.<br/>Verlängerung über 4 Wochen<br/>hinaus (Nr.4)?<br/>— <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>§29 III S.3 Nr.1-4</a>"}

    Q2 -->|Nein| Z2["Antrag unvollständig —<br/>Nachbesserung erforderlich"]

    Q2 -->|Ja| Q3{"Sind die Angaben zum Vorliegen<br/>der Voraussetzungen (Nr.1)<br/>glaubhaft gemacht?<br/>— <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>§29 III S.4</a>"}

    Q3 -->|Nein| Z3["Voraussetzungen nicht glaubhaft<br/>gemacht — keine Anordnung"]

    Q3 -->|Ja| A2["Verfahren richtet sich nach dem<br/>FamFG, mit Ausnahme der<br/>§§49-57 FamFG<br/>— <a href='{{ELI}}#art-z29_abs-z1' target='_blank' rel='noopener'>§29 I S.2</a>, <a href='{{ELI}}#art-z29_abs-z2' target='_blank' rel='noopener'>II</a>"]

    A2 --> Z4["Amtsgericht kann die Zugangs-/<br/>Schnittstellenbeschränkung anordnen<br/>(Geltungszeitraum 4 Wochen,<br/>auf Antrag verlängerbar)<br/>— <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>§29 III S.3 Nr.4</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};