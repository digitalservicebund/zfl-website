var e=`---
summary: "Das Schlichtungsverfahren nach dem LuftVG für Zahlungsansprüche von Fluggästen gegen Luftfahrtunternehmen, von der Zuständigkeitsprüfung über die Wahl der privaten oder behördlichen Schlichtungsstelle bis zum Schlichtungsergebnis."
---
flowchart TD
    A["Fluggast (Verbraucher) will<br/>Zahlungsanspruch aus Luftbeförderung<br/>gegen Luftfahrtunternehmen klären — <a href='{{ELI}}#art-z57b_abs-z1' target='_blank' rel='noopener'>§57b<br/>Abs. 1</a>"] --> B{"Betrifft der Anspruch<br/>Nichtbeförderung/Verspätung/<br/>Herabstufung/Annullierung,<br/>Gepäckschäden, mitgeführte<br/>Sachen oder<br/>Pflichtverletzungen ggü.<br/>mobilitätseingeschränkten<br/>Fluggästen — und liegt er bei<br/>bis zu 5 000 Euro? — <a href='{{ELI}}#art-z57b_abs-z1' target='_blank' rel='noopener'>§57b Abs.<br/>1 S. 1</a>"}
    B -->|"Nein, aber über 5 000 Euro und<br/>Verfahrensordnung sieht es vor"| C
    B -->|"Nein, sonst"| Z1["Keine Schlichtung nach §57/§57a möglich<br/>— nur Klageweg"]
    B -->|Ja| C{"Liegt ein Ausschlussgrund vor<br/>(u.a. keine dt.<br/>Gerichtszuständigkeit, bereits<br/>rechtshängig, im<br/>Verbandsklageregister<br/>angemeldet, bereits bei<br/>zuständiger Schlichtungsstelle<br/>anhängig, missbräuchlich,<br/>Anspruch nicht zuerst dem<br/>Unternehmen gegenüber geltend<br/>gemacht, oder Anspruch ≤ 10<br/>Euro)? — <a href='{{ELI}}#art-z57b_abs-z2' target='_blank' rel='noopener'>§57b Abs. 2</a>"}
    C -->|Ja| Z1
    C -->|Nein| D{"Nimmt das Luftfahrtunternehmen<br/>an einer anerkannten<br/>privatrechtlich organisierten<br/>Schlichtungsstelle teil? — <a href='{{ELI}}#art-z57_abs-z3' target='_blank' rel='noopener'>§57<br/>Abs. 3</a>"}
    D -->|Ja| E["Anrufung der privatrechtlich<br/>organisierten Schlichtungsstelle — <a href='{{ELI}}/art-z57' target='_blank' rel='noopener'>§57</a>"]
    D -->|Nein| F["Anrufung der behördlichen<br/>Schlichtungsstelle beim Bundesamt für<br/>Justiz — <a href='{{ELI}}#art-z57a_abs-z1' target='_blank' rel='noopener'>§57a Abs. 1</a>"]
    E --> G{"Betrifft die Streitigkeit eine<br/>ungeklärte grundsätzliche<br/>Rechtsfrage? — <a href='{{ELI}}#art-z57b_abs-z3' target='_blank' rel='noopener'>§57b Abs. 3</a>"}
    F --> G
    G -->|Ja| H["Schlichtungsstelle kann die Schlichtung<br/>ablehnen — <a href='{{ELI}}#art-z57b_abs-z3' target='_blank' rel='noopener'>§57b Abs. 3</a>"]
    G -->|Nein| I["Schlichtungsverfahren wird durchgeführt"]
    H --> J
    I --> J{"Wird der Anspruch während des<br/>Verfahrens gerichtlich<br/>rechtshängig gemacht? — <a href='{{ELI}}#art-z57b_abs-z2' target='_blank' rel='noopener'>§57b<br/>Abs. 2 S. 2</a>"}
    J -->|Ja| Z2["Schlichtung wird unzulässig"]
    J -->|Nein| Z3["Schlichtungsergebnis liegt vor — Recht<br/>auf Klage bleibt daneben unberührt<br/>— <a href='{{ELI}}#art-z57b_abs-z4' target='_blank' rel='noopener'>§57b Abs. 4</a>"]

    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style H fill:#fff3cd,stroke:#c9a227
`;export{e as default};