var e=`flowchart TD
    START["Streitwert ist weder eine<br/>bestimmte Geldsumme noch<br/>gesetzlich fest bestimmt"]

    START --> ANGABE["Antragsteller gibt den<br/>Streitwert bei Einreichung<br/>schriftlich oder zu Protokoll<br/>an — <a href='{{ELI}}/art-z61' target='_blank' rel='noopener'>§61</a>"]

    ANGABE --> ZUSTAENDIGKEIT{"Wurde der Streitwert bereits<br/>für die Zuständigkeit des<br/>Prozessgerichts oder die<br/>Zulässigkeit des Rechtsmittels<br/>festgesetzt? (nicht in<br/>Arbeitsgerichtssachen)<br/>— <a href='{{ELI}}/art-z62' target='_blank' rel='noopener'>§62</a>"}

    ZUSTAENDIGKEIT -->|Ja| MASSGEBLICH["Diese Festsetzung ist auch<br/>für die Gebührenberechnung<br/>maßgebend, soweit die Wert-<br/>vorschriften nicht abweichen<br/>— <a href='{{ELI}}/art-z62' target='_blank' rel='noopener'>§62 S.1</a>"]

    ZUSTAENDIGKEIT -->|Nein| VORLAEUFIG{"Ist die streitwertabhängige<br/>Gebühr bereits mit Einreichung<br/>der Klage-/Antragsschrift fällig<br/>und kein fester Wert bestimmt?<br/>(nicht in der Finanzgerichts-<br/>barkeit) — <a href='{{ELI}}#art-z63_abs-z1' target='_blank' rel='noopener'>§63 I</a>"}

    VORLAEUFIG -->|Ja| VORLAEUFIGE_FESTSETZUNG["Gericht setzt den Wert sogleich<br/>vorläufig durch Beschluss fest<br/>— ohne Anhörung der Parteien<br/>— <a href='{{ELI}}#art-z63_abs-z1' target='_blank' rel='noopener'>§63 I S.1</a>"]
    VORLAEUFIG -->|Nein| ENDGUELTIG

    VORLAEUFIGE_FESTSETZUNG --> SCHAETZUNG{"Ist eine Abschätzung durch<br/>Sachverständige erforderlich?<br/>— <a href='{{ELI}}/art-z64' target='_blank' rel='noopener'>§64</a>"}
    SCHAETZUNG -->|Ja| SCHAETZUNGSKOSTEN["Kosten der Abschätzung können<br/>der Partei auferlegt werden, die<br/>sie durch unterlassene/unrichtige<br/>Wertangabe, unbegründetes<br/>Bestreiten oder unbegründete<br/>Beschwerde veranlasst hat<br/>— <a href='{{ELI}}/art-z64' target='_blank' rel='noopener'>§64</a>"]
    SCHAETZUNG -->|Nein| ENDGUELTIG

    SCHAETZUNGSKOSTEN --> ENDGUELTIG["Nach Entscheidung über den<br/>gesamten Streitgegenstand oder<br/>anderweitiger Erledigung setzt<br/>das Prozessgericht den Wert<br/>für die Gebühren endgültig fest<br/>— <a href='{{ELI}}#art-z63_abs-z2' target='_blank' rel='noopener'>§63 II</a>"]

    MASSGEBLICH --> ENDGUELTIG_ABGESCHLOSSEN["Streitwertfestsetzung<br/>abgeschlossen"]
    ENDGUELTIG --> BESCHWERDESCHWELLE{"Übersteigt der Wert des<br/>Beschwerdegegenstands 300 Euro<br/>oder lässt das Gericht die<br/>Beschwerde wegen grundsätzlicher<br/>Bedeutung zu?<br/>— <a href='{{ELI}}#art-z68_abs-z1' target='_blank' rel='noopener'>§68 I S.1, S.2</a>"}

    BESCHWERDESCHWELLE -->|Nein| BINDEND["Festsetzung wird bindend,<br/>keine Beschwerde möglich"]
    BESCHWERDESCHWELLE -->|Ja| BESCHWERDEFRIST{"Wird die Beschwerde innerhalb<br/>der Frist des § 63 III S.2<br/>eingelegt?<br/>— <a href='{{ELI}}#art-z68_abs-z1' target='_blank' rel='noopener'>§68 I S.3</a>"}

    BESCHWERDEFRIST -->|Ja| BESCHWERDE_ZULAESSIG["Beschwerde ist zulässig,<br/>wird geprüft"]
    BESCHWERDEFRIST -->|Nein| WIEDEREINSETZUNG{"War der Beschwerdeführer<br/>unverschuldet an der<br/>Fristwahrung gehindert?<br/>— <a href='{{ELI}}#art-z68_abs-z2' target='_blank' rel='noopener'>§68 II</a>"}

    WIEDEREINSETZUNG -->|Ja| WIEDEREINSETZUNG_GEWAEHRT["Wiedereinsetzung wird gewährt,<br/>wenn Beschwerde binnen 2 Wochen<br/>nach Hindernisbeseitigung<br/>eingelegt wird<br/>— <a href='{{ELI}}#art-z68_abs-z2' target='_blank' rel='noopener'>§68 II</a>"]
    WIEDEREINSETZUNG -->|Nein| BESCHWERDE_UNZULAESSIG["Beschwerde ist unzulässig"]

    style BINDEND fill:#d4edda,stroke:#2d8a4a
    style BESCHWERDE_ZULAESSIG fill:#fff3cd,stroke:#c9a227
    style WIEDEREINSETZUNG_GEWAEHRT fill:#fff3cd,stroke:#c9a227
    style BESCHWERDE_UNZULAESSIG fill:#f8d7da,stroke:#c0392b
    style ENDGUELTIG_ABGESCHLOSSEN fill:#d4edda,stroke:#2d8a4a
`;export{e as default};