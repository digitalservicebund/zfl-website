var e=`---
summary: "Die Akteure der Verordnung – Kommission, Gesundheitssicherheitsausschuss, Beratender Ausschuss, ECDC und weitere Agenturen der Union, Mitgliedstaaten und ihre zuständigen Behörden, WHO sowie Europäisches Parlament und Rat – und wie sie über Frühwarnung, Risikobewertung, Koordinierung, Vorsorgeplanung und die Feststellung einer Notlage verbunden sind."
---
flowchart TD
    KOM["<b>Kommission</b><br/>erstellt den Präventions-, Vorsorge- und Reaktionsplan der Union — <a href='{{ELI}}#005.001' target='_blank' rel='noopener'>Art. 5 Abs. 1</a><br/>stellt Risikobewertungen über das EWRS bereit — <a href='{{ELI}}#020.004' target='_blank' rel='noopener'>Art. 20 Abs. 4</a><br/>kann Empfehlungen zu gemeinsamen befristeten Maßnahmen annehmen — <a href='{{ELI}}#022.001' target='_blank' rel='noopener'>Art. 22 Abs. 1</a><br/>stellt eine gesundheitliche Notlage auf Unionsebene fest — <a href='{{ELI}}#023.001' target='_blank' rel='noopener'>Art. 23 Abs. 1</a>"]

    subgraph Gremien["Gremien"]
        HSC["<b>Gesundheitssicherheitsausschuss</b><br/>Vertreter der Mitgliedstaaten — <a href='{{ELI}}#004.001' target='_blank' rel='noopener'>Art. 4 Abs. 1</a><br/>koordiniert Vorsorgeplanung und Reaktion — <a href='{{ELI}}#021.001' target='_blank' rel='noopener'>Art. 21 Abs. 1</a><br/>nimmt Stellungnahmen und Leitlinien für die Mitgliedstaaten an — <a href='{{ELI}}#004.003' target='_blank' rel='noopener'>Art. 4 Abs. 3</a>"]
        BA["<b>Beratender Ausschuss für gesundheitliche Notlagen</b><br/>unabhängige Experten, ECDC und EMA als ständige Beobachter — <a href='{{ELI}}#024.002' target='_blank' rel='noopener'>Art. 24 Abs. 2</a><br/>berät Kommission oder Gesundheitssicherheitsausschuss auf Ersuchen — <a href='{{ELI}}#024.001' target='_blank' rel='noopener'>Art. 24 Abs. 1</a>"]
    end

    subgraph EU["Agenturen der Union"]
        ECDC["<b>ECDC</b><br/>betreibt das Netz für die epidemiologische Überwachung — <a href='{{ELI}}#013.001' target='_blank' rel='noopener'>Art. 13 Abs. 1</a><br/>aktualisiert das EWRS — <a href='{{ELI}}#018.002' target='_blank' rel='noopener'>Art. 18 Abs. 2</a><br/>bewertet die nationalen Pläne alle drei Jahre — <a href='{{ELI}}#008.001' target='_blank' rel='noopener'>Art. 8 Abs. 1</a>"]
        AG["<b>EMA, EFSA, ECHA, Europäische Umweltagentur, EMCDDA</b><br/>Risikobewertung je nach Art der Gefahr — <a href='{{ELI}}#020.001' target='_blank' rel='noopener'>Art. 20 Abs. 1</a>"]
    end

    subgraph Mitgliedstaaten["Mitgliedstaaten"]
        MS["<b>Mitgliedstaaten</b><br/>stimmen nationale Pläne im Ausschuss ab — <a href='{{ELI}}#006.001' target='_blank' rel='noopener'>Art. 6 Abs. 1</a><br/>berichten alle drei Jahre über die Planung — <a href='{{ELI}}#007.001' target='_blank' rel='noopener'>Art. 7 Abs. 1</a><br/>unterrichten vor nationalen Maßnahmen — <a href='{{ELI}}#021.002' target='_blank' rel='noopener'>Art. 21 Abs. 2</a>"]
        NB["<b>Zuständige nationale Behörden</b><br/>übermitteln Warnmeldungen über das EWRS — <a href='{{ELI}}#019.001' target='_blank' rel='noopener'>Art. 19 Abs. 1</a><br/>liefern Daten zur epidemiologischen Überwachung — <a href='{{ELI}}#013.003' target='_blank' rel='noopener'>Art. 13 Abs. 3</a>"]
    end

    subgraph Weitere["Weitere Akteure"]
        WHO["<b>WHO</b><br/>Beobachter im Beratenden Ausschuss möglich — <a href='{{ELI}}#024.002' target='_blank' rel='noopener'>Art. 24 Abs. 2</a>"]
        EPRat["<b>Europäisches Parlament und Rat</b><br/>erhalten den Bericht über die Vorsorgeplanung — <a href='{{ELI}}#009.001' target='_blank' rel='noopener'>Art. 9 Abs. 1</a>"]
    end

    KOM -->|"Vorsitz und Sekretariat — <a href='{{ELI}}#004.005' target='_blank' rel='noopener'>Art. 4 Abs. 5</a>, Abs. 6"| HSC
    KOM -->|"setzt ein, Vorsitz — <a href='{{ELI}}#024.001' target='_blank' rel='noopener'>Art. 24 Abs. 1</a>, Abs. 6"| BA
    KOM <-->|"EWRS — <a href='{{ELI}}#018.001' target='_blank' rel='noopener'>Art. 18 Abs. 1</a>"| NB
    KOM <-->|"Risikobewertung — <a href='{{ELI}}#020.001' target='_blank' rel='noopener'>Art. 20 Abs. 1</a>"| ECDC & AG
    MS -->|"benennen Vertreter — <a href='{{ELI}}#004.009' target='_blank' rel='noopener'>Art. 4 Abs. 9</a>"| HSC
    MS -->|"benennen — <a href='{{ELI}}#018.003' target='_blank' rel='noopener'>Art. 18 Abs. 3</a>, Art. 13 Abs. 9"| NB
    ECDC -->|"Bewertung, Empfehlungen — <a href='{{ELI}}#008.002' target='_blank' rel='noopener'>Art. 8 Abs. 2</a>"| MS
    ECDC <-->|"Überwachungsnetz — <a href='{{ELI}}#013.001' target='_blank' rel='noopener'>Art. 13 Abs. 1</a>"| NB
    KOM -->|"Lageanalyse vor Feststellung — <a href='{{ELI}}#023.003' target='_blank' rel='noopener'>Art. 23 Abs. 3</a>"| WHO
    KOM -->|"Bericht — <a href='{{ELI}}#009.001' target='_blank' rel='noopener'>Art. 9 Abs. 1</a>"| EPRat

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class KOM zentral
    class ECDC,AG,NB,WHO behoerde
    class MS,EPRat parlament
    class HSC,BA gremium
`;export{e as default};