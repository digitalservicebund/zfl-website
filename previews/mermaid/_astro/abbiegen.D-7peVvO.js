var e=`flowchart TD
    A["Abbiegeabsicht an<br/>Kreuzung oder Einmündung<br/>— <a href='{{ELI}}/art-z9' target='_blank' rel='noopener'>§9</a>"] --> B["Rechtzeitig und deutlich<br/>ankündigen<br/>(Fahrtrichtungsanzeiger)<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 1</a>"]
    B --> C{"Rechts oder links<br/>abbiegen?"}
    C -->|Rechts| D["Fahrzeug möglichst weit<br/>rechts einordnen<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 2</a>"]
    C -->|Links| E{"Fahrrad, das die Fahrbahn<br/>erst hinter der Kreuzung<br/>vom rechten Fahrbahnrand<br/>aus überqueren will?<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>"}
    E -->|Ja| F["Kein Einordnen nötig;<br/>Fahrzeugverkehr aus<br/>beiden Richtungen<br/>beachten<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>"]
    E -->|Nein| G["Bis zur Fahrbahnmitte<br/>einordnen (Einbahnstraße:<br/>möglichst weit links)<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 2</a>"]
    D --> H["Vor dem Einordnen und<br/>nochmals vor dem<br/>Abbiegen auf<br/>nachfolgenden Verkehr<br/>achten<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1 S. 4</a>"]
    G --> H
    F --> H
    H --> I{"Kommt ein Fahrzeug,<br/>Schienenfahrzeug, Rad<br/>oder Elektrokleinst-<br/>fahrzeug entgegen bzw.<br/>in gleicher Richtung?<br/>— <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3</a>"}
    I -->|Ja| J["Durchfahren lassen<br/>— <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3</a>"]
    J --> K
    I -->|Nein| K{"Wird nach links<br/>abgebogen und kommt ein<br/>Fahrzeug entgegen, das<br/>ebenfalls abbiegen will?<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4</a>"}
    K -->|"Entgegenkommer biegt<br/>rechts ab"| L["Entgegenkommendes<br/>Fahrzeug durchfahren<br/>lassen<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 1</a>"]
    K -->|"Beide biegen links ab"| M["Voreinander abbiegen<br/>(außer Kreuzungslage<br/>erfordert Vorbeifahren<br/>zuerst)<br/>— <a href='{{ELI}}#art-z9_abs-z4' target='_blank' rel='noopener'>§9 Abs. 4 S. 2</a>"]
    K -->|Nein| N
    L --> N["Auf zu Fuß Gehende<br/>besondere Rücksicht<br/>nehmen; nötigenfalls<br/>warten<br/>— <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3 S. 3</a>"]
    M --> N
    N --> O{"Kfz über 3,5 t innerorts<br/>beim Rechtsabbiegen mit<br/>Radverkehr/Fußgänger-<br/>querung zu rechnen?<br/>— <a href='{{ELI}}#art-z9_abs-z6' target='_blank' rel='noopener'>§9 Abs. 6</a>"}
    O -->|Ja| P["Mit Schrittgeschwindigkeit<br/>fahren<br/>— <a href='{{ELI}}#art-z9_abs-z6' target='_blank' rel='noopener'>§9 Abs. 6</a>"]
    P --> Z["Abbiegevorgang<br/>ordnungsgemäß<br/>abgeschlossen"]
    O -->|Nein| Z

    style Z fill:#d4edda,stroke:#2d8a4a
`;export{e as default};