var e=`---
summary: "Zeigt, wann verstärkte Sorgfaltspflichten nach §15 GwG bei erhöhtem Geldwäscherisiko greifen (z. B. politisch exponierte Personen, Hochrisiko-Drittstaaten, komplexe Transaktionen oder Korrespondenzbeziehungen) und welche zusätzlichen Maßnahmen jeweils erforderlich sind."
---
flowchart TD
    A["Risikoanalyse oder Einzelfallprüfung<br/>anhand der Risikofaktoren aus Anlagen 1<br/>&amp; 2 — <a href='{{ELI}}#art-z15_abs-z2' target='_blank' rel='noopener'>§15 Abs. 2</a>"] --> B{"Höheres Risiko der Geldwäsche<br/>oder Terrorismusfinanzierung<br/>festgestellt? — <a href='{{ELI}}#art-z15_abs-z3' target='_blank' rel='noopener'>§15 Abs. 3</a>"}
    B -->|Nein| Z["Allgemeine Sorgfaltspflichten nach §10 genügen"]
    B -->|"PEP/Familie/nahestehend"| C["Zustimmung der Führungsebene, Herkunft<br/>der Vermögenswerte klären, verstärkte<br/>kontinuierliche Überwachung — <a href='{{ELI}}#art-z15_abs-z4' target='_blank' rel='noopener'>§15 Abs. 4</a>"]
    B -->|"Drittstaat hohes Risiko"| D["Zusätzliche Informationen einholen,<br/>Zustimmung der Führungsebene, verstärkte<br/>Überwachung;<br/>ggf. weitere Maßnahmen der<br/>Aufsichtsbehörde — <a href='{{ELI}}#art-z15_abs-z5' target='_blank' rel='noopener'>§15 Abs. 5</a>, <a href='{{ELI}}#art-z15_abs-z5a' target='_blank' rel='noopener'>Abs. 5a</a>"]
    B -->|"Komplexe/ungewöhnliche<br/>Transaktion"| E["Transaktion, Hintergrund und Zweck<br/>untersuchen;<br/>Prüfung einer Meldepflicht;<br/>Geschäftsbeziehung verstärkt überwachen<br/>— <a href='{{ELI}}#art-z15_abs-z6' target='_blank' rel='noopener'>§15 Abs. 6</a>, <a href='{{ELI}}#art-z43_abs-z1' target='_blank' rel='noopener'>§43 Abs. 1</a>"]
    B -->|"Korrespondenzbeziehung<br/>Drittstaat"| F["Informationen über Respondenten<br/>einholen, Zustimmung Führungsebene,<br/>Verantwortlichkeiten dokumentieren,<br/>Bank-Mantelgesellschaften ausschließen<br/>— <a href='{{ELI}}#art-z15_abs-z7' target='_blank' rel='noopener'>§15 Abs. 7</a>"]
    C --> G{"Verstärkte Sorgfaltspflichten<br/>können erfüllt werden? — <a href='{{ELI}}#art-z15_abs-z9' target='_blank' rel='noopener'>§15<br/>Abs. 9</a>"}
    D --> G
    E --> G
    F --> G
    G -->|Ja| H["Geschäftsbeziehung/Transaktion kann<br/>durchgeführt werden"]
    G -->|Nein| I["Geschäftsbeziehung nicht<br/>begründen/fortsetzen bzw. beenden,<br/>Transaktion nicht durchführen — <a href='{{ELI}}#art-z15_abs-z9' target='_blank' rel='noopener'>§15 Abs.<br/>9</a> i.V.m. <a href='{{ELI}}#art-z10_abs-z9' target='_blank' rel='noopener'>§10 Abs. 9</a>"]

    style H fill:#d4edda,stroke:#2d8a4a
    style Z fill:#d4edda,stroke:#2d8a4a
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};