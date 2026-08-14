var e=`flowchart TD
    Start["Besitz von Cannabis (Blüten/Blätter/<br/>Pflanzenmaterial, Trockengewicht)<br/>oder lebenden Cannabispflanzen"] --> ORT{"Besitzort?"}

    ORT -->|"Andernorts (nicht Wohnsitz/<br/>gewöhnlicher Aufenthalt)"| A1{"Menge getrocknetes<br/>Cannabis?"}
    ORT -->|"Am Wohnsitz oder<br/>gewöhnlichen Aufenthalt"| B1{"Menge getrocknetes<br/>Cannabis?"}

    A1 -->|"≤ 25 g"| LEGAL_A["Erlaubter Besitz<br/>— §3 Abs.1"]
    A1 -->|"> 25 g bis 30 g"| OWI_A["Ordnungswidrigkeit,<br/>Bußgeld bis 30.000 €<br/>— §36 Abs.1 Nr.1a, Abs.2"]
    A1 -->|"> 30 g"| STRAF_A["Straftat: Freiheitsstrafe<br/>bis 3 Jahre oder Geldstrafe<br/>— §34 Abs.1 Nr.1a"]

    B1 -->|"≤ 50 g"| B2{"Zahl lebender<br/>Cannabispflanzen?"}
    B1 -->|"> 50 g bis 60 g"| OWI_B["Ordnungswidrigkeit,<br/>Bußgeld bis 30.000 €<br/>— §36 Abs.1 Nr.1b, Abs.2"]
    B1 -->|"> 60 g"| STRAF_B["Straftat: Freiheitsstrafe<br/>bis 3 Jahre oder Geldstrafe<br/>— §34 Abs.1 Nr.1b"]

    B2 -->|"≤ 3 Pflanzen"| LEGAL_B["Erlaubter Besitz<br/>— §3 Abs.2 Nr.1 u. 2<br/><br/>Hinweis: In Summe mit Besitz<br/>nach Abs.1 max. 50 g<br/>— §3 Abs.2 S.2"]
    B2 -->|"> 3 Pflanzen"| STRAF_C["Straftat: Freiheitsstrafe<br/>bis 3 Jahre oder Geldstrafe<br/>— §34 Abs.1 Nr.1c"]

    style LEGAL_A fill:#d4edda,stroke:#2d8a4a
    style LEGAL_B fill:#d4edda,stroke:#2d8a4a
    style OWI_A fill:#fff3cd,stroke:#c9a227
    style OWI_B fill:#fff3cd,stroke:#c9a227
    style STRAF_A fill:#f8d7da,stroke:#c0392b
    style STRAF_B fill:#f8d7da,stroke:#c0392b
    style STRAF_C fill:#f8d7da,stroke:#c0392b
`;export{e as default};