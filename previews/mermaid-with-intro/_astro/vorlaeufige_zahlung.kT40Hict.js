var e=`---
summary: "Wann eine vorläufige Zahlung des Wohngeldes möglich ist, wie es zur endgültigen Entscheidung kommt und welche Fristen eine vorläufige Zahlung kraft Fiktion endgültig werden lassen."
---
flowchart TD
    A["Feststellung des Wohngeldanspruchs"] --> Q1{"Feststellung benötigt<br/>voraussichtlich längere Zeit<br/>UND hinreichende<br/>Wahrscheinlichkeit eines<br/>Anspruchs? — <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a I</a>"}

    Q1 -->|Nein| Z1["Direkt endgültige Entscheidung über<br/>Wohngeld"]
    Q1 -->|Ja| B["Vorläufige Zahlung auf Basis der<br/>Berechnungsgrößen nach §4 möglich — <a href='{{ELI}}#art-z26a_abs-z1' target='_blank' rel='noopener'>§26a<br/>I</a>"]

    B --> C["Bewilligungsbescheid mit<br/>Vorbehaltshinweis (endgültige<br/>Entscheidung, mögliche Rückforderung)<br/>— <a href='{{ELI}}#art-z26a_abs-z2' target='_blank' rel='noopener'>§26a II</a>"]

    C --> Q2{"Entspricht die vorläufige der<br/>endgültigen Entscheidung?<br/>— <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.3</a>"}

    Q2 -->|Ja| Z2["Keine gesonderte endgültige Entscheidung<br/>erforderlich"]
    Q2 -->|Nein| Q3{"Ergeht innerhalb 1 Jahres nach<br/>Ablauf des<br/>Bewilligungszeitraums eine<br/>endgültige Entscheidung?<br/>— <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.4</a>"}

    Q3 -->|Ja| Z3["Endgültige Entscheidung ergeht wie<br/>getroffen"]
    Q3 -->|Nein| Q4{"Berechtigte Person beantragt<br/>fristgerecht endgültige<br/>Entscheidung, oder Behörde<br/>erlangt Kenntnis abweichender<br/>Tatsachen und entscheidet<br/>binnen 1 Jahr danach<br/>(spätestens 10 Jahre nach<br/>Bekanntgabe)? — <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a III S.5</a>"}

    Q4 -->|Ja| Z3
    Q4 -->|Nein| Z4["Vorläufig bewilligte Zahlung gilt kraft<br/>Fiktion als endgültig festgesetzt — <a href='{{ELI}}#art-z26a_abs-z3' target='_blank' rel='noopener'>§26a<br/>III S.4</a>"]

    Z3 --> D["Vorläufig gezahltes Wohngeld wird auf<br/>endgültiges angerechnet — <a href='{{ELI}}#art-z26a_abs-z4' target='_blank' rel='noopener'>§26a IV</a>"]

    D --> Q5{"Übersteigt die vorläufige die<br/>endgültige Zahlung? — <a href='{{ELI}}#art-z26a_abs-z4' target='_blank' rel='noopener'>§26a IV</a>"}

    Q5 -->|Ja| Z5["Übersteigender Betrag ist zu erstatten<br/>(Bagatellgrenze §30a gilt entsprechend)<br/>— <a href='{{ELI}}#art-z26a_abs-z4' target='_blank' rel='noopener'>§26a IV</a>"]
    Q5 -->|Nein| Z6["Keine Erstattung"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#fff3cd,stroke:#c9a227
    style Z5 fill:#f8d7da,stroke:#c0392b
    style Z6 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};