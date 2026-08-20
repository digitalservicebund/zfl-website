var e=`---
summary: "Zeigt, wie automatisierte Upload-Filter beim Blockierverlangen eines Rechtsinhabers zwischen mutmaßlich erlaubten Nutzungen und zu blockierenden Inhalten unterscheiden müssen, einschließlich Geringfügigkeits- und Kennzeichnungsregeln."
---
flowchart TD
    A["Rechtsinhaber verlangt qualifizierte<br/>(<a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a>) oder einfache<br/>(<a href='{{ELI}}#art-z8_abs-z1' target='_blank' rel='noopener'>§8 I</a>) Blockierung und stellt die<br/>erforderlichen Informationen bereit"] --> B{"Diensteanbieter setzt<br/>automatisiertes Verfahren<br/>beim Hochladen ein? —<br/><a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II S.2</a>"}

    B -->|Nein| Z1["Manuelle Prüfung;<br/>Blockierung nur bei<br/>tatsächlichem Verstoß"]
    B -->|Ja| C{"Nutzergenerierter Inhalt enthält<br/>weniger als die Hälfte eines fremden<br/>Werks, kombiniert mit anderem<br/>Inhalt? — <a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II Nr.1-2</a>"}

    C -->|Nein| Z2["Automatisierte Blockierung;<br/>Nutzer wird informiert und auf<br/>Beschwerderecht hingewiesen —<br/><a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III</a>"]
    C -->|Ja| D{"Nutzung geringfügig<br/>(z.B. ≤15 Sek. Film/Ton,<br/>≤160 Zeichen Text, ≤125 KB Bild)? —<br/><a href='{{ELI}}#art-z10' target='_blank' rel='noopener'>§10</a>"}

    D -->|Ja| Z3["Mutmaßlich erlaubte Nutzung:<br/>Inhalt bleibt online —<br/><a href='{{ELI}}#art-z9_abs-z2' target='_blank' rel='noopener'>§9 II</a>"]
    D -->|Nein| E{"Nutzer kennzeichnet Inhalt beim<br/>Hochladen als gesetzlich erlaubt<br/>(§5)? — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I Nr.3</a>"}

    E -->|Ja| Z3
    E -->|Nein| F{"Blockierung erfolgt erst<br/>nach dem Hochladen? —<br/><a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>"}

    F -->|"Ja, nachträglich"| Z4["Inhalt gilt für 48 Std. als<br/>mutmaßlich erlaubt, auch ohne<br/>Kennzeichnung — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a>"]
    F -->|"Nein, beim Hochladen"| Z2

    Z3 --> G["Rechtsinhaber wird informiert und kann<br/>Beschwerde nach <a href='{{ELI}}/art-z14' target='_blank' rel='noopener'>§14</a> einlegen, um die<br/>Vermutung zu widerlegen —<br/><a href='{{ELI}}#art-z9_abs-z3' target='_blank' rel='noopener'>§9 III</a>"]
    Z4 --> G

    style Z1 fill:#f5f5f5,stroke:#999
    style Z2 fill:#f8d7da,stroke:#c0392b
    style Z3 fill:#d4edda,stroke:#2d8a4a
    style Z4 fill:#d4edda,stroke:#2d8a4a
`;export{e as default};