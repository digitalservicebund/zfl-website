var e=`---
summary: "Berechnet den Solidaritätszuschlag aus der zuvor ermittelten Bemessungsgrundlage mit dem Steuersatz von 3,75 v.H. oder 7,5 v.H., je nachdem welcher Nummer des §3 Abs. 1 SolZG die Grundlage zugeordnet ist."
---
flowchart TD
    A["Bemessungsgrundlage nach<br/>§3 wurde ermittelt<br/>— <a href='{{ELI}}/art-z3' target='_blank' rel='noopener'>§3</a>"] --> B{"Welcher Nummer des<br/>§3 Abs. 1 ist die<br/>Bemessungsgrundlage<br/>zuzuordnen?<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4</a>"}
    B -->|"Nr. 1, 2 oder 5<br/>(ESt-/KSt-Veranlagung,<br/>Lohnsteuer-Jahresausgleich)"| C["Solidaritätszuschlag =<br/>3,75 v.H. der<br/>Bemessungsgrundlage<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 Nr. 1</a>"]
    B -->|"Nr. 3, 4, 6 oder 7<br/>(Vorauszahlungen, Lohnsteuer-<br/>abzug, Kapitalertragsteuer,<br/>§50a-Steuerabzug)"| D["Solidaritätszuschlag =<br/>7,5 v.H. der<br/>Bemessungsgrundlage<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 Nr. 2</a>"]
    C --> E["Bruchteile eines Pfennigs<br/>bleiben außer Ansatz<br/>— <a href='{{ELI}}#art-z4_abs-z' target='_blank' rel='noopener'>§4 S. 2</a>"]
    D --> E
    E --> Z["Festzusetzender<br/>Solidaritätszuschlag"]

    style Z fill:#d4edda,stroke:#2d8a4a
`;export{e as default};