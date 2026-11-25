var e=`---
summary: "Wie der Anwendungsbereich des Digitale-Dienste-Gesetzes nach §1 DDG bestimmt wird, insbesondere die Abgrenzung zu Rundfunk, zu EU-Sondervorschriften und zu medienrechtlichen Bestimmungen der Länder."
---
flowchart TD
    A["Digitaler Dienst i.S.d. Richtlinie (EU)<br/>2015/1535 wird angeboten — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV Nr.1</a>"] --> Q1{"Handelt es sich um Rundfunk<br/>i.S.d. medienrechtlichen<br/>Bestimmungen der Länder? — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1<br/>I S.3</a>"}

    Q1 -->|Ja| Z1["DDG nicht anwendbar — Landesmedienrecht<br/>maßgeblich"]

    Q1 -->|Nein| Q2{"Betrifft die Frage<br/>Online-Vermittlungsdienste (VO<br/>2019/1150), kurzfristige<br/>Vermietung (VO 2024/1028),<br/>Geoblocking (VO 2018/302) oder<br/>das Diskriminierungsverbot<br/>nach §22c II? — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2<br/>Nr.1-4</a>"}

    Q2 -->|Ja| Z2["Nur die jeweiligen<br/>Durchführungsvorschriften des DDG<br/>gelten, unabhängig von der allgemeinen<br/>Diensteanbieter-Eigenschaft — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2</a>"]

    Q2 -->|Nein| Q3{"Geht es um inhalts- oder<br/>vielfaltsbezogene<br/>Anforderungen an den digitalen<br/>Dienst? — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II S.1</a>"}

    Q3 -->|Ja| Z3["Medienrechtliche Bestimmungen der Länder<br/>maßgeblich, soweit DDG oder EU-Recht<br/>nichts anderes bestimmen — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a>"]

    Q3 -->|Nein| Q4{"Anbieter ist 'Diensteanbieter'<br/>i.S.d. §1 IV Nr.5 (Anbieter<br/>digitaler Dienste)? — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV<br/>Nr.5</a>"}

    Q4 -->|Nein| Z4["DDG grundsätzlich nicht anwendbar"]

    Q4 -->|Ja| Z5["Allgemeine Vorschriften des DDG (Teile<br/>2-5) auf den Diensteanbieter anwendbar<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.1</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#f8d7da,stroke:#c0392b
    style Z5 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};