var e=`---
summary: "Zeigt die Akteure des Rennwett- und Lotteriegesetzes: die Landesbehörden für Erlaubnis, Zuweisung und Glücksspielaufsicht, das zuständige Finanzamt sowie Totalisatorbetreiber, Buchmacher, Veranstalter und weitere Beteiligte, mit ihren Pflichten und dem Informationsaustausch zwischen Finanz- und Landesbehörden."
---
flowchart LR
    FA["<b>Zuständiges Finanzamt</b><br/>nimmt die Steueranmeldungen entgegen — <a href='{{ELI}}#art-z13_abs-z3' target='_blank' rel='noopener'>§13 III</a><br/>örtliche Zuständigkeit nach Sitz des Steuerschuldners — <a href='{{ELI}}/art-z15' target='_blank' rel='noopener'>§15</a><br/>unangekündigte Nachschau, ggf. Außenprüfung — <a href='{{ELI}}/art-z58' target='_blank' rel='noopener'>§58</a>"]

    subgraph Laender["Landesbehörden"]
        LB["<b>Nach Landesrecht zuständige Behörde</b><br/>erteilt Erlaubnis für Totalisatoren — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a><br/>erteilt Erlaubnis für Buchmacher — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a><br/>setzt die Anteile der Rennvereine fest — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.3</a>"]
        GSA["<b>Glücksspielaufsichtsbehörde</b><br/>teilt steuerlich relevante Kenntnisse mit — <a href='{{ELI}}/art-z62' target='_blank' rel='noopener'>§62</a>"]
    end

    subgraph Steuerschuldner["Steuerschuldner"]
        RV["<b>Rennverein (Totalisatorbetreiber)</b><br/>schuldet die Totalisatorsteuer — <a href='{{ELI}}#art-z11_abs-z1' target='_blank' rel='noopener'>§11 I</a><br/>erhält Zuweisung aus dem Steueraufkommen (höchstens Nettokosten) — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I</a><br/>verwendet sie für Leistungsprüfungen für Pferde — <a href='{{ELI}}#art-z7_abs-z1' target='_blank' rel='noopener'>§7 I S.2</a>"]
        BM["<b>Buchmacher</b><br/>Erlaubnis für Örtlichkeit und Personen — <a href='{{ELI}}#art-z2_abs-z2' target='_blank' rel='noopener'>§2 II</a><br/>schuldet die Buchmachersteuer — <a href='{{ELI}}#art-z11_abs-z2' target='_blank' rel='noopener'>§11 II</a><br/>teilt Steuerbeträge für inländische Rennen monatlich mit — <a href='{{ELI}}#art-z7_abs-z3' target='_blank' rel='noopener'>§7 III S.2</a>"]
        VA["<b>Veranstalter</b> von Sportwetten, Lotterien,<br/>virtuellem Automatenspiel und Online-Poker<br/>schuldet die jeweilige Steuer — <a href='{{ELI}}/art-z19' target='_blank' rel='noopener'>§19</a>, §30, §39, §49<br/>führt Aufzeichnungen — <a href='{{ELI}}/art-z23' target='_blank' rel='noopener'>§23</a>, §33, §43, §53"]
    end

    subgraph Weitere["Weitere Beteiligte"]
        StB["<b>Steuerlicher Beauftragter</b><br/>erfüllt die Anmeldepflichten als eigene — <a href='{{ELI}}#art-z22_abs-z3' target='_blank' rel='noopener'>§22 III</a><br/>schuldet die Steuer als Gesamtschuldner — <a href='{{ELI}}#art-z22_abs-z4' target='_blank' rel='noopener'>§22 IV</a>"]
        DR["<b>Beteiligte Dritte</b><br/>informieren den Steuerschuldner unverzüglich — <a href='{{ELI}}/art-z56' target='_blank' rel='noopener'>§56</a><br/>ohne inländische Erlaubnis Gesamtschuldner der Lotteriesteuer — <a href='{{ELI}}#art-z30_abs-z2' target='_blank' rel='noopener'>§30 II</a>"]
    end

    Steuerschuldner -->|"Steueranmeldung — <a href='{{ELI}}#art-z13_abs-z3' target='_blank' rel='noopener'>§13 III</a>, §21 II, §32 II, §41 II, §51 II"| FA
    FA -->|"Nachschau — <a href='{{ELI}}#art-z58_abs-z1' target='_blank' rel='noopener'>§58 I</a>"| Steuerschuldner
    LB -->|"Erlaubnis, Zuweisung — <a href='{{ELI}}#art-z1_abs-z1' target='_blank' rel='noopener'>§1 I</a>, §7 I"| RV
    LB -->|"Erlaubnis — <a href='{{ELI}}#art-z2_abs-z1' target='_blank' rel='noopener'>§2 I</a>"| BM
    LB & GSA <-->|"Informationsaustausch — <a href='{{ELI}}/art-z61' target='_blank' rel='noopener'>§61</a>, §62"| FA
    VA -->|"benennt, übermittelt Aufzeichnungen — <a href='{{ELI}}#art-z22_abs-z1' target='_blank' rel='noopener'>§22 I</a>, §23 I"| StB
    StB -->|"Steueranmeldung — <a href='{{ELI}}#art-z22_abs-z3' target='_blank' rel='noopener'>§22 III</a>"| FA
    DR -->|"Information — <a href='{{ELI}}/art-z56' target='_blank' rel='noopener'>§56</a>"| Steuerschuldner

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class FA zentral
    class LB,GSA behoerde
    class RV,BM,VA,StB,DR privat
`;export{e as default};