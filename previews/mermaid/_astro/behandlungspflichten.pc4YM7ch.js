var e=`---
summary: "Die Behandlungskette einer zugelassenen Behandlungsanlage von der Schadstoffentfrachtung über die Entfernung von Teilen bis zur Freigabe zum Schreddern."
---
flowchart TD
    A["Altfahrzeug bei zugelassener<br/>Behandlungsanlage eingegangen"] --> B["Lagerung nach Mindestanforderungen<br/>Anhang VIII Teil A — <a href='{{ELI}}#026.002' target='_blank' rel='noopener'>Art. 26 Abs. 2<br/>Buchst. a</a>"]

    B --> C["Schadstoffentfrachtung innerhalb von 30<br/>Tagen nach Übergabe — <a href='{{ELI}}#028.001' target='_blank' rel='noopener'>Art. 28 Abs. 1</a>"]

    C --> D["Getrennte Sammlung von Fluiden, Altöl,<br/>Batterien und besorgniserregenden<br/>Stoffen — <a href='{{ELI}}#028.002' target='_blank' rel='noopener'>Art. 28 Abs. 2</a>,<br/><a href='{{ELI}}#028.003' target='_blank' rel='noopener'>Abs. 3</a>,<br/><a href='{{ELI}}#028.004' target='_blank' rel='noopener'>Abs. 4</a>"]

    D --> E{"Entfernung der in Anhang VIII<br/>Teil C gelisteten Teile vor<br/>dem Schreddern zumutbar?<br/>— <a href='{{ELI}}#029.001' target='_blank' rel='noopener'>Art. 29 Abs. 1</a>"}

    E -->|"Ja, mit Wiederverwendungs-,<br/>Wiederaufarbeitungs- oder<br/>Überholungspotenzial"| F["Zerstörungsfreie Entfernung — <a href='{{ELI}}#029.001' target='_blank' rel='noopener'>Art. 29<br/>Abs. 1</a>"]
    E -->|"Nein, unverhältnismäßige<br/>Kosten oder gleichwertige<br/>Post-Schredder-Technologie"| G["Ausnahme von der Entfernungspflicht,<br/>Dokumentation gegenüber Behörde — <a href='{{ELI}}#029.002' target='_blank' rel='noopener'>Art.<br/>29 Abs. 2</a>,<br/><a href='{{ELI}}#029.003' target='_blank' rel='noopener'>Abs. 3</a>"]

    F --> H["Bewertung auf Eignung zur<br/>Wiederverwendung, Wiederaufarbeitung/<br/>Überholung oder zum Recycling — <a href='{{ELI}}#art_30' target='_blank' rel='noopener'>Art. 30</a>"]

    H --> J["Fahrzeug innerhalb von 12 Monaten nach<br/>Übergabe vollständig behandelt — <a href='{{ELI}}#026.002' target='_blank' rel='noopener'>Art. 26<br/>Abs. 2 Buchst. f</a>"]
    G --> J

    J --> K{"Liegt der Verwertungsnachweis<br/>dem Altfahrzeug bei? — <a href='{{ELI}}#027.001' target='_blank' rel='noopener'>Art. 27<br/>Abs. 1 Buchst. b</a>"}

    K -->|Ja| L["Schreddern zulässig — <a href='{{ELI}}#027.001' target='_blank' rel='noopener'>Art. 27 Abs. 1</a>"]
    K -->|Nein| M["Meldung an zuständige Behörde;<br/>kein Schreddern bis Behandlung<br/>abgeschlossen ist — <a href='{{ELI}}#027.002' target='_blank' rel='noopener'>Art. 27 Abs. 2</a>"]

    style L fill:#d4edda,stroke:#2d8a4a
    style M fill:#f8d7da,stroke:#c0392b
`;export{e as default};