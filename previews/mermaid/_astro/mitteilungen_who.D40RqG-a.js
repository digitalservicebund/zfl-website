var e=`---
summary: "Der Informationsweg zwischen deutschen Behörden und der Weltgesundheitsorganisation nach §§3 und 4 IGV-DG: Information der entscheidungsbefugten Behörde, Entscheidung über Mitteilungen an die WHO, Versand über die nationale IGV-Anlaufstelle und Weiterleitung eingehender WHO-Informationen an inländische Behörden."
---
swimlane-beta TD
    subgraph MB["Landesbehörden und weitere Stellen"]
        start(["Zuständige Landesbehörden, Stellen der<br/>Bundeswehr, Auswärtiges Amt oder<br/>Bundesoberbehörden, die<br/>Gesundheitsgefahren überwachen, erlangen<br/>Kenntnis — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.1</a>"])
        anlass["Anlass: Ereignis, das eine gesundheitliche<br/>Notlage von internationaler Tragweite<br/>darstellen könnte (Nr. 1); eingeschleppte<br/>Krankheitsfälle, Vektoren oder verseuchte<br/>Güter, die eine grenzüberschreitende<br/>Ausbreitung einer bedrohlichen Krankheit<br/>befürchten lassen (Nr. 2); zusätzliche<br/>Gesundheitsmaßnahmen über<br/>WHO-Empfehlungen hinaus, die den Verkehr<br/>mehr als nur unerheblich beeinträchtigen<br/>(Nr. 3) — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.1</a>"]
        informieren["Informieren unverzüglich die jeweils<br/>entscheidungsbefugte Behörde — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.1</a>;<br/>auf deren Anforderung alle vorliegenden<br/>erforderlichen Informationen — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.2</a>"]
        erhalten(["Bestimmte Behörden erhalten die<br/>Information der WHO — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"])
    end

    subgraph EB["Entscheidungsbefugte Behörde"]
        zust("Zuständig je nach Bereich — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>:<br/>übertragbare Krankheiten:<br/>Robert Koch-Institut (Nr. 1),<br/>chemische Gefahren: Bundesamt für<br/>Bevölkerungsschutz und Katastrophenhilfe<br/>(Nr. 2), radionukleare Gefahren:<br/>Bundesministerium für Umwelt, Naturschutz<br/>und nukleare Sicherheit (Nr. 3)")
        entscheid{"Mitteilung an die WHO<br/>(insbesondere nach Art. 6<br/>bis 12 IGV)? — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"}
        keine(["Keine Mitteilung an die WHO<br/>(§12 I IfSG bleibt unberührt — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 III</a>)"])
        weiterEB["Entscheidet, an welche Behörden die<br/>Information weitergeleitet wird — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"]
    end

    subgraph AS["Nationale IGV-Anlaufstelle"]
        senden["Gemeinsames Melde- und Lagezentrum von<br/>Bund und Ländern im BBK — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.1</a>:<br/>sendet die Mitteilung an die WHO<br/>(Aufgaben nach Art. 4 II IGV — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.2</a>);<br/>darf personenbezogene Daten verarbeiten<br/>und übermitteln — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a>"]
        eingangAS("Information der WHO geht über die<br/>nationale IGV-Anlaufstelle ein — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>")
    end

    subgraph WHO["Weltgesundheitsorganisation"]
        who(["Mitteilung erreicht die<br/>IGV-Kontaktstelle der WHO — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II Nr. 28</a>"])
        whoInfo(["WHO sendet Informationen an die<br/>nationale IGV-Anlaufstelle — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"])
    end

    start --> anlass
    anlass --> informieren
    informieren --> zust
    zust --> entscheid
    entscheid -->|Ja| senden
    entscheid -->|Nein| keine
    senden --> who
    whoInfo --> eingangAS
    eingangAS --> weiterEB
    weiterEB --> erhalten
    keine ~~~ whoInfo

    style keine fill:#fff3cd,stroke:#c9a227
    style who fill:#d4edda,stroke:#2d8a4a
    style erhalten fill:#d4edda,stroke:#2d8a4a
`;export{e as default};