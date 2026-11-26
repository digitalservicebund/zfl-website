var e=`---
summary: "Das Prüfschema der Ausschlussgründe nach §§3 bis 6 IFG: Schutz besonderer öffentlicher Belange, des behördlichen Entscheidungsprozesses, des geistigen Eigentums und von Betriebs- oder Geschäftsgeheimnissen sowie personenbezogener Daten, mit teilweiser Stattgabe nach §7 Abs. 2."
---
flowchart TD
    start(["Anspruch nach dem<br/>IFG eröffnet — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 Abs. 1</a>"]) --> oeffentlich{"Besonderer öffentlicher<br/>Belang berührt?<br/>— <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3 Nr. 1-8</a>"}
    start -.- teil["Greift ein Ausschlussgrund nur für<br/>einen Teil: Stattgabe, soweit ohne<br/>Preisgabe geheimhaltungsbedürftiger<br/>Informationen möglich — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 Abs. 2</a>"]

    oeffentlich -->|Ja| aus3["Kein Anspruch, z.B. bei<br/>internationalen Beziehungen,<br/>öffentlicher Sicherheit,<br/>Beratungen von Behörden,<br/>Geheimhaltungspflichten,<br/>fiskalischen Interessen,<br/>Nachrichtendiensten — <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>"]
    oeffentlich -->|Nein| entscheidung{"Entwurf oder unmittelbare<br/>Vorbereitung einer Entscheidung,<br/>deren Erfolg durch vorzeitige<br/>Bekanntgabe vereitelt würde?<br/>— <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1 S. 1</a>"}

    entscheidung -->|Ja| aus4["Antrag soll abgelehnt werden,<br/>soweit und solange — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1 S. 1</a>;<br/>Information über den Verfahrens-<br/>abschluss — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 Abs. 2</a>"]
    entscheidung -->|Nein| eigentum{"Steht der Schutz<br/>geistigen Eigentums<br/>entgegen? — <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6 S. 1</a>"}
    entscheidung -.- hinweis4["Beweisergebnisse, Gutachten und<br/>Stellungnahmen Dritter dienen in der<br/>Regel nicht der unmittelbaren<br/>Vorbereitung — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1 S. 2</a>"]

    eigentum -->|Ja| aus6a["Kein Anspruch<br/>— <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6 S. 1</a>"]
    eigentum -->|Nein| geheimnis{"Betriebs- oder<br/>Geschäftsgeheimnis<br/>betroffen? — <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6 S. 2</a>"}
    geheimnis -->|Ja| einwilligung6{"Hat der Betroffene<br/>eingewilligt?<br/>— <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6 S. 2</a>"}
    einwilligung6 -->|Nein| aus6b["Kein Zugang<br/>— <a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6 S. 2</a>"]
    einwilligung6 -->|Ja| personen
    geheimnis -->|Nein| personen{"Personenbezogene<br/>Daten eines Dritten?<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1</a>"}

    personen -->|Nein| zugang
    personen -->|Ja| besondere{"Besondere Kategorien<br/>nach Art. 9 Abs. 1<br/>DSGVO?"}
    besondere -->|Ja| aus5a["Übermittlung nur bei<br/>ausdrücklicher Einwilligung<br/>des Dritten — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1 S. 2</a>"]
    besondere -->|Nein| bearbeiter{"Nur Name, Titel, Grad,<br/>Berufs-/Funktionsbezeichnung,<br/>Büroanschrift/-telefon von<br/>Bearbeitern als Ausdruck<br/>amtlicher Tätigkeit?<br/>— <a href='{{ELI}}#art-z5_abs-z4' target='_blank' rel='noopener'>§5 Abs. 4</a>"}
    bearbeiter -->|"Ja: nicht<br/>ausgeschlossen"| zugang
    bearbeiter -->|Nein| einwilligung5{"Hat der Dritte<br/>eingewilligt?<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1 S. 1</a>"}
    einwilligung5 -->|Ja| zugang
    einwilligung5 -->|Nein| dienst{"Dienst-, Amts- oder<br/>Mandatsverhältnis des Dritten<br/>oder Berufs- bzw.<br/>Amtsgeheimnis?<br/>— <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2</a>"}
    dienst -->|Ja| aus5b["Informationsinteresse<br/>überwiegt nicht — kein<br/>Zugang — <a href='{{ELI}}#art-z5_abs-z2' target='_blank' rel='noopener'>§5 Abs. 2</a>"]
    dienst -->|Nein| abwaegung{"Überwiegt das Informations-<br/>interesse das schutzwürdige<br/>Interesse des Dritten?<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1 S. 1</a>"}
    abwaegung -->|Nein| aus5c["Kein Zugang zu den<br/>personenbezogenen Daten<br/>— <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 Abs. 1 S. 1</a>"]
    abwaegung -->|Ja| zugang
    abwaegung -.- hinweis5["In der Regel ja bei Name, Titel, Grad,<br/>Berufs-/Funktionsbezeichnung und<br/>Büroanschrift/-telefon von Gutachtern, Sachverständigen o.ä.,<br/>die in einem Verfahren Stellung<br/>genommen haben — <a href='{{ELI}}#art-z5_abs-z3' target='_blank' rel='noopener'>§5 Abs. 3</a>"]

    zugang(["Kein Ausschlussgrund:<br/>Zugang ist zu gewähren<br/>— <a href='{{ELI}}#art-z7_abs-z5' target='_blank' rel='noopener'>§7 Abs. 5</a>"])

    style zugang fill:#d4edda,stroke:#2d8a4a
    style aus3 fill:#f8d7da,stroke:#c0392b
    style aus4 fill:#f8d7da,stroke:#c0392b
    style aus6a fill:#f8d7da,stroke:#c0392b
    style aus6b fill:#f8d7da,stroke:#c0392b
    style aus5a fill:#fff3cd,stroke:#c9a227
    style aus5b fill:#f8d7da,stroke:#c0392b
    style aus5c fill:#f8d7da,stroke:#c0392b
    style teil fill:#f5f5f5,stroke:#999
    style hinweis4 fill:#f5f5f5,stroke:#999
    style hinweis5 fill:#f5f5f5,stroke:#999
`;export{e as default};