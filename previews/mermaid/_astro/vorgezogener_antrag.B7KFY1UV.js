var e=`---
summary: "Unter welchen zeitlichen Voraussetzungen und mit welchen Nachweisen ein ungedienter Wehrpflichtiger nach dem KDVG einen vorgezogenen Antrag auf Anerkennung als Kriegsdienstverweigerer vor Vollendung des 18. Lebensjahres stellen kann."
---
flowchart TD
    A{"Ungedienter Wehrpflichtiger<br/>möchte Antrag stellen — wie<br/>viele Monate vor Vollendung<br/>des 18. Lebensjahres?"}
    A -->|"6 Monate oder weniger"| B["Regulärer Antrag möglich, Zustimmung der<br/>gesetzlichen Vertretung nicht<br/>erforderlich — <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 Abs. 4</a>"]
    A -->|"Mehr als 6 Monate, aber ab 6<br/>Monaten vor Vollendung des<br/>17. Lebensjahres"| C{"Antrag auf vorgezogene<br/>Ableistung des Zivildienstes<br/>mit Zustimmung der<br/>gesetzlichen Vertretung<br/>beigefügt? — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 1<br/>Nr. 1</a>"}
    C -->|Ja| D["Vorgezogener Antrag zulässig — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5<br/>S. 1 Nr. 1</a>"]
    C -->|Nein| E{"Alternativ beigefügt: Entwurf<br/>einer Verpflichtung nach §14c<br/>Abs. 1 ZDG,<br/>Zustimmungserklärung der<br/>gesetzlichen Vertretung sowie<br/>Erklärung nach §14c Abs. 3<br/>ZDG? — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 1 Nr. 2</a>"}
    E -->|Ja| D
    E -->|Nein| Z1["Vorgezogener Antrag unzulässig<br/>— regulärer Zeitpunkt (6 Monate vor<br/>Vollendung des 18. Lebensjahres)<br/>maßgeblich — <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 Abs. 4</a>"]
    D --> F["Musterung frühestens 6 Monate vor<br/>Vollendung des 17. Lebensjahres möglich<br/>— <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 2</a>"]
    F --> Z2["Anerkennungsverfahren läuft vorgezogen<br/>weiter"]
    B --> Z3["Reguläres Anerkennungsverfahren"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};