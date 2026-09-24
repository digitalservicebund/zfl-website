var e=`---
summary: "Zeigt die Voraussetzungen und Zuständigkeit der außergerichtlichen Streitbeilegung durch private oder – subsidiär – behördliche Schlichtungsstellen nach vorherigem internen Beschwerdeverfahren."
---
flowchart TD
    A["Rechtsinhaber oder Nutzer will Streit<br/>über Blockierung, öffentliche Wiedergabe<br/>oder Auskunftsrechte (<a href='{{ELI}}/art-z19' target='_blank' rel='noopener'>§19</a>)<br/>außergerichtlich beilegen"] --> B{"Zuvor internes<br/>Beschwerdeverfahren (<a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14</a>)<br/>durchgeführt oder Überprüfung<br/>durch externe Beschwerdestelle<br/>(<a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15</a>) erfolgt? — <a href='{{ELI}}#art-z16_abs-z3' target='_blank' rel='noopener'>§16 III Nr.1</a>"}

    B -->|Nein| Z1["Schlichtungsstelle darf noch nicht<br/>angerufen werden"]
    B -->|Ja| C{"Steht eine anerkannte<br/>privatrechtlich organisierte<br/>Schlichtungsstelle zur<br/>Verfügung? — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a>, <a href='{{ELI}}#art-z17_abs-z2' target='_blank' rel='noopener'>§17 II</a>"}

    C -->|Ja| D["Private Schlichtungsstelle ist zuständig<br/>— <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a>"]
    C -->|Nein| E["Behördliche Schlichtungsstelle beim<br/>Bundesamt für Justiz ist zuständig — <a href='{{ELI}}#art-z17_abs-z1' target='_blank' rel='noopener'>§17<br/>I</a>"]

    D --> F{"Diensteanbieter nimmt an der<br/>Schlichtung teil? — <a href='{{ELI}}#art-z16_abs-z3' target='_blank' rel='noopener'>§16 III<br/>Nr.2</a>"}
    E --> F

    F -->|Nein| Z2["Schlichtungsverfahren findet nicht<br/>statt; ordentlicher Rechtsweg bleibt<br/>offen"]
    F -->|Ja| Z3["Schlichtungsverfahren wird durchgeführt;<br/>Parteien können eine Einigung erzielen"]

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};