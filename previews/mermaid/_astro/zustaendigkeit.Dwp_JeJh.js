var e=`---
summary: "Zeigt, welche Stelle je nach Anlass und Fallkonstellation nach § 5 UnifV für die Entscheidung über die Genehmigung zum Tragen der Uniform zuständig ist."
---
flowchart TD
    A["Genehmigungsfähiger Antrag (bzw.<br/>Zuziehung zu dienstlicher Veranstaltung)<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"] --> B{"Anlass nach <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3 Nr. 6</a><br/>(dienstliche Veranstaltung)?"}
    B -->|Ja| C["Genehmigung erfolgt von Amts wegen — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5<br/>Abs. 1 S. 2</a><br/>Zuständige Stelle für die Zuziehung<br/>entscheidet — <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs. 4</a>"]
    B -->|Nein| D{"Soll die Uniform im Einzelfall<br/>im Ausland getragen werden?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3 Nr. 2</a>"}
    D -->|Ja| E["Streitkräfteamt entscheidet — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3</a>"]
    D -->|Nein| F{"Antrag einer Generalin/eines<br/>Generals oder einer<br/>Admiralin/eines Admirals bei<br/>später gestellten Anträgen<br/>oder Anlässen nach <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3 Nr. 5</a>?<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3 Nr. 3</a>"}
    F -->|Ja| E
    F -->|Nein| G{"Antrag vor Beendigung des<br/>Wehrdienstverhältnisses<br/>gestellt und Anlass nach <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3<br/>Nr. 1 bis 4</a>?"}
    G -->|Ja| H["Letzte Disziplinarvorgesetzte/letzter<br/>Disziplinarvorgesetzter entscheidet — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5<br/>Abs. 2 S. 1</a>"]
    G -->|Nein| I{"Besteht eine Zuständigkeit<br/>nach — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2</a>?"}
    I -->|Nein| E
    I -->|Ja| J["Zuständiges Landeskommando (Wohnsitz)<br/>entscheidet — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2 S. 2</a>"]

    style C fill:#d4edda,stroke:#2d8a4a
    style E fill:#d4edda,stroke:#2d8a4a
    style H fill:#d4edda,stroke:#2d8a4a
    style J fill:#d4edda,stroke:#2d8a4a
`;export{e as default};