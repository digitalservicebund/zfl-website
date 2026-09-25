var e=`---
summary: "Die Voraussetzungen für die bevorzugte Berücksichtigung eines teilzeitbeschäftigten Arbeitnehmers bei der Verlängerung seiner Arbeitszeit nach § 9 TzBfG, etwa ein freier Arbeitsplatz, gleiche Eignung und entgegenstehende betriebliche Gründe."
---
flowchart TD
    A["Teilzeitbeschäftigter AN zeigt<br/>Arbeitgeber in Textform Wunsch nach<br/>Verlängerung der Arbeitszeit an — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9</a>"] --> Q1{"Gibt es einen entsprechenden<br/>freien, zu besetzenden<br/>Arbeitsplatz? (AG hat<br/>Organisationsentscheidung zur<br/>Schaffung/Neubesetzung<br/>getroffen) — <a href='{{ELI}}#art-z9_abs-n2' target='_blank' rel='noopener'>§9 S.2</a>"}

    Q1 -->|Nein| N1["Keine bevorzugte Berücksichtigung — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9<br/>Nr.1</a>"]

    Q1 -->|Ja| Q2{"Ist der AN mindestens gleich<br/>geeignet wie ein anderer vom<br/>Arbeitgeber bevorzugter<br/>Bewerber? — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9 Nr.2</a>"}

    Q2 -->|Nein| N2["Keine bevorzugte Berücksichtigung — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9<br/>Nr.2</a>"]

    Q2 -->|Ja| Q3{"Stehen Arbeitszeitwünsche<br/>anderer teilzeitbeschäftigter<br/>Arbeitnehmer entgegen? — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9<br/>Nr.3</a>"}

    Q3 -->|Ja| N3["Keine bevorzugte Berücksichtigung — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9<br/>Nr.3</a>"]

    Q3 -->|Nein| Q4{"Stehen dringende betriebliche<br/>Gründe entgegen? — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9 Nr.4</a>"}

    Q4 -->|Ja| N4["Keine bevorzugte Berücksichtigung — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9<br/>Nr.4</a>"]

    Q4 -->|Nein| Z1["Arbeitgeber muss den AN bei der<br/>Besetzung des Arbeitsplatzes bevorzugt<br/>berücksichtigen — <a href='{{ELI}}#art-z9_abs-n1' target='_blank' rel='noopener'>§9</a>"]

    style N1 fill:#f8d7da,stroke:#c0392b
    style N2 fill:#f8d7da,stroke:#c0392b
    style N3 fill:#f8d7da,stroke:#c0392b
    style N4 fill:#f8d7da,stroke:#c0392b
    style Z1 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};