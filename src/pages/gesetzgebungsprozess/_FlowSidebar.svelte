<script lang="ts">
  import type { FlowSidebarContent } from "./_flowSidebar";

  let {
    content,
    onClose,
    onNavigateCluster,
  }: {
    content: FlowSidebarContent | null;
    onClose: () => void;
    onNavigateCluster: (step: -1 | 1) => void;
  } = $props();
</script>

<!-- Sticky (not fixed) so it stays visible while scrolling the flow, but
     never escapes the bounds of its containing `_FlowWithMinimap.svelte`
     grid column. Always rendered - shows a placeholder until a bubble or
     cluster is clicked. -->
<div class="sticky top-0 z-50 h-screen flex items-center pointer-events-none">
  <div
    class="flex h-fit max-h-screen w-[30vw] max-w-full flex-col rounded-md border border-lavender-400 shadow-lg pointer-events-auto"
    style={content?.color
      ? `background-color: color-mix(in srgb, ${content.color} 20%, white);`
      : "background-color: #E9EEF3;"}
  >
    {#if content}
      <div class="flex items-center justify-between gap-16 p-24">
        <h2 class="kern-heading-small">{content.title}</h2>
        <button
          type="button"
          class="shrink-0 rounded-sm border border-cosmic-blue-base p-8 text-cosmic-blue-base"
          onclick={onClose}
          aria-label="Seitenleiste schließen"
        >
          ✕
        </button>
      </div>
      <div class="kern-body--small flex-1 overflow-y-auto p-24 [&>h3]:text-lg">
        {@render content.children()}

        {#if content.kind === "cluster"}
          <div class="flex justify-end gap-8 mt-24">
            <button
              type="button"
              class="kern-btn kern-btn--secondary"
              onclick={() => onNavigateCluster(-1)}
            >
              <span class="kern-label">Zurück</span>
            </button>
            <button
              type="button"
              class="kern-btn kern-btn--primary"
              onclick={() => onNavigateCluster(1)}
            >
              <span class="kern-label">Weiter</span>
            </button>
          </div>
        {/if}
      </div>
    {:else}
      <div class="kern-body--small p-24 text-cosmic-blue-base/60">
        Wähle einen Schritt aus, um Details anzuzeigen.
      </div>
    {/if}
  </div>
</div>
