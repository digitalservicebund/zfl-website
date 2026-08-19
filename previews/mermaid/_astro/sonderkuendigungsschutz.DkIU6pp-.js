var e=`---
summary: "Veranschaulicht die Dauer des besonderen Kündigungsschutzes nach §15 KSchG für Betriebsrats-, Personalvertretungs- und Wahlvorstandsmitglieder sowie Wahlbewerber, einschließlich der jeweiligen nachwirkenden Schutzfristen."
---
gantt
    title Sonderkündigungsschutz §15 KSchG - Zeiträume ab jeweiligem Auslöseereignis (T0, illustrativ ausgerichtet)
    dateFormat YYYY-MM-DD
    axisFormat %b

    section Betriebsrat/JAV/Seebetriebsrat (Abs.1)
    Amtszeit (Dauer variabel, außerhalb §15 geregelt) :active, a1, 2024-01-01, 90d
    Nachwirkende Schutzfrist - 1 Jahr                  :crit, a2, after a1, 365d

    section Bordvertretung (Abs.1)
    Amtszeit (Dauer variabel)                         :active, b1, 2024-01-01, 90d
    Nachwirkende Schutzfrist - 6 Monate                :crit, b2, after b1, 180d

    section Personalvertretung/JAV, öff. Dienst (Abs.2)
    Amtszeit (Dauer variabel)                         :active, c1, 2024-01-01, 90d
    Nachwirkende Schutzfrist - 1 Jahr                  :crit, c2, after c1, 365d

    section Wahlvorstand (Abs.3)
    Bestellung bis Bekanntgabe Wahlergebnis (variabel) :active, d1, 2024-01-01, 60d
    Nachwirkende Schutzfrist - 6 Monate                 :crit, d2, after d1, 180d

    section Wahlbewerber (Abs.3)
    Wahlvorschlag bis Bekanntgabe Wahlergebnis (variabel) :active, e1, 2024-01-01, 45d
    Nachwirkende Schutzfrist - 6 Monate                    :crit, e2, after e1, 180d

    section Einladende/Antragsteller Wahlvorstand (Abs.3a)
    Variante A - bis Bekanntgabe Wahlergebnis (variabel)  :active, f1, 2024-01-01, 60d
    Variante B - keine Wahl zustande gekommen, 3 Monate   :crit, f2, 2024-01-01, 90d

    section Vorbereitungsinitiator Betriebsrat (Abs.3b)
    Erklärung bis Einladung zur Versammlung, max. 3 Monate :crit, g1, 2024-01-01, 90d
`;export{e as default};