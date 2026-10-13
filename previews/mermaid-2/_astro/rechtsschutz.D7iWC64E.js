var e=`---
summary: "Die Wege nach einer ganz oder teilweise ablehnenden Entscheidung über einen IFG-Antrag: Widerspruch und Verpflichtungsklage vor dem Verwaltungsgericht sowie parallel die Anrufung des Bundesbeauftragten für die Informationsfreiheit mit Kontrolle und Beanstandung."
---
swimlane-beta TD
    subgraph BfI["Bundesbeauftragter für die Informationsfreiheit"]
        anrufung["Wird angerufen — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 Abs. 1</a>;<br/>Aufgabe liegt beim<br/>Bundesbeauftragten für<br/>den Datenschutz — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 Abs. 2</a>"]
        kontrolle{"Kontrolle der Einhaltung<br/>des IFG — <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs. 3</a><br/>(§24 BDSG a.F.):<br/>Verstoß festgestellt?"}
        keine(["Keine Beanstandung"])
        beanstandung(["Beanstandung gegenüber der<br/>obersten Bundesbehörde<br/>mit Aufforderung zur<br/>Stellungnahme<br/>— <a href='{{ELI}}#art-z12_abs-z3' target='_blank' rel='noopener'>§12 Abs. 3</a> (§25 BDSG a.F.)"])
    end

    subgraph AS["Antragsteller"]
        verletzt("Sieht sein Recht auf<br/>Informationszugang als<br/>verletzt an")
        abhilfeEnd(["Erhält den begehrten<br/>Informationszugang"])
    end

    subgraph BH["Behörde"]
        bescheid(["Lehnt den Antrag ganz oder<br/>teilweise ab, binnen eines Monats<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1</a>, mit Angabe, ob und<br/>wann Zugang später möglich ist<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>"])
        vorverfahren{"Widerspruchsverfahren nach<br/>dem 8. Abschnitt der VwGO,<br/>auch bei obersten<br/>Bundesbehörden — <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 2</a>:<br/>Widerspruch begründet?"}
        widerspruchsbescheid["Widerspruchsbescheid:<br/>Ablehnung bleibt bestehen"]
    end

    subgraph VG["Verwaltungsgericht"]
        urteil{"Anspruch auf<br/>Informationszugang<br/>besteht?"}
        verpflichtung(["Behörde wird verpflichtet,<br/>den Zugang zu gewähren<br/>(oder neu zu bescheiden)"])
        abweisung(["Klage wird abgewiesen"])
    end

    bescheid --> verletzt
    verletzt -->|"Widerspruch<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 1</a>"| vorverfahren
    verletzt -.->|"Anrufung"| anrufung
    vorverfahren -->|"Ja: Abhilfe"| abhilfeEnd
    vorverfahren -->|Nein| widerspruchsbescheid
    widerspruchsbescheid -->|"Verpflichtungsklage<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 1</a>"| urteil
    urteil -->|Ja| verpflichtung
    urteil -->|Nein| abweisung
    anrufung --> kontrolle
    kontrolle -->|Nein| keine
    kontrolle -->|Ja| beanstandung
    keine ~~~ beanstandung
    verpflichtung ~~~ abweisung

    style abhilfeEnd fill:#d4edda,stroke:#2d8a4a
    style verpflichtung fill:#d4edda,stroke:#2d8a4a
    style abweisung fill:#f8d7da,stroke:#c0392b
    style keine fill:#f5f5f5,stroke:#999
    style beanstandung fill:#fff3cd,stroke:#c9a227
`;export{e as default};