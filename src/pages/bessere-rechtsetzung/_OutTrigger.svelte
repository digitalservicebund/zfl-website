<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";

  let { children }: { children?: Snippet } = $props();

  const sidebarContext = getContext<FlowSidebarContext | undefined>(
    FLOW_SIDEBAR_CONTEXT_NAME,
  );

  let rootEl: HTMLDivElement | undefined = $state();

  // Clears the active step once this hint (above the first cluster) crosses
  // the viewport's midline, mirroring `_Cluster.svelte`'s scrollspy - so
  // scrolling back up to the very start also resets the sidebar/DotNav
  // highlight instead of leaving the last-active step highlighted.
  $effect(() => {
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sidebarContext?.close();
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    observer.observe(rootEl);
    return () => observer.disconnect();
  });

  const hasActive = $derived(!!sidebarContext?.activeId);
</script>

<div
  bind:this={rootEl}
  class={`transition-opacity duration-500 ${hasActive ? "opacity-0" : "opacity-100"} w-full min-h-100`}
>
  {@render children?.()}
</div>
