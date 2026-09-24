var e=`---
summary: "Zeigt den Ablauf der elektronischen Identifikation von Nutzern bei der Registrierung nach § 3a URV, einschließlich der Übernahme von Daten aus der Steuerberaterplattform, alternativer Identifizierungsmethoden und der jeweiligen Speicher- und Löschfristen."
---
flowchart TD
    START["Registrierung nach <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a><br/>(Datenübermittlung für Handels-/<br/>Genossenschaftsregister-Unternehmen)"] --> Q1{"Ist eine Schnittstelle zur<br/>Steuerberaterplattform<br/>eingerichtet und ist der<br/>Nutzer dort bereits<br/>identifiziert? — <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV S.1-2</a>"}

    Q1 -->|Ja| UEB["Plattform-Betreiber übermittelt<br/>Identifizierungsdaten und<br/>SAFE-Visitenkarte über die Schnittstelle<br/>— <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV S.3-4</a>"]

    UEB --> Q2{"Ernstliche Zweifel an<br/>Richtigkeit oder<br/>Vollständigkeit der<br/>übermittelten Daten? — <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV<br/>S.6</a>"}

    Q2 -->|Nein| VERLASS["Registerführende Stelle darf sich auf<br/>Richtigkeit/Vollständigkeit verlassen<br/>— <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV S.6</a>"]
    Q2 -->|Ja| NACHW["Erforderliche Nachweise über die<br/>erfolgte Identifizierung vom<br/>Plattform-Betreiber verlangen — <a href='{{ELI}}#art-z3a_abs-z4' target='_blank' rel='noopener'>§3a IV<br/>S.6</a>"]

    VERLASS --> SPEICH["Prozessnachweis und Name im Nutzerkonto<br/>gespeichert;<br/>Identifizierungsdaten (Titel,<br/>Geburtsdatum, Anschrift, Dokumentenart,<br/>Zeitstempel) gespeichert — <a href='{{ELI}}#art-z3a_abs-z2' target='_blank' rel='noopener'>§3a II S.1-2</a>"]
    NACHW --> SPEICH

    Q1 -->|Nein| METHODE["Elektronische Identifikation anhand<br/>1. eID-Ausweis/-Karte/Aufenthaltstitel,<br/>2. EU-Identifizierungsmittel mit<br/>Sicherheitsniveau „hoch“ oder<br/>3. von der registerführenden Stelle<br/>bereitgestellter Methode — <a href='{{ELI}}#art-z3a_abs-z1' target='_blank' rel='noopener'>§3a I</a>"]

    METHODE --> ERFOLG{"Identifikation erfolgreich?"}

    ERFOLG -->|Ja| SPEICH

    ERFOLG -->|Nein| SOFORT["Prozessnachweis, Name und die übrigen<br/>erhobenen Daten werden sofort gelöscht<br/>— <a href='{{ELI}}#art-z3a_abs-z2' target='_blank' rel='noopener'>§3a II S.5</a>"]

    SPEICH --> Q3A{"Ernstliche Zweifel an Rechts-<br/>oder Geschäftsfähigkeit oder<br/>an der Berechtigung zur<br/>Datenübermittlung? — <a href='{{ELI}}#art-z3a_abs-z3' target='_blank' rel='noopener'>§3a III</a>"}

    Q3A -->|Ja| NACHWEIS2["Übermittlung geeigneter Nachweise oder<br/>erneute Identifikation verlangen — <a href='{{ELI}}#art-z3a_abs-z3' target='_blank' rel='noopener'>§3a<br/>III</a>"]
    Q3A -->|Nein| Q3{"Kommt es zu einer<br/>Datenübermittlung?"}
    NACHWEIS2 --> Q3

    Q3 -->|Ja| LOESCH1["Löschung der Identifizierungsdaten 8<br/>Jahre nach der letzten Datenübermittlung<br/>— <a href='{{ELI}}#art-z3a_abs-z2' target='_blank' rel='noopener'>§3a II S.2</a>"]
    Q3 -->|Nein| LOESCH2["Löschung 8 Jahre nach Abschluss des<br/>Identifikationsvorganges;<br/>weitere erhobene Daten Löschung nach 3<br/>Monaten — <a href='{{ELI}}#art-z3a_abs-z2' target='_blank' rel='noopener'>§3a II S.3-4</a>"]

    style LOESCH1 fill:#d4edda,stroke:#2d8a4a
    style LOESCH2 fill:#d4edda,stroke:#2d8a4a
    style SOFORT fill:#f8d7da,stroke:#c0392b
`;export{e as default};