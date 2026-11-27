var e=`---
summary: "Der Ablauf einer Forderungspfändung nach der ZPO: optionale Vorpfändung, Pfändungs- und Überweisungsbeschluss, Zustellung an Drittschuldner und Schuldner, Drittschuldnererklärung und anschließende Zahlung, Hinterlegung oder Einziehungsklage."
---
swimlane-beta TD
    subgraph GL["Gläubiger"]
        start(["Vollstreckbarer Titel gegen den Schuldner,<br/>der eine Geldforderung gegen einen<br/>Dritten hat — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I S.1</a>"])
        antrag["Antrag auf Pfändungs- und<br/>Überweisungsbeschluss (Formular),<br/>Überweisung zur Einziehung oder an<br/>Zahlungs statt — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 IV</a>, <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 I</a>"]
        zustellenLassen["Lässt den Beschluss dem Drittschuldner<br/>zustellen, zusammen mit der Aufforderung<br/>zur Erklärung — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 II S.1</a>, <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 II S.1</a>"]
        zahlt{"Zahlt der Drittschuldner?<br/>(bei Kontoguthaben erst<br/>1 Monat nach Zustellung<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 III S.2</a>)"}
        erhalten(["Gläubiger erhält Zahlung"])
        klage(["Einziehungsklage gegen den Drittschuldner<br/>mit Streitverkündung an den Schuldner<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__841.html' target='_blank' rel='noopener'>§841</a>; bei mehrfacher Pfändung<br/>Klage auf Hinterlegung — <a href='https://www.gesetze-im-internet.de/zpo/__856.html' target='_blank' rel='noopener'>§856 I</a>"])
    end

    subgraph VG["Vollstreckungsgericht"]
        eingang("Antrag geht beim Amtsgericht des<br/>Schuldner-Gerichtsstands ein — <a href='https://www.gesetze-im-internet.de/zpo/__828.html' target='_blank' rel='noopener'>§828 II</a>")
        beschluss["Erlässt Pfändungs- und<br/>Überweisungsbeschluss ohne Anhörung<br/>des Schuldners: Zahlungsverbot an den<br/>Drittschuldner, Verfügungsverbot an den<br/>Schuldner — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 I</a>, <a href='https://www.gesetze-im-internet.de/zpo/__834.html' target='_blank' rel='noopener'>§834</a>, <a href='https://www.gesetze-im-internet.de/zpo/__835.html' target='_blank' rel='noopener'>§835 I</a>"]
    end

    subgraph GV["Gerichtsvollzieher"]
        vorpf["Vorpfändung: stellt Drittschuldner und<br/>Schuldner die Benachrichtigung über die<br/>bevorstehende Pfändung zu — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I</a>"]
        zustDS["Stellt den Beschluss dem Drittschuldner<br/>zu: Pfändung ist bewirkt — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 III</a>"]
        zustS["Stellt den Beschluss mit<br/>Zustellungsnachweis sofort dem Schuldner<br/>zu — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 II S.2</a>"]
    end

    subgraph SN["Schuldner"]
        schuldner("Beschluss geht zu: Verfügungsverbot;<br/>Pflicht zu Auskunft und Herausgabe<br/>der Urkunden — <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 I S.2</a>, <a href='https://www.gesetze-im-internet.de/zpo/__836.html' target='_blank' rel='noopener'>§836 III</a>")
    end

    subgraph DS["Drittschuldner"]
        erklaerung["Erklärt binnen 2 Wochen ab Zustellung<br/>die Angaben nach <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 I Nr. 1-5</a><br/>(auch gegenüber dem GV — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 III</a>);<br/>sonst Haftung für den Schaden — <a href='https://www.gesetze-im-internet.de/zpo/__840.html' target='_blank' rel='noopener'>§840 II S.2</a>"]
        mehrfach{"Forderung für mehrere<br/>Gläubiger gepfändet? — <a href='https://www.gesetze-im-internet.de/zpo/__853.html' target='_blank' rel='noopener'>§853</a>"}
        hinterlegt(["Hinterlegung beim Amtsgericht des zuerst<br/>zugestellten Beschlusses (auf Verlangen<br/>eines Gläubigers Pflicht) — <a href='https://www.gesetze-im-internet.de/zpo/__853.html' target='_blank' rel='noopener'>§853</a>"])
    end

    start -.->|optional| vorpf
    start --> antrag
    antrag --> eingang
    eingang --> beschluss
    beschluss --> zustellenLassen
    zustellenLassen --> zustDS
    vorpf -.->|"Arrestwirkung, wenn Pfändung<br/>binnen 1 Monat — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 II</a>"| zustDS
    zustDS --> zustS
    zustS --> schuldner
    zustDS --> erklaerung
    erklaerung --> mehrfach
    mehrfach -->|Ja| hinterlegt
    mehrfach -->|Nein| zahlt
    zahlt -->|Ja| erhalten
    zahlt -->|Nein| klage

    style erhalten fill:#d4edda,stroke:#2d8a4a
    style hinterlegt fill:#fff3cd,stroke:#c9a227
    style klage fill:#fff3cd,stroke:#c9a227
`;export{e as default};