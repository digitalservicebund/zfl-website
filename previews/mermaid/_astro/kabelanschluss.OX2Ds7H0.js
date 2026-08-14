var e=`flowchart TD
    A{"Anlage (Antenne/<br/>Verteilanlage) ab dem<br/>1. Dezember 2021<br/>errichtet? — §2 Nr.15 S.2"} -->|Ja| Z1["§2 Nr.15 Buchst. a und b<br/>nicht anwendbar —<br/>Betriebsstrom/Nutzungsentgelt<br/>für Antenne/Breitband<br/>nicht umlagefähig — §2 Nr.15 S.2"]

    A -->|Nein, Bestandsanlage| B{"Um welche Art<br/>der Anlage handelt<br/>es sich?"}

    B -->|"Gemeinschafts-<br/>Antennenanlage"| C["Betriebsstrom + Prüfung/<br/>Einstellung durch Fachkraft<br/>— §2 Nr.15 Buchst. a"]
    B -->|"Private, mit Breitband-<br/>netz verbundene<br/>Verteilanlage"| D["Betriebsstrom +<br/>laufende monatliche<br/>Grundgebühren — §2 Nr.15 Buchst. b"]
    B -->|"Gebäudeinterne Verteil-<br/>anlage, vollständig per<br/>Glasfaser an Netz mit<br/>sehr hoher Kapazität<br/>angebunden UND freie<br/>Anbieterwahl möglich"| G["Betriebsstrom + Bereit-<br/>stellungsentgelt gem.<br/>§72 I TKG — §2 Nr.15 Buchst. c<br/>(zeitlich unbefristet)"]

    C --> E{"Vor dem<br/>30. Juni 2024?<br/>— §2 Nr.15 Buchst. a"}
    D --> F{"Vor dem<br/>30. Juni 2024?<br/>— §2 Nr.15 Buchst. b"}

    E -->|Ja| Z2["Zusätzlich umlagefähig:<br/>Nutzungsentgelt für<br/>anlagenfremde Antenne +<br/>Urheberrechts-Gebühren<br/>für Kabelweitersendung"]
    E -->|Nein| Z3["Nur Betriebsstrom<br/>und Prüfungskosten<br/>umlagefähig"]

    F -->|Ja| Z4["Zusätzlich umlagefähig:<br/>weitere Kosten entspr.<br/>Buchst. a"]
    F -->|Nein| Z5["Nur Betriebsstrom und<br/>Grundgebühren<br/>umlagefähig"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#fff3cd,stroke:#c9a227
    style Z5 fill:#d4edda,stroke:#2d8a4a
    style G fill:#d4edda,stroke:#2d8a4a
`;export{e as default};