<script lang="ts">
  import type { Snippet } from "svelte";
  import { packEnclose, packSiblings } from "d3-hierarchy";
  import { tv } from "tailwind-variants";

  let {
    title,
    orientation = "vertical",
    anchorName,
    children,
  }: {
    title?: string;
    orientation?: "vertical" | "horizontal";
    /**
     * CSS anchor name (e.g. "--cluster-first") assigned to this cluster's
     * title dot, so it can be targeted from outside via `anchor()`.
     */
    anchorName?: string;
    children?: Snippet;
  } = $props();

  const titleWrapper = tv({
    base: "absolute flex gap-24",
    variants: {
      orientation: {
        horizontal: "top-0 left-0 flex-col items-start",
        vertical: "top-0 left-0 flex-row items-center",
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
  const OFFSET_RANGE = 64; // px, max offset in either direction
  const offset = Math.round((Math.random() * 2 - 1) * OFFSET_RANGE);
</script>

<div class="relative flex flex-col items-center justify-center h-full w-full">
  {#if title}
    <div class={titleWrapper({ orientation })}>
      <div
        class="size-24 rounded-full bg-black"
        style={anchorName ? `anchor-name: ${anchorName};` : undefined}
        aria-hidden="true"
      ></div>
      <h2
        id={title}
        class="scroll-mt-40 kern-heading-small bg-black text-white px-4"
      >
        {title}
      </h2>
    </div>
  {/if}

  <div
    class="relative flex items-center justify-center transition-[width,height] duration-300"
    style={`width: ${outerSize}px; height: ${outerSize}px; margin-${orientation === "vertical" ? "left" : "top"}: ${offset}px;`}
  >
    <!-- Isolated so the halo/dashed-circle negative z-indices only stack
         against each other, never against sibling clusters or bubble
         popups (which must be able to rise above later, overlapping
         clusters). -->
    <div class="isolate absolute inset-0">
      <!-- Soft gray halo ring, matching the original SVG -->
      <div
        class="pointer-events-none absolute inset-0 -z-20 rounded-full bg-[#F7F7F7]"
      ></div>
      {#if !isSingleBubble}
        <!-- Dashed cluster circle -->
        <div
          class="pointer-events-none absolute -z-10 rounded-full border border-dashed border-black bg-white transition-[width,height] duration-300"
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
