var e=`---
summary: "Zeigt die Haftung des Luftfrachtführers nach dem LuftVG für Personenschäden, Verspätung und Gepäckschäden bei der Fluggastbeförderung, einschließlich Haftungsgrenzen, Ausschlussgründen und der zweijährigen Klagefrist."
---
flowchart TD
    A["Schaden bei vertraglich<br/>geschuldeter Luftbeförderung<br/>eines Fluggastes<br/>— <a href='{{ELI}}/art-z44' target='_blank' rel='noopener'>§44</a>"] --> B{"Ist die Haftung bereits durch<br/>vorrangiges internationales/<br/>EU-Recht (Warschauer Abk.,<br/>Montrealer Übereink., VO (EG)<br/>2027/97, VO (EG) 785/2004)<br/>abschließend geregelt?<br/>— <a href='{{ELI}}/art-z44' target='_blank' rel='noopener'>§44</a>"}
    B -->|Ja| Z1["LuftVG-Haftungsregeln nicht<br/>anwendbar — vorrangiges<br/>Recht gilt"]
    B -->|Nein| C{"Um welche Schadensart<br/>geht es?"}

    C -->|"Tod/Körperverletzung/<br/>Gesundheitsschädigung<br/>durch Unfall"| D["Luftfrachtführer muss<br/>Schaden ersetzen<br/>— <a href='{{ELI}}#art-z45_abs-z1' target='_blank' rel='noopener'>§45 Abs. 1</a>"]
    D --> E{"Wurde der Schaden durch<br/>rechtswidriges/schuldhaftes<br/>Handeln des Luftfrachtführers,<br/>seiner Leute oder ausschließlich<br/>eines Dritten verursacht?<br/>— <a href='{{ELI}}#art-z45_abs-z2' target='_blank' rel='noopener'>§45 Abs. 2</a>"}
    E -->|Nein| F["Haftung je Fluggast auf<br/>128 821 Rechnungseinheiten<br/>begrenzt — <a href='{{ELI}}#art-z45_abs-z2' target='_blank' rel='noopener'>§45 Abs. 2</a>"]
    E -->|Ja| G["Unbegrenzte Haftung"]

    C -->|"Verspätete<br/>Personenbeförderung"| H["Luftfrachtführer muss<br/>Verspätungsschaden ersetzen<br/>— <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 Abs. 1 S. 1</a>"]
    H --> I{"Haben Luftfrachtführer und<br/>seine Leute alle zumutbaren<br/>Maßnahmen zur Vermeidung<br/>getroffen (oder unmöglich)?<br/>— <a href='{{ELI}}#art-z46_abs-z1' target='_blank' rel='noopener'>§46 Abs. 1 S. 2</a>"}
    I -->|Ja| Z2["Haftung ausgeschlossen"]
    I -->|Nein| J{"Vorsatz oder grobe<br/>Fahrlässigkeit?<br/>— <a href='{{ELI}}#art-z46_abs-z2' target='_blank' rel='noopener'>§46 Abs. 2 S. 2</a>"}
    J -->|Nein| K["Haftung je Fluggast auf<br/>5 346 Rechnungseinheiten<br/>begrenzt — <a href='{{ELI}}#art-z46_abs-z2' target='_blank' rel='noopener'>§46 Abs. 2 S. 1</a>"]
    J -->|Ja| G

    C -->|"Zerstörung/Beschädigung/<br/>Verlust/Verspätung von<br/>aufgegebenem Reisegepäck"| L["Luftfrachtführer muss<br/>Schaden ersetzen<br/>— <a href='{{ELI}}#art-z47_abs-z1' target='_blank' rel='noopener'>§47 Abs. 1, 2</a>"]
    L --> M{"Anzeige binnen 7 Tagen<br/>(Beschädigung) bzw. 21 Tagen<br/>(Verspätung) nach Entdeckung/<br/>Bereitstellung erstattet?<br/>— <a href='{{ELI}}#art-z47_abs-z6' target='_blank' rel='noopener'>§47 Abs. 6</a>"}
    M -->|"Nein (und kein<br/>arglistiges Handeln)"| Z3["Anspruch ausgeschlossen"]
    M -->|Ja| N{"Vorsatz oder grobe<br/>Fahrlässigkeit des<br/>Luftfrachtführers?<br/>— <a href='{{ELI}}#art-z47_abs-z5' target='_blank' rel='noopener'>§47 Abs. 5</a>"}
    N -->|Ja| G
    N -->|Nein| O["Haftung auf 1 288 Rechnungs-<br/>einheiten begrenzt, oder bis<br/>zum angegebenen und<br/>vergüteten Interessewert<br/>— <a href='{{ELI}}#art-z47_abs-z4' target='_blank' rel='noopener'>§47 Abs. 4</a>"]

    F --> P{"Klage binnen zwei Jahren<br/>ab Ankunft, geplanter Ankunft<br/>oder Abbruch der Beförderung<br/>erhoben?<br/>— <a href='{{ELI}}/art-z49a' target='_blank' rel='noopener'>§49a</a>"}
    K --> P
    O --> P
    G --> P
    P -->|Nein| Z4["Anspruch verfristet"]
    P -->|Ja| Z5["Schadensersatzanspruch<br/>durchsetzbar"]

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z4 fill:#f8d7da,stroke:#c0392b
    style Z5 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};