var e=`---
summary: "Zeigt die Prüfung der Anspruchsvoraussetzungen für Elterngeld nach dem BEEG, von Wohnsitz und Betreuung des Kindes über die zulässige Erwerbstätigkeit bis zur Einkommensgrenze von 175.000 Euro."
---
flowchart TD
    A["Person möchte Elterngeld beantragen"] --> B{"Wohnsitz oder gewöhnlicher<br/>Aufenthalt in Deutschland?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 Abs. 1 Nr. 1</a>"}
    B -->|Nein| C{"Sonderfall: Auslandstätigkeit<br/>im Sozialversicherungs-,<br/>Entwicklungshilfe- oder<br/>Entsendungsverhältnis? — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1<br/>Abs. 2</a>"}
    C -->|Nein| Z1["Kein Anspruch auf Elterngeld"]
    C -->|Ja| D
    B -->|Ja| D{"Haushaltsgemeinschaft mit dem<br/>Kind sowie eigene Betreuung<br/>und Erziehung? — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 Abs. 1 Nr.<br/>2, 3</a>"}
    D -->|Ja| F
    D -->|Nein| E{"Sonderfall: Adoptionspflege,<br/>Stiefkind oder ungeklärte<br/>Vaterschaft? — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 Abs. 3</a>"}
    E -->|Ja| F
    E -->|Nein| G{"Sonderfall: Verwandte bis 3.<br/>Grades bei schwerer Krankheit,<br/>Schwerbehinderung oder Tod der<br/>Eltern? — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 Abs. 4</a>"}
    G -->|Ja| F
    G -->|Nein| Z1
    F{"Keine oder keine volle<br/>Erwerbstätigkeit (max. 32<br/>Wochenstunden/Monat)? — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1<br/>Abs. 1 Nr. 4</a>, <a href='{{ELI}}#art-z1_abs-z6' target='_blank' rel='noopener'>Abs. 6</a>"}
    F -->|Nein| Z1
    F -->|Ja| H{"Zu versteuerndes Einkommen im<br/>letzten Veranlagungszeitraum<br/>vor der Geburt über 175.000 €<br/>(bzw. Summe beider<br/>Elternteile)? — <a href='{{ELI}}#art-z1_abs-z8' target='_blank' rel='noopener'>§1 Abs. 8</a>"}
    H -->|Ja| Z2["Anspruch entfällt — §1 Abs. 8"]
    H -->|Nein| Z3["Anspruch auf Elterngeld besteht — §1"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};