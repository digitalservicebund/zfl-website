var e=`---
summary: "Wann das Bundesamt einen Asylantrag als offensichtlich unbegründet ablehnt, etwa bei sicheren Herkunftsstaaten, und welche verkürzten Klage- und Eilantragsfristen sich daraus im Vergleich zum Regelfall ergeben."
---
flowchart TD
    A["Bundesamt prüft den Asylantrag"] --> B{"Herkunftsstaat ist sicherer<br/>Herkunftsstaat nach Art. 16a<br/>Abs. 3 GG (Anlage II)? — <a href='{{ELI}}#art-z29a_abs-z1' target='_blank' rel='noopener'>§29a<br/>Abs. 1</a>"}
    B -->|Ja| C{"Begründen die vom Ausländer<br/>angegebenen Tatsachen<br/>abweichend von der allgemeinen<br/>Lage eine Verfolgungsgefahr<br/>oder<br/>unmenschliche/erniedrigende<br/>Behandlung? — <a href='{{ELI}}#art-z29a_abs-z1' target='_blank' rel='noopener'>§29a Abs. 1 S. 1</a>"}
    C -->|Ja| D["Regelvermutung widerlegt:<br/>keine offensichtliche Unbegründetheit,<br/>normale inhaltliche Prüfung"]
    C -->|Nein| E
    B -->|Nein| F{"Liegt zum Abschluss der<br/>Prüfung ein Umstand nach Art.<br/>42 Abs. 1 bzw. bei<br/>unbegleiteten Minderjährigen<br/>Abs. 3 Buchst. a-c VO (EU)<br/>2024/1348 vor? — <a href='{{ELI}}#art-z30_abs-z' target='_blank' rel='noopener'>§30</a>"}
    F -->|Ja| E["Ablehnung des Asylantrags als<br/>offensichtlich unbegründet — <a href='{{ELI}}#art-z30_abs-z' target='_blank' rel='noopener'>§30</a>"]
    F -->|Nein| G["Ablehnung als (einfach) unbegründet bzw.<br/>Zuerkennung des Schutzstatus"]

    E --> H["Klagefrist verkürzt auf eine Woche — <a href='{{ELI}}#art-z74_abs-z1' target='_blank' rel='noopener'>§74<br/>Abs. 1 S. 2, 3</a>"]
    G --> I["Klagefrist: zwei Wochen (Regelfall)<br/>— <a href='{{ELI}}#art-z74_abs-z1' target='_blank' rel='noopener'>§74 Abs. 1 S. 1</a>"]
    H --> J["Klage hat keine aufschiebende Wirkung<br/>— <a href='{{ELI}}#art-z75_abs-z' target='_blank' rel='noopener'>§75</a>"]
    H --> K["Eilantrag gegen die<br/>Abschiebungsandrohung binnen einer<br/>Woche; Vollzug erst nach ablehnender<br/>Gerichtsentscheidung — <a href='{{ELI}}#art-z36_abs-z2' target='_blank' rel='noopener'>§36 Abs. 2</a>"]
    I --> L["Begründungsfrist für die Klage: ein<br/>Monat nach Zustellung der Entscheidung<br/>— <a href='{{ELI}}#art-z74_abs-z2' target='_blank' rel='noopener'>§74 Abs. 2</a>"]

    style D fill:#d4edda,stroke:#2d8a4a
    style J fill:#f8d7da,stroke:#c0392b
    style K fill:#fff3cd,stroke:#c9a227
    style L fill:#fff3cd,stroke:#c9a227
`;export{e as default};