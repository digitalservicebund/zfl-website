// Shared Svelte context key linking a `_Cluster.svelte` instance to its
// descendant `_Bubble.svelte` instances, so a bubble that doesn't set its
// own `color` prop (and instead relies on the `--bubble-color` CSS custom
// property for its fill) can still resolve that same color as a plain value
// - e.g. to pass it along to `_FlowSidebar.svelte` for its background tint.
export const BUBBLE_COLOR_CONTEXT_NAME = Symbol("bubble-color");

export interface BubbleColorContext {
  /** The enclosing cluster's current color, read live via a getter. */
  readonly color: string | undefined;
}
