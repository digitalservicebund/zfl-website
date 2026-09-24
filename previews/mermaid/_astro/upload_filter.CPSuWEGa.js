var e=`---
summary: "Zeigt, wie automatisierte Upload-Filter beim Blockierverlangen eines Rechtsinhabers zwischen mutmaßlich erlaubten Nutzungen und zu blockierenden Inhalten unterscheiden müssen, einschließlich Geringfügigkeits- und Kennzeichnungsregeln."
---
flowchart TD
    A["Rechtsinhaber verlangt qualifizierte (<a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7<br/>I</a>)<br/>oder einfache (<a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>)<br/>Blockierung und stellt die<br/>erforderlichen Informationen bereit"] --> B{"Diensteanbieter setzt<br/>automatisiertes Verfahren beim<br/>Hochladen ein? — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II S.2</a>"}

    B -->|Nein| Z1["Manuelle Prüfung;<br/>Blockierung nur bei tatsächlichem<br/>Verstoß"]
    B -->|Ja| C{"Nutzergenerierter Inhalt<br/>enthält weniger als die Hälfte<br/>eines fremden Werks,<br/>kombiniert mit anderem Inhalt?<br/>— <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II Nr.1-2</a>"}

    C -->|Nein| Z2["Automatisierte Blockierung;<br/>Nutzer wird informiert und auf<br/>Beschwerderecht hingewiesen — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"]
    C -->|Ja| D{"Nutzung geringfügig (z.B. ≤15<br/>Sek. Film/Ton, ≤160 Zeichen<br/>Text, ≤125 KB Bild)? — <a href='{{ELI}}#art-z10' target='_blank' rel='noopener'>§10</a>"}

    D -->|Ja| Z3["Mutmaßlich erlaubte Nutzung:<br/>Inhalt bleibt online — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"]
    D -->|Nein| E{"Nutzer kennzeichnet Inhalt<br/>beim Hochladen als gesetzlich<br/>erlaubt (§5)? — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.3</a>"}

    E -->|Ja| Z3
    E -->|Nein| F{"Blockierung erfolgt erst nach<br/>dem Hochladen? — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>"}

    F -->|"Ja, nachträglich"| Z4["Inhalt gilt für 48 Std. als mutmaßlich<br/>erlaubt, auch ohne Kennzeichnung — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11<br/>II</a>"]
    F -->|"Nein, beim Hochladen"| Z2

    Z3 --> G["Rechtsinhaber wird informiert und kann<br/>Beschwerde nach <a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14</a> einlegen, um die<br/>Vermutung zu widerlegen — <a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"]
    Z4 --> G

    style Z1 fill:#f5f5f5,stroke:#999
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};