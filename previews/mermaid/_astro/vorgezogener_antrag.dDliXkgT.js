var e=`---
summary: "Zeigt, unter welchen zeitlichen Voraussetzungen und mit welchen Nachweisen ein ungedienter Wehrpflichtiger nach dem KDVG einen vorgezogenen Antrag auf Anerkennung als Kriegsdienstverweigerer vor Vollendung des 18. Lebensjahres stellen kann."
---
flowchart TD
    A{"Ungedienter Wehrpflichtiger<br/>möchte Antrag stellen —<br/>wie viele Monate vor<br/>Vollendung des 18. Lebensjahres?"}
    A -->|"6 Monate oder<br/>weniger"| B["Regulärer Antrag möglich,<br/>Zustimmung der gesetzlichen<br/>Vertretung nicht erforderlich<br/>— <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 Abs. 4</a>"]
    A -->|"Mehr als 6 Monate,<br/>aber ab 6 Monaten vor<br/>Vollendung des<br/>17. Lebensjahres"| C{"Antrag auf vorgezogene<br/>Ableistung des Zivildienstes<br/>mit Zustimmung der<br/>gesetzlichen Vertretung<br/>beigefügt?<br/>— <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 1 Nr. 1</a>"}
    C -->|Ja| D["Vorgezogener Antrag<br/>zulässig<br/>— <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 1 Nr. 1</a>"]
    C -->|Nein| E{"Alternativ beigefügt: Entwurf<br/>einer Verpflichtung nach §14c<br/>Abs. 1 ZDG, Zustimmungs-<br/>erklärung der gesetzlichen<br/>Vertretung sowie Erklärung<br/>nach §14c Abs. 3 ZDG?<br/>— <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 1 Nr. 2</a>"}
    E -->|Ja| D
    E -->|Nein| Z1["Vorgezogener Antrag<br/>unzulässig — regulärer<br/>Zeitpunkt (6 Monate vor<br/>Vollendung des 18. Lebens-<br/>jahres) maßgeblich<br/>— <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 Abs. 4</a>"]
    D --> F["Musterung frühestens<br/>6 Monate vor Vollendung<br/>des 17. Lebensjahres möglich<br/>— <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 Abs. 5 S. 2</a>"]
    F --> Z2["Anerkennungsverfahren läuft<br/>vorgezogen weiter"]
    B --> Z3["Reguläres<br/>Anerkennungsverfahren"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};