var e=`---
summary: "Zeigt das Registrierungsverfahren für ein homöopathisches Tierarzneimittel zwischen Antragsteller und zuständiger Bundesoberbehörde: elektronische Antragstellung, Vollständigkeitsprüfung mit Mängelbenachrichtigung und Fristhemmung sowie Erteilung oder Ablehnung."
---
swimlane-beta TD
    subgraph AS["Antragstellerin / Antragsteller"]
        start(["Stellt Antrag elektronisch in<br/>vorgegebenen Formaten/Strukturen<br/>(Unterlagen nach Art. 87 I VO (EU)<br/>2019/6) — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>; Unterlagen auch<br/>englisch, Kennzeichnung/Packungsbeilage<br/>deutsch — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II</a>; Änderungen unverzüglich<br/>anzeigen — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1 III</a>"])
        nachreichung["Legt zusätzliche Informationen vor oder<br/>die gesetzte Frist läuft ab:<br/>Hemmung endet — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.3</a>"]
    end

    subgraph BOB["Zuständige Bundesoberbehörde"]
        pruefung{"Unterlagen vollständig und<br/>ausreichend? — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.1</a>"}
        mangel["Benachrichtigt unter Angabe von Gründen,<br/>gibt Gelegenheit, Mängel in angemessener<br/>Frist auszuräumen — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.1-2</a>;<br/>Frist nach Art. 87 IV VO (EU) 2019/6 ab<br/>Zugang gehemmt — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.3</a>"]
        versagung{"Versagungsgrund nach <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 V</a>?<br/>(u.a. Unterlagen<br/>unvollständig, unzureichende<br/>Prüfung/Qualität, Verdacht<br/>schädlicher Wirkungen,<br/>Zulassung erteilt)"}
        ablehnung(["Antrag wird abgelehnt — <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 V</a>"])
        erteilung(["Registrierung wird erteilt, ggf. mit<br/>Auflagen (z.B. Warn- oder<br/>Lagerungshinweise) — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II</a>"])
    end

    start --> pruefung
    pruefung -->|Nein| mangel
    mangel --> nachreichung
    nachreichung --> versagung
    pruefung -->|Ja| versagung
    versagung -->|Ja| ablehnung
    versagung -->|Nein| erteilung

    style ablehnung fill:#f8d7da,stroke:#c0392b
    style erteilung fill:#d4edda,stroke:#2d8a4a
    style mangel fill:#fff3cd,stroke:#c9a227
`;export{e as default};