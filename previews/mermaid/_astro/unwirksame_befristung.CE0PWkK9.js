var e=`flowchart TD
    A["Befristetes Arbeitsverhältnis<br/>endet (Ablauf der Zeit /<br/>Zweckerreichung) — <a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15 I, II</a>"] --> Q1{"Wird das Arbeitsverhältnis mit<br/>Wissen des Arbeitgebers<br/>fortgesetzt? — <a href='{{ELI}}#art-z15_abs-z6' target='_blank' rel='noopener'>§15 VI</a>"}

    Q1 -->|Ja| Q2{"Widerspricht der AG unverzüglich<br/>bzw. teilt die Zweckerreichung<br/>unverzüglich mit? — <a href='{{ELI}}#art-z15_abs-z6' target='_blank' rel='noopener'>§15 VI</a>"}

    Q2 -->|Nein| Z1["Arbeitsverhältnis gilt als auf<br/>unbestimmte Zeit verlängert<br/>— <a href='{{ELI}}#art-z15_abs-z6' target='_blank' rel='noopener'>§15 VI</a>"]

    Q2 -->|Ja| END1["Arbeitsverhältnis endet<br/>wie befristet vereinbart"]

    Q1 -->|Nein| END1

    A --> B["AN hält die Befristung für<br/>rechtsunwirksam"]

    B --> K["Klage beim Arbeitsgericht auf<br/>Feststellung des Fortbestehens<br/>binnen 3 Wochen nach vereinbartem<br/>Ende erheben — <a href='{{ELI}}#art-z17_abs-z' target='_blank' rel='noopener'>§17 S.1</a>"]

    K --> Q3{"Klage fristgerecht erhoben<br/>oder nachträgliche Zulassung nach<br/>§§5-7 KSchG entspr. erlangt?<br/>— <a href='{{ELI}}#art-z17_abs-z' target='_blank' rel='noopener'>§17 S.2</a>"}

    Q3 -->|Nein| N1["Befristung gilt als von Anfang<br/>an rechtswirksam"]

    Q3 -->|Ja| Q4{"Stellt das Arbeitsgericht die<br/>Rechtsunwirksamkeit der<br/>Befristung fest?"}

    Q4 -->|Nein| END2["Arbeitsverhältnis endet<br/>wie befristet vereinbart"]

    Q4 -->|Ja| Z2["Arbeitsvertrag gilt als auf<br/>unbestimmte Zeit geschlossen<br/>— <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16 S.1</a>"]

    Z2 --> Q5{"Ist die Befristung nur wegen<br/>Mangels der Schriftform<br/>unwirksam? — <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16 S.2</a>"}

    Q5 -->|Ja| Z3["Arbeitgeber kann auch vor dem<br/>vereinbarten Ende ordentlich<br/>kündigen — <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16 S.2</a>"]

    Q5 -->|Nein| Z4["Arbeitgeber kann frühestens<br/>zum vereinbarten Ende ordentlich<br/>kündigen — <a href='{{ELI}}#art-z16_abs-z' target='_blank' rel='noopener'>§16 S.1</a>"]

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style N1 fill:#f8d7da,stroke:#c0392b
    style END1 fill:#f5f5f5,stroke:#999
    style END2 fill:#f5f5f5,stroke:#999
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#fff3cd,stroke:#c9a227
    style Z4 fill:#fff3cd,stroke:#c9a227
`;export{e as default};