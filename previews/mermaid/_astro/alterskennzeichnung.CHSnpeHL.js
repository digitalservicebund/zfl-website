var e=`---
summary: "Stellt die Alterskennzeichnung von Filmen und Spielprogrammen nach §14 JuSchG dar: Anbieterkennzeichnung als Info- oder Lehrprogramm, Prüfung durch die oberste Landesbehörde oder eine Organisation der freiwilligen Selbstkontrolle, Beteiligung der Prüfstelle für jugendgefährdende Medien bei Inhaltsgleichheit und Mitteilung an die Strafverfolgungsbehörde."
---
swimlane-beta TD
    subgraph AN["Anbieter"]
        start(["Film oder Spielprogramm (auch zur<br/>Verbreitung in digitalen Diensten — <a href='{{ELI}}#art-z14_abs-z9' target='_blank' rel='noopener'>§14<br/>IX</a>)"])
        info{"Zu Informations-,<br/>Instruktions- oder Lehrzwecken<br/>und offensichtlich keine<br/>Beeinträchtigung der<br/>Entwicklung oder Erziehung?<br/>— <a href='{{ELI}}#art-z14_abs-z7' target='_blank' rel='noopener'>§14 VII S.1</a>"}
        infoKz["Anbieter darf mit „Infoprogramm“ oder<br/>„Lehrprogramm“ kennzeichnen; Abs. 1-5<br/>finden keine Anwendung — <a href='{{ELI}}#art-z14_abs-z7' target='_blank' rel='noopener'>§14 VII S.1-2</a><br/>(oberste Landesbehörde kann das Recht<br/>zur Anbieterkennzeichnung ausschließen<br/>und Kennzeichnungen des Anbieters<br/>aufheben — <a href='{{ELI}}#art-z14_abs-z7' target='_blank' rel='noopener'>§14 VII S.3</a>)"]
    end

    subgraph KS["Oberste Landesbehörde oder Organisation der freiwilligen Selbstkontrolle (Verfahren nach Abs. 6)"]
        inhalte{"Inhalt nach §15 II Nr. 1-5<br/>oder in die Liste nach §18<br/>aufgenommen? — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III S.1</a>"}
        keineKz(["Keine Kennzeichnung — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III S.1</a>"])
        zweifel{"Zweifelsfall zur<br/>Inhaltsgleichheit mit einem<br/>Listenmedium? — <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV S.4</a>"}
        inhaltsgleich{"Ganz oder im Wesentlichen<br/>inhaltsgleich mit einem<br/>Listenmedium oder<br/>Voraussetzungen für<br/>Listenaufnahme erfüllt? (nicht<br/>bei Freigaben nach §11 I — <a href='{{ELI}}#art-z14_abs-z4a' target='_blank' rel='noopener'>§14<br/>IVa</a>)<br/>— <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV S.1, S.3</a>"}
        ausgeschlossen(["Kennzeichnung ausgeschlossen — <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV<br/>S.1</a>"])
        alter["Keine Freigabe für Altersstufen, für die<br/>entwicklungsbeeinträchtigend — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>;<br/>Titel, Zusätze und weitere Darstellungen<br/>mit berücksichtigen — <a href='{{ELI}}#art-z14_abs-z8' target='_blank' rel='noopener'>§14 VIII</a>"]
        kennzeichnung["Kennzeichnung: ohne Altersbeschränkung,<br/>ab 6, ab 12, ab 16 Jahren oder „Keine<br/>Jugendfreigabe“ — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>; soll<br/>zusätzlich Symbole und weitere Mittel zu<br/>den wesentlichen Gründen und zur<br/>potenziellen Beeinträchtigung der<br/>persönlichen Integrität enthalten — <a href='{{ELI}}#art-z14_abs-z2a' target='_blank' rel='noopener'>§14<br/>IIa</a>"]
    end

    subgraph PS["Prüfstelle für jugendgefährdende Medien"]
        pruefstelle["Entscheidet über das Vorliegen einer<br/>Inhaltsgleichheit — <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV S.2</a>"]
    end

    subgraph OLB["Oberste Landesbehörde"]
        mitteilung["Teilt Tatsachen, die auf einen Verstoß<br/>gegen §15 I schließen lassen, mit — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14<br/>III S.2</a>"]
        abweichend["Abweichende Entscheidung für ihren<br/>Bereich möglich, wenn die Vereinbarung<br/>Kennzeichnungen der Selbstkontrolle als<br/>solche aller Länder bestimmt — <a href='{{ELI}}#art-z14_abs-z6' target='_blank' rel='noopener'>§14 VI<br/>S.2</a>"]
    end

    subgraph SV["Zuständige Strafverfolgungsbehörde"]
        strafverfolgung(["Erhält Mitteilung — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III S.2</a>"])
    end

    start --> info
    info -->|Ja| infoKz
    info -->|Nein| inhalte
    inhalte -->|Ja| keineKz
    inhalte -->|Nein| zweifel
    keineKz -.->|"Tatsachen für Verstoß gegen<br/>§15 I"| mitteilung
    mitteilung --> strafverfolgung
    zweifel -->|"Ja: Entscheidung herbeiführen"| pruefstelle
    zweifel -->|Nein| inhaltsgleich
    pruefstelle --> inhaltsgleich
    inhaltsgleich -->|Ja| ausgeschlossen
    inhaltsgleich -->|Nein| alter
    alter --> kennzeichnung
    kennzeichnung -.-> abweichend
    keineKz ~~~ zweifel
    ausgeschlossen ~~~ alter

    style keineKz fill:#f8d7da,stroke:#c0392b
    style ausgeschlossen fill:#f8d7da,stroke:#c0392b
    style kennzeichnung fill:#d4edda,stroke:#2d8a4a
    style infoKz fill:#d4edda,stroke:#2d8a4a
    style abweichend fill:#fff3cd,stroke:#c9a227
    style strafverfolgung fill:#fff3cd,stroke:#c9a227
`;export{e as default};