var e=`---
summary: "Das interne Beschwerdeverfahren nach §14 UrhDaG mit Nutzer, Diensteanbieter und Rechtsinhaber: Beschwerde gegen Blockierung oder öffentliche Wiedergabe, sofortige Blockierung auf Erklärung eines vertrauenswürdigen Rechtsinhabers und Entscheidung binnen einer Woche."
---
swimlane-beta TD
    subgraph NU["Nutzer"]
        beschwerdeNutzer["Beschwerde gegen die Blockierung (zu<br/>begründen — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>;<br/>Teilnahme freiwillig — <a href='{{ELI}}#art-z13_abs-z1' target='_blank' rel='noopener'>§13 I</a>)"]
    end

    subgraph DA["Diensteanbieter"]
        blockiert(["Inhalt blockiert: sofortige Information<br/>des Nutzers und Hinweis auf das<br/>Beschwerderecht — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"])
        wiedergabe(["Mutmaßlich erlaubte Nutzung öffentlich<br/>wiedergegeben: sofortige Information des<br/>Rechtsinhabers und Hinweis auf das<br/>Beschwerderecht — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"])
        sofort["Sofortige Blockierung bis zum Abschluss<br/>des Beschwerdeverfahrens (abweichend von<br/><a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>) — <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV</a>"]
        mitteilung["Unverzüglich: Beschwerde allen<br/>Beteiligten mitteilen und ihnen<br/>Gelegenheit zur Stellungnahme geben<br/>— <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III Nr.1, 2</a><br/>(ggf. über anerkannte externe<br/>Beschwerdestelle — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a>)"]
        entscheidung(["Entscheidung über die Beschwerde durch<br/>unparteiische natürliche Personen — <a href='{{ELI}}#art-z14_abs-z5' target='_blank' rel='noopener'>§14<br/>V</a>;<br/>unverzüglich, spätestens innerhalb einer<br/>Woche nach Einlegung — <a href='{{ELI}}#art-z14_abs-z3' target='_blank' rel='noopener'>§14 III Nr.3</a>"])
    end

    subgraph RI["Rechtsinhaber"]
        beschwerdeRI["Beschwerde gegen die öffentliche<br/>Wiedergabe, um die Vermutung nach <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a><br/>überprüfen zu lassen (zu begründen — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14<br/>II</a>)"]
        vertrauen{"Erklärt ein vertrauenswürdiger<br/>Rechtsinhaber nach Prüfung<br/>durch eine natürliche Person,<br/>dass die Vermutung nach <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a><br/>zu widerlegen ist und die<br/>fortdauernde öffentliche<br/>Wiedergabe die wirtschaftliche<br/>Verwertung des Werkes<br/>erheblich beeinträchtigt?<br/>— <a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV</a>"}
    end

    blockiert --> beschwerdeNutzer
    beschwerdeNutzer --> mitteilung
    wiedergabe --> beschwerdeRI
    beschwerdeRI --> vertrauen
    vertrauen -->|Ja| sofort
    vertrauen -->|"Nein: Wiedergabe bis zum<br/>Abschluss — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"| mitteilung
    sofort --> mitteilung
    mitteilung --> entscheidung

    style sofort fill:#fff3cd,stroke:#c9a227
    style entscheidung fill:#d4edda,stroke:#2d8a4a
`;export{e as default};