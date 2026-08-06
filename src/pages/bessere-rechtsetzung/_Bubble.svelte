<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";
  import Tooltip from "./_Tooltip.svelte";
  import BubbleIcon from "./_BubbleIcon.svelte";
  import { iconMap, type TagName } from "./_icons.ts";

  type Size = "sm" | "md" | "lg";

  const sizeMap: Record<Size, string> = {
    sm: "9em",
    md: "11em",
    lg: "12em",
  };

  interface Props {
    /** Fill color of the bubble, defaults `--bubble-color` set by the enclosing Cluster. */
    color?: string;
    title?: string;
    optional?: boolean;
    size?: Size;
    className?: string;
    tags?: TagName[];
    /** Tooltip content shown above the bubble when it's clicked open. */
    children?: Snippet;
    /** Optional body content shown within the bubble */
    body?: Snippet;
  }

  let {
    color,
    title,
    optional,
    size = "md",
    className = "",
    tags,
    children,
    body,
  }: Props = $props();

  const icons = $derived(tags?.map((t) => iconMap[t]));

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
  class={`relative inline-flex flex-col items-center hover:z-30 has-focus-visible:z-30 ${active ? "z-20" : ""} ${className}`}
>
  {#snippet bubble()}
    <div
      class={`group/circle flex text-xs md:text-sm xl:text-base items-center justify-center rounded-full transition-[transform,filter,box-shadow,opacity] duration-200 ease-out ${isInteractive ? "hover:scale-105 group-focus-visible:scale-105 group-focus-visible:outline-2 group-focus-visible:outline-cosmic-blue-base" : ""} ${active ? "scale-105 ring-4 ring-cosmic-blue-base ring-offset-2" : ""} ${dimmed ? "opacity-50" : ""}`}
      style={`background-color: ${color ?? "var(--bubble-color)"}; width: ${sizeMap[size]}; height: ${sizeMap[size]}; anchor-name: ${anchorName};`}
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
        {#if body}
          {@render body()}
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
      <Tooltip {anchorName} id={uid}>
        {@render children()}
      </Tooltip>
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
