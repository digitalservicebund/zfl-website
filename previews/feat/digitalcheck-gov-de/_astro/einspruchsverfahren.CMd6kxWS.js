var e=`---
summary: "Das Einspruchsverfahren gegen einen Steuerbescheid nach der Abgabenordnung: Statthaftigkeit und Einspruchsfrist, Wiedereinsetzung bei Fristversäumnis, erneute Prüfung durch das Finanzamt und Abschluss durch Abhilfe oder Einspruchsentscheidung, einschließlich des Hinweises vor einer Verböserung."
---
flowchart TD
    start(["Steuerbescheid wird bekanntgegeben"])
    statthaft{"Einspruch statthaft?<br/>(Abgabenangelegenheit, kein<br/>Ausschluss — <a href='https://www.gesetze-im-internet.de/ao_1977/__347.html' target='_blank' rel='noopener'>§347 I</a>, <a href='https://www.gesetze-im-internet.de/ao_1977/__348.html' target='_blank' rel='noopener'>§348</a>)"}
    nichtStatthaft(["Einspruch ist nicht statthaft<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__348.html' target='_blank' rel='noopener'>§348</a>"])
    einlegen["Einspruch schriftlich, elektronisch oder zur<br/>Niederschrift bei dem Finanzamt, das den<br/>Bescheid erlassen hat — <a href='https://www.gesetze-im-internet.de/ao_1977/__357.html' target='_blank' rel='noopener'>§357 I, II</a>;<br/>nur wer geltend macht, beschwert zu sein<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__350.html' target='_blank' rel='noopener'>§350</a>"]
    belehrung{"Rechtsbehelfsbelehrung<br/>richtig erteilt?<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__356.html' target='_blank' rel='noopener'>§356 I</a>"}
    monat{"Einspruch binnen 1 Monat<br/>nach Bekanntgabe?<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__355.html' target='_blank' rel='noopener'>§355 I S.1</a>"}
    jahr{"Einspruch binnen 1 Jahr<br/>seit Bekanntgabe?<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__356.html' target='_blank' rel='noopener'>§356 II</a>"}
    wiedereinsetzung{"Ohne Verschulden verhindert,<br/>Antrag binnen 1 Monat nach<br/>Wegfall des Hindernisses und<br/>Einspruch nachgeholt?<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__110.html' target='_blank' rel='noopener'>§110 I, II</a>"}
    verworfen(["Finanzamt verwirft den Einspruch<br/>als unzulässig — <a href='https://www.gesetze-im-internet.de/ao_1977/__358.html' target='_blank' rel='noopener'>§358 S.2</a>"])
    pruefung["Finanzamt prüft die Sache in vollem<br/>Umfang erneut — <a href='https://www.gesetze-im-internet.de/ao_1977/__367.html' target='_blank' rel='noopener'>§367 II S.1</a>"]
    hinweisVerfahren["Finanzamt kann Fristen zur Angabe von<br/>Tatsachen und Beweismitteln setzen;<br/>Verspätetes bleibt unberücksichtigt<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__364b.html' target='_blank' rel='noopener'>§364b</a>. Rücknahme des Einspruchs bis<br/>zur Bekanntgabe der Entscheidung möglich<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__362.html' target='_blank' rel='noopener'>§362 I</a>"]
    abhilfe{"Hält das Finanzamt den<br/>Einspruch in vollem<br/>Umfang für begründet?"}
    abgeholfen(["Abhilfe: Finanzamt ändert den Bescheid,<br/>keine Einspruchsentscheidung nötig<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__367.html' target='_blank' rel='noopener'>§367 II S.3</a>"])
    verboes{"Soll der Bescheid zum<br/>Nachteil geändert werden?<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__367.html' target='_blank' rel='noopener'>§367 II S.2</a>"}
    hinweis["Hinweis auf die mögliche Verböserung<br/>unter Angabe von Gründen, Gelegenheit<br/>zur Äußerung — <a href='https://www.gesetze-im-internet.de/ao_1977/__367.html' target='_blank' rel='noopener'>§367 II S.2</a>"]
    zurueck{"Nimmt der Einspruchsführer<br/>den Einspruch zurück?<br/>— <a href='https://www.gesetze-im-internet.de/ao_1977/__362.html' target='_blank' rel='noopener'>§362 I</a>"}
    zurueckgenommen(["Einspruch zurückgenommen:<br/>Verlust des Einspruchs — <a href='https://www.gesetze-im-internet.de/ao_1977/__362.html' target='_blank' rel='noopener'>§362 II S.1</a>"])
    entscheidung(["Einspruchsentscheidung, soweit nicht<br/>abgeholfen; begründet und mit<br/>Rechtsbehelfsbelehrung, schriftlich<br/>oder elektronisch — <a href='https://www.gesetze-im-internet.de/ao_1977/__366.html' target='_blank' rel='noopener'>§366</a>, <a href='https://www.gesetze-im-internet.de/ao_1977/__367.html' target='_blank' rel='noopener'>§367 I, II S.3</a>"])

    start --> statthaft
    statthaft -->|Nein| nichtStatthaft
    statthaft -->|Ja| einlegen
    einlegen --> belehrung
    belehrung -->|Ja| monat
    belehrung -->|"Nein oder<br/>unterblieben"| jahr
    monat -->|Ja| pruefung
    monat -->|Nein| wiedereinsetzung
    jahr -->|Ja| pruefung
    jahr -->|"Nein (außer bei<br/>höherer Gewalt)"| wiedereinsetzung
    wiedereinsetzung -->|"Ja: Wiedereinsetzung"| pruefung
    wiedereinsetzung -->|Nein| verworfen
    pruefung -.- hinweisVerfahren
    pruefung --> abhilfe
    abhilfe -->|Ja| abgeholfen
    abhilfe -->|"Nein oder<br/>nur teilweise"| verboes
    verboes -->|Ja| hinweis
    verboes -->|Nein| entscheidung
    hinweis --> zurueck
    zurueck -->|Ja| zurueckgenommen
    zurueck -->|Nein| entscheidung

    style nichtStatthaft fill:#f8d7da,stroke:#c0392b
    style verworfen fill:#f8d7da,stroke:#c0392b
    style abgeholfen fill:#d4edda,stroke:#2d8a4a
    style zurueckgenommen fill:#fff3cd,stroke:#c9a227
    style entscheidung fill:#fff3cd,stroke:#c9a227
    style hinweisVerfahren fill:#f5f5f5,stroke:#999
`;export{e as default};