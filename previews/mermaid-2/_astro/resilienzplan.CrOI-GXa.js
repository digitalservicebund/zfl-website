var e=`---
summary: "Die Pflichten des Betreibers einer kritischen Anlage, z.B. eines Krankenhauses, nach dem KRITIS-Dachgesetz: eigene Risikoanalyse und Risikobewertung, Resilienzmaßnahmen, Resilienzplan und Umsetzung durch die Geschäftsleitung sowie die Überprüfung durch die zuständige Behörde."
---
flowchart TD
    START(["Registrierter Betreiber einer kritischen<br/>Anlage, z.B. ein Krankenhaus"])
    START --> NRA["BBK übermittelt die für ihn wesentlichen<br/>Teile der nationalen Risikoanalysen und<br/>Risikobewertungen — <a href='{{ELI}}#art-z11_abs-z6' target='_blank' rel='noopener'>§11 VI</a>"]
    NRA --> RA["Risikoanalyse und Risikobewertung des<br/>Betreibers: erstmals 9 Monate nach der<br/>Registrierung — <a href='{{ELI}}#art-z8_abs-z7' target='_blank' rel='noopener'>§8 VII</a>, danach im<br/>Bedarfsfall, mindestens alle 4 Jahre<br/>— <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a>"]
    RA -.- HRA["Zu berücksichtigen: naturbedingte,<br/>technische und menschlich verursachte<br/>Risiken, u.a. gesundheitliche Notlagen und<br/>hybride Bedrohungen — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II Nr. 1</a>;<br/>Abhängigkeiten von und für andere Sektoren<br/>und Staaten — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I Nr. 2</a>"]

    RA --> MASS["Verhältnismäßige technische,<br/>sicherheitsbezogene und organisatorische<br/>Maßnahmen (ab 10 Monaten nach der<br/>Registrierung — <a href='{{ELI}}#art-z8_abs-z7' target='_blank' rel='noopener'>§8 VII</a>), um Vorfälle zu<br/>verhindern, physisch zu schützen, auf<br/>Vorfälle zu reagieren und die Dienstleistung<br/>wiederherzustellen — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a>, <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>II</a>"]
    MASS -.- HMASS["Beispiele: Notfallvorsorge, Objektschutz,<br/>Zugangskontrollen, Alarmabläufe,<br/>Notstromversorgung, alternative<br/>Lieferketten, Personalsicherheit,<br/>Schulungen und Übungen — <a href='{{ELI}}#art-z13_abs-z3' target='_blank' rel='noopener'>§13 III</a>;<br/>Konkretisierung durch Mindestanforderungen<br/>und branchenspezifische Resilienzstandards<br/>— <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>, <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>II</a>"]

    MASS --> PLAN["Resilienzplan: Maßnahmen und Erwägungen<br/>darstellen, auf die eigene Risikoanalyse<br/>Bezug nehmen und den Plan anwenden<br/>— <a href='{{ELI}}#art-z13_abs-z4' target='_blank' rel='noopener'>§13 IV S.1-3</a> (Vorlagen des BBK — <a href='{{ELI}}#art-z13_abs-z5' target='_blank' rel='noopener'>§13 V</a>)"]
    PLAN --> GL["Geschäftsleitung setzt die Maßnahmen um<br/>und stellt die Umsetzung sicher (haftet<br/>für schuldhaft verursachte Schäden)<br/>— <a href='{{ELI}}#art-z20_abs-z1' target='_blank' rel='noopener'>§20 I</a>, <a href='{{ELI}}#art-z20_abs-z2' target='_blank' rel='noopener'>II</a>"]

    GL --> F1{"Wählt die zuständige<br/>Behörde den Betreiber<br/>risikobasiert zur Kontrolle<br/>aus? — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II S.3, 4</a>"}
    F1 -->|Nein| AKT(["Pflichten erfüllt; Resilienzplan bei<br/>Bedarf und nach jeder neuen Risikoanalyse<br/>aktualisieren — <a href='{{ELI}}#art-z13_abs-z4' target='_blank' rel='noopener'>§13 IV S.4</a>"])
    F1 -->|Ja| NACHWEIS["Vorlage weiterer Informationen und<br/>Nachweise, z.B. Resilienzplan oder<br/>Auditergebnisse — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II</a>, <a href='{{ELI}}#art-z16_abs-z3' target='_blank' rel='noopener'>III</a>;<br/>ggf. Prüfung vor Ort — <a href='{{ELI}}#art-z16_abs-z4' target='_blank' rel='noopener'>§16 IV</a>"]
    F1 -.- HNW["Zuerst kann die Behörde über das BBK beim<br/>BSI vorhandene Nachweise anfordern<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a>; andere Nachweise und<br/>Feststellungen anderer Behörden sind<br/>anrechenbar — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a>, <a href='{{ELI}}#art-z17_abs-z2' target='_blank' rel='noopener'>II</a>; Strom,<br/>Gas, Wasserstoff: §5f EnWG — <a href='{{ELI}}#art-z16_abs-z7' target='_blank' rel='noopener'>§16 VII</a>"]

    NACHWEIS --> F2{"Mängel festgestellt?<br/>— <a href='{{ELI}}#art-z16_abs-z5' target='_blank' rel='noopener'>§16 V</a>"}
    F2 -->|Nein| AKT
    F2 -->|Ja| MBP(["Anordnung: Mängelbeseitigungsplan<br/>und Beseitigung in angemessener Frist,<br/>ggf. Nachweis der Beseitigung — <a href='{{ELI}}#art-z16_abs-z5' target='_blank' rel='noopener'>§16 V</a>"])

    style AKT fill:#d4edda,stroke:#2d8a4a
    style MBP fill:#fff3cd,stroke:#c9a227
    style HRA fill:#f5f5f5,stroke:#999
    style HMASS fill:#f5f5f5,stroke:#999
    style HNW fill:#f5f5f5,stroke:#999
`;export{e as default};