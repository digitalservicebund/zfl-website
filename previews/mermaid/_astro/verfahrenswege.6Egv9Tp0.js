var e=`---
summary: "Die beiden möglichen Verfahrenswege zur Durchführung des Einbürgerungstests nach §§ 2 und 3 EinbTestV: Nutzung der vom Bundesamt benannten Prüfstellen gegen Kostenpauschale oder eigenständige Organisation durch das Land."
---
swimlane-beta TD
    subgraph LA["Land"]
        start{"Organisiert das Land die<br/>gesamte technische<br/>Durchführung in seinem<br/>Zuständigkeitsbereich selbst<br/>mittels seiner Behörden oder<br/>von ihm beauftragter Stellen?<br/>— <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>"}
        landselbst(["Land erhält die zugelassenen Fragebögen,<br/>sorgt für den ordnungsgemäßen<br/>Prüfungsablauf entsprechend §2 III<br/>(individueller Fragebogen,<br/>Identitätsprüfung) sowie für die<br/>Testauswertung und die Ausstellung einer<br/>Bescheinigung nach einheitlichem<br/>Vordruck — <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>"])
    end

    subgraph BA["Bundesamt für Migration und Flüchtlinge"]
        pruefstellen["Benennt den Ländern nach Maßgabe von<br/>Verwaltungsvereinbarungen Prüfstellen<br/>aus dem Kreis seiner Träger (für den<br/>Test zum Orientierungskurs zugelassen,<br/>bundesweit vorgehalten) — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I S.1</a>;<br/>stellt pro Prüfungsteilnehmer 25 Euro<br/>Kostenpauschale in Rechnung — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I S.2</a>"]
    end

    subgraph EB["Zuständige Einbürgerungsbehörde"]
        benennung["Benennt der Person, die den Test ablegen<br/>möchte, eine Prüfstelle — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.1</a>"]
    end

    subgraph TN["Prüfungsteilnehmer/in"]
        termin["Vereinbart mit der benannten Prüfstelle<br/>einen Prüfungstermin unter Angabe der in<br/><a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4 S.1</a> genannten Daten — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.1</a>"]
    end

    subgraph PS["Prüfstelle"]
        fragebogen["Erhält je Prüfungsteilnehmer einen<br/>zugelassenen Fragebogen, der nicht mit<br/>denen anderer Teilnehmer desselben<br/>Termins identisch ist — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III S.1</a>"]
        identitaet(["Prüft die Identität des<br/>Prüfungsteilnehmers anhand eines<br/>amtlichen Identitätspapiers — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 III S.2</a>"])
    end

    subgraph KA["Anbieter eines Einbürgerungskurses"]
        kurs["Kann für seine Teilnehmer einen<br/>kursbezogenen Prüfungstermin mit einer<br/>Prüfstelle vereinbaren (wenn nicht<br/>selbst vom Bundesamt zugelassene<br/>Prüfstelle) — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.2</a>"]
    end

    start -->|Ja| landselbst
    start -->|"Nein: Nutzung der Prüfstellen<br/>des Bundesamtes"| pruefstellen
    pruefstellen --> benennung
    benennung --> termin
    termin --> fragebogen
    kurs -.->|optional| fragebogen
    fragebogen --> identitaet
    benennung ~~~ kurs

    style landselbst fill:#d4edda,stroke:#2d8a4a
    style identitaet fill:#d4edda,stroke:#2d8a4a
`;export{e as default};