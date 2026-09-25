var e=`---
summary: "Ob eine natürliche Person oder Körperschaft aufgrund ihrer Einkommen- oder Körperschaftsteuerpflicht dem Solidaritätszuschlag unterliegt, sofern diese Steuerpflicht nicht bereits vor dem 14. Mai 1991 geendet hat."
---
flowchart TD
    A["Person/Körperschaft prüfen:<br/>Solidaritätszuschlag wird zur<br/>Einkommensteuer und Körperschaftsteuer<br/>erhoben — <a href='{{ELI}}/art-z1' target='_blank' rel='noopener'>§1</a>"] --> B{"Natürliche Person, die nach §1<br/>EStG einkommensteuerpflichtig<br/>ist? — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr. 1</a>"}
    B -->|Ja| D
    B -->|Nein| C{"Körperschaft,<br/>Personenvereinigung oder<br/>Vermögensmasse, die nach §1<br/>oder §2 KStG<br/>körperschaftsteuerpflichtig<br/>ist? — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr. 2</a>"}
    C -->|Nein| Z1["Keine Abgabepflicht zum<br/>Solidaritätszuschlag"]
    C -->|Ja| D{"Hat die jeweilige<br/>Steuerpflicht bereits vor dem<br/>14. Mai 1991 geendet? — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 aE</a>"}
    D -->|Ja| Z1
    D -->|Nein| Z2["Abgabepflichtig zum Solidaritätszuschlag<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};