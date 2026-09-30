var e=`---
summary: "Wie sich der Elterngeldanspruch je nach Wahl von Basiselterngeld, ElterngeldPlus und Partnerschaftsbonus nach dem BEEG zusammensetzt und wie viele Monate dabei jeweils zur Verfügung stehen."
---
flowchart TD
    A["Eltern legen für jeden Lebensmonat die<br/>Bezugsform fest — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1</a>"] --> B{"Bezug als voller Monatsbetrag<br/>bis zur Vollendung des<br/>14. Lebensmonats? — <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1<br/>S. 3</a>"}
    B -->|Ja| C["Basiselterngeld:<br/>Berechnung ausschließlich nach §§2 bis 3<br/>— <a href='{{ELI}}#art-z4a_abs-z1' target='_blank' rel='noopener'>§4a Abs. 1</a>"]
    B -->|"Nein, länger gestreckter Bezug"| D["ElterngeldPlus: Bezug bis zur Vollendung<br/>des 32. Lebensmonats, höchstens die<br/>Hälfte des Basiselterngeldes je Monat<br/>— <a href='{{ELI}}#art-z4_abs-z1' target='_blank' rel='noopener'>§4 Abs. 1 S. 4</a>, <a href='{{ELI}}#art-z4a_abs-z2' target='_blank' rel='noopener'>§4a Abs. 2</a>"]

    C --> E{"Ist das Einkommen aus<br/>Erwerbstätigkeit eines<br/>Elternteils in zwei<br/>Lebensmonaten gemindert? — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4<br/>Abs. 3 S. 2</a>"}
    E -->|Ja| F["2 zusätzliche Partnermonate<br/>Basiselterngeld gemeinsam — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3 S.<br/>2</a>"]
    E -->|Nein| G["12 Monatsbeträge Basiselterngeld<br/>gemeinsam — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3 S. 1</a>"]

    D --> H{"1 Basiselterngeld-Monat kann<br/>gegen 2 ElterngeldPlus-Monate<br/>getauscht werden — <a href='{{ELI}}#art-z4_abs-z3' target='_blank' rel='noopener'>§4 Abs. 3<br/>S. 3</a>"}
    H --> I{"Sind beide Elternteile im<br/>Durchschnitt des Lebensmonats<br/>mit 24 bis 32 Wochenstunden<br/>erwerbstätig und erfüllen sie<br/>§1? — <a href='{{ELI}}#art-z4b_abs-z1' target='_blank' rel='noopener'>§4b Abs. 1</a>"}
    I -->|"Ja, gleichzeitig und mind. 2<br/>Monate je Elternteil"| J["Partnerschaftsbonus: je Elternteil bis<br/>zu 4 zusätzliche<br/>ElterngeldPlus-Monatsbeträge — <a href='{{ELI}}#art-z4b_abs-z1' target='_blank' rel='noopener'>§4b Abs.<br/>1</a>, <a href='{{ELI}}#art-z4b_abs-z2' target='_blank' rel='noopener'>Abs. 2</a>, <a href='{{ELI}}#art-z4b_abs-z3' target='_blank' rel='noopener'>Abs. 3</a>"]
    I -->|Nein| K["Kein Partnerschaftsbonus"]

    F --> L
    G --> L
    J --> L
    K --> L
    L["Gesamtanspruch je Elternteil:<br/>höchstens 12 (bzw. 14 mit<br/>Partnermonaten) Basiselterngeld-Monate<br/>zzgl. höchstens 4<br/>Partnerschaftsbonus-Monate — <a href='{{ELI}}#art-z4_abs-z4' target='_blank' rel='noopener'>§4 Abs. 4</a>"]

    style L fill:#d4edda,stroke:#2d8a4a
`;export{e as default};