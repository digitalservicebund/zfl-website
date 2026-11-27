var e=`---
summary: "Das Statusfeststellungsverfahren nach §7a SGB IV: Antrag bei der Deutschen Rentenversicherung Bund, Anforderung von Unterlagen, Anhörung und Entscheidung, ob eine Beschäftigung oder eine selbständige Tätigkeit vorliegt, einschließlich des späteren Beginns der Versicherungspflicht bei frühem Antrag."
---
swimlane-beta TD
    subgraph EZ["Einzugsstelle"]
        pflicht("Meldung des Arbeitgebers (§28a) ergibt:<br/>Beschäftigter ist Ehegatte, Lebenspartner,<br/>Abkömmling oder geschäftsführender<br/>GmbH-Gesellschafter — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a I S.2</a>")
    end

    subgraph BT["Beteiligte (Auftraggeber und Auftragnehmer)"]
        antrag(["Beantragen schriftlich oder elektronisch<br/>die Entscheidung, ob Beschäftigung oder<br/>selbständige Tätigkeit vorliegt — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a I S.1</a><br/>(auf Antrag schon vor Aufnahme<br/>der Tätigkeit — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a IVa</a>)"])
        unterlagen["Machen die Angaben und legen die<br/>Unterlagen innerhalb der Frist vor<br/>— <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a III S.2</a>"]
        aeussern("Können sich zur beabsichtigten<br/>Entscheidung äußern — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a IV S.1</a>")
    end

    subgraph DRV["Deutsche Rentenversicherung Bund"]
        sperre{"Hatte die Einzugsstelle<br/>oder ein anderer Träger<br/>bei Antragstellung schon<br/>ein Verfahren zur<br/>Versicherungspflicht<br/>eingeleitet? — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a I S.1</a>"}
        ausgeschlossen(["Keine Statusfeststellung durch die<br/>DRV Bund — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a I S.1</a>"])
        anfordern["Teilt mit, welche Angaben und Unterlagen<br/>sie benötigt, und setzt eine angemessene<br/>Frist — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a III</a>"]
        anhoerung["Teilt die beabsichtigte Entscheidung und<br/>die tragenden Tatsachen mit — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a IV S.1</a><br/>(entfällt, wenn sie einem übereinstimmenden<br/>Antrag der Beteiligten entspricht — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a IV S.2</a>)"]
        gesamt{"Gesamtwürdigung aller<br/>Umstände: Liegt eine<br/>Beschäftigung vor?<br/>— <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a II S.1</a>"}
        selbstaendig(["Selbständige Tätigkeit festgestellt;<br/>andere Versicherungsträger sind<br/>gebunden — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a II S.4</a>"])
        monat{"Antrag binnen 1 Monat<br/>nach Aufnahme, Zustimmung<br/>und Absicherung gegen<br/>Krankheit und Alter?<br/>— <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a V S.1</a>"}
        ab_bekanntgabe(["Beschäftigung beginnt mit Bekanntgabe<br/>der Entscheidung; DRV Bund stellt den<br/>Zeitpunkt fest — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a V S.1, S.2</a>"])
        ab_aufnahme(["Beschäftigung festgestellt, ohne späteren<br/>Eintrittszeitpunkt nach Abs. 5 (bei Tätigkeit<br/>für einen Dritten auch, ob sie zu diesem<br/>besteht — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a II S.2</a>)"])
    end

    pflicht -->|"stellt Antrag<br/>(Pflicht)"| sperre
    antrag --> sperre
    sperre -->|Ja| ausgeschlossen
    sperre -->|Nein| anfordern
    anfordern --> unterlagen
    unterlagen --> anhoerung
    anhoerung --> aeussern
    aeussern --> gesamt
    gesamt -->|Nein| selbstaendig
    gesamt -->|"Ja; Beitrag fällig erst, wenn<br/>die Entscheidung unanfechtbar<br/>ist — <a href='https://www.gesetze-im-internet.de/sgb_4/__7a.html' target='_blank' rel='noopener'>§7a V S.3</a>"| monat
    monat -->|Ja| ab_bekanntgabe
    monat -->|Nein| ab_aufnahme

    selbstaendig ~~~ monat
    ab_bekanntgabe ~~~ ab_aufnahme

    style selbstaendig fill:#d4edda,stroke:#2d8a4a
    style ab_bekanntgabe fill:#fff3cd,stroke:#c9a227
    style ab_aufnahme fill:#fff3cd,stroke:#c9a227
    style ausgeschlossen fill:#f8d7da,stroke:#c0392b
`;export{e as default};