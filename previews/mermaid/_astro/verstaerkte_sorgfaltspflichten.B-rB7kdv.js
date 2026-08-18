var e=`flowchart TD
    A["Risikoanalyse oder Einzelfallprüfung anhand<br/>der Risikofaktoren aus Anlagen 1 &amp; 2<br/>— <a href='{{ELI}}#art-z15_abs-z2' target='_blank' rel='noopener'>§15 Abs. 2</a>"] --> B{"Höheres Risiko der Geldwäsche oder<br/>Terrorismusfinanzierung festgestellt?<br/>— <a href='{{ELI}}#art-z15_abs-z3' target='_blank' rel='noopener'>§15 Abs. 3</a>"}
    B -->|Nein| Z["Allgemeine Sorgfaltspflichten nach §10 genügen"]
    B -->|"PEP/Familie/nahestehend"| C["Zustimmung der Führungsebene, Herkunft der<br/>Vermögenswerte klären, verstärkte kontinuierliche<br/>Überwachung<br/>— <a href='{{ELI}}#art-z15_abs-z4' target='_blank' rel='noopener'>§15 Abs. 4</a>"]
    B -->|"Drittstaat hohes Risiko"| D["Zusätzliche Informationen einholen, Zustimmung<br/>der Führungsebene, verstärkte Überwachung;<br/>ggf. weitere Maßnahmen der Aufsichtsbehörde<br/>— <a href='{{ELI}}#art-z15_abs-z5' target='_blank' rel='noopener'>§15 Abs. 5</a>, <a href='{{ELI}}#art-z15_abs-z5a' target='_blank' rel='noopener'>Abs. 5a</a>"]
    B -->|"Komplexe/ungewöhnliche<br/>Transaktion"| E["Transaktion, Hintergrund und Zweck untersuchen;<br/>Prüfung einer Meldepflicht; Geschäftsbeziehung<br/>verstärkt überwachen<br/>— <a href='{{ELI}}#art-z15_abs-z6' target='_blank' rel='noopener'>§15 Abs. 6</a>, <a href='{{ELI}}#art-z43_abs-z1' target='_blank' rel='noopener'>§43 Abs. 1</a>"]
    B -->|"Korrespondenzbeziehung<br/>Drittstaat"| F["Informationen über Respondenten einholen,<br/>Zustimmung Führungsebene, Verantwortlichkeiten<br/>dokumentieren, Bank-Mantelgesellschaften ausschließen<br/>— <a href='{{ELI}}#art-z15_abs-z7' target='_blank' rel='noopener'>§15 Abs. 7</a>"]
    C --> G{"Verstärkte Sorgfaltspflichten<br/>können erfüllt werden?<br/>— <a href='{{ELI}}#art-z15_abs-z9' target='_blank' rel='noopener'>§15 Abs. 9</a>"}
    D --> G
    E --> G
    F --> G
    G -->|Ja| H["Geschäftsbeziehung/Transaktion<br/>kann durchgeführt werden"]
    G -->|Nein| I["Geschäftsbeziehung nicht begründen/fortsetzen<br/>bzw. beenden, Transaktion nicht durchführen<br/>— <a href='{{ELI}}#art-z15_abs-z9' target='_blank' rel='noopener'>§15 Abs. 9</a> i.V.m. <a href='{{ELI}}#art-z10_abs-z9' target='_blank' rel='noopener'>§10 Abs. 9</a>"]

    style H fill:#d4edda,stroke:#2d8a4a
    style Z fill:#d4edda,stroke:#2d8a4a
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};