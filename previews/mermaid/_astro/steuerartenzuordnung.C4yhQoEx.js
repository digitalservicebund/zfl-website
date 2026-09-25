var e=`---
summary: "Die zutreffende Steuerart nach dem Rennwett- und Lotteriegesetz je nach Art des Spiels oder der Wette (Rennwette, Sportwette, Lotterie, virtuelles Automatenspiel, Online-Poker), einschließlich der Prüfung des erforderlichen Inlandsbezugs."
---
flowchart TD
    START{"Um welche Art von Spiel/ Wette<br/>handelt es sich?"}

    START -->|"Wette bei öffentlichen<br/>Pferderennen/Leistungsprüfungen<br/>für Pferde"| RENN_HALTER{"Wird die Wette vom<br/>Totalisatorbetreiber oder von<br/>einer anderen Person<br/>(Buchmacher) gehalten? — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8</a>"}
    RENN_HALTER -->|Totalisatorbetreiber| TOTSTEUER["Rennwettsteuer als Totalisatorsteuer<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"]
    RENN_HALTER -->|"andere Person (Buchmacher)"| BMSTEUER["Rennwettsteuer als Buchmachersteuer — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8<br/>II</a>"]

    START -->|"Wette aus Anlass eines<br/>Sportereignisses (keine<br/>Rennwette)"| SPORT_ORT{"Veranstalter mit Wohnsitz/Sitz<br/>im Inland oder wettende<br/>Handlung im Inland<br/>vorgenommen? — <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16</a>"}
    SPORT_ORT -->|Ja| SPORTSTEUER["Sportwettensteuer — <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16</a>"]
    SPORT_ORT -->|Nein| KEINE1["Keine Steuer nach diesem Gesetz"]

    START -->|"Öffentliche Lotterie oder<br/>Ausspielung (auch<br/>Zweitlotterie)"| LOTTERIE_ORT{"Veranstalter mit Wohnsitz/Sitz<br/>im Inland oder Spielerhandlung<br/>im Inland vorgenommen? — <a href='{{ELI}}#art-z26_abs-z1' target='_blank' rel='noopener'>§26 I</a>"}
    LOTTERIE_ORT -->|Ja| LOTTERIESTEUER["Lotteriesteuer (vorbehaltlich Befreiung<br/>nach §28)"]
    LOTTERIE_ORT -->|Nein| KEINE2["Keine Steuer nach diesem Gesetz"]

    START -->|"Im Internet angebotene<br/>Nachbildung eines<br/>terrestrischen Automatenspiels"| AUTOMAT_ORTS{"Nur über ortsgebundene<br/>Eingabegeräte spielbar? — <a href='{{ELI}}#art-z36_abs-z' target='_blank' rel='noopener'>§36</a>"}
    AUTOMAT_ORTS -->|Ja| KEINE3["Keine Virtuelle Automatensteuer (gilt<br/>als terrestrisches Spiel)"]
    AUTOMAT_ORTS -->|Nein| AUTOMAT_ORT{"Veranstalter mit Wohnsitz/Sitz<br/>im Inland oder Spielerhandlung<br/>im Inland vorgenommen? — <a href='{{ELI}}#art-z36_abs-z' target='_blank' rel='noopener'>§36</a>"}
    AUTOMAT_ORT -->|Ja| AUTOMATSTEUER["Virtuelle Automatensteuer — <a href='{{ELI}}#art-z36_abs-z' target='_blank' rel='noopener'>§36</a>"]
    AUTOMAT_ORT -->|Nein| KEINE3

    START -->|"Pokerspiel ohne Bankhalter an<br/>einem virtuellen Tisch"| POKER_ORT{"Veranstalter mit Wohnsitz/Sitz<br/>im Inland oder Spielerhandlung<br/>im Inland vorgenommen? — <a href='{{ELI}}#art-z46_abs-z' target='_blank' rel='noopener'>§46</a>"}
    POKER_ORT -->|Ja| POKERSTEUER["Online-Pokersteuer — <a href='{{ELI}}#art-z46_abs-z' target='_blank' rel='noopener'>§46</a>"]
    POKER_ORT -->|Nein| KEINE4["Keine Online-Pokersteuer"]

    style TOTSTEUER fill:#d4edda,stroke:#2d8a4a
    style BMSTEUER fill:#d4edda,stroke:#2d8a4a
    style SPORTSTEUER fill:#d4edda,stroke:#2d8a4a
    style LOTTERIESTEUER fill:#d4edda,stroke:#2d8a4a
    style AUTOMATSTEUER fill:#d4edda,stroke:#2d8a4a
    style POKERSTEUER fill:#d4edda,stroke:#2d8a4a
    style KEINE1 fill:#f8d7da,stroke:#c0392b
    style KEINE2 fill:#f8d7da,stroke:#c0392b
    style KEINE3 fill:#f8d7da,stroke:#c0392b
    style KEINE4 fill:#f8d7da,stroke:#c0392b
`;export{e as default};