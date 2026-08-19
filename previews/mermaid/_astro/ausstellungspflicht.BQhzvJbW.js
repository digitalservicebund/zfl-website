var e=`---
summary: "Zeigt, wann eine Entgeltbescheinigung nach § 108 Abs. 3 GewO ausgestellt werden muss, wann die Pflicht mangels inhaltlicher Änderungen entfällt und welche Pflichtangaben sowie Schwärzungsmöglichkeiten die Bescheinigung nach §§ 1 und 2 EBV enthalten muss."
---
flowchart TD
    A["Abrechnungszeitraum endet,<br/>Entgelt wird abgerechnet"] --> B{"Ergeben sich gegenüber der letzten<br/>Bescheinigung inhaltliche Änderungen<br/>(außer beim Abrechnungszeitraum selbst)?<br/>— <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1 S. 2</a>"}

    B -->|Nein| C["Verpflichtung zur Ausstellung<br/>entfällt für diesen Zeitraum<br/>— <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1 S. 2</a>"]
    B -->|Ja| D{"Wurde für vorangegangene Zeiträume<br/>mangels Änderungen keine Bescheinigung<br/>ausgestellt?"}

    D -->|Ja| E["Bescheinigung in Textform erstellen,<br/>mit Hinweis, für welche Zeiträume<br/>keine Bescheinigung vorliegt<br/>(durchgehender Nachweis möglich)<br/>— <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1 S. 3</a>"]
    D -->|Nein| F["Bescheinigung in Textform erstellen<br/>mit Pflichtangaben nach<br/>— <a href='{{ELI}}/art-z1' target='_blank' rel='noopener'>§1</a><br/>— <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1 S. 1</a>"]

    E --> G["Angaben zu Pauschalsteuerbrutto<br/>und Gesamtbruttoentgelt-Korrekturen<br/>können als Anlage beigefügt werden<br/>— <a href='{{ELI}}#art-z2_abs-z1a' target='_blank' rel='noopener'>§2 Abs. 1a</a>"]
    F --> G

    G --> H["Arbeitnehmerin/Arbeitnehmer kann<br/>das Kirchensteuermerkmal<br/>schwärzen<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2</a>"]

    H --> I["Entgeltbescheinigung ausgehändigt,<br/>gekennzeichnet als Bescheinigung<br/>nach § 108 Abs. 3 S. 1 GewO<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 Abs. 4</a>"]

    style C fill:#fff3cd,stroke:#c9a227
    style I fill:#d4edda,stroke:#2d8a4a
`;export{e as default};