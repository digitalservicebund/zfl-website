var e=`flowchart TD
    A["Antrag der betroffenen Person<br/>auf Ausübung eines Rechts<br/>(Art. 15 bis 22)<br/>— Art. 12 Abs. 1"] --> B{"Kann die betroffene Person<br/>identifiziert werden?<br/>— Art. 12 Abs. 2"}

    B -->|"Nein"| R["Tätigwerden kann<br/>verweigert werden"]
    B -->|"Ja, aber Zweifel<br/>an der Identität"| ID["Zusätzliche Informationen<br/>zur Identitätsbestätigung<br/>anfordern<br/>— Art. 12 Abs. 6"]
    B -->|"Ja"| F

    ID --> F{"Ist der Antrag offenkundig<br/>unbegründet oder exzessiv<br/>(Nachweis durch<br/>Verantwortlichen)?<br/>— Art. 12 Abs. 5"}

    F -->|"Ja"| G["Angemessenes Entgelt<br/>verlangen oder<br/>Tätigwerden verweigern<br/>— Art. 12 Abs. 5 lit. a, b"]

    F -->|"Nein"| M1["Frist: 1 Monat<br/>nach Antragseingang<br/>— Art. 12 Abs. 3 S. 1"]

    M1 --> V{"Erfordern Komplexität<br/>oder Anzahl der Anträge<br/>eine Verlängerung?"}

    V -->|"Ja"| M2["Verlängerung um bis zu<br/>2 weitere Monate;<br/>Unterrichtung mit Gründen<br/>binnen 1 Monat<br/>— Art. 12 Abs. 3 S. 2–3"]
    V -->|"Nein"| T

    M2 --> T{"Wird der Verantwortliche<br/>innerhalb der Frist tätig?"}

    T -->|"Ja"| OK["Information/Maßnahme<br/>fristgerecht und<br/>unentgeltlich bereitgestellt<br/>— Art. 12 Abs. 3, Abs. 5"]

    T -->|"Nein"| ABL["Unterrichtung über Gründe<br/>sowie Beschwerde- und<br/>Rechtsbehelfsmöglichkeit,<br/>spätestens binnen 1 Monat<br/>— Art. 12 Abs. 4"]

    style OK fill:#d4edda,stroke:#2d8a4a
    style R fill:#f8d7da,stroke:#c0392b
    style ABL fill:#f8d7da,stroke:#c0392b
    style G fill:#fff3cd,stroke:#c9a227
`;export{e as default};