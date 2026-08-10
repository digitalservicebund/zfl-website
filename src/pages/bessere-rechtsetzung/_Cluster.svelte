<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FLOW_SECTION_CONTEXT_NAME,
    type FlowSectionContext,
  } from "./_flowSection";
  import {
    BUBBLE_SIZE_EM,
    RESPONSIVE_BUBBLE_FONT_CLASS,
    type BubbleSize,
  } from "./_bubbleSize";
  import {
    CLUSTER_LAYOUT_CONTEXT_NAME,
    type ClusterLayoutContext,
  } from "./_clusterLayout";

  // em (not px): so the whole packing computation below stays in the same
  // unit as `BUBBLE_SIZE_EM`, and scales for free with the responsive
  // font-size that unit is relative to (see `_bubbleSize.ts`).
  type PackCircle = { trueRadius: number; r: number };
  // `dist`/`angle` (polar, from the cluster centre) rather than `x`/`y`:
  // that's what every ring's tangency maths naturally produces, it's what
  // each bubble needs to build its own `offset-path`, and the centre is
  // always the origin here — so there's no Cartesian step in between that
  // would earn its keep.
  type PositionedCircle = PackCircle & { dist: number; angle: number };

  // The angle (at the shared centre) between two neighbouring circles, each
  // sitting at its own distance (`dA`/`dB`) from that centre, tangent to
  // each other. Returns null if that's geometrically impossible (e.g. the
  // circles would have to overlap to both be at these distances).
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

  // Sum of `ringAngle` around a full cyclic ordering — the total angle
  // needed for every circle to be tangent to both neighbours at these
  // per-circle distances from the centre.
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

  // Finds (via binary search) the smallest enclosing radius `R` at which
  // every circle — sitting at distance `R - r` from the centre — is
  // simultaneously tangent to both its neighbours and the enclosing
  // circle, i.e. a perfectly even rosette with no circle left stranded off
  // the boundary. `ringTotalAngle` decreases monotonically as `R` grows,
  // so there's exactly one `R` where the ring of tangency angles closes at
  // 2π.
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

  // Arranges circles, in the order given, tangent to both their neighbours
  // and a shared enclosing boundary — a perfectly even "necklace" rosette.
  // Every circle's distance from centre depends on its own radius
  // (`R - r`), so — unlike `wheelLayout`'s uniform ring distance — it
  // stays exact no matter how much sizes vary. The tradeoff is that
  // tightness does depend on adjacency order (two large circles ending up
  // neighbours pushes `R` out further than if they didn't); this trusts
  // the caller's order rather than searching for the best one. Good for
  // small clusters, where there's no obvious "biggest" circle to pull out
  // into a hub (see `wheelPack` for that case).
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

  // Places `center` at the centre and the rest evenly around it in a ring,
  // all at the same distance `d` — just far enough to clear the centre
  // against the ring's largest member (`center.r + largestRing`). This
  // does NOT also guard against two large ring neighbours overlapping each
  // other, unlike `necklacePack`'s exact tangency solve — it trusts the
  // caller's ordering instead: `_Flow.svelte` puts the largest bubble
  // first (as the hub) and alternates ring bubble sizes so two large ones
  // are never adjacent. Reordering a cluster's bubbles there without
  // preserving that alternation can make ring neighbours overlap.
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

  // Splits off the first circle (by order — expected to be the largest) as
  // the centre and arranges the rest around it in a ring, in the order
  // given. Good once a cluster has enough circles that some of them belong
  // in the interior rather than on a single outer ring.
  function wheelPack(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    radius: number;
  } {
    const [center, ...ring] = baseCircles;
    return wheelLayout(center, ring);
  }

  // Packs 3+ circles into their smallest enclosing circle (1-2 circles are
  // handled directly below — see `isFlexPositioned` — since they need no
  // ring math at all). Small clusters fit neatly on a single "necklace"
  // ring; larger ones do better with the biggest circle pinned in the
  // centre and the rest arranged in a ring around it.
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
    /**
     * Fill color shared by this cluster's bubbles, exposed to children via
     * the `--bubble-color` CSS custom property.
     */
    color?: string;
    className?: string;
    offset?: number;
    children?: Snippet;
    /**
     * Each bubble's size,  so the packing below can be computed from
     * props alone during Astro's static-site generation.
     */
    sizes?: BubbleSize[];
    /** Accessible label for the group of (aria-hidden) child-bubbles  */
    ariaLabel?: string;
  } = $props();

  // Reflects the enclosing `_Section.svelte`'s active state, if any - `undefined`
  // when this cluster isn't part of a Section (e.g. a standalone Cluster with
  // no title/highlight identity of its own).
  const sectionContext = getContext<FlowSectionContext | undefined>(
    FLOW_SECTION_CONTEXT_NAME,
  );
  const isActive = $derived(sectionContext?.isActive ?? false);

  // Tracks Tailwind's `max-sm` breakpoint, used only for the horizontal
  // jitter range below (unrelated to bubble packing, which is now static).
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

  // em, gap enforced between packed bubbles / between bubbles and the dashed
  // border. Flat (not breakpoint-dependent) on purpose: expressed in the same
  // font-relative unit as `BUBBLE_SIZE_EM`, so it scales in lockstep with
  // bubble sizes wherever the responsive font-size changes, rather than
  // needing its own breakpoint logic.
  const BUBBLE_PADDING = 1;
  const EDGE_PADDING = 1;

  const isSingleBubble = $derived(sizes.length === 1);
  // 1-2 bubbles need no per-circle positioning: the container becomes a
  // centred flexbox (see the template) and the browser lays them out.
  const isFlexPositioned = $derived(sizes.length <= 2);

  const baseCircles: PackCircle[] = $derived(
    sizes.map((size) => {
      const trueRadius = BUBBLE_SIZE_EM[size] / 2;
      return { trueRadius, r: trueRadius + BUBBLE_PADDING / 2 };
    }),
  );

  // Packs the bubbles (by size alone — see `sizes`) into the smallest
  // enclosing circle, entirely from props: no DOM measurement, so this runs
  // the same during SSR/SSG as in the browser.
  const packed = $derived.by(() => {
    if (sizes.length === 0) return null;

    const edgePadding = isSingleBubble ? 0 : EDGE_PADDING;

    if (isFlexPositioned) {
      // 1-2 bubbles need no packing at all — the browser lays them out via
      // flexbox (see the template) — so the only thing left to compute is
      // how much space that needs: a lone bubble's own radius, or (for
      // two, tangent along a line through the centre) the sum of both.
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

  // Hands each bubble its own position, in the order they claim one (see
  // `_clusterLayout.ts`) — the ring maths already produced `dist`/`angle`
  // per circle; each bubble turns that into its own `offset-path` instead of
  // `_Cluster.svelte` reaching into the DOM to set it.
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

  // A small, random horizontal jitter per cluster instance (fixed for the
  // lifetime of the component) for a more organic, hand-drawn feel.
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
      class={`relative flex items-center justify-center ${RESPONSIVE_BUBBLE_FONT_CLASS} ${isActive ? "z-10" : ""}`}
      style={`width: calc(${diameter}em + 2 * var(--halo-thickness)); height: calc(${diameter}em + 2 * var(--halo-thickness)); margin-left: ${offset ?? clusterOffset}px; --halo-color: color-mix(in srgb, ${color} 20%, white)`}
    >
      <!-- Isolated so the halo/dashed-circle negative z-indices only stack
         against each other, never against sibling (overlapping) clusters. -->
      <div class="isolate absolute inset-0" aria-hidden="true">
        <!-- Soft gray halo ring -->
        <div
          class="pointer-events-none absolute inset-0 -z-20 rounded-full bg-[#F7F7F7]"
        ></div>
        {#if !isSingleBubble}
          <!-- Dashed cluster circle -->
          <div
            class="pointer-events-none absolute -z-10 rounded-full border border-dashed border-black bg-white"
            style={`width: ${diameter}em; height: ${diameter}em; top: var(--halo-thickness); left: var(--halo-thickness);`}
          ></div>
        {/if}
      </div>

      <div
        role="img"
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
