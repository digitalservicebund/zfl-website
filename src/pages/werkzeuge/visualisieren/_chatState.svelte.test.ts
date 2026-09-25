import { describe, expect, it, vi } from "vitest";
import type { ChatBackend } from "./_chatBackend.ts";
import { ChatState } from "./_chatState.svelte.ts";

function backendYielding(...chunks: string[]): ChatBackend {
  return {
    async *reply() {
      for (const chunk of chunks) yield chunk;
    },
  };
}

describe("ChatState", () => {
  it("appends the user message and the streamed reply", async () => {
    const chat = new ChatState(backendYielding("Hallo ", "Welt"));

    await chat.send("  Frage  ");

    expect(chat.messages).toMatchObject([
      { role: "user", content: "Frage" },
      { role: "assistant", content: "Hallo Welt" },
    ]);
    expect(chat.status).toBe("idle");
  });

  it("passes the history including the new message to the backend", async () => {
    const reply = vi.fn(backendYielding("ok").reply);
    const chat = new ChatState({ reply });

    await chat.send("eins");
    await chat.send("zwei");

    expect(reply).toHaveBeenLastCalledWith(
      [
        expect.objectContaining({ role: "user", content: "eins" }),
        expect.objectContaining({ role: "assistant", content: "ok" }),
        expect.objectContaining({ role: "user", content: "zwei" }),
      ],
      expect.any(AbortSignal),
    );
  });

  it("ignores blank input", async () => {
    const chat = new ChatState(backendYielding("ok"));

    await chat.send("   ");

    expect(chat.messages).toEqual([]);
  });

  it("is thinking until the first chunk arrives", async () => {
    let release!: () => void;
    const chat = new ChatState({
      async *reply() {
        await new Promise<void>((resolve) => (release = resolve));
        yield "ok";
      },
    });

    const sending = chat.send("Frage");
    expect(chat.status).toBe("thinking");
    expect(chat.isBusy).toBe(true);

    release();
    await sending;
    expect(chat.status).toBe("idle");
  });

  it("adds an error message when the backend fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const chat = new ChatState({
      // eslint-disable-next-line require-yield
      async *reply() {
        throw new Error("kaputt");
      },
    });

    await chat.send("Frage");

    expect(chat.messages.at(-1)).toMatchObject({
      role: "assistant",
      isError: true,
    });
  });

  it("stops without an error message", async () => {
    const chat = new ChatState({
      async *reply(_history, signal) {
        await new Promise((_, reject) =>
          signal.addEventListener("abort", () => reject(signal.reason)),
        );
        yield "never";
      },
    });

    const sending = chat.send("Frage");
    chat.stop();
    await sending;

    expect(chat.messages).toHaveLength(1);
    expect(chat.status).toBe("idle");
  });

  it("starts with the initial messages and restores them on reset", async () => {
    const greeting = {
      id: "greeting",
      role: "assistant" as const,
      content: "Hallo",
    };
    const chat = new ChatState(backendYielding("ok"), [greeting]);
    expect(chat.messages).toEqual([greeting]);

    await chat.send("Frage");
    chat.reset();

    expect(chat.messages).toEqual([greeting]);
  });
});
