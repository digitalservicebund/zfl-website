var e=`---
summary: "Zeigt die Fristen für die Aktualisierung der von den Landesjustizverwaltungen an das Unternehmensregister übermittelten Indexdaten nach § 5 URV, die je nach Art der Eintragung unverzüglich oder täglich erfolgen muss."
---
flowchart TD
    START["Landesjustizverwaltung übermittelt<br/>Daten an das Unternehmensregister<br/>im Wege der Datenfernübertragung<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4</a>"] --> VERB["Übermittlung über eine nach dem<br/>Stand der Technik gesicherte,<br/>vereinbarte Verbindung, in einem<br/>vereinbarten strukturierten Format<br/>— <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 I-II</a>"]

    VERB --> Q1{"Um welche Art von<br/>Indexdaten handelt es sich?"}

    Q1 -->|"Eintragungen im Handels-,<br/>Genossenschafts-, Gesellschafts-<br/>oder Partnerschaftsregister<br/>— §6"| SOFORT["Unverzügliche Übermittlung<br/>der Änderungen<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.1</a>"]

    Q1 -->|"Registerbekanntmachungen<br/>— §7"| TAEGLICH1["Tägliche Aktualisierung<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.2</a>"]

    Q1 -->|"Insolvenzbekanntmachungen<br/>— §8"| TAEGLICH2["Tägliche Aktualisierung<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.2</a>"]

    SOFORT --> Q2{"Häufigere Aktualisierung oder<br/>vollständige Neuübermittlung in<br/>Absprache mit der registerführenden<br/>Stelle möglich, ohne dass der<br/>Betrieb beeinträchtigt wird?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.3</a>"}
    TAEGLICH1 --> Q2
    TAEGLICH2 --> Q2

    Q2 -->|Ja| HAEUF["Häufigere Aktualisierung bzw.<br/>vollständige Neuübermittlung<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.3</a>"]
    Q2 -->|Nein| ENDE["Reguläre Aktualisierungsfrist<br/>bleibt maßgeblich"]

    HAEUF --> ENDE

    style SOFORT fill:#fff3cd,stroke:#c9a227
    style TAEGLICH1 fill:#fff3cd,stroke:#c9a227
    style TAEGLICH2 fill:#fff3cd,stroke:#c9a227
    style ENDE fill:#d4edda,stroke:#2d8a4a
`;export{e as default};