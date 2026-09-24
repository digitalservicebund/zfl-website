var e=`---
summary: "Zeigt, wie sich eine Ermäßigung der Einkommen- oder Körperschaftsteuer aufgrund eines Doppelbesteuerungsabkommens auf den Solidaritätszuschlag auswirkt, indem die Ermäßigung zunächst auf den Zuschlag angerechnet wird."
---
flowchart TD
    A{"Werden im Geltungsbereich des<br/>SolZG erhobene Steuern vom<br/>Einkommen aufgrund eines<br/>Abkommens zur Vermeidung der<br/>Doppelbesteuerung ermäßigt?<br/>— <a href='{{ELI}}#art-z5_abs-z' target='_blank' rel='noopener'>§5</a>"}
    A -->|Nein| Z1["Keine Anrechnungsbesonderheit<br/>— Solidaritätszuschlag bleibt in voller<br/>Höhe bestehen"]
    A -->|Ja| B["Die Ermäßigung ist zuerst auf den<br/>Solidaritätszuschlag zu beziehen — <a href='{{ELI}}#art-z5_abs-z' target='_blank' rel='noopener'>§5</a>"]
    B --> C{"Übersteigt die DBA-Ermäßigung<br/>den festgesetzten<br/>Solidaritätszuschlag?"}
    C -->|Nein| Z2["Solidaritätszuschlag wird in Höhe der<br/>Ermäßigung gemindert, die zugrunde<br/>liegende Einkommen-/ Körperschaftsteuer<br/>bleibt unverändert"]
    C -->|Ja| Z3["Solidaritätszuschlag entfällt<br/>vollständig;<br/>übersteigender Betrag mindert die<br/>zugrunde liegende Einkommen-/<br/>Körperschaftsteuer"]

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};