var e=`---
summary: "Zeigt das Verfahren vor der Einigungsstelle: wann sie auf Antrag einer Seite oder nur mit Einverständnis beider Seiten tätig wird, ihre Bildung mit Hilfe des Arbeitsgerichts, die zweistufige Abstimmung und die Wirkung und gerichtliche Überprüfung ihres Spruchs."
---
swimlane-beta TD
    subgraph ArbG["Arbeitsgericht"]
        bestellung(["Bestellt den Vorsitzenden bzw.<br/>entscheidet über die Zahl<br/>der Beisitzer — <a href='{{ELI}}#art-z76_abs-z2' target='_blank' rel='noopener'>§76 II S.2-3</a>"])
        kontrolle(["Überprüfung, ob die Grenzen<br/>des Ermessens überschritten<br/>sind — <a href='{{ELI}}#art-z76_abs-z5' target='_blank' rel='noopener'>§76 V S.4</a>"])
    end

    subgraph Parteien["Arbeitgeber und Betriebsrat"]
        start(["Meinungsverschiedenheit zwischen<br/>AG und BR, Gesamt- oder<br/>Konzernbetriebsrat — <a href='{{ELI}}#art-z76_abs-z1' target='_blank' rel='noopener'>§76 I S.1</a>"])
        ersetzend{"Ersetzt der Spruch kraft Gesetzes<br/>die Einigung (z.B. <a href='{{ELI}}#art-z87_abs-z2' target='_blank' rel='noopener'>§87 II</a>,<br/><a href='{{ELI}}#art-z112_abs-z4' target='_blank' rel='noopener'>§112 IV</a>)? — <a href='{{ELI}}#art-z76_abs-z5' target='_blank' rel='noopener'>§76 V S.1</a>"}
        beide{"Beantragen beide Seiten das<br/>Tätigwerden oder sind damit<br/>einverstanden? — <a href='{{ELI}}#art-z76_abs-z6' target='_blank' rel='noopener'>§76 VI S.1</a>"}
        keineESt(["Einigungsstelle wird<br/>nicht tätig — <a href='{{ELI}}#art-z76_abs-z6' target='_blank' rel='noopener'>§76 VI S.1</a>"])
        bildung["Bildung: je gleich viele Beisitzer von<br/>AG und BR, unparteiischer Vorsitzender<br/>nach Einigung beider Seiten — <a href='{{ELI}}#art-z76_abs-z2' target='_blank' rel='noopener'>§76 II S.1</a><br/>(Kosten trägt der AG — <a href='{{ELI}}#art-z76a_abs-z1' target='_blank' rel='noopener'>§76a I</a>)"]
        wirkung{"Spruch bindend? Erzwingbares Verfahren<br/>oder Spruch im Voraus unterworfen bzw.<br/>nachträglich angenommen — <a href='{{ELI}}#art-z76_abs-z5' target='_blank' rel='noopener'>§76 V</a>, <a href='{{ELI}}#art-z76_abs-z6' target='_blank' rel='noopener'>§76 VI S.2</a>"}
        bindend(["Spruch ersetzt die Einigung<br/>zwischen AG und BR<br/>(anderweitiger Rechtsweg bleibt<br/>offen — <a href='{{ELI}}#art-z76_abs-z7' target='_blank' rel='noopener'>§76 VII</a>)"])
        unverbindlich(["Spruch ersetzt die<br/>Einigung nicht — <a href='{{ELI}}#art-z76_abs-z6' target='_blank' rel='noopener'>§76 VI S.2</a>"])
    end

    subgraph ESt["Einigungsstelle"]
        taetig["Wird unverzüglich tätig, mündliche<br/>Beratung — <a href='{{ELI}}#art-z76_abs-z3' target='_blank' rel='noopener'>§76 III S.1-2</a><br/>(bleibt eine Seite fern, entscheiden<br/>Vorsitzender und Erschienene<br/>allein — <a href='{{ELI}}#art-z76_abs-z5' target='_blank' rel='noopener'>§76 V S.2</a>)"]
        mehrheit{"Stimmenmehrheit ohne<br/>Stimme des Vorsitzenden? — <a href='{{ELI}}#art-z76_abs-z3' target='_blank' rel='noopener'>§76 III S.3</a>"}
        zweite["Nach weiterer Beratung erneute<br/>Beschlussfassung mit Stimme<br/>des Vorsitzenden — <a href='{{ELI}}#art-z76_abs-z3' target='_blank' rel='noopener'>§76 III S.3</a>"]
        spruch["Beschluss schriftlich, vom Vorsitzenden<br/>unterschrieben (oder elektronisch mit qeS),<br/>Zuleitung an AG und BR — <a href='{{ELI}}#art-z76_abs-z3' target='_blank' rel='noopener'>§76 III S.4</a>"]
    end

    start --> ersetzend
    ersetzend -->|"Ja: Antrag einer<br/>Seite genügt — <a href='{{ELI}}#art-z76_abs-z5' target='_blank' rel='noopener'>§76 V S.1</a>"| bildung
    ersetzend -->|Nein| beide
    beide -->|Nein| keineESt
    beide -->|Ja| bildung
    bildung -.->|"keine Einigung über Vorsitz<br/>oder Zahl der Beisitzer"| bestellung
    bildung --> taetig
    taetig --> mehrheit
    mehrheit -->|Ja| spruch
    mehrheit -->|Nein| zweite
    zweite --> spruch
    spruch --> wirkung
    wirkung -->|Ja| bindend
    wirkung -->|Nein| unverbindlich
    bindend -.->|"erzwingbares Verfahren: binnen<br/>2 Wochen ab Zuleitung — <a href='{{ELI}}#art-z76_abs-z5' target='_blank' rel='noopener'>§76 V S.4</a>"| kontrolle

    keineESt ~~~ bildung
    unverbindlich ~~~ bindend

    style keineESt fill:#fff3cd,stroke:#c9a227
    style bindend fill:#d4edda,stroke:#2d8a4a
    style unverbindlich fill:#fff3cd,stroke:#c9a227
    style kontrolle fill:#fff3cd,stroke:#c9a227
`;export{e as default};