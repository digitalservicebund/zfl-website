<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";

  type Size = "sm" | "md" | "lg" | "xl";

  const sizeMap: Record<Size, string> = {
    sm: "8rem",
    md: "12rem",
    lg: "15rem",
    xl: "18rem",
  };

  let {
    color,
    title,
    badge,
    size = "md",
    children,
  }: {
    /**
     * Fill color of the bubble, e.g. a hex code. Defaults to the
     * `--bubble-color` custom property set by the enclosing Cluster.
     */
    color?: string;
    title: string;
    badge?: string;
    size?: Size;
    /** Body content shown when the bubble is expanded. */
    children?: Snippet;
  } = $props();

  // Falls back to an always-empty list when no ancestor provides the
  // context (e.g. when a Bubble is rendered standalone, such as in the
  // kitchen sink page), so bubbles are never unexpectedly grayed out.
  const highlightContext = getContext<BubbleHighlightContext | undefined>(
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
  );

  const dimmed = $derived(
    (highlightContext?.highlighted.length ?? 0) > 0 &&
      !highlightContext?.highlighted.includes(title),
  );

  let expanded = $state(false);

  function toggle() {
    expanded = !expanded;
  }
</script>

<div class="relative inline-flex flex-col items-center">
  <button
    type="button"
    class="flex items-center justify-center rounded-full transition-[transform,filter] duration-200 ease-out hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-cosmic-blue-base"
    style={`background-color: ${color ?? "var(--bubble-color)"}; width: ${sizeMap[size]}; height: ${sizeMap[size]}; filter: ${dimmed ? "grayscale(1)" : "none"};`}
    aria-expanded={expanded}
    onclick={toggle}
  >
    <div class="text-center space-y-8 px-16">
      {#if badge}
        <div>
          <span class="text-sm bg-black text-white rounded-sm p-3">{badge}</span
          >
        </div>
      {/if}
      <div class="kern-label font-bold text-black">{title}</div>
    </div>
  </button>

  {#if expanded && children}
    <div
      class="absolute top-full z-10 mt-8 w-xs rounded-lg border border-lavender-400 bg-white p-16 text-left shadow-lg"
      transition:slide={{ duration: 150 }}
    >
      <p class="kern-body--small">
        {@render children()}
      </p>
    </div>
  {/if}
</div>
