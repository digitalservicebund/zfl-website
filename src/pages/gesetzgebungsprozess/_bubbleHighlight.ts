// Shared Svelte context key linking `_RegelungsprozessFlow.svelte` (which
// owns the `highlighted` state) to every `_Bubble.svelte` instance beneath
// it, so bubbles can react to the current highlight list without it being
// threaded through as a prop on each individual `<Bubble>` usage.
export const BUBBLE_HIGHLIGHT_CONTEXT_NAME = Symbol("bubble-highlight");

export interface BubbleHighlightContext {
  readonly highlighted: string[];
}
