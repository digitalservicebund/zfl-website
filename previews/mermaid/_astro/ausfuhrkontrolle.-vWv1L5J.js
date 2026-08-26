var e=`---
summary: "Zeigt die Zollkontrolle beim Ausfuhrversuch eines Gebrauchtfahrzeugs, von der Altfahrzeug- und Verkehrssicherheitsprüfung über die Aussetzung bis zur endgültigen Freigabe oder Ablehnung."
---
flowchart TD
    A["Gebrauchtfahrzeug soll ab dem<br/>1.9.2031 aus der Union ausgeführt<br/>werden"] --> B{"Ist das Fahrzeug ein Altfahrzeug?<br/>— <a href='{{ELI}}#039.003' target='_blank' rel='noopener'>Art. 39 Abs. 3 Buchst. a</a>"}

    B -->|Ja| C["Ausfuhr unzulässig"]
    B -->|Nein| D{"Verkehrssicher zum Zeitpunkt der<br/>Ausfuhranmeldung (oder als Fahrzeug<br/>von kulturellem Interesse anerkannt)?<br/>— <a href='{{ELI}}#039.003' target='_blank' rel='noopener'>Art. 39 Abs. 3 Buchst. b</a>"}

    D -->|Nein| C
    D -->|Ja| E["Automatisierte Prüfung von FIN und<br/>Zulassungsdaten durch Zollbehörden<br/>— <a href='{{ELI}}#040.001' target='_blank' rel='noopener'>Art. 40 Abs. 1</a>"]

    E --> F{"Angaben stimmen mit nationalen<br/>Fahrzeug- und Prüfregistern überein?<br/>— <a href='{{ELI}}#040.002' target='_blank' rel='noopener'>Art. 40 Abs. 2</a>"}

    F -->|Nein| G["Zollbehörden überlassen das Fahrzeug<br/>nicht zur Ausfuhr und unterrichten die<br/>betroffene Person<br/>— <a href='{{ELI}}#040.002' target='_blank' rel='noopener'>Art. 40 Abs. 2</a>"]
    F -->|Ja| H["Risikobasierte Zollkontrolle<br/>— <a href='{{ELI}}#041.001' target='_blank' rel='noopener'>Art. 41 Abs. 1</a>,<br/><a href='{{ELI}}#041.002' target='_blank' rel='noopener'>Abs. 2</a>"]

    H --> I{"Grund zur Annahme, dass die<br/>Anforderungen des Kapitels VI nicht<br/>erfüllt sind? — <a href='{{ELI}}#042.001' target='_blank' rel='noopener'>Art. 42 Abs. 1</a>"}

    I -->|Nein| J["Überlassung zur Ausfuhr<br/>— <a href='{{ELI}}#043.001' target='_blank' rel='noopener'>Art. 43 Abs. 1</a>"]
    I -->|Ja| K["Zollbehörden setzen die Überlassung<br/>aus und unterrichten die zuständige<br/>Behörde — <a href='{{ELI}}#042.001' target='_blank' rel='noopener'>Art. 42 Abs. 1</a>"]

    K --> L{"Bittet die zuständige Behörde<br/>innerhalb von 4 Arbeitstagen um<br/>Aufrechterhaltung der Aussetzung?<br/>— <a href='{{ELI}}#043.001' target='_blank' rel='noopener'>Art. 43 Abs. 1</a>"}

    L -->|Nein| J
    L -->|"Ja, und Behörde stimmt<br/>der Ausfuhr zu"| J
    L -->|"Ja, Verstoß festgestellt"| M["Zuständige Behörde lehnt die<br/>Überlassung ab<br/>— <a href='{{ELI}}#044.001' target='_blank' rel='noopener'>Art. 44 Abs. 1</a>"]

    M --> N["Zollbehörden überlassen das<br/>Fahrzeug nicht zur Ausfuhr<br/>— <a href='{{ELI}}#044.002' target='_blank' rel='noopener'>Art. 44 Abs. 2</a>"]

    J --> O["Zollbehörden melden den Abgang;<br/>Zulassungsbehörde vermerkt die<br/>Ausfuhr im Fahrzeugregister<br/>— <a href='{{ELI}}#043.003' target='_blank' rel='noopener'>Art. 43 Abs. 3</a>"]

    style O fill:#d4edda,stroke:#2d8a4a
    style C fill:#f8d7da,stroke:#c0392b
    style G fill:#f8d7da,stroke:#c0392b
    style N fill:#f8d7da,stroke:#c0392b
`;export{e as default};