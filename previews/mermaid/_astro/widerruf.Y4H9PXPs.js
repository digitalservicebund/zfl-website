var e=`flowchart TD
    A["Genehmigung zum Tragen der<br/>Uniform liegt vor"] --> B{"Ist zu befürchten, dass durch das<br/>Auftreten der früheren Soldatin/des<br/>früheren Soldaten in Uniform das<br/>Ansehen der Bundeswehr in der<br/>Öffentlichkeit beeinträchtigt oder die<br/>Trageberechtigung missbraucht<br/>wird?<br/>— <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7 S. 2</a>"}
    B -->|Ja| C["Genehmigung ist zu widerrufen<br/>(gebundene Entscheidung)<br/>— <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7 S. 2</a>"]
    B -->|Nein| D["Genehmigung kann jederzeit<br/>widerrufen werden (Ermessen)<br/>— <a href='{{ELI}}/art-z7' target='_blank' rel='noopener'>§7 S. 1</a>"]

    style C fill:#f8d7da,stroke:#c0392b
    style D fill:#fff3cd,stroke:#c9a227
`;export{e as default};