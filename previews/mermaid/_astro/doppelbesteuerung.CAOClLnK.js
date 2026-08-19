var e=`---
summary: "Zeigt, wie sich eine Ermäßigung der Einkommen- oder Körperschaftsteuer aufgrund eines Doppelbesteuerungsabkommens auf den Solidaritätszuschlag auswirkt, indem die Ermäßigung zunächst auf den Zuschlag angerechnet wird."
---
flowchart TD
    A{"Werden im Geltungsbereich<br/>des SolZG erhobene Steuern<br/>vom Einkommen aufgrund eines<br/>Abkommens zur Vermeidung der<br/>Doppelbesteuerung ermäßigt?<br/>— <a href='{{ELI}}#art-z5_abs-z' target='_blank' rel='noopener'>§5</a>"}
    A -->|Nein| Z1["Keine Anrechnungsbesonderheit —<br/>Solidaritätszuschlag bleibt<br/>in voller Höhe bestehen"]
    A -->|Ja| B["Die Ermäßigung ist zuerst<br/>auf den Solidaritätszuschlag<br/>zu beziehen<br/>— <a href='{{ELI}}#art-z5_abs-z' target='_blank' rel='noopener'>§5</a>"]
    B --> C{"Übersteigt die DBA-<br/>Ermäßigung den festgesetzten<br/>Solidaritätszuschlag?"}
    C -->|Nein| Z2["Solidaritätszuschlag wird<br/>in Höhe der Ermäßigung<br/>gemindert, die zugrunde<br/>liegende Einkommen-/<br/>Körperschaftsteuer bleibt<br/>unverändert"]
    C -->|Ja| Z3["Solidaritätszuschlag<br/>entfällt vollständig;<br/>übersteigender Betrag<br/>mindert die zugrunde<br/>liegende Einkommen-/<br/>Körperschaftsteuer"]

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};