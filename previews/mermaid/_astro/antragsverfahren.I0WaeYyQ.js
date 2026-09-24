var e=`---
summary: "Zeigt das Antragsverfahren für Elterngeld nach dem BEEG mit antragstellendem Elternteil, anderer berechtigter Person, zuständiger Behörde, Arbeitgeber und Standesamt: schriftlicher Antrag, Einkommens- und Arbeitszeitnachweis, vorläufige Entscheidung oder Zahlung unter Widerrufsvorbehalt und Auszahlung."
---
swimlane-beta TD
    subgraph EL["Antragstellender Elternteil"]
        start(["Beantragt Elterngeld schriftlich und<br/>gibt an, für welche Lebensmonate<br/>Basiselterngeld, Elterngeld Plus oder<br/>Partnerschaftsbonus beantragt wird — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7<br/>Abs. 1 S. 1, 3</a>"])
        allein{"Fall des §4c oder Antrag durch<br/>allein sorgeberechtigte<br/>Person? — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 Abs. 3 S. 1</a>"}
        nachweis(["Weist nach Ablauf des Bezugszeitraums<br/>das tatsächliche Einkommen aus<br/>Erwerbstätigkeit nach — <a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 Abs. 1</a>"])
    end

    subgraph AP["Andere berechtigte Person"]
        unterschrift["Unterschreibt den Antrag zur Bestätigung<br/>der Kenntnisnahme — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 Abs. 3 S. 1</a>"]
        eigener{"Stellt gleichzeitig eigenen<br/>Antrag oder zeigt an, wie<br/>viele Monatsbeträge sie<br/>beansprucht (bei<br/>Überschreitung der<br/>Höchstgrenzen nach §4 Abs. 3<br/>i.V.m. §4b)? — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 Abs. 3 S. 2</a>"}
        rest["Sämtliche Monatsbeträge gehen an die<br/>antragstellende Person; bei späterem<br/>Antrag nur die vom Gesamtanspruch<br/>verbleibenden Monatsbeträge — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 Abs. 3<br/>S. 3</a>"]
    end

    subgraph BH["Zuständige Behörde"]
        eingang["Eingang des Antrags bei der Behörde des<br/>Bezirks, in dem das Kind bei erster<br/>Antragstellung seinen inländischen<br/>Wohnsitz hat (sonst nach S. 3) — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12<br/>Abs. 1</a>; rückwirkend nur für die letzten<br/>3 Lebensmonate vor dem Eingangsmonat<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 S. 2</a>"]
        abruf["Ruft zur Prüfung des Anspruchs nach §1<br/>Geburtsdaten automatisiert beim<br/>Standesamt ab, wenn die antragstellende<br/>Person eingewilligt hat — <a href='{{ELI}}/art-z25' target='_blank' rel='noopener'>§25</a>"]
        verlangen["Verlangt, soweit zum Nachweis<br/>erforderlich, eine Bescheinigung vom<br/>(ehemaligen) Arbeitgeber — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1</a>;<br/>für das Einkommen auch elektronische<br/>Abfrage nach §108a SGB IV, wenn der/die<br/>Beschäftigte eingewilligt hat — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs.<br/>2 S. 1-2</a>"]
        vorlaeufig{"Steuerbescheid fehlt und<br/>Überschreitung nach §1 Abs. 8<br/>noch offen, Einkommen vor der<br/>Geburt nicht ermittelbar oder<br/>voraussichtlich Einkommen im<br/>Bezugszeitraum? — <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 Abs. 3</a>"}
        widerruf{"Voraussichtlich kein Einkommen<br/>im Bezugszeitraum, oder<br/>Steuerbescheid fehlt und<br/>Beträge nach §1 Abs. 8<br/>voraussichtlich nicht<br/>überschritten? — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 Abs. 2</a>"}
        zahlung["Zahlung im Laufe des Lebensmonats, für<br/>den das Elterngeld bestimmt ist — <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6</a>"]
    end

    subgraph AGB["Arbeitgeber"]
        bescheinigung["Bescheinigt auf Verlangen<br/>Arbeitsentgelt, Abzugsmerkmale (§§2e,<br/>2f) und Arbeitszeit (bei Heimarbeit:<br/>Auftraggeber oder Zwischenmeister) — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9<br/>Abs. 1</a>;<br/>mit systemgeprüftem<br/>Entgeltabrechnungsprogramm:<br/>elektronische Übermittlung — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2<br/>S. 3</a>"]
    end

    subgraph SA["Standesamt"]
        geburt("Daten über die Beurkundung der Geburt:<br/>Tag und Ort der Geburt, Namen des Kindes<br/>und der Eltern — <a href='{{ELI}}/art-z25' target='_blank' rel='noopener'>§25</a>")
    end

    start --> allein
    allein -->|Ja| eingang
    allein -->|Nein| unterschrift
    unterschrift --> eigener
    eigener -->|Ja| eingang
    eigener -->|Nein| rest
    rest --> eingang
    eingang --> abruf
    abruf -.-> geburt
    abruf --> verlangen
    verlangen --> bescheinigung
    bescheinigung --> vorlaeufig
    vorlaeufig -->|"Ja: vorläufige Entscheidung<br/>über die Höhe (glaubhaft<br/>gemachte Angaben)"| zahlung
    vorlaeufig -->|Nein| widerruf
    widerruf -->|"Ja: unter Vorbehalt des<br/>Widerrufs"| zahlung
    widerruf -->|Nein| zahlung
    zahlung -->|"bei Angaben zu<br/>voraussichtlichem Einkommen"| nachweis

    style zahlung fill:#d4edda,stroke:#2d8a4a
    style rest fill:#fff3cd,stroke:#c9a227
    style nachweis fill:#fff3cd,stroke:#c9a227
`;export{e as default};