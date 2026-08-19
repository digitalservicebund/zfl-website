var e=`---
summary: "Zeigt die Berechnung der Elterngeldhöhe nach dem BEEG anhand der Ersatzrate des vorgeburtlichen Einkommens sowie die Anrechnung von Mutterschaftsleistungen und anderem Erwerbsersatzeinkommen auf das Elterngeld."
---
flowchart TD
    A["Ermittlung von Anspruch<br/>und Höhe des Elterngeldes"] --> B{"Zu versteuerndes Einkommen im<br/>Vorjahr über 175.000 € (bzw.<br/>Summe beider Elternteile)?<br/>— <a href='{{ELI}}#art-z1_abs-z8' target='_blank' rel='noopener'>§1 Abs. 8</a>"}
    B -->|Ja| Z1["Anspruch entfällt<br/>vollständig<br/>— §1 Abs. 8"]
    B -->|Nein| C{"Einkommen aus Erwerbstätigkeit<br/>vor der Geburt unter 1.000 €?<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 1</a>"}
    C -->|Ja| D["Ersatzrate steigt von 67 % um<br/>0,1 Prozentpunkte je 2 €<br/>Unterschreitung, bis max. 100 %<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 1</a>"]
    C -->|Nein| E{"Einkommen vor der Geburt<br/>über 1.200 €?<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 2</a>"}
    E -->|Ja| F["Ersatzrate sinkt von 67 % um<br/>0,1 Prozentpunkte je 2 €<br/>Überschreitung, bis min. 65 %<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2 S. 2</a>"]
    E -->|Nein| G["Ersatzrate bleibt bei 67 %<br/>— <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1</a>"]

    D --> H
    F --> H
    G --> H
    H["Elterngeld = Ersatzrate x<br/>Einkommen aus Erwerbstätigkeit<br/>vor der Geburt (ggf. Unterschieds-<br/>betrag zum Einkommen danach),<br/>mindestens 300 €<br/>— <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 Abs. 1</a>, <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>Abs. 3</a>, <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>Abs. 4</a>"]

    H --> I{"Bezug von Mutterschafts-<br/>leistungen, vergleichbaren<br/>Auslandsleistungen oder sonstigem<br/>Erwerbsersatzeinkommen?<br/>— <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 Abs. 1</a>"}
    I -->|Nein| J["Elterngeld wird in<br/>ermittelter Höhe<br/>ungekürzt ausgezahlt"]
    I -->|Ja| K{"Übersteigen diese Einnahmen<br/>den Anrechnungsfreibetrag von<br/>300 € (je weiterem Mehrlingskind<br/>+300 €)?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2</a>"}
    K -->|Nein| J
    K -->|Ja| L["Übersteigender Betrag wird<br/>auf das Elterngeld angerechnet<br/>— <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 Abs. 1</a>, <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>Abs. 2</a>"]

    J --> Z2["Elterngeld wird ausgezahlt"]
    L --> Z2

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};