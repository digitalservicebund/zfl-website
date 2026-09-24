var e=`---
summary: "Zeigt, wie anhand der Kriterien in Anhang I geprüft wird, ob ein Fahrzeug ein Altfahrzeug ist, und wie ein Fahrzeugeigner mit Reparaturwillen trotz erfüllter Kriterien eine Frist oder nachträgliche Ausnahme erwirken kann."
---
flowchart TD
    START["Fahrzeugstatus zu klären:<br/>Unfallschaden-Bewertung — <a href='{{ELI}}#037.001' target='_blank' rel='noopener'>Art. 37 Abs. 1</a><br/>oder Zweifel bei Verkauf eines<br/>Gebrauchtfahrzeugs — <a href='{{ELI}}#037.002' target='_blank' rel='noopener'>Art. 37 Abs. 2</a>"] --> TEILA{"Erfüllt das Fahrzeug ein<br/>Kriterium aus <a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a> Teil A<br/>(z. B. ausgebrannt, unter<br/>Wasser, irreparable<br/>Sicherheitsbauteile,<br/>technischer Totalschaden)?"}

    TEILA -->|"Ja"| ALTFAHRZEUG["Fahrzeug gilt als Altfahrzeug — <a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a><br/>Teil A"]
    TEILA -->|"Nein"| TEILB{"Erfüllt das Fahrzeug ein<br/>indikatives Kriterium aus<br/><a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a> Teil B (z. B.<br/>Reparaturkosten übersteigen<br/>Marktwert nach Reparatur)?"}

    TEILB -->|"Nein"| KEINALT["Kein Altfahrzeug"]
    TEILB -->|"Ja"| BEWERTUNG["Technische Bewertung durch unabhängigen<br/>Kfz-Sachverständigen:<br/>welche Reparaturen sind für eine<br/>Prüfbescheinigung nötig? — <a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a>"]

    BEWERTUNG --> ENTSCHEIDUNG{"Fahrzeugeigner entscheidet auf<br/>Grundlage der Bewertung<br/>— <a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a>"}

    ENTSCHEIDUNG -->|"Eigner will entsorgen"| ALTFAHRZEUG
    ENTSCHEIDUNG -->|"Eigner hat Reparaturwillen"| FRIST{"Prüfbescheinigung innerhalb<br/>von 5 Jahren nach der<br/>Bewertung erhalten? — <a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a>"}

    FRIST -->|"Ja, innerhalb der Frist"| KEINALT2["Kein Altfahrzeug — Bewertung gilt für<br/>die 5 Jahre als Beleg"]
    FRIST -->|"Nein, Frist verstrichen"| ALTFAHRZEUG2["Fahrzeug gilt als Altfahrzeug"]

    ALTFAHRZEUG2 --> AUSNAHME{"Eigner beantragt bei<br/>zuständiger<br/>Behörde/Genehmigungsstelle<br/>Ausnahme, weil das Fahrzeug<br/>repariert wird? — <a href='{{ELI}}#anx_I' target='_blank' rel='noopener'>Anhang I</a>"}

    AUSNAHME -->|"Ja, Ausnahme gewährt"| KEINALT3["Fahrzeug gilt nicht als Altfahrzeug"]
    AUSNAHME -->|"Nein / kein Antrag"| ENDALT["Fahrzeug bleibt Altfahrzeug"]

    style KEINALT fill:#d4edda,stroke:#2d8a4a
    style KEINALT2 fill:#d4edda,stroke:#2d8a4a
    style KEINALT3 fill:#d4edda,stroke:#2d8a4a
    style ALTFAHRZEUG fill:#f8d7da,stroke:#c0392b
    style ALTFAHRZEUG2 fill:#f8d7da,stroke:#c0392b
    style ENDALT fill:#f8d7da,stroke:#c0392b
    style BEWERTUNG fill:#fff3cd,stroke:#c9a227
`;export{e as default};