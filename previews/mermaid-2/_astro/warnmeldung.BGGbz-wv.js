var e=`---
summary: "Wann eine zuständige nationale Behörde eine Warnmeldung über das Frühwarn- und Reaktionssystem (EWRS) übermitteln muss und wie die Kommission daraufhin Informationen und eine Risikobewertung durch ECDC oder andere Agenturen der Union bereitstellt."
---
swimlane-beta TD
    subgraph NB["Zuständige nationale Behörde"]
        start(["Entstehung oder Entwicklung einer<br/>schwerwiegenden grenzüberschreitenden<br/>Gesundheitsgefahr — <a href='{{ELI}}#002.001' target='_blank' rel='noopener'>Art. 2 Abs. 1</a>"])
        krit["Bedingungen für eine Warnmeldung (jeweils<br/>tatsächlich oder potenziell): a) für Ort<br/>und Zeitpunkt ungewöhnlich oder<br/>unerwartet, erhebliche Morbidität oder<br/>Mortalität, rasch anwachsend oder über<br/>den nationalen Reaktionskapazitäten;<br/>b) mehr als ein Mitgliedstaat betroffen;<br/>c) koordinierte Reaktion auf Unionsebene<br/>erforderlich — <a href='{{ELI}}#019.001' target='_blank' rel='noopener'>Art. 19 Abs. 1</a>"]
        erfuellt{"Alle drei Bedingungen<br/>a, b und c erfüllt?<br/>— <a href='{{ELI}}#019.001' target='_blank' rel='noopener'>Art. 19 Abs. 1</a>"}
        who{"Meldung einer möglichen<br/>gesundheitlichen Notlage<br/>von internationaler<br/>Tragweite an die WHO ohne<br/>volle Interoperabilität<br/>mit dem EWRS?<br/>— <a href='{{ELI}}#019.002' target='_blank' rel='noopener'>Art. 19 Abs. 2</a>"}
        keine(["Keine Pflicht zur Warnmeldung nach <a href='{{ELI}}#art_19' target='_blank' rel='noopener'>Art. 19</a>"])
        warn["Warnmeldung über das EWRS (bei WHO-<br/>Meldung gleichzeitig) — <a href='{{ELI}}#019.001' target='_blank' rel='noopener'>Art. 19 Abs. 1</a><br/>mit allen relevanten Informationen, z.B.<br/>Auslöser, Ort, Übertragungswege, Risiken,<br/>Maßnahmen, Bedarf an Gegenmaßnahmen<br/>— <a href='{{ELI}}#019.003' target='_blank' rel='noopener'>Art. 19 Abs. 3</a> (personenbezogene Daten<br/>zur Kontaktnachverfolgung nur über die<br/>selektive Mitteilungsfunktion<br/>— <a href='{{ELI}}#028.002' target='_blank' rel='noopener'>Art. 28 Abs. 2</a>)"]
        update(["Mitgliedstaaten aktualisieren die<br/>Informationen, sobald neue Daten<br/>verfügbar sind — <a href='{{ELI}}#019.005' target='_blank' rel='noopener'>Art. 19 Abs. 5</a>; weiter mit<br/>der Koordinierung der Reaktion im<br/>Gesundheitssicherheitsausschuss — <a href='{{ELI}}#art_21' target='_blank' rel='noopener'>Art. 21</a>"])
    end

    subgraph KOM["Kommission"]
        info["Bereitstellung aller für die Koordinierung<br/>nützlichen Informationen über das EWRS<br/>— <a href='{{ELI}}#019.004' target='_blank' rel='noopener'>Art. 19 Abs. 4</a> (die Kommission kann<br/>auch selbst Warnmeldungen übermitteln<br/>— <a href='{{ELI}}#019.001' target='_blank' rel='noopener'>Art. 19 Abs. 1</a>)"]
        bedarf{"Risikobewertung für die<br/>Koordinierung notwendig,<br/>auf Ersuchen des Ausschusses<br/>nach Art. 4 oder auf eigene<br/>Initiative? — <a href='{{ELI}}#020.001' target='_blank' rel='noopener'>Art. 20 Abs. 1</a>"}
        mandat{"Liegt die Bewertung im<br/>Mandat einer Agentur oder<br/>Einrichtung der Union?<br/>— <a href='{{ELI}}#020.003' target='_blank' rel='noopener'>Art. 20 Abs. 3</a>"}
        adhoc["Ad-hoc-Risikobewertung durch die<br/>Kommission — <a href='{{ELI}}#020.003' target='_blank' rel='noopener'>Art. 20 Abs. 3</a>"]
        bereit["Risikobewertung unverzüglich über das<br/>EWRS an die nationalen Behörden und an<br/>den Gesundheitssicherheitsausschuss; vor<br/>Veröffentlichung 24 Stunden vorab an die<br/>Behörden, außer bei Dringlichkeit<br/>— <a href='{{ELI}}#020.004' target='_blank' rel='noopener'>Art. 20 Abs. 4</a>"]
    end

    subgraph AG["ECDC und weitere Agenturen der Union"]
        bewertung["Risikobewertung je nach Gefahr durch<br/>ECDC, EMA, EFSA, ECHA, Europäische<br/>Umweltagentur oder EMCDDA<br/>— <a href='{{ELI}}#020.001' target='_blank' rel='noopener'>Art. 20 Abs. 1 Buchst. a-f</a> (mit<br/>Europol bei terroristischen oder<br/>kriminellen Aktivitäten, mit der EMA<br/>bei Bezug zu Arzneimitteln)"]

    end

    start --> krit
    krit --> erfuellt
    erfuellt -->|Ja| warn
    erfuellt -->|Nein| who
    who -->|Ja| warn
    who -->|Nein| keine
    warn --> info
    info --> bedarf
    bedarf -->|Ja| mandat
    bedarf -->|"Nein: keine Risikobewertung"| update
    mandat -->|Ja| bewertung
    mandat -->|Nein| adhoc
    bewertung --> bereit
    adhoc --> bereit
    bereit --> update

    style keine fill:#f8d7da,stroke:#c0392b
    style update fill:#d4edda,stroke:#2d8a4a
`;export{e as default};