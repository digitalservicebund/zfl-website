var e=`---
summary: "Zeigt, wann eine vorläufige Zahlung des Wohngeldes möglich ist, wie es zur endgültigen Entscheidung kommt und welche Fristen eine vorläufige Zahlung kraft Fiktion endgültig werden lassen."
---
flowchart TD
    A["Feststellung des<br/>Wohngeldanspruchs"] --> Q1{"Feststellung benötigt<br/>voraussichtlich längere Zeit UND<br/>hinreichende Wahrscheinlichkeit eines<br/>Anspruchs? — <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a I</a>"}

    Q1 -->|Nein| Z1["Direkt endgültige<br/>Entscheidung über<br/>Wohngeld"]
    Q1 -->|Ja| B["Vorläufige Zahlung auf<br/>Basis der Berechnungsgrößen<br/>nach §4 möglich — <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a I</a>"]

    B --> C["Bewilligungsbescheid mit Vorbehalts-<br/>hinweis (endgültige Entscheidung,<br/>mögliche Rückforderung) — <a href='{{ELI}}#art-z26a_abs-z2' target='_blank' rel='noopener'>§26a II</a>"]

    C --> Q2{"Entspricht die vorläufige der<br/>endgültigen Entscheidung? — <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.3</a>"}

    Q2 -->|Ja| Z2["Keine gesonderte<br/>endgültige Entscheidung<br/>erforderlich"]
    Q2 -->|Nein| Q3{"Ergeht innerhalb 1 Jahres nach<br/>Ablauf des Bewilligungszeitraums eine<br/>endgültige Entscheidung? — <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.4</a>"}

    Q3 -->|Ja| Z3["Endgültige Entscheidung<br/>ergeht wie getroffen"]
    Q3 -->|Nein| Q4{"Berechtigte Person beantragt<br/>fristgerecht endgültige Entscheidung, oder<br/>Behörde erlangt Kenntnis abweichender<br/>Tatsachen und entscheidet binnen 1 Jahr<br/>danach (spätestens 10 Jahre nach<br/>Bekanntgabe)? — <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.5</a>"}

    Q4 -->|Ja| Z3
    Q4 -->|Nein| Z4["Vorläufig bewilligte Zahlung<br/>gilt kraft Fiktion als endgültig<br/>festgesetzt — <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.4</a>"]

    Z3 --> D["Vorläufig gezahltes Wohngeld<br/>wird auf endgültiges angerechnet — <a href='{{ELI}}#art-z26a_abs-z4' target='_blank' rel='noopener'>§26a IV</a>"]

    D --> Q5{"Übersteigt die vorläufige<br/>die endgültige Zahlung? — <a href='{{ELI}}#art-z26a_abs-z4' target='_blank' rel='noopener'>§26a IV</a>"}

    Q5 -->|Ja| Z5["Übersteigender Betrag ist zu<br/>erstatten (Bagatellgrenze §30a<br/>gilt entsprechend) — <a href='{{ELI}}#art-z26a_abs-z4' target='_blank' rel='noopener'>§26a IV</a>"]
    Q5 -->|Nein| Z6["Keine Erstattung"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#fff3cd,stroke:#c9a227
    style Z5 fill:#f8d7da,stroke:#c0392b
    style Z6 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};