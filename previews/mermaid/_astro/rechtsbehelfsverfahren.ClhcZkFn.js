var e=`---
summary: "Zeigt den Rechtsweg gegen die Ablehnung eines Kriegsdienstverweigerungsantrags nach dem KDVG, von Widerspruch über die Klage vor dem Verwaltungsgericht bis zur Nichtzulassungs- bzw. Rechtswegbeschwerde vor dem Bundesverwaltungsgericht."
---
flowchart TD
    A["Bundesamt lehnt den Antrag ab<br/>— <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7</a>"] --> B{"Widerspruch eingelegt?<br/>(§§68 ff. VwGO entsprechend)<br/>— <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 Abs. 1</a>"}
    B -->|"Nein, Frist<br/>verstrichen"| Z1["Ablehnung wird<br/>bestandskräftig"]
    B -->|Ja| C["Auch gesetzliche Vertretung kann<br/>selbstständig Widerspruch einlegen<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>; unentgeltliche<br/>Vertretung durch beauftragte<br/>Personen der Kirchen/<br/>Religionsgemeinschaften zulässig<br/>— <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3</a>"]
    C --> D{"Bundesamt hilft dem<br/>Widerspruch ab?"}
    D -->|Ja| Z2["Anerkennung als<br/>Kriegsdienstverweigerer/in"]
    D -->|Nein| E["Klage vor dem<br/>Verwaltungsgericht<br/>(§§8, 9 Abs. 2 entsprechend,<br/>§67 VwGO unberührt)<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1</a>"]
    E --> F{"Verwaltungsgericht gibt<br/>der Klage statt?"}
    F -->|Ja| Z2
    F -->|Nein| G["Berufung gegen das Urteil und<br/>Beschwerde gegen andere<br/>Entscheidungen sind ausgeschlossen<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 Abs. 2 S. 1</a>"]
    G --> H{"Nichtzulassungsbeschwerde<br/>(Revision, §135 i.V.m. §133 VwGO)<br/>oder Rechtswegbeschwerde nach<br/>§17a Abs. 2/3 GVG erhoben?<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 Abs. 2 S. 2</a>"}
    H -->|Nein| Z3["Klageabweisung wird<br/>rechtskräftig"]
    H -->|Ja| I["Bundesverwaltungsgericht<br/>entscheidet über die Beschwerde<br/>(§17a Abs. 4 S. 4-6 GVG<br/>entsprechend)<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 Abs. 2 S. 3</a>"]

    style Z1 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#f8d7da,stroke:#c0392b
    style Z2 fill:#d4edda,stroke:#2d8a4a
    style I fill:#fff3cd,stroke:#c9a227
`;export{e as default};