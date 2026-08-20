var e=`---
summary: "Ordnet den Missbrauchstatbeständen des UrhDaG die jeweils vorgesehenen Konsequenzen zu, je nachdem ob vermeintliche Rechtsinhaber, Rechtsinhaber, Nutzer oder der Diensteanbieter selbst missbräuchlich handeln."
---
flowchart TD
    A["Prüfung auf Missbrauch der Verfahren<br/>nach §§7, 8, 11, 14"] --> B{"Wer handelt<br/>missbräuchlich?"}

    B -->|"Vermeintlicher<br/>Rechtsinhaber"| C{"Verlangt wiederholt Blockierung<br/>eines fremden oder gemeinfreien<br/>Werks als eigenes Werk? —<br/><a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"}
    C -->|Ja| D["Ausschluss von den Verfahren<br/>nach <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7</a> und <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a> für<br/>angemessenen Zeitraum —<br/><a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>"]
    D --> D2["Diensteanbieter muss zudem bestmöglich<br/>sicherstellen, dass das gemeinfreie<br/>Werk nicht erneut blockiert wird —<br/><a href='{{ELI}}#art-z18_abs-z4' target='_blank' rel='noopener'>§18 IV</a>"]
    C -->|"Ja, vorsätzlich<br/>oder fahrlässig"| E["Schadensersatzpflicht gegenüber<br/>Diensteanbieter und Nutzer —<br/><a href='{{ELI}}#art-z18_abs-z2' target='_blank' rel='noopener'>§18 II</a>"]

    B -->|Rechtsinhaber| F{"Verlangt wiederholt zu Unrecht<br/>sofortige Blockierung<br/>(<a href='{{ELI}}#art-z14_abs-z4' target='_blank' rel='noopener'>§14 IV</a>) oder Blockierung wegen<br/>Entstellung (<a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8</a>)? —<br/><a href='{{ELI}}#art-z18_abs-z3' target='_blank' rel='noopener'>§18 III</a>"}
    F -->|Ja| G["Ausschluss vom jeweiligen<br/>Verfahren für angemessenen<br/>Zeitraum — <a href='{{ELI}}#art-z18_abs-z3' target='_blank' rel='noopener'>§18 III</a>"]

    B -->|Nutzer| H{"Kennzeichnet wiederholt<br/>fälschlich eine Nutzung als<br/>gesetzlich erlaubt? —<br/><a href='{{ELI}}#art-z18_abs-z5' target='_blank' rel='noopener'>§18 V</a>"}
    H -->|Ja| I["Ausschluss von der<br/>Kennzeichnungsmöglichkeit für<br/>angemessenen Zeitraum —<br/><a href='{{ELI}}#art-z18_abs-z5' target='_blank' rel='noopener'>§18 V</a>"]

    B -->|Diensteanbieter| J{"Blockiert wiederholt<br/>fälschlicherweise erlaubte<br/>Nutzungen? —<br/><a href='{{ELI}}#art-z18_abs-z6' target='_blank' rel='noopener'>§18 VI</a>"}
    J -->|Ja| K["Unterlassungsanspruch durch<br/>eingetragenen Nutzerinteressen-<br/>Verein — <a href='{{ELI}}#art-z18_abs-z6' target='_blank' rel='noopener'>§18 VI</a>"]

    style D2 fill:#d4edda,stroke:#2d8a4a
    style D fill:#f8d7da,stroke:#c0392b
    style E fill:#f8d7da,stroke:#c0392b
    style G fill:#f8d7da,stroke:#c0392b
    style I fill:#f8d7da,stroke:#c0392b
    style K fill:#f8d7da,stroke:#c0392b
`;export{e as default};