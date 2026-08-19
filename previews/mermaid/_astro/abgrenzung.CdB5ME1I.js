var e=`---
summary: "Zeigt, wie eine Kostenart nach der Betriebskostenverordnung von nicht umlagefähigen Verwaltungs- und Instandhaltungskosten abzugrenzen und dem Betriebskostenkatalog des §2 zuzuordnen ist, um als auf den Mieter umlagefähige Betriebskosten zu gelten."
---
flowchart TD
    A["Kostenart entsteht dem Eigentümer/<br/>Erbbauberechtigten durch Eigentum<br/>bzw. bestimmungsmäßigen Gebrauch<br/>des Grundstücks/Gebäudes — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.1</a>"] --> B{"Entsteht die Kostenart<br/>laufend (wiederkehrend)?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.1</a>"}

    B -->|Nein, nur einmalig| Z1["Keine Betriebskosten<br/>(z.B. einmalige Anschaffung)"]
    B -->|Ja| C{"Verwaltungskosten?<br/>Personal/Einrichtungen der<br/>Verwaltung, Aufsicht,<br/>Jahresabschlussprüfung,<br/>Geschäftsführung — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II Nr.1</a>"}

    C -->|Ja| Z2["Keine Betriebskosten,<br/>nicht umlagefähig — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II Nr.1</a>"]
    C -->|Nein| D{"Instandhaltungs-/<br/>Instandsetzungskosten?<br/>Beseitigung von Abnutzungs-,<br/>Alterungs- oder Witterungs-<br/>schäden — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II Nr.2</a>"}

    D -->|Ja| Z3["Keine Betriebskosten,<br/>nicht umlagefähig — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II Nr.2</a>"]
    D -->|Nein| E{"Kostenart in einer der<br/>17 Positionen des Katalogs<br/>erfasst? — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr.1-17</a>"}

    E -->|Nein, aber vergleichbar<br/>laufende Kostenart| F["Sonstige Betriebskosten<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr.17</a>"]
    E -->|Ja, konkrete<br/>Position einschlägig| G["Umlagefähige Betriebskosten<br/>gem. konkreter Nr. 1-16 — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"]

    F --> H{"Sach- oder Arbeitsleistung<br/>durch Eigentümer/Erbbau-<br/>berechtigten selbst erbracht?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2, 3</a>"}
    G --> H

    H -->|Ja| I["Ansatz wie Drittleistung<br/>(ohne Umsatzsteuer des Dritten)<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2, 3</a>"]
    H -->|Nein| J["Ansatz der tatsächlichen<br/>Kosten des Dritten"]

    I --> Z4["Umlagefähige Betriebskosten"]
    J --> Z4["Umlagefähige Betriebskosten"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};