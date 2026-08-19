var e=`---
summary: "Zeigt die Berechnung der dreiwöchigen Klagefrist nach dem KSchG ab Zugang einer Kündigung sowie die Möglichkeit der nachträglichen Zulassung einer verspäteten Kündigungsschutzklage."
---
flowchart TD
    K["Schriftliche Kündigung geht<br/>dem Arbeitnehmer zu"] --> F1{"Bedarf die Kündigung der<br/>Zustimmung einer Behörde?<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 S.4</a>"}

    F1 -->|Ja| F1B["Klagefrist beginnt erst mit<br/>Bekanntgabe der Behörden-<br/>entscheidung an den AN"]
    F1 -->|Nein| F1C["Klagefrist beginnt mit<br/>Zugang der Kündigung"]

    F1B --> FRIST
    F1C --> FRIST["3-Wochen-Frist zur Klage beim<br/>Arbeitsgericht auf Feststellung,<br/>dass das Arbeitsverhältnis<br/>fortbesteht — <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4</a>"]

    FRIST --> Q1{"Klage innerhalb der<br/>3-Wochen-Frist erhoben?"}

    Q1 -->|Ja| VERF["Verfahren läuft: AN kann bis<br/>Schluss der mündl. Verhandlung<br/>1. Instanz auch nicht fristgerecht<br/>genannte Gründe nachschieben<br/>— <a href='{{ELI}}#art-z6_abs-z' target='_blank' rel='noopener'>§6</a>"]
    VERF --> URT["Gerichtliche Entscheidung<br/>über Wirksamkeit der Kündigung"]

    Q1 -->|Nein| Q2{"War AN trotz zumutbarer Sorgfalt<br/>an rechtzeitiger Klage gehindert?<br/>(oder: Schwangerschaft erst nach<br/>Fristablauf unverschuldet bekannt)<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"}

    Q2 -->|Nein| W7["Kündigung gilt als von Anfang<br/>an rechtswirksam; Vorbehalt<br/>nach <a href='{{ELI}}#art-z2_abs-z' target='_blank' rel='noopener'>§2</a> erlischt — <a href='{{ELI}}#art-z7_abs-z' target='_blank' rel='noopener'>§7</a>"]

    Q2 -->|Ja| ANTRAG["Antrag auf nachträgliche Zulassung,<br/>verbunden mit Klageerhebung — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a><br/><br/>Frist: binnen 2 Wochen nach<br/>Behebung des Hindernisses,<br/>spätestens 6 Monate nach<br/>Ende der versäumten Frist — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a>"]

    ANTRAG --> Q3{"Wird der Antrag vom<br/>Arbeitsgericht (ggf. per<br/>Zwischenurteil) zugelassen?<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 IV</a>"}

    Q3 -->|Ja| VERF
    Q3 -->|Nein| W7

    style W7 fill:#f8d7da,stroke:#c0392b
    style URT fill:#d4edda,stroke:#2d8a4a
    style ANTRAG fill:#fff3cd,stroke:#c9a227
`;export{e as default};