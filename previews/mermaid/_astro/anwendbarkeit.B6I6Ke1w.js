var e=`---
summary: "Die Prüfung, ob eine Anlage, z.B. ein Krankenhaus im Sektor Gesundheitswesen, nach dem KRITIS-Dachgesetz als kritische Anlage gilt und welche Pflichten ihren Betreiber dann treffen: Sektor, kritische Dienstleistung, Schwellenwert oder Feststellung im Einzelfall, Sektorausnahmen und Ausnahmebescheid."
---
flowchart TD
    START(["Person oder Organisation mit<br/>bestimmendem Einfluss auf eine Anlage,<br/>z.B. ein Krankenhaus — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr. 1, 2</a>"])
    START -.- HSW["Software und IT-Dienste ohne Bezug zu<br/>physischen Prozessen: nur BSI-Gesetz<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr. 2</a>"]

    START --> F1{"Anlage gehört zu einem der<br/>zehn Sektoren, z.B.<br/>Gesundheitswesen? — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"}
    F1 -->|Nein| NEIN(["Kein Betreiber kritischer Anlagen:<br/>KRITIS-Dachgesetz gilt nicht"])
    F1 -->|Ja| F2{"Dient sie einer kritischen<br/>Dienstleistung aus der<br/>Rechtsverordnung des BMI?<br/>— <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 III</a>"}
    F2 -->|Nein| NEIN
    F2 -->|Ja| F3{"Anlagenkategorie und<br/>Schwellenwert zum<br/>Versorgungsgrad der<br/>Rechtsverordnung erreicht?<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.1 Nr. 1, 2, 4</a>"}
    F3 -.- HSW2["Regelwert: 500 000 von der Anlage zu<br/>versorgende Einwohner — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.2</a>;<br/>manche Kategorien gelten unabhängig<br/>vom Schwellenwert — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.1 Nr. 4</a>"]

    F3 -->|Ja| F4{"Stellt das BMI im Einzelfall<br/>fest, dass sie trotzdem<br/>nicht erheblich ist?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.2</a>"}
    F3 -->|Nein| F5{"Erheblichkeit im Einzelfall<br/>festgestellt: durch das BMI<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III S.1</a> oder<br/>durch das Land — <a href='{{ELI}}#art-z5_abs-z7' target='_blank' rel='noopener'>§5 VII</a>?"}
    F5 -.- HFS["Vorschläge der zuständigen Behörden;<br/>Feststellung des BMI im Einvernehmen mit<br/>dem Bundesressort bzw. im Benehmen mit<br/>dem Landesministerium — <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 IV</a>;<br/>Mitteilung an den Betreiber durch das<br/>BBK — <a href='{{ELI}}#art-z5_abs-z5' target='_blank' rel='noopener'>§5 V</a>"]

    F4 -->|Ja| NEIN
    F4 -->|Nein| KRIT["Anlage ist kritische Anlage<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr. 3</a>"]
    F5 -->|Ja| KRIT
    F5 -->|Nein| NEIN

    KRIT --> F6{"Ausnahmebescheid des BMI<br/>(nationale Sicherheit,<br/>Verteidigung, Strafverfolgung)?<br/>— <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22 I</a>"}
    F6 -->|"Ja: erweitert"| BEFREIT(["Insgesamt von den Pflichten befreit<br/>— <a href='{{ELI}}#art-z22_abs-z3' target='_blank' rel='noopener'>§22 III</a>"])
    F6 -->|"Ja: einfach"| TEIL["Für diese Tätigkeiten von §§12, 13, 18<br/>befreit — <a href='{{ELI}}#art-z22_abs-z2' target='_blank' rel='noopener'>§22 II</a>"]
    F6 -->|Nein| F7{"Sektor Finanzwesen (DORA),<br/>IT und TK, Sozialversicherung<br/>oder Siedlungsabfall?<br/>— <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"}
    TEIL --> F7
    F7 -->|Ja| EINGESCHR(["Pflichten nur eingeschränkt: u.a. §§9, 10,<br/>12-16, 18, 20 gelten nicht (§12 gilt für<br/>Sozialversicherung und Siedlungsabfall),<br/>Registrierung nach §8 bleibt — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"])
    F7 -->|"Nein, z.B.<br/>Gesundheitswesen"| PFLICHT(["Betreiber kritischer Anlagen mit allen<br/>Pflichten: Registrierung binnen 3 Monaten<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>; Risikoanalyse ab 9,<br/>Resilienzmaßnahmen, Meldewesen und<br/>Geschäftsleitungspflichten ab 10 Monaten<br/>nach Registrierung — <a href='{{ELI}}#art-z8_abs-z7' target='_blank' rel='noopener'>§8 VII</a>"])

    style NEIN fill:#f8d7da,stroke:#c0392b
    style BEFREIT fill:#f8d7da,stroke:#c0392b
    style TEIL fill:#fff3cd,stroke:#c9a227
    style EINGESCHR fill:#fff3cd,stroke:#c9a227
    style PFLICHT fill:#d4edda,stroke:#2d8a4a
    style HSW fill:#f5f5f5,stroke:#999
    style HSW2 fill:#f5f5f5,stroke:#999
    style HFS fill:#f5f5f5,stroke:#999
`;export{e as default};