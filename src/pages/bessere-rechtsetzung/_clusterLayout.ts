// Bubbles must claim positions in the same order Cluster's `sizes` prop lists them.
export const CLUSTER_LAYOUT_CONTEXT_NAME = Symbol("cluster-layout");

export type BubblePosition = { dist: number; angle: number };

export interface ClusterLayoutContext {
  readonly isFlexPositioned: boolean;
  /** Radius of the packed cluster, em. */
  readonly radius: number;
  /** Claims and returns the next unclaimed bubble's position, or `undefined` once exhausted. */
  next(): BubblePosition | undefined;
}
