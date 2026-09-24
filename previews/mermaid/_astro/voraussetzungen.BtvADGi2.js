var e=`---
summary: "Zeigt die Voraussetzungen, unter denen ehemaligen Soldatinnen und Soldaten das Tragen der Uniform nach §§ 3, 4 und 6 UnifV genehmigt werden kann, einschließlich zulässiger Anlässe, Ausschlussgründen und der erforderlichen Gewähr für das Ansehen der Bundeswehr."
---
flowchart TD
    A["Ehemalige Soldatin/ehemaliger Soldat<br/>möchte Uniform tragen"] --> B{"Liegt ein Anlass nach <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a> vor?"}
    B -->|Nein| C["Genehmigung scheidet aus"]
    B -->|Ja| D{"Ausschlusstatbestand nach <a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a><br/>erfüllt?<br/>(berufliche/ehrenamtliche<br/>Teilnahme, außer bei<br/>Veranstaltungen nach <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3 Nr. 4</a>,<br/>oder Anlass, bei dem auch<br/>aktive Soldatinnen/Soldaten<br/>keine Uniform tragen dürfen)"}
    D -->|Ja| E["Genehmigung darf nicht erteilt werden<br/>— <a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>"]
    D -->|Nein| F{"Bieten<br/>Antragstellerin/Antragsteller<br/>bzw. Art und Umstände der<br/>Veranstaltung die Gewähr, dass<br/>das Ansehen der Bundeswehr<br/>nicht beeinträchtigt und die<br/>Trageberechtigung nicht<br/>missbraucht wird? — <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs. 3</a>"}
    F -->|Nein| G["Genehmigung wird nicht erteilt — <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs.<br/>3</a>"]
    F -->|Ja| H["Genehmigungsfähig — weiter mit<br/>Zuständigkeits- und Antragsverfahren<br/>— <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>"]

    style C fill:#f8d7da,stroke:#c0392b
    style E fill:#f8d7da,stroke:#c0392b
    style G fill:#f8d7da,stroke:#c0392b
    style H fill:#d4edda,stroke:#2d8a4a
`;export{e as default};