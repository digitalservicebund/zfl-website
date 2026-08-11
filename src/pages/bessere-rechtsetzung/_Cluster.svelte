<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    BUBBLE_SIZE_EM,
    RESPONSIVE_BUBBLE_FONT_CLASS,
    type BubbleSize,
  } from "./_bubbleSize";
  import {
    CLUSTER_LAYOUT_CONTEXT_NAME,
    type ClusterLayoutContext,
  } from "./_clusterLayout";

  // em, not px: keeps the packing math in the same unit as `BUBBLE_SIZE_EM`.
  type PackCircle = { trueRadius: number; r: number };
  // Polar (from the cluster centre), since that's what the tangency math
  // produces and what each bubble needs for its own `offset-path`.
  type PositionedCircle = PackCircle & { dist: number; angle: number };

  // Angle at the shared centre between two neighbouring circles at distances
  // dA/dB, tangent to each other. Null if that's geometrically impossible.
  function ringAngle(
    dA: number,
    dB: number,
    rA: number,
    rB: number,
  ): number | null {
    if (dA <= 0 || dB <= 0) return null;
    const cosTheta =
      (dA * dA + dB * dB - (rA + rB) * (rA + rB)) / (2 * dA * dB);
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
  // no ring math - see `isFlexPositioned`). Small clusters fit a single
  // necklace ring; larger ones do better with a hub circle.
  function packEvenly(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    radius: number;
  } {
    if (baseCircles.length <= 5) return necklacePack(baseCircles);

    return wheelPack(baseCircles);
  }

  let {
    color,
    className = "",
    offset,
    children,
    sizes = [],
    ariaLabel,
  }: {
    color?: string;
    className?: string;
    offset?: number;
    children?: Snippet;
    /** Each bubble's size - lets packing be computed from props alone at build time. */
    sizes?: BubbleSize[];
    /** Accessible label for the group of (aria-hidden) child bubbles. */
    ariaLabel?: string;
  } = $props();

  // Tailwind's `max-sm` breakpoint, used only for the jitter range below.
  let isSmallScreen = $state(false);
  $effect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    isSmallScreen = mql.matches;
    const onChange = (e: MediaQueryListEvent) => (isSmallScreen = e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  });

  const contentWrapperClass = $derived(
    `relative flex flex-col items-center justify-center w-full overflow-x-clip`,
  );

  // em, gap between packed bubbles / the dashed border - flat so it scales
  // with bubble size (same unit as `BUBBLE_SIZE_EM`) rather than needing its
  // own breakpoints.
  const BUBBLE_PADDING = 1;
  const EDGE_PADDING = 1;

  const isSingleBubble = $derived(sizes.length === 1);
  const isFlexPositioned = $derived(sizes.length <= 2);

  const baseCircles: PackCircle[] = $derived(
    sizes.map((size) => {
      const trueRadius = BUBBLE_SIZE_EM[size] / 2;
      return { trueRadius, r: trueRadius + BUBBLE_PADDING / 2 };
    }),
  );

  // Packs bubbles by size alone into the smallest enclosing circle - no DOM
  // measurement, so this runs identically during SSR/SSG and in the browser.
  const packed = $derived.by(() => {
    if (sizes.length === 0) return null;

    const edgePadding = isSingleBubble ? 0 : EDGE_PADDING;

    if (isFlexPositioned) {
      // Only the enclosing space needs computing here: a lone bubble's own
      // radius, or (for two, tangent through the centre) the sum of both.
      const enclosingRadius = baseCircles.reduce((sum, c) => sum + c.r, 0);
      return {
        diameter: (enclosingRadius + edgePadding) * 2,
        circles: null,
        finalRadius: enclosingRadius,
      };
    }

    const { circles, radius } = packEvenly(baseCircles);
    const finalRadius = radius + edgePadding;
    return { diameter: finalRadius * 2, circles, finalRadius };
  });

  const diameter = $derived(packed?.diameter ?? 0);

  // Hands each bubble its own position, in claim order (see `_clusterLayout.ts`).
  let claimedCount = 0;
  const layoutContext: ClusterLayoutContext = {
    get isFlexPositioned() {
      return isFlexPositioned;
    },
    get radius() {
      return packed?.finalRadius ?? 0;
    },
    next() {
      const circles = packed?.circles;
      if (!circles) return undefined;
      return circles[claimedCount++];
    },
  };
  setContext(CLUSTER_LAYOUT_CONTEXT_NAME, layoutContext);

  // Small random per-instance horizontal jitter for a hand-drawn feel.
  const OFFSET_RANGE = $derived(isSmallScreen ? 64 : 128); // px, max offset in either direction
  const clusterOffset = $derived(
    offset ?? Math.round((Math.random() * 2 - 1) * OFFSET_RANGE),
  );
</script>

<div
  class={`flow-block [--halo-thickness:24px] md:[--halo-thickness:40px] [--cluster-spacing:var(--halo-thickness)] md:[--cluster-spacing:calc(-1*var(--halo-thickness))] ${className}`}
  style={color ? `--bubble-color: ${color}` : undefined}
  role="presentation"
>
  <div class={contentWrapperClass} role="presentation">
    <div
      role="presentation"
      class={`relative flex items-center justify-center ${RESPONSIVE_BUBBLE_FONT_CLASS}`}
      style={`width: calc(${diameter}em + 2 * var(--halo-thickness)); height: calc(${diameter}em + 2 * var(--halo-thickness)); margin-left: ${offset ?? clusterOffset}px; --halo-color: color-mix(in srgb, ${color} 20%, white)`}
    >
      <!-- Isolated so halo/dashed-circle z-indices don't stack against sibling clusters. -->
      <div class="isolate absolute inset-0" aria-hidden="true">
        <div
          class="pointer-events-none absolute inset-0 -z-20 rounded-full bg-[#F7F7F7]"
        ></div>
        {#if !isSingleBubble}
          <div
            class="pointer-events-none absolute -z-10 rounded-full border border-dashed border-black bg-white"
            style={`width: ${diameter}em; height: ${diameter}em; top: var(--halo-thickness); left: var(--halo-thickness);`}
          ></div>
        {/if}
      </div>

      <div
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        class={`relative rounded-full ${isFlexPositioned ? "flex items-center justify-center" : ""}`}
        style={`width: ${diameter}em; height: ${diameter}em; ${isFlexPositioned ? `gap: ${BUBBLE_PADDING}em;` : ""}`}
      >
        {@render children?.()}
      </div>
    </div>
  </div>
</div>

<style>
  /* Overlap the soft halo rings of two adjacent clusters/sections */
  :global(.flow-block + .flow-block) {
    margin-top: var(--cluster-spacing);
  }
</style>
