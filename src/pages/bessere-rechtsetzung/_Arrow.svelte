<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";

  let {
    size = 120,
    className = "",
    children,
    highlightGroup,
    color,
  }: {
    size?: number;
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

  const isActive = $derived(
    !!highlightGroup && sidebarContext?.activeId === highlightGroup,
  );

  let rootEl: HTMLDivElement | undefined = $state();

  const wrapperClass = $derived(`flex justify-center flex-col ${className}`);
  const shaftClass =
    "flex items-center justify-center bg-(--arrow-bg) p-8 mx-auto -mt-24 h-(--arrow-size) w-120 pt-24";
  const tipClass =
    "h-0 w-0 border-transparent mx-auto border-x-[100px] border-t-[60px] border-t-(--arrow-bg)";
</script>

<div
  bind:this={rootEl}
  class={wrapperClass}
  style={`--arrow-color: color-mix(in srgb, ${color} 20%, white); --arrow-bg: ${isActive && false ? "var(--arrow-color)" : "#F7F7F7"}`}
>
  <div class={shaftClass} style={`--arrow-size: ${size}px`}>
    {#if children}
      <p class="font-bold text-sm text-center">{@render children()}</p>
    {/if}
  </div>
  <div class={tipClass}></div>
</div>
