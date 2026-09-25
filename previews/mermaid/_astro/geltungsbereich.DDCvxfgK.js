var e=`---
summary: "Die Prüfung des Anwendungsbereichs der Heizkostenverordnung nach §§1 und 2 sowie der Ausnahmetatbestände nach §11, die eine verbrauchsabhängige Kostenerfassung entbehrlich machen."
---
flowchart TD
    A["Gebäude mit zentraler Heizungs- und/oder<br/>Warmwasseranlage oder<br/>Wärme-/Warmwasserlieferung? — <a href='{{ELI}}/art-z1' target='_blank' rel='noopener'>§1</a>"] -->|Nein| Z1["HeizkostenV nicht anwendbar"]
    A -->|Ja| B{"Nur 2 Wohnungen, eine davon<br/>vom Vermieter selbst bewohnt?<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"}

    B -->|Ja| Z2["Vertragliche Regelungen gehen vor (kein<br/>Vorrang der VO)"]
    B -->|Nein| C["Ausnahmetatbestand nach <a href='{{ELI}}/art-z11' target='_blank' rel='noopener'>§11</a> einschlägig?"]

    C --> D1{"Heizwärmebedarf < 15<br/>kWh/(m²·a)? <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.1a</a>"}
    C --> D2{"Erfassung nur mit<br/>unverhältnismäßig hohen Kosten<br/>möglich (Amortisation > 10<br/>J.)? <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.1b</a>"}
    C --> D3{"Bezugsfertig vor 1.7.1981 UND<br/>Nutzer kann Verbrauch nicht<br/>beeinflussen? <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.1c</a>"}
    C --> D4{"Alten-/Pflegeheim,<br/>Studenten-/Lehrlingsheim o.ä.<br/>Sonderwohnform? <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.2</a>"}
    C --> D5{"Gebäude überwiegend versorgt<br/>durch Wärmerückgewinnung oder<br/>Solaranlage? <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.3a</a>"}
    C --> D6{"Gebäude überwiegend versorgt<br/>durch KWK/Abwärme UND<br/>Wärmeverbrauch nicht erfasst?<br/><a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.3b</a>"}
    C --> D7{"Befreiung im Einzelfall durch<br/>Landesbehörde (unbillige<br/>Härte)? <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.5</a>"}

    D1 -->|Ja| Z3["Keine Pflicht zur Verbrauchserfassung &<br/>verbrauchsabh. Kostenverteilung"]
    D2 -->|Ja| Z3
    D3 -->|Ja| Z3
    D4 -->|Ja| Z3
    D5 -->|Ja| Z3
    D6 -->|Ja| Z3
    D7 -->|Ja| Z3

    D1 -->|Nein| E
    D2 -->|Nein| E
    D3 -->|Nein| E
    D4 -->|Nein| E
    D5 -->|Nein| E
    D6 -->|Nein| E
    D7 -->|Nein| E

    E["HeizkostenV gilt vollständig:<br/>Verbrauchserfassung (<a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>/<a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>) +<br/>verbrauchsabhängige Kostenverteilung<br/>(§6–§9)"]

    style Z1 fill:#f5f5f5,stroke:#999
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#f5f5f5,stroke:#999
    style E fill:#d4edda,stroke:#2d8a4a
`;export{e as default};