var e=`---
summary: "Die Berechnung der Elterngeldhöhe nach dem BEEG anhand der Ersatzrate des vorgeburtlichen Einkommens sowie die Anrechnung von Mutterschaftsleistungen und anderem Erwerbsersatzeinkommen auf das Elterngeld."
---
flowchart TD
    A["Ermittlung von Anspruch und Höhe des<br/>Elterngeldes"] --> B{"Zu versteuerndes Einkommen im<br/>Vorjahr über 175.000 € (bzw.<br/>Summe beider Elternteile)?<br/>— <a href='{{ELI}}#art-z1_abs-z8' target='_blank' rel='noopener'>§1 Abs. 8</a>"}
    B -->|Ja| Z1["Anspruch entfällt vollständig — §1 Abs.<br/>8"]
    B -->|Nein| C{"Einkommen aus Erwerbstätigkeit<br/>vor der Geburt unter 1.000 €?<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 1</a>"}
    C -->|Ja| D["Ersatzrate steigt von 67 % um 0,1<br/>Prozentpunkte je 2 € Unterschreitung,<br/>bis max. 100 % — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 1</a>"]
    C -->|Nein| E{"Einkommen vor der Geburt über<br/>1.200 €? — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 2</a>"}
    E -->|Ja| F["Ersatzrate sinkt von 67 % um 0,1<br/>Prozentpunkte je 2 € Überschreitung, bis<br/>min. 65 % — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 2</a>"]
    E -->|Nein| G["Ersatzrate bleibt bei 67 % — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1</a>"]

    D --> H
    F --> H
    G --> H
    H["Elterngeld = Ersatzrate x Einkommen aus<br/>Erwerbstätigkeit vor der Geburt (ggf.<br/>Unterschiedsbetrag zum Einkommen<br/>danach), mindestens 300 € — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1</a>,<br/><a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>Abs. 3</a>, <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>Abs. 4</a>"]

    H --> I{"Bezug von<br/>Mutterschaftsleistungen,<br/>vergleichbaren<br/>Auslandsleistungen oder<br/>sonstigem<br/>Erwerbsersatzeinkommen? — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3<br/>Abs. 1</a>"}
    I -->|Nein| J["Elterngeld wird in ermittelter Höhe<br/>ungekürzt ausgezahlt"]
    I -->|Ja| K{"Übersteigen diese Einnahmen<br/>den Anrechnungsfreibetrag von<br/>300 € (je weiterem<br/>Mehrlingskind +300 €)? — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3<br/>Abs. 2</a>"}
    K -->|Nein| J
    K -->|Ja| L["Übersteigender Betrag wird auf das<br/>Elterngeld angerechnet — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 Abs. 1</a>,<br/><a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>Abs. 2</a>"]

    J --> Z2["Elterngeld wird ausgezahlt"]
    L --> Z2

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};