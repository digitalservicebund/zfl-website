var e=`flowchart TD
    A["Geschäftsbeziehung wird begründet<br/>oder Transaktion vorgenommen"] --> B{"Auslösetatbestand erfüllt?<br/>Begründung einer Geschäftsbeziehung, Schwellenwert überschritten,<br/>Verdachtsmomente oder Zweifel an Identität<br/>— <a href='{{ELI}}/art-z10' target='_blank' rel='noopener'>§10 Abs. 3</a>"}
    B -->|Nein| Z1["Keine allgemeinen Sorgfaltspflichten ausgelöst"]
    B -->|Ja| C["Identifizierung des Vertragspartners &amp; ggf. für ihn auftretender Person<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1 Nr. 1</a>, <a href='{{ELI}}#art-z11_abs-z4' target='_blank' rel='noopener'>§11 Abs. 4</a>, <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 Abs. 1</a>"]
    C --> D{"Handelt der Vertragspartner für einen<br/>wirtschaftlich Berechtigten?<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1 Nr. 2</a>"}
    D -->|Ja| E["Identifizierung des wirtschaftlich Berechtigten<br/>— <a href='{{ELI}}#art-z11_abs-z5' target='_blank' rel='noopener'>§11 Abs. 5</a>, <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs. 3</a>"]
    D -->|Nein| F
    E --> F["Zweck &amp; angestrebte Art der Geschäftsbeziehung<br/>einholen und bewerten<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1 Nr. 3</a>"]
    F --> G{"Vertragspartner oder wirtschaftlich Berechtigter<br/>politisch exponierte Person (PEP), Familienmitglied<br/>oder nahestehende Person?<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1 Nr. 4</a>"}
    G -->|Ja| H["Zusätzlich verstärkte Sorgfaltspflichten anwenden<br/>— <a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15</a>"]
    G -->|Nein| I
    H --> I["Kontinuierliche Überwachung der Geschäftsbeziehung<br/>&amp; ihrer Transaktionen, Aktualisierung der Angaben<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1 Nr. 5</a>"]
    I --> J{"Konnten die Sorgfaltspflichten nach Nr. 1 bis 4<br/>vollständig erfüllt werden?<br/>— <a href='{{ELI}}#art-z10_abs-z9' target='_blank' rel='noopener'>§10 Abs. 9</a>"}
    J -->|Ja| N["Geschäftsbeziehung/Transaktion<br/>kann durchgeführt werden"]
    J -->|Nein| K{"Rechtsanwalt/Notar/Steuerberater<br/>(§2 Abs. 1 Nr. 10/12) bei reiner Rechtsberatung<br/>oder Prozessvertretung ohne Missbrauchskenntnis?"}
    K -->|Ja| L["Ausnahme: Geschäftsbeziehung/Transaktion<br/>dennoch möglich<br/>— <a href='{{ELI}}#art-z10_abs-z9' target='_blank' rel='noopener'>§10 Abs. 9 S. 3</a>"]
    K -->|Nein| M["Geschäftsbeziehung nicht begründen/fortsetzen,<br/>Transaktion nicht durchführen,<br/>bestehende Geschäftsbeziehung kündigen<br/>— <a href='{{ELI}}#art-z10_abs-z9' target='_blank' rel='noopener'>§10 Abs. 9 S. 1-2</a>"]

    style N fill:#d4edda,stroke:#2d8a4a
    style L fill:#d4edda,stroke:#2d8a4a
    style Z1 fill:#d4edda,stroke:#2d8a4a
    style H fill:#fff3cd,stroke:#c9a227
    style M fill:#f8d7da,stroke:#c0392b
`;export{e as default};