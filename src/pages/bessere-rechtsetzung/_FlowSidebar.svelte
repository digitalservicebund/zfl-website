<script lang="ts">
  import type { FlowSidebarContent } from "./_flowSidebar";
  import Stepper from "./_Stepper.svelte";

  let {
    content,
    page = 0,
    isFirst = false,
    isLast = false,
    onClose,
    onNavigate,
    onSelectPage,
  }: {
    content: FlowSidebarContent | null;
    /**
     * Index of the currently shown page within `content.children`, for
     * clusters with more than one sidebar "page" (see `_Cluster.svelte`'s
     * `sidebar` prop).
     */
    page?: number;
    /** Whether `content` is the first cluster - hides the "Zurück" button. */
    isFirst?: boolean;
    /**
     * Whether `content` is the last cluster - "Weiter" then scrolls to the
     * page's outro section instead of cycling back to the first cluster.
     */
    isLast?: boolean;
    onClose: () => void;
    onNavigate: (step: -1 | 1) => void;
    /** Jumps directly to a given page index within the active step. */
    onSelectPage: (page: number) => void;
  } = $props();

  function handleWeiterClick() {
    if (isLast) {
      document.getElementById("outro")?.scrollIntoView({ behavior: "smooth" });
    } else {
      onNavigate(1);
    }
  }

  let scrollContainer: HTMLDivElement | undefined = $state();

  $effect(() => {
    content;
    page;
    if (scrollContainer) scrollContainer.scrollTop = 0;
  });

  const isOpen = $derived(content !== null);
  const pageCount = $derived(content?.children.length ?? 0);
  // "Weiter" advances to a new cluster (rather than just the next page
  // within the current cluster, or - for bubbles - the next bubble) only
  // when the current cluster's last page is shown and there's a following
  // cluster to move on to (i.e. not `isLast`).
  const nextIsNewCluster = $derived(
    content?.kind === "cluster" && !isLast && page === pageCount - 1,
  );
  // Clamped so a stale `page` (e.g. briefly out of range while switching
  // between steps with a different number of pages) never renders `undefined`.
  const currentPageSnippet = $derived(
    content
      ? content.children[Math.min(page, content.children.length - 1)]
      : undefined,
  );
</script>

<!-- Outer wrapper is the actual grid column, and always stays at its full
     target width - it never resizes based on `isOpen`, so the main content
     column it sits next to never reflows either. Opening/closing instead
     slides the inner panel via `transform: translateX`, which is purely
     visual and doesn't affect layout. `overflow-x-clip` (not `-hidden`,
     which would make the browser treat overflow-y as `auto` and break the
     sticky panel's page-scroll behavior) clips the panel once it's
     translated past the wrapper's right edge while closed. `self-stretch`
     is required despite the parent grid's `items-start`: a grid item's
     sticky-positioning containing block is the full grid area regardless of
     alignment, but this wrapper is no longer the grid item that the sticky
     panel is a direct child of - without stretching it to the row's full
     (tall) height, the panel's containing block collapses to the wrapper's
     own shrink-to-fit `h-screen` height, leaving it no room to stick. -->
<div
  class={`self-stretch overflow-x-clip transition-[width] duration-500 ${isOpen || true ? "w-screen lg:w-[calc(100vw-var(--cluster-inner-width))]" : "w-0"}`}
>
  <!-- Sticky (not fixed) so it stays visible while scrolling the flow, but
       never escapes the bounds of its containing `_FlowLayout.svelte`
       grid column. Always rendered - shows a placeholder until a bubble or
       cluster is clicked. -->
  <div
    class={`sticky top-0 z-50 h-screen w-screen lg:w-[calc(100vw-var(--cluster-inner-width))] flex items-end lg:items-center pointer-events-none transition-transform duration-500 ease-out ${isOpen ? "" : "translate-x-full"}`}
    style={content?.color ? `--content-color: ${content.color}` : undefined}
  >
    <div
      class="flex max-h-[50vh] lg:max-h-screen w-full max-w-full flex-col pointer-events-auto lg:h-full bg-lavender-200"
    >
      <div class="px-40 py-24">
        <Stepper
          count={pageCount}
          current={page}
          onSelect={onSelectPage}
          className="hidden"
        />
      </div>
      {#if content}
        <div
          bind:this={scrollContainer}
          class="scroll-shadow kern-body--small min-h-0 flex-1 overflow-y-auto px-40 pt-0 pb-24 [&>h2]:kern-heading-medium [&>h2]:mt-32 [&_h3]:text-lg"
        >
          <div class="flex items-center justify-between gap-16 shrink-0">
            <p class="kern-label kern-label--small mb-0">
              {content.title}
            </p>
            <button
              type="button"
              class="lg:hidden shrink-0 rounded-sm border border-cosmic-blue-base p-8 text-cosmic-blue-base"
              onclick={onClose}
              aria-label="Seitenleiste schließen"
            >
              ✕
            </button>
          </div>
          {@render currentPageSnippet?.()}
        </div>
        {#if content.kind === "cluster" || content.kind === "bubble"}
          <div
            class="flex shrink-0 justify-end gap-8 px-40 pt-24 pb-40 bg-lavender-200"
          >
            {#if !isFirst}
              <button
                type="button"
                class="kern-btn kern-btn--secondary"
                onclick={() => onNavigate(-1)}
              >
                <span class="kern-label">Zurück</span>
              </button>
            {/if}
            <button
              type="button"
              class="kern-btn kern-btn--primary"
              onclick={handleWeiterClick}
            >
              <span class="kern-label"
                >{nextIsNewCluster ? "Zur nächsten Phase" : "Weiter"}</span
              >
            </button>
          </div>
        {/if}
      {/if}
    </div>
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
