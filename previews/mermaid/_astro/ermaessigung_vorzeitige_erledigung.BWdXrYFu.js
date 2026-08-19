var e=`---
summary: "Zeigt, unter welchen Voraussetzungen nach KV Nr. 1211 GKG sich die Verfahrensgebühr von 3,0 auf 1,0 ermäßigt, wenn das Verfahren im ersten Rechtszug durch Klagerücknahme, Anerkenntnis, Vergleich oder Erledigungserklärung vorzeitig beendet wird."
---
flowchart TD
    START["Verfahren im ersten Rechtszug<br/>vor Amts- oder Landgericht anhängig:<br/>Verfahrensgebühr 3,0 entstanden<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1210</a>"]

    START --> BEENDIGUNG{"Wird das gesamte Verfahren<br/>beendet durch...<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1211</a>"}

    BEENDIGUNG -->|"Klagerücknahme vor Schluss der<br/>mündlichen Verhandlung (bzw. den<br/>gleichgestellten Zeitpunkten nach<br/>§128 II, §495a, §331 III ZPO oder<br/>im europ. Bagatellverfahren), wenn<br/>keine Kostenentscheidung nach<br/>§269 III S.3 ZPO ergeht"| TATBESTAND1["Ermäßigungstatbestand<br/>Nr. 1 erfüllt"]
    BEENDIGUNG -->|"Anerkenntnis-, Verzichts-<br/>urteil oder Urteil ohne<br/>Tatbestand/Entscheidungsgründe<br/>(§313a II ZPO)"| TATBESTAND2["Ermäßigungstatbestand<br/>Nr. 2 erfüllt"]
    BEENDIGUNG -->|"Gerichtlicher Vergleich<br/>oder Beschluss nach<br/>§26 III KapMuG"| TATBESTAND3["Ermäßigungstatbestand<br/>Nr. 3 erfüllt"]
    BEENDIGUNG -->|"Erledigungserklärungen<br/>nach §91a ZPO ohne<br/>Kostenentscheidung"| TATBESTAND4["Ermäßigungstatbestand<br/>Nr. 4 erfüllt"]
    BEENDIGUNG -->|"Keiner der<br/>Tatbestände erfüllt"| KEINE_ERMAESSIGUNG["Gebühr bleibt bei 3,0<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1210</a>"]

    TATBESTAND1 --> VORAUSGEGANGEN
    TATBESTAND2 --> VORAUSGEGANGEN
    TATBESTAND3 --> VORAUSGEGANGEN
    TATBESTAND4 --> VORAUSGEGANGEN

    VORAUSGEGANGEN{"Ist bereits ein anderes Urteil<br/>(außer Nr. 2), eine Entscheidung<br/>über eine Sicherungsanordnung<br/>oder ein Musterentscheid nach<br/>dem KapMuG vorausgegangen?<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1211</a>"}

    VORAUSGEGANGEN -->|Ja| KEINE_ERMAESSIGUNG
    VORAUSGEGANGEN -->|Nein| ERMAESSIGT["Gebühr 1210 ermäßigt<br/>sich auf 1,0<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1211</a>"]

    ERMAESSIGT --> MEHRFACH["Erfüllen mehrere Tatbestände<br/>gleichzeitig, ermäßigt sich die<br/>Gebühr trotzdem nur einmal<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1211</a>"]

    style ERMAESSIGT fill:#d4edda,stroke:#2d8a4a
    style MEHRFACH fill:#fff3cd,stroke:#c9a227
    style KEINE_ERMAESSIGUNG fill:#f8d7da,stroke:#c0392b
`;export{e as default};