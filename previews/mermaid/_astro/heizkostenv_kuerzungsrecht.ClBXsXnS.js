var e=`flowchart TD
    A["Verhältnis Wohnungseigentümer<br/>zur Gemeinschaft der<br/>Wohnungseigentümer? — §12 IV"] -->|Ja| Z0["Kein Kürzungsrecht nach §12 —<br/>es gelten die allgemeinen<br/>Vorschriften (z.B. Mängelrechte)"]

    A -->|Nein| B["Prüfung der Kürzungsgründe<br/>(unabhängig voneinander,<br/>Ergebnisse summieren sich)"]

    B --> C1{"Kosten entgegen den Vorschriften<br/>NICHT verbrauchsabhängig<br/>abgerechnet? (Verstoß gg. §§6–9)<br/>— §12 I S.1"}
    B --> C2{"Keine fernablesbare Ausstattung<br/>installiert entgegen<br/>§5 II oder III?<br/>— §12 I S.2"}
    B --> C3{"Informationen nach §6a<br/>nicht oder nicht vollständig<br/>mitgeteilt?<br/>— §12 I S.3"}

    C1 -->|Ja| P1["+15%"]
    C1 -->|Nein| N1["+0%"]
    C2 -->|Ja| P2["+3%"]
    C2 -->|Nein| N2["+0%"]
    C3 -->|Ja| P3["+3%"]
    C3 -->|Nein| N3["+0%"]

    P1 --> S["Gesamt-Kürzungsanspruch des Nutzers<br/>= Summe der zutreffenden Sätze<br/>(0% bis max. 21%)"]
    N1 --> S
    P2 --> S
    N2 --> S
    P3 --> S
    N3 --> S

    S --> T["Kürzung wird einseitig bei der<br/>nächsten Abrechnung vom Nutzer<br/>vorgenommen (kein Gerichtsverfahren<br/>erforderlich, aber im Streitfall<br/>überprüfbar)"]

    style Z0 fill:#f5f5f5,stroke:#999
    style P1 fill:#d4edda,stroke:#2d8a4a
    style P2 fill:#d4edda,stroke:#2d8a4a
    style P3 fill:#d4edda,stroke:#2d8a4a
    style N1 fill:#f5f5f5,stroke:#999
    style N2 fill:#f5f5f5,stroke:#999
    style N3 fill:#f5f5f5,stroke:#999
    style S fill:#cfe2f3,stroke:#2b6ea3
    style T fill:#fff3cd,stroke:#c9a227
`;export{e as default};