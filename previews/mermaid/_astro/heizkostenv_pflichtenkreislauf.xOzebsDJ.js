var e=`stateDiagram-v2
    [*] --> Ausstattung

    Ausstattung: Ausstattung installieren & warten (§4, §5)
    Ausstattung --> Erfassung: Ausstattung betriebsbereit

    Erfassung: Verbrauch laufend erfassen (§4 I)
    Erfassung --> Zwischeninfo

    Zwischeninfo: Unterjährige Verbrauchsinformation (§6a I)
    Zwischeninfo --> Zwischeninfo: nächster Monat / nächstes Quartal
    Zwischeninfo --> Ablesung: Ende des Abrechnungszeitraums

    Ablesung: Ablesung / Verbrauchsermittlung (§6 I)
    Ablesung --> Kostenverteilung

    Kostenverteilung: Kostenverteilung nach §§6-9 durchführen
    Kostenverteilung --> Abrechnungserstellung

    Abrechnungserstellung: Abrechnung inkl. Pflichtangaben erstellen (§6a III)
    Abrechnungserstellung --> Mitteilung

    Mitteilung: Abrechnung an Nutzer mitteilen (§6, §6a)
    Mitteilung --> Erfassung: nächster Abrechnungszeitraum beginnt

    note right of Ausstattung
        Nutzer kann Erfüllung dieser
        Pflicht verlangen — §4 IV
    end note

    note right of Erfassung
        Datenerhebung/-verarbeitung nur
        zweckgebunden zulässig — §6b
    end note

    note right of Mitteilung
        Pflichtverletzung entlang des
        Kreislaufs löst Kürzungsrecht
        des Nutzers aus — §12
        (15% / 3%, ggf. kumulativ)
    end note
`;export{e as default};