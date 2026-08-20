var e=`---
summary: "Prüft, ob ein Diensteanbieter dem UrhDaG unterfällt, ob eine Ausnahme greift und ob Erleichterungen für Startup- oder kleine Diensteanbieter bestehen."
---
flowchart TD
    A["Anbieter speichert und organisiert eine große Menge von<br/>Dritten hochgeladener geschützter Inhalte, bewirbt diese zur<br/>Gewinnerzielung und konkurriert mit Online-Inhaltediensten? —<br/><a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a>"] --> B{"Alle vier<br/>Voraussetzungen erfüllt?"}

    B -->|Nein| Z1["Kein Diensteanbieter<br/>im Sinne des Gesetzes"]
    B -->|Ja| C{"Dienst fällt unter Ausnahme<br/>(u.a. Enzyklopädie, Bildungs-/<br/>Wissenschaftsrepositorium, Open-<br/>Source-Plattform, Marktplatz,<br/>B2B- oder Eigengebrauchs-Cloud)?<br/>— <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>"}

    C -->|Ja| Z1
    C -->|Nein| D{"Umsatz in der EU ≤ 10 Mio. €<br/>und Dienst seit weniger als<br/>3 Jahren öffentlich verfügbar? —<br/><a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II</a>"}

    D -->|Ja| Z2["Startup-Diensteanbieter:<br/>keine Pflicht zur qualifizierten<br/>Blockierung — <a href='{{ELI}}#art-z7_abs-z4' target='_blank' rel='noopener'>§7 IV</a>"]
    D -->|Nein| E{"Umsatz in der EU<br/>≤ 1 Mio. €? —<br/><a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III</a>"}

    E -->|Ja| Z3["Kleiner Diensteanbieter:<br/>widerlegliche Vermutung gegen<br/>Pflicht zur qualifizierten<br/>Blockierung — <a href='{{ELI}}#art-z7_abs-z5' target='_blank' rel='noopener'>§7 V</a>"]
    E -->|Nein| Z4["Diensteanbieter unterliegt<br/>den vollen Pflichten des<br/>Gesetzes"]

    style Z1 fill:#f5f5f5,stroke:#999
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};