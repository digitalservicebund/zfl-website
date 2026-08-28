var e=`---
summary: "Zeigt den Umgang mit den erhobenen Daten: Speicherung im automatisierten Verfahren, Übermittlung an andere Aufsichtsbehörden, Verantwortlichkeit für Abrufe, Korrekturmitteilung und Auskunftsrecht des Erlaubnisinhabers."
---
flowchart TD
    A["Daten nach §3 erhoben"] --> B["Erteilende oder kontrollierende Behörde speichert die Daten<br/>im automatisierten Verfahren mit Abrufmöglichkeit,<br/>zusätzlich u.a. Erlaubnisinhalt, Kontrollergebnis, Auflagenerfüllung<br/>— <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1</a>"]
    B --> C{"Benötigt eine andere für die Aufsicht nach §16 Abs. 1 Nr.4<br/>TierSchG zuständige Behörde die Daten zur Aufgabenwahrnehmung?"}
    C -->|Ja| D["Übermittlung der gespeicherten Daten, ggf. durch Abruf<br/>im automatisierten Verfahren<br/>— <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 Abs. 2</a>"]
    C -->|Nein| E["Keine Übermittlung"]
    D --> F["Verantwortung für Zulässigkeit des einzelnen Abrufs trägt die empfangende Behörde;<br/>speichernde Behörde prüft nur bei Anlass, muss aber Übermittlungen<br/>durch Stichproben feststellen/überprüfen können<br/>— <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3</a>"]
    G{"Stellt eine Behörde fest, dass von anderer Behörde gespeicherte Daten<br/>unvollständig, fehlerhaft oder nicht schlüssig sind?"} -->|Ja| H["Mitteilung an die andere Behörde<br/>— <a href='{{ELI}}#art-z4_abs-z4' target='_blank' rel='noopener'>§4 Abs. 4</a>"]
    B --> G
    G -->|Nein| I["Keine Mitteilung erforderlich"]
    J{"Stellt der Erlaubnisinhaber einen Antrag auf Auskunft<br/>über die ihn betreffenden Daten nach §3 Abs. 1?"} -->|Ja| K["Erteilende Behörde erteilt Auskunft<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5</a>"]
    B --> J
    J -->|Nein| L["Keine Auskunftserteilung"]
    style D fill:#d4edda,stroke:#2d8a4a
    style H fill:#d4edda,stroke:#2d8a4a
    style K fill:#d4edda,stroke:#2d8a4a
    style E fill:#fff3cd,stroke:#c9a227
    style I fill:#fff3cd,stroke:#c9a227
    style L fill:#fff3cd,stroke:#c9a227
`;export{e as default};