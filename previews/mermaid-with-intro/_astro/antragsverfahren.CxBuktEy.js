var e=`---
summary: "Das Anerkennungsverfahren für Kriegsdienstverweigerer nach dem KDVG, von der Antragstellung über die Prüfung von Vollständigkeit, Musterung und Beweggründen bis zur schriftlichen oder mündlichen Anhörung und der Entscheidung."
---
swimlane-beta TD
    subgraph AS["Antragsteller/in"]
        antrag(["Antrag schriftlich oder zur<br/>Niederschrift mit Berufung auf Art. 4<br/>Abs. 3 S. 1 GG, vollständigem<br/>tabellarischem Lebenslauf und<br/>persönlicher ausführlicher Darstellung<br/>der Beweggründe — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs. 2</a><br/>(Stellungnahmen Dritter können beigefügt<br/>werden — <a href='{{ELI}}#art-z2_abs-z3' target='_blank' rel='noopener'>§2 Abs. 3</a>)"])
        vervollst{"Innerhalb eines Monats nach<br/>Aufforderung vervollständigt?<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 2</a>"}
        ladung{"Folgt der Ladung zur<br/>mündlichen Anhörung? — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 Abs.<br/>2</a>"}
        anerkannt(["Anerkennung als Kriegsdienstverweigerin<br/>bzw. Kriegsdienstverweigerer — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>"])
    end

    subgraph BAPersBw["Bundesamt für das Personalmanagement der Bundeswehr"]
        eingang["Bestätigt den Eingang, nimmt den Antrag<br/>zur Grundakte der Personalakte und<br/>leitet sie dem Bundesamt zu:<br/>unverzüglich, bei ungedienten<br/>Wehrpflichtigen sobald der<br/>Musterungsbescheid unanfechtbar ist (bei<br/>Berufs- und Zeitsoldaten mit<br/>Stellungnahme der/des<br/>Disziplinarvorgesetzten und der<br/>personalbearbeitenden Stelle) — <a href='{{ELI}}#art-z2_abs-z6' target='_blank' rel='noopener'>§2 Abs.<br/>6</a>"]
    end

    subgraph BAFzA["Bundesamt für Familie und zivilgesellschaftliche Aufgaben"]
        vorrang["Vorrangige Entscheidung bei Anträgen von<br/>Soldatinnen und Soldaten, einberufenen<br/>oder als Ersatz benachrichtigten<br/>ungedienten Wehrpflichtigen sowie zu<br/>einer befristeten Übung oder Wehrübung<br/>einberufenen Reservistinnen und<br/>Reservisten — <a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>"]
        vollstaendig{"Antrag vollständig? — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 Abs.<br/>2</a>, <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 Nr. 1</a>"}
        abl2(["Ablehnung — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 2</a>"])
        musterung{"Verweigert der Antragsteller<br/>die Musterung? — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr.<br/>1</a>"}
        abl1(["Ablehnung — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 1</a>"])
        beweg{"Sind die dargelegten<br/>Beweggründe geeignet, das<br/>Recht auf<br/>Kriegsdienstverweigerung zu<br/>begründen? — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 Nr. 2</a>"}
        abl3(["Ablehnung: Beweggründe vermögen das<br/>Recht auch nach schriftlicher und ggf.<br/>mündlicher Anhörung nicht zu begründen<br/>— <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 3</a>"])
        zweifel{"Begründen das tatsächliche<br/>Gesamtvorbringen und die dem<br/>Bundesamt bekannten sonstigen<br/>Tatsachen Zweifel an der<br/>Wahrheit der Angaben? — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 Nr.<br/>3</a>"}
        schriftlich["Schriftliche Anhörung: Gelegenheit, sich<br/>binnen eines Monats ergänzend zu äußern<br/>und die Angaben zu belegen — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1<br/>S. 1</a> (ggf. Führungszeugnis, wenn Zweifel<br/>dadurch aufklärbar, mit Unterrichtung<br/>— <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 Abs. 3</a>; keine darüber hinausgehende<br/>Tatsachenaufklärung — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 Abs. 4</a>)"]
        befragung{"Bestehen weiterhin Zweifel und<br/>befragt das Bundesamt<br/>mündlich? — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 Abs. 1 S. 2</a>"}
        muendlich["Mündliche Anhörung: nicht öffentlich,<br/>Protokoll — <a href='{{ELI}}#art-z6_abs-z2' target='_blank' rel='noopener'>§6 Abs. 2</a> (Erstattung der<br/>notwendigen Auslagen — <a href='{{ELI}}#art-z6_abs-z5' target='_blank' rel='noopener'>§6 Abs. 5</a>)"]
        zweifel3{"Zweifel ausgeräumt? — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5 Nr. 3</a>"}
        abl4(["Ablehnung: Zweifel trotz schriftlicher<br/>oder mündlicher Anhörung nicht<br/>ausgeräumt — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 Abs. 1 Nr. 4</a>"])
    end

    antrag --> eingang
    eingang --> vorrang
    vorrang --> vollstaendig
    vollstaendig -->|"Nein: Aufforderung zur<br/>Vervollständigung"| vervollst
    vervollst -->|Nein| abl2
    vervollst -->|Ja| musterung
    vollstaendig -->|Ja| musterung
    musterung -->|Ja| abl1
    musterung -->|Nein| beweg
    beweg -->|Nein| abl3
    beweg -->|Ja| zweifel
    zweifel -->|Nein| anerkannt
    zweifel -->|Ja| schriftlich
    schriftlich --> befragung
    befragung -->|Nein| zweifel3
    befragung -->|"Ja: Ladung"| ladung
    ladung -->|Ja| muendlich
    ladung -->|"Nein: Entscheidung nach<br/>Aktenlage"| zweifel3
    muendlich --> zweifel3
    zweifel3 -->|Ja| anerkannt
    zweifel3 -->|Nein| abl4

    style abl1 fill:#f8d7da,stroke:#c0392b
    style abl2 fill:#f8d7da,stroke:#c0392b
    style abl3 fill:#f8d7da,stroke:#c0392b
    style abl4 fill:#f8d7da,stroke:#c0392b
    style anerkannt fill:#d4edda,stroke:#2d8a4a
`;export{e as default};