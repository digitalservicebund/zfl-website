var e=`---
summary: "Zeigt die Ermittlung der gemeinsamen Bezugsdauer des Basiselterngeldes nach dem BEEG bei Frühgeburten sowie die Voraussetzungen für einen gleichzeitigen oder zeitlich versetzten Bezug durch beide Elternteile."
---
flowchart TD
    A["Ermittlung der gemeinsamen<br/>Bezugsdauer für ein Kind<br/>— <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3</a>"] --> B{"Kind mind. 6 Wochen vor dem<br/>voraussichtlichen Entbindungstermin<br/>geboren?<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 1</a>"}
    B -->|Nein| D["12 Monatsbeträge Basiselterngeld<br/>gemeinsam, zzgl. 2 Partnermonate<br/>bei Einkommensminderung eines<br/>Elternteils in 2 Lebensmonaten<br/>— <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3</a>"]
    B -->|Ja| E{"Mind. 8 Wochen vor dem<br/>Entbindungstermin geboren?<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 2</a>"}
    E -->|Nein| F["13 Monatsbeträge<br/>Basiselterngeld gemeinsam<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 1</a>"]
    E -->|Ja| G{"Mind. 12 Wochen vor dem<br/>Entbindungstermin geboren?<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 3</a>"}
    G -->|Nein| H["14 Monatsbeträge<br/>Basiselterngeld gemeinsam<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 2</a>"]
    G -->|Ja| I{"Mind. 16 Wochen vor dem<br/>Entbindungstermin geboren?<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 4</a>"}
    I -->|Nein| J["15 Monatsbeträge<br/>Basiselterngeld gemeinsam<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 3</a>"]
    I -->|Ja| K["16 Monatsbeträge<br/>Basiselterngeld gemeinsam<br/>— <a href='{{ELI}}#art-z4_abs-z5' target='_blank' rel='noopener'>§4 Abs. 5 Nr. 4</a>"]

    D --> L{"Wollen beide Elternteile<br/>gleichzeitig Basiselterngeld<br/>beziehen?<br/>— <a href='{{ELI}}#art-z4_abs-z6' target='_blank' rel='noopener'>§4 Abs. 6</a>"}
    F --> L
    H --> L
    J --> L
    K --> L

    L -->|"Ja"| M{"Liegt einer der ersten<br/>12 Lebensmonate vor, oder eine<br/>Ausnahme (Mehrlinge, Frühgeburt,<br/>Behinderung, Geschwisterbonus)?<br/>— <a href='{{ELI}}#art-z4_abs-z6' target='_blank' rel='noopener'>§4 Abs. 6</a>"}
    M -->|Ja| N["Gleichzeitiger Bezug<br/>zulässig<br/>— <a href='{{ELI}}#art-z4_abs-z6' target='_blank' rel='noopener'>§4 Abs. 6</a>"]
    M -->|Nein| O["Gleichzeitiger Bezug<br/>unzulässig, Monate müssen<br/>versetzt genommen werden"]
    L -->|Nein| P["Eltern beziehen<br/>zeitlich versetzt"]

    N --> Z["Bezugsdauer und<br/>-verteilung festgelegt"]
    O --> Z
    P --> Z

    style Z fill:#d4edda,stroke:#2d8a4a
    style O fill:#f8d7da,stroke:#c0392b
`;export{e as default};