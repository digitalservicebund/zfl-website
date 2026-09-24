var e=`---
summary: "Zeigt die Fristen für die Aktualisierung der von den Landesjustizverwaltungen an das Unternehmensregister übermittelten Indexdaten nach § 5 URV, die je nach Art der Eintragung unverzüglich oder täglich erfolgen muss."
---
flowchart TD
    START["Landesjustizverwaltung übermittelt Daten<br/>an das Unternehmensregister im Wege der<br/>Datenfernübertragung — <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4</a>"] --> VERB["Übermittlung über eine nach dem Stand<br/>der Technik gesicherte, vereinbarte<br/>Verbindung, in einem vereinbarten<br/>strukturierten Format — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 I-II</a>"]

    VERB --> Q1{"Um welche Art von Indexdaten<br/>handelt es sich?"}

    Q1 -->|"Eintragungen im Handels-,<br/>Genossenschafts-,<br/>Gesellschafts- oder<br/>Partnerschaftsregister — §6"| SOFORT["Unverzügliche Übermittlung der<br/>Änderungen — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.1</a>"]

    Q1 -->|"Registerbekanntmachungen — §7"| TAEGLICH1["Tägliche Aktualisierung — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.2</a>"]

    Q1 -->|"Insolvenzbekanntmachungen — §8"| TAEGLICH2["Tägliche Aktualisierung — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.2</a>"]

    SOFORT --> Q2{"Häufigere Aktualisierung oder<br/>vollständige Neuübermittlung<br/>in Absprache mit der<br/>registerführenden Stelle<br/>möglich, ohne dass der Betrieb<br/>beeinträchtigt wird? — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III<br/>S.3</a>"}
    TAEGLICH1 --> Q2
    TAEGLICH2 --> Q2

    Q2 -->|Ja| HAEUF["Häufigere Aktualisierung bzw.<br/>vollständige Neuübermittlung — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III<br/>S.3</a>"]
    Q2 -->|Nein| ENDE["Reguläre Aktualisierungsfrist bleibt<br/>maßgeblich"]

    HAEUF --> ENDE

    style SOFORT fill:#fff3cd,stroke:#c9a227
    style TAEGLICH1 fill:#fff3cd,stroke:#c9a227
    style TAEGLICH2 fill:#fff3cd,stroke:#c9a227
    style ENDE fill:#d4edda,stroke:#2d8a4a
`;export{e as default};