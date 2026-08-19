var e=`---
summary: "Veranschaulicht den Aufbau des Risikomanagements eines Verpflichteten nach §§4-7 GwG, von der Benennung der Verantwortlichen über die Risikoanalyse und interne Sicherungsmaßnahmen bis zur laufenden Überwachung ihrer Wirksamkeit."
---
flowchart TD
    A["Verpflichteter im Sinne des §2 GwG"] --> B["Mitglied der Leitungsebene für Risikomanagement<br/>benennen &amp; geldwäscherechtliche Verantwortung zuweisen<br/>— <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3</a>"]
    B --> C["Risikoanalyse: Risiken der Geldwäsche/<br/>Terrorismusfinanzierung ermitteln und bewerten<br/>(Anlagen 1 &amp; 2, nationale Risikoanalyse)<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"]
    C --> D{"Aufsichtsbehörde befreit von<br/>Dokumentationspflicht, weil Risiken<br/>klar erkennbar &amp; verstanden sind?<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs. 4</a>"}
    D -->|Ja| F["Keine Dokumentationspflicht"]
    D -->|Nein| G["Risikoanalyse dokumentieren, regelmäßig<br/>überprüfen &amp; ggf. aktualisieren,<br/>Aufsichtsbehörde auf Verlangen vorlegen<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2</a>"]
    F --> H
    G --> H["Angemessene interne Sicherungsmaßnahmen<br/>einrichten (Grundsätze, Verfahren, Kontrollen)<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1</a>"]
    H --> I["Geldwäschebeauftragten &amp; Stellvertreter<br/>bestellen, Aufsichtsbehörde anzeigen<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1</a>, <a href='{{ELI}}#art-z7_abs-z4' target='_blank' rel='noopener'>Abs. 4</a>"]
    I --> J["Mitarbeiterzuverlässigkeit prüfen, Schulungen<br/>durchführen, Hinweisgebersystem einrichten<br/>— <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2</a>, <a href='{{ELI}}#art-z6_abs-z5' target='_blank' rel='noopener'>Abs. 5</a>"]
    J --> K{"Funktionsfähigkeit der Sicherungsmaßnahmen<br/>laufend überwacht &amp; ausreichend?<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 3</a>"}
    K -->|Ja| L["Risikomanagement wirksam etabliert"]
    K -->|Nein| M["Sicherungsmaßnahmen aktualisieren;<br/>Aufsichtsbehörde kann Anordnungen<br/>zur Nachbesserung erteilen<br/>— <a href='{{ELI}}#art-z6_abs-z8' target='_blank' rel='noopener'>§6 Abs. 8</a>"]
    M --> H

    style L fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style M fill:#fff3cd,stroke:#c9a227
`;export{e as default};