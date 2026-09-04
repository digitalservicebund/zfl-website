var e=`---
summary: "Prüft, ob sich geänderte Verhältnisse während des Bewilligungszeitraums als Erhöhungsanspruch auf Antrag, als Verminderung/Wegfall von Amts wegen oder als bloße Mitteilungspflicht auswirken."
---
flowchart TD
    A["Änderung der Verhältnisse im<br/>laufenden Bewilligungszeitraum"] --> Q1{"Haushaltsmitglieder erhöht,<br/>oder Miete/Belastung abzgl. Heizkosten-<br/>entlastung um mehr als 10% erhöht,<br/>oder Gesamteinkommen um mehr als 10%<br/>verringert (auch durch Haushalts-<br/>verkleinerung)? — <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 I</a>"}

    Q1 -->|Ja| Z1["Neu zu bewilligen auf<br/>Antrag der wohngeldberechtigten<br/>Person — <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 I S.1</a>"]
    Q1 -->|Nein| Q2{"Miete/Belastung rückwirkend<br/>um mehr als 10% erhöht? — <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 I S.2</a>"}

    Z1 --> Z2["Bei Mieterhöhung: auch<br/>rückwirkend bewilligbar, frühestens<br/>ab Beginn des laufenden<br/>Bewilligungszeitraums — <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 I S.2</a>"]
    Q2 -->|Ja| Z2
    Q2 -->|Nein| Q3

    Q3{"Haushaltsmitglieder auf<br/>mind. 1 verringert, oder Miete/Belastung<br/>abzgl. Heizkostenentlastung um mehr als<br/>15% verringert, oder Gesamteinkommen<br/>um mehr als 15% erhöht mit Wegfall/<br/>Verringerung des Wohngeldes<br/>(nicht nur vorübergehend)? — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II</a>"}
    Q3 -->|Ja| Z3["Neuentscheidung von Amts<br/>wegen mit Wirkung ab Zeitpunkt<br/>der Änderung, unter Aufhebung<br/>des Bewilligungsbescheides — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II</a>"]
    Q3 -->|Nein| Z4["Keine Neuentscheidung<br/>von Amts wegen"]

    Z3 --> Q4{"Neuentscheidung binnen 1 Jahr<br/>nach Kenntnis der Wohngeldbehörde<br/>von der Änderung? — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.7</a>"}
    Q4 -->|Ja| Z5["Neuentscheidung<br/>wirksam"]
    Q4 -->|Nein| Z6["Neuentscheidung von Amts<br/>wegen nicht mehr zulässig"]

    Z4 --> Q5{"Haushaltsverkleinerung/<br/>Ausschluss-Erhöhung, Miete/Belastung<br/>&gt;15% verringert, oder Einkommen<br/>&gt;15% erhöht (nicht nur vorüber-<br/>gehend)? — <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III</a>"}

    Q5 -->|Ja| Z7["Wohngeldberechtigte Person<br/>muss dies der Wohngeldbehörde<br/>unverzüglich mitteilen — <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III</a>"]
    Q5 -->|Nein| Z8["Keine Mitteilungspflicht<br/>nach §27 III"]

    Z7 --> Q6{"Änderung wird erst nach<br/>Ablauf des Bewilligungszeitraums<br/>bekannt und wirkt zurück? — <a href='{{ELI}}#art-z27_abs-z4' target='_blank' rel='noopener'>§27 IV</a>"}

    Q6 -->|"Ja, nicht mitgeteilt"| Z9["Entscheidung nach Abs. 2<br/>längstens für 10 Jahre seit<br/>Änderung zulässig — <a href='{{ELI}}#art-z27_abs-z4' target='_blank' rel='noopener'>§27 IV S.3</a>"]
    Q6 -->|"Ja, Kenntnis erst<br/>nachträglich erlangt"| Z10["Entscheidung nach Abs. 2<br/>längstens für 3 Jahre vor<br/>Kenntniserlangung zulässig — <a href='{{ELI}}#art-z27_abs-z4' target='_blank' rel='noopener'>§27 IV S.2</a>"]
    Q6 -->|Nein| Z11["Reguläre Fristen<br/>nach Abs. 2/3 gelten"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#f5f5f5,stroke:#999
    style Z5 fill:#f8d7da,stroke:#c0392b
    style Z6 fill:#f5f5f5,stroke:#999
    style Z7 fill:#fff3cd,stroke:#c9a227
    style Z8 fill:#f5f5f5,stroke:#999
    style Z9 fill:#fff3cd,stroke:#c9a227
    style Z10 fill:#fff3cd,stroke:#c9a227
    style Z11 fill:#f5f5f5,stroke:#999
`;export{e as default};