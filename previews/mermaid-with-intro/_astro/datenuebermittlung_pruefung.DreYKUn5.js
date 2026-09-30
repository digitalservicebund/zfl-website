var e=`---
summary: "Wie der Betreiber des Bundesanzeigers, die Veröffentlichungs- und Offenlegungspflichtigen und die BaFin Daten nach §§ 10-11 URV an das Unternehmensregister übermitteln und wie die registerführende Stelle sie nach § 12 URV prüft, zugänglich macht, berichtigt und löscht."
---
swimlane-beta TD
    subgraph BAZ["Betreiber des Bundesanzeigers"]
        baz["Übermittelt Daten nach §8b III S.1 Nr.1<br/>HGB unverzüglich nach Veröffentlichung,<br/>spätestens bis Ablauf des folgenden<br/>Arbeitstages, über gesicherte Verbindung<br/>im strukturierten Format (z.B. XML);<br/>Eingang mit Zeitstempel dokumentiert<br/>— <a href='{{ELI}}#art-z10_abs-z' target='_blank' rel='noopener'>§10</a>"]
    end

    subgraph VOP["Veröffentlichungs-/Offenlegungspflichtige oder beauftragte Dritte"]
        vop1["Übermitteln Daten nach §8b II Nr.9 HGB<br/>unverzüglich nach Veröffentlichung,<br/>Nr.10 unverzüglich nach Mitteilung (ggf.<br/>auch über Internetformulare;<br/>Registrierung nach <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a> erforderlich)<br/>— <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a>"]
        vop2["Übermitteln Rechnungslegungsunterlagen<br/>(§8b II Nr.4 HGB) und dauerhaft zu<br/>hinterlegende Unterlagen über gesicherte<br/>Internetverbindung mit Vertrauensdienst<br/>im vorgeschriebenen Format<br/>(einheitliches elektronisches<br/>Berichtsformat, Offenlegungs-,<br/>Erstellungsformat, sonst XML) — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>"]
        verlangen["Verlangen Berichtigung, wenn die<br/>registerführende Stelle Unterlagen<br/>fehlerhaft eingestellt hat — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.4</a>"]
    end

    subgraph RS["Registerführende Stelle"]
        bafinEnd["Für 10 Jahre zugänglich zu halten,<br/>anschließend Löschung — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II S.2</a>"]
        zug1["Unverzüglich, spätestens bis Ablauf des<br/>folgenden Arbeitstages unmittelbar<br/>zugänglich gemacht — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.1</a>;<br/>Löschung: Daten nach §10, wenn die<br/>Originaldaten nicht mehr im<br/>Bundesanzeiger zugänglich sind — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II<br/>S.1</a>; Daten nach §11 I nach 10 Jahren<br/>— <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II S.2</a>"]
        pruefen["Prüft unverzüglich nach §329 I-III HGB,<br/>soweit eine Prüfung gesetzlich<br/>vorgeschrieben ist — <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.2</a>"]
        zug2["Unverzüglich nach Prüfung bzw.<br/>Übermittlung unmittelbar zugänglich<br/>gemacht (außer zur dauerhaften<br/>Hinterlegung eingestellte Unterlagen)<br/>— <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.3</a>; gesetzliche<br/>Löschungsregelungen bleiben unberührt<br/>— <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II S.3</a>"]
        berichtigt(["Berichtigung; als solche gekennzeichnet<br/>— <a href='{{ELI}}#art-z12_abs-z1' target='_blank' rel='noopener'>§12 I S.4-5</a>"])
    end

    subgraph BaFin["Bundesanstalt für Finanzdienstleistungsaufsicht"]
        bafin["Übermittelt Daten nach §8b II Nr.13 HGB<br/>elektronisch über gesicherte<br/>Internetverbindung — <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III</a>"]
    end

    baz --> zug1
    vop1 --> zug1
    vop2 --> pruefen
    pruefen --> zug2
    bafin --> bafinEnd
    zug1 -.-> verlangen
    zug2 -.-> verlangen
    verlangen --> berichtigt
    vop2 ~~~ vop1

    style bafinEnd fill:#d4edda,stroke:#2d8a4a
    style zug1 fill:#d4edda,stroke:#2d8a4a
    style zug2 fill:#d4edda,stroke:#2d8a4a
    style berichtigt fill:#fff3cd,stroke:#c9a227
`;export{e as default};