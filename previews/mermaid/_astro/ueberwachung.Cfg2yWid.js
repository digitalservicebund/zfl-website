var e=`---
summary: "Zeigt die behördliche Überwachung von Anbauvereinigungen nach dem KCanG: Meldungen der Anbauvereinigung zu Gesundheitsrisiken oder abhandengekommenem Cannabis, Kontrollen und Stichproben der Behörde, die abgestuften Anordnungen bei begründetem Verdacht und deren Aufhebung."
---
swimlane-beta TD
    subgraph AV["Anbauvereinigung"]
        risiko(["Weiß oder vermutet ein über typische<br/>Gefahren hinausgehendes<br/>Gesundheitsrisiko des weitergegebenen<br/>Cannabis — <a href='{{ELI}}#art-z26_abs-z4' target='_blank' rel='noopener'>§26 IV S.1</a>"])
        abhanden(["Verdacht auf Abhandenkommen oder<br/>unerlaubte Weitergabe — <a href='{{ELI}}#art-z26_abs-z5' target='_blank' rel='noopener'>§26 V S.1</a>"])
        berichte["Jahresmeldungen bis 31.01.,<br/>Aufzeichnungen auf Verlangen — <a href='{{ELI}}#art-z26_abs-z2' target='_blank' rel='noopener'>§26 II<br/>S.1</a>, <a href='{{ELI}}#art-z26_abs-z3' target='_blank' rel='noopener'>§26 III</a>"]
        meldungRisiko["Informiert unverzüglich die Behörde<br/>— <a href='{{ELI}}#art-z26_abs-z4' target='_blank' rel='noopener'>§26 IV S.1</a>"]
        eigeneMassnahmen["Trifft unverzüglich Maßnahmen:<br/>Mitglieder informieren, Rückruf,<br/>Rücknahme, Vernichtung — <a href='{{ELI}}#art-z26_abs-z4' target='_blank' rel='noopener'>§26 IV S.2</a>"]
        meldungAbh["Informiert unverzüglich die Behörde<br/>(Auskunftsverweigerungsrecht bei<br/>Selbstbelastung) — <a href='{{ELI}}#art-z26_abs-z5' target='_blank' rel='noopener'>§26 V</a>"]
        ergaenzend["Übermittelt ergänzende Informationen<br/>— <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.2</a>"]
        umsetzung["Setzt Anordnung um; Widerspruch und<br/>Klage ohne aufschiebende Wirkung — <a href='{{ELI}}#art-z27_abs-z6' target='_blank' rel='noopener'>§27<br/>VI</a>"]
        darlegung["Legt schlüssig dar, dass wirksame<br/>Maßnahmen zur Einhaltung getroffen<br/>wurden — <a href='{{ELI}}#art-z27_abs-z5' target='_blank' rel='noopener'>§27 V</a>"]
    end

    subgraph BH["Zuständige Behörde"]
        kontrolle["Regelmäßige und anlassbezogene<br/>Kontrollen vor Ort und Stichproben — <a href='{{ELI}}#art-z27_abs-z1' target='_blank' rel='noopener'>§27<br/>I</a>; Befugnisse — <a href='{{ELI}}/art-z28' target='_blank' rel='noopener'>§28</a>; Duldungs- und<br/>Mitwirkungspflichten — <a href='{{ELI}}/art-z29' target='_blank' rel='noopener'>§29</a>"]
        nachfrage{"Ergänzende Informationen zur<br/>Risikoprüfung nötig? — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II<br/>S.2</a>"}
        verdacht{"Begründeter Verdacht auf<br/>Verstoß gegen Anforderungen,<br/>Schutzvorgaben oder Auflagen?<br/>— <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III S.1</a>"}
        keineMassnahme(["Keine Anordnung, weitere Überwachung"])
        rasch{"Risikobewertung:<br/>Gesundheitsrisiko erfordert<br/>rasches Eingreifen? — <a href='{{ELI}}#art-z27_abs-z4' target='_blank' rel='noopener'>§27 IV</a>"}
        anordnung["Anordnungen: Weitergabe erst bei<br/>Konformität, Prüfpflicht, Warnung,<br/>Beseitigung von Werbung — <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III Nr.1,<br/>2, 7, 8</a>"]
        eingriff["Zusätzlich: vorübergehendes Anbau-/<br/>Weitergabeverbot, Rückruf,<br/>Sicherstellung und Vernichtung,<br/>Untersagung — <a href='{{ELI}}#art-z27_abs-z3' target='_blank' rel='noopener'>§27 III Nr.3-6</a>"]
        behoerdeWarnt["Warnt selbst Öffentlichkeit oder<br/>Mitglieder — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.3</a>"]
        aufhebung(["Widerruft oder ändert die Maßnahme — <a href='{{ELI}}#art-z27_abs-z5' target='_blank' rel='noopener'>§27<br/>V</a>"])
    end

    subgraph MG["Mitglieder / Öffentlichkeit"]
        hinweise("Beschwerden und Hinweise über<br/>Anbauvereinigungen — <a href='{{ELI}}#art-z27_abs-z2' target='_blank' rel='noopener'>§27 II S.1</a>")
        gewarnt("Werden gewarnt bzw. Cannabis wird<br/>zurückgerufen")
    end

    risiko --> meldungRisiko
    risiko --> eigeneMassnahmen
    eigeneMassnahmen -.-> gewarnt
    eigeneMassnahmen -.->|"unterbleibt oder nicht<br/>rechtzeitig"| behoerdeWarnt
    behoerdeWarnt --> gewarnt
    meldungRisiko --> nachfrage
    nachfrage -->|Ja| ergaenzend
    nachfrage -->|Nein| verdacht
    ergaenzend --> verdacht
    abhanden --> meldungAbh
    meldungAbh --> kontrolle
    berichte -.-> kontrolle
    hinweise -.-> kontrolle
    kontrolle --> verdacht
    verdacht -->|Nein| keineMassnahme
    verdacht -->|Ja| rasch
    rasch -->|Nein| anordnung
    rasch -->|Ja| eingriff
    anordnung --> umsetzung
    eingriff --> umsetzung
    umsetzung --> darlegung
    darlegung --> aufhebung
    meldungRisiko ~~~ abhanden
    ergaenzend ~~~ meldungAbh
    abhanden ~~~ berichte

    style aufhebung fill:#d4edda,stroke:#2d8a4a
    style keineMassnahme fill:#d4edda,stroke:#2d8a4a
    style eingriff fill:#f8d7da,stroke:#c0392b
    style anordnung fill:#fff3cd,stroke:#c9a227
`;export{e as default};