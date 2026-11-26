var e=`---
summary: "Wie die Fördermittel für politische Stiftungen nach dem StiftFinG verteilt werden: Verteilungsschlüssel nach den Wahlergebnissen der nahestehenden Parteien und die Abweichungen für Globalzuschüsse, Baumaßnahmen und Begabtenförderung."
---
flowchart TD
    HG(["Haushaltsgesetz legt die Höhe der<br/>jährlichen Fördermittel fest — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.2</a>"]) --> KEY["Verteilungsschlüssel ab dem auf eine<br/>Bundestagswahl folgenden Haushaltsjahr:<br/>Durchschnitt der Ergebnisse der jeweils<br/>nahestehenden Partei bei den letzten<br/>4 Bundestagswahlen — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III S.1</a>"]
    KEY -.- H1["Partei erst bei 3 Wahlen angetreten:<br/>fehlende Wahl zählt mit 0 Stimmen<br/>— <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III S.2</a>"]

    KEY --> ART{"Art der Fördermittel?"}

    ART -->|"Globalzuschüsse zur<br/>Bildungsarbeit"| G["Jede förderberechtigte Stiftung erhält<br/>1 % des Gesamtbetrags als<br/>Sockelförderung, im Übrigen gilt der<br/>Schlüssel — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 IV</a>"]
    ART -->|"Bauliche Maßnahmen"| B["Abweichung vom Schlüssel möglich,<br/>soweit sachliche Gründe sie erfordern<br/>— <a href='{{ELI}}#art-z3_abs-z5' target='_blank' rel='noopener'>§3 V</a>"]
    ART -->|"Begabtenförderung<br/>im Inland"| BF["Abweichung um bis zu 3 Prozentpunkte<br/>je Stiftung bei besonderen Umständen<br/>— <a href='{{ELI}}#art-z3_abs-z6' target='_blank' rel='noopener'>§3 VI</a>"]
    ART -->|"Sonstige Mittel nur für<br/>politische Stiftungen"| S["Verteilung nach dem Schlüssel — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III</a>"]

    G --> Z
    B --> Z
    BF --> Z
    S --> Z["Zuwendung an die förderfähigen<br/>Stiftungen nach der BHO — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.3</a>"]
    Z -.- H2["Ggf. Minderung nach teilweiser<br/>Aufhebung eines Bescheids — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"]

    style Z fill:#d4edda,stroke:#2d8a4a
    style H1 fill:#f5f5f5,stroke:#999
    style H2 fill:#f5f5f5,stroke:#999
`;export{e as default};