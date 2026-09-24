var e=`---
summary: "Zeigt die Akteure des Bundeskleingartengesetzes – Pächter, Verpächter, gemeinnützige Kleingärtnerorganisationen als Zwischenpächter, Gemeinde, Anerkennungsbehörde, Gutachterausschuss und Bedarfsträger – sowie ihre Pacht-, Kündigungs-, Entschädigungs- und Anerkennungsbeziehungen."
---
flowchart LR
    subgraph Anerkennung["Anerkennung der Gemeinnützigkeit"]
        LB["<b>Zuständige Landesbehörde</b><br/>erkennt Kleingärtnerorganisationen als gemeinnützig an — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"]
    end

    subgraph Pacht["Kleingartenpachtverhältnis"]
        PA["<b>Pächter (Kleingärtner)</b><br/>nichterwerbsmäßige gärtnerische Nutzung und Erholung — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a><br/>Laube höchstens 24 m², nicht zum dauernden Wohnen — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a><br/>Kündigungsrecht bei Pachterhöhung — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a><br/>Anspruch auf Kündigungsentschädigung — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>"]
        VP["<b>Verpächter</b><br/>darf höchstens die Höchstpacht verlangen — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a><br/>kündigt nur aus gesetzlichen Gründen — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a><br/>überträgt die Verwaltung bei öffentlichem Interesse — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 III</a><br/>tritt nach Kündigung der Zwischenpacht in die Verträge ein — <a href='{{ELI}}#art-z10_abs-z3' target='_blank' rel='noopener'>§10 III</a>"]
        KGO["<b>Als gemeinnützig anerkannte Kleingärtnerorganisation</b><br/>einzig zulässige private Zwischenpächterin — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a><br/>übernimmt die Verwaltung von Kleingartenanlagen — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II S.3</a><br/>kann Bewertungsregeln für Entschädigungen beschließen — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I S.2</a>"]
    end

    subgraph Pachtermittlung["Ermittlung der ortsüblichen Pacht"]
        LPB["<b>Für die Anzeige von Landpachtverträgen zuständige Behörden</b><br/>erteilen Auskünfte über die ortsübliche Pacht — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.2</a>"]
        GA["<b>Gutachterausschuss nach §192 BauGB</b><br/>erstattet Gutachten über die ortsübliche Pacht — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"]
    end

    subgraph Flaeche["Inanspruchnahme der Fläche"]
        BT["<b>Bedarfsträger</b><br/>nimmt die Kleingartenfläche in Anspruch — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II S.2</a><br/>leistet Ausgleich für bereitgestelltes Ersatzland — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>"]
        GEM["<b>Gemeinde</b><br/>kann Zwischenpächterin sein — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a><br/>stellt bei Dauerkleingärten Ersatzland bereit — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a><br/>Hamburg gilt auch als Gemeinde — <a href='{{ELI}}#art-z19_abs-z' target='_blank' rel='noopener'>§19</a>"]
    end


    VP -->|"Verpachtung, Kündigung, Entschädigung — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>, §5, §11 II"| PA
    VP -->|"Zwischenpacht, Kündigung — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>, §10 I"| KGO
    KGO -->|"Weiterverpachtung — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"| PA
    GEM -->|"Weiterverpachtung, Ersatzland — <a href='{{ELI}}#art-z14_abs-z1' target='_blank' rel='noopener'>§14 I</a>, §4 II"| PA
    LB -->|"Anerkennung der Gemeinnützigkeit — <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a>"| KGO
    VP & PA -->|"Antrag auf Gutachten — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"| GA
    LPB -->|"Auskünfte — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II S.2</a>"| GA
    BT -->|"Entschädigung — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II S.2</a>"| PA
    BT -->|"Ausgleichsbetrag — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a>"| GEM

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class PA zentral
    class GEM,LB,LPB behoerde
    class GA gremium
    class VP,KGO,BT privat
`;export{e as default};