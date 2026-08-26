var e=`---
summary: "Zeigt, welche Fahrzeugklassen ab wann unter die Verordnung fallen, welche Ausnahmen bestehen und für welche schweren Fahrzeugklassen nur ein Teil der Pflichten gilt."
---
flowchart TD
    START["Fahrzeug oder Altfahrzeug"] --> AUSN{"Fällt das Fahrzeug unter eine Ausnahme?<br/>Kleinserie, Streitkräfte/Rettungsdienste,<br/>historisches/kulturelles Interesse,<br/>Wohnanhänger u.a. — <a href='{{ELI}}#002.002' target='_blank' rel='noopener'>Art. 2 Abs. 2</a>"}

    AUSN -->|Ja| RAUS["Verordnung gilt nicht"]
    AUSN -->|Nein| KLASSE{"Fahrzeugklasse?"}

    KLASSE -->|"M1 / N1, Standard"| D1["Gilt ab Inkrafttreten<br/>— <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1 Buchst. a</a>"]
    KLASSE -->|"M1 / N1, besondere<br/>Zweckbestimmung"| D2["Gilt ab 1.9.2029<br/>— <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1 Buchst. b</a>"]
    KLASSE -->|"M2/M3/N2/N3/O,<br/>Standard"| D3["Gilt ab 1.9.2031<br/>— <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1 Buchst. c</a>"]
    KLASSE -->|"M2/M3/N2/N3/O,<br/>besondere Zweckbestimmung"| D4["Gilt ab 1.9.2031<br/>— <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1 Buchst. d</a>"]
    KLASSE -->|"Klasse L"| D5["Gilt ab 1.9.2031<br/>— <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1 Buchst. e</a>"]

    D1 --> VOLL["Verordnung gilt vollständig"]
    D2 --> VOLL
    D5 --> VOLL

    D3 --> TEIL["Art. 4 (Recyclingfähigkeit), Art. 5<br/>(Stoffanforderungen) und Art. 6<br/>(Mindestrezyklatanteil) gelten für<br/>diese Klassen nicht<br/>— <a href='{{ELI}}#002.003' target='_blank' rel='noopener'>Art. 2 Abs. 3</a>"]
    D4 --> TEIL

    style RAUS fill:#f8d7da,stroke:#c0392b
    style VOLL fill:#d4edda,stroke:#2d8a4a
    style TEIL fill:#fff3cd,stroke:#c9a227
`;export{e as default};