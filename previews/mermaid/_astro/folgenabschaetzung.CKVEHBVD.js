var e=`---
summary: "Zeigt, wann der Verantwortliche eine Datenschutz-Folgenabschätzung nach Art. 35 DSGVO unter Beteiligung des Datenschutzbeauftragten durchführen muss und wann er anschließend die Aufsichtsbehörde nach Art. 36 DSGVO vorher konsultieren muss."
---
swimlane-beta TD
    subgraph VA["Verantwortlicher"]
        start(["Verarbeitung geplant, insb. mit neuen<br/>Technologien — Art. 35 Abs. 1"])
        risiko{"Voraussichtlich hohes Risiko<br/>für Rechte und Freiheiten<br/>natürlicher Personen aufgrund<br/>Art, Umfang, Umständen,<br/>Zwecken? (insb. Abs. 3<br/>lit. a–c, Liste nach Abs. 4)<br/>— Art. 35 Abs. 1, 3, 4"}
        ausnahme{"Art. 6 Abs. 1 lit. c/e,<br/>Rechtsgrundlage regelt den<br/>konkreten Vorgang,<br/>Folgenabschätzung schon bei<br/>ihrem Erlass erfolgt? — Art.<br/>35 Abs. 10"}
        keineDSFA(["Keine Datenschutz-Folgenabschätzung<br/>erforderlich (ggf. Liste nach Art. 35<br/>Abs. 5)"])
        dsfa["Datenschutz-Folgenabschätzung vorab<br/>durchführen (ähnliche Vorgänge ggf.<br/>gemeinsam) — Art. 35 Abs. 1"]
        inhalt["Mindestinhalt: Beschreibung und Zwecke,<br/>Notwendigkeit und Verhältnismäßigkeit,<br/>Risikobewertung, Abhilfemaßnahmen — Art.<br/>35 Abs. 7 (Verhaltensregeln — Abs. 8;<br/>ggf. Standpunkt Betroffener — Abs. 9;<br/>erforderlichenfalls Überprüfung — Abs.<br/>11)"]
        hohesRisiko{"Hätte die Verarbeitung laut<br/>Folgenabschätzung ein hohes<br/>Risiko, sofern keine Maßnahmen<br/>zur Eindämmung getroffen<br/>werden? — Art. 36 Abs. 1"}
        keineKonsultation(["Keine vorherige Konsultation<br/>erforderlich"])
        konsultation["Konsultiert Aufsichtsbehörde vor der<br/>Verarbeitung mit Angaben nach Art. 36<br/>Abs. 3 lit. a–f (u.a. Folgenabschätzung)<br/>— Art. 36 Abs. 1, 3"]
    end

    subgraph DSB["Datenschutzbeauftragter"]
        rat["Rat des Datenschutzbeauftragten, sofern<br/>benannt — Art. 35 Abs. 2"]
    end

    subgraph AB["Aufsichtsbehörde"]
        verstoss{"Stünde die Verarbeitung nach<br/>Auffassung der<br/>Aufsichtsbehörde nicht im<br/>Einklang mit der DSGVO (insb.<br/>Risiko nicht ausreichend<br/>ermittelt/eingedämmt)? — Art.<br/>36 Abs. 2"}
        keineEmpfehlung(["Keine Empfehlung nach Art. 36 Abs. 2"])
        empfehlung(["Schriftliche Empfehlung an<br/>Verantwortlichen, ggf.<br/>Auftragsverarbeiter, binnen bis zu 8<br/>Wochen (+6 Wochen, Aussetzung möglich);<br/>ggf. Befugnisse nach Art. 58 — Art. 36<br/>Abs. 2"])
    end

    start --> risiko
    risiko -->|Nein| keineDSFA
    risiko -->|Ja| ausnahme
    ausnahme -->|"Ja: Abs. 1–7 nur, wenn nach<br/>Ermessen der Mitgliedstaaten<br/>erforderlich"| keineDSFA
    ausnahme -->|Nein| dsfa
    dsfa -->|"sofern benannt"| rat
    dsfa --> inhalt
    rat -.-> inhalt
    inhalt --> hohesRisiko
    hohesRisiko -->|Nein| keineKonsultation
    hohesRisiko -->|Ja| konsultation
    konsultation --> verstoss
    verstoss -->|Ja| empfehlung
    verstoss -->|Nein| keineEmpfehlung
    keineDSFA ~~~ dsfa
    keineKonsultation ~~~ konsultation
    keineEmpfehlung ~~~ empfehlung

    style keineDSFA fill:#fff3cd,stroke:#c9a227
    style keineKonsultation fill:#d4edda,stroke:#2d8a4a
    style keineEmpfehlung fill:#d4edda,stroke:#2d8a4a
    style empfehlung fill:#f8d7da,stroke:#c0392b
`;export{e as default};