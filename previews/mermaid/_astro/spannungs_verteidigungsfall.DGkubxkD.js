var e=`---
summary: "Zeigt, welche verkürzten Fristen und Sonderregeln im Anerkennungsverfahren nach dem KDVG gelten, wenn ein Spannungs- oder Verteidigungsfall nach dem Grundgesetz vorliegt oder eine Wehrübung angeordnet wurde."
---
flowchart TD
    A{"Liegt ein Spannungsfall<br/>(Art. 80a GG) oder ein<br/>Verteidigungsfall (Art. 115a GG)<br/>vor?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 Abs. 1</a>"}
    A -->|Nein| Z0["Reguläres Antrags- und<br/>Widerspruchsverfahren gilt<br/>(§§2 bis 10)"]
    A -->|Ja| B["Einberufungssperre bis zur<br/>unanfechtbaren Entscheidung<br/>wird nicht angewendet<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 Abs. 1 Nr. 1</a> i.V.m.<br/><a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2 S. 1</a>"]
    B --> C["Frist zur schriftlichen<br/>Anhörung kann auf 2 Wochen<br/>verkürzt werden (statt<br/>1 Monat)<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 Abs. 1 Nr. 2</a> i.V.m.<br/><a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 1</a>"]
    C --> D["Widerspruch gegen eine<br/>Entscheidung des Bundesamtes<br/>ist innerhalb einer Woche<br/>nach Bekanntgabe zu erheben<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 Abs. 1 Nr. 3</a>"]
    D --> E{"Handelt es sich um eine<br/>von der Bundesregierung<br/>angeordnete Wehrübung/Übung<br/>als Bereitschaftsdienst?<br/>— <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 Abs. 2</a>"}
    E -->|Ja| F["Absatz 1 (verkürzte Fristen)<br/>gilt entsprechend<br/>— <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 Abs. 2</a>"]
    E -->|Nein| Z1["Reguläre Fristen<br/>bleiben maßgeblich"]
    F --> Z2["Verkürztes Verfahren nach<br/><a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 Abs. 1</a> anwendbar"]

    style Z0 fill:#fff3cd,stroke:#c9a227
    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};