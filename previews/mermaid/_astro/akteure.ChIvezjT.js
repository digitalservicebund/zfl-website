var e=`---
summary: "Die Akteure der Finanzierung politischer Stiftungen nach dem StiftFinG: Stiftungen und nahestehende Parteien, die fördernden und feststellenden Bundesbehörden, der Verfassungsschutz und die Wirtschaftsprüfer sowie ihre Beziehungen zueinander."
---
flowchart TD
    Stiftung["<b>Politische Stiftung</b><br/>von der nahestehenden Partei unabhängig — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a><br/>beantragt Förderung — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a><br/>legt Prüfergebnis der Antragsstelle vor — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a><br/>veröffentlicht Spenden über 10.000 € im Jahresbericht — <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 II</a>"]

    subgraph Behoerden["Behörden"]
        BMF["<b>Bundesministerium der Finanzen</b><br/>Einvernehmen zu besonderen Verwaltungsvorschriften — <a href='{{ELI}}#art-z3_abs-z7' target='_blank' rel='noopener'>§3 VII</a>"]
        OBB["<b>Oberste Bundesbehörden</b><br/>zuständig für Anträge, Beendigung, Aufhebung, Minderung — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a><br/>Aufhebungen im Einvernehmen mit dem BMI — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.3</a><br/>können Verwaltungsvorschriften erlassen — <a href='{{ELI}}#art-z3_abs-z7' target='_blank' rel='noopener'>§3 VII</a>"]
        BOB["<b>Nachgeordnete Bundesoberbehörden</b><br/>nehmen übertragene Aufgaben wahr — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.2</a>"]
        BMI["<b>Bundesministerium des Innern und für Heimat</b><br/>stellt Anerkennung und Förderfähigkeit fest — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a><br/>stellt Beendigungsgründe Nr. 1 und 2 fest — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"]
        VS["<b>Verfassungsschutzbehörden des Bundes und der Länder</b><br/>geben Auskunft über relevante Tatsachen — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.2</a><br/>BfV stuft als Verdachtsfall oder gesichert extremistisch ein — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 V</a>"]
    end

    subgraph Weitere["Partei und Prüfer"]
        Partei["<b>Nahestehende Partei</b><br/>kann nur eine Stiftung anerkennen — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a><br/>mind. 3 Wahlperioden in Fraktionsstärke im Bundestag — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II</a><br/>nicht von der Parteienfinanzierung ausgeschlossen — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III</a>"]
        WP["<b>Unabhängige Wirtschaftsprüfungsgesellschaft</b><br/>prüft die Wirtschaftsführung — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>"]
    end

    BMF -->|"Einvernehmen — <a href='{{ELI}}#art-z3_abs-z7' target='_blank' rel='noopener'>§3 VII</a>"| OBB
    OBB -->|"überträgt Aufgaben — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"| BOB
    OBB <-->|"Datenübermittlung — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"| BMI
    BMI -->|"Erkundigung — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>"| VS
    OBB -->|"fördert auf Antrag, beendet — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"| Stiftung
    BMI -->|"Feststellungen — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"| Stiftung
    VS -->|"Einstufung — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 V</a>"| Stiftung
    Partei -->|"erkennt an — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"| Stiftung
    Stiftung -->|"lässt Wirtschaftsführung prüfen — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>"| WP

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class Stiftung zentral
    class BOB,VS behoerde
    class Partei,WP privat
    class BMF,OBB,BMI parlament
`;export{e as default};