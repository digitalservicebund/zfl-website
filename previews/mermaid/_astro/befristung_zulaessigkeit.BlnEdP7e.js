var e=`---
summary: "Zeigt, unter welchen Voraussetzungen eine Befristung eines Arbeitsvertrags nach § 14 TzBfG zulässig ist – mit oder ohne Sachgrund, unter Beachtung des Vorbeschäftigungsverbots, mit Erleichterungen für Unternehmensgründungen und ältere Arbeitnehmer sowie dem Schriftformerfordernis."
---
flowchart TD
    A["Arbeitsvertrag soll<br/>befristet werden"] --> Q1{"Liegt ein sachlicher Grund vor?<br/>(z.B. vorübergehender Bedarf,<br/>Vertretung, Erprobung,<br/>Befristung in Person des AN)<br/>— <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>"}

    Q1 -->|Ja| Z1["Befristung mit Sachgrund zulässig,<br/>keine gesetzliche Höchstdauer<br/>— <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>"]

    Q1 -->|Nein| Q2{"Bestand mit demselben Arbeit-<br/>geber bereits zuvor ein<br/>befristetes oder unbefristetes<br/>Arbeitsverhältnis?<br/>— <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II S.2</a>"}

    Q2 -->|Ja| N1["Sachgrundlose Befristung<br/>unzulässig (Vorbeschäftigungs-<br/>verbot) — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II S.2</a>"]

    Q2 -->|Nein| Q3{"Befindet sich das Unternehmen<br/>in den ersten 4 Jahren nach<br/>seiner Gründung?<br/>— <a href='{{ELI}}#art-z14_abs-z2a' target='_blank' rel='noopener'>§14 IIa</a>"}

    Q3 -->|Ja| Z2["Sachgrundlose Befristung bis<br/>zu 4 Jahren zulässig, mehrfache<br/>Verlängerung möglich<br/>— <a href='{{ELI}}#art-z14_abs-z2a' target='_blank' rel='noopener'>§14 IIa S.1</a>"]

    Q3 -->|Nein| Q4{"Hat AN bei Beginn das<br/>52. Lebensjahr vollendet und war<br/>zuvor mind. 4 Monate beschäftigungs-<br/>los, im Bezug von Transferkurzarbeiter-<br/>geld oder in geförderter Beschäftigungs-<br/>maßnahme? — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III</a>"}

    Q4 -->|Ja| Z3["Sachgrundlose Befristung bis<br/>zu 5 Jahren zulässig, mehrfache<br/>Verlängerung möglich — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III</a>"]

    Q4 -->|Nein| Z4["Sachgrundlose Befristung bis zu<br/>2 Jahren zulässig; innerhalb dieser<br/>Gesamtdauer höchstens 3-malige<br/>Verlängerung — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II S.1</a><br/><br/>(Tarifvertrag kann Dauer/Anzahl<br/>abweichend regeln — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II S.3</a>)"]

    Z1 --> F["Befristung bedarf zu ihrer<br/>Wirksamkeit der Schriftform<br/>— <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV</a>"]
    Z2 --> F
    Z3 --> F
    Z4 --> F

    F --> Q5{"Ist die Befristungsabrede<br/>schriftlich vereinbart?"}

    Q5 -->|Ja| E1["Befristung wirksam"]
    Q5 -->|Nein| E2["Befristung unwirksam;<br/>Vertrag gilt als unbefristet<br/>— <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16 S.1</a>"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#d4edda,stroke:#2d8a4a
    style N1 fill:#f8d7da,stroke:#c0392b
    style E1 fill:#d4edda,stroke:#2d8a4a
    style E2 fill:#f8d7da,stroke:#c0392b
`;export{e as default};