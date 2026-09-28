import mermaid from "mermaid";
import { refineMermaid } from "../_shared/api.ts";
import type { WizardState } from "./_wizardState.svelte.ts";

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

const INVALID_DIAGRAM_REPLY =
  "Die Änderung konnte nicht übernommen werden, da sie kein gültiges Diagramm ergab. Bitte formulieren Sie den Wunsch anders.";

/**
 * Refines the wizard's current diagram via the backend and replaces
 * `mermaidSource` with the result. The diagram is sent with every request
 * rather than kept in the backend session, so this also works for preset
 * examples, which have no session.
 */
export function createRefineChatBackend(
  wizard: Pick<
    WizardState,
    "visOptionsSessionId" | "selectedVisOption" | "mermaidSource"
  >,
): ChatBackend {
  return {
    async *reply(history, signal) {
      const visType = wizard.selectedVisOption?.visType;
      if (!visType || !wizard.mermaidSource) {
        throw new Error("No diagram to refine");
      }

      // Leading assistant messages (the greeting) and failed replies are
      // UI-only and would confuse the model
      const firstUserIndex = history.findIndex((m) => m.role === "user");
      const turns = history
        .slice(firstUserIndex)
        .filter((m) => !m.isError)
        .map(({ role, content }) => ({ role, content }));

      const result = await refineMermaid(
        {
          sessionId: wizard.visOptionsSessionId,
          visType,
          mermaid: wizard.mermaidSource,
          history: turns,
        },
        signal,
      );
      // The user may have switched diagrams meanwhile
      if (signal.aborted) return;

      if (result.mermaid) {
        try {
          await mermaid.parse(result.mermaid);
        } catch (error) {
          console.error(error);
          yield INVALID_DIAGRAM_REPLY;
          return;
        }
        wizard.mermaidSource = result.mermaid;
      }
      yield result.reply;
    },
  };
}
