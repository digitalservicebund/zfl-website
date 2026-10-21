var e=`---
summary: "Die Rücknahme und der Widerruf von Zuwendungsbescheiden nach dem StiftFinG und wann die Förderung einer politischen Stiftung im Folgejahr um den aufgehobenen Betrag zu mindern ist."
---
flowchart TD
    START(["Zuwendungsbescheid auf Antrag nach<br/>§3 I S.1 liegt vor — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"]) --> Q1{"Rücknahme- oder<br/>Widerrufsgrund nach<br/>§§48-49a VwVfG?<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"}

    Q1 -->|Nein| BLEIBT["Bescheid bleibt bestehen"]
    Q1 -->|Ja| AUF["Rücknahme oder Widerruf durch die<br/>zuständige oberste Bundesbehörde im<br/>Einvernehmen mit dem BMI — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.3</a>"]

    AUF --> Q2{"Teilweise aufgehoben, weil<br/>einzelne Maßnahmen §2 IV<br/>oder V nicht erfüllen?<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.1</a>"}
    Q2 -->|Nein| VWVFG["Folgen richten sich allein nach dem<br/>VwVfG — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"]
    Q2 -->|Ja| Q3{"Führt der Umstand zur<br/>Feststellung einer<br/>Beendigung nach<br/>§4 I Nr. 2? — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.1</a>"}

    Q3 -->|Ja| ENDE["Förderung endet; erneute Förderung in<br/>der laufenden Wahlperiode<br/>ausgeschlossen — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"]
    Q3 -->|Nein| MIN["Förderung im Haushaltsjahr nach<br/>Bestandskraft des Bescheids um den<br/>aufgehobenen Betrag gemindert<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.1</a>"]
    MIN -.- H1["Förderung der anderen politischen<br/>Stiftungen bleibt unberührt — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.2</a>"]

    style BLEIBT fill:#d4edda,stroke:#2d8a4a
    style VWVFG fill:#fff3cd,stroke:#c9a227
    style MIN fill:#f8d7da,stroke:#c0392b
    style ENDE fill:#f8d7da,stroke:#c0392b
    style H1 fill:#f5f5f5,stroke:#999
`;export{e as default};