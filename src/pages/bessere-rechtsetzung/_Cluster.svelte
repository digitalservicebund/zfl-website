<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { Snippet } from "svelte";
  import { packEnclose, packSiblings } from "d3-hierarchy";
  import { forceCollide, forceSimulation, forceX, forceY } from "d3-force";
  import { tv } from "tailwind-variants";
  import { twMerge } from "tailwind-merge";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";
  import { BUBBLE_COLOR_CONTEXT_NAME } from "./_bubbleColor";

  type PackCircle = { el: HTMLElement; trueRadius: number; r: number };
  type PositionedCircle = PackCircle & { x: number; y: number };
  type EnclosingCircle = { x: number; y: number; r: number };

  // Deterministic PRNG (mulberry32) used to scatter trial starting
  // positions in `packEvenly` below — avoids `Math.random()` so identical
  // bubble sizes always produce the identical layout, even when `layout()`
  // re-runs (e.g. via the ResizeObserver further down).
  function mulberry32(seed: number) {
    return () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const PACK_TRIALS = 24;
  const PACK_TICKS = 150;

  // Runs many independently-seeded force-directed relaxations (mutual
  // collision plus a gentle pull toward the centroid) from scattered
  // starting points and keeps the tightest result. Good general-purpose
  // packing, particularly once there are enough circles that some of them
  // belong in the interior rather than in a single outer ring.
  function forcePack(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    const scatterRadius = Math.max(
      60,
      Math.sqrt(baseCircles.reduce((sum, c) => sum + c.r * c.r, 0)) * 1.2,
    );

    let best:
      | { circles: PositionedCircle[]; enclosing: EnclosingCircle }
      | undefined;

    for (let trial = 0; trial < PACK_TRIALS; trial++) {
      const random = mulberry32(trial * 7919 + 1);
      const circles: PositionedCircle[] = baseCircles.map((c) => {
        const angle = random() * Math.PI * 2;
        const dist = random() * scatterRadius;
        return { ...c, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
      });

      forceSimulation(circles)
        .alphaDecay(1 - Math.pow(0.001, 1 / PACK_TICKS))
        .force("x", forceX(0).strength(0.05))
        .force("y", forceY(0).strength(0.05))
        .force(
          "collide",
          forceCollide((d: PositionedCircle) => d.r)
            .strength(1)
            .iterations(3),
        )
        .stop()
        .tick(PACK_TICKS);

      const enclosing = packEnclose(circles);
      if (!best || enclosing.r < best.enclosing.r) {
        best = { circles, enclosing };
      }
    }

    return best!;
  }

  // The angle (at the shared centre) between two neighbouring circles in a
  // "necklace" arrangement — both tangent to each other and to an
  // enclosing circle of radius `R`. Returns null if that's geometrically
  // impossible at this `R` (e.g. a circle bigger than `R` itself).
  function necklaceAngle(R: number, rA: number, rB: number): number | null {
    const dA = R - rA;
    const dB = R - rB;
    if (dA <= 0 || dB <= 0) return null;
    const cosTheta =
      (dA * dA + dB * dB - (rA + rB) * (rA + rB)) / (2 * dA * dB);
    if (cosTheta > 1 || cosTheta < -1) return null;
    return Math.acos(cosTheta);
  }

  function necklaceTotalAngle(R: number, radii: number[]): number | null {
    let sum = 0;
    for (let i = 0; i < radii.length; i++) {
      const angle = necklaceAngle(R, radii[i], radii[(i + 1) % radii.length]);
      if (angle === null) return null;
      sum += angle;
    }
    return sum;
  }

  // For a given cyclic ordering of radii, finds (via binary search) the
  // smallest enclosing radius at which every circle is simultaneously
  // tangent to both its neighbours and the enclosing circle — i.e. a
  // perfectly even rosette with no circle left stranded off the boundary.
  // `necklaceTotalAngle` decreases monotonically as `R` grows, so there's
  // exactly one `R` where the ring of tangency angles closes at 2π.
  function solveNecklaceRadius(radii: number[]): number {
    let lo = Math.max(...radii) + 1e-6;
    let hi = lo * 50;
    for (let i = 0; i < 60; i++) {
      const sum = necklaceTotalAngle(hi, radii);
      if (sum !== null && sum < 2 * Math.PI) break;
      hi *= 1.5;
    }
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const sum = necklaceTotalAngle(mid, radii);
      if (sum === null || sum > 2 * Math.PI) lo = mid;
      else hi = mid;
    }
    return hi;
  }

  function necklaceLayout(order: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    const R = solveNecklaceRadius(order.map((c) => c.r));
    let angle = 0;
    const circles = order.map((c, i) => {
      const dist = R - c.r;
      const positioned = {
        ...c,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      };
      const next = order[(i + 1) % order.length];
      angle += necklaceAngle(R, c.r, next.r)!;
      return positioned;
    });
    return { circles, enclosing: { x: 0, y: 0, r: R } };
  }

  // Caps how many cyclic orderings `necklacePack` explores, so layout time
  // stays bounded even if a cluster ever grows well beyond the ~8 bubbles
  // seen today ((n-1)! orderings, fixing one circle to skip rotations).
  const NECKLACE_PERMUTATION_BUDGET = 5000;

  function* permutationsFixedFirst<T>(items: T[]): Generator<T[]> {
    const [first, ...rest] = items;
    yield* (function* permute(curr: T[], remaining: T[]): Generator<T[]> {
      if (remaining.length === 0) {
        yield [first, ...curr];
        return;
      }
      for (let i = 0; i < remaining.length; i++) {
        yield* permute(
          [...curr, remaining[i]],
          [...remaining.slice(0, i), ...remaining.slice(i + 1)],
        );
      }
    })([], rest);
  }

  // Tries many cyclic orderings of the circles around a single ring and
  // keeps whichever produces the smallest enclosing circle.
  function necklacePack(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    let best:
      | { circles: PositionedCircle[]; enclosing: EnclosingCircle }
      | undefined;

    let count = 0;
    for (const order of permutationsFixedFirst(baseCircles)) {
      if (count++ >= NECKLACE_PERMUTATION_BUDGET) break;
      const candidate = necklaceLayout(order);
      if (!best || candidate.enclosing.r < best.enclosing.r) {
        best = candidate;
      }
    }

    return best!;
  }

  // Packs circles into their smallest enclosing circle. `packSiblings`
  // (d3-hierarchy's greedy front-chain algorithm) reliably produces the
  // same elongated shape regardless of insertion order — one circle ends
  // up stranded near the centre with a lot of unused space around it once
  // enclosed. Instead, two different strategies are tried — a "necklace"
  // ring (perfectly even, but wastes interior space once there are enough
  // circles that some belong inside the ring) and a force-directed
  // relaxation (better once circles no longer all fit neatly around a
  // single ring) — and whichever yields the tighter enclosing circle wins.
  function packEvenly(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    if (baseCircles.length <= 2) {
      const circles = baseCircles.map((c) => ({ ...c, x: 0, y: 0 }));
      packSiblings(circles);
      return { circles, enclosing: packEnclose(circles) };
    }

    const candidates = [forcePack(baseCircles), necklacePack(baseCircles)];
    return candidates.reduce((best, candidate) =>
      candidate.enclosing.r < best.enclosing.r ? candidate : best,
    );
  }

  let {
    title,
    orientation = "vertical",
    anchorName,
    color,
    className = "",
    offset,
    fitContent = false,
    children,
    sidebar,
    highlightGroup,
  }: {
    title?: string;
    orientation?: "vertical" | "horizontal";
    /**
     * CSS anchor name (e.g. "--cluster-first") assigned to this cluster's
     * title dot, so it can be targeted from outside via `anchor()`.
     */
    anchorName?: string;
    /**
     * Fill color shared by this cluster's bubbles, exposed to children via
     * the `--bubble-color` CSS custom property.
     */
    color?: string;
    className?: string;
    offset?: number;
    /**
     * When true, the content wrapper shrinks to fit its bubbles instead of
     * taking the default fixed vertical width (`w-1000`)
     */
    fitContent?: boolean;
    children?: Snippet;
    /**
     * Sidebar content shown in the global sidebar.
     * Accepts either a single `Snippet` or an array of `Snippet`s (multi-page).
     */
    sidebar?: Snippet | Snippet[];
    /**
     * Id of another Cluster/Bubble/Arrow to mirror. When set, this Cluster
     * shares that entry's active state.
     */
    highlightGroup?: string;
  } = $props();

  const sidebarContext = getContext<FlowSidebarContext | undefined>(
    FLOW_SIDEBAR_CONTEXT_NAME,
  );

  // Exposes this cluster's color to descendant `_Bubble.svelte` instances as
  // a plain value (not just the `--bubble-color` CSS custom property), so a
  // bubble without its own `color` prop can still pass the inherited color
  // along to the sidebar. Uses a getter so it stays live if `color` changes.
  setContext(BUBBLE_COLOR_CONTEXT_NAME, {
    get color() {
      return color;
    },
  });

  // Normalizes `sidebar` to an array of pages
  const sidebarPages = $derived(
    sidebar === undefined
      ? undefined
      : Array.isArray(sidebar)
        ? sidebar
        : [sidebar],
  );

  // Registers this cluster's sidebar content as soon as it mounts
  $effect(() => {
    if (!sidebarPages || sidebarPages.length === 0 || !title) return;

    sidebarContext?.register({
      id: title,
      title,
      children: sidebarPages,
      color,
    });
    return () => sidebarContext?.unregister(title);
  });

  const highlightId = $derived(highlightGroup ?? title);

  const isActive = $derived(
    !!highlightId && sidebarContext?.activeId === highlightId,
  );

  let rootEl: HTMLDivElement | undefined = $state();
  let titleEl: HTMLHeadingElement | undefined = $state();

  // IntersectionObserver: Activates this cluster as soon as it crosses the
  // viewport's midline while scrolling. Suppressed while `navigateStep`'s
  // `scrollIntoView` is auto-scrolling (`sidebarContext.isJumping`)
  $effect(() => {
    if (!highlightId || !rootEl) return;

    const rootMargin =
      orientation === "horizontal"
        ? "0px -50% 0px -50%"
        : isSmallScreen
          ? "-15% 0px -85% 0px"
          : "-50% 0px -50% 0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sidebarContext?.isJumping) {
          sidebarContext?.setActive(highlightId);
        }
      },
      { rootMargin },
    );

    observer.observe(rootEl);
    return () => observer.disconnect();
  });

  const contentWrapper = tv({
    base: "relative flex flex-col items-center justify-center",
    variants: {
      orientation: {
        vertical: "w-(--cluster-inner-width) overflow-x-clip",
        horizontal: "h-screen",
      },
      fitContent: {
        true: "h-fit w-fit",
      },
    },
  });

  const titleWrapper = tv({
    base: "z-20 flex gap-16",
    variants: {
      orientation: {
        vertical:
          "top-0 left-16 flex-row items-center self-start max-md:my-(--halo-thickness) max-md:ml-16 md:absolute md:left-[4vw]",
        horizontal: "absolute top-24 left-0 flex-row items-center",
      },
    },
  });

  // Tracks Tailwind's `max-sm` breakpoint so padding can shrink on mobile.
  let isSmallScreen = $state(false);
  $effect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    isSmallScreen = mql.matches;
    const onChange = (e: MediaQueryListEvent) => (isSmallScreen = e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  });

  const BUBBLE_PADDING = $derived(isSmallScreen ? 8 : 16); // px, gap enforced between packed bubbles
  const EDGE_PADDING = $derived(isSmallScreen ? 8 : 16); // px, gap between bubbles and the dashed border

  let containerEl: HTMLDivElement | undefined = $state();
  let diameter = $state(0);
  let ready = $state(false);
  let isSingleBubble = $state(false);

  // Packs the bubble elements rendered via `children` into the smallest
  // enclosing circle (using d3-hierarchy's circle-packing algorithms).
  function layout() {
    if (!containerEl) return;

    const items = Array.from(containerEl.children) as HTMLElement[];
    if (items.length === 0) return;

    isSingleBubble = items.length === 1;
    const edgePadding = isSingleBubble ? 0 : EDGE_PADDING;

    const baseCircles = items.map((el) => ({
      el,
      trueRadius: el.offsetWidth / 2,
      r: el.offsetWidth / 2 + BUBBLE_PADDING / 2,
    }));

    const { circles, enclosing } = packEvenly(baseCircles);

    const finalRadius = enclosing.r + edgePadding;
    const originX = enclosing.x - finalRadius;
    const originY = enclosing.y - finalRadius;

    for (const circle of circles) {
      circle.el.style.position = "absolute";
      circle.el.style.left = `${circle.x - originX - circle.trueRadius}px`;
      circle.el.style.top = `${circle.y - originY - circle.trueRadius}px`;
    }

    diameter = finalRadius * 2;
    ready = true;
  }

  $effect(() => {
    layout();

    // Bubble sizes are defined in `em` (see `_Bubble.svelte`'s `sizeMap`),
    // so their rendered pixel size can change independently of any prop
    // here. `layout()` only reads pixel sizes once, so without this
    // observer the pack/diameter would go stale after such a resize.
    if (!containerEl) return;
    const items = Array.from(containerEl.children) as HTMLElement[];
    if (items.length === 0) return;

    const resizeObserver = new ResizeObserver(() => layout());
    for (const item of items) resizeObserver.observe(item);
    return () => resizeObserver.disconnect();
  });

  // A small, random horizontal jitter per cluster instance (fixed for the
  // lifetime of the component) for a more organic, hand-drawn feel.
  const OFFSET_RANGE = $derived(isSmallScreen ? 64 : 128); // px, max offset in either direction
  const clusterOffset = $derived(
    offset ?? Math.round((Math.random() * 2 - 1) * OFFSET_RANGE),
  );

  const activate = () => {
    sidebarContext?.setActive(title!);
    titleEl?.scrollIntoView({ behavior: "smooth" });
  };
