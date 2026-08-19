var e=`---
summary: "Zeigt den Ablauf des Einbürgerungstests nach § 1 EinbTestV: Zusammenstellung des Fragebogens aus dem zugelassenen Fragenkatalog, die Durchführung unter Aufsicht und die Voraussetzungen für das Bestehen sowie die Ausstellung der Bescheinigung."
---
flowchart TD
    A["Fragebogen aus den 100 zugelassenen<br/>Varianten des Fragenkatalogs<br/>(Anlage 1) erstellt<br/>— <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a>"] --> B["Fragebogen enthält 33 Fragen,<br/>davon 3 landesbezogen für das<br/>Wohnsitz-Bundesland des<br/>Teilnehmers — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II S.1</a>"]

    B --> C["Durchführung unter Aufsicht:<br/>je 4 Antwortmöglichkeiten,<br/>eine davon richtig<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"]

    C --> D{"Mindestens 17 von 33 Fragen<br/>innerhalb von 60 Minuten<br/>richtig beantwortet?<br/>— <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 III</a>"}

    D -->|Nein| E["Einbürgerungstest<br/>nicht bestanden"]
    D -->|Ja| F["Einbürgerungstest bestanden"]

    F --> G["Bescheinigung nach<br/>einheitlichem Vordruck<br/>wird ausgestellt<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.1</a>"]

    G --> H["Bescheinigung gilt bei<br/>Wohnsitzwechsel auch gegenüber<br/>der neu zuständigen Behörde fort<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.2</a>"]

    style E fill:#f8d7da,stroke:#c0392b
    style F fill:#d4edda,stroke:#2d8a4a
    style H fill:#d4edda,stroke:#2d8a4a
`;export{e as default};