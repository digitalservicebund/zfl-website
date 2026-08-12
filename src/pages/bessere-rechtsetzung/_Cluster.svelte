<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import { RESPONSIVE_BUBBLE_FONT_CLASS, type BubbleSize } from "./_bubbleSize";
  import {
    CLUSTER_LAYOUT_CONTEXT_NAME,
    packCluster,
    type ClusterLayoutContext,
  } from "./_clusterLayout";

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

  const packed = $derived(
    packCluster(
      sizes,
      isSingleBubble,
      isFlexPositioned,
      BUBBLE_PADDING,
      EDGE_PADDING,
    ),
  );

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
  class={`flow-block [--halo-thickness:24px] md:[--halo-thickness:40px] [--cluster-spacing:var(--halo-thickness)] md:[--cluster-spacing:calc(var(--space-factor)*var(--halo-thickness))] ${className}`}
  style={color ? `--bubble-color: ${color}` : undefined}
  role="presentation"
>
  <div class={contentWrapperClass} role="presentation">
    <div
      role="presentation"
      class={`relative flex items-center justify-center ${RESPONSIVE_BUBBLE_FONT_CLASS}`}
      style={`width: calc(${diameter}em + 2 * var(--halo-thickness)); height: calc(${diameter}em + 2 * var(--halo-thickness)); margin-left: ${offset ?? clusterOffset}px; --halo-color: color-mix(in srgb, ${color} 20%, white)`}
    >
      <!-- halo/dashed-circle -->
      <button
        class="absolute inset-0 rounded-full"
        onclick={(e) =>
          e.currentTarget?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })}
        tabIndex={-1}
        title="Cluster zentrieren"
        aria-hidden="true"
      >
        <div
          class="pointer-events-none absolute inset-0 rounded-full bg-[#F7F7F7]"
        ></div>
        {#if !isSingleBubble}
          <div
            class="z-10 pointer-events-none absolute rounded-full outline outline-dashed outline-black"
            style={`width: ${diameter}em; height: ${diameter}em; top: var(--halo-thickness); left: var(--halo-thickness);`}
          ></div>
        {/if}
      </button>

      <div
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        class={`relative z-20 ${!isSingleBubble ? "bg-white" : ""} rounded-full ${isFlexPositioned ? "flex items-center justify-center" : ""}`}
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
