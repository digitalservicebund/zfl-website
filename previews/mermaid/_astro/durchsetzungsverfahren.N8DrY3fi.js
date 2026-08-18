var e=`flowchart TD
    S["Koordinierungsstelle für digitale<br/>Dienste oder zuständige Behörde<br/>stellt fest: Anbieter von Vermittlungs-<br/>diensten erfüllt Verpflichtungen<br/>aus VO (EU) 2022/2065 oder §25 I<br/>nicht — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.1</a>"] --> A1["Aufforderung an den Anbieter:<br/>1. Stellungnahme zur Nichterfüllung<br/>innerhalb angemessener Frist<br/>2. Abhilfe innerhalb angemessener<br/>Frist oder unverzüglich<br/>— <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.1 Nr.1, Nr.2</a>"]

    A1 --> R["Rechtsbehelf gegen das Abhilfe-<br/>verlangen (Nr.2) nur gemeinsam mit<br/>der Anordnung nach Absatz 3<br/>anfechtbar — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.2</a>"]

    A1 --> Q1{"Kommt der Anbieter dem<br/>Abhilfeverlangen (Nr.2) innerhalb<br/>der gesetzten Frist nach?<br/>— <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III</a>"}

    Q1 -->|Ja| Z1["Verstoß behoben —<br/>keine weiteren Maßnahmen<br/>erforderlich"]

    Q1 -->|Nein| A2["Behörde ordnet die erforderlichen<br/>Maßnahmen zur Sicherstellung der<br/>Einhaltung an; angemessene Frist<br/>zur Umsetzung wird gesetzt<br/>— <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III</a>"]

    A2 --> Q2{"Kommt der Anbieter der<br/>Anordnung fristgerecht nach?"}

    Q2 -->|Ja| Z2["Anordnung erfüllt —<br/>Verfahren abgeschlossen"]

    Q2 -->|Nein| Z3["Festsetzung eines Zwangsgeldes<br/>nach dem Verwaltungs-<br/>vollstreckungsgesetz von bis zu<br/>5% des durchschnittlichen weltweiten<br/>Tagesumsatzes/der Tageseinnahmen<br/>des Vorjahres — <a href='{{ELI}}#art-z27_abs-z4' target='_blank' rel='noopener'>§27 IV</a>"]

    style R fill:#fff3cd,stroke:#c9a227
    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#f8d7da,stroke:#c0392b
`;export{e as default};