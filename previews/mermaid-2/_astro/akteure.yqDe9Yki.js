var e=`---
summary: "Die Behörden, Stellen und Verpflichteten, die das IGV-DG zur Durchführung der Internationalen Gesundheitsvorschriften einbindet – von der nationalen IGV-Anlaufstelle und dem Bundesministerium für Gesundheit über Landes- und Hafengesundheitsbehörden bis zu Luftfahrt, Schifffahrt und WHO – und wie Mitteilungen, Anordnungen und Meldungen zwischen ihnen verlaufen."
---
flowchart TD
    AS["<b>Nationale IGV-Anlaufstelle</b><br/>Gemeinsames Melde- und Lagezentrum im BBK — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.1</a><br/>Aufgaben nach Art. 4 II IGV — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.2</a><br/>verarbeitet und übermittelt personenbezogene Daten — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 II</a>"]

    subgraph Bund["Bundesebene"]
        BMG["<b>Bundesministerium für Gesundheit</b><br/>beauftragt die nationale IGV-Anlaufstelle — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I S.2</a><br/>ordnet Verhaltenshinweise an Reisende an — <a href='{{ELI}}#art-z5_abs-z1' target='_blank' rel='noopener'>§5 I</a><br/>Umleitung von Luftfahrzeugen und Schiffen aus betroffenen Gebieten — <a href='{{ELI}}#art-z9_abs-z1' target='_blank' rel='noopener'>§9 I</a>, §14 I<br/>benennt Flughäfen und Häfen gegenüber der WHO — <a href='{{ELI}}#art-z8_abs-z8' target='_blank' rel='noopener'>§8 VIII</a>"]
        RKI["<b>Robert Koch-Institut</b><br/>entscheidet über WHO-Mitteilungen zu übertragbaren Krankheiten — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a><br/>Empfehlung zu Kapazitäten an Flughäfen und Häfen — <a href='{{ELI}}#art-z8_abs-z3' target='_blank' rel='noopener'>§8 III</a><br/>Amtshilfe bei der Kontaktpersonenermittlung — <a href='{{ELI}}#art-z12_abs-z7' target='_blank' rel='noopener'>§12 VII</a>"]
        WEB["<b>Bundesamt für Bevölkerungsschutz und Katastrophenhilfe (BBK) und Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit</b><br/>entscheiden über WHO-Mitteilungen zu chemischen und radionuklearen Gefahren — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"]
    end

    subgraph Laender["Länder"]
        OLGB["<b>Oberste Landesgesundheitsbehörde</b><br/>bestimmt Flughäfen, Häfen und Kapazitäten — <a href='{{ELI}}#art-z8_abs-z2' target='_blank' rel='noopener'>§8 II</a>, §8 IV, §13 II, IV<br/>bestimmt Häfen für Schiffshygienebescheinigungen — <a href='{{ELI}}#art-z19_abs-z1' target='_blank' rel='noopener'>§19 I</a><br/>unterrichtet das BMG über Kapazitäten — <a href='{{ELI}}#art-z8_abs-z8' target='_blank' rel='noopener'>§8 VIII</a>"]
        LB["<b>Zuständige Landesbehörden</b><br/>informieren über mögliche gesundheitliche Notlagen — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"]
        GA["<b>Gesundheitsamt</b><br/>nach Landesrecht bestimmt — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a><br/>erhält Meldungen aus Luftfahrzeugen und von Schiffen — <a href='{{ELI}}#art-z11_abs-z3' target='_blank' rel='noopener'>§11 III</a>, §16 III<br/>ordnet Umleitung und Aussteigekarten an — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>, §12 III"]
        HAED["<b>Hafenärztlicher Dienst</b><br/>nach Landesrecht bestimmt — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a><br/>erhält die Seegesundheitserklärung — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a><br/>erteilt die Freie Verkehrserlaubnis — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a><br/>überprüft die Schiffshygiene — <a href='{{ELI}}#art-z19_abs-z5' target='_blank' rel='noopener'>§19 V</a>"]
    end

    subgraph INT["International"]
        WHO["<b>Weltgesundheitsorganisation</b><br/>IGV-Kontaktstellen, mit denen die Anlaufstelle kommuniziert — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1 II Nr. 28</a>"]
    end

    subgraph Verpflichtete["Verpflichtete"]
        LFZ["<b>Luftfahrzeugführung und Luftfahrtunternehmen</b><br/>melden Erkrankungsfälle an Bord — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a><br/>übergeben Aussteigekarten, stellen Daten bereit — <a href='{{ELI}}#art-z12_abs-z2' target='_blank' rel='noopener'>§12 II</a>, §12 V"]
        SF["<b>Schiffsführung</b><br/>meldet Erkrankungsfälle an Bord — <a href='{{ELI}}#art-z16_abs-z1' target='_blank' rel='noopener'>§16 I</a><br/>übermittelt die Seegesundheitserklärung — <a href='{{ELI}}#art-z15_abs-z1' target='_blank' rel='noopener'>§15 I</a>"]
        BETR["<b>Flughafenunternehmer und Hafenbetreiber</b><br/>schaffen und unterhalten Kapazitäten — <a href='{{ELI}}#art-z8_abs-z5' target='_blank' rel='noopener'>§8 V</a>, §13 V<br/>halten einen Notfallplan vor — <a href='{{ELI}}#art-z8_abs-z9' target='_blank' rel='noopener'>§8 IX</a>, §13 IX"]
    end

    BMG -->|"beauftragt — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 I</a>"| AS
    BMG -->|"benennt Flughäfen und Häfen — <a href='{{ELI}}#art-z8_abs-z8' target='_blank' rel='noopener'>§8 VIII</a>"| WHO
    RKI & WEB -->|"entscheiden über Mitteilungen — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"| AS
    AS <-->|"Mitteilungen und Informationen — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 I</a>"| WHO
    LB -->|"informieren unverzüglich — <a href='{{ELI}}#art-z4_abs-z2' target='_blank' rel='noopener'>§4 II</a>"| RKI & WEB
    GA -->|"Übermittlung bei übertragbarer Krankheit — <a href='{{ELI}}#art-z11_abs-z5' target='_blank' rel='noopener'>§11 V</a>, §16 IV"| LB
    HAED -->|"informiert über Schiffsmeldungen — <a href='{{ELI}}#art-z16_abs-z3' target='_blank' rel='noopener'>§16 III</a>"| GA
    HAED -->|"Freie Verkehrserlaubnis, Hygieneprüfung — <a href='{{ELI}}#art-z18_abs-z1' target='_blank' rel='noopener'>§18 I</a>, §19 IV"| SF
    GA -->|"Umleitung, Aussteigekarte, Datenanforderung — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>, §12 III, V"| LFZ
    OLGB -->|"bestimmt Kapazitäten — <a href='{{ELI}}#art-z8_abs-z4' target='_blank' rel='noopener'>§8 IV</a>, §13 IV"| BETR

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class AS zentral
    class RKI,WEB,LB,GA,HAED,WHO behoerde
    class LFZ,SF,BETR privat
    class BMG,OLGB parlament
`;export{e as default};