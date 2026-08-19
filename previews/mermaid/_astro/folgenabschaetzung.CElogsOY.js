var e=`flowchart TD
    A["Neue Verarbeitung geplant,<br/>insb. mit neuen<br/>Technologien"] --> B{"Voraussichtlich hohes Risiko<br/>für Rechte und Freiheiten<br/>natürlicher Personen<br/>(z.B. Profiling, umfangreiche<br/>Verarbeitung sensibler Daten,<br/>systematische Überwachung)?<br/>— Art. 35 Abs. 1, Abs. 3"}

    B -->|"Nein, und nicht auf<br/>Positivliste der<br/>Aufsichtsbehörde<br/>— Art. 35 Abs. 4"| N1["Keine Datenschutz-<br/>Folgenabschätzung<br/>erforderlich"]

    B -->|"Ja"| C["Datenschutz-<br/>Folgenabschätzung<br/>durchführen<br/>— Art. 35 Abs. 1"]

    C --> D["Rat des Datenschutz-<br/>beauftragten einholen,<br/>sofern benannt<br/>— Art. 35 Abs. 2"]

    D --> E["Beschreibung, Verhältnis-<br/>mäßigkeitsprüfung,<br/>Risikobewertung und<br/>Abhilfemaßnahmen<br/>festlegen<br/>— Art. 35 Abs. 7"]

    E --> F{"Verbleibt trotz<br/>Abhilfemaßnahmen ein<br/>hohes Risiko?<br/>— Art. 36 Abs. 1"}

    F -->|"Nein"| G["Verarbeitung kann<br/>durchgeführt werden"]

    F -->|"Ja"| H["Konsultation der<br/>Aufsichtsbehörde vor<br/>Beginn der Verarbeitung<br/>— Art. 36 Abs. 1, Abs. 3"]

    H --> I{"Antwort der<br/>Aufsichtsbehörde innerhalb<br/>von 8 Wochen (verlängerbar<br/>um 6 Wochen)<br/>— Art. 36 Abs. 2"}

    I -->|"Keine Einwände"| G
    I -->|"Verarbeitung nicht<br/>verordnungskonform"| J["Schriftliche Empfehlungen;<br/>ggf. Ausübung der<br/>Befugnisse nach Art. 58<br/>— Art. 36 Abs. 2"]

    style G fill:#d4edda,stroke:#2d8a4a
    style N1 fill:#fff3cd,stroke:#c9a227
    style J fill:#f8d7da,stroke:#c0392b
`;export{e as default};