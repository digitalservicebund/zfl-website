var e=`---
summary: "Wann Empfänger vorrangiger Transferleistungen (und mitbetroffene Haushaltsmitglieder) vom Wohngeld ausgeschlossen sind, welche Ausnahmen gelten und für welchen Zeitraum der Ausschluss wirkt."
---
flowchart TD
    A["Ausschluss vom Wohngeld prüfen"] --> Q1{"Empfängt die Person eine<br/>Leistung nach <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a> (u.a.<br/>Bürgergeld,<br/>Grundsicherung/Hilfe zum<br/>Lebensunterhalt SGB XII,<br/>Verletztengeld,<br/>Asylbewerberleistungen,<br/>Jugendhilfe mit<br/>Unterkunftskosten)?"}

    Q1 -->|Nein| Q2{"Haushaltsmitglied ohne eigenen<br/>Leistungsbezug, dessen<br/>Einkommen/Vermögen bei<br/>Berechnung eines anderen<br/>Haushaltsmitglieds<br/>berücksichtigt wurde? — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"}
    Q2 -->|Nein| Z1["Kein Ausschluss vom Wohngeld"]

    Q1 -->|Ja| Q3{"Leistung wird ausschließlich<br/>als Darlehen gewährt? — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I<br/>S.3 Nr.1</a>"}
    Q2 -->|Ja| Q3

    Q3 -->|Ja| Z1
    Q3 -->|Nein| Q4{"Vermeidet/beseitigt Wohngeld<br/>die Hilfebedürftigkeit UND<br/>Leistung während<br/>Verwaltungsverfahren noch<br/>nicht erbracht oder<br/>nachrangiger Träger nach §104<br/>SGB X? — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.3 Nr.2</a>"}

    Q4 -->|Ja| Z1
    Q4 -->|Nein| Z2["Ausschluss vom Wohngeld besteht — <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7</a>"]

    Z2 --> Q5{"Wann beginnt der Ausschluss?<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"}

    Q5 -->|"Ab Antragstellung auf Leistung<br/>nach §7 I"| Z3["Ausschluss ab 1. des Antragsmonats (bzw.<br/>des nächsten Monats) — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.2 Nr.1</a>"]
    Q5 -->|"Ab Bewilligung der Leistung<br/>nach §7 I"| Z4["Ausschluss ab 1. des Bewilligungsmonats<br/>(bzw. des nächsten Monats) — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.2<br/>Nr.2</a>"]
    Q5 -->|"Bis Ende der<br/>Leistungsbewilligung"| Z5["Ausschluss bis zum Monatsletzten (bzw.<br/>Vormonat) — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.2 Nr.3</a>"]

    Z3 --> Q6{"Antrag zurückgenommen,<br/>Leistung<br/>abgelehnt/versagt/entzogen/nur<br/>als Darlehen gewährt,<br/>Bewilligungsbescheid<br/>aufgehoben, Anspruch<br/>nachträgl.<br/>entfallen/nachrangig oder voll<br/>erstattet? — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.3</a>"}
    Z4 --> Q6
    Z5 --> Q6

    Q6 -->|Ja| Z6["Ausschluss gilt für diesen Zeitraum als<br/>nicht erfolgt — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.3</a>"]
    Q6 -->|Nein| Q7{"Haushaltsmitglied verzichtet<br/>auf Leistung nach §7 I, um<br/>Wohngeld zu beantragen? — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8<br/>II</a>"}

    Q7 -->|Ja| Z7["Ausschluss gilt ab Wirkung des Verzichts<br/>als nicht erfolgt — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 II</a>"]
    Q7 -->|Nein| Z8["Ausschluss bleibt für den festgestellten<br/>Zeitraum bestehen"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#fff3cd,stroke:#c9a227
    style Z5 fill:#fff3cd,stroke:#c9a227
    style Z6 fill:#d4edda,stroke:#2d8a4a
    style Z7 fill:#d4edda,stroke:#2d8a4a
    style Z8 fill:#f8d7da,stroke:#c0392b
`;export{e as default};