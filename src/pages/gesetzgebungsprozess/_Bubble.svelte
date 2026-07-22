<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";
  import {
    BUBBLE_COLOR_CONTEXT_NAME,
    type BubbleColorContext,
  } from "./_bubbleColor";

  type Size = "xs" | "sm" | "md" | "lg";

  const sizeMap: Record<Size, string> = {
    xs: "3rem",
    sm: "8rem",
    md: "11rem",
    lg: "14rem",
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
      !(tags ?? []).some((tag) => highlightContext?.highlighted.includes(tag)),
  );

  // Every bubble shares a single, global sidebar (mounted once via
  // `_FlowSidebar.svelte`) instead of rendering its own popup, so clicking
  // a bubble toggles that sidebar's content rather than a local popup.
  const sidebarContext = getContext<FlowSidebarContext | undefined>(
    FLOW_SIDEBAR_CONTEXT_NAME,
  );

  // Falls back to an enclosing `_Cluster.svelte`'s color (the same one
  // exposed via `--bubble-color` for the fill) when this bubble doesn't set
  // its own `color` prop, so the sidebar can still be tinted accordingly.
  const clusterColorContext = getContext<BubbleColorContext | undefined>(
    BUBBLE_COLOR_CONTEXT_NAME,
  );
  const effectiveColor = $derived(color ?? clusterColorContext?.color);

  // Registers this bubble's content with the sidebar as soon as it mounts
  // (independent of clicks), so it can also be opened straight from a
  // shared `?step=` link or via the browser back/forward buttons.
  $effect(() => {
    if (!children) return;

    sidebarContext?.register({
      id: title,
      title,
      children,
      kind: "bubble",
      color: effectiveColor,
    });
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
    sidebarContext?.toggle({
      id: title,
      title,
      children,
      kind: "bubble",
      color: effectiveColor,
    });
  }
</script>

<div
  class={`relative inline-flex flex-col items-center hover:z-30 has-focus-visible:z-30 ${expanded ? "z-20" : ""} ${className}`}
>
  {#snippet bubble()}
    <div
      class={`group/circle flex items-center justify-center rounded-full transition-[transform,filter,box-shadow] duration-200 ease-out ${children ? "hover:scale-105 group-focus-visible:scale-105 group-focus-visible:outline-2 group-focus-visible:outline-cosmic-blue-base" : ""} ${expanded ? "scale-105 ring-4 ring-cosmic-blue-base ring-offset-2" : ""}`}
      style={`background-color: ${color ?? "var(--bubble-color)"}; width: ${sizeMap[size]}; height: ${sizeMap[size]}; filter: ${dimmed ? "grayscale(1)" : "none"};`}
    >
      <div class="text-center space-y-8 px-16">
        {#if size === "xs"}
          <span
            class="text-white group-hover/circle:hidden group-active/circle:hidden group-focus-visible:hidden"
            aria-hidden="true">❯</span
          >
        {/if}
        <div
          class={`kern-label text-black ${size === "xs" ? "hidden group-hover/circle:block group-active/circle:block group-focus-visible:block" : ""}`}
        >
          {title}
          {#if optional}
            <span class="font-normal"> (optional)</span>
          {/if}
        </div>
        {#if body}
          {@render body()}
        {/if}
      </div>
    </div>
  {/snippet}

  {#if children}
    <button
      bind:this={buttonEl}
      type="button"
      class="group focus-visible:outline-none"
      aria-expanded={expanded}
      onclick={toggle}
    >
      {@render bubble()}
    </button>
  {:else}
    {@render bubble()}
  {/if}
</div>
