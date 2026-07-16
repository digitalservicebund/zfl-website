<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";
  import {
    BUBBLE_SIDEBAR_CONTEXT_NAME,
    type BubbleSidebarContext,
  } from "./_bubbleSidebar";

  type Size = "sm" | "md" | "lg";

  const sizeMap: Record<Size, string> = {
    sm: "8rem",
    md: "11rem",
    lg: "14rem",
  };

  let {
    color,
    title,
    badge,
    size = "md",
    className = "",
    children,
    body,
  }: {
    /**
     * Fill color of the bubble, e.g. a hex code. Defaults to the
     * `--bubble-color` custom property set by the enclosing Cluster.
     */
    color?: string;
    title: string;
    badge?: string;
    size?: Size;
    className?: string;
    /** Sidebar content shown in the global sidebar when the bubble is opened. */
    children?: Snippet;
    /** Optional body content shown within the bubble */
    body?: Snippet;
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

  // Every bubble shares a single, global sidebar (mounted once via
  // `_BubbleSidebar.svelte`) instead of rendering its own popup, so clicking
  // a bubble toggles that sidebar's content rather than a local popup.
  const sidebarContext = getContext<BubbleSidebarContext | undefined>(
    BUBBLE_SIDEBAR_CONTEXT_NAME,
  );

  // Registers this bubble's content with the sidebar as soon as it mounts
  // (independent of clicks), so it can also be opened straight from a
  // shared `?step=` link or via the browser back/forward buttons.
  $effect(() => {
    if (!children) return;

    sidebarContext?.register({ id: title, title, children });
    return () => sidebarContext?.unregister(title);
  });

  const expanded = $derived(sidebarContext?.activeId === title);

  let buttonEl: HTMLButtonElement | undefined = $state();

  // Scrolls the bubble into view whenever it becomes the active step - most
  // notably when the page is opened directly via a shared `?step=` link,
  // where the bubble might otherwise be rendered off-screen.
  $effect(() => {
    if (!expanded || !buttonEl) return;

    buttonEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function toggle() {
    if (!children) return;
    sidebarContext?.toggle({ id: title, title, children });
  }
</script>

<div
  class={`relative inline-flex flex-col items-center ${expanded ? "z-20" : ""} ${className}`}
>
  <button
    bind:this={buttonEl}
    type="button"
    class={`flex items-center justify-center rounded-full transition-[transform,filter,box-shadow] duration-200 ease-out hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-cosmic-blue-base ${expanded ? "scale-105 ring-4 ring-cosmic-blue-base ring-offset-2" : ""}`}
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
      {#if body}
        {@render body()}
      {/if}
    </div>
  </button>
</div>
