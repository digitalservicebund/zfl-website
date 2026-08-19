var e=`flowchart TD
    A["Verstoß im Zusammenhang mit<br/>dem Betrieb eines unbemannten<br/>Luftfahrzeugsystems festgestellt"] --> B{"Erfolgte der Verstoß<br/>vorsätzlich oder fahrlässig?<br/>— <a href='{{ELI}}#art-z58_abs-z1' target='_blank' rel='noopener'>§58 Abs. 1</a>"}
    B -->|Nein| Z1["Keine Ordnungswidrigkeit"]
    B -->|Ja| C{"Wurden Registrierungsdaten<br/>nach §66a Abs. 3 S. 1 oder<br/>§66b Abs. 3 S. 1 nicht, nicht<br/>richtig, unvollständig oder<br/>verspätet übermittelt bzw.<br/>ihre Richtigkeit nicht belegt?<br/>— <a href='{{ELI}}#art-z58_abs-z1' target='_blank' rel='noopener'>§58 Abs. 1 Nr. 18</a>"}
    C -->|Ja| D["Ordnungswidrigkeit<br/>— <a href='{{ELI}}#art-z58_abs-z1' target='_blank' rel='noopener'>§58 Abs. 1 Nr. 18</a>"]
    C -->|Nein| E{"Wurde eine Änderung nach<br/>§66a Abs. 3 S. 2 oder §66b<br/>Abs. 3 S. 3 nicht, nicht richtig,<br/>unvollständig oder verspätet<br/>gemeldet?<br/>— <a href='{{ELI}}#art-z58_abs-z1' target='_blank' rel='noopener'>§58 Abs. 1 Nr. 19</a>"}
    E -->|Ja| F["Ordnungswidrigkeit<br/>— <a href='{{ELI}}#art-z58_abs-z1' target='_blank' rel='noopener'>§58 Abs. 1 Nr. 19</a>"]
    E -->|Nein| G{"Liegt ein Verstoß gegen die<br/>Durchführungsverordnung (EU)<br/>2019/947 vor (z.B. Betrieb ohne<br/>Betriebsgenehmigung/Zulassung,<br/>Registrierungsnummer nicht<br/>angebracht, Mindestabstände<br/>oder Meldepflichten missachtet)?<br/>— <a href='{{ELI}}#art-z58_abs-z2' target='_blank' rel='noopener'>§58 Abs. 2</a>"}
    G -->|Ja| H["Ordnungswidrigkeit<br/>— <a href='{{ELI}}#art-z58_abs-z2' target='_blank' rel='noopener'>§58 Abs. 2</a>"]
    G -->|Nein| Z1
    D --> I["Geldbuße bis zu<br/>50 000 Euro möglich<br/>— <a href='{{ELI}}#art-z58_abs-z3' target='_blank' rel='noopener'>§58 Abs. 3</a>"]
    F --> I
    H --> I

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style D fill:#f8d7da,stroke:#c0392b
    style F fill:#f8d7da,stroke:#c0392b
    style H fill:#f8d7da,stroke:#c0392b
    style I fill:#fff3cd,stroke:#c9a227
`;export{e as default};