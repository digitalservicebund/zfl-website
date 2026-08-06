// Shared Svelte context key linking a `_Cluster.svelte` instance to its
// descendant `_Bubble.svelte` instances, so each bubble can position
// *itself* (via inline `offset-path`/`left`/`top` styles on its own root
// element) from a layout `_Cluster.svelte` computed statically from props —
// without `_Cluster.svelte` needing DOM access or wrapper elements to reach
// into its opaque `children` snippet.
//
// Bubbles claim their slot in the same order `_Cluster.svelte`'s `sizes`
// prop lists them (see `_Cluster.svelte`'s `sizes` prop and `packEvenly`),
// by calling `next()` once each, synchronously, during their own
// initialization — which happens in document order during both SSR and
// client rendering, matching the order `sizes` was given in.
export const CLUSTER_LAYOUT_CONTEXT_NAME = Symbol("cluster-layout");

export type BubblePosition = { dist: number; angle: number };

export interface ClusterLayoutContext {
  /** Whether the cluster is rendering 1-2 bubbles via flexbox rather than packing them - see `_Cluster.svelte`'s `isFlexPositioned`. */
  readonly isFlexPositioned: boolean;
  /** The packed cluster's own radius, em - the centre a hub bubble's `left`/`top` is measured from and a ring bubble's `offset-path` circle is centred on. */
  readonly radius: number;
  /** Claims and returns the next unclaimed bubble's position (em/radians), or `undefined` once every position has been claimed. */
  next(): BubblePosition | undefined;
}
