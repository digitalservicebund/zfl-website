var e=`---
summary: "Die Anerkennung einer im Ausland abgeschlossenen Pflegeausbildung nach dem PflBG: automatische Anerkennung von Nachweisen aus EU, EWR und Schweiz, Gleichwertigkeitsprüfung und Ausgleichsmaßnahmen bei wesentlichen Unterschieden bis zur Erteilung der Erlaubnis."
---
flowchart TD
    start(["Antrag auf Erlaubnis zum Führen der<br/>Berufsbezeichnung mit einer im Ausland<br/>abgeschlossenen Ausbildung; Gleichwertigkeit<br/>wird zuerst geprüft — <a href='{{ELI}}#art-z43_abs-z' target='_blank' rel='noopener'>§43 S.1</a>"])
    herkunft{"Ausbildungsnachweis aus<br/>EU, EWR oder Schweiz?<br/>— <a href='{{ELI}}#art-z41_abs-z1' target='_blank' rel='noopener'>§41 I</a>"}
    anhang{"Mindestanforderungen<br/>Art. 31 RL 2005/36/EG<br/>erfüllt, Nachweis nach<br/>Anhang V Nr. 5.2.2 nach<br/>dem Stichtag? — <a href='{{ELI}}#art-z41_abs-z1' target='_blank' rel='noopener'>§41 I</a>"}
    sonder{"Sonderfall erworbener<br/>Rechte, z.B. ältere Nachweise<br/>mit 3 Jahren Berufspraxis<br/>in den letzten 5 Jahren?<br/>— <a href='{{ELI}}/art-z42' target='_blank' rel='noopener'>§42 I-IV</a>"}
    dritt{"Drittstaatsnachweis, der<br/>in EU, EWR oder Schweiz<br/>anerkannt wurde?<br/>— <a href='{{ELI}}#art-z41_abs-z2' target='_blank' rel='noopener'>§41 II</a>"}
    verzicht{"Verzicht auf die<br/>Gleichwertigkeitsprüfung?<br/>— <a href='{{ELI}}#art-z40_abs-z3a' target='_blank' rel='noopener'>§40 IIIa</a>"}
    gwDritt{"Ausbildungsstand<br/>gleichwertig?<br/>— <a href='{{ELI}}#art-z40_abs-z2' target='_blank' rel='noopener'>§40 II</a>"}
    gwEU{"Wesentliche Unterschiede<br/>festgestellt? — <a href='{{ELI}}#art-z41_abs-z2' target='_blank' rel='noopener'>§41 II</a><br/>i.V.m. §40 II"}
    niveau{"Nachweis nur auf Niveau<br/>Art. 11 a RL 2005/36/EG?<br/>— <a href='{{ELI}}#art-z41_abs-z3' target='_blank' rel='noopener'>§41 III</a>"}
    kenntnis["Nachweis eines gleichwertigen Kenntnisstands<br/>nach Wahl: Kenntnisprüfung über den Inhalt<br/>der staatlichen Abschlussprüfung oder<br/>Anpassungslehrgang (höchstens 3 Jahre,<br/>mit Prüfung) — <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III S.2-3</a>"]
    wahlEU["Ausgleichsmaßnahme nach Wahl:<br/>Anpassungslehrgang (höchstens 3 Jahre)<br/>oder Eignungsprüfung, jeweils zu den<br/>wesentlichen Unterschieden — <a href='{{ELI}}#art-z41_abs-z2' target='_blank' rel='noopener'>§41 II S.2-3</a>"]
    eignung["Ausgleichsmaßnahme: Eignungsprüfung<br/>— <a href='{{ELI}}#art-z41_abs-z3' target='_blank' rel='noopener'>§41 III</a>"]
    nr1["Voraussetzung nach §2 Nr.1 erfüllt<br/>— <a href='{{ELI}}#art-z40_abs-z1' target='_blank' rel='noopener'>§40 I</a>, <a href='{{ELI}}#art-z41_abs-z1' target='_blank' rel='noopener'>§41 I</a>"]
    pruef{"Voraussetzungen<br/>nach §2 Nr.2-4 erfüllt?<br/>— <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"}
    erteilt(["Erlaubnis zum Führen der<br/>Berufsbezeichnung wird erteilt — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"])
    versagt(["Erlaubnis wird nicht erteilt — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"])
    hinweisWU["Wesentliche Unterschiede: abweichende<br/>Themen- oder Praxisbereiche oder im<br/>Herkunftsstaat fehlende reglementierte<br/>Tätigkeiten, nicht ausgeglichen durch<br/>Berufspraxis oder formell anerkanntes<br/>lebenslanges Lernen — <a href='{{ELI}}#art-z40_abs-z2' target='_blank' rel='noopener'>§40 II S.2-3</a>;<br/>Mustergutachten der Gutachtenstelle für<br/>Gesundheitsberufe berücksichtigen — <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III S.4</a>"]
    bescheid["Auf Antrag gesonderter Bescheid über die<br/>Feststellung der Berufsqualifikation — <a href='{{ELI}}#art-z43_abs-z' target='_blank' rel='noopener'>§43 S.2</a>"]

    start --> herkunft
    herkunft -->|Ja| anhang
    herkunft -->|Nein| dritt
    anhang -->|"Ja: automatische<br/>Anerkennung"| nr1
    anhang -->|Nein| sonder
    sonder -->|"Ja: Erlaubnis ist bei<br/>§2 Nr.2-4 zu erteilen"| pruef
    sonder -->|"Nein, oder nur Berufspraxis<br/>zu kurz — <a href='{{ELI}}#art-z42_abs-z5' target='_blank' rel='noopener'>§42 V</a>"| gwEU
    dritt -->|Ja| gwEU
    dritt -->|Nein| verzicht
    verzicht -->|Ja| kenntnis
    verzicht -->|Nein| gwDritt
    gwDritt -->|Ja| nr1
    gwDritt -->|"Nein, oder nur mit unangemessenem<br/>Aufwand feststellbar — <a href='{{ELI}}#art-z40_abs-z3' target='_blank' rel='noopener'>§40 III S.1</a>"| kenntnis
    gwEU -->|Nein| nr1
    gwEU -->|Ja| niveau
    niveau -->|Nein| wahlEU
    niveau -->|Ja| eignung
    kenntnis -->|erfolgreich| nr1
    wahlEU -->|erfolgreich| nr1
    eignung -->|erfolgreich| nr1
    nr1 --> pruef
    pruef -->|Ja| erteilt
    pruef -->|Nein| versagt
    gwDritt -.- hinweisWU
    nr1 -.- bescheid

    style erteilt fill:#d4edda,stroke:#2d8a4a
    style versagt fill:#f8d7da,stroke:#c0392b
    style kenntnis fill:#fff3cd,stroke:#c9a227
    style wahlEU fill:#fff3cd,stroke:#c9a227
    style eignung fill:#fff3cd,stroke:#c9a227
    style hinweisWU fill:#f5f5f5,stroke:#999
    style bescheid fill:#f5f5f5,stroke:#999
`;export{e as default};