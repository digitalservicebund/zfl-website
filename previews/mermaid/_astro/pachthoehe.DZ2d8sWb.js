var e=`---
summary: "Zeigt die Ermittlung der zulässigen Höchstpacht für Kleingärten nach §5 BKleingG auf Grundlage ortsüblicher Pachtbeträge sowie das Verfahren zur Anpassung einer vereinbarten Pacht, die von dieser Höchstpacht abweicht."
---
flowchart TD
    A["Ermittlung der zulässigen<br/>Höchstpacht und Anpassung<br/>der vereinbarten Pacht"] --> Q1{"Liegen ortsübliche Pachtbeträge<br/>im erwerbsmäßigen Obst- und<br/>Gemüseanbau vor? — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.3-4</a>"}

    Q1 -->|Ja| B1["Höchstpacht = 4-facher Betrag<br/>der ortsüblichen Pacht, bezogen<br/>auf die Gesamtfläche der Klein-<br/>gartenanlage (gemeinschaftl.<br/>Flächen anteilig berücksichtigt)<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.1-2</a>"]
    Q1 -->|Nein| Q1B{"Wurde auf Antrag ein<br/>Gutachten des Gutachter-<br/>ausschusses eingeholt?<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"}

    Q1B -->|Ja| B1
    Q1B -->|Nein| B2["Vergleichbare Gemeinde als<br/>Bemessungsgrundlage<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.3</a>"]
    B2 --> B1

    B1 --> Q2{"Entspricht die vereinbarte<br/>Pacht der Höchstpacht?"}
    Q2 -->|Ja| Z1["Keine Anpassung erforderlich"]
    Q2 -->|Nein| Q3{"Seit Vertragsschluss oder<br/>letzter Anpassung mind.<br/>3 Jahre vergangen? — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.3</a>"}

    Q3 -->|Nein| Z2["Anpassung erst nach<br/>Ablauf der 3-Jahres-Frist<br/>möglich"]
    Q3 -->|Ja| C1["Vertragspartei erklärt<br/>Anpassung in Textform<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.1</a>"]

    C1 --> Q4{"Handelt es sich um eine<br/>Pachterhöhung durch den<br/>Verpächter?"}
    Q4 -->|Nein| Z3["Pacht wird ab dem 1. Tag des<br/>folgenden Zahlungszeitraums<br/>herab- oder heraufgesetzt<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.2</a>"]
    Q4 -->|Ja| Q5{"Kündigt der Pächter spätestens<br/>am 15. Werktag des Zahlungs-<br/>zeitraums zum Ablauf des<br/>nächsten Monats? — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.4</a>"}

    Q5 -->|Nein| Z3
    Q5 -->|Ja| Z4["Pachtverhältnis endet zum<br/>nächsten Monatsende; die<br/>Erhöhung tritt nicht ein<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.5</a>"]

    style Z1 fill:#f5f5f5,stroke:#999
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#f8d7da,stroke:#c0392b
`;export{e as default};