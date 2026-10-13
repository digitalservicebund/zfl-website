var e=`---
summary: "Die Vorpfändung nach der ZPO: Benachrichtigung über die bevorstehende Pfändung durch den Gerichtsvollzieher und die Monatsfrist, innerhalb der die Pfändung bewirkt sein muss, damit die Benachrichtigung wie ein Arrest wirkt."
---
flowchart TD
    start(["Gläubiger hat einen vollstreckbaren<br/>Schuldtitel, die Pfändung steht noch<br/>aus — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I S.1</a>"])
    auftrag["Gläubiger lässt durch den Gerichtsvollzieher<br/>die Benachrichtigung zustellen, dass die<br/>Pfändung bevorstehe — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I S.1</a><br/>(der GV fertigt sie selbst an, wenn er<br/>ausdrücklich beauftragt ist — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I S.2</a>)"]
    zustellung["Zustellung an den Drittschuldner (nicht<br/>an den Schuldner zahlen) und an den<br/>Schuldner (jeder Verfügung über die<br/>Forderung enthalten) — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I S.1</a>"]
    fristbeginn["Monatsfrist beginnt mit dem Tag der<br/>Zustellung der Benachrichtigung<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 II S.2</a>"]
    pfaendung{"Pfändung binnen eines<br/>Monats bewirkt (Zustellung<br/>des Pfändungsbeschlusses<br/>an den Drittschuldner)?<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 II S.1</a>, <a href='https://www.gesetze-im-internet.de/zpo/__829.html' target='_blank' rel='noopener'>§829 III</a>"}
    arrest(["Benachrichtigung an den Drittschuldner hat<br/>die Wirkung eines Arrestes (<a href='https://www.gesetze-im-internet.de/zpo/__930.html' target='_blank' rel='noopener'>§930</a>)<br/>— <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 II S.1</a>"])
    keineWirkung(["Benachrichtigung hat keine<br/>Arrestwirkung — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 II S.1</a>"])

    start --> auftrag
    auftrag --> zustellung
    zustellung --> fristbeginn
    fristbeginn --> pfaendung
    pfaendung -->|Ja| arrest
    pfaendung -->|Nein| keineWirkung

    zustellung -.- ausland["Schuldner im Ausland: Zustellung durch<br/>Aufgabe zur Post, soweit nicht EU-Recht<br/>vorgeht — <a href='https://www.gesetze-im-internet.de/zpo/__845.html' target='_blank' rel='noopener'>§845 I S.3</a>"]

    style arrest fill:#d4edda,stroke:#2d8a4a
    style keineWirkung fill:#f8d7da,stroke:#c0392b
    style ausland fill:#f5f5f5,stroke:#999
`;export{e as default};