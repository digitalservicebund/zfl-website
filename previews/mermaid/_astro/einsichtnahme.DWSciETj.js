var e=`flowchart TD
    START["Nutzer möchte auf das<br/>Unternehmensregister zugreifen<br/>— <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I S.1</a>"] --> Q1{"Zugriff auf unmittelbar zugänglich<br/>gemachte Daten (§8b III S.1 HGB)<br/>oder auf Bekanntmachungen<br/>(§8b II Nr.11, 12 HGB)?"}

    Q1 -->|Ja| FREI["Keine vorherige Registrierung<br/>erforderlich<br/>— <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I S.2</a>"]
    FREI --> SUCHE["Suche nach allen eingestellten<br/>Daten sowie über Indexdaten<br/>möglich<br/>— <a href='{{ELI}}#art-z14_abs-z' target='_blank' rel='noopener'>§14</a>"]
    SUCHE --> KOPIE["Ausdruck oder elektronische Kopie<br/>möglich, gekennzeichnet mit<br/>„Auszug aus dem Unternehmensregister“<br/>und Erstellungsdatum<br/>— <a href='{{ELI}}#art-z13_abs-z3' target='_blank' rel='noopener'>§13 III</a>"]

    Q1 -->|Nein| Q2{"Zugriff auf Originaldaten der<br/>Register-/Insolvenzeintragungen<br/>über Suchergebnisse?<br/>(§8b II Nr.1-3, 11, 12 HGB)<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II S.1</a>"}

    Q2 -->|Ja| ORIG["Zugang über die Landesjustiz-<br/>verwaltungen; einheitliche<br/>Darstellung mit Hinweis auf<br/>Originalbestand der Register<br/>— <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II S.2-3</a>"]

    Q2 -->|Nein| Q3{"Antrag auf Übermittlung einer<br/>Kopie lediglich dauerhaft<br/>hinterlegter Unterlagen?<br/>— <a href='{{ELI}}#art-z13_abs-z4' target='_blank' rel='noopener'>§13 IV S.1</a>"}

    Q3 -->|Ja| REG["Vorherige Registrierung erforderlich<br/>— <a href='{{ELI}}#art-z13_abs-z4' target='_blank' rel='noopener'>§13 IV S.1</a>"]
    REG --> UEBERM["Elektronische Übermittlung,<br/>gekennzeichnet mit „Auszug aus<br/>dem Unternehmensregister“ und<br/>Hinterlegungsdatum<br/>— <a href='{{ELI}}#art-z13_abs-z4' target='_blank' rel='noopener'>§13 IV S.2-3</a>"]

    Q3 -->|Nein| SONST["Kein gesonderter Zugriffsweg<br/>nach dieser Verordnung"]

    style KOPIE fill:#d4edda,stroke:#2d8a4a
    style ORIG fill:#d4edda,stroke:#2d8a4a
    style UEBERM fill:#d4edda,stroke:#2d8a4a
    style SONST fill:#f8d7da,stroke:#c0392b
`;export{e as default};