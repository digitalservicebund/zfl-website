var e=`---
summary: "Zeigt das Erlaubnisverfahren für den Betrieb eines Steuerlagers für Schaumwein beim Hauptzollamt, die laufende Überprüfung während des Betriebs sowie die Voraussetzungen für Widerruf, Erlöschen und Fortführung der Erlaubnis."
---
flowchart TD
    A["Antragsteller will Steuerlager<br/>für Schaumwein betreiben"] --> B["Antrag auf amtlichem Vordruck<br/>vor geplantem Betriebsbeginn<br/>beim Hauptzollamt — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a><br/><br/>mit Lageplänen und<br/>Betriebserklärung (je 2-fach)"]

    B --> C{"Hauptzollamt verlangt<br/>weitere Angaben/Unterlagen<br/>zur Steueraufsicht?<br/>— <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"}
    C -->|Ja| C1["Antragsteller ergänzt<br/>Angaben/Unterlagen"]
    C1 --> D
    C -->|Nein| D{"Nur Lagerung von Schaumwein<br/>geplant und Umschlag < 100 hl/Jahr<br/>oder Lagerdauer < 1,5 Monate<br/>im Schnitt? — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"}

    D -->|Nein| F
    D -->|Ja| E{"Ausnahmefall nach<br/><a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 III</a> einschlägig?<br/>(z.B. bestehendes Herstellungslager,<br/>unversteuerte Abgabe, Lohnherstellung)"}
    E -->|Nein| ABLEHN["Erlaubnis wird<br/>nicht erteilt — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 II</a>"]
    E -->|Ja| F{"Anzeichen für<br/>Steuergefährdung?<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I S.4</a>"}

    F -->|Ja| G["Sicherheitsleistung nach<br/><a href='{{ELI}}#art-z6' target='_blank' rel='noopener'>§6</a> vor Erteilung<br/>zu leisten"]
    G --> H
    F -->|Nein| H["Hauptzollamt erteilt schriftlich<br/>oder elektronisch Erlaubnis unter<br/>Widerrufsvorbehalt, vergibt<br/>Verbrauchsteuernummern — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a>"]

    H --> I["Laufender Betrieb:<br/>regelmäßige Überprüfung der<br/>Erlaubnisvoraussetzungen binnen<br/>3 Jahren — <a href='{{ELI}}#art-z6a_abs-z' target='_blank' rel='noopener'>§6a</a>"]

    I --> J{"Änderung der angegebenen<br/>Verhältnisse (z.B. Gesellschafter,<br/>Sitz, Auflösung)?<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"}
    J -->|Ja| J1["Vorherige schriftliche<br/>Anzeige beim Hauptzollamt;<br/>räumliche Änderungen bedürfen<br/>Zustimmung — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>"]
    J1 --> K
    J -->|Nein| K{"Betrieb wird eingestellt oder<br/>ruht mehr als 6 Wochen?<br/>— <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"}

    K -->|Ja| L["Schriftliche Anzeige vor<br/>Einstellung/Ruhen; bei Einstellung<br/>widerruft Hauptzollamt<br/>die Erlaubnis — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"]
    L --> M
    K -->|Nein| N["Erlaubnis bleibt<br/>bestehen"]

    M{"Erlöschensgrund nach<br/><a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a> eingetreten?<br/>(Verzicht, Tod, Auflösung,<br/>Übergabe, Umwandlung,<br/>Insolvenz)"}
    N --> M
    M -->|Nein| N
    M -->|Ja| O{"Fortführungsanzeige vor<br/>Erlöschen (Erben, Insolvenz-<br/>verwalter etc.) oder neue<br/>Erlaubnis beantragt?<br/>— <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8 III, IV</a>"}

    O -->|Ja| P["Alte Erlaubnis gilt bis zur<br/>Bestandskraft der Entscheidung<br/>bzw. bis zur festgesetzten<br/>Frist fort — <a href='{{ELI}}/art-z8' target='_blank' rel='noopener'>§8 III, IV</a>"]
    P --> Q{"Neue Erlaubnis erteilt bzw.<br/>Fortführung nicht widerrufen?"}
    Q -->|Ja| FORT["Steuerlagerbetrieb<br/>läuft fort"]
    Q -->|Nein| ERLOSCH

    O -->|Nein| ERLOSCH["Erlaubnis erlischt zum<br/>maßgeblichen Zeitpunkt<br/>— <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 II</a>"]

    ERLOSCH --> R["Bestand gilt als in den<br/>freien Verkehr überführt;<br/>Steueranmeldung durch<br/>Verantwortlichen; Steuer<br/>sofort fällig — <a href='{{ELI}}#art-z8_abs-z6' target='_blank' rel='noopener'>§8 VI</a>"]

    style FORT fill:#d4edda,stroke:#2d8a4a
    style H fill:#d4edda,stroke:#2d8a4a
    style ABLEHN fill:#f8d7da,stroke:#c0392b
    style ERLOSCH fill:#f8d7da,stroke:#c0392b
    style R fill:#f8d7da,stroke:#c0392b
    style G fill:#fff3cd,stroke:#c9a227
    style P fill:#fff3cd,stroke:#c9a227
`;export{e as default};