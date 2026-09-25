import type { ChatBackend, ChatMessage } from "./_chatBackend.ts";

/**
 * - idle: ready for input
 * - thinking: waiting for the first chunk of the reply
 * - replying: chunks are arriving
 */
export type ChatStatus = "idle" | "thinking" | "replying";

const ERROR_MESSAGE = "Die Antwort konnte nicht geladen werden.";

export class ChatState {
  messages = $state<ChatMessage[]>([]);
  status = $state<ChatStatus>("idle");

  #backend: ChatBackend;
  #initialMessages: ChatMessage[];
  #abortController: AbortController | undefined;

  /** initialMessages: shown when the chat starts and restored by reset(), e.g. a greeting */
  constructor(backend: ChatBackend, initialMessages: ChatMessage[] = []) {
    this.#backend = backend;
    this.#initialMessages = initialMessages;
    this.messages = initialMessages.map((message) => ({ ...message }));
  }

  get isBusy(): boolean {
    return this.status !== "idle";
  }

  async send(text: string) {
    const content = text.trim();
    if (!content || this.isBusy) return;

    this.messages.push({ id: crypto.randomUUID(), role: "user", content });
    // Plain copies rather than $state.snapshot, which returns the original
    // array in Svelte's server build (used by the unit tests)
    const history = this.messages.map((message) => ({ ...message }));

    const abortController = new AbortController();
    this.#abortController = abortController;
    this.status = "thinking";

    // Only created once the first chunk arrives, so the thinking indicator
    // stands in for it until then
    let reply: ChatMessage | undefined;

    try {
      for await (const chunk of this.#backend.reply(
        history,
        abortController.signal,
      )) {
        // Guards against backends that don't honor the abort signal
        if (abortController.signal.aborted) break;
        if (!reply) {
          this.messages.push({
            id: crypto.randomUUID(),
            role: "assistant",
            content: "",
          });
          // Re-read to get the reactive proxy rather than the plain object
          reply = this.messages.at(-1)!;
          this.status = "replying";
        }
        reply.content += chunk;
      }
    } catch (error) {
      if (!abortController.signal.aborted) {
        console.error(error);
        this.messages.push({
          id: crypto.randomUUID(),
          role: "assistant",
          content: ERROR_MESSAGE,
          isError: true,
        });
      }
    } finally {
      // stop() or reset() may already have cleaned up
      if (this.#abortController === abortController) {
        this.#abortController = undefined;
        this.status = "idle";
      }
    }
  }

  /** Stops the pending reply, keeping whatever has arrived so far. */
  stop() {
    this.#abortController?.abort();
    this.#abortController = undefined;
    this.status = "idle";
  }

  reset() {
    this.stop();
    this.messages = this.#initialMessages.map((message) => ({ ...message }));
  }
}
