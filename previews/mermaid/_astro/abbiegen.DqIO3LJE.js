var e=`---
summary: "Zeigt die Pflichten beim Abbiegen nach § 9 StVO: rechtzeitiges Ankündigen mit Fahrtrichtungsanzeiger, richtiges Einordnen je nach Rechts- oder Linksabbiegen sowie die Rücksichtnahme auf entgegenkommenden und nachfolgenden Verkehr, Radfahrende und zu Fuß Gehende."
---
flowchart TD
    A["Abbiegeabsicht an Kreuzung oder<br/>Einmündung — <a href='{{ELI}}/art-z9' target='_blank' rel='noopener'>§9</a>"] --> B["Rechtzeitig und deutlich ankündigen<br/>(Fahrtrichtungsanzeiger) — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S.<br/>1</a>"]
    B --> C{"Rechts oder links abbiegen?"}
    C -->|Rechts| D["Fahrzeug möglichst weit rechts einordnen<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 2</a>"]
    C -->|Links| E{"Fahrrad, das die Fahrbahn erst<br/>hinter der Kreuzung vom<br/>rechten Fahrbahnrand aus<br/>überqueren will? — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>"}
    E -->|Ja| F["Kein Einordnen nötig;<br/>Fahrzeugverkehr aus beiden Richtungen<br/>beachten — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>"]
    E -->|Nein| G["Bis zur Fahrbahnmitte einordnen<br/>(Einbahnstraße:<br/>möglichst weit links) — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 2</a>"]
    D --> H["Vor dem Einordnen und nochmals vor dem<br/>Abbiegen auf nachfolgenden Verkehr<br/>achten — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 4</a>"]
    G --> H
    F --> H
    H --> I{"Kommt ein Fahrzeug,<br/>Schienenfahrzeug, Rad oder<br/>Elektrokleinstfahrzeug<br/>entgegen bzw. in gleicher<br/>Richtung? — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3</a>"}
    I -->|Ja| J["Durchfahren lassen — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3</a>"]
    J --> K
    I -->|Nein| K{"Wird nach links abgebogen und<br/>kommt ein Fahrzeug entgegen,<br/>das ebenfalls abbiegen will?<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4</a>"}
    K -->|"Entgegenkommer biegt rechts ab"| L["Entgegenkommendes Fahrzeug durchfahren<br/>lassen — <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 1</a>"]
    K -->|"Beide biegen links ab"| M["Voreinander abbiegen (außer<br/>Kreuzungslage erfordert Vorbeifahren<br/>zuerst) — <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 2</a>"]
    K -->|Nein| N
    L --> N["Auf zu Fuß Gehende besondere Rücksicht<br/>nehmen; nötigenfalls warten — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3<br/>S. 3</a>"]
    M --> N
    N --> O{"Kfz über 3,5 t innerorts beim<br/>Rechtsabbiegen mit<br/>Radverkehr/Fußgängerquerung zu<br/>rechnen? — <a href='{{ELI}}#art-z9_abs-z6' target='_blank' rel='noopener'>§9 Abs. 6</a>"}
    O -->|Ja| P["Mit Schrittgeschwindigkeit fahren — <a href='{{ELI}}#art-z9_abs-z6' target='_blank' rel='noopener'>§9<br/>Abs. 6</a>"]
    P --> Z["Abbiegevorgang ordnungsgemäß<br/>abgeschlossen"]
    O -->|Nein| Z

    style Z fill:#d4edda,stroke:#2d8a4a
`;export{e as default};