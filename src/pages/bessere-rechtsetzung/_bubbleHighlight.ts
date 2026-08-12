export const BUBBLE_HIGHLIGHT_CONTEXT_NAME = Symbol("bubble-highlight");

export interface BubbleHighlightContext {
  readonly highlighted: string[];
  /** Highlights `tag` exclusively, or clears it if already active. */
  toggleHighlighted(tag: string): void;
  setHighlighted(tag: string | null): void;
}
