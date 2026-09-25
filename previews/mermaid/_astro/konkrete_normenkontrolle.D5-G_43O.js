var e=`---
summary: "Das Vorlageverfahren der konkreten Normenkontrolle nach Art. 100 GG mit vorlegendem Gericht, Kammer, Senat und Äußerungsberechtigten: Vorlage und Begründung, Zulässigkeitsprüfung durch die Kammer und die auf die Rechtsfrage beschränkte Entscheidung des Senats."
---
swimlane-beta TD
    subgraph VG["Vorlegendes Gericht"]
        start(["Gericht hält ein Gesetz, auf dessen<br/>Gültigkeit es bei der Entscheidung<br/>ankommt, für verfassungswidrig (Art. 100<br/>Abs. 1 GG)"])
        v100{"Voraussetzungen des Art. 100<br/>Abs. 1 GG gegeben? — <a href='{{ELI}}#art-z80_abs-z1' target='_blank' rel='noopener'>§80 I</a>"}
        keineVorlage(["Keine Vorlage an das<br/>Bundesverfassungsgericht"])
        vorlage["Holt unmittelbar die Entscheidung des<br/>BVerfG ein — <a href='{{ELI}}#art-z80_abs-z1' target='_blank' rel='noopener'>§80 I</a>; Begründung:<br/>inwiefern die Entscheidung von der<br/>Gültigkeit der Rechtsvorschrift abhängt<br/>und mit welcher übergeordneten<br/>Rechtsnorm sie unvereinbar ist, Akten<br/>beigefügt — <a href='{{ELI}}#art-z80_abs-z2' target='_blank' rel='noopener'>§80 II</a><br/>(unabhängig von einer Rüge der<br/>Prozessbeteiligten — <a href='{{ELI}}#art-z80_abs-z3' target='_blank' rel='noopener'>§80 III</a>)"]
    end

    subgraph K["Kammer"]
        vorbehalt{"Antrag von einem<br/>Landesverfassungsgericht oder<br/>einem obersten Gerichtshof des<br/>Bundes? — <a href='{{ELI}}/art-z81a' target='_blank' rel='noopener'>§81a S.2</a>"}
        kammer{"Kammer stellt durch<br/>einstimmigen Beschluss die<br/>Unzulässigkeit des Antrags<br/>fest? — <a href='{{ELI}}/art-z81a' target='_blank' rel='noopener'>§81a S.1</a>"}
        unzulaessig(["Antrag unzulässig"])
    end

    subgraph S["Senat"]
        senat["Entscheidung durch den Senat (in den<br/>Fällen des <a href='{{ELI}}/art-z81a' target='_blank' rel='noopener'>§81a S.2</a><br/>auch über die Unzulässigkeit)"]
        rechtsfrage{"Entscheidet nur über die<br/>Rechtsfrage — <a href='{{ELI}}/art-z81' target='_blank' rel='noopener'>§81</a>:<br/>Rechtsvorschrift mit dem<br/>Grundgesetz bzw. sonstigem<br/>Bundesrecht unvereinbar? — §78<br/>i.V.m. <a href='{{ELI}}#art-z82_abs-z1' target='_blank' rel='noopener'>§82 I</a>"}
        nichtig["Erklärt das Gesetz für nichtig, ggf.<br/>auch weitere Bestimmungen desselben<br/>Gesetzes aus denselben Gründen — <a href='{{ELI}}/art-z78' target='_blank' rel='noopener'>§78</a>"]
        bindung(["Entscheidung bindet alle Gerichte und<br/>Behörden — <a href='{{ELI}}#art-z31_abs-z1' target='_blank' rel='noopener'>§31 I</a>; hat Gesetzeskraft,<br/>Veröffentlichung der Entscheidungsformel<br/>im Bundesgesetzblatt — <a href='{{ELI}}#art-z31_abs-z2' target='_blank' rel='noopener'>§31 II</a>"])
    end

    subgraph AE["Äußerungsberechtigte"]
        aeusserung["Verfassungsorgane nach §77: Äußerung<br/>binnen Frist — <a href='{{ELI}}#art-z82_abs-z1' target='_blank' rel='noopener'>§82 I</a>, Beitritt in jeder<br/>Lage des Verfahrens — <a href='{{ELI}}#art-z82_abs-z2' target='_blank' rel='noopener'>§82 II</a>;<br/>Beteiligte des Ausgangsverfahrens:<br/>Äußerung, Ladung zur mündlichen<br/>Verhandlung — <a href='{{ELI}}#art-z82_abs-z3' target='_blank' rel='noopener'>§82 III</a>;<br/>ggf. Stellungnahme oberster Gerichtshöfe<br/>auf Ersuchen des BVerfG — <a href='{{ELI}}#art-z82_abs-z4' target='_blank' rel='noopener'>§82 IV</a>"]
    end

    start --> v100
    v100 -->|Nein| keineVorlage
    v100 -->|Ja| vorlage
    vorlage --> vorbehalt
    vorbehalt -->|Ja| senat
    vorbehalt -->|Nein| kammer
    kammer -->|Ja| unzulaessig
    kammer -->|Nein| senat
    senat -.->|"Gelegenheit zur Äußerung"| aeusserung
    aeusserung -.-> rechtsfrage
    senat --> rechtsfrage
    rechtsfrage -->|Ja| nichtig
    rechtsfrage -->|"Nein: Rechtsvorschrift<br/>vereinbar"| bindung
    nichtig --> bindung
    keineVorlage ~~~ vorlage

    style keineVorlage fill:#fff3cd,stroke:#c9a227
    style unzulaessig fill:#f8d7da,stroke:#c0392b
    style nichtig fill:#fff3cd,stroke:#c9a227
    style bindung fill:#d4edda,stroke:#2d8a4a
`;export{e as default};