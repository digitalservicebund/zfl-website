var e=`---
summary: "Wie ein Verstoß gegen das KCanG als Ordnungswidrigkeit oder Straftat eingeordnet wird und welche Bußgeld- bzw. Strafrahmen, einschließlich besonders schwerer und qualifizierter Fälle sowie möglicher Strafmilderung, greifen."
---
flowchart TD
    Start["Verstoß gegen Vorschriften des KCanG<br/>festgestellt"] --> Q1{"Verstoß im Bußgeldkatalog <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36<br/>Abs.1</a> (z.B. Besitz 25-30 g/<br/>50-60 g über Grenzmengen,<br/>Werbeverbot, Meldepflichten)<br/>oder im Straftatenkatalog <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34<br/>Abs.1</a> erfasst?"}

    Q1 -->|"Nur <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36 Abs.1</a>"| OWI["Ordnungswidrigkeit — <a href='{{ELI}}#art-z36_abs-z1' target='_blank' rel='noopener'>§36 Abs.1</a>"]
    OWI --> BUSSGELD{"Nr. 1-6, 8-10, 12, 13, 13a,<br/>15, 16, 18, 20-24, 28, 29 oder<br/>31?"}
    BUSSGELD -->|Ja| BG30["Bußgeld bis 30.000 € — <a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>§36 Abs.2</a>"]
    BUSSGELD -->|Nein| BG10["Bußgeld bis 10.000 € — <a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>§36 Abs.2</a>"]

    Q1 -->|"<a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs.1</a><br/>einschlägig"| Q2{"Schuld gering, kein<br/>öffentliches Interesse an<br/>Verfolgung und Tat betrifft<br/>nur Eigenkonsum in geringer<br/>Menge (<a href='{{ELI}}/art-z34' target='_blank' rel='noopener'>§34 Abs.1, 2 o. 5</a>)?<br/>— <a href='{{ELI}}#art-z35a_abs-z1' target='_blank' rel='noopener'>§35a Abs.1</a>"}

    Q2 -->|Ja| ABSEHEN["Staatsanwaltschaft kann von der<br/>Verfolgung absehen — <a href='{{ELI}}#art-z35a_abs-z1' target='_blank' rel='noopener'>§35a Abs.1</a>"]

    Q2 -->|Nein| Q3{"Regelbeispiel eines besonders<br/>schweren Falls erfüllt?<br/>(gewerbsmäßig;<br/>Gesundheitsgefährdung mehrerer<br/>Personen;<br/>Abgabe/Verabreichung an Kind<br/>oder Jugendlichen durch Person<br/>über 21 Jahre; nicht geringe<br/>Menge) — <a href='{{ELI}}#art-z34_abs-z3' target='_blank' rel='noopener'>§34 Abs.3</a>"}

    Q3 -->|Nein| STRAF1["Freiheitsstrafe bis 3 Jahre oder<br/>Geldstrafe — <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs.1</a><br/>bei Fahrlässigkeit (Nr.3-13,15,16):<br/>bis 1 Jahr oder Geldstrafe — <a href='{{ELI}}#art-z34_abs-z5' target='_blank' rel='noopener'>§34 Abs.5</a>"]

    Q3 -->|Ja| Q4{"Qualifikationstatbestand nach<br/><a href='{{ELI}}#art-z34_abs-z4' target='_blank' rel='noopener'>§34 Abs.4</a> erfüllt?<br/>(gewerbsmäßige Abgabe an<br/>Kinder;<br/>Bestimmen einer Person unter<br/>18 Jahren; bandenmäßig mit<br/>nicht geringer Menge; mit<br/>Schusswaffe)"}

    Q4 -->|Nein| STRAF2["Freiheitsstrafe von 3 Monaten bis 5<br/>Jahren — <a href='{{ELI}}#art-z34_abs-z3' target='_blank' rel='noopener'>§34 Abs.3</a>"]
    Q4 -->|Ja| STRAF3["Freiheitsstrafe nicht unter 2 Jahren<br/>(minder schwere Fälle:<br/>3 Monate bis 5 Jahre) — <a href='{{ELI}}#art-z34_abs-z4' target='_blank' rel='noopener'>§34 Abs.4</a>"]

    STRAF1 --> Q5{"Täter offenbart freiwillig<br/>sein Wissen zur Aufklärung<br/>zusammenhängender Taten oder<br/>verhindert rechtzeitig eine<br/>geplante Tat nach <a href='{{ELI}}/art-z34' target='_blank' rel='noopener'>§34 Abs.3/4</a>?<br/>— <a href='{{ELI}}#art-z35_abs-z' target='_blank' rel='noopener'>§35</a>"}
    STRAF2 --> Q5
    STRAF3 --> Q5

    Q5 -->|Ja| MILDERUNG["Gericht kann Strafe mildern (§49 Abs.1<br/>StGB) oder — bis 3 Jahre Freiheitsstrafe<br/>— davon absehen — <a href='{{ELI}}#art-z35_abs-z' target='_blank' rel='noopener'>§35</a>"]
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