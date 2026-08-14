var e=`flowchart TD
    A["Kostenart entsteht dem Eigentümer/<br/>Erbbauberechtigten durch Eigentum<br/>bzw. bestimmungsmäßigen Gebrauch<br/>des Grundstücks/Gebäudes — §1 I S.1"] --> B{"Entsteht die Kostenart<br/>laufend (wiederkehrend)?<br/>— §1 I S.1"}

    B -->|Nein, nur einmalig| Z1["Keine Betriebskosten<br/>(z.B. einmalige Anschaffung)"]
    B -->|Ja| C{"Verwaltungskosten?<br/>Personal/Einrichtungen der<br/>Verwaltung, Aufsicht,<br/>Jahresabschlussprüfung,<br/>Geschäftsführung — §1 II Nr.1"}

    C -->|Ja| Z2["Keine Betriebskosten,<br/>nicht umlagefähig — §1 II Nr.1"]
    C -->|Nein| D{"Instandhaltungs-/<br/>Instandsetzungskosten?<br/>Beseitigung von Abnutzungs-,<br/>Alterungs- oder Witterungs-<br/>schäden — §1 II Nr.2"}

    D -->|Ja| Z3["Keine Betriebskosten,<br/>nicht umlagefähig — §1 II Nr.2"]
    D -->|Nein| E{"Kostenart in einer der<br/>17 Positionen des Katalogs<br/>erfasst? — §2 Nr.1-17"}

    E -->|Nein, aber vergleichbar<br/>laufende Kostenart| F["Sonstige Betriebskosten<br/>— §2 Nr.17"]
    E -->|Ja, konkrete<br/>Position einschlägig| G["Umlagefähige Betriebskosten<br/>gem. konkreter Nr. 1-16 — §2"]

    F --> H{"Sach- oder Arbeitsleistung<br/>durch Eigentümer/Erbbau-<br/>berechtigten selbst erbracht?<br/>— §1 I S.2, 3"}
    G --> H

    H -->|Ja| I["Ansatz wie Drittleistung<br/>(ohne Umsatzsteuer des Dritten)<br/>— §1 I S.2, 3"]
    H -->|Nein| J["Ansatz der tatsächlichen<br/>Kosten des Dritten"]

    I --> Z4["Umlagefähige Betriebskosten"]
    J --> Z4["Umlagefähige Betriebskosten"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};