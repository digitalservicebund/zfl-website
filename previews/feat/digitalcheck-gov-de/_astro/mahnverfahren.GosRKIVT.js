var e=`---
summary: "Das gerichtliche Mahnverfahren nach der ZPO mit Antragsteller, Antragsgegner, Mahngericht und Streitgericht: Mahnantrag, Mahnbescheid, Widerspruch mit Abgabe ins streitige Verfahren oder Vollstreckungsbescheid mit Einspruch bzw. Zwangsvollstreckung."
---
swimlane-beta TD
    subgraph AS["Antragsteller"]
        antrag(["Antrag auf Mahnbescheid wegen Zahlung einer<br/>bestimmten Geldsumme in Euro, nicht von<br/>einer ausstehenden Gegenleistung abhängig<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__688.html' target='_blank' rel='noopener'>§688 I, II</a>, <a href='https://www.gesetze-im-internet.de/zpo/__690.html' target='_blank' rel='noopener'>§690 I</a>"])
        vbAntrag{"Vollstreckungsbescheid<br/>beantragt, nach Ablauf der<br/>Widerspruchsfrist und binnen<br/>6 Monaten ab Zustellung?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__699.html' target='_blank' rel='noopener'>§699 I</a>, <a href='https://www.gesetze-im-internet.de/zpo/__701.html' target='_blank' rel='noopener'>§701</a>"}
        wegfall(["Wirkung des Mahnbescheids<br/>fällt weg — <a href='https://www.gesetze-im-internet.de/zpo/__701.html' target='_blank' rel='noopener'>§701 S.1</a>"])
        vollstreckung(["Aus dem Vollstreckungsbescheid kann der<br/>Antragsteller die Zwangsvollstreckung<br/>betreiben — <a href='https://www.gesetze-im-internet.de/zpo/__794.html' target='_blank' rel='noopener'>§794 I Nr. 4</a>"])
    end

    subgraph AG["Antragsgegner"]
        widerspruch{"Widerspruch, bevor der<br/>Vollstreckungsbescheid<br/>verfügt ist? (Aufforderung:<br/>binnen 2 Wochen)<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__692.html' target='_blank' rel='noopener'>§692 I Nr. 3</a>, <a href='https://www.gesetze-im-internet.de/zpo/__694.html' target='_blank' rel='noopener'>§694 I</a>"}
        einspruch{"Einspruch binnen 2 Wochen<br/>ab Zustellung? (verspäteter<br/>Widerspruch gilt als Einspruch<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__694.html' target='_blank' rel='noopener'>§694 II</a>)<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__339.html' target='_blank' rel='noopener'>§339 I</a>"}
    end

    subgraph MG["Mahngericht (Amtsgericht)"]
        eingang("Antrag geht beim Amtsgericht am allgemeinen<br/>Gerichtsstand des Antragstellers ein<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__689.html' target='_blank' rel='noopener'>§689 II</a>")
        zulaessig{"Antrag entspricht<br/>§§688-690? — <a href='https://www.gesetze-im-internet.de/zpo/__691.html' target='_blank' rel='noopener'>§691 I</a>"}
        zurueckgewiesen(["Antrag wird nach Anhörung zurückgewiesen;<br/>Fristwahrung, wenn binnen 1 Monat<br/>Klage eingereicht wird — <a href='https://www.gesetze-im-internet.de/zpo/__691.html' target='_blank' rel='noopener'>§691 I, II</a>"])
        mahnbescheid["Erlässt Mahnbescheid ohne Prüfung, ob der<br/>Anspruch zusteht, und stellt ihn zu<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__692.html' target='_blank' rel='noopener'>§692 I Nr. 2</a>, <a href='https://www.gesetze-im-internet.de/zpo/__693.html' target='_blank' rel='noopener'>§693 I</a>"]
        abgabe["Teilt den Widerspruch dem Antragsteller mit;<br/>gibt auf Antrag einer Partei an das<br/>Streitgericht ab — <a href='https://www.gesetze-im-internet.de/zpo/__695.html' target='_blank' rel='noopener'>§695</a>, <a href='https://www.gesetze-im-internet.de/zpo/__696.html' target='_blank' rel='noopener'>§696 I</a>"]
        vb["Erlässt Vollstreckungsbescheid (steht einem<br/>vorläufig vollstreckbaren Versäumnisurteil<br/>gleich) und stellt ihn zu<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__699.html' target='_blank' rel='noopener'>§699 I, IV</a>, <a href='https://www.gesetze-im-internet.de/zpo/__700.html' target='_blank' rel='noopener'>§700 I</a>"]
    end

    subgraph SG["Streitgericht"]
        streit(["Fordert Anspruchsbegründung binnen 2 Wochen<br/>wie in einer Klageschrift an; danach<br/>Verfahren wie nach Eingang einer Klage<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__697.html' target='_blank' rel='noopener'>§697 I, II</a>, <a href='https://www.gesetze-im-internet.de/zpo/__700.html' target='_blank' rel='noopener'>§700 III, IV</a>"])
    end

    antrag --> eingang
    eingang --> zulaessig
    zulaessig -->|Nein| zurueckgewiesen
    zulaessig -->|Ja| mahnbescheid
    mahnbescheid --> widerspruch
    widerspruch -->|Ja| abgabe
    widerspruch -->|Nein| vbAntrag
    abgabe --> streit
    vbAntrag -->|Nein| wegfall
    vbAntrag -->|Ja| vb
    vb --> einspruch
    einspruch -->|"Ja: Abgabe von Amts<br/>wegen — <a href='https://www.gesetze-im-internet.de/zpo/__700.html' target='_blank' rel='noopener'>§700 III</a>"| streit
    einspruch -->|Nein| vollstreckung
    wegfall ~~~ vollstreckung
    zurueckgewiesen ~~~ mahnbescheid

    style zurueckgewiesen fill:#f8d7da,stroke:#c0392b
    style wegfall fill:#f8d7da,stroke:#c0392b
    style vollstreckung fill:#d4edda,stroke:#2d8a4a
    style streit fill:#fff3cd,stroke:#c9a227
`;export{e as default};