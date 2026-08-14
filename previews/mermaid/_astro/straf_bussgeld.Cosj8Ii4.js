var e=`flowchart TD
    Start["Verstoß gegen Vorschriften<br/>des KCanG festgestellt"] --> Q1{"Verstoß im Bußgeldkatalog<br/>§36 Abs.1 (z.B. Besitz 25-30 g/<br/>50-60 g über Grenzmengen,<br/>Werbeverbot, Meldepflichten)<br/>oder im Straftatenkatalog<br/>§34 Abs.1 erfasst?"}

    Q1 -->|"Nur §36 Abs.1"| OWI["Ordnungswidrigkeit<br/>— §36 Abs.1"]
    OWI --> BUSSGELD{"Nr. 1-6, 8-10, 12, 13,<br/>13a, 15, 16, 18, 20-24,<br/>28, 29 oder 31?"}
    BUSSGELD -->|Ja| BG30["Bußgeld bis 30.000 €<br/>— §36 Abs.2"]
    BUSSGELD -->|Nein| BG10["Bußgeld bis 10.000 €<br/>— §36 Abs.2"]

    Q1 -->|"§34 Abs.1<br/>einschlägig"| Q2{"Schuld gering, kein<br/>öffentliches Interesse an<br/>Verfolgung und Tat betrifft<br/>nur Eigenkonsum in geringer<br/>Menge (§34 Abs.1, 2 o. 5)?<br/>— §35a Abs.1"}

    Q2 -->|Ja| ABSEHEN["Staatsanwaltschaft kann<br/>von der Verfolgung absehen<br/>— §35a Abs.1"]

    Q2 -->|Nein| Q3{"Regelbeispiel eines besonders<br/>schweren Falls erfüllt?<br/>(gewerbsmäßig; Gesundheits-<br/>gefährdung mehrerer Personen;<br/>Abgabe/Verabreichung an Kind<br/>oder Jugendlichen durch Person<br/>über 21 Jahre; nicht geringe<br/>Menge) — §34 Abs.3"}

    Q3 -->|Nein| STRAF1["Freiheitsstrafe bis 3 Jahre<br/>oder Geldstrafe — §34 Abs.1<br/><br/>bei Fahrlässigkeit (Nr.3-13,15,16):<br/>bis 1 Jahr oder Geldstrafe<br/>— §34 Abs.5"]

    Q3 -->|Ja| Q4{"Qualifikationstatbestand nach<br/>§34 Abs.4 erfüllt? (gewerbs-<br/>mäßige Abgabe an Kinder;<br/>Bestimmen einer Person unter<br/>18 Jahren; bandenmäßig mit<br/>nicht geringer Menge; mit<br/>Schusswaffe)"}

    Q4 -->|Nein| STRAF2["Freiheitsstrafe von<br/>3 Monaten bis 5 Jahren<br/>— §34 Abs.3"]
    Q4 -->|Ja| STRAF3["Freiheitsstrafe nicht unter<br/>2 Jahren (minder schwere Fälle:<br/>3 Monate bis 5 Jahre)<br/>— §34 Abs.4"]

    STRAF1 --> Q5{"Täter offenbart freiwillig sein<br/>Wissen zur Aufklärung zusammen-<br/>hängender Taten oder verhindert<br/>rechtzeitig eine geplante Tat<br/>nach §34 Abs.3/4? — §35"}
    STRAF2 --> Q5
    STRAF3 --> Q5

    Q5 -->|Ja| MILDERUNG["Gericht kann Strafe mildern<br/>(§49 Abs.1 StGB) oder — bis<br/>3 Jahre Freiheitsstrafe — davon<br/>absehen — §35"]
    Q5 -->|Nein| ENDSTRAF["Strafmaß wie festgestellt"]

    style BG30 fill:#fff3cd,stroke:#c9a227
    style BG10 fill:#fff3cd,stroke:#c9a227
    style ABSEHEN fill:#d4edda,stroke:#2d8a4a
    style MILDERUNG fill:#d4edda,stroke:#2d8a4a
    style STRAF1 fill:#f8d7da,stroke:#c0392b
    style STRAF2 fill:#f8d7da,stroke:#c0392b
    style STRAF3 fill:#f8d7da,stroke:#c0392b
    style ENDSTRAF fill:#f8d7da,stroke:#c0392b
`;export{e as default};