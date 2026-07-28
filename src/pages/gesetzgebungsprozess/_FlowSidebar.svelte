<script lang="ts">
  import type { FlowSidebarContent } from "./_flowSidebar";

  let {
    content,
    onClose,
    onNavigate,
  }: {
    content: FlowSidebarContent | null;
    onClose: () => void;
    onNavigate: (step: -1 | 1) => void;
  } = $props();

  const useBgColor = false;
</script>

<!-- Sticky (not fixed) so it stays visible while scrolling the flow, but
     never escapes the bounds of its containing `_FlowWithMinimap.svelte`
     grid column. Always rendered - shows a placeholder until a bubble or
     cluster is clicked. -->
<div
  class="sticky top-0 z-50 h-screen w-screen lg:w-[calc(100vw-var(--cluster-inner-width))] flex items-end lg:items-center pointer-events-none"
  style={content?.color
    ? `--content-color: ${content.color}; --content-color-bg: color-mix(in srgb, ${content.color} 20%, white)`
    : undefined}
>
  <div
    class={`flex max-h-[50vh] lg:max-h-screen w-full max-w-full flex-col _rounded-md _shadow-lg pointer-events-auto ${content?.kind === "cluster" ? "lg:h-full" : "lg:h-full"} ${useBgColor && content?.color ? "bg-(--content-color)" : "bg-lavender-200"}`}
  >
    {#if content}
      <div
        class="flex items-center justify-between gap-16 p-24 border-l-5 border-(--content-color) shrink-0"
      >
        <h2 class="kern-heading-small">{content.title}</h2>
        <button
          type="button"
          class="lg:hidden shrink-0 rounded-sm border border-cosmic-blue-base p-8 text-cosmic-blue-base"
          onclick={onClose}
          aria-label="Seitenleiste schließen"
        >
          ✕
        </button>
      </div>
      <div
        class="scroll-shadow kern-body--small min-h-0 flex-1 overflow-y-auto p-24 [&>h3]:text-lg"
      >
        {@render content.children()}
      </div>
      {#if content.kind === "cluster" || content.kind === "bubble"}
        <div class="flex shrink-0 justify-end gap-8 p-24 bg-lavender-200">
          <button
            type="button"
            class="kern-btn kern-btn--secondary"
            onclick={() => onNavigate(-1)}
          >
            <span class="kern-label">Zurück</span>
          </button>
          <button
            type="button"
            class="kern-btn kern-btn--primary"
            onclick={() => onNavigate(1)}
          >
            <span class="kern-label">Weiter</span>
          </button>
        </div>
      {/if}
    {:else}
      <div class="kern-body--small p-24 text-cosmic-blue-base/60">
        Wähle einen Schritt aus, um Details anzuzeigen.
      </div>
    {/if}
  </div>
</div>

<style>
  /* Pure-CSS "scroll shadow": shows a gradient at the top and/or bottom
     edge, fading into the background color, only when there is more
     content to scroll to in that direction. For each edge, a cover
     gradient scrolls with the content (background-attachment: local) and
     hides a shadow gradient pinned to the visible viewport
     (background-attachment: scroll) once that edge is scrolled to.
     No JS/scroll listeners needed.
     Reference: https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
  */
  .scroll-shadow {
    background:
    /* Shadow Cover TOP */
      linear-gradient(var(--color-lavender-200) 30%, rgba(255, 255, 255, 0))
        center top,
      /* Shadow Cover BOTTOM */
      linear-gradient(rgba(255, 255, 255, 0), var(--color-lavender-200) 70%)
        center bottom,
      /* Shadow TOP */
      radial-gradient(
          farthest-side at 50% 0,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        )
        center top,
      /* Shadow BOTTOM */
      radial-gradient(
          farthest-side at 50% 100%,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        )
        center bottom;

    background-repeat: no-repeat;
    background-size:
      100% 40px,
      100% 40px,
      100% 14px,
      100% 14px;
    background-attachment: local, local, scroll, scroll;
  }
</style>
