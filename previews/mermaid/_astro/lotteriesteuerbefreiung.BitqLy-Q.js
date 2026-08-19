var e=`---
summary: "Prüft, ob eine erlaubte öffentliche Lotterie oder Ausspielung als Kleinbetrags- oder gemeinnützige Lotterie von der Lotteriesteuer befreit ist, und welche Anmeldepflichten bei Steuerpflicht bzw. Befreiung bestehen."
---
flowchart TD
    START["Öffentliche Lotterie oder<br/>Ausspielung wird durchgeführt"] --> ERLAUBT{"Ist die Lotterie/Ausspielung von<br/>der zuständigen inländischen<br/>Behörde erlaubt? — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a>"}

    ERLAUBT -->|Nein| STEUERPFLICHTIG["Keine Befreiung möglich:<br/>Lotteriesteuer in voller Höhe"]

    ERLAUBT -->|Ja| GRENZE1{"Übersteigt der Gesamtbetrag<br/>der Teilnahmeentgelte<br/>1.000 Euro? — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28 Nr.1</a>"}

    GRENZE1 -->|Nein| BEFREIT1["Befreit: Kleinbetrags-<br/>lotterie bis 1.000 Euro — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28 Nr.1</a>"]

    GRENZE1 -->|Ja| GEMEINNUTZ{"Dient die Lotterie ausschließlich<br/>gemeinnützigen, mildtätigen oder<br/>kirchlichen Zwecken? — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28 Nr.2</a>"}

    GEMEINNUTZ -->|Nein| STEUERPFLICHTIG

    GEMEINNUTZ -->|Ja| GRENZE2{"Übersteigt der Gesamtbetrag<br/>der Teilnahmeentgelte<br/>40.000 Euro? — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28 Nr.2</a>"}

    GRENZE2 -->|Ja| STEUERPFLICHTIG

    GRENZE2 -->|Nein| REINERTRAG{"Wird der Reinertrag zeitnah für den<br/>gemeinnützigen Zweck verwendet<br/>und nachgewiesen? — <a href='{{ELI}}#art-z32_abs-z4' target='_blank' rel='noopener'>§32 IV S.3</a>"}

    REINERTRAG -->|Nein| STEUERPFLICHTIG
    REINERTRAG -->|Ja| BEFREIT2["Befreit: gemeinnützige<br/>Lotterie bis 40.000 Euro — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28 Nr.2</a>"]

    BEFREIT1 --> ANMELDUNG["Abweichende Anmeldung nur für den<br/>Monat der letzten Ziehung möglich<br/>(auch wählbar, wenn Nichterfüllung<br/>der Befreiung vor letzter Ziehung<br/>feststeht) — <a href='{{ELI}}#art-z32_abs-z3' target='_blank' rel='noopener'>§32 III</a>"]
    BEFREIT2 --> ANMELDUNG

    STEUERPFLICHTIG --> REGELANMELDUNG["Reguläre monatliche<br/>Steueranmeldung — <a href='{{ELI}}#art-z32_abs-z1' target='_blank' rel='noopener'>§32 I, II</a>"]

    style BEFREIT1 fill:#d4edda,stroke:#2d8a4a
    style BEFREIT2 fill:#d4edda,stroke:#2d8a4a
    style STEUERPFLICHTIG fill:#f8d7da,stroke:#c0392b
    style ANMELDUNG fill:#fff3cd,stroke:#c9a227
    style REGELANMELDUNG fill:#fff3cd,stroke:#c9a227
`;export{e as default};