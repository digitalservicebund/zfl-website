var e=`---
summary: "Beschreibt das Ausfallverfahren für die Beförderung von Schaumwein unter Steueraussetzung, wenn das elektronische Beförderungs- und Kontrollsystem nicht verfügbar ist, einschließlich Ausfalldokument, Annullierung und Nachweis der Beendigung."
---
flowchart TD
    A["EDV-gestütztes Beförderungs-<br/>und Kontrollsystem steht nicht<br/>zur Verfügung — <a href='{{ELI}}#art-z24_abs-z1' target='_blank' rel='noopener'>§24 I</a>"] --> B{"Von ITZBund veröffentlichter<br/>Ausfall?<br/>— <a href='{{ELI}}#art-z24_abs-z2' target='_blank' rel='noopener'>§24 II</a>"}

    B -->|Nein| C["Versender unterrichtet<br/>Hauptzollamt vor erster<br/>Beförderung schriftlich<br/>über den Ausfall — <a href='{{ELI}}#art-z24_abs-z2' target='_blank' rel='noopener'>§24 II</a>"]
    C --> D
    B -->|Ja| D["Versender fertigt Ausfalldokument<br/>vor Beginn der Beförderung in<br/>3 Exemplaren aus — <a href='{{ELI}}#art-z24_abs-z3' target='_blank' rel='noopener'>§24 III</a><br/><br/>1. eigene Aufzeichnungen<br/>2. unverzüglich an Hauptzollamt<br/>3. Beförderer führt es mit"]

    D --> E{"Versender will vor Beginn<br/>der Beförderung annullieren?<br/>— <a href='{{ELI}}#art-z25_abs-z1' target='_blank' rel='noopener'>§25 I</a>"}
    E -->|Ja| F["Annullierungsdokument in<br/>2 Exemplaren; 2. Exemplar<br/>unverzüglich an Hauptzollamt<br/>— <a href='{{ELI}}#art-z25_abs-z2' target='_blank' rel='noopener'>§25 II</a>"]
    F --> ANNULLIERT["Beförderung im<br/>Ausfallverfahren entfällt"]

    E -->|Nein| G["Beförderung beginnt mit<br/>Ausfalldokument statt e-VD"]

    G --> H{"EDV-System während der<br/>Beförderung wieder verfügbar?"}

    H -->|Nein| I["Empfänger kann Eingangsmeldung<br/>nicht fristgerecht übermitteln:<br/>Eingangsdokument beim<br/>Hauptzollamt vorlegen<br/>— <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27 I</a>"]
    I --> J["Hauptzollamt bestätigt die<br/>3 Exemplare, gibt 1. Exemplar<br/>an Empfänger zurück — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II</a>"]

    J --> K{"EDV-System danach<br/>wieder verfügbar und e-VD<br/>bzw. Meldung liegt vor?<br/>— <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III</a>"}
    K -->|Ja| L["Empfänger übermittelt<br/>nachträglich elektronische<br/>Eingangsmeldung mit denselben<br/>Daten — <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III</a>"]
    L --> NACHWEIS
    K -->|Nein| ERSATZ["Nachweis der Beendigung ggf.<br/>über Ersatznachweis (z.B.<br/>Empfangsbestätigung)<br/>— <a href='{{ELI}}/art-z28' target='_blank' rel='noopener'>§28</a>"]

    H -->|Ja, vor Beendigung<br/>der Beförderung| M["Versender übermittelt<br/>unverzüglich Entwurf des e-VD<br/>mit den Daten des Ausfall-<br/>dokuments — <a href='{{ELI}}#art-z24_abs-z5' target='_blank' rel='noopener'>§24 V</a>"]

    M --> N["Referenzcode wird auf 1. und<br/>3. Ausfertigung des Ausfall-<br/>dokuments eingetragen; e-VD<br/>tritt an dessen Stelle<br/>— <a href='{{ELI}}#art-z24_abs-z7' target='_blank' rel='noopener'>§24 VII</a>"]

    N --> O["Weiteres Verfahren wie bei<br/>regulärer e-VD-Beförderung<br/>(Eingangsmeldung nach §21)"]
    O --> NACHWEIS["Nachweis der Beendigung<br/>der Beförderung erbracht"]

    style NACHWEIS fill:#d4edda,stroke:#2d8a4a
    style ERSATZ fill:#fff3cd,stroke:#c9a227
    style ANNULLIERT fill:#f8d7da,stroke:#c0392b
`;export{e as default};