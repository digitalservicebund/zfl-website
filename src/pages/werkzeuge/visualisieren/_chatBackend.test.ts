import mermaid from "mermaid";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { refineMermaid } from "../_shared/api.ts";
import { createRefineChatBackend, type ChatMessage } from "./_chatBackend.ts";

vi.mock("mermaid", () => ({ default: { parse: vi.fn() } }));
vi.mock("../_shared/api.ts", () => ({ refineMermaid: vi.fn() }));

const OLD_DIAGRAM = "flowchart TD\n  A --> B";
const NEW_DIAGRAM = "flowchart TD\n  A --> X --> B";

function createWizard() {
  return {
    visOptionsSessionId: "session-1",
    selectedVisOption: { name: "Test", visType: "flowchart", articles: [] },
    mermaidSource: OLD_DIAGRAM,
    highlightChanges: false,
  } as Parameters<typeof createRefineChatBackend>[0];
}

async function collect(iterable: AsyncIterable<string>): Promise<string> {
  let text = "";
  for await (const chunk of iterable) text += chunk;
  return text;
}

const history: ChatMessage[] = [
  { id: "greeting", role: "assistant", content: "Haben Sie Änderungswünsche?" },
  { id: "1", role: "user", content: "eins" },
  { id: "2", role: "assistant", content: "Fehler", isError: true },
  { id: "3", role: "user", content: "Füge X ein" },
];

describe("createRefineChatBackend", () => {
  beforeEach(() => {
    vi.mocked(mermaid.parse).mockReset();
    vi.mocked(refineMermaid).mockReset();
  });

  it("sends the current diagram and the chat turns without greeting and errors", async () => {
    vi.mocked(refineMermaid).mockResolvedValue({ reply: "ok", mermaid: null });
    const signal = new AbortController().signal;

    await collect(
      createRefineChatBackend(createWizard()).reply(history, signal),
    );

    expect(refineMermaid).toHaveBeenCalledWith(
      {
        sessionId: "session-1",
        visType: "flowchart",
        mermaid: OLD_DIAGRAM,
        history: [
          { role: "user", content: "eins" },
          { role: "user", content: "Füge X ein" },
        ],
      },
      signal,
    );
  });

  it("replaces the diagram and yields the reply", async () => {
    vi.mocked(refineMermaid).mockResolvedValue({
      reply: "X eingefügt.",
      mermaid: NEW_DIAGRAM,
    });
    const wizard = createWizard();

    const reply = await collect(
      createRefineChatBackend(wizard).reply(
        history,
        new AbortController().signal,
      ),
    );

    expect(reply).toBe("X eingefügt.");
    expect(wizard.mermaidSource).toBe(NEW_DIAGRAM);
    expect(wizard.highlightChanges).toBe(true);
  });

  it("keeps the diagram when the backend only answers", async () => {
    vi.mocked(refineMermaid).mockResolvedValue({
      reply: "Welcher Knoten?",
      mermaid: null,
    });
    const wizard = createWizard();

    const reply = await collect(
      createRefineChatBackend(wizard).reply(
        history,
        new AbortController().signal,
      ),
    );

    expect(reply).toBe("Welcher Knoten?");
    expect(wizard.mermaidSource).toBe(OLD_DIAGRAM);
  });

  it("keeps the diagram when the refined one doesn't parse", async () => {
    vi.mocked(refineMermaid).mockResolvedValue({
      reply: "X eingefügt.",
      mermaid: "flowchart TD\n  A -->",
    });
    vi.mocked(mermaid.parse).mockRejectedValue(new Error("Parse error"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const wizard = createWizard();

    const reply = await collect(
      createRefineChatBackend(wizard).reply(
        history,
        new AbortController().signal,
      ),
    );

    expect(reply).toMatch(/nicht übernommen/);
    expect(wizard.mermaidSource).toBe(OLD_DIAGRAM);
    expect(wizard.highlightChanges).toBe(false);
  });

  it("doesn't touch the diagram once aborted", async () => {
    const abortController = new AbortController();
    vi.mocked(refineMermaid).mockImplementation(async () => {
      abortController.abort();
      return { reply: "X eingefügt.", mermaid: NEW_DIAGRAM };
    });
    const wizard = createWizard();

    const reply = await collect(
      createRefineChatBackend(wizard).reply(history, abortController.signal),
    );

    expect(reply).toBe("");
    expect(wizard.mermaidSource).toBe(OLD_DIAGRAM);
  });
});
