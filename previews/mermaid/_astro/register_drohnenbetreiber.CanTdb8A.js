var e=`flowchart TD
    A["Person mit Hauptwohnsitz/Sitz<br/>in Deutschland betreibt ein<br/>unbemanntes Fluggerät<br/>— <a href='{{ELI}}#art-z66a_abs-z1' target='_blank' rel='noopener'>§66a Abs. 1</a>"] --> B{"Betriebskategorie „offen“ mit<br/>Startmasse ≥ 250 g und<br/>kinetischer Energie > 80 Joule<br/>bei Aufprall auf einen<br/>Menschen?<br/>— <a href='{{ELI}}#art-z66a_abs-z1' target='_blank' rel='noopener'>§66a Abs. 1 Nr. 1</a>"}
    B -->|Ja| E{"Behörde/Organisation mit<br/>Sicherheitsaufgaben zur<br/>Erfüllung gesetzlicher<br/>Aufgaben?<br/>— <a href='{{ELI}}#art-z66a_abs-z12' target='_blank' rel='noopener'>§66a Abs. 12</a>"}
    B -->|Nein| C{"Betriebskategorie „offen“ mit<br/>Sensor zur Erhebung/<br/>Speicherung personenbezogener<br/>Daten (kein spielzeugkonformes<br/>Gerät)?<br/>— <a href='{{ELI}}#art-z66a_abs-z1' target='_blank' rel='noopener'>§66a Abs. 1 Nr. 2</a>"}
    C -->|Ja| E
    C -->|Nein| D{"Betriebskategorie „speziell“,<br/>beliebige Startmasse?<br/>— <a href='{{ELI}}#art-z66a_abs-z1' target='_blank' rel='noopener'>§66a Abs. 1 Nr. 3</a>"}
    D -->|Ja| E
    D -->|Nein| Z1["Keine Registrierungspflicht<br/>nach §66a"]
    E -->|Ja| Z2["Von der Registrierungspflicht<br/>ausgenommen<br/>— <a href='{{ELI}}#art-z66a_abs-z12' target='_blank' rel='noopener'>§66a Abs. 12</a>"]
    E -->|Nein| F{"Betreiber ist Mitglied eines<br/>Luftsportverbands?<br/>— <a href='{{ELI}}#art-z66a_abs-z4' target='_blank' rel='noopener'>§66a Abs. 4</a>"}
    F -->|Ja| G["Luftsportverband kann die<br/>Registrierungsdaten für seine<br/>Mitglieder unter Beachtung der<br/>DSGVO übermitteln<br/>— <a href='{{ELI}}#art-z66a_abs-z4' target='_blank' rel='noopener'>§66a Abs. 4</a>"]
    F -->|Nein| H["Betreiber übermittelt dem<br/>Luftfahrt-Bundesamt vor<br/>Erstbetrieb die Registrierungs-<br/>daten nach Abs. 2 und belegt<br/>deren Richtigkeit auf Verlangen<br/>— <a href='{{ELI}}#art-z66a_abs-z3' target='_blank' rel='noopener'>§66a Abs. 3 S. 1</a>"]
    G --> I
    H --> I["Luftfahrt-Bundesamt registriert<br/>(ggf. automatisiert) und<br/>übermittelt eine Registrierungs-<br/>nummer für alle betriebenen<br/>Fluggeräte<br/>— <a href='{{ELI}}#art-z66a_abs-z5' target='_blank' rel='noopener'>§66a Abs. 5</a>"]
    I --> J["Registrierte Betreiber melden<br/>jede Änderung der Vorausset-<br/>zungen oder Daten unverzüglich<br/>— <a href='{{ELI}}#art-z66a_abs-z3' target='_blank' rel='noopener'>§66a Abs. 3 S. 2</a>"]
    J --> K{"Werden die Daten für die<br/>Aufgabenerfüllung des Luft-<br/>fahrt-Bundesamtes noch<br/>benötigt?<br/>— <a href='{{ELI}}#art-z66a_abs-z9' target='_blank' rel='noopener'>§66a Abs. 9 S. 1</a>"}
    K -->|Ja| L{"Wurden innerhalb von 5 Jahren<br/>Ermittlungen wegen eines<br/>Verstoßes gegen Verkehrs-<br/>recht/Strafgesetze bekannt,<br/>für die die Daten erforderlich<br/>sind?<br/>— <a href='{{ELI}}#art-z66a_abs-z9' target='_blank' rel='noopener'>§66a Abs. 9 S. 2</a>"}
    L -->|Ja| M["Löschung erst nach Abschluss<br/>des Ermittlungs- bzw.<br/>Strafverfahrens<br/>— <a href='{{ELI}}#art-z66a_abs-z9' target='_blank' rel='noopener'>§66a Abs. 9 S. 2</a>"]
    L -->|Nein| J
    K -->|Nein| Z3["Unverzügliche Löschung,<br/>spätestens nach 5 Jahren<br/>— <a href='{{ELI}}#art-z66a_abs-z9' target='_blank' rel='noopener'>§66a Abs. 9 S. 1</a>"]
    M --> Z3

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#fff3cd,stroke:#c9a227
    style Z3 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};