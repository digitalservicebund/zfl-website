var e=`---
summary: "Der Weg von der Gewerbeanzeige über die Empfangsbescheinigung und Datenübermittlung bis zur Gewerbeuntersagung wegen Unzuverlässigkeit nach der GewO, einschließlich Anhörung der Kammern und Wiedergestattung."
---
swimlane-beta TD
    subgraph GT["Gewerbetreibender"]
        anzeige(["Zeigt den Beginn eines stehenden<br/>Gewerbes gleichzeitig der zuständigen<br/>Behörde an — <a href='https://www.gesetze-im-internet.de/gewo/__14.html' target='_blank' rel='noopener'>§14 I S.1</a> (ebenso Verlegung,<br/>Wechsel des Gegenstands, Namensänderung,<br/>Aufgabe — <a href='https://www.gesetze-im-internet.de/gewo/__14.html' target='_blank' rel='noopener'>§14 I S.2</a>)"])
        wieder(["Kann Fortführung durch einen<br/>Stellvertreter beantragen — <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 II</a>;<br/>Wiedergestattung auf Antrag, wenn keine<br/>Unzuverlässigkeit mehr vorliegt, vor Ablauf<br/>eines Jahres nur aus besonderen Gründen<br/>— <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 VI</a>"])
    end

    subgraph GB["Zuständige Behörde"]
        empfang["Bescheinigt den Empfang der Anzeige<br/>innerhalb von 3 Tagen — <a href='https://www.gesetze-im-internet.de/gewo/__15.html' target='_blank' rel='noopener'>§15 I</a>;<br/>nutzt die Daten zur Überwachung der<br/>Gewerbeausübung — <a href='https://www.gesetze-im-internet.de/gewo/__14.html' target='_blank' rel='noopener'>§14 V S.1</a>"]
        sonder{"Besondere Vorschrift zur<br/>Untersagung oder Widerruf<br/>einer Zulassung möglich?<br/>— <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 VIII</a>"}
        unzuv{"Belegen Tatsachen die<br/>Unzuverlässigkeit und ist<br/>Untersagung zum Schutz der<br/>Allgemeinheit oder der<br/>Beschäftigten erforderlich?<br/>— <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 I S.1</a>"}
        keine(["Keine Untersagung"])
        sonderEnd(["Verfahren nach der Sondervorschrift<br/>(§35 gilt aber für Vertretungs- und<br/>Leitungspersonen) — <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 VIII</a>"])
        untersagung(["Untersagt das Gewerbe ganz oder<br/>teilweise, ggf. erstreckt auf andere<br/>Gewerbe und Tätigkeiten — <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 I</a>;<br/>an Feststellungen eines Strafurteils<br/>gebunden — <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 III</a>"])
    end

    subgraph ST["Kammern und weitere Stellen"]
        daten("Erhalten regelmäßig Daten aus der<br/>Gewerbeanzeige (u.a. IHK, Handwerkskammer,<br/>Finanzamt) — <a href='https://www.gesetze-im-internet.de/gewo/__14.html' target='_blank' rel='noopener'>§14 VIII</a>")
        anhoer["Aufsichtsbehörden, IHK oder<br/>Handwerkskammer werden angehört;<br/>entfällt bei Gefahr im Verzug<br/>(dann Unterrichtung) — <a href='https://www.gesetze-im-internet.de/gewo/__35.html' target='_blank' rel='noopener'>§35 IV</a>"]
    end

    anzeige --> empfang
    empfang -.-> daten
    empfang -->|"Tatsachen deuten auf<br/>Unzuverlässigkeit"| sonder
    sonder -->|Ja| sonderEnd
    sonder -->|Nein| unzuv
    unzuv -->|Nein| keine
    unzuv -->|Ja| anhoer
    anhoer --> untersagung
    untersagung -.-> wieder

    style keine fill:#d4edda,stroke:#2d8a4a
    style sonderEnd fill:#fff3cd,stroke:#c9a227
    style untersagung fill:#f8d7da,stroke:#c0392b
    style wieder fill:#fff3cd,stroke:#c9a227
`;export{e as default};