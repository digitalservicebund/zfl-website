var e=`---
summary: "Die Festsetzung des Streitwerts für die Gerichtsgebühren nach §§ 61 bis 63 GKG von der Wertangabe über die vorläufige und endgültige Festsetzung durch das Prozessgericht bis zur Beschwerde nach § 68 GKG, der das Gericht abhilft oder die es dem nächsthöheren Gericht vorlegt."
---
swimlane-beta TD
    subgraph BET["Beteiligte"]
        angabe(["Wertangabe bei jedem Antrag, schriftlich<br/>oder zu Protokoll der Geschäftsstelle,<br/>sofern keine bestimmte Geldsumme, kein<br/>fester Wert und nicht aus früheren<br/>Anträgen ersichtlich (jederzeit<br/>berichtigbar) — <a href='{{ELI}}/art-z61' target='_blank' rel='noopener'>§61</a>"])
        beschwerde{"Beschwerde gegen den<br/>Festsetzungsbeschluss beim<br/>festsetzenden Gericht<br/>eingelegt? (statthaft, wenn<br/>Beschwerdegegenstand über 300<br/>Euro oder im Beschluss wegen<br/>grundsätzlicher Bedeutung<br/>zugelassen — <a href='{{ELI}}#art-z68_abs-z1' target='_blank' rel='noopener'>§68 I S.1, 2</a>,<br/><a href='{{ELI}}#art-z66_abs-z5' target='_blank' rel='noopener'>§66 V S.5</a>)"}
        keineBeschwerde(["Festsetzung wird nicht angefochten<br/>(Änderung von Amts wegen nur binnen 6<br/>Monaten nach Rechtskraft oder Erledigung<br/>— <a href='{{ELI}}#art-z63_abs-z3' target='_blank' rel='noopener'>§63 III</a>)"])
    end

    subgraph PG["Prozessgericht"]
        vorlaeufigPruefung{"Streitwertabhängige Gebühren<br/>mit Einreichung fällig, keine<br/>bestimmte Geldsumme und kein<br/>fester Wert? (nicht in der<br/>Finanzgerichtsbarkeit) — <a href='{{ELI}}#art-z63_abs-z1' target='_blank' rel='noopener'>§63 I</a>"}
        vorlaeufig["Sogleich vorläufige Festsetzung durch<br/>Beschluss ohne Anhörung der Parteien<br/>(Einwendungen nur im Beschwerdeverfahren<br/>gegen eine Vorauszahlungsanordnung — <a href='{{ELI}}#art-z63_abs-z1' target='_blank' rel='noopener'>§63<br/>I S.2</a>)"]
        endgueltig["Soweit keine bindende Wertfestsetzung<br/>für die Zuständigkeit oder<br/>Rechtsmittelzulässigkeit vorliegt (diese<br/>ist sonst auch für die Gebühren<br/>maßgebend, außer in Arbeitssachen<br/>— <a href='{{ELI}}/art-z62' target='_blank' rel='noopener'>§62</a>):<br/>Festsetzung durch Beschluss, sobald über<br/>den gesamten Streitgegenstand<br/>entschieden oder das Verfahren<br/>anderweitig erledigt ist — <a href='{{ELI}}#art-z63_abs-z2' target='_blank' rel='noopener'>§63 II S.1</a><br/>(Arbeits- und Finanzgerichtsbarkeit: nur<br/>auf Antrag eines Beteiligten oder der<br/>Staatskasse oder wenn angemessen — <a href='{{ELI}}#art-z63_abs-z2' target='_blank' rel='noopener'>§63<br/>II S.2</a>;<br/>Kosten einer Abschätzung durch<br/>Sachverständige im Beschluss — <a href='{{ELI}}/art-z64' target='_blank' rel='noopener'>§64</a>)"]
        abhilfe{"Hält das Gericht die<br/>Beschwerde für zulässig und<br/>begründet? — <a href='{{ELI}}#art-z66_abs-z3' target='_blank' rel='noopener'>§66 III S.1</a><br/>i.V.m. <a href='{{ELI}}#art-z68_abs-z1' target='_blank' rel='noopener'>§68 I S.5</a>"}
        abgeholfen(["Gericht hilft der Beschwerde ab"])
    end

    subgraph BG["Beschwerdegericht (nächsthöheres Gericht)"]
        frist{"Frist gewahrt (6 Monate nach<br/>Rechtskraft oder Erledigung,<br/>bei späterer Festsetzung 1<br/>Monat nach Zustellung oder<br/>Mitteilung — <a href='{{ELI}}#art-z68_abs-z1' target='_blank' rel='noopener'>§68 I S.3</a>) oder<br/>auf Antrag Wiedereinsetzung<br/>wegen unverschuldeter<br/>Verhinderung (Beschwerde<br/>binnen 2 Wochen nach Wegfall<br/>des Hindernisses, höchstens 1<br/>Jahr nach Fristende — <a href='{{ELI}}#art-z68_abs-z2' target='_blank' rel='noopener'>§68 II</a>)?"}
        unzulaessig(["Beschwerde ist unzulässig"])
        entscheidung(["Beschwerdegericht entscheidet, an die<br/>Zulassung gebunden; keine Beschwerde an<br/>einen obersten Gerichtshof des Bundes<br/>— <a href='{{ELI}}#art-z66_abs-z3' target='_blank' rel='noopener'>§66 III S.2-4</a><br/>(weitere Beschwerde zum OLG nur nach<br/>Zulassung durch das LG, binnen 1 Monat<br/>— <a href='{{ELI}}#art-z66_abs-z4' target='_blank' rel='noopener'>§66 IV</a>, <a href='{{ELI}}#art-z68_abs-z1' target='_blank' rel='noopener'>§68 I S.6</a>)"])
    end

    angabe --> vorlaeufigPruefung
    vorlaeufigPruefung -->|Ja| vorlaeufig
    vorlaeufigPruefung -->|Nein| endgueltig
    vorlaeufig --> endgueltig
    endgueltig --> beschwerde
    beschwerde -->|Nein| keineBeschwerde
    beschwerde -->|Ja| abhilfe
    abhilfe -->|Ja| abgeholfen
    abhilfe -->|"Nein: unverzügliche Vorlage"| frist
    frist -->|Ja| entscheidung
    frist -->|Nein| unzulaessig
    abgeholfen ~~~ frist

    style keineBeschwerde fill:#d4edda,stroke:#2d8a4a
    style abgeholfen fill:#d4edda,stroke:#2d8a4a
    style unzulaessig fill:#f8d7da,stroke:#c0392b
    style entscheidung fill:#fff3cd,stroke:#c9a227
`;export{e as default};