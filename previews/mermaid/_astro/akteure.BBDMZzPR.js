var e=`---
summary: "Die Akteure des Arbeitszeitgesetzes mit dem Arbeitgeber im Zentrum: wie Aufsichtsbehörden die Einhaltung überwachen und Ausnahmen bewilligen, wie Tarifverträge und Betriebs- oder Dienstvereinbarungen Abweichungen zulassen, welche Rechte Arbeitnehmer haben und welche Verordnungsbefugnisse Bund und Länder besitzen."
---
flowchart LR
    AG["<b>Arbeitgeber</b><br/>stellt Gesetz, Verordnungen und Tarifverträge zur Verfügung — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a><br/>zeichnet Arbeitszeit über 8 Stunden auf, führt Einwilligungsverzeichnis — <a href='{{ELI}}#art-z16_abs-z2' target='_blank' rel='noopener'>§16 II</a><br/>darf in Notfällen und außergewöhnlichen Fällen abweichen — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a><br/>handelt bei Verstößen ordnungswidrig — <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22 I</a>"]

    subgraph Laender["Länder"]
        Aufsicht["<b>Aufsichtsbehörde</b><br/>nach Landesrecht zuständig, überwacht die Einhaltung — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a><br/>bewilligt Sonn- und Feiertagsbeschäftigung — <a href='{{ELI}}#art-z13_abs-z3' target='_blank' rel='noopener'>§13 III</a>, IV, V<br/>bewilligt längere Arbeitszeiten und weitergehende Ausnahmen — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a>, II<br/>im öffentlichen Dienst des Bundes: zuständiges Bundesministerium — <a href='{{ELI}}#art-z17_abs-z3' target='_blank' rel='noopener'>§17 III</a>"]
        LReg["<b>Landesregierungen</b><br/>Verordnungen zu Sonn- und Feiertagsausnahmen, soweit der Bund keinen Gebrauch macht — <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II</a><br/>können die Ermächtigung auf oberste Landesbehörden übertragen — <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II</a>"]
    end

    subgraph Bund["Bund"]
        BReg["<b>Bundesregierung</b><br/>Ausnahmen durch Rechtsverordnung — <a href='{{ELI}}#art-z7_abs-z6' target='_blank' rel='noopener'>§7 VI</a><br/>Schutzvorschriften für gefährliche Arbeiten — <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a><br/>Sonn- und Feiertagsausnahmen — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a><br/>Offshore-Tätigkeiten und Binnenschifffahrt — <a href='{{ELI}}#art-z15_abs-z2a' target='_blank' rel='noopener'>§15 IIa</a>, §21"]
        BRat["<b>Bundesrat</b><br/>stimmt den Rechtsverordnungen der Bundesregierung zu — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a>, §7 VI, §8"]
        BMVg["<b>Bundesministerium der Verteidigung</b><br/>Arbeit über die Arbeitszeitgrenzen hinaus aus zwingenden Gründen der Verteidigung — <a href='{{ELI}}#art-z15_abs-z3' target='_blank' rel='noopener'>§15 III</a><br/>Abweichungen für Tätigkeiten bei den Streitkräften — <a href='{{ELI}}#art-z15_abs-z3a' target='_blank' rel='noopener'>§15 IIIa</a>"]
        BMAS["<b>Bundesministerium für Arbeit und Soziales</b><br/>Zustimmung bzw. Einvernehmen zu Verordnungen des BMVg — <a href='{{ELI}}#art-z15_abs-z3' target='_blank' rel='noopener'>§15 III</a>, IIIa"]
    end

    subgraph Betrieb["Tarif- und Betriebsebene"]
        Tarif["<b>Tarifvertragsparteien</b><br/>Tarifvertrag kann abweichende Arbeits-, Pausen- und Ruhezeiten zulassen — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>, II, IIa<br/>Tarifvertrag kann abweichende Sonn- und Feiertagsregelungen zulassen — <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a>"]
        BR["<b>Betriebs- oder Personalrat</b><br/>Betriebs- oder Dienstvereinbarung auf Grund eines Tarifvertrags — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a><br/>Übernahme tariflicher Regelungen beim nicht tarifgebundenen Arbeitgeber — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a><br/>wird bei abgelehnter Umsetzung auf einen Tagesarbeitsplatz gehört — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV</a>"]
        AN["<b>Arbeitnehmer</b><br/>Arbeiter, Angestellte und zur Berufsbildung Beschäftigte — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II</a><br/>Verlängerung ohne Ausgleich nur mit schriftlicher Einwilligung — <a href='{{ELI}}#art-z7_abs-z7' target='_blank' rel='noopener'>§7 VII</a><br/>Nachtarbeitnehmer: Untersuchung, Umsetzung auf Tagesarbeitsplatz — <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 III</a>, IV<br/>ohne Betriebs- oder Personalrat: schriftliche Vereinbarung — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"]
    end

    Aufsicht -->|"ordnet Maßnahmen an, verlangt Auskünfte — <a href='{{ELI}}#art-z17_abs-z2' target='_blank' rel='noopener'>§17 II</a>, IV"| AG
    Tarif -->|"lassen Abweichungen zu — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>, §12"| AG
    Tarif -->|"ermöglichen Betriebsvereinbarung — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"| BR
    BR <-->|"Betriebs- oder Dienstvereinbarung — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"| AG
    AN -->|"Einwilligung, Widerruf — <a href='{{ELI}}#art-z7_abs-z7' target='_blank' rel='noopener'>§7 VII</a>"| AG
    BReg -->|"Rechtsverordnungen — <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a>, §13 I"| AG
    BRat -->|"Zustimmung — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a>"| BReg
    BReg -->|"Vorrang der Bundesverordnung — <a href='{{ELI}}#art-z13_abs-z2' target='_blank' rel='noopener'>§13 II</a>"| LReg
    BMVg -->|"Zustimmung, Einvernehmen — <a href='{{ELI}}#art-z15_abs-z3' target='_blank' rel='noopener'>§15 III</a>, IIIa"| BMAS
    BMVg -->|"kann zu Mehrarbeit verpflichten — <a href='{{ELI}}#art-z15_abs-z3' target='_blank' rel='noopener'>§15 III</a>"| AN

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class AG zentral
    class Aufsicht behoerde
    class Tarif,AN privat
    class BReg,BRat,LReg,BMVg,BMAS parlament
    class BR gremium
`;export{e as default};