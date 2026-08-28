var e=`---
summary: "Zeigt, nach welcher Frist welche Kategorie gespeicherter Daten zu löschen ist: ein Jahr nach Einstellung der Zurschaustellung, fünf Jahre nach der letzten Kontrolle oder ein Jahr nach unanfechtbarer Antragsablehnung."
---
flowchart TD
    A["Gespeicherte Daten nach §§3 und 4"] --> B{"Um welche Datenkategorie handelt es sich?"}
    B -->|"Daten nach §§3, 4 Abs. 1 S.2 Nr.1-7"| C{"Hat der Erlaubnisinhaber das Zurschaustellen/<br/>Zurverfügungstellen der Tiere eingestellt?"}
    C -->|Ja| D{"Erlangt die zuständige Behörde hiervon<br/>innerhalb eines Jahres Kenntnis?"}
    D -->|Ja| E["Löschung ein Jahr nach Einstellung<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"]
    D -->|Nein| F["Unverzügliche Löschung nach Kenntniserlangung<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"]
    C -->|Nein| G["Keine Löschung nach Absatz 1"]
    B -->|"Daten nach §3 Abs. 2 Nr.1, §4 Abs. 1 S.2 Nr.4-7"| H{"Wurden die Daten bereits nach Absatz 1 gelöscht?"}
    H -->|Ja| I["Bereits gelöscht — keine erneute Löschung nach Absatz 2 nötig<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2</a>"]
    H -->|Nein| J["Löschung durch die kontrollierende Behörde fünf Jahre<br/>nach dem Datum der Kontrolle<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2</a>"]
    B -->|"Daten nach §3 Abs. 1, §4 Abs. 1 S.2 Nr.8"| K{"Wurde der Antrag auf Erlaubnis unanfechtbar abgelehnt?"}
    K -->|Ja| L["Löschung durch die zuständige Behörde ein Jahr<br/>nach unanfechtbarer Ablehnung<br/>— <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3</a>"]
    K -->|Nein| M["Keine Löschung nach Absatz 3"]
    style E fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style J fill:#d4edda,stroke:#2d8a4a
    style L fill:#d4edda,stroke:#2d8a4a
    style G fill:#fff3cd,stroke:#c9a227
    style I fill:#fff3cd,stroke:#c9a227
    style M fill:#fff3cd,stroke:#c9a227
`;export{e as default};