var e=`flowchart TD
    A["Verkehrsunfall, an dem<br/>man beteiligt ist (Verhalten<br/>kann zum Unfall<br/>beigetragen haben)<br/>— <a href='{{ELI}}#art-z34_abs-z2' target='_blank' rel='noopener'>§34 Abs. 2</a>"] --> B["Unverzüglich halten<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 1</a>"]
    B --> C["Verkehr sichern; bei<br/>geringfügigem Schaden<br/>unverzüglich beiseite<br/>fahren<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 2</a>"]
    C --> D["Sich über die<br/>Unfallfolgen vergewissern<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 3</a>"]
    D --> E{"Sind Personen verletzt?"}
    E -->|Ja| F["Verletzten helfen<br/>(§323c StGB)<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 4</a>"]
    F --> G
    E -->|Nein| G["Beteiligung angeben; auf<br/>Verlangen Name, Anschrift,<br/>Führerschein, Fahrzeug-<br/>schein und Haftpflicht-<br/>versicherung nachweisen<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 5</a>"]
    G --> H{"Ist ein Berechtigter/<br/>Geschädigter am Unfallort<br/>anwesend, dem die<br/>Feststellung ermöglicht<br/>werden kann?<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 6</a>"}
    H -->|Ja| Z1["Am Unfallort bleiben, bis<br/>Feststellung von Person,<br/>Fahrzeug und Art der<br/>Beteiligung ermöglicht<br/>wurde<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 6 Buchst. a</a>"]
    H -->|Nein| I["Angemessene Zeit warten<br/>und Name/Anschrift am<br/>Unfallort hinterlassen<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 6 Buchst. b</a>"]
    I --> J{"Entfernt man sich<br/>berechtigt, entschuldigt<br/>oder nach Ablauf der<br/>Wartefrist vom Unfallort?"}
    J -->|Ja| K["Unverzüglich Feststellungen<br/>nachträglich ermöglichen:<br/>Mitteilung an Berechtigten<br/>oder nahe Polizeidienst-<br/>stelle über Beteiligung,<br/>Anschrift, Aufenthalt,<br/>Kennzeichen und Standort<br/>— <a href='{{ELI}}#art-z34_abs-z1' target='_blank' rel='noopener'>§34 Abs. 1 Nr. 7</a>"]
    K --> Z2["Mitwirkungspflichten<br/>erfüllt"]
    J -->|Nein| Z2
    Z1 --> L["Unfallspuren nicht<br/>beseitigen, bevor<br/>notwendige Feststellungen<br/>getroffen wurden<br/>— <a href='{{ELI}}#art-z34_abs-z3' target='_blank' rel='noopener'>§34 Abs. 3</a>"]
    L --> Z2

    style Z1 fill:#d4edda,stroke:#2d8a4a
    style Z2 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};