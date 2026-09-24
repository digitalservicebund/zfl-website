var e=`---
summary: "Zeigt, welche Behörde bei einem Betrieb mit Tätigkeit an wechselnden Orten welche Daten erhebt: die erteilende Behörde vor Erteilung der Erlaubnis, die kontrollierende Behörde bei einer Kontrolle."
---
flowchart TD
    A["Betrieb im Sinne von §11 Abs. 1 S.1 Nr.8<br/>Buchst. d TierSchG (Zurschaustellung von<br/>Tieren an wechselnden Orten) — <a href='{{ELI}}/art-z1' target='_blank' rel='noopener'>§1</a>"] --> B{"Antrag auf Erlaubnis nach §11 Abs. 1 S.1 Nr.8 Buchst. d TierSchG gestellt?"}
    B -->|Ja| C["Erteilende Behörde erhebt vor Erteilung:<br/>Personendaten des Antragstellers,<br/>Betrieb und Betriebsinhaber,<br/>Räume/Einrichtungen, Tierarten,<br/>verantwortliche Person — <a href='{{ELI}}#art-z3_abs-z1' target='_blank' rel='noopener'>§3 Abs. 1</a>"]
    B -->|Nein| Z1["Keine Erhebungspflicht nach dieser Verordnung"]
    D["Kontrolle eines Betriebes nach §16 Abs. 1 Nr.4 TierSchG"] --> E{"Liegen die erforderlichen<br/>Daten der erteilenden Behörde<br/>bereits vor und sind sie<br/>aktuell?"}
    E -->|Nein| F["Kontrollierende Behörde erhebt: Tierzahl<br/>je Art samt Kennzeichnung sowie die in<br/>§3 Abs. 1 genannten Daten — <a href='{{ELI}}#art-z3_abs-z2' target='_blank' rel='noopener'>§3 Abs. 2</a>"]
    E -->|Ja| Z2["Keine erneute Erhebung erforderlich"]
    style C fill:#d4edda,stroke:#2d8a4a
    style F fill:#d4edda,stroke:#2d8a4a
    style Z1 fill:#fff3cd,stroke:#c9a227
    style Z2 fill:#fff3cd,stroke:#c9a227
`;export{e as default};