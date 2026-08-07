export type BubbleSize = "sm" | "md" | "lg";

// em (relative to a bubble's own font-size). `_Cluster.svelte` packs bubbles
// using these same numbers as radii, so its whole layout — packing angles,
// ring radii, container diameter — ends up expressed in that same unit
// instead of measured pixels. That's what lets the layout be computed once,
// statically (no DOM measurement, no ResizeObserver), while still scaling
// correctly wherever the responsive font-size below changes: the packing
// maths is scale-invariant (see `ringAngle` in `_Cluster.svelte`), so a
// uniform em-to-px change at any breakpoint scales every distance in a
// cluster by the same factor without altering its shape.
export const BUBBLE_SIZE_EM: Record<BubbleSize, number> = {
  sm: 9,
  md: 11,
  lg: 12,
};

// Shared between `_Bubble.svelte` (so its own em-based width/height resolve
// against this font-size) and `_Cluster.svelte` (so its independently
// em-based diameter/positioning resolve against the *same* font-size) —
// applied on both rather than relied on via inheritance, since a bubble can
// also be used standalone, outside any cluster.
export const RESPONSIVE_BUBBLE_FONT_CLASS = "text-xs md:text-sm xl:text-base";
