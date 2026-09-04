var e=`---
summary: "Zeigt, über welches Nutzerkonto und mit welchem Vertrauensniveau sich Nutzer im Portalverbund identifizieren und authentifizieren müssen."
---
flowchart TD
    A["Nutzer möchte sich für eine elektronische Verwaltungsleistung im Portalverbund identifizieren"] --> B{"Ist der Nutzer eine natürliche Person (Nutzer nach §2 Absatz 4 Nummer 1)? — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 1</a>"}
    B -->|Ja| C["Identifizierung erfolgt freiwillig über das zentrale Bürgerkonto des Bundes — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 1</a>"]
    C --> D{"Ist für die Verwaltungsleistung höchstens das Vertrauensniveau „substantiell“ erforderlich? — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 4</a>"}
    D -->|Ja| E["Nachweis durch sicheres Verfahren nach §87a Absatz 6 AO oder elektronisches Identifizierungsmittel mit Niveau „substantiell“ — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 4</a>"]
    D -->|Nein, „hoch“ erforderlich| F["Nachweis durch elektronischen Identitätsnachweis (Personalausweis, eID-Karte, elektronischer Aufenthaltstitel) oder Identifizierungsmittel mit Niveau „hoch“ — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 4</a>"]
    B -->|Nein, Unternehmen oder Behörde| G{"Bietet die öffentliche Stelle ihre Verwaltungsleistung über den Portalverbund an? — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 3</a>"}
    G -->|Ja| H["Verwendung des einheitlichen Organisationskontos ist verpflichtend — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 3</a>"]
    H --> I["Nachweis durch sicheres Verfahren nach §87a Absatz 6 AO oder elektronisches Identifizierungsmittel mit mindestens Niveau „substantiell“ — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 4</a>"]
    G -->|Nein| J["Organisationskonto nicht verpflichtend"]

    style E fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style I fill:#d4edda,stroke:#2d8a4a
    style J fill:#fff3cd,stroke:#c9a227
`;export{e as default};