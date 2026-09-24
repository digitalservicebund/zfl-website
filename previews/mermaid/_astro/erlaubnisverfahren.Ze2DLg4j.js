var e=`---
summary: "Zeigt das Erlaubnisverfahren für den Betrieb eines Totalisators durch einen Rennverein und für die gewerbsmäßige Tätigkeit als Buchmacher, jeweils mit den Voraussetzungen der zuständigen Landesbehörde für die Erteilung."
---
flowchart TD
    START{"Wer möchte tätig werden?"}
    START -->|"Verein will Totalisator<br/>betreiben"| TOT["Antrag auf Erlaubnis bei der nach<br/>Landesrecht zuständigen Behörde — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>"]
    START -->|"Person will gewerbsmäßig<br/>Wetten abschließen/vermitteln<br/>(Buchmacher)"| BM["Antrag auf Erlaubnis bei der nach<br/>Landesrecht zuständigen Behörde — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a>"]

    TOT --> TOT_ORT{"Rennen im Inland oder im<br/>Ausland?"}

    TOT_ORT -->|Inland| TOT_SICHER1{"Bietet der Verein Sicherheit,<br/>dass die Einnahmen<br/>ausschließlich der<br/>Landespferdezucht dienen? — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1<br/>III</a>"}
    TOT_ORT -->|Ausland| TOT_SICHER2{"Bietet der Verein Sicherheit,<br/>dass die Einnahmen<br/>ausschließlich der<br/>Landespferdezucht dienen? — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1<br/>IV S.1</a>"}

    TOT_SICHER1 -->|Nein| TOT_ABLEHNUNG["Erlaubnis darf nicht erteilt werden — <a href='{{ELI}}#art-z1_abs-z3' target='_blank' rel='noopener'>§1<br/>III</a>"]
    TOT_SICHER2 -->|Nein| TOT_ABLEHNUNG

    TOT_SICHER1 -->|Ja| TOT_ERTEILT["Erlaubnis wird erteilt, auch in<br/>Kooperation mit anderen Rennvereinen<br/>oder ausländischen<br/>Totalisatorveranstaltern — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I S.2</a>"]
    TOT_SICHER2 -->|Ja| TOT_ERTEILT2["Erlaubnis wird erteilt;<br/>grenzüberschreitende Kooperation<br/>zulässig — <a href='{{ELI}}#art-z1_abs-z4' target='_blank' rel='noopener'>§1 IV S.2</a>"]

    TOT_ERTEILT --> TOT_AUFLAGE["Kann befristet, mit Widerrufsvorbehalt<br/>oder Auflage verbunden bzw. auf einzelne<br/>Veranstaltungen beschränkt werden — <a href='{{ELI}}#art-z1_abs-z2' target='_blank' rel='noopener'>§1<br/>II</a>"]
    TOT_ERTEILT2 --> TOT_AUFLAGE

    TOT_AUFLAGE --> TOT_ENDE["Totalisatorbetrieb erlaubt"]

    BM --> BM_UMFANG["Erlaubnis muss Örtlichkeit und<br/>eingesetzte Personen abdecken — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II<br/>S.1</a>"]
    BM_UMFANG --> BM_GEBIET{"Liegt die Örtlichkeit im<br/>Gebiet der erlaubenden<br/>Behörde? — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.2</a>"}

    BM_GEBIET -->|Nein| BM_ABLEHNUNG["Erlaubnis darf für diese Örtlichkeit<br/>nicht erteilt werden — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.2</a>"]
    BM_GEBIET -->|Ja| BM_AUFLAGE["Erlaubnis wird erteilt, ggf. befristet,<br/>mit Widerrufsvorbehalt oder Auflage<br/>verbunden — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II S.3</a>"]

    BM_AUFLAGE --> BM_ENDE["Buchmacher-Tätigkeit erlaubt"]

    style TOT_ENDE fill:#d4edda,stroke:#2d8a4a
    style BM_ENDE fill:#d4edda,stroke:#2d8a4a
    style TOT_ABLEHNUNG fill:#f8d7da,stroke:#c0392b
    style BM_ABLEHNUNG fill:#f8d7da,stroke:#c0392b
`;export{e as default};