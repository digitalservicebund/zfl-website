<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";
  import BubbleIcon from "./_BubbleIcon.svelte";
  import { iconMap, type TagName } from "./_icons.ts";
  import {
    BUBBLE_SIZE_EM,
    RESPONSIVE_BUBBLE_FONT_CLASS,
    type BubbleSize,
  } from "./_bubbleSize";
  import {
    CLUSTER_LAYOUT_CONTEXT_NAME,
    type ClusterLayoutContext,
  } from "./_clusterLayout";

  interface Props {
    /** Fill color of the bubble, defaults `--bubble-color` from Cluster. */
    color?: string;
    title?: string;
    optional?: boolean;
    size?: BubbleSize;
    className?: string;
    tags?: TagName[];
    /** Tooltip content shown when it's clicked open. */
    children?: Snippet;
  }

  let {
    color,
    title,
    optional,
    size = "md",
    className = "",
    tags,
    children,
  }: Props = $props();

  const icons = $derived(tags?.map((t) => iconMap[t]));

  // Claimed once, synchronously, at init — see `_clusterLayout.ts`. `undefined`
  // when this bubble isn't inside a `_Cluster.svelte` at all, or its cluster
  // is flex-positioning 1-2 bubbles and needs no per-bubble position.
  const clusterLayout = getContext<ClusterLayoutContext | undefined>(
    CLUSTER_LAYOUT_CONTEXT_NAME,
  );
  const position =
    clusterLayout && !clusterLayout.isFlexPositioned
      ? clusterLayout.next()
      : undefined;

  // Ring circles (necklace/wheel) are placed via `offset-path`: each gets its
  // own circular path — sized to its own distance from the cluster centre —
  // and `offset-distance` picks the point on it, straight from the
  // `dist`/`angle` `_Cluster.svelte`'s packing maths already produced. That
  // lets the browser do the trig instead of computing `left`/`top` here. The
  // one circle actually at the centre (`wheelLayout`'s hub) has no ring to
  // move along, so it's just positioned directly.
  const positionStyle = $derived.by(() => {
    if (!position || !clusterLayout) return "";
    const trueRadius = BUBBLE_SIZE_EM[size] / 2;
    const center = clusterLayout.radius;
    if (position.dist < 0.5) {
      return `position: absolute; left: ${center - trueRadius}em; top: ${center - trueRadius}em;`;
    }
    const percent = ((((position.angle / (2 * Math.PI)) % 1) + 1) % 1) * 100;
    return `position: absolute; left: 0; top: 0; offset-path: circle(${position.dist}em at ${center}em ${center}em); offset-distance: ${percent}%; offset-rotate: 0deg;`;
  });

  const highlightContext = getContext<BubbleHighlightContext | undefined>(
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
  );

  const dimmed = $derived(
    (highlightContext?.highlighted.length ?? 0) > 0 &&
      !(tags ?? []).some((tag) => highlightContext?.highlighted.includes(tag)),
  );

  // Whether this bubble's tooltip is currently shown - local to each
  // instance (rather than routed through the shared `_FlowSidebar.svelte`),
  // since the tooltip is anchored right above its own bubble instead of
  // being displayed in a global sidebar panel.
  let active = $state(false);

  const isInteractive = false; // $derived(!!children);

  // Unique per-instance CSS anchor name so the tooltip can be positioned
  // relative to this bubble's circle via CSS anchor positioning, even
  // though many Bubbles share this component on the same page.
  const uid = $props.id();
  const anchorName = `--bubble-anchor-${uid}`;
</script>

<div
  aria-hidden="true"
  class={`relative inline-flex flex-col items-center hover:z-30 has-focus-visible:z-30 ${RESPONSIVE_BUBBLE_FONT_CLASS} ${active ? "z-20" : ""} ${className}`}
  style={positionStyle}
>
  {#snippet bubble()}
    <div
      class={`group/circle flex items-center justify-center rounded-full transition-[transform,filter,box-shadow,opacity] duration-200 ease-out ${isInteractive ? "hover:scale-105 group-focus-visible:scale-105 group-focus-visible:outline-2 group-focus-visible:outline-cosmic-blue-base" : ""} ${active ? "scale-105 ring-4 ring-cosmic-blue-base ring-offset-2" : ""} ${dimmed ? "opacity-50" : ""}`}
      style={`background-color: ${color ?? "var(--bubble-color)"}; width: ${BUBBLE_SIZE_EM[size]}em; height: ${BUBBLE_SIZE_EM[size]}em; anchor-name: ${anchorName};`}
    >
      <div class="text-center space-y-8 px-16">
        {#if title}
          <div class="kern-label max-md:text-sm md:text-base text-black">
            {title}
            {#if optional}
              <span class="block font-normal text-sm"> (optional)</span>
            {/if}
          </div>
        {/if}
        {#if icons}
          <div
            class="absolute bottom-[5%] left-[50%] -translate-x-1/2 flex gap-4"
          >
            {#each icons as icon, i (tags?.[i])}
              <BubbleIcon {icon} />
            {/each}
          </div>
        {/if}
      </div>
    </div>
    {#if children && active}
      <!-- Tooltip here -->
    {/if}
  {/snippet}

  {#if isInteractive}
    <button
      aria-describedby={uid}
      class="group focus-visible:outline-none"
      onmouseenter={() => (active = true)}
      onmouseleave={() => (active = false)}
    >
      {@render bubble()}
    </button>
  {:else}
    {@render bubble()}
  {/if}
</div>
