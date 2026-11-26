var e=`---
summary: "Der Ablauf des Einbürgerungstests nach § 1 EinbTestV: Zusammenstellung des Fragebogens aus dem zugelassenen Fragenkatalog, die Durchführung unter Aufsicht und die Voraussetzungen für das Bestehen sowie die Ausstellung der Bescheinigung."
---
flowchart TD
    A["Fragebogen aus den 100 zugelassenen<br/>Varianten des Fragenkatalogs (Anlage 1)<br/>erstellt — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a>"] --> B["Fragebogen enthält 33 Fragen, davon 3<br/>landesbezogen für das<br/>Wohnsitz-Bundesland des Teilnehmers — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1<br/>II S.1</a>"]

    B --> C["Durchführung unter Aufsicht:<br/>je 4 Antwortmöglichkeiten, eine davon<br/>richtig — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"]

    C --> D{"Mindestens 17 von 33 Fragen<br/>innerhalb von 60 Minuten<br/>richtig beantwortet? — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 III</a>"}

    D -->|Nein| E["Einbürgerungstest nicht bestanden"]
    D -->|Ja| F["Einbürgerungstest bestanden"]

    F --> G["Bescheinigung nach einheitlichem<br/>Vordruck wird ausgestellt — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.1</a>"]

    G --> H["Bescheinigung gilt bei Wohnsitzwechsel<br/>auch gegenüber der neu zuständigen<br/>Behörde fort — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.2</a>"]

    style E fill:#f8d7da,stroke:#c0392b
    style F fill:#d4edda,stroke:#2d8a4a
    style H fill:#d4edda,stroke:#2d8a4a
`;export{e as default};