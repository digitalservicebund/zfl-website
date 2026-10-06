var e=`---
summary: "Die Koordinierung der Reaktion nach einer Warnmeldung: Konsultation der Mitgliedstaaten im Gesundheitssicherheitsausschuss, Abstimmung oder nachträgliche Information bei nationalen Maßnahmen und ergänzende Empfehlungen der Kommission zu gemeinsamen befristeten Maßnahmen."
---
swimlane-beta TD
    subgraph KOM["Kommission"]
        start(["Nach einer Warnmeldung (Art. 19):<br/>Ersuchen der Kommission oder eines<br/>Mitgliedstaats — <a href='{{ELI}}#021.001' target='_blank' rel='noopener'>Art. 21 Abs. 1</a>"])
        empf["Fakultativ: Empfehlungen zu gemeinsamen<br/>zeitlich befristeten Maßnahmen<br/>— <a href='{{ELI}}#022.001' target='_blank' rel='noopener'>Art. 22 Abs. 1</a>; gestützt insb. auf<br/>Empfehlungen von ECDC, WHO, Agenturen<br/>oder Beratendem Ausschuss; notwendig,<br/>geeignet, verhältnismäßig<br/>— <a href='{{ELI}}#022.002' target='_blank' rel='noopener'>Art. 22 Abs. 2 Buchst. a-c</a>"]
        verteil(["Empfehlung unverzüglich über das EWRS an<br/>die nationalen Behörden und an den<br/>Gesundheitssicherheitsausschuss; vor<br/>Veröffentlichung 24 Stunden vorab<br/>— <a href='{{ELI}}#022.002' target='_blank' rel='noopener'>Art. 22 Abs. 2 Buchst. d</a>"])
    end

    subgraph HSC["Gesundheitssicherheitsausschuss"]
        konsult["Mitgliedstaaten konsultieren sich und<br/>koordinieren im Benehmen mit der<br/>Kommission auf Grundlage der Informationen<br/>nach Art. 19 und der Risikobewertungen<br/>nach Art. 20: nationale Reaktionen,<br/>Risiko- und Krisenkommunikation,<br/>Stellungnahmen und Leitlinien,<br/>Unterstützung der IPCR — <a href='{{ELI}}#021.001' target='_blank' rel='noopener'>Art. 21 Abs. 1</a><br/>(Annahme möglichst im Konsens, sonst mit<br/>Zweidrittelmehrheit — <a href='{{ELI}}#004.004' target='_blank' rel='noopener'>Art. 4 Abs. 4</a>)"]
    end

    subgraph MS["Mitgliedstaat"]
        beabs["Mitgliedstaat beabsichtigt, Maßnahmen für<br/>die öffentliche Gesundheit zu ergreifen<br/>oder zu beenden — <a href='{{ELI}}#021.002' target='_blank' rel='noopener'>Art. 21 Abs. 2</a> (bei<br/>Bedarf Ersuchen um Unterstützung über<br/>das ERCC — <a href='{{ELI}}#021.004' target='_blank' rel='noopener'>Art. 21 Abs. 4</a>)"]
        dringend{"Schutz der öffentlichen<br/>Gesundheit so dringend,<br/>dass ein unverzüglicher<br/>Erlass notwendig ist?<br/>— <a href='{{ELI}}#021.002' target='_blank' rel='noopener'>Art. 21 Abs. 2</a>, <a href='{{ELI}}#021.003' target='_blank' rel='noopener'>Abs. 3</a>"}
        erlass["Erlass der Maßnahmen — <a href='{{ELI}}#021.002' target='_blank' rel='noopener'>Art. 21 Abs. 2</a>, <a href='{{ELI}}#021.003' target='_blank' rel='noopener'>Abs. 3</a>"]
    end

    subgraph AND["Andere Mitgliedstaaten und Kommission"]
        vorab["Vorab Unterrichtung, Konsultation und<br/>Abstimmung zu Art, Zweck und Umfang,<br/>insb. mit angrenzenden Mitgliedstaaten<br/>— <a href='{{ELI}}#021.002' target='_blank' rel='noopener'>Art. 21 Abs. 2</a>"]
        nachher(["Information unverzüglich nach dem<br/>Erlass über Art, Zweck und Umfang, insb.<br/>in grenzüberschreitenden Regionen<br/>— <a href='{{ELI}}#021.003' target='_blank' rel='noopener'>Art. 21 Abs. 3</a>"])
    end

    start --> konsult
    konsult -->|"Koordinierung der<br/>nationalen Reaktion"| beabs
    start -.->|"ergänzend"| empf
    empf --> verteil
    beabs --> dringend
    dringend -->|Nein| vorab
    vorab --> erlass
    dringend -->|Ja| erlass
    erlass -->|"nach dringendem Erlass"| nachher

    style verteil fill:#d4edda,stroke:#2d8a4a
    style nachher fill:#d4edda,stroke:#2d8a4a
`;export{e as default};