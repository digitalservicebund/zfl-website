var e=`flowchart TD
    A["Digitaler Dienst i.S.d. Richtlinie<br/>(EU) 2015/1535 wird angeboten<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV Nr.1</a>"] --> Q1{"Handelt es sich um Rundfunk<br/>i.S.d. medienrechtlichen<br/>Bestimmungen der Länder?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.3</a>"}

    Q1 -->|Ja| Z1["DDG nicht anwendbar —<br/>Landesmedienrecht maßgeblich"]

    Q1 -->|Nein| Q2{"Betrifft die Frage Online-<br/>Vermittlungsdienste (VO 2019/1150),<br/>kurzfristige Vermietung (VO 2024/1028),<br/>Geoblocking (VO 2018/302) oder das<br/>Diskriminierungsverbot nach §22c II?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2 Nr.1-4</a>"}

    Q2 -->|Ja| Z2["Nur die jeweiligen Durchführungs-<br/>vorschriften des DDG gelten,<br/>unabhängig von der allgemeinen<br/>Diensteanbieter-Eigenschaft<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2</a>"]

    Q2 -->|Nein| Q3{"Geht es um inhalts- oder<br/>vielfaltsbezogene Anforderungen<br/>an den digitalen Dienst?<br/>— <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II S.1</a>"}

    Q3 -->|Ja| Z3["Medienrechtliche Bestimmungen<br/>der Länder maßgeblich, soweit<br/>DDG oder EU-Recht nichts anderes<br/>bestimmen — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a>"]

    Q3 -->|Nein| Q4{"Anbieter ist 'Diensteanbieter'<br/>i.S.d. §1 IV Nr.5<br/>(Anbieter digitaler Dienste)?<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV Nr.5</a>"}

    Q4 -->|Nein| Z4["DDG grundsätzlich<br/>nicht anwendbar"]

    Q4 -->|Ja| Z5["Allgemeine Vorschriften des DDG<br/>(Teile 2-5) auf den Diensteanbieter<br/>anwendbar — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.1</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#f8d7da,stroke:#c0392b
    style Z5 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};