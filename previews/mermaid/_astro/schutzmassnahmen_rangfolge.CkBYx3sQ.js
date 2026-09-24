var e=`---
summary: "Zeigt die mutterschutzrechtliche Gefährdungsbeurteilung des Arbeitgebers und die zwingende Rangfolge der Schutzmaßnahmen: Umgestaltung der Arbeitsbedingungen, Wechsel an einen anderen geeigneten Arbeitsplatz und als letztes Mittel das betriebliche Beschäftigungsverbot."
---
flowchart TD
    start(["Arbeitgeber beurteilt im Rahmen von §5<br/>ArbSchG jede Tätigkeit — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I S.1</a>"])
    regel{"Tätigkeit laut<br/>veröffentlichter Regel des<br/>Ausschusses für Mutterschutz<br/>für schwangere oder stillende<br/>Frauen unzulässig? — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I S.3</a>"}
    beurteilung["Gefährdungen nach Art, Ausmaß und Dauer<br/>beurteilen und ermitteln, ob<br/>voraussichtlich keine Schutzmaßnahmen,<br/>eine Umgestaltung oder keine Fortführung<br/>am Arbeitsplatz nötig ist<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I S.1 Nr.1, 2</a>"]
    doku["Ergebnis dokumentieren — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a> und alle<br/>Beschäftigten informieren — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>"]
    mitteilung("Frau teilt Schwangerschaft oder Stillen<br/>mit — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a>")
    festlegen["Unverzüglich erforderliche<br/>Schutzmaßnahmen festlegen und Gespräch<br/>über weitere Anpassungen anbieten<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 II</a>"]
    gefaehrdung{"Unverantwortbare Gefährdung<br/>nach <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>,<br/><a href='{{ELI}}/art-z11' target='_blank' rel='noopener'>§11</a> oder <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a><br/>festgestellt? — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a>"}
    stufe1["Stufe 1: Arbeitsbedingungen durch<br/>Schutzmaßnahmen umgestalten — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I Nr.1</a>"]
    ausgeschlossen{"Gefährdung dadurch<br/>ausgeschlossen und<br/>Umgestaltung ohne nachweislich<br/>unverhältnismäßigen Aufwand<br/>zumutbar? — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I Nr.2</a>"}
    stufe2{"Stufe 2: Anderer geeigneter<br/>Arbeitsplatz verfügbar und für<br/>die Frau zumutbar?<br/>— <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I Nr.2</a>"}
    fortfuehrung(["Fortführung der Tätigkeit ermöglichen<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I S.3</a>;<br/>Maßnahmen auf Wirksamkeit prüfen und<br/>anpassen — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I S.2</a>"])
    wechsel(["Einsatz an einem anderen geeigneten<br/>Arbeitsplatz — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I Nr.2</a>"])
    verbot(["Stufe 3: Betriebliches<br/>Beschäftigungsverbot — Frau darf nicht<br/>weiter beschäftigt werden — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I Nr.3</a>"])

    hinweisTaetigkeit["Nur Tätigkeiten, für die die<br/>Schutzmaßnahmen getroffen sind<br/>— <a href='{{ELI}}#art-z10_abs-z3' target='_blank' rel='noopener'>§10 III</a>;<br/>Information der Frau — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III</a>"]
    hinweisKatalog["Beispiele unzulässiger Tätigkeiten:<br/>Gefahrstoffe, Biostoffe, physikalische<br/>Einwirkungen, Akkord- und Fließarbeit<br/>— <a href='{{ELI}}/art-z11' target='_blank' rel='noopener'>§11</a><br/>(schwanger), <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a><br/>(stillend)"]
    hinweisLohn["Mutterschutzlohn — <a href='{{ELI}}#art-z18_abs-z' target='_blank' rel='noopener'>§18</a>; Recht auf<br/>vertragsgemäße Beschäftigung nach dem<br/>Ende des Verbots — <a href='{{ELI}}#art-z25_abs-z' target='_blank' rel='noopener'>§25</a>"]
    hinweisBehoerde["Aufsichtsbehörde kann Schutzmaßnahmen<br/>anordnen und Tätigkeiten verbieten<br/>— <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>§29 III S.2 Nr.5, 7</a>"]

    start --> regel
    regel -->|"Ja: Beurteilung entfällt,<br/>Tätigkeit unzulässig"| mitteilung
    regel -->|Nein| beurteilung
    beurteilung --> doku
    doku --> mitteilung
    mitteilung --> festlegen
    festlegen --> gefaehrdung
    gefaehrdung -->|Nein| fortfuehrung
    gefaehrdung -->|Ja| stufe1
    stufe1 --> ausgeschlossen
    ausgeschlossen -->|Ja| fortfuehrung
    ausgeschlossen -->|Nein| stufe2
    stufe2 -->|Ja| wechsel
    stufe2 -->|Nein| verbot

    festlegen -.- hinweisTaetigkeit
    gefaehrdung -.- hinweisKatalog
    verbot -.- hinweisLohn
    stufe1 -.- hinweisBehoerde

    style fortfuehrung fill:#d4edda,stroke:#2d8a4a
    style wechsel fill:#d4edda,stroke:#2d8a4a
    style verbot fill:#f8d7da,stroke:#c0392b
    style hinweisTaetigkeit fill:#f5f5f5,stroke:#999
    style hinweisKatalog fill:#f5f5f5,stroke:#999
    style hinweisLohn fill:#f5f5f5,stroke:#999
    style hinweisBehoerde fill:#f5f5f5,stroke:#999
`;export{e as default};