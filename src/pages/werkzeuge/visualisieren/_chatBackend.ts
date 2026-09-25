export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** Set on assistant messages whose reply failed; content holds the error text. */
  isError?: boolean;
};

/**
 * Produces the assistant's reply to a conversation. Yields the reply in
 * chunks so a streaming backend (SSE, fetch body stream) can render tokens as
 * they arrive; a non-streaming backend simply yields the whole reply once.
 *
 * Request context a real backend needs (session ID, current diagram, ...)
 * belongs in the factory creating it, not in this interface.
 */
export interface ChatBackend {
  reply(history: ChatMessage[], signal: AbortSignal): AsyncIterable<string>;
}

const FAKE_REPLY_DELAY_MS = 1000;
const FAKE_REPLY = "Der KI-Chat ist noch nicht implementiert.";

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

export function createFakeChatBackend(): ChatBackend {
  return {
    async *reply(_history, signal) {
      await sleep(FAKE_REPLY_DELAY_MS, signal);
      yield FAKE_REPLY;
    },
  };
}
