var e=`---
summary: "Stellt das Verdachtsmeldeverfahren nach §43 GwG dar: die Meldung an die Zentralstelle für Finanztransaktionsuntersuchungen (FIU) sowie das daran anknüpfende Durchführungsverbot für Transaktionen nach §46 GwG."
---
flowchart TD
    A["Tatsachen deuten auf Geldwäsche,<br/>Terrorismusfinanzierung oder fehlende<br/>Offenlegung nach §11 Abs. 6 S. 3 hin<br/>— <a href='{{ELI}}#art-z43_abs-z1' target='_blank' rel='noopener'>§43 Abs. 1</a>"] --> B{"Verpflichteter nach §2 Abs. 1 Nr. 10/12<br/>(Rechtsanwalt/Steuerberater) und Information<br/>aus Rechtsberatung/Prozessvertretung?<br/>— <a href='{{ELI}}#art-z43_abs-z2' target='_blank' rel='noopener'>§43 Abs. 2</a>"}
    B -->|"Ja, kein<br/>Missbrauch bekannt"| C["Keine Meldepflicht"]
    B -->|"Nein oder<br/>Missbrauch bekannt"| D["Unverzügliche Meldung an die Zentralstelle<br/>für Finanztransaktionsuntersuchungen (FIU)<br/>— <a href='{{ELI}}#art-z43_abs-z1' target='_blank' rel='noopener'>§43 Abs. 1</a>"]
    D --> E{"Betrifft die Meldung eine Transaktion?<br/>— <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 Abs. 1</a>"}
    E -->|Nein| F["Kein Durchführungsverbot"]
    E -->|Ja| G{"Ist ein Aufschub der Transaktion möglich,<br/>ohne die Verfolgung einer mutmaßlichen<br/>Straftat zu behindern?<br/>— <a href='{{ELI}}#art-z46_abs-z2' target='_blank' rel='noopener'>§46 Abs. 2</a>"}
    G -->|Nein| H["Transaktion darf sofort durchgeführt werden;<br/>Meldung ist unverzüglich nachzuholen<br/>— <a href='{{ELI}}#art-z46_abs-z2' target='_blank' rel='noopener'>§46 Abs. 2</a>"]
    G -->|Ja| I{"Zustimmung von FIU oder Staatsanwaltschaft<br/>erteilt, oder 3. Werktag nach Abgang der<br/>Meldung verstrichen ohne Untersagung?<br/>— <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 Abs. 1</a>"}
    I -->|"Ja"| K["Transaktion darf durchgeführt werden"]
    I -->|"Nein: untersagt"| J["Transaktion darf nicht durchgeführt werden"]

    style C fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style H fill:#fff3cd,stroke:#c9a227
    style K fill:#d4edda,stroke:#2d8a4a
    style J fill:#f8d7da,stroke:#c0392b
`;export{e as default};