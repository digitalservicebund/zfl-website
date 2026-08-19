var e=`flowchart TD
    A["Schaumwein im Steuerlager<br/>oder während der Beförderung<br/>betroffen"] --> B{"Art des<br/>Ereignisses?"}

    B -->|Unbeabsichtigt vollständig<br/>zerstört oder ganz/teilweise<br/>unwiederbringlich verloren| C["Steuerlagerinhaber zeigt dies<br/>dem Hauptzollamt unverzüglich<br/>an und weist es anhand<br/>betrieblicher Unterlagen nach<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I</a>"]

    C --> D{"Hauptzollamt lässt<br/>Vereinfachungen zu bzw.<br/>trifft Anordnungen zur<br/>Nachweisführung?<br/>— <a href='{{ELI}}#art-z10_abs-z1' target='_blank' rel='noopener'>§10 I S.2</a>"}
    D -->|Ja| E["Vereinfachter<br/>Nachweis genügt"]
    D -->|Nein| F["Regulärer Nachweis<br/>anhand betrieblicher<br/>Unterlagen erforderlich"]
    E --> G
    F --> G{"Nachweis vom<br/>Hauptzollamt anerkannt?"}
    G -->|Ja| H["Kein steuerbarer Verlust;<br/>keine Steuer auf zerstörte/<br/>verlorene Menge"]
    G -->|Nein| I["Menge gilt nicht als<br/>nachgewiesen zerstört/<br/>verloren; Besteuerung<br/>möglich"]

    B -->|Geplante Vernichtung<br/>nach §23 Abs. 2 Nr. 4<br/>des Gesetzes| J["Steuerlagerinhaber zeigt die<br/>Vernichtung mind. 1 Woche<br/>im Voraus an und weist sie<br/>anhand betrieblicher<br/>Unterlagen nach — <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 II</a>"]

    J --> K{"Hauptzollamt verzichtet<br/>auf amtliche Überwachung?<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 II S.3</a>"}
    K -->|Nein| L["Vernichtung wird<br/>amtlich überwacht<br/>— <a href='{{ELI}}#art-z10_abs-z2' target='_blank' rel='noopener'>§10 II S.3</a>"]
    K -->|Ja| M["Vernichtung ohne<br/>amtliche Überwachung"]
    L --> H
    M --> H

    B -->|Beabsichtigte Zerstörung<br/>bei Beförderung unter<br/>Steueraussetzung| N["Anzeige der beabsichtigten<br/>Zerstörung durch den<br/>Versender — <a href='{{ELI}}#art-z10_abs-z3' target='_blank' rel='noopener'>§10 III</a>"]

    N --> O{"Vorgelegte Nachweise<br/>vom Hauptzollamt<br/>anerkannt?"}
    O -->|Ja| P["Für die Beförderung<br/>geleistete Sicherheit nach<br/><a href='{{ELI}}/art-z18' target='_blank' rel='noopener'>§18</a> wird freigegeben<br/>— <a href='{{ELI}}#art-z10_abs-z3' target='_blank' rel='noopener'>§10 III S.3</a>"]
    O -->|Nein| I

    style H fill:#d4edda,stroke:#2d8a4a
    style P fill:#d4edda,stroke:#2d8a4a
    style I fill:#f8d7da,stroke:#c0392b
`;export{e as default};