var e=`---
summary: "Die Prüfung, ob jemand zur beruflichen Pflegeausbildung zugelassen wird, und in welchem Umfang andere Ausbildungen auf Antrag auf die Ausbildungsdauer angerechnet werden."
---
flowchart TD
    start(["Zugang zur Ausbildung zur Pflegefachfrau oder<br/>zum Pflegefachmann; Entscheidung durch die<br/>Behörde des Landes der Ausbildung — <a href='{{ELI}}#art-z52_abs-z2' target='_blank' rel='noopener'>§52 II</a>"])
    msa{"Mittlerer Schulabschluss<br/>oder gleichwertig<br/>anerkannter Abschluss?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.1</a>"}
    hsa{"Hauptschulabschluss<br/>oder gleichwertig<br/>anerkannter Abschluss?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.2</a>"}
    zusatz{"Zusätzlich Nachweis einer<br/>Ausbildung oder Erlaubnis<br/>nach Nr.2 a-d?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.2</a>"}
    zehn{"Sonstige zehnjährige<br/>allgemeine Schulbildung<br/>abgeschlossen?<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.3</a>"}
    p24{"Zuverlässig, gesundheitlich<br/>geeignet, ausreichende<br/>Deutschkenntnisse?<br/>— <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a> i.V.m. §2"}
    kein(["Kein Zugang zur Ausbildung"])
    zugang["Zugang zur Ausbildung"]
    antrag{"Antrag auf Anrechnung<br/>einer anderen Ausbildung?<br/>— <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a>"}
    helfer{"Assistenz- oder<br/>Helferausbildung, die die<br/>beschlossenen Eckpunkte<br/>erfüllt? — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II</a>"}
    drittel(["Anrechnung auf ein Drittel der<br/>Ausbildungsdauer — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II</a>"])
    ermessen(["Anrechnung im Umfang der Gleichwertigkeit<br/>möglich, höchstens zwei Drittel der Dauer;<br/>Ausbildungsziel darf nicht gefährdet<br/>werden — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I</a>"])
    voll(["Ausbildung in voller Dauer"])
    hinweisZusatz["Nr.2: a) mindestens zweijährige<br/>Berufsausbildung, b) mindestens einjährige<br/>Assistenz- oder Helferausbildung in der<br/>Pflege nach den Eckpunkten, c) bis 31.12.2019<br/>begonnene Krankenpflegehilfe- oder<br/>Altenpflegehilfeausbildung (mind. 1 Jahr)<br/>oder d) Erlaubnis als Krankenpflegehelferin<br/>oder Krankenpflegehelfer — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.2</a>"]

    start --> msa
    msa -->|Ja| p24
    msa -->|Nein| hsa
    hsa -->|Ja| zusatz
    hsa -->|Nein| zehn
    zusatz -->|Ja| p24
    zusatz -->|Nein| zehn
    zehn -->|Ja| p24
    zehn -->|Nein| kein
    p24 -->|Ja| zugang
    p24 -->|Nein| kein
    zugang --> antrag
    antrag -->|Ja| helfer
    antrag -->|Nein| voll
    helfer -->|"Ja: ist anzurechnen"| drittel
    helfer -->|"Nein: andere Ausbildung<br/>oder Ausbildungsteile"| ermessen
    zusatz -.- hinweisZusatz

    style zugang fill:#d4edda,stroke:#2d8a4a
    style kein fill:#f8d7da,stroke:#c0392b
    style drittel fill:#d4edda,stroke:#2d8a4a
    style ermessen fill:#fff3cd,stroke:#c9a227
    style voll fill:#d4edda,stroke:#2d8a4a
    style hinweisZusatz fill:#f5f5f5,stroke:#999
`;export{e as default};