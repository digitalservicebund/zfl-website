<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { tv } from "tailwind-variants";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";

  let {
    size = 120,
    orientation = "vertical",
    className = "",
    children,
    highlightGroup,
    color,
  }: {
    size?: number;
    orientation?: "vertical" | "horizontal";
    className?: string;
    children?: Snippet;
    /**
     * Id of the Cluster/Bubble whose sidebar entry this arrow should
     * mirror, i.e. that Cluster/Bubble's `title` (or its own
     * `highlightGroup`, if it has one). When set, this arrow shares that
     * entry's active/expanded state (highlighting its fill the same way)
     * and clicking it toggles that same sidebar content - the arrow never
     * registers any sidebar content of its own.
     */
    highlightGroup?: string;
    color?: string;
  } = $props();

  // Every bubble/cluster/arrow shares a single, global sidebar (mounted
  // once via `_FlowSidebar.svelte`) instead of rendering its own popup, so
  // clicking this arrow toggles that shared content rather than a local
  // popup.
  const sidebarContext = getContext<FlowSidebarContext | undefined>(
    FLOW_SIDEBAR_CONTEXT_NAME,
  );

  const expanded = $derived(
    !!highlightGroup && sidebarContext?.activeId === highlightGroup,
  );

  let rootEl: HTMLDivElement | undefined = $state();

  // Scrolls the arrow into view whenever it becomes the active step - most
  // notably when the page is opened directly via a shared `?step=` link,
  // where it might otherwise be rendered off-screen.
  $effect(() => {
    if (!expanded || !rootEl) return;

    rootEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function toggleSidebar(id: string) {
    sidebarContext?.toggle(id);
  }

  const styles = tv({
    slots: {
      wrapper: "flex justify-center",
      shaft: "flex items-center justify-center bg-(--arrow-bg) p-8",
      tip: "h-0 w-0 border-transparent",
    },
    variants: {
      orientation: {
        vertical: {
          wrapper: "flex-col",
          shaft: "mx-auto -mt-24 h-(--arrow-size) w-120 pt-24",
          tip: "mx-auto border-x-[100px] border-t-[60px] border-t-(--arrow-bg)",
        },
        horizontal: {
          wrapper: "flex-row",
          shaft: "my-auto -ml-24 h-120 w-(--arrow-size) pl-24",
          tip: "my-auto border-y-[100px] border-l-[60px] border-l-(--arrow-bg)",
        },
      },
    },
  });

  const { wrapper, shaft, tip } = $derived(styles({ orientation }));
</script>

<div
  bind:this={rootEl}
  class={wrapper({ class: className })}
  style={`--arrow-color: color-mix(in srgb, ${color} 20%, white); --arrow-bg: ${expanded ? "var(--arrow-color)" : "#F7F7F7"}`}
>
  {#snippet arrow()}
    <div class={shaft()} style={`--arrow-size: ${size}px`}>
      {#if children}
        <p class="font-bold text-sm text-center">{@render children()}</p>
      {/if}
    </div>
    <div class={tip()}></div>
  {/snippet}

  {#if highlightGroup}
    <button
      type="button"
      class="contents cursor-pointer"
      aria-expanded={expanded}
      onclick={() => toggleSidebar(highlightGroup)}
    >
      {@render arrow()}
    </button>
  {:else}
    {@render arrow()}
  {/if}
</div>
