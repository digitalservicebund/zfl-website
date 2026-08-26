var e=`---
summary: "Zeigt die Behandlungskette einer zugelassenen Behandlungsanlage von der Schadstoffentfrachtung über die Entfernung von Teilen bis zur Freigabe zum Schreddern."
---
flowchart TD
    A["Altfahrzeug bei zugelassener<br/>Behandlungsanlage eingegangen"] --> B["Lagerung nach Mindestanforderungen<br/>Anhang VIII Teil A<br/>— <a href='{{ELI}}#026.002' target='_blank' rel='noopener'>Art. 26 Abs. 2 Buchst. a</a>"]

    B --> C["Schadstoffentfrachtung innerhalb von<br/>30 Tagen nach Übergabe<br/>— <a href='{{ELI}}#028.001' target='_blank' rel='noopener'>Art. 28 Abs. 1</a>"]

    C --> D["Getrennte Sammlung von Fluiden, Altöl,<br/>Batterien und besorgniserregenden Stoffen<br/>— <a href='{{ELI}}#028.002' target='_blank' rel='noopener'>Art. 28 Abs. 2</a>,<br/><a href='{{ELI}}#028.003' target='_blank' rel='noopener'>Abs. 3</a>,<br/><a href='{{ELI}}#028.004' target='_blank' rel='noopener'>Abs. 4</a>"]

    D --> E{"Entfernung der in Anhang VIII Teil C<br/>gelisteten Teile vor dem Schreddern<br/>zumutbar? — <a href='{{ELI}}#029.001' target='_blank' rel='noopener'>Art. 29 Abs. 1</a>"}

    E -->|"Ja, mit Wiederverwendungs-,<br/>Wiederaufarbeitungs- oder<br/>Überholungspotenzial"| F["Zerstörungsfreie Entfernung<br/>— <a href='{{ELI}}#029.001' target='_blank' rel='noopener'>Art. 29 Abs. 1</a>"]
    E -->|"Nein, unverhältnismäßige Kosten oder<br/>gleichwertige Post-Schredder-Technologie"| G["Ausnahme von der Entfernungspflicht,<br/>Dokumentation gegenüber Behörde<br/>— <a href='{{ELI}}#029.002' target='_blank' rel='noopener'>Art. 29 Abs. 2</a>,<br/><a href='{{ELI}}#029.003' target='_blank' rel='noopener'>Abs. 3</a>"]

    F --> H["Bewertung auf Eignung zur<br/>Wiederverwendung, Wiederaufarbeitung/<br/>Überholung oder zum Recycling<br/>— <a href='{{ELI}}#art_30' target='_blank' rel='noopener'>Art. 30</a>"]

    H --> J["Fahrzeug innerhalb von 12 Monaten<br/>nach Übergabe vollständig behandelt<br/>— <a href='{{ELI}}#026.002' target='_blank' rel='noopener'>Art. 26 Abs. 2 Buchst. f</a>"]
    G --> J

    J --> K{"Liegt der Verwertungsnachweis<br/>dem Altfahrzeug bei?<br/>— <a href='{{ELI}}#027.001' target='_blank' rel='noopener'>Art. 27 Abs. 1 Buchst. b</a>"}

    K -->|Ja| L["Schreddern zulässig<br/>— <a href='{{ELI}}#027.001' target='_blank' rel='noopener'>Art. 27 Abs. 1</a>"]
    K -->|Nein| M["Meldung an zuständige Behörde;<br/>kein Schreddern bis Behandlung<br/>abgeschlossen ist<br/>— <a href='{{ELI}}#027.002' target='_blank' rel='noopener'>Art. 27 Abs. 2</a>"]

    style L fill:#d4edda,stroke:#2d8a4a
    style M fill:#f8d7da,stroke:#c0392b
`;export{e as default};