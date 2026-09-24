var e=`---
summary: "Zeigt das Zuweisungsverfahren nach §7: Aufzeichnungen und Mitteilungen der Wettanbieter zum zuweisungsfähigen Steueraufkommen, die Festsetzung der Anteile durch die zuständige Landesbehörde und die zweckgebundene Verwendung der Zuweisung durch die Rennvereine."
---
swimlane-beta TD
    subgraph WA["Totalisatorbetreiber, Buchmacher, Sportwettveranstalter"]
        aufzeichnung(["Im Inland ansässige Totalisatorbetreiber<br/>und Buchmacher sowie im Ausland<br/>ansässige Veranstalter von Sportwetten<br/>auf inländische Pferderennen führen für<br/>das zuweisungsfähige Steueraufkommen<br/>besondere Aufzeichnungen — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.1</a>"])
        mitteilung["Buchmacher und ausländische<br/>Sportwettveranstalter teilen monatlich<br/>die für Wetten auf inländische<br/>Pferderennen angemeldeten und<br/>abgeführten Steuerbeträge<br/>aufgeschlüsselt mit — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.2</a><br/>(Anforderung auch im<br/>Steueranmeldungsverfahren zulässig — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7<br/>III S.3</a>)"]
    end

    subgraph FB["Finanzbehörde"]
        offenbarung["Kann die nach §30 AO geschützten Daten<br/>der für das Zuweisungsverfahren<br/>zuständigen Behörde offenbaren — <a href='{{ELI}}/art-z61' target='_blank' rel='noopener'>§61</a>"]
    end

    subgraph LB["Nach Landesrecht zuständige Behörde"]
        ausnahme{"Totalisatorsteuer aus<br/>Erlaubnissen nach §1 IV oder<br/>Buchmacher-/Sportwettensteuer<br/>aus Anlass von Pferderennen im<br/>Ausland? — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"}
        keine(["Aufkommen nicht zuweisungsfähig — <a href='{{ELI}}#art-z7_abs-z2' target='_blank' rel='noopener'>§7 II</a>"])
        festsetzung["Setzt die Anteile der Rennvereine (bis<br/>zu 96 % des Aufkommens der Totalisator-<br/>und Buchmachersteuer sowie der<br/>Sportwettensteuer ausländischer<br/>Veranstalter für inländische<br/>Pferderennen) fest und trifft die<br/>erforderlichen Bestimmungen — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.1,<br/>3</a>;<br/>je Rennverein unterschiedlich bemessbar,<br/>höchstens zur Deckung seiner Nettokosten<br/>der öffentlichen Leistungsprüfungen für<br/>Pferde — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.4-5</a>"]
    end

    subgraph RV["Rennvereine, die einen Totalisator betreiben"]
        verwendung(["Erhalten die Zuweisung und verwenden die<br/>Beträge zu Zwecken der öffentlichen<br/>Leistungsprüfungen für Pferde — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I<br/>S.1-2</a>"])
    end

    aufzeichnung --> mitteilung
    mitteilung --> offenbarung
    offenbarung --> ausnahme
    ausnahme -->|Ja| keine
    ausnahme -->|Nein| festsetzung
    festsetzung --> verwendung
    keine ~~~ festsetzung

    style keine fill:#f8d7da,stroke:#c0392b
    style verwendung fill:#d4edda,stroke:#2d8a4a
`;export{e as default};