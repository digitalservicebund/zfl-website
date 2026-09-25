var e=`---
summary: "Die Akteure des Onlinezugangsgesetzes mit dem Bundesministerium des Innern und für Heimat im Zentrum: wer den Portalverbund aufbaut, Nutzerkonten und Datenschutzcockpit bereitstellt, verbindliche Standards festlegt und wie IT-Planungsrat, Behörden und Nutzer eingebunden sind."
---
flowchart LR
    BMI["<b>Bundesministerium des Innern und für Heimat</b><br/>bestimmt, welche Stellen Bürger- und Organisationskonto bereitstellen — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>, II<br/>legt IT-Sicherheitsstandards fest — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a><br/>legt Architektur-, Qualitäts- und Interoperabilitätsvorgaben fest — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a><br/>veröffentlicht die angewendeten Standards — <a href='{{ELI}}#art-z6_abs-z4' target='_blank' rel='noopener'>§6 IV</a>"]

    subgraph Bund["Bund"]
        BundT["<b>Bund</b><br/>stellt das zentrale Bürgerkonto bereit — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a><br/>Suchdienst im Verwaltungsportal des Bundes — <a href='{{ELI}}#art-z1a_abs-z4' target='_blank' rel='noopener'>§1a IV</a><br/>mit den Ländern: allgemeine Beratung im Portalverbund — <a href='{{ELI}}#art-z3a_abs-z1' target='_blank' rel='noopener'>§3a I</a>"]
        BReg["<b>Bundesregierung</b><br/>kann IT-Komponenten verbindlich vorgeben — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a><br/>berichtet über die Bekanntgabe per Postfach — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"]
        BMDS["<b>Bundesministerium für Digitalisierung und Staatsmodernisierung</b><br/>legt IT-Komponenten für das Verwaltungsportal der Länder fest — <a href='{{ELI}}#art-z1a_abs-z5' target='_blank' rel='noopener'>§1a V</a>"]
    end

    subgraph Laender["Länder"]
        Land["<b>Länder</b><br/>bieten Verwaltungsleistungen elektronisch über Verwaltungsportale an — <a href='{{ELI}}#art-z1a_abs-z1' target='_blank' rel='noopener'>§1a I</a><br/>stellen die Anbindung der Gemeinden sicher — <a href='{{ELI}}#art-z1a_abs-z3' target='_blank' rel='noopener'>§1a III</a><br/>schaffen die Voraussetzungen für vorgegebene Verfahren — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"]
    end

    subgraph Gremien["Gremien und Parlament"]
        ITPLR["<b>IT-Planungsrat</b><br/>Einvernehmen oder Benehmen bei Rechtsverordnungen — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>, §4 I, §10 V<br/>Erhebung zu Erfüllungsaufwänden — <a href='{{ELI}}/art-z11' target='_blank' rel='noopener'>§11</a>"]
        Parl["<b>Deutscher Bundestag und Bundesrat</b><br/>erhalten den Bericht zur Bekanntgabe über das Postfach — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"]
    end

    subgraph Portalverbund["Portalverbund"]
        NK["<b>Für das Nutzerkonto zuständige Stelle</b><br/>Identifizierung und Authentifizierung der Nutzer — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a><br/>allein datenschutzrechtlich verantwortlich — <a href='{{ELI}}#art-z8_abs-z10' target='_blank' rel='noopener'>§8 X</a>"]
        DSC["<b>Öffentliche Stelle, die das Datenschutzcockpit betreibt</b><br/>zeigt Datenübermittlungen zwischen öffentlichen Stellen an — <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a>"]
        Beh["<b>Für die Verwaltungsleistung zuständige Behörde</b><br/>Organisationskonto verpflichtend — <a href='{{ELI}}#art-z3_abs-z3' target='_blank' rel='noopener'>§3 III</a><br/>Standards verbindlich — <a href='{{ELI}}#art-z6_abs-z3' target='_blank' rel='noopener'>§6 III</a>"]
        Nutzer["<b>Nutzer</b><br/>natürliche Personen, Unternehmen, Behörden — <a href='{{ELI}}#art-z2_abs-z4' target='_blank' rel='noopener'>§2 IV</a><br/>Bürgerkonto freiwillig — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>"]
    end

    BMI -->|"im Einvernehmen, Benehmen mit — <a href='{{ELI}}#art-z6_abs-z1' target='_blank' rel='noopener'>§6 I</a>, §10 V"| ITPLR
    BReg -->|"im Benehmen mit — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"| ITPLR
    BMDS -->|"im Einvernehmen mit — <a href='{{ELI}}#art-z1a_abs-z5' target='_blank' rel='noopener'>§1a V</a>"| ITPLR
    BReg -->|"Bericht — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"| Parl
    BMI -->|"bestimmt per Verordnung — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>, II"| NK
    BMI -->|"bestimmt per Verordnung — <a href='{{ELI}}#art-z10_abs-z5' target='_blank' rel='noopener'>§10 V</a>"| DSC
    BMI -->|"verbindliche Standards — <a href='{{ELI}}/art-z5' target='_blank' rel='noopener'>§5</a>, §6 III"| Beh
    BMI <-->|"Verwaltungsvereinbarung Suchdienst — <a href='{{ELI}}#art-z1a_abs-z4' target='_blank' rel='noopener'>§1a IV</a>"| Land
    BundT <-->|"verknüpfen Portale zum Portalverbund — <a href='{{ELI}}#art-z1a_abs-z3' target='_blank' rel='noopener'>§1a III</a>"| Land
    Land -->|"Anbindung der Gemeinden — <a href='{{ELI}}#art-z1a_abs-z3' target='_blank' rel='noopener'>§1a III</a>"| Beh
    Nutzer -->|"Anspruch auf elektronischen Zugang — <a href='{{ELI}}#art-z1a_abs-z2' target='_blank' rel='noopener'>§1a II</a>"| BundT
    Nutzer -->|"Identitätsnachweis — <a href='{{ELI}}#art-z3_abs-z4' target='_blank' rel='noopener'>§3 IV</a>"| NK
    NK -->|"Datenübermittlung auf Veranlassung — <a href='{{ELI}}#art-z8_abs-z8' target='_blank' rel='noopener'>§8 VIII</a>"| Beh
    NK -->|"übermittelt Kennzeichen — <a href='{{ELI}}#art-z10_abs-z3' target='_blank' rel='noopener'>§10 III</a>"| DSC
    Beh -->|"Bekanntgabe über Postfach — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>"| Nutzer

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class BMI zentral
    class NK,DSC,Beh behoerde
    class Nutzer privat
    class BundT,Land,BReg,BMDS,Parl parlament
    class ITPLR gremium
`;export{e as default};