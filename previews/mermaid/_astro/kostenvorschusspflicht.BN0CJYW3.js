var e=`---
summary: "Zeigt das Prüfschema, ob eine Klage nach § 12 GKG erst nach Zahlung der Verfahrensgebühr zugestellt wird, welche Ausnahmen nach §§ 12 und 14 GKG (u.a. Prozesskostenhilfe) die Vorschusspflicht entfallen lassen und wann ein Auslagenvorschuss nach § 17 GKG hinzukommt."
---
flowchart TD
    START["Klage in einem bürgerlichen Rechtsstreit<br/>eingereicht — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a>"]

    START --> AUSNAHME12{"Greift eine Ausnahme des § 12<br/>II ein? (Widerklage, europ.<br/>Bagatellverfahren,<br/>Arbeitnehmererfindungs-Patentstreit,<br/>Restitutionsklage § 580 Nr.8<br/>ZPO) — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II</a>"}

    AUSNAHME12 -->|Ja| ZUSTELLUNG_OHNE["Zustellung erfolgt ohne vorherige<br/>Zahlung — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II</a>"]

    AUSNAHME12 -->|Nein| AUSNAHME14{"Liegt ein Ausnahmetatbestand<br/>des § 14 vor?"}

    AUSNAHME14 -->|"Prozesskostenhilfe bewilligt"| KEINE_ABHAENGIG1["§§ 12, 13 gelten nicht:<br/>keine Abhängigmachung — <a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14 Nr.1</a>"]
    AUSNAHME14 -->|"Gebührenfreiheit zusteht"| KEINE_ABHAENGIG2["§§ 12, 13 gelten nicht:<br/>keine Abhängigmachung — <a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14 Nr.2</a>"]
    AUSNAHME14 -->|"Rechtsverfolgung nicht<br/>aussichtslos/mutwillig und<br/>Zahlungsschwierigkeiten oder<br/>drohender Schaden durch<br/>Verzögerung glaubhaft gemacht"| KEINE_ABHAENGIG3["§§ 12, 13 gelten nicht:<br/>keine Abhängigmachung — <a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14 Nr.3</a>"]
    AUSNAHME14 -->|"Kein Ausnahmetatbestand<br/>erfüllt"| GRUNDSATZ["Klage soll erst nach Zahlung der<br/>Verfahrensgebühr zugestellt werden — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12<br/>I S.1</a>"]

    GRUNDSATZ --> ERWEITERUNG{"Wird der Klageantrag später<br/>erweitert?"}
    ERWEITERUNG -->|Ja| KEINE_HANDLUNG["Vor Zahlung der Gebühr keine weitere<br/>gerichtliche Handlung (auch in der<br/>Rechtsmittelinstanz) — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.2</a>"]
    ERWEITERUNG -->|Nein| ZAHLUNG_ERFOLGT["Verfahrensgebühr wird gezahlt"]
    KEINE_HANDLUNG --> ZAHLUNG_ERFOLGT

    ZAHLUNG_ERFOLGT --> ZUSTELLUNG_MIT["Klage wird zugestellt"]

    ZUSTELLUNG_MIT --> AUSLAGEN{"Wird zusätzlich eine mit<br/>Auslagen verbundene Handlung<br/>beantragt?"}
    AUSLAGEN -->|Ja| VORSCHUSS_AUSLAGEN["Antragsteller muss kostendeckenden<br/>Vorschuss zahlen; Gericht soll Vornahme<br/>davon abhängig machen — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a>"]
    AUSLAGEN -->|Nein| KEIN_AUSLAGENVORSCHUSS["Kein zusätzlicher Auslagenvorschuss<br/>nötig"]

    ZUSTELLUNG_OHNE --> FORTDAUER
    KEINE_ABHAENGIG1 --> FORTDAUER
    KEINE_ABHAENGIG2 --> FORTDAUER
    KEINE_ABHAENGIG3 --> FORTDAUER
    VORSCHUSS_AUSLAGEN --> FORTDAUER
    KEIN_AUSLAGENVORSCHUSS --> FORTDAUER

    FORTDAUER["Vorschusspflicht bleibt bestehen, auch<br/>wenn die Kosten später einem anderen<br/>auferlegt oder von einem anderen<br/>übernommen werden — <a href='{{ELI}}/art-z18' target='_blank' rel='noopener'>§18</a>"]

    style ZUSTELLUNG_OHNE fill:#d4edda,stroke:#2d8a4a
    style KEINE_ABHAENGIG1 fill:#d4edda,stroke:#2d8a4a
    style KEINE_ABHAENGIG2 fill:#d4edda,stroke:#2d8a4a
    style KEINE_ABHAENGIG3 fill:#d4edda,stroke:#2d8a4a
    style GRUNDSATZ fill:#f8d7da,stroke:#c0392b
    style VORSCHUSS_AUSLAGEN fill:#f8d7da,stroke:#c0392b
    style FORTDAUER fill:#fff3cd,stroke:#c9a227
`;export{e as default};