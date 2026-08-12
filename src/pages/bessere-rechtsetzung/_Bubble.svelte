<script lang="ts">
  import { getContext } from "svelte";
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
  }

  let {
    color,
    title,
    optional,
    size = "md",
    className = "",
    tags,
  }: Props = $props();

  const icons = $derived(tags?.map((t) => iconMap[t]));

  // Undefined outside a Cluster, or when the cluster flex-positions 1-2
  // bubbles instead of packing them (see `_clusterLayout.ts`).
  const clusterLayout = getContext<ClusterLayoutContext | undefined>(
    CLUSTER_LAYOUT_CONTEXT_NAME,
  );
  const position =
    clusterLayout && !clusterLayout.isFlexPositioned
      ? clusterLayout.next()
      : undefined;

  // Ring bubbles are placed via `offset-path`: a circular path sized to their
  // own distance from the cluster centre, with `offset-distance` picking the
  // point on it - letting the browser do the trig. The hub bubble (dist ~0)
  // has no ring to move along, so it's positioned directly instead.
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

  // Unique per-instance anchor name for CSS anchor positioning of the tooltip.
  const uid = $props.id();
  const anchorName = `--bubble-anchor-${uid}`;
</script>

<div
  aria-hidden="true"
  class={`relative inline-flex flex-col items-center hover:z-30 ${RESPONSIVE_BUBBLE_FONT_CLASS} ${className}`}
  style={positionStyle}
>
  <div
    class={`group/circle flex items-center justify-center rounded-full transition-[transform,filter,box-shadow,opacity] duration-200 ease-out ${dimmed ? "opacity-50" : ""}`}
    style={`background: ${color ?? "var(--bubble-color)"}; width: ${BUBBLE_SIZE_EM[size]}em; height: ${BUBBLE_SIZE_EM[size]}em; anchor-name: ${anchorName};`}
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
</div>
