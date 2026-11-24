var e=`---
summary: "The components of the visualization tool, what each is responsible for and how they call each other: the wizard in the browser, the FastAPI backend with its in-memory sessions, the Langdock API, and the prepared examples generated at build time."
---
flowchart TD
    User["<b>User</b><br/>picks a diagram type and pastes a law text<br/>or picks a prepared example<br/>refines the diagram via chat"]

    subgraph Frontend["Frontend (zfl-website)"]
        Wizard["<b>Wizard</b><br/>guides through text, subarea and result<br/>renders the diagram with Mermaid<br/>keeps versions and highlights changes<br/>exports SVG, Mermaid and Rulemapping XML"]
        Chat["<b>Chat</b><br/>sends the current diagram with each request<br/>adds refined diagrams as new versions"]
    end

    subgraph Backend["Backend (zfl-tool-backend)"]
        API["<b>FastAPI routes</b><br/>/vis-options suggests subareas<br/>/mermaid creates the diagram<br/>/refine applies the requested edits"]
        Sessions["<b>Session store</b><br/>in memory, 30 min TTL<br/>keeps the law text and the conversation"]
        Client["<b>Langdock client</b><br/>picks the model per task<br/>logs duration and token usage"]
    end

    subgraph Extern["External services"]
        Langdock["<b>Langdock API</b><br/>Anthropic-compatible completion API<br/>Sonnet for suggestions and diagrams<br/>Haiku for refinements"]
        RIS["<b>Rechtsinformationssystem (RIS)</b><br/>search API and consolidated law texts<br/>target of the norm links in the diagrams"]
    end

    subgraph Build["Build time"]
        Skill["<b>gesetz-visualisieren skill</b><br/>Claude Code skill, run by the team<br/>loads law texts and writes diagrams"]
        Presets["<b>Prepared examples</b><br/>content collection ki-visualisierungen<br/>.yaml metadata and .mmd diagrams"]
    end

    User -->|"pastes text, picks subarea"| Wizard
    User -->|"types change requests"| Chat
    Wizard -->|"loads examples"| Presets
    Wizard -->|"POST /vis-options, /mermaid"| API
    Chat -->|"POST /refine"| API
    API -->|"stores and reads"| Sessions
    API -->|"prompts"| Client
    Client -->|"completion requests"| Langdock
    Skill -->|"writes"| Presets
    Skill -->|"loads law texts"| RIS

    classDef zentral fill:#fff3cd,stroke:#c9a227,stroke-width:2px
    classDef behoerde fill:#e8f0fe,stroke:#3b6fd4
    classDef privat fill:#f5f5f5,stroke:#999
    classDef parlament fill:#ede7f6,stroke:#7e57c2
    classDef gremium fill:#e6f4ea,stroke:#2d8a4a
    class Wizard zentral
    class Chat,API,Sessions,Client behoerde
    class User privat
    class Skill,Presets parlament
    class Langdock,RIS gremium
`;export{e as default};