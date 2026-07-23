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
  // `_FlowSidebar.svelte`) instead of rendering its own popup, so clicking
  // the title toggles that sidebar's content rather than a local popup.
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
      color,
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

  function toggleSidebar(id: string) {
    sidebarContext?.toggle(id);
  }

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
    base: "absolute z-20 flex gap-16",
    variants: {
      orientation: {
        vertical: "top-0 left-[10vw] flex-row items-center",
        horizontal: "top-24 left-0 flex-row items-center",
      },
    },
  });

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

    // Bubble sizes are defined in `em` (see `_Bubble.svelte`'s `sizeMap`),
    // so their rendered pixel size can change independently of any prop
    // here - e.g. `max-md:text-xs` shrinking the bubble's font-size (and
    // thus its `em`-based width/height) once the viewport crosses the `md`
    // breakpoint. `layout()` only reads pixel sizes once, so without this
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
  const OFFSET_RANGE = 128; // px, max offset in either direction
  const clusterOffset = $derived(
    offset ?? Math.round((Math.random() * 2 - 1) * OFFSET_RANGE),
  );
</script>

<div
  bind:this={rootEl}
  class={twMerge(
    "cluster-root [--halo-thickness:32px] md:[--halo-thickness:48px]",
    className,
  )}
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
              onclick={() => toggleSidebar(title)}
              tabIndex={-1}
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
      class={`relative flex items-center justify-center ${expanded ? "z-10" : ""}`}
      style={`width: calc(${diameter}px + 2 * var(--halo-thickness)); height: calc(${diameter}px + 2 * var(--halo-thickness)); margin-${orientation === "vertical" ? "left" : "top"}: ${offset ?? clusterOffset}px; --halo-color: color-mix(in srgb, ${color} 20%, white)`}
    >
      <!-- Isolated so the halo/dashed-circle negative z-indices only stack
         against each other, never against sibling (overlapping) clusters. -->
      <div class="isolate absolute inset-0">
        <!-- Soft gray halo ring, matching the original SVG. Rendered as a
           <button> (not nested inside the title's <button>, so this is
           valid HTML) so clicking anywhere on the ring also toggles the
           sidebar. It's `aria-hidden` and untabbable since the title button
           already exposes the same action to keyboard/screen-reader users;
           this is purely a larger pointer/touch target. -->
        {#if sidebar && title}
          <button
            type="button"
            aria-hidden="true"
            class={`absolute inset-0 -z-20 rounded-full  cursor-pointer ${expanded ? "bg-(--halo-color)" : "bg-[#F7F7F7]"}`}
            onclick={() => toggleSidebar(title)}
          ></button>
        {:else}
          <div
            class="pointer-events-none absolute inset-0 -z-20 rounded-full bg-[#F7F7F7]"
          ></div>
        {/if}
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
     HALO_THICKNESS closer) without affecting spacing to non-Cluster
     siblings like Arrow. Scoped sibling selector: Svelte appends the same
     component hash class to both instances, so this only ever matches
     Cluster-next-to-Cluster, never Cluster-next-to-Arrow. */
  :global(
    .cluster-root[data-orientation="vertical"]
      + .cluster-root[data-orientation="vertical"]
  ) {
    margin-top: calc(-1 * var(--halo-thickness));
  }

  :global(
    .cluster-root[data-orientation="horizontal"]
      + .cluster-root[data-orientation="horizontal"]
  ) {
    margin-left: calc(-1 * var(--halo-thickness));
  }
</style>
