var e=`---
summary: "Zeigt das Antrags- und Prüfverfahren für die Registrierung eines homöopathischen Tierarzneimittels, von der elektronischen Antragstellung über die Vollständigkeitsprüfung bis zur Erteilung oder Ablehnung."
---
flowchart TD
    A["Antrag auf Registrierung eines homöopathischen Tierarzneimittels<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 Abs. 1</a>"] --> B["Elektronische Einreichung bei zuständiger Bundesoberbehörde<br/>in vorgegebenen Formaten/Strukturen nach Art. 87 Abs. 1 VO (EU) 2019/6<br/>Antrag/Unterlagen wahlweise auf Englisch, Kennzeichnung/Packungsbeilage auf Deutsch<br/>— <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 Abs. 1</a>, <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 Abs. 2</a>"]
    B --> C{"Sind die eingereichten Unterlagen vollständig und ausreichend?<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 Abs. 4</a>"}
    C -->|Nein| D["Benachrichtigung der Antragstellerin/des Antragstellers unter Angabe von Gründen<br/>Frist zur Mängelbeseitigung; Fristenlauf nach Art. 87 Abs. 4 VO (EU) 2019/6 wird gehemmt<br/>— <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 Abs. 4</a>"]
    D --> C
    C -->|Ja| E{"Liegt ein Versagungsgrund vor?<br/>(u.a. unvollständige Unterlagen, unzureichende analytische Prüfung/Qualität,<br/>kein homöopathisches Tierarzneimittel, Rückstandsproblematik bei Lebensmitteltieren,<br/>begründeter Verdacht schädlicher Wirkungen, bestehende Zulassung)<br/>— <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 Abs. 5</a>"}
    E -->|Ja| F["Antrag wird abgelehnt<br/>— <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 Abs. 5</a>"]
    E -->|Nein| G["Registrierung wird erteilt, ggf. mit Auflagen<br/>(z.B. Warnhinweise, Lagerungshinweise)<br/>— <a href='{{ELI}}#art-z1_abs-z5' target='_blank' rel='noopener'>§1 Abs. 5</a>, <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2</a>"]
    style F fill:#f8d7da,stroke:#c0392b
    style G fill:#d4edda,stroke:#2d8a4a
    style D fill:#fff3cd,stroke:#c9a227
`;export{e as default};