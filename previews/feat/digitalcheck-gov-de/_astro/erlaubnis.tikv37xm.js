var e=`---
summary: "Die Voraussetzungen der Erlaubnis zum Führen der Berufsbezeichnung „Pflegefachfrau“ oder „Pflegefachmann“ und wann die Erlaubnis zurückgenommen, widerrufen oder ihr Ruhen angeordnet wird."
---
flowchart TD
    start(["Antrag auf Erlaubnis zum Führen der<br/>Berufsbezeichnung — <a href='{{ELI}}#art-z1_abs-z' target='_blank' rel='noopener'>§1 S.1</a>, <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>; Entscheidung<br/>durch die Behörde des Landes, in dem die<br/>Prüfung abgelegt wurde — <a href='{{ELI}}#art-z52_abs-z1' target='_blank' rel='noopener'>§52 I</a>"])
    nr1{"Ausbildung absolviert,<br/>staatliche Abschlussprüfung<br/>bestanden?<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr.1</a>"}
    nr2{"Kein Verhalten, aus dem<br/>sich Unzuverlässigkeit<br/>ergibt? — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr.2</a>"}
    nr3{"Gesundheitlich zur<br/>Berufsausübung geeignet?<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr.3</a>"}
    nr4{"Erforderliche Kenntnisse<br/>der deutschen Sprache?<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2 Nr.4</a>"}
    versagt(["Erlaubnis wird nicht erteilt — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"])
    erteilt["Erlaubnis wird erteilt: Führen der<br/>Berufsbezeichnung „Pflegefachfrau“ oder<br/>„Pflegefachmann“, nach hochschulischer<br/>Ausbildung mit akademischem Grad — <a href='{{ELI}}#art-z1_abs-z' target='_blank' rel='noopener'>§1</a>"]
    r1{"Bei Erteilung fehlte §2<br/>Nr.1 oder Nr.2 oder war<br/>die Ausbildung nach §§40-42<br/>nicht abgeschlossen?<br/>— <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.1</a>"}
    r2{"Bei Erteilung fehlte<br/>§2 Nr.3 oder Nr.4?<br/>— <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.2</a>"}
    w1{"Nachträglich bekannt:<br/>§2 Nr.2 nicht erfüllt?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II S.1</a>"}
    w2{"§2 Nr.3 nachträglich<br/>weggefallen?<br/>— <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II S.2</a>"}
    ruhen{"Strafverfahren wegen<br/>berufsrelevanter Straftat,<br/>vorübergehend ungeeignet<br/>oder ärztliche Untersuchung<br/>trotz Zweifeln verweigert?<br/>— <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III S.1</a>"}
    ruecknahme(["Rücknahme der Erlaubnis — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>"])
    widerruf(["Widerruf der Erlaubnis — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a>"])
    ruht(["Ruhen kann angeordnet werden;<br/>Aufhebung, wenn die Voraussetzungen<br/>entfallen — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III</a>"])
    bleibt(["Erlaubnis bleibt bestehen"])
    hinweisErteilt["Pflegeprozessverantwortung: vorbehaltene<br/>Aufgaben nur mit Erlaubnis — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>;<br/>Führen der Bezeichnung ohne Erlaubnis ist<br/>ordnungswidrig — <a href='{{ELI}}#art-z57_abs-z1' target='_blank' rel='noopener'>§57 I Nr.1</a>"]
    hinweisRuhen["Während des Ruhens keine vorbehaltenen<br/>Aufgaben — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I S.2</a>"]
    hinweisEU["Unterrichtung des Herkunftsmitgliedstaats<br/>— <a href='{{ELI}}#art-z50_abs-z1' target='_blank' rel='noopener'>§50 I</a>; Warnmitteilung an die anderen<br/>Staaten über IMI, sobald sofort vollziehbar<br/>oder unanfechtbar — <a href='{{ELI}}#art-z51_abs-z1' target='_blank' rel='noopener'>§51 I Nr.1</a>"]

    start --> nr1
    nr1 -->|Ja| nr2
    nr1 -->|Nein| versagt
    nr2 -->|Ja| nr3
    nr2 -->|Nein| versagt
    nr3 -->|Ja| nr4
    nr3 -->|Nein| versagt
    nr4 -->|Ja| erteilt
    nr4 -->|Nein| versagt
    erteilt --> r1
    r1 -->|"Ja: ist zurückzunehmen"| ruecknahme
    r1 -->|Nein| r2
    r2 -->|"Ja: kann zurückgenommen werden"| ruecknahme
    r2 -->|Nein| w1
    w1 -->|"Ja: ist zu widerrufen"| widerruf
    w1 -->|Nein| w2
    w2 -->|"Ja: kann widerrufen werden"| widerruf
    w2 -->|Nein| ruhen
    ruhen -->|Ja| ruht
    ruhen -->|Nein| bleibt
    erteilt -.- hinweisErteilt
    ruht -.- hinweisRuhen
    ruecknahme -.- hinweisEU
    widerruf -.- hinweisEU

    style erteilt fill:#d4edda,stroke:#2d8a4a
    style bleibt fill:#d4edda,stroke:#2d8a4a
    style versagt fill:#f8d7da,stroke:#c0392b
    style ruecknahme fill:#f8d7da,stroke:#c0392b
    style widerruf fill:#f8d7da,stroke:#c0392b
    style ruht fill:#fff3cd,stroke:#c9a227
    style hinweisErteilt fill:#f5f5f5,stroke:#999
    style hinweisRuhen fill:#f5f5f5,stroke:#999
    style hinweisEU fill:#f5f5f5,stroke:#999
`;export{e as default};