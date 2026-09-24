var e=`---
summary: "Zeigt, wann ein Nachtarbeitnehmer nach dem ArbZG verlangen kann, auf einen geeigneten Tagesarbeitsplatz umgesetzt zu werden, und wie der Betriebs- oder Personalrat beteiligt wird, wenn der Arbeitgeber dringende betriebliche Erfordernisse entgegenhält."
---
swimlane-beta TD
    subgraph NAN["Nachtarbeitnehmer"]
        start(["Verlangt Umsetzung auf einen für ihn<br/>geeigneten Tagesarbeitsplatz — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV S.1</a>"])
        kein(["Kein Anspruch auf Umsetzung nach <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV</a>"])
        umgesetzt(["Umsetzung auf einen geeigneten<br/>Tagesarbeitsplatz — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV S.1</a>"])
    end

    subgraph AG["Arbeitgeber"]
        pruefung["Prüft die Umsetzungsgründe:<br/>a) nach arbeitsmedizinischer<br/>Feststellung gefährdet die weitere<br/>Nachtarbeit die Gesundheit des<br/>Arbeitnehmers<br/>b) im Haushalt lebt ein Kind unter zwölf<br/>Jahren, das nicht von einer anderen im<br/>Haushalt lebenden Person betreut werden<br/>kann<br/>c) der Arbeitnehmer hat einen<br/>schwerpflegebedürftigen Angehörigen zu<br/>versorgen, der nicht von einem anderen<br/>im Haushalt lebenden Angehörigen<br/>versorgt werden kann — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV S.1</a>"]
        grund{"Liegt einer der Gründe a) bis<br/>c) vor?"}
        erford{"Stehen nach Auffassung des<br/>Arbeitgebers dringende<br/>betriebliche Erfordernisse<br/>entgegen? — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV S.2</a>"}
        anhoeren["Hört den Betriebs- oder Personalrat — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6<br/>IV S.2</a>"]
        unterbleibt(["Keine Umsetzung, sofern dringende<br/>betriebliche Erfordernisse<br/>entgegenstehen — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV S.1</a>"])
    end

    subgraph BR["Betriebs- oder Personalrat"]
        vorschlag["Wird gehört; kann dem Arbeitgeber<br/>Vorschläge für eine Umsetzung<br/>unterbreiten — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV S.3</a>"]
    end

    start --> pruefung
    pruefung --> grund
    grund -->|Nein| kein
    grund -->|Ja| erford
    erford -->|Nein| umgesetzt
    erford -->|Ja| anhoeren
    anhoeren --> vorschlag
    vorschlag -->|"ggf. Vorschläge"| unterbleibt

    kein ~~~ erford

    style kein fill:#f8d7da,stroke:#c0392b
    style umgesetzt fill:#d4edda,stroke:#2d8a4a
    style unterbleibt fill:#fff3cd,stroke:#c9a227
`;export{e as default};