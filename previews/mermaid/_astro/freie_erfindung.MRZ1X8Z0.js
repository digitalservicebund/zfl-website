var e=`---
summary: "Prüft, welche Pflichten ein Arbeitnehmer bei einer freien Erfindung hat: die Mitteilung an den Arbeitgeber mit dessen dreimonatiger Bestreitensfrist und die Pflicht, dem Arbeitgeber vor anderweitiger Verwertung ein Benutzungsrecht anzubieten."
---
flowchart TD
    start(["Arbeitnehmer macht während des<br/>Arbeitsverhältnisses eine freie Erfindung<br/>(keine Diensterfindung) — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 III</a>"])
    verwendbar{"Offensichtlich im Arbeitsbereich<br/>des Betriebs nicht verwendbar?<br/>— <a href='{{ELI}}#art-z18_abs-z3' target='_blank' rel='noopener'>§18 III</a>"}
    mitteilung["Unverzügliche Mitteilung in Textform;<br/>so viel über Erfindung und Entstehung,<br/>dass der Arbeitgeber beurteilen kann,<br/>ob sie frei ist — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"]
    bestreiten{"Bestreitet der Arbeitgeber binnen<br/>3 Monaten nach Zugang in Textform,<br/>dass die Erfindung frei ist?<br/>— <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a>"}
    streitig(["Einordnung streitig: Inanspruchnahme<br/>als Diensterfindung nicht ausgeschlossen;<br/>Schiedsstelle anrufbar — <a href='{{ELI}}#art-z28_abs-z' target='_blank' rel='noopener'>§28</a>"])
    gesperrt["Keine Inanspruchnahme als<br/>Diensterfindung mehr möglich<br/>— <a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a>"]
    arbeitsbereich{"Anderweitige Verwertung während des<br/>Arbeitsverhältnisses beabsichtigt und<br/>Erfindung fällt in den vorhandenen oder<br/>vorbereiteten Arbeitsbereich des Betriebs?<br/>— <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I S.1</a>"}
    keinAngebot(["Keine Anbietungspflicht"])
    angebot["Angebot mindestens eines nicht-<br/>ausschließlichen Benutzungsrechts zu<br/>angemessenen Bedingungen, auch zugleich<br/>mit der Mitteilung — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a>"]
    annahme{"Nimmt der Arbeitgeber das Angebot<br/>binnen 3 Monaten an bzw. erklärt sich<br/>zum Erwerb bereit? — <a href='{{ELI}}#art-z19_abs-z2' target='_blank' rel='noopener'>§19 II</a>, <a href='{{ELI}}#art-z19_abs-z3' target='_blank' rel='noopener'>III</a>"}
    erloschen(["Vorrecht des Arbeitgebers<br/>erlischt — <a href='{{ELI}}#art-z19_abs-z2' target='_blank' rel='noopener'>§19 II</a>"])
    bedingungen{"Macht der Arbeitgeber geltend, die<br/>Bedingungen seien nicht angemessen?<br/>— <a href='{{ELI}}#art-z19_abs-z3' target='_blank' rel='noopener'>§19 III</a>"}
    erworben(["Arbeitgeber erwirbt das Benutzungs-<br/>recht zu den angebotenen<br/>Bedingungen — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a>"])
    gericht(["Gericht setzt auf Antrag des Arbeitgebers<br/>oder Arbeitnehmers die Bedingungen fest<br/>— <a href='{{ELI}}#art-z19_abs-z3' target='_blank' rel='noopener'>§19 III</a>"])
    hinweis["Bei wesentlicher Änderung der maßgeblichen<br/>Umstände kann jede Seite eine andere<br/>Festsetzung beantragen — <a href='{{ELI}}#art-z19_abs-z4' target='_blank' rel='noopener'>§19 IV</a>"]

    start --> verwendbar
    verwendbar -->|"Ja: keine<br/>Mitteilungspflicht"| arbeitsbereich
    verwendbar -->|Nein| mitteilung
    mitteilung --> bestreiten
    bestreiten -->|Ja| streitig
    bestreiten -->|Nein| gesperrt
    gesperrt --> arbeitsbereich
    arbeitsbereich -->|Nein| keinAngebot
    arbeitsbereich -->|Ja| angebot
    angebot --> annahme
    annahme -->|Nein| erloschen
    annahme -->|Ja| bedingungen
    bedingungen -->|Nein| erworben
    bedingungen -->|Ja| gericht
    gericht -.- hinweis

    style keinAngebot fill:#d4edda,stroke:#2d8a4a
    style erloschen fill:#d4edda,stroke:#2d8a4a
    style erworben fill:#d4edda,stroke:#2d8a4a
    style streitig fill:#fff3cd,stroke:#c9a227
    style gericht fill:#fff3cd,stroke:#c9a227
    style hinweis fill:#f5f5f5,stroke:#999
`;export{e as default};