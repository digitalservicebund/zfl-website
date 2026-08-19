var e=`---
summary: "Zeigt, ob der zivilrechtliche Benachteiligungsschutz des AGG auf ein Schuldverhältnis anwendbar ist und welche Ansprüche auf Beseitigung, Unterlassung, Schadensersatz oder Entschädigung sich daraus samt Geltendmachungsfrist ergeben."
---
flowchart TD
    A["Zivilrechtliches Schuldverhältnis<br/>wird begründet, durchgeführt<br/>oder beendet"] --> B{"Massengeschäft, Geschäft mit<br/>nachrangiger Bedeutung der<br/>Person, oder privatrechtliche<br/>Versicherung?<br/>— <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 Abs. 1</a>"}
    B -->|Nein| C{"Grund = Rasse/ethnische<br/>Herkunft UND Bereich Bildung,<br/>Sozialschutz, soziale<br/>Vergünstigungen oder Güter/<br/>Dienstleistungen?<br/>— <a href='{{ELI}}#art-z19_abs-z2' target='_blank' rel='noopener'>§19 Abs. 2</a>"}
    C -->|Nein| Z0["AGG-Zivilrechtsschutz<br/>nicht anwendbar"]
    C -->|Ja| D
    B -->|Ja| D{"Familien- oder<br/>erbrechtliches<br/>Schuldverhältnis?<br/>— <a href='{{ELI}}#art-z19_abs-z4' target='_blank' rel='noopener'>§19 Abs. 4</a>"}
    D -->|Ja| Z0
    D -->|Nein| E{"Besonderes Nähe- oder<br/>Vertrauensverhältnis der<br/>Parteien/Angehörigen?<br/>— <a href='{{ELI}}#art-z19_abs-z5' target='_blank' rel='noopener'>§19 Abs. 5</a>"}
    E -->|Ja| Z0
    E -->|Nein| F{"Wohnraumvermietung zum<br/>dauerhaften Gebrauch durch<br/>Vermieter mit ≤ 50 Wohnungen?<br/>— <a href='{{ELI}}#art-z19_abs-z5' target='_blank' rel='noopener'>§19 Abs. 5 S. 3</a>"}
    F -->|Ja| Z0
    F -->|Nein| G{"Dient die unterschiedliche<br/>Behandlung bei Wohnraum-<br/>vermietung sozial stabilen<br/>Bewohnerstrukturen?<br/>— <a href='{{ELI}}#art-z19_abs-z3' target='_blank' rel='noopener'>§19 Abs. 3</a>"}
    G -->|Ja| Z1["Unterschiedliche Behandlung<br/>zulässig"]
    G -->|Nein| H["Benachteiligungsverbot<br/>gilt — <a href='{{ELI}}/art-z19' target='_blank' rel='noopener'>§19</a>"]
    H --> I["Anspruch auf Beseitigung, bei<br/>Wiederholungsgefahr auch<br/>Unterlassung<br/>— <a href='{{ELI}}#art-z21_abs-z1' target='_blank' rel='noopener'>§21 Abs. 1</a>"]
    H --> J{"Hat der Benachteiligende die<br/>Pflichtverletzung zu vertreten?<br/>— <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 Abs. 2</a>"}
    J -->|Nein| Z2["Kein Schadensersatz"]
    J -->|Ja| K["Schadensersatz und ggf.<br/>angemessene Entschädigung<br/>in Geld — <a href='{{ELI}}#art-z21_abs-z2' target='_blank' rel='noopener'>§21 Abs. 2</a>"]
    I --> L{"Innerhalb von 2 Monaten<br/>geltend gemacht?<br/>— <a href='{{ELI}}#art-z21_abs-z5' target='_blank' rel='noopener'>§21 Abs. 5</a>"}
    K --> L
    L -->|Ja| Z3["Anspruch durchsetzbar"]
    L -->|Nein| M{"War der/die Benachteiligte<br/>ohne Verschulden an der<br/>Fristwahrung gehindert?<br/>— <a href='{{ELI}}#art-z21_abs-z5' target='_blank' rel='noopener'>§21 Abs. 5 S. 2</a>"}
    M -->|Ja| Z3
    M -->|Nein| Z4["Anspruch ausgeschlossen"]

    style Z0 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#f8d7da,stroke:#c0392b
    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};