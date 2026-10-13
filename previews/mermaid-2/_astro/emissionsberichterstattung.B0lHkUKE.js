var e=`---
summary: "Die Grundpflichten eines Verantwortlichen im Brennstoffemissionshandel mit zuständiger Behörde und Prüfstelle: Genehmigung des (vereinfachten) Überwachungsplans, jährliche Ermittlung, Verifizierung und Berichterstattung der Brennstoffemissionen sowie fristgerechte Abgabe der Emissionszertifikate."
---
swimlane-beta TD
    subgraph ZB["Zuständige Behörde"]
        pruef{"Entspricht der<br/>Überwachungsplan den Vorgaben<br/>der Rechtsverordnung nach Abs.<br/>5? — <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2 S. 1</a><br/>Beim vereinfachten Plan:<br/>Erklärung, nur<br/>Standardemissionsfaktoren<br/>anzuwenden, und Methodik zur<br/>Erfassung von Art und Menge<br/>der Brennstoffe entspricht<br/>diesen Vorgaben? — <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs. 3<br/>S. 1</a>"}
        aufforderung{"Aufforderung binnen 2 Monaten<br/>nach Einreichung,<br/>festgestellte Mängel zu<br/>beseitigen oder fehlende<br/>Erläuterungen nachzureichen?<br/>— <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs. 3 S. 3</a>"}
        genehmigung["Genehmigung erteilt bzw. gilt als<br/>erteilt (ggf. mit Auflagen für<br/>Überwachung und Berichterstattung — <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6<br/>Abs. 2 S. 3</a>)<br/>— <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 3</a>"]
    end

    subgraph VA["Verantwortlicher"]
        start(["Reicht für jede Handelsperiode bei der<br/>zuständigen Behörde einen<br/>Überwachungsplan ein — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 1</a>;<br/>bei Ermittlung ausschließlich unter<br/>Anwendung von Standardemissionsfaktoren<br/>genügt ein vereinfachter<br/>Überwachungsplan — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 2</a>"])
        maengel(["Festgestellte Mängel innerhalb der<br/>festgesetzten Frist beseitigen und<br/>geänderten Plan vorlegen — <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2 S.<br/>2</a>, <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>Abs. 3 S. 2</a>"])
        ermitteln["Ermittelt die Brennstoffemissionen der<br/>im Kalenderjahr in Verkehr gebrachten<br/>Brennstoffe auf Grundlage des<br/>Überwachungsplans — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1</a><br/>(Plan bei Änderungen nach Abs. 4 Nr. 1-3<br/>unverzüglich anpassen und einreichen<br/>— <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 Abs. 4</a>)"]
        bericht["Berichtet der zuständigen Behörde bis<br/>31. Juli des Folgejahres über die<br/>Brennstoffemissionen — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1</a>"]
        abgabe(["Gibt bis 30. September<br/>Emissionszertifikate entsprechend der<br/>nach §7 berichteten Gesamtmenge des<br/>Vorjahres an die zuständige Behörde ab<br/>— <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a>"])
    end

    subgraph PS["Prüfstelle"]
        verifizierung["Verifiziert die Angaben im<br/>Emissionsbericht (Prüfstelle nach <a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15</a>)<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 Abs. 3</a>"]
    end

    start --> pruef
    pruef -->|"Nein: Überwachungsplan"| maengel
    pruef -->|"Nein: vereinfachter<br/>Überwachungsplan"| aufforderung
    aufforderung -->|Ja| maengel
    aufforderung -->|"Nein: gilt als erteilt"| genehmigung
    pruef -->|Ja| genehmigung
    genehmigung --> ermitteln
    ermitteln --> verifizierung
    verifizierung --> bericht
    bericht --> abgabe
    maengel ~~~ ermitteln

    style maengel fill:#fff3cd,stroke:#c9a227
    style abgabe fill:#d4edda,stroke:#2d8a4a
`;export{e as default};