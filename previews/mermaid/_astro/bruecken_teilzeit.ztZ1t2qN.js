var e=`flowchart TD
    A["AN wünscht zeitlich begrenzte<br/>Verringerung der Arbeitszeit<br/>('Brückenteilzeit')"] --> Q1{"Hat das Arbeitsverhältnis<br/>länger als 6 Monate<br/>bestanden? — <a href='{{ELI}}#art-z9a_abs-z1' target='_blank' rel='noopener'>§9a I S.1</a>"}

    Q1 -->|Nein| N1["Kein Anspruch<br/>nach <a href='{{ELI}}/art-z9a' target='_blank' rel='noopener'>§9a</a>"]

    Q1 -->|Ja| Q2{"Liegt der gewünschte Zeitraum<br/>zwischen mindestens 1 und<br/>höchstens 5 Jahren? — <a href='{{ELI}}#art-z9a_abs-z1' target='_blank' rel='noopener'>§9a I S.2</a>"}

    Q2 -->|Nein| N2["Verlangen in dieser Form<br/>unzulässig; Zeitraum muss<br/>angepasst werden"]

    Q2 -->|Ja| Q3{"Beschäftigt der Arbeitgeber<br/>i.d.R. mehr als 45<br/>Arbeitnehmer? — <a href='{{ELI}}#art-z9a_abs-z1' target='_blank' rel='noopener'>§9a I S.3</a>"}

    Q3 -->|Nein| N1

    Q3 -->|Ja| Q4{"Beschäftigt der Arbeitgeber<br/>i.d.R. mehr als 200<br/>Arbeitnehmer?"}

    Q4 -->|Ja| P1["Ablehnung nur aus<br/>betrieblichen Gründen<br/>entsprechend <a href='{{ELI}}#art-z8_abs-z4' target='_blank' rel='noopener'>§8 IV</a><br/>— <a href='{{ELI}}#art-z9a_abs-z2' target='_blank' rel='noopener'>§9a II S.1</a>"]

    Q4 -->|Nein| Q5{"Haben bei Zeitpunkt des<br/>gewünschten Beginns bereits so viele<br/>andere AN nach <a href='{{ELI}}#art-z9a_abs-z1' target='_blank' rel='noopener'>§9a I</a> verringert, wie es<br/>der gestaffelten Zumutbarkeitsgrenze<br/>der jeweiligen Betriebsgröße<br/>entspricht? — <a href='{{ELI}}#art-z9a_abs-z2' target='_blank' rel='noopener'>§9a II S.2-3</a>"}

    Q5 -->|Ja| N3["Arbeitgeber kann Verlangen<br/>allein deswegen ablehnen<br/>(Überforderungsklausel)<br/>— <a href='{{ELI}}#art-z9a_abs-z2' target='_blank' rel='noopener'>§9a II S.2</a>"]

    Q5 -->|Nein| P1

    P1 --> E["Erörterung von Umfang und<br/>Verteilung analog <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8 II-V</a>;<br/>bei Fristversäumnis des AG gilt<br/>Verringerung/Verteilung wie<br/>gewünscht als festgelegt<br/>— <a href='{{ELI}}#art-z9a_abs-z3' target='_blank' rel='noopener'>§9a III</a>"]

    E --> Q6{"Lehnt der Arbeitgeber form-<br/>und fristgerecht (spätestens<br/>1 Monat vorher, Textform) ab?"}

    Q6 -->|Ja| N4["Berechtigte Ablehnung;<br/>keine Verringerung"]

    Q6 -->|Nein| Z1["Arbeitszeit verringert sich<br/>befristet für den beantragten<br/>Zeitraum wie gewünscht"]

    Z1 --> R["Nach Fristablauf automatische<br/>Rückkehr zur ursprünglichen<br/>Arbeitszeit; während der Laufzeit<br/>keine weitere Verringerung/<br/>Verlängerung nach diesem Gesetz<br/>— <a href='{{ELI}}#art-z9a_abs-z4' target='_blank' rel='noopener'>§9a IV</a>"]

    R --> S["Erneute Verringerung frühestens<br/>1 Jahr nach Rückkehr zur ursprüng-<br/>lichen Arbeitszeit verlangbar<br/>— <a href='{{ELI}}#art-z9a_abs-z5' target='_blank' rel='noopener'>§9a V S.1</a>"]

    N4 --> S2["Nach berechtigter Ablehnung aus<br/>betrieblichen Gründen: erneuter Antrag<br/>frühestens nach 2 Jahren (<a href='{{ELI}}#art-z8_abs-z6' target='_blank' rel='noopener'>§8 VI</a> entspr.);<br/>nach Ablehnung wegen Zumutbarkeits-<br/>regelung: frühestens nach 1 Jahr<br/>— <a href='{{ELI}}#art-z9a_abs-z5' target='_blank' rel='noopener'>§9a V S.2-3</a>"]

    style N1 fill:#f8d7da,stroke:#c0392b
    style N2 fill:#f8d7da,stroke:#c0392b
    style N3 fill:#f8d7da,stroke:#c0392b
    style N4 fill:#f8d7da,stroke:#c0392b
    style Z1 fill:#d4edda,stroke:#2d8a4a
    style R fill:#fff3cd,stroke:#c9a227
    style S fill:#fff3cd,stroke:#c9a227
    style S2 fill:#fff3cd,stroke:#c9a227
`;export{e as default};