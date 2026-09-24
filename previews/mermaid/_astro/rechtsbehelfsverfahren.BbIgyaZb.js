var e=`---
summary: "Zeigt den Rechtsweg gegen die Ablehnung eines Kriegsdienstverweigerungsantrags nach dem KDVG, von Widerspruch über die Klage vor dem Verwaltungsgericht bis zur Nichtzulassungs- bzw. Rechtswegbeschwerde vor dem Bundesverwaltungsgericht."
---
swimlane-beta TD
    subgraph AS["Antragsteller/in"]
        widerspruch{"Widerspruch eingelegt? (auch<br/>die gesetzliche Vertretung<br/>kann selbstständig Anträge<br/>stellen und Rechtsbehelfe<br/>einlegen — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 Abs. 2</a>)"}
        bestandskraft(["Ablehnung wird bestandskräftig"])
        nzb{"Beschwerde gegen die<br/>Nichtzulassung der Revision<br/>(§135 i.V.m. §133 VwGO)<br/>erhoben? — <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 Abs. 2 S. 2</a>"}
        rechtskraft(["Klageabweisung wird rechtskräftig"])
    end

    subgraph BAFzA["Bundesamt für Familie und zivilgesellschaftliche Aufgaben"]
        ablehnung(["Bundesamt lehnt den Antrag ab — <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7</a>"])
        abhilfe{"Widerspruchsverfahren nach<br/>§§68 ff. VwGO, soweit das KDVG<br/>nichts anderes bestimmt — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9<br/>Abs. 1</a><br/>(§8 entsprechend — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 Abs. 3</a>):<br/>Widerspruch erfolgreich?"}
        anerkannt(["Anerkennung als<br/>Kriegsdienstverweigerer/in"])
    end

    subgraph VG["Verwaltungsgericht"]
        verfahren["Verfahren vor dem Verwaltungsgericht:<br/>§§8 und 9 Abs. 2 entsprechend, §67 VwGO<br/>bleibt unberührt — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1</a><br/>(Beschwerde gegen Beschlüsse über den<br/>Rechtsweg nach §17a Abs. 2 und 3 GVG<br/>zulässig — <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 Abs. 2 S. 2</a>; §17a Abs. 4<br/>S. 4 bis 6 GVG entsprechend — §10 Abs. 2<br/>S. 3)"]
        urteil{"Verwaltungsgericht gibt der<br/>Klage statt?"}
        ausgeschlossen["Berufung gegen das Urteil und Beschwerde<br/>gegen andere Entscheidungen des<br/>Verwaltungsgerichts ausgeschlossen — <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10<br/>Abs. 2 S. 1</a>"]
    end

    subgraph BVerwG["Bundesverwaltungsgericht"]
        bverwg["Bundesverwaltungsgericht entscheidet<br/>über die Beschwerde; §§8 und 9 Abs. 2<br/>entsprechend — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 Abs. 1</a>"]
    end

    ablehnung --> widerspruch
    widerspruch -->|"Nein, Frist verstrichen"| bestandskraft
    widerspruch -->|Ja| abhilfe
    abhilfe -->|Ja| anerkannt
    abhilfe -->|"Nein: Klage"| verfahren
    verfahren --> urteil
    urteil -->|Ja| anerkannt
    urteil -->|Nein| ausgeschlossen
    ausgeschlossen --> nzb
    nzb -->|Nein| rechtskraft
    nzb -->|Ja| bverwg
    bestandskraft ~~~ abhilfe

    style bestandskraft fill:#f8d7da,stroke:#c0392b
    style rechtskraft fill:#f8d7da,stroke:#c0392b
    style anerkannt fill:#d4edda,stroke:#2d8a4a
    style bverwg fill:#fff3cd,stroke:#c9a227
`;export{e as default};