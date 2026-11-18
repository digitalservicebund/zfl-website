import { BUBBLE_SIZE_EM, type BubbleSize } from "./_bubbleSize";

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

// em, not px: keeps the packing math in the same unit as `BUBBLE_SIZE_EM`.
type PackCircle = { trueRadius: number; r: number };
// Polar (from the cluster centre), since that's what the tangency math
// produces and what each bubble needs for its own `offset-path`.
export type PositionedCircle = PackCircle & { dist: number; angle: number };

// Angle at the shared centre between two neighbouring circles at distances
// dA/dB, tangent to each other. Null if that's geometrically impossible.
function ringAngle(
  dA: number,
  dB: number,
  rA: number,
  rB: number,
): number | null {
  if (dA <= 0 || dB <= 0) return null;
  const cosTheta = (dA * dA + dB * dB - (rA + rB) * (rA + rB)) / (2 * dA * dB);
  if (cosTheta > 1 || cosTheta < -1) return null;
  return Math.acos(cosTheta);
}

// Sum of `ringAngle` around a full cyclic ordering.
function ringTotalAngle(distances: number[], radii: number[]): number | null {
  let sum = 0;
  for (let i = 0; i < radii.length; i++) {
    const next = (i + 1) % radii.length;
    const angle = ringAngle(
      distances[i],
      distances[next],
      radii[i],
      radii[next],
    );
    if (angle === null) return null;
    sum += angle;
  }
  return sum;
}

// Binary-searches the smallest enclosing radius R at which every circle
// (sitting at R - r from the centre) is tangent to both neighbours and the
// boundary - an even "necklace". `ringTotalAngle` decreases monotonically
// as R grows, so exactly one R closes the ring at 2π.
function solveNecklaceRadius(radii: number[]): number {
  const distancesAt = (R: number) => radii.map((r) => R - r);
  let lo = Math.max(...radii) + 1e-6;
  let hi = lo * 50;
  for (let i = 0; i < 60; i++) {
    const sum = ringTotalAngle(distancesAt(hi), radii);
    if (sum !== null && sum < 2 * Math.PI) break;
    hi *= 1.5;
  }
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const sum = ringTotalAngle(distancesAt(mid), radii);
    if (sum === null || sum > 2 * Math.PI) lo = mid;
    else hi = mid;
  }
  return hi;
}

// Arranges circles tangent to their neighbours and a shared boundary.
// Exact regardless of size variance, but tightness depends on adjacency
// order (two large circles ending up neighbours pushes R out further) -
// this trusts the caller's order. Good for small clusters with no obvious
// "biggest" circle to pull into a hub (see `wheelPack` for that case).
function necklacePack(baseCircles: PackCircle[]): {
  circles: PositionedCircle[];
  radius: number;
} {
  const radii = baseCircles.map((c) => c.r);
  const R = solveNecklaceRadius(radii);
  const distances = radii.map((r) => R - r);
  let angle = 0;
  const circles = baseCircles.map((c, i) => {
    const positioned = { ...c, dist: distances[i], angle };
    const next = (i + 1) % baseCircles.length;
    angle += ringAngle(distances[i], distances[next], radii[i], radii[next])!;
    return positioned;
  });
  return { circles, radius: R };
}

// Centers `center` and rings the rest around it at a uniform distance,
// just far enough to clear the centre against the ring's largest member.
// Unlike `necklacePack`, this doesn't guard against large ring neighbours
// overlapping each other - callers must alternate ring sizes so two large
// ones are never adjacent (see `_Flow.svelte`'s `sizes` ordering).
function wheelLayout(
  center: PackCircle,
  ring: PackCircle[],
): { circles: PositionedCircle[]; radius: number } {
  const largestRing = Math.max(...ring.map((c) => c.r));
  const dist = center.r + largestRing;

  const step = (2 * Math.PI) / ring.length;
  const ringCircles = ring.map((c, i) => ({ ...c, dist, angle: i * step }));

  const centerCircle: PositionedCircle = { ...center, dist: 0, angle: 0 };
  return {
    circles: [centerCircle, ...ringCircles],
    radius: dist + largestRing,
  };
}

// Splits off the first (expected largest) circle as the hub, rings the rest.
function wheelPack(baseCircles: PackCircle[]): {
  circles: PositionedCircle[];
  radius: number;
} {
  const [center, ...ring] = baseCircles;
  return wheelLayout(center, ring);
}

// Packs 3+ circles into their smallest enclosing circle (1-2 circles need
// no ring math - see `packCluster`'s `isFlexPositioned` branch). Small
// clusters fit a single necklace ring; larger ones do better with a hub
// circle.
function packEvenly(baseCircles: PackCircle[]): {
  circles: PositionedCircle[];
  radius: number;
} {
  if (baseCircles.length <= 5) return necklacePack(baseCircles);

  return wheelPack(baseCircles);
}

export interface ClusterPacking {
  diameter: number;
  circles: PositionedCircle[] | null;
  finalRadius: number;
}

// Packs bubbles by size alone into the smallest enclosing circle - no DOM
// measurement, so this runs identically during SSR/SSG and in the browser.
export function packCluster(
  sizes: BubbleSize[],
  isSingleBubble: boolean,
  isFlexPositioned: boolean,
  bubblePadding: number,
  edgePadding: number,
): ClusterPacking | null {
  if (sizes.length === 0) return null;

  const baseCircles: PackCircle[] = sizes.map((size) => {
    const trueRadius = BUBBLE_SIZE_EM[size] / 2;
    return { trueRadius, r: trueRadius + bubblePadding / 2 };
  });

  const appliedEdgePadding = isSingleBubble ? 0 : edgePadding;

  if (isFlexPositioned) {
    // Only the enclosing space needs computing here: a lone bubble's own
    // radius, or (for two, tangent through the centre) the sum of both.
    const enclosingRadius = baseCircles.reduce((sum, c) => sum + c.r, 0);
    return {
      diameter: (enclosingRadius + appliedEdgePadding) * 2,
      circles: null,
      finalRadius: enclosingRadius,
    };
  }

  const { circles, radius } = packEvenly(baseCircles);
  const finalRadius = radius + appliedEdgePadding;
  return { diameter: finalRadius * 2, circles, finalRadius };
}
