var e=`stateDiagram-v2
    [*] --> Ausstattung

    Ausstattung: Ausstattung installieren & warten (<a href='{{ELI}}/art-z4' target='_blank' rel='noopener'>§4</a>, <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>)
    Ausstattung --> Erfassung: Ausstattung betriebsbereit

    Erfassung: Verbrauch laufend erfassen (<a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>)
    Erfassung --> Zwischeninfo

    Zwischeninfo: Unterjährige Verbrauchsinformation (<a href='{{ELI}}#art-z6a_abs-z1' target='_blank' rel='noopener'>§6a I</a>)
    Zwischeninfo --> Zwischeninfo: nächster Monat / nächstes Quartal
    Zwischeninfo --> Ablesung: Ende des Abrechnungszeitraums

    Ablesung: Ablesung / Verbrauchsermittlung (<a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>)
    Ablesung --> Kostenverteilung

    Kostenverteilung: Kostenverteilung nach §§6-9 durchführen
    Kostenverteilung --> Abrechnungserstellung

    Abrechnungserstellung: Abrechnung inkl. Pflichtangaben erstellen (<a href='{{ELI}}#art-z6a_abs-z3' target='_blank' rel='noopener'>§6a III</a>)
    Abrechnungserstellung --> Mitteilung

    Mitteilung: Abrechnung an Nutzer mitteilen (<a href='{{ELI}}/art-z6' target='_blank' rel='noopener'>§6</a>, <a href='{{ELI}}/art-z6a' target='_blank' rel='noopener'>§6a</a>)
    Mitteilung --> Erfassung: nächster Abrechnungszeitraum beginnt

    note right of Ausstattung
        Nutzer kann Erfüllung dieser
        Pflicht verlangen — <a href='{{ELI}}#art-z4_abs-z4' target='_blank' rel='noopener'>§4 IV</a>
    end note

    note right of Erfassung
        Datenerhebung/-verarbeitung nur
        zweckgebunden zulässig — <a href='{{ELI}}#art-z6b_abs-z' target='_blank' rel='noopener'>§6b</a>
    end note

    note right of Mitteilung
        Pflichtverletzung entlang des
        Kreislaufs löst Kürzungsrecht
        des Nutzers aus — <a href='{{ELI}}/art-z12' target='_blank' rel='noopener'>§12</a>
        (15% / 3%, ggf. kumulativ)
    end note
`;export{e as default};