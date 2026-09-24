var e=`---
summary: "Zeigt die zentralen Akteure der DSGVO – vom Verantwortlichen über Auftragsverarbeiter und Datenschutzbeauftragte bis zu Aufsichtsbehörden, Europäischem Datenschutzausschuss und Kommission – mit ihren Aufgaben und den Beziehungen zueinander."
---
flowchart LR
    subgraph Verarbeitungsseite["Verarbeitungsseite"]
        V["<b>Verantwortlicher</b><br/>Entscheidet über Zwecke und Mittel — Art. 4 Nr. 7<br/>Weist Einhaltung nach — Art. 5 Abs. 2<br/>Setzt Maßnahmen um — Art. 24"]
        GV["<b>Gemeinsam Verantwortliche</b><br/>Legen Zwecke und Mittel gemeinsam fest — Art. 26 Abs. 1"]
        AV["<b>Auftragsverarbeiter</b><br/>Verarbeitet im Auftrag — Art. 4 Nr. 8<br/>Nur auf dokumentierte Weisung — Art. 29"]
        VT["<b>Vertreter in der Union</b><br/>Für Verantwortliche ohne EU-Niederlassung — Art. 27<br/>Anlaufstelle für Behörden und Betroffene — Art. 27"]
        DSB["<b>Datenschutzbeauftragter</b><br/>Wird benannt — Art. 37<br/>Weisungsfrei, berichtet der höchsten<br/>Managementebene — Art. 38 Abs. 3"]
        ZS["<b>Zertifizierungsstelle</b><br/>Erteilt und widerruft<br/>Datenschutzzertifizierungen — Art. 42 Abs. 5, Art. 43"]
    end

    BP["<b>Betroffene Person</b><br/>Identifizierte oder identifizierbare<br/>natürliche Person — Art. 4 Nr. 1<br/>Hat Betroffenenrechte — Art. 12–22"]

    subgraph Aufsicht["Aufsicht"]
        FAB["<b>Federführende Aufsichtsbehörde</b><br/>Unabhängige Behörde — Art. 52<br/>Zuständig für die Hauptniederlassung — Art. 56<br/>Einziger Ansprechpartner bei<br/>grenzüberschreitender Verarbeitung — Art. 56"]
        BAB["<b>Betroffene Aufsichtsbehörden</b><br/>Weitere Behörden, z. B. wegen Beschwerde<br/>oder Betroffenen im eigenen Staat — Art. 4 Nr. 22"]
    end

    subgraph EU["EU-Ebene"]
        EDSA["<b>Europäischer Datenschutzausschuss</b><br/>Leiter der Aufsichtsbehörden und EDSB — Art. 68<br/>Sichert einheitliche Anwendung — Art. 70"]
        KOM["<b>Europäische Kommission</b><br/>Erlässt Angemessenheitsbeschlüsse — Art. 45<br/>Erlässt Durchführungsrechtsakte — Art. 93"]
    end

    V -->|"Vertrag und Weisungen — Art. 28 Abs. 3"| AV
    V <-->|"Vereinbarung über Pflichten — Art. 26 Abs. 1"| GV
    VT -.-|"Schriftlich benannte Vertretung — Art. 27 Abs. 1"| V
    DSB -->|"Unterrichtung, Beratung, Überwachung — Art. 39 Abs. 1"| V
    ZS -->|"Zertifizierung — Art. 42 Abs. 5"| V

    BP -->|"Betroffenenrechte — Art. 12–22"| V
    V -->|"Information, Benachrichtigung bei Datenpanne — Art. 13, 34"| BP
    BP -->|"Beschwerde — Art. 77"| BAB

    V -->|"Meldung von Datenpannen, vorherige Konsultation — Art. 33, 36"| FAB
    FAB -->|"Abhilfemaßnahmen, Geldbußen — Art. 58, 83"| V
    DSB <-->|"Zusammenarbeit, Anlaufstelle — Art. 39 Abs. 1"| FAB
    FAB -->|"Akkreditierung — Art. 43 Abs. 1"| ZS
    FAB -->|"Beschlussentwurf — Art. 60"| BAB
    BAB -->|"Einspruch — Art. 60"| FAB

    EDSA -->|"Stellungnahmen, Streitbeilegung — Art. 64, 65"| FAB
    EDSA -->|"Beratung — Art. 70 Abs. 1"| KOM
    KOM -->|"Angemessenheitsbeschlüsse — Art. 45"| V

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a

    class V zentral
    class FAB,BAB behoerde
    class GV,AV,VT,DSB,ZS,BP privat
    class KOM parlament
    class EDSA gremium
`;export{e as default};