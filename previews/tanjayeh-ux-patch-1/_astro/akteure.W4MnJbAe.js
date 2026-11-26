var e=`---
summary: "Die Akteure des Kinder- und Jugendmedienschutzes nach dem JuSchG mit der Bundeszentrale für Kinder- und Jugendmedienschutz im Zentrum: wer Medien kennzeichnet, über die Liste jugendgefährdender Medien entscheidet, Vorsorgemaßnahmen durchsetzt und wie Bund, Länder, Selbstkontrolle und Anbieter zusammenwirken."
---
flowchart LR
    BzKJ["<b>Bundeszentrale für Kinder- und Jugendmedienschutz</b><br/>selbstständige Bundesoberbehörde — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a><br/>fördert Weiterentwicklung des Jugendmedienschutzes — <a href='{{ELI}}#art-z17a_abs-z2' target='_blank' rel='noopener'>§17a II</a><br/>führt die Liste jugendgefährdender Medien — <a href='{{ELI}}#art-z24_abs-z1' target='_blank' rel='noopener'>§24 I</a><br/>setzt Vorsorgemaßnahmen nach Art. 28 DSA durch — <a href='{{ELI}}#art-z24a_abs-z1' target='_blank' rel='noopener'>§24a I</a>"]

    subgraph Bund["Bund"]
        BMFSFJ["<b>Bundesministerium für Familie, Senioren, Frauen und Jugend</b><br/>Bundeszentrale untersteht dem Ministerium — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a><br/>ernennt Vorsitz und Beisitzer der Prüfstelle — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a><br/>antragsberechtigt — <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 II</a>"]
        BReg["<b>Bundesregierung</b><br/>evaluiert das Gesetz, unterrichtet den Bundestag — <a href='{{ELI}}/art-z29b' target='_blank' rel='noopener'>§29b</a>"]
        Pruefstelle["<b>Prüfstelle für jugendgefährdende Medien</b><br/>entscheidet über Aufnahme in die Liste und Streichung — <a href='{{ELI}}#art-z17a_abs-z1' target='_blank' rel='noopener'>§17a I</a><br/>Mitglieder an Weisungen nicht gebunden — <a href='{{ELI}}#art-z19_abs-z4' target='_blank' rel='noopener'>§19 IV</a><br/>vereinfachtes Verfahren — <a href='{{ELI}}#art-z23_abs-z1' target='_blank' rel='noopener'>§23 I</a>"]
        Beirat["<b>Beirat</b><br/>bis zu 12 Mitglieder, 3 Plätze für Interessenvertretungen von Kindern und Jugendlichen — <a href='{{ELI}}/art-z17b' target='_blank' rel='noopener'>§17b</a>"]
    end

    subgraph Laender["Länder"]
        OLB["<b>Oberste Landesbehörden</b><br/>kennzeichnen Filme und Spielprogramme — <a href='{{ELI}}#art-z14_abs-z2' target='_blank' rel='noopener'>§14 II</a><br/>Landesregierungen ernennen Beisitzer der Prüfstelle — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a><br/>oberste Landesjugendbehörden antragsberechtigt — <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 II</a>"]
        KJM["<b>Zentrale Aufsichtsstelle der Länder für den Jugendmedienschutz</b><br/>Stellungnahme vor Listenaufnahme digitaler Dienste — <a href='{{ELI}}#art-z21_abs-z6' target='_blank' rel='noopener'>§21 VI</a><br/>Stellungnahme vor Anordnung von Vorsorgemaßnahmen — <a href='{{ELI}}#art-z24b_abs-z4' target='_blank' rel='noopener'>§24b IV</a>"]
    end

    subgraph Privat["Selbstkontrolle, Anbieter und Betroffene"]
        FSK["<b>Organisationen der freiwilligen Selbstkontrolle</b><br/>kennzeichnen im gemeinsamen Verfahren — <a href='{{ELI}}#art-z14_abs-z6' target='_blank' rel='noopener'>§14 VI</a><br/>anerkannte Einrichtungen antragsberechtigt — <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 II</a>"]
        Anbieter["<b>Anbieter von Online-Plattformen</b><br/>Vorsorgemaßnahmen nach Art. 28 DSA — <a href='{{ELI}}#art-z24a_abs-z1' target='_blank' rel='noopener'>§24a I</a><br/>Film- und Spielplattformen: Kennzeichnungspflicht — <a href='{{ELI}}#art-z14a_abs-z1' target='_blank' rel='noopener'>§14a I</a>"]
        Urheber["<b>Urheber und Inhaber der Nutzungsrechte</b><br/>Gelegenheit zur Stellungnahme — <a href='{{ELI}}#art-z21_abs-z7' target='_blank' rel='noopener'>§21 VII</a><br/>Antrag auf Entscheidung in voller Besetzung — <a href='{{ELI}}#art-z23_abs-z3' target='_blank' rel='noopener'>§23 III</a>"]
    end

    BMFSFJ -->|"Aufsicht — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17 I</a>"| BzKJ
    BzKJ -->|"unterhält — <a href='{{ELI}}#art-z17a_abs-z1' target='_blank' rel='noopener'>§17a I</a>"| Pruefstelle
    BzKJ -->|"richtet ein, beruft Mitglieder — <a href='{{ELI}}/art-z17b' target='_blank' rel='noopener'>§17b</a>"| Beirat
    Beirat -.-|"berät — <a href='{{ELI}}/art-z17b' target='_blank' rel='noopener'>§17b</a>"| BzKJ
    BReg -->|"Bericht alle zwei Jahre — <a href='{{ELI}}/art-z29b' target='_blank' rel='noopener'>§29b</a>"| Beirat
    BMFSFJ -->|"ernennt Mitglieder, stellt Anträge — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a>, §21 II"| Pruefstelle
    OLB -->|"ernennen Beisitzer, stellen Anträge — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a>, §21 II"| Pruefstelle
    KJM -->|"Stellungnahmen, Anträge — <a href='{{ELI}}#art-z21_abs-z6' target='_blank' rel='noopener'>§21 VI</a>"| Pruefstelle
    FSK -->|"Anträge — <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 II</a>"| Pruefstelle
    OLB <-->|"gemeinsames Kennzeichnungsverfahren — <a href='{{ELI}}#art-z14_abs-z6' target='_blank' rel='noopener'>§14 VI</a>"| FSK
    KJM -->|"Stellungnahme zu Vorsorgemaßnahmen — <a href='{{ELI}}#art-z24b_abs-z2' target='_blank' rel='noopener'>§24b II</a>"| BzKJ
    BzKJ -->|"teilt Liste mit — <a href='{{ELI}}#art-z24_abs-z4' target='_blank' rel='noopener'>§24 IV</a>"| KJM & FSK
    BzKJ -->|"berät, fordert auf, ordnet an — <a href='{{ELI}}#art-z24b_abs-z3' target='_blank' rel='noopener'>§24b III</a>, IV"| Anbieter
    Pruefstelle -->|"Anhörung, Zustellung — <a href='{{ELI}}#art-z21_abs-z7' target='_blank' rel='noopener'>§21 VII</a>, VIII"| Urheber
    Urheber -->|"Klage gegen den Bund — <a href='{{ELI}}#art-z25_abs-z3' target='_blank' rel='noopener'>§25 III</a>"| BzKJ

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class BzKJ zentral
    class OLB,KJM behoerde
    class FSK,Anbieter,Urheber privat
    class BMFSFJ,BReg parlament
    class Pruefstelle,Beirat gremium
`;export{e as default};