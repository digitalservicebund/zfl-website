var e=`---
summary: "Das unternehmensinterne Beschwerdeverfahren nach §8 LkSG mit hinweisgebender Person, den mit dem Verfahren betrauten Personen und dem Unternehmen: vom Hinweis über Eingangsbestätigung und Erörterung bis zur Berücksichtigung der Erkenntnisse im Risikomanagement und im Jahresbericht."
---
swimlane-beta TD
    subgraph HG["Hinweisgebende Person"]
        hinweis(["Hinweis auf Risiken oder<br/>Pflichtverletzungen (eigener<br/>Geschäftsbereich, Zulieferer)<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.2</a>, <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>;<br/>Identität vertraulich, Schutz vor<br/>Benachteiligung — <a href='{{ELI}}#art-z8_abs-z4' target='_blank' rel='noopener'>§8 IV</a>"])
        beilegungHG(["Einvernehmliche Beilegung<br/>mit der hinweisgebenden<br/>Person — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.5</a>"])
    end

    subgraph BV["Mit dem Verfahren betraute Personen"]
        eingang["Bestätigen den Eingang<br/>des Hinweises — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.3</a><br/>(unparteiisch, weisungsfrei,<br/>verschwiegen — <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III</a>)"]
        eroerterung["Erörtern den Sachverhalt<br/>mit der hinweisgebenden<br/>Person — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.4</a>"]
        angebot["Können ein Verfahren der<br/>einvernehmlichen Beilegung<br/>anbieten — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.5</a>"]
    end

    subgraph U["Unternehmen"]
        einrichtung(["Richtet internes Verfahren ein<br/>oder beteiligt sich an externem<br/>— <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I S.1, 6</a>; Verfahrens-<br/>ordnung öffentlich — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 II</a>"])
        erkenntnisse["Berücksichtigt Erkenntnisse in<br/>Risikoanalyse, Prävention und Abhilfe<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 IV S.2</a>, <a href='{{ELI}}#art-z6_abs-z5' target='_blank' rel='noopener'>§6 V S.2</a>, <a href='{{ELI}}#art-z7_abs-z4' target='_blank' rel='noopener'>§7 IV S.2</a>"]
        bericht(["Maßnahmen aufgrund von<br/>Beschwerden im Jahresbericht<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 II S.2 Nr.2</a>;<br/>Verfahren jährlich auf<br/>Wirksamkeit prüfen — <a href='{{ELI}}#art-z8_abs-z5' target='_blank' rel='noopener'>§8 V</a>"])
    end

    hinweis --> eingang
    einrichtung -.->|betraut| eingang
    eingang --> eroerterung
    eroerterung --> angebot
    angebot -.->|optional| beilegungHG
    angebot --> erkenntnisse
    erkenntnisse --> bericht

    style bericht fill:#d4edda,stroke:#2d8a4a
    style beilegungHG fill:#fff3cd,stroke:#c9a227
`;export{e as default};