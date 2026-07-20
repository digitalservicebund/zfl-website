<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { packEnclose, packSiblings } from "d3-hierarchy";
  import { tv } from "tailwind-variants";
  import { twMerge } from "tailwind-merge";
  import {
    BUBBLE_SIDEBAR_CONTEXT_NAME,
    type BubbleSidebarContext,
  } from "./_bubbleSidebar";

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
     * taking the default fixed vertical width (`w-1000`). Use this when the
     * cluster sits alongside other elements in a row (e.g. between two
     * Bubbles) so it doesn't force them apart.
     */
    fitContent?: boolean;
    children?: Snippet;
    /**
     * Sidebar content shown in the global sidebar when the cluster's title is
     * clicked. When provided (and `title` is set), the title becomes a
     * clickable button that toggles this content in the shared sidebar, the
     * same way `_Bubble.svelte` does.
     */
    sidebar?: Snippet;
  } = $props();

  // Every bubble/cluster shares a single, global sidebar (mounted once via
  // `_BubbleSidebar.svelte`) instead of rendering its own popup, so clicking
  // the title toggles that sidebar's content rather than a local popup.
  const sidebarContext = getContext<BubbleSidebarContext | undefined>(
    BUBBLE_SIDEBAR_CONTEXT_NAME,
  );

  // Registers this cluster's sidebar content as soon as it mounts
  // (independent of clicks), so it can also be opened straight from a
  // shared `?step=` link or via the browser back/forward buttons.
  $effect(() => {
    if (!sidebar || !title) return;

    sidebarContext?.register({
      id: title,
      title,
      children: sidebar,
      kind: "cluster",
    });
    return () => sidebarContext?.unregister(title);
  });

  const expanded = $derived(!!title && sidebarContext?.activeId === title);

  let rootEl: HTMLDivElement | undefined = $state();

  // Scrolls the whole cluster into view whenever it becomes the active step -
  // most notably when the page is opened directly via a shared `?step=`
  // link, where it might otherwise be rendered off-screen.
  $effect(() => {
    if (!expanded || !rootEl) return;

    rootEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function toggleSidebar() {
    if (!sidebar || !title) return;
    sidebarContext?.toggle({
      id: title,
      title,
      children: sidebar,
      kind: "cluster",
    });
  }

  const contentWrapper = tv({
    base: "relative flex flex-col items-center justify-center",
    variants: {
      orientation: {
        vertical: "mx-auto w-950",
        horizontal: "my-auto h-800",
      },
      fitContent: {
        true: "h-fit w-fit",
      },
    },
  });

  const titleWrapper = tv({
    base: "absolute flex gap-16",
    variants: {
      orientation: {
        vertical: "top-0 left-0 flex-row items-center",
        horizontal: "top-24 left-0 flex-row items-center",
      },
    },
  });

  const HALO_THICKNESS = 48; // px, thickness of the soft gray ring
  const BUBBLE_PADDING = 8; // px, gap enforced between packed bubbles
  const EDGE_PADDING = 8; // px, gap between bubbles and the dashed border

  let containerEl: HTMLDivElement | undefined = $state();
  let diameter = $state(0);
  let ready = $state(false);
  let isSingleBubble = $state(false);

  // Packs the bubble elements rendered via `children` into the smallest
  // enclosing circle (using d3-hierarchy's circle-packing algorithms),
  // giving a natural, non-overlapping distribution instead of a grid.
  function layout() {
    if (!containerEl) return;

    const items = Array.from(containerEl.children) as HTMLElement[];
    if (items.length === 0) return;

    isSingleBubble = items.length === 1;
    const edgePadding = isSingleBubble ? 0 : EDGE_PADDING;

    const circles = items.map((el) => ({
      el,
      trueRadius: el.offsetWidth / 2,
      r: el.offsetWidth / 2 + BUBBLE_PADDING / 2,
      x: 0,
      y: 0,
    }));

    packSiblings(circles);
    const enclosing = packEnclose(circles);

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
  });

  const outerSize = $derived(diameter + HALO_THICKNESS * 2);

  // A small, random horizontal jitter per cluster instance (fixed for the
  // lifetime of the component) for a more organic, hand-drawn feel.
  const OFFSET_RANGE = 128; // px, max offset in either direction
  const clusterOffset = $derived(
    offset ?? Math.round((Math.random() * 2 - 1) * OFFSET_RANGE),
  );
</script>

<div
  bind:this={rootEl}
  class={twMerge("cluster-root", className)}
  data-orientation={orientation}
  style={color ? `--bubble-color: ${color}` : undefined}
>
  <div class={contentWrapper({ orientation, fitContent })}>
    {#if title}
      <div class={titleWrapper({ orientation })}>
        <div
          class="size-24 rounded-full bg-black"
          style={anchorName ? `anchor-name: ${anchorName};` : undefined}
          aria-hidden="true"
        ></div>
        <h2 id={title} class="scroll-mt-40 my-0">
          {#if sidebar}
            <button
              type="button"
              class="kern-heading-small bg-black text-white px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic-blue-base"
              aria-expanded={expanded}
              onclick={toggleSidebar}
            >
              {title}
            </button>
          {:else}
            <span class="kern-heading-small bg-black text-white px-4">
              {title}
            </span>
          {/if}
        </h2>
      </div>
    {/if}

    <div
      class="relative flex items-center justify-center"
      style={`width: ${outerSize}px; height: ${outerSize}px; margin-${orientation === "vertical" ? "left" : "top"}: ${offset ?? clusterOffset}px;`}
    >
      <!-- Isolated so the halo/dashed-circle negative z-indices only stack
         against each other, never against sibling (overlapping) clusters. -->
      <div class="isolate absolute inset-0">
        <!-- Soft gray halo ring, matching the original SVG -->
        <div
          class="pointer-events-none absolute inset-0 -z-20 rounded-full bg-[#F7F7F7]"
        ></div>
        {#if !isSingleBubble}
          <!-- Dashed cluster circle -->
          <div
            class="pointer-events-none absolute -z-10 rounded-full border border-dashed border-black bg-white"
            style={`width: ${diameter}px; height: ${diameter}px; top: ${HALO_THICKNESS}px; left: ${HALO_THICKNESS}px;`}
          ></div>
        {/if}
      </div>

      <div
        class={`relative transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
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
     HALO_THICKNESS closer) without affecting spacing to non-Cluster
     siblings like Arrow. Scoped sibling selector: Svelte appends the same
     component hash class to both instances, so this only ever matches
     Cluster-next-to-Cluster, never Cluster-next-to-Arrow. */
  :global(
    .cluster-root[data-orientation="vertical"]
      + .cluster-root[data-orientation="vertical"]
  ) {
    margin-top: -48px;
  }

  :global(
    .cluster-root[data-orientation="horizontal"]
      + .cluster-root[data-orientation="horizontal"]
  ) {
    margin-left: -48px;
  }
</style>
