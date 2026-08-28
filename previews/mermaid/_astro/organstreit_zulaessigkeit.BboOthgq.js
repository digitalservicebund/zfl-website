var e=`---
summary: "Prüfschema für die Zulässigkeit eines Organstreitverfahrens: Beteiligtenfähigkeit, Antragsbefugnis, Formerfordernisse und die sechsmonatige Antragsfrist."
---
flowchart TD
    START["Streit zwischen Verfassungs-<br/>organen über Rechte und<br/>Pflichten nach dem Grundgesetz"] --> BET{"Antragsteller und -gegner:<br/>Bundespräsident, Bundestag,<br/>Bundesrat, Bundesregierung<br/>oder mit eigenen Rechten<br/>ausgestatteter Organteil?<br/>— <a href='{{ELI}}#art-z63' target='_blank' rel='noopener'>§63</a>"}

    BET -->|Nein| U1["Unzulässig:<br/>keine Beteiligtenfähigkeit"]
    BET -->|Ja| BEF{"Antragsteller macht geltend,<br/>durch Maßnahme/Unterlassung<br/>des Antragsgegners in eigenen<br/>GG-Rechten verletzt oder<br/>unmittelbar gefährdet zu sein?<br/>— <a href='{{ELI}}#art-z64_abs-z1' target='_blank' rel='noopener'>§64 I</a>"}

    BEF -->|Nein| U2["Unzulässig:<br/>keine Antragsbefugnis"]
    BEF -->|Ja| FORM{"Verletzte Bestimmung des<br/>Grundgesetzes im Antrag<br/>bezeichnet?<br/>— <a href='{{ELI}}#art-z64_abs-z2' target='_blank' rel='noopener'>§64 II</a>"}

    FORM -->|Nein| U3["Unzulässig:<br/>Formmangel"]
    FORM -->|Ja| FRIST{"Antrag binnen 6 Monaten<br/>seit Bekanntwerden der<br/>beanstandeten Maßnahme/<br/>Unterlassung gestellt?<br/>— <a href='{{ELI}}#art-z64_abs-z3' target='_blank' rel='noopener'>§64 III</a>"}

    FRIST -->|Ja| ZUL
    FRIST -->|Nein| UEB{"War die Frist bereits bei<br/>Inkrafttreten des Gesetzes<br/>verstrichen? Übergangsfrist:<br/>3 Monate nach Inkrafttreten<br/>— <a href='{{ELI}}#art-z64_abs-z4' target='_blank' rel='noopener'>§64 IV</a>"}

    UEB -->|Ja, eingehalten| ZUL["Zulässig — BVerfG unterrichtet<br/>Bundespräsident, Bundestag,<br/>Bundesrat, Bundesregierung<br/>— <a href='{{ELI}}#art-z65_abs-z2' target='_blank' rel='noopener'>§65 II</a>"]
    UEB -->|Nein| U4["Unzulässig: verfristet"]

    ZUL --> ENT["Entscheidung: Feststellung,<br/>ob die Maßnahme/Unterlassung<br/>gegen eine GG-Bestimmung<br/>verstößt — <a href='{{ELI}}#art-z67' target='_blank' rel='noopener'>§67</a>"]

    style U1 fill:#f8d7da,stroke:#c0392b
    style U2 fill:#f8d7da,stroke:#c0392b
    style U3 fill:#f8d7da,stroke:#c0392b
    style U4 fill:#f8d7da,stroke:#c0392b
    style ZUL fill:#d4edda,stroke:#2d8a4a
    style ENT fill:#d4edda,stroke:#2d8a4a
`;export{e as default};