var e=`---
summary: "Zeigt die Auswirkung eines Prozesskostenhilfeantrags auf die Kostenerhebung nach §§ 28, 14 und 31 GKG: von der gebührenfreien Bewilligungsprüfung über die entfallende Vorschusspflicht bis zur Haftung als Entscheidungsschuldner und möglichen Kostenrückzahlung."
---
flowchart TD
    START["Antrag auf Bewilligung von<br/>Prozesskostenhilfe (ggf. einschließlich<br/>grenzüberschreitender PKH) gestellt"]

    START --> KEINEGEBUEHR["Für das PKH-Bewilligungsverfahren<br/>selbst entsteht keine Gerichtsgebühr<br/>— <a href='{{ELI}}#anlagen-n1_anlage-n1' target='_blank' rel='noopener'>KV Nr. 1900</a>"]

    KEINEGEBUEHR --> BEWILLIGUNG{"Wird die Prozesskostenhilfe<br/>bewilligt?"}

    BEWILLIGUNG -->|Nein| ABLEHNUNG_RUECKNAHME{"Wird der Antrag zurückgenommen,<br/>vom Gericht abgelehnt, oder die<br/>Übermittlung/das Ersuchen bei<br/>grenzüberschreitender PKH<br/>abgelehnt? — <a href='{{ELI}}#art-z28_abs-z3' target='_blank' rel='noopener'>§28 III</a>"}
    ABLEHNUNG_RUECKNAHME -->|Ja| ANTRAGSTELLER_HAFTET["Antragsteller schuldet die<br/>Auslagen des PKH-Verfahrens<br/>— <a href='{{ELI}}#art-z28_abs-z3' target='_blank' rel='noopener'>§28 III Nr.1, Nr.2</a>"]

    BEWILLIGUNG -->|Ja| KEINE_ABHAENGIGMACHUNG["Keine Abhängigmachung der<br/>Rechtsverfolgung von einer<br/>Vorschusszahlung: §§ 12, 13<br/>gelten nicht — <a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14 Nr.1</a>"]

    KEINE_ABHAENGIGMACHUNG --> ENTSCHEIDUNGSSCHULDNER{"Haftet der PKH-Empfänger als<br/>Entscheidungsschuldner nach<br/>§ 29 Nr.1 für die Verfahrens-<br/>kosten? — <a href='{{ELI}}#art-z31_abs-z3' target='_blank' rel='noopener'>§31 III</a>"}

    ENTSCHEIDUNGSSCHULDNER -->|Ja| KEINE_HAFTUNG_GEGNER["Haftung eines anderen<br/>Kostenschuldners darf nicht<br/>geltend gemacht werden; bereits<br/>gezahlte Kosten sind zurück-<br/>zuzahlen — <a href='{{ELI}}#art-z31_abs-z3' target='_blank' rel='noopener'>§31 III S.1</a>"]
    ENTSCHEIDUNGSSCHULDNER -->|Nein| NORMALE_HAFTUNG["Normale Kostenhaftung<br/>nach § 29 bleibt bestehen"]

    KEINE_HAFTUNG_GEGNER --> AUSNAHME_JVEG{"Handelt es sich um eine<br/>Zahlung nach § 13 I, III JVEG<br/>und hat die PKH-Partei der<br/>besonderen Vergütung zugestimmt?<br/>— <a href='{{ELI}}#art-z31_abs-z3' target='_blank' rel='noopener'>§31 III S.1</a>"}

    AUSNAHME_JVEG -->|Ja| RUECKZAHLUNG_AUSGESCHLOSSEN["Rückzahlung insoweit<br/>ausgeschlossen"]
    AUSNAHME_JVEG -->|Nein| RUECKZAHLUNG["Bereits erhobene Kosten<br/>werden zurückgezahlt"]

    style KEINE_ABHAENGIGMACHUNG fill:#d4edda,stroke:#2d8a4a
    style KEINE_HAFTUNG_GEGNER fill:#d4edda,stroke:#2d8a4a
    style RUECKZAHLUNG fill:#d4edda,stroke:#2d8a4a
    style ANTRAGSTELLER_HAFTET fill:#f8d7da,stroke:#c0392b
    style NORMALE_HAFTUNG fill:#fff3cd,stroke:#c9a227
    style RUECKZAHLUNG_AUSGESCHLOSSEN fill:#fff3cd,stroke:#c9a227
`;export{e as default};