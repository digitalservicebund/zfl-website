var e=`---
summary: "Zeigt, wann dem Pächter nach Kündigung des Kleingartenpachtvertrags ein Entschädigungsanspruch für eingebrachte Anpflanzungen und Anlagen nach §11 BKleingG zusteht und wer zur Zahlung dieser Entschädigung verpflichtet ist."
---
flowchart TD
    A["Kleingartenpachtvertrag<br/>wurde gekündigt"] --> Q1{"Kündigung erfolgte nach<br/><a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a> Nr.2 bis 6?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I S.1</a>"}

    Q1 -->|Nein| Z1["Kein Entschädigungsanspruch<br/>nach §11"]
    Q1 -->|Ja| B1["Pächter hat Anspruch auf<br/>angemessene Entschädigung für<br/>eingebrachte oder entgeltlich<br/>übernommene Anpflanzungen/<br/>Anlagen, soweit im Rahmen<br/>kleingärtnerischer Nutzung<br/>üblich — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I S.1</a>"]

    B1 --> Q2{"Bestehen von Ländern/Klein-<br/>gärtnerorganisation aufgestellte,<br/>behördlich genehmigte Bewer-<br/>tungsregeln? — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I S.2</a>"}
    Q2 -->|Ja| B2["Diese Regeln sind der<br/>Bemessung zugrunde<br/>zu legen"]
    Q2 -->|Nein| B3["Bemessung nach allgemeinen<br/>Entschädigungsgrundsätzen"]

    B2 --> Q3{"Kündigung erfolgte nach<br/><a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a> Nr.5 oder 6?"}
    B3 --> Q3

    Q3 -->|Ja| B4["Zusätzlich sind die Grund-<br/>sätze der Enteignungsent-<br/>schädigung zu beachten<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I S.3</a>"]
    Q3 -->|Nein| Q4{"Wer ist zur Entschädigung<br/>verpflichtet? — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>"}
    B4 --> Q4

    Q4 -->|"Kündigung nach<br/>Nr.2, 3 oder 4"| Z2["Verpächter ist zur<br/>Entschädigung verpflichtet<br/>— <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II S.1</a>"]
    Q4 -->|"Kündigung nach<br/>Nr.5 oder 6"| Z3["Derjenige, der die Fläche<br/>in Anspruch nimmt, ist zur<br/>Entschädigung verpflichtet<br/>— <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II S.2</a>"]

    Z2 --> F["Anspruch wird fällig, sobald<br/>Pachtverhältnis beendet und<br/>Kleingarten geräumt ist<br/>— <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III</a>"]
    Z3 --> F

    style Z1 fill:#f8d7da,stroke:#c0392b
    style F fill:#d4edda,stroke:#2d8a4a
`;export{e as default};