</script>

<div
  bind:this={rootEl}
  class={twMerge(
    "cluster-root [--halo-thickness:24px] md:[--halo-thickness:40px] [--cluster-spacing:var(--halo-thickness)] md:[--cluster-spacing:calc(-1*var(--halo-thickness))]",
    className,
  )}
  data-orientation={orientation}
  style={color ? `--bubble-color: ${color}` : undefined}
>
  <div class={contentWrapper({ orientation, fitContent })}>
    {#if title}
      <button
        type="button"
        tabindex="-1"
        class={titleWrapper({ orientation })}
        onclick={activate}
      >
        <div
          class={`size-28 border-2 border-white rounded-full transition-colors duration-300 outline-2 ${isActive ? "bg-(--bubble-color) outline-black" : "bg-black outline-transparent"}`}
          aria-hidden="true"
          style={anchorName ? `anchor-name: ${anchorName};` : undefined}
        ></div>
        <h2
          id={title}
          bind:this={titleEl}
          class="kern-heading-small scroll-mt-40 my-0! bg-black text-white px-4"
        >
          {title}
        </h2>
      </button>
    {/if}

    <div
      class={`relative flex items-center justify-center ${isActive ? "z-10" : ""}`}
      style={`width: calc(${diameter}px + 2 * var(--halo-thickness)); height: calc(${diameter}px + 2 * var(--halo-thickness)); margin-${orientation === "vertical" ? "left" : "top"}: ${offset ?? clusterOffset}px; --halo-color: color-mix(in srgb, ${color} 20%, white)`}
    >
      <!-- Isolated so the halo/dashed-circle negative z-indices only stack
         against each other, never against sibling (overlapping) clusters. -->
      <div class="isolate absolute inset-0">
        <!-- Soft gray halo ring -->
        <div
          class={`pointer-events-none absolute inset-0 -z-20 rounded-full ${isActive && false ? "bg-(--halo-color)" : "bg-[#F7F7F7]"}`}
        ></div>
        {#if !isSingleBubble}
          <!-- Dashed cluster circle -->
          <div
            class="pointer-events-none absolute -z-10 rounded-full border border-dashed border-black bg-white"
            style={`width: ${diameter}px; height: ${diameter}px; top: var(--halo-thickness); left: var(--halo-thickness);`}
          ></div>
        {/if}
      </div>

      <div
        class={`relative rounded-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        style={`width: ${diameter}px; height: ${diameter}px;`}
        bind:this={containerEl}
      >
        {@render children?.()}
      </div>
    </div>
  </div>
</div>

<style>
  /* Overlap the soft halo rings of two adjacent clusters (pulling them
     --halo-thickness closer)  */
  :global(
    .cluster-root[data-orientation="vertical"]
      + .cluster-root[data-orientation="vertical"]
  ) {
    margin-top: var(--cluster-spacing);
  }

  :global(
    .cluster-root[data-orientation="horizontal"]
      + .cluster-root[data-orientation="horizontal"]
  ) {
    margin-left: var(--cluster-spacing);
  }
</style>
