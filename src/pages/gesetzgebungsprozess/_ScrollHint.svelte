<script lang="ts">
  import { getContext } from "svelte";
  import IconArrowDown from "~icons/ic/round-keyboard-double-arrow-down";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContext,
  } from "./_flowSidebar";

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
        if (entry.isIntersecting && !sidebarContext?.isJumping) {
          sidebarContext?.close();
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    observer.observe(rootEl);
    return () => observer.disconnect();
  });

  const isActive = $derived(!!sidebarContext?.activeId);
</script>

<div bind:this={rootEl}>
  <div
    class={`py-lg mx-auto max-w-200 flex flex-col items-center gap-8 text-icon-muted transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}
  >
    Scrollen Sie zum Starten
    <IconArrowDown class="block" />
  </div>
</div>
