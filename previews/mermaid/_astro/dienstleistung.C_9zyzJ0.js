var e=`---
summary: "Der Ablauf, wenn Pflegefachpersonen aus einem anderen EU- oder EWR-Staat oder der Schweiz vorübergehend und gelegentlich in Deutschland tätig werden: Meldung, Prüfung durch die zuständige Behörde und Zusammenarbeit mit dem Niederlassungsstaat."
---
swimlane-beta TD
    subgraph DL["Dienstleistungserbringende Person"]
        start(["Will vorübergehend und gelegentlich in<br/>Deutschland tätig werden: Staatsangehörige<br/>von EU, EWR oder Schweiz, dort berechtigt und<br/>rechtmäßig niedergelassen — <a href='{{ELI}}#art-z44_abs-z1' target='_blank' rel='noopener'>§44 I S.1</a>"])
        meldung["Meldet vorher schriftlich (bei Dringlichkeit<br/>unverzüglich danach) — <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 I S.1</a>, <a href='{{ELI}}#art-z46_abs-z3' target='_blank' rel='noopener'>§46 III</a>;<br/>legt bei Erstmeldung Nachweise vor:<br/>Staatsangehörigkeit, Berufsqualifikation,<br/>Niederlassung ohne Untersagung und<br/>Vorstrafen, Erklärung zu Deutschkenntnissen<br/>— <a href='{{ELI}}#art-z46_abs-z2' target='_blank' rel='noopener'>§46 II</a>"]
        ausuebung["Übt den Beruf ohne Erlaubnis aus, führt<br/>die Berufsbezeichnung, darf vorbehaltene<br/>Aufgaben übernehmen — <a href='{{ELI}}#art-z44_abs-z1' target='_blank' rel='noopener'>§44 I S.2</a>;<br/>gleiche Rechte und Pflichten — <a href='{{ELI}}#art-z45_abs-z' target='_blank' rel='noopener'>§45</a>;<br/>Meldung jährlich erneuern (mit Europäischem<br/>Berufsausweis nach 18 Monaten) — <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 I S.2-3</a>"]
    end

    subgraph ZB["Zuständige Behörde (Land der Dienstleistung)"]
        eingang["Nimmt die Meldung entgegen und fordert<br/>die Nachweise nach §46 II an — <a href='{{ELI}}#art-z52_abs-z3' target='_blank' rel='noopener'>§52 III</a>"]
        zweifel{"Berechtigte Zweifel?<br/>— <a href='{{ELI}}#art-z48_abs-z2' target='_blank' rel='noopener'>§48 II</a>"}
        berechtigt{"Berechtigung besteht?<br/>Vorübergehend und<br/>gelegentlich — <a href='{{ELI}}#art-z44_abs-z2' target='_blank' rel='noopener'>§44 II</a>;<br/>kein Rücknahme- oder<br/>Widerrufsgrund — <a href='{{ELI}}#art-z44_abs-z3' target='_blank' rel='noopener'>§44 III</a>"}
        keine(["Keine Berechtigung zur<br/>Dienstleistungserbringung — <a href='{{ELI}}/art-z44' target='_blank' rel='noopener'>§44</a>"])
        unterricht["Unterrichtet unverzüglich die Behörde<br/>des Niederlassungsstaats — <a href='{{ELI}}#art-z48_abs-z1' target='_blank' rel='noopener'>§48 I</a>"]
    end

    subgraph NS["Behörde des Niederlassungsstaats"]
        auskunft["Übermittelt Informationen zur<br/>Rechtmäßigkeit der Niederlassung und zu<br/>berufsbezogenen Sanktionen — <a href='{{ELI}}#art-z48_abs-z2' target='_blank' rel='noopener'>§48 II</a>"]
        erhalt("Unterrichtung über den Verstoß")
    end

    start --> meldung
    meldung --> eingang
    eingang --> zweifel
    zweifel -->|"Ja: fordert<br/>Informationen an"| auskunft
    zweifel -->|Nein| berechtigt
    auskunft --> berechtigt
    berechtigt -->|Ja| ausuebung
    berechtigt -->|Nein| keine
    ausuebung -.->|"bei Verstoß gegen<br/>Pflichten nach §45"| unterricht
    unterricht --> erhalt

    style keine fill:#f8d7da,stroke:#c0392b
    style ausuebung fill:#d4edda,stroke:#2d8a4a
`;export{e as default};