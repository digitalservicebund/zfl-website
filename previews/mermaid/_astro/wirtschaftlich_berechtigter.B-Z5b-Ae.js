var e=`flowchart TD
    A["Vertragspartner ist keine natürliche Person"] --> B{"Rechtsfähige Stiftung oder treuhänderische<br/>Rechtsgestaltung (z.B. Trust)?<br/>— <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 Abs. 3</a>"}
    B -->|Nein: jur. Person/Gesellschaft| C{"Notiert an organisiertem Markt mit<br/>gleichwertigen Transparenzanforderungen?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2</a>"}
    C -->|Ja| D["Keine Ermittlung nach Abs. 2 erforderlich"]
    C -->|Nein| E{"Natürliche Person hält mittelbar/unmittelbar<br/>&gt;25% der Kapitalanteile oder Stimmrechte<br/>oder übt vergleichbare Kontrolle aus?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2 S. 1</a>"}
    E -->|Ja| F["Diese natürliche Person ist<br/>wirtschaftlich Berechtigter"]
    E -->|Nein| G{"Trotz umfassender Prüfungen kein<br/>wirtschaftlich Berechtigter ermittelbar<br/>und keine Anhaltspunkte nach §43 Abs. 1?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2 S. 5</a>"}
    G -->|Ja| H["Fiktiver wirtschaftlich Berechtigter:<br/>gesetzlicher Vertreter, geschäftsführender<br/>Gesellschafter oder Partner des Vertragspartners<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2 S. 5</a>"]
    G -->|Nein| I["Weitere Ermittlungen erforderlich,<br/>bevor Geschäftsbeziehung begründet werden kann"]
    B -->|Ja: Stiftung/Trust| J["Wirtschaftlich Berechtigte sind:<br/>Treugeber/Settlor, Trustee, Protektor,<br/>Vorstandsmitglieder, bestimmte/bestimmbare Begünstigte<br/>sowie sonstige Personen mit beherrschendem Einfluss<br/>— <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 Abs. 3</a>"]

    style F fill:#d4edda,stroke:#2d8a4a
    style D fill:#d4edda,stroke:#2d8a4a
    style J fill:#d4edda,stroke:#2d8a4a
    style H fill:#fff3cd,stroke:#c9a227
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};