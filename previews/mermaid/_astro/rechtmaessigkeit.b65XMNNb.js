var e=`flowchart TD
    A["Personenbezogene Daten<br/>sollen verarbeitet werden"] --> B{"Liegt eine der Bedingungen<br/>aus Art. 6 Abs. 1 vor?"}

    B -->|"Einwilligung erteilt<br/>— Art. 6 Abs. 1 lit. a"| Z["Verarbeitung ist<br/>rechtmäßig"]
    B -->|"Vertragserfüllung/<br/>vorvertragliche Maßnahme<br/>— Art. 6 Abs. 1 lit. b"| Z
    B -->|"Rechtliche Verpflichtung<br/>— Art. 6 Abs. 1 lit. c"| Z
    B -->|"Schutz lebenswichtiger<br/>Interessen<br/>— Art. 6 Abs. 1 lit. d"| Z
    B -->|"Öffentliches Interesse/<br/>öffentliche Gewalt<br/>— Art. 6 Abs. 1 lit. e"| Z
    B -->|"Berechtigtes Interesse<br/>— Art. 6 Abs. 1 lit. f"| C{"Ist der Verantwortliche<br/>eine Behörde in Erfüllung<br/>ihrer Aufgaben?<br/>— Art. 6 Abs. 1 UAbs. 2"}
    B -->|"Keine Bedingung erfüllt"| N["Verarbeitung ist<br/>unrechtmäßig"]

    C -->|"Ja"| N
    C -->|"Nein"| D{"Überwiegen Interessen,<br/>Grundrechte oder<br/>-freiheiten der betroffenen<br/>Person (insb. bei Kindern)?<br/>— Art. 6 Abs. 1 lit. f"}
    D -->|"Ja"| N
    D -->|"Nein"| Z

    style Z fill:#d4edda,stroke:#2d8a4a
    style N fill:#f8d7da,stroke:#c0392b
`;export{e as default};