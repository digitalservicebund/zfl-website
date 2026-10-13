var e=`---
summary: "How a law text is visualized live: the user pastes the text and picks a diagram type, the backend has Langdock suggest subareas and draw the chosen one, and the user then refines the diagram via chat."
---
swimlane-beta TD
    subgraph U["User"]
        preset(["Picks what to visualize: decision logic,<br/>process in practice or actors"])
        paste["Pastes the law text and clicks<br/>„Analysieren“"]
        pick["Picks one of the suggested subareas<br/>(„Teilbereich“)"]
        ask["Types a change request in the chat,<br/>e.g. „add a step between C and D“"]
        review(["Reads the reply, then refines further,<br/>switches versions or exports"])
    end

    subgraph FE["Frontend"]
        postOptions["POST /vis-options with the text"]
        listOptions["Lists the subareas, those matching the<br/>picked diagram type first"]
        postMermaid["POST /mermaid with session ID, name,<br/>diagram type and articles"]
        render["Renders the diagram as version v1<br/>with its summary"]
        postRefine["POST /refine with session ID, diagram<br/>type, current diagram and chat history"]
        valid{"Response contains a<br/>diagram that parses as<br/>valid Mermaid?"}
        addVersion["Adds it as a new version and<br/>highlights the changes"]
        showReply["Shows the reply in the chat"]
    end

    subgraph BE["Backend"]
        promptOptions["Sends the text with the analysis prompt"]
        session["Validates the JSON and opens a session<br/>with text and conversation (30 min TTL)"]
        promptMermaid["Appends the diagram prompt with the<br/>rules for the diagram type to the session"]
        extract["Extracts summary and Mermaid code,<br/>stores the conversation"]
        promptRefine["Law text and instructions as system<br/>prompt, current diagram in the last<br/>message"]
        apply["Applies the edits to the diagram (if<br/>they don't match, asks Langdock once<br/>more for the full diagram)"]
    end

    subgraph LD["Langdock"]
        suggest["Sonnet suggests up to 5 subareas with<br/>diagram type and articles (plus an<br/>optional actor overview) as JSON"]
        draw["Sonnet writes the summary and the<br/>Mermaid code"]
        refine["Haiku writes a reply and, for a change,<br/>a label and old/new edits (or the full<br/>diagram for larger rebuilds)"]
    end

    preset --> paste
    paste --> postOptions
    postOptions --> promptOptions
    promptOptions --> suggest
    suggest --> session
    session -->|"session ID and<br/>subareas"| listOptions
    listOptions --> pick
    pick --> postMermaid
    postMermaid --> promptMermaid
    promptMermaid --> draw
    draw --> extract
    extract --> render
    render --> ask
    ask --> postRefine
    postRefine --> promptRefine
    promptRefine --> refine
    refine --> apply
    apply -->|"reply, diagram<br/>and label"| valid
    valid -->|Yes| addVersion
    valid -->|"No: answer, follow-up<br/>question or error"| showReply
    addVersion --> showReply
    showReply --> review

    style review fill:#d4edda,stroke:#2d8a4a
    style render fill:#fff3cd,stroke:#c9a227
    style addVersion fill:#fff3cd,stroke:#c9a227
`;export{e as default};