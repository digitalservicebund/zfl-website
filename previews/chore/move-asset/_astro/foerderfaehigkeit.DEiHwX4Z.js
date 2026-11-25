var e=`---
summary: "Unter welchen Voraussetzungen eine politische Stiftung nach dem StiftFinG dem Grunde nach aus dem Bundeshaushalt förderfähig ist und wann eine Förderung für die laufende Wahlperiode ausgeschlossen ist."
---
flowchart TD
    START(["Antrag einer Stiftung auf Förderung aus<br/>dem Bundeshaushalt — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>"]) --> BMI["Prüfung und Feststellung durch das<br/>Bundesministerium des Innern — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"]

    BMI --> Q1{"Von der nahestehenden<br/>Partei im gegenseitigen<br/>Einvernehmen anerkannt?<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"}
    Q1 -.- H1["Eine Partei kann nur eine Stiftung<br/>anerkennen — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2</a><br/>Sechs bereits geförderte Stiftungen<br/>gelten als anerkannt — <a href='{{ELI}}#art-z9_abs-z' target='_blank' rel='noopener'>§9</a>"]
    Q1 -->|Nein| NF
    Q1 -->|Ja| Q2{"Partei mind. in der 3.<br/>Wahlperiode in Folge in<br/>Fraktionsstärke im<br/>Bundestag? — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.1</a>"}

    Q2 -->|Nein| Q2B{"Stiftung schon 2 Wahlperioden<br/>in Folge gefördert und Partei<br/>nur 1 Wahlperiode nicht<br/>im Bundestag?<br/>— <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.2</a>"}
    Q2B -->|Nein| NF
    Q2B -->|Ja| Q3
    Q2 -->|Ja| Q3{"Partei von der staatlichen<br/>Parteienfinanzierung<br/>ausgeschlossen? — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III</a>"}

    Q3 -->|Ja| NF["Nicht förderfähig — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a>"]
    Q3 -->|Nein| Q4{"Bietet die Stiftung in einer<br/>Gesamtschau Gewähr für<br/>aktives Eintreten für FDGO<br/>und Völkerverständigung?<br/>— <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 IV S.1</a>"}
    Q4 -.- H4["Gegen die Gewähr können v.a. sprechen:<br/>bisherige Stiftungsarbeit, Veröffentlichungen,<br/>einflussreiche Personen mit Verdacht auf<br/>verfassungsfeindliche Bestrebungen,<br/>verfassungsfeindlich geprägte politische<br/>Grundströmung — <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 IV S.2</a>"]

    Q4 -->|Nein| AUS["Antrag abgelehnt, Förderung für die<br/>laufende Wahlperiode ausgeschlossen<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a>"]
    Q4 -->|Ja| Q5{"Auf Beseitigung von<br/>Verfassungsgrundsätzen<br/>(§4 II BVerfSchG)<br/>ausgerichtet? — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 V S.1</a>"}
    Q5 -.- H5["In der Regel anzunehmen bei Einstufung<br/>durch das BfV als Verdachtsfall oder<br/>gesichert extremistisch — <a href='{{ELI}}#art-z2_abs-z5' target='_blank' rel='noopener'>§2 V S.2</a>"]
    Q5 -->|Ja| AUS
    Q5 -->|Nein| OK["Dem Grunde nach förderfähig — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a>"]

    style OK fill:#d4edda,stroke:#2d8a4a
    style NF fill:#f8d7da,stroke:#c0392b
    style AUS fill:#f8d7da,stroke:#c0392b
    style H1 fill:#f5f5f5,stroke:#999
    style H4 fill:#f5f5f5,stroke:#999
    style H5 fill:#f5f5f5,stroke:#999
`;export{e as default};