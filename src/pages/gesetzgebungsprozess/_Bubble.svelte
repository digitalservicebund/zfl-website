<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";
  import Tooltip from "./_Tooltip.svelte";
  import BubbleIcon from "./_BubbleIcon.svelte";
  import { icons } from "./_icons.ts";

  type Size = "xs" | "sm" | "md" | "lg";

  const sizeMap: Record<Size, string> = {
    xs: "3em",
    sm: "9em",
    md: "11em",
    lg: "13em",
  };

  let {
    color,
    title,
    optional,
    size = "md",
    className = "",
    tags,
    children,
    body,
    icon,
  }: {
    /**
     * Fill color of the bubble, e.g. a hex code. Defaults to the
     * `--bubble-color` custom property set by the enclosing Cluster.
     */
    color?: string;
    title: string;
    optional?: boolean;
    size?: Size;
    className?: string;
    tags?: string[];
    /** Tooltip content shown above the bubble when it's clicked open. */
    children?: Snippet;
    /** Optional body content shown within the bubble */
    body?: Snippet;
    icon?: keyof typeof icons;
  } = $props();

  // Falls back to an always-empty list when no ancestor provides the
  // context (e.g. when a Bubble is rendered standalone, such as in the
  // kitchen sink page), so bubbles are never unexpectedly grayed out.
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
  let open = $state(false);

  const isInteractive = $derived(!!children);

  // Unique per-instance CSS anchor name so the tooltip can be positioned
  // relative to this bubble's circle via CSS anchor positioning, even
  // though many Bubbles share this component on the same page.
  const uid = $props.id();
  const anchorName = `--bubble-anchor-${uid}`;
</script>

<div
  class={`relative inline-flex flex-col items-center hover:z-30 has-focus-visible:z-30 ${open ? "z-20" : ""} ${className}`}
>
  {#snippet bubble()}
    <div
      class={`group/circle flex text-xs md:text-sm xl:text-base items-center justify-center rounded-full transition-[transform,filter,box-shadow] duration-200 ease-out ${children ? "hover:scale-105 group-focus-visible:scale-105 group-focus-visible:outline-2 group-focus-visible:outline-cosmic-blue-base" : ""} ${open ? "scale-105 ring-4 ring-cosmic-blue-base ring-offset-2" : ""}`}
      style={`background-color: ${color ?? "var(--bubble-color)"}; width: ${sizeMap[size]}; height: ${sizeMap[size]}; filter: ${dimmed ? "grayscale(1)" : "none"}; anchor-name: ${anchorName};`}
    >
      <div class="text-center space-y-8 px-16">
        {#if size === "xs"}
          <span
            class="text-white group-hover/circle:hidden group-active/circle:hidden group-focus-visible:hidden"
            aria-hidden="true">❯</span
          >
        {/if}
        <div
          class={`kern-label max-md:text-sm md:text-base text-black ${size === "xs" ? "hidden group-hover/circle:block group-active/circle:block group-focus-visible:block" : ""}`}
        >
          {title}
          {#if optional}
            <span class="font-normal"> (optional)</span>
          {/if}
        </div>
        {#if body}
          {@render body()}
        {/if}
        {#if icon}
          <div class="absolute bottom-[5%] left-[50%] -translate-x-1/2">
            <BubbleIcon {icon} />
          </div>
        {/if}
      </div>
    </div>
    {#if children && open}
      <Tooltip {anchorName} id={uid}>
        {@render children()}
      </Tooltip>
    {/if}
  {/snippet}

  {#if isInteractive}
    <button
      aria-describedby={uid}
      class="group focus-visible:outline-none"
      onmouseenter={() => (open = true)}
      onmouseleave={() => (open = false)}
    >
      {@render bubble()}
    </button>
  {:else}
    {@render bubble()}
  {/if}
</div>
