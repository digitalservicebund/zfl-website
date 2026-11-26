var e=`---
summary: "Das behördliche Genehmigungsverfahren für die Beschäftigung einer schwangeren oder stillenden Frau zwischen 20 und 22 Uhr: Voraussetzungen, Antrag mit Gefährdungsbeurteilung, Beschäftigung schon während des Verfahrens, vorläufige Untersagung und Genehmigungsfiktion nach sechs Wochen."
---
swimlane-beta TD
    subgraph FR["Schwangere oder stillende Frau"]
        bereit["Erklärt sich ausdrücklich bereit<br/>(jederzeit widerruflich); nach<br/>ärztlichem Zeugnis spricht nichts gegen<br/>die Beschäftigung bis 22 Uhr<br/>— <a href='{{ELI}}#art-z28_abs-z1' target='_blank' rel='noopener'>§28 I S.1 Nr.1, 2</a>, S.3"]
        nicht(["Keine Beschäftigung nach 20 Uhr<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.1</a>"])
    end

    subgraph AG["Arbeitgeber"]
        start(["Will die Frau zwischen 20 und 22 Uhr<br/>beschäftigen (grundsätzlich verboten<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.1</a>;<br/>22 bis 6 Uhr nur per Ausnahmebewilligung<br/>— <a href='{{ELI}}#art-z29_abs-z3' target='_blank' rel='noopener'>§29 III S.2 Nr.1</a>)"])
        voraus{"Bereitschaft und Zeugnis<br/>liegen vor und<br/>unverantwortbare Gefährdung,<br/>insb. durch Alleinarbeit, ist<br/>ausgeschlossen? — <a href='{{ELI}}#art-z28_abs-z1' target='_blank' rel='noopener'>§28 I S.1</a>"}
        antrag["Beantragt die Genehmigung mit<br/>Dokumentation der Gefährdungsbeurteilung<br/>— <a href='{{ELI}}#art-z28_abs-z1' target='_blank' rel='noopener'>§28 I S.2</a><br/>(Beschäftigung ab dann zulässig, solange<br/>die Behörde nicht ablehnt oder vorläufig<br/>untersagt — <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II S.1</a>)"]
        untersagt(["Beschäftigung zwischen 20 und 22 Uhr<br/>vorläufig untersagt — <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II S.3</a>"])
        abgelehnt(["Antrag abgelehnt — <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II S.1</a>"])
    end

    subgraph BH["Aufsichtsbehörde"]
        eingang["Antrag geht ein; fehlen Unterlagen,<br/>unverzüglich Mitteilung an den<br/>Arbeitgeber — <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II S.2</a>"]
        untersagen{"Vorläufige Untersagung zum<br/>Schutz der Gesundheit von Frau<br/>oder Kind erforderlich?<br/>— <a href='{{ELI}}#art-z28_abs-z2' target='_blank' rel='noopener'>§28 II S.3</a>"}
        ablehnung{"Ablehnung binnen 6 Wochen nach<br/>Eingang des vollständigen<br/>Antrags? — <a href='{{ELI}}#art-z28_abs-z3' target='_blank' rel='noopener'>§28 III S.1</a>"}
        fiktion(["Genehmigung gilt als erteilt (§42a<br/>VwVfG); auf Verlangen Bescheinigung<br/>— <a href='{{ELI}}#art-z28_abs-z3' target='_blank' rel='noopener'>§28 III</a>"])
    end

    start --> bereit
    bereit --> voraus
    voraus -->|Nein| nicht
    voraus -->|Ja| antrag
    antrag --> eingang
    eingang --> untersagen
    untersagen -->|Ja| untersagt
    untersagen -->|Nein| ablehnung
    ablehnung -->|Ja| abgelehnt
    ablehnung -->|Nein| fiktion

    untersagt ~~~ ablehnung
    abgelehnt ~~~ fiktion

    style nicht fill:#f8d7da,stroke:#c0392b
    style untersagt fill:#f8d7da,stroke:#c0392b
    style abgelehnt fill:#f8d7da,stroke:#c0392b
    style fiktion fill:#d4edda,stroke:#2d8a4a
`;export{e as default};