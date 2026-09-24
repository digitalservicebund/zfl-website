var e=`---
summary: "Erläutert die Ermittlung des wirtschaftlich Berechtigten nach §3 GwG für juristische Personen und Gesellschaften sowie für Stiftungen und Trusts, einschließlich der Regeln zum fiktiven wirtschaftlich Berechtigten, wenn keine natürliche Person ermittelt werden kann."
---
flowchart TD
    A["Vertragspartner ist keine natürliche Person"] --> B{"Rechtsfähige Stiftung oder<br/>treuhänderische<br/>Rechtsgestaltung (z.B. Trust)?<br/>— <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 Abs. 3</a>"}
    B -->|Nein: jur. Person/Gesellschaft| C{"Notiert an organisiertem Markt<br/>mit gleichwertigen<br/>Transparenzanforderungen? — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3<br/>Abs. 2</a>"}
    C -->|Ja| D["Keine Ermittlung nach Abs. 2 erforderlich"]
    C -->|Nein| E{"Natürliche Person hält<br/>mittelbar/unmittelbar &gt;25%<br/>der Kapitalanteile oder<br/>Stimmrechte oder übt<br/>vergleichbare Kontrolle aus?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2 S. 1</a>"}
    E -->|Ja| F["Diese natürliche Person ist<br/>wirtschaftlich Berechtigter"]
    E -->|Nein| G{"Trotz umfassender Prüfungen<br/>kein wirtschaftlich<br/>Berechtigter ermittelbar und<br/>keine Anhaltspunkte nach §43<br/>Abs. 1? — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2 S. 5</a>"}
    G -->|Ja| H["Fiktiver wirtschaftlich Berechtigter:<br/>gesetzlicher Vertreter,<br/>geschäftsführender Gesellschafter oder<br/>Partner des Vertragspartners — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2<br/>S. 5</a>"]
    G -->|Nein| I["Weitere Ermittlungen erforderlich, bevor<br/>Geschäftsbeziehung begründet werden kann"]
    B -->|Ja: Stiftung/Trust| J["Wirtschaftlich Berechtigte sind:<br/>Treugeber/Settlor, Trustee, Protektor,<br/>Vorstandsmitglieder,<br/>bestimmte/bestimmbare Begünstigte sowie<br/>sonstige Personen mit beherrschendem<br/>Einfluss — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 Abs. 3</a>"]

    style F fill:#d4edda,stroke:#2d8a4a
    style D fill:#d4edda,stroke:#2d8a4a
    style J fill:#d4edda,stroke:#2d8a4a
    style H fill:#fff3cd,stroke:#c9a227
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};