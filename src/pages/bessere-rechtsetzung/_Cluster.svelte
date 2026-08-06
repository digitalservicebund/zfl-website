<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { Snippet } from "svelte";
  import { packEnclose, packSiblings } from "d3-hierarchy";
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

  // For a given cyclic ordering of radii, finds (via binary search) the
  // smallest enclosing radius `R` at which every circle — sitting at
  // distance `R - r` from the centre — is simultaneously tangent to both
  // its neighbours and the enclosing circle, i.e. a perfectly even rosette
  // with no circle left stranded off the boundary. `ringTotalAngle`
  // decreases monotonically as `R` grows, so there's exactly one `R` where
  // the ring of tangency angles closes at 2π.
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

  function necklaceLayout(order: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    const radii = order.map((c) => c.r);
    const R = solveNecklaceRadius(radii);
    const distances = radii.map((r) => R - r);
    let angle = 0;
    const circles = order.map((c, i) => {
      const dist = distances[i];
      const positioned = {
        ...c,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      };
      const next = (i + 1) % order.length;
      angle += ringAngle(distances[i], distances[next], radii[i], radii[next])!;
      return positioned;
    });
    return { circles, enclosing: { x: 0, y: 0, r: R } };
  }

  // Caps how many cyclic orderings `necklacePack` explores, so layout time
  // stays bounded even if a cluster ever grows well beyond the ~5 bubbles
  // it's used for today ((n-1)! orderings, fixing one circle to skip
  // rotations).
  const RING_PERMUTATION_BUDGET = 5000;

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
  // keeps whichever produces the smallest enclosing circle. Good for small
  // clusters, where all circles comfortably fit on one boundary.
  function necklacePack(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    let best:
      { circles: PositionedCircle[]; enclosing: EnclosingCircle } | undefined;

    let count = 0;
    for (const order of permutationsFixedFirst(baseCircles)) {
      if (count++ >= RING_PERMUTATION_BUDGET) break;
      const candidate = necklaceLayout(order);
      if (!best || candidate.enclosing.r < best.enclosing.r) {
        best = candidate;
      }
    }

    return best!;
  }

  // Places `center` at the centre and the rest evenly around it in a ring,
  // all at the same distance `d` — just far enough to clear the centre
  // against the ring's largest member (`center.r + largestRing`). This
  // does NOT also guard against two large ring neighbours overlapping each
  // other (the earlier `largestRing / sin(π/n)` term did, at the cost of
  // extra clearance for every smaller bubble). Instead it trusts the
  // caller's ordering: `_Flow.svelte` puts the largest bubble first (as
  // the hub) and alternates ring bubble sizes so two large ones are never
  // adjacent. Reordering a cluster's bubbles there without preserving that
  // alternation can make ring neighbours overlap.
  function wheelLayout(
    center: PackCircle,
    ring: PackCircle[],
  ): { circles: PositionedCircle[]; enclosing: EnclosingCircle } {
    const largestRing = Math.max(...ring.map((c) => c.r));
    const dist = center.r + largestRing;

    const step = (2 * Math.PI) / ring.length;
    const ringCircles = ring.map((c, i) => ({
      ...c,
      x: Math.cos(i * step) * dist,
      y: Math.sin(i * step) * dist,
    }));

    const centerCircle: PositionedCircle = { ...center, x: 0, y: 0 };
    return {
      circles: [centerCircle, ...ringCircles],
      enclosing: { x: 0, y: 0, r: dist + largestRing },
    };
  }

  // Splits off the first circle (by DOM order — expected to be the
  // largest) as the centre and arranges the rest around it in a ring, in
  // the order given. Good once a cluster has enough circles that some of
  // them belong in the interior rather than on a single outer ring.
  function wheelPack(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    const [center, ...ring] = baseCircles;
    return wheelLayout(center, ring);
  }

  // Packs circles into their smallest enclosing circle. `packSiblings`
  // (d3-hierarchy's greedy front-chain algorithm) reliably produces the
  // same elongated shape regardless of insertion order — one circle ends
  // up stranded near the centre with a lot of unused space around it once
  // enclosed, so it's only used for the trivial 1-2 circle case. Above
  // that, small clusters fit neatly on a single "necklace" ring; larger
  // ones do better with the biggest circle pinned in the centre and the
  // rest arranged in a ring around it.
  function packEvenly(baseCircles: PackCircle[]): {
    circles: PositionedCircle[];
    enclosing: EnclosingCircle;
  } {
    if (baseCircles.length <= 2) {
      const circles = baseCircles.map((c) => ({ ...c, x: 0, y: 0 }));
      packSiblings(circles);
      return { circles, enclosing: packEnclose(circles) };
    }

    if (baseCircles.length <= 5) return necklacePack(baseCircles);

    return wheelPack(baseCircles);
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
    const center = finalRadius; // px, container's own centre (it's finalRadius × 2 square)

    // Ring circles (necklace/wheel) are placed via `offset-path`: each gets
    // its own circular path — sized to its own distance from the cluster
    // centre — and `offset-distance` picks the point on it. That lets the
    // browser do the trig instead of computing left/top per circle here.
    // The one circle actually AT the centre (wheelLayout's hub, or a lone
    // bubble) has no ring to move along, so it's just positioned directly.
    for (const circle of circles) {
      const dx = circle.x - enclosing.x;
      const dy = circle.y - enclosing.y;
      const dist = Math.hypot(dx, dy);

      circle.el.style.position = "absolute";

      if (dist < 0.5) {
        circle.el.style.offsetPath = "none";
        circle.el.style.left = `${center - circle.trueRadius}px`;
        circle.el.style.top = `${center - circle.trueRadius}px`;
      } else {
        const angle = Math.atan2(dy, dx);
        const percent = ((((angle / (2 * Math.PI)) % 1) + 1) % 1) * 100;
        circle.el.style.left = "0px";
        circle.el.style.top = "0px";
        circle.el.style.offsetPath = `circle(${dist}px at ${center}px ${center}px)`;
        circle.el.style.offsetDistance = `${percent}%`;
        circle.el.style.offsetRotate = "0deg";
      }
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
