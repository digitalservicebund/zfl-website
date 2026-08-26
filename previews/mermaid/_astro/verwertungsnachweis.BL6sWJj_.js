var e=`---
summary: "Zeigt den Ablauf von der Übergabe eines Altfahrzeugs über die Kostenfrage bis zur Ausstellung, Übermittlung und EU-weiten Anerkennung des Verwertungsnachweises."
---
flowchart TD
    A["Fahrzeug wird zum Altfahrzeug"] --> B["Fahrzeugeigner übergibt es unverzüglich<br/>an Sammelstelle oder zugelassene<br/>Behandlungsanlage — <a href='{{ELI}}#024.001' target='_blank' rel='noopener'>Art. 24 Abs. 1</a>"]

    B --> C{"Fehlen wesentliche Teile (z.B. Batterie,<br/>Motor) oder wurden Abfälle hinzugefügt?<br/>— <a href='{{ELI}}#024.003' target='_blank' rel='noopener'>Art. 24 Abs. 3</a>"}

    C -->|Nein| D["Übergabe ist für den letzten<br/>Eigner kostenlos<br/>— <a href='{{ELI}}#024.002' target='_blank' rel='noopener'>Art. 24 Abs. 2</a>"]
    C -->|Ja| E{"Nachweis über ordnungsgemäße<br/>Batteriebehandlung oder Einstufung als<br/>Totalschaden durch Versicherung?<br/>— <a href='{{ELI}}#024.004' target='_blank' rel='noopener'>Art. 24 Abs. 4</a>,<br/><a href='{{ELI}}#024.005' target='_blank' rel='noopener'>Art. 24 Abs. 5</a>"}

    E -->|Ja| D
    E -->|Nein| F["Übergabe kann kostenpflichtig sein"]

    D --> G["Zugelassene Behandlungsanlage stellt<br/>Verwertungsnachweis nach Muster<br/>Anhang X aus — <a href='{{ELI}}#025.001' target='_blank' rel='noopener'>Art. 25 Abs. 1</a>"]
    F --> G

    G --> H["Elektronische Übermittlung an die<br/>zuständigen Behörden<br/>— <a href='{{ELI}}#025.002' target='_blank' rel='noopener'>Art. 25 Abs. 2</a>"]

    H --> I{"Fahrzeug in einem anderen<br/>Mitgliedstaat zugelassen?<br/>— <a href='{{ELI}}#025.003' target='_blank' rel='noopener'>Art. 25 Abs. 3</a>"}

    I -->|Ja| J["Ausstellende Behörden unterrichten<br/>Behörden des Zulassungsmitgliedstaats<br/>— <a href='{{ELI}}#025.003' target='_blank' rel='noopener'>Art. 25 Abs. 3</a>"]
    I -->|Nein| K["Zulassungsbehörde hebt die<br/>Fahrzeugzulassung auf<br/>— <a href='{{ELI}}#025.004' target='_blank' rel='noopener'>Art. 25 Abs. 4</a>"]
    J --> K

    K --> L["Verwertungsnachweis wird von allen<br/>Mitgliedstaaten anerkannt<br/>— <a href='{{ELI}}#025.005' target='_blank' rel='noopener'>Art. 25 Abs. 5</a>"]

    style L fill:#d4edda,stroke:#2d8a4a
`;export{e as default};