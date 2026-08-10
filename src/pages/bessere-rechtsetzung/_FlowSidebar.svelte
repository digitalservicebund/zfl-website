<script lang="ts">
  import type { FlowSidebarContent } from "./_flowSidebar";
  import { scopeFocusable } from "./_scopeFocusable";

  let {
    content,
    entries,
    page = 0,
    isFirst = false,
    isLast = false,
    onNavigate,
    panelEl = $bindable(),
  }: {
    content: FlowSidebarContent | null;
    /**
     * Every registered cluster's content, not just `content` (the active
     * one) - rendered unconditionally below so each stays reachable via
     * `_Cluster.svelte`'s static `aria-owns` no matter which cluster is
     * currently active.
     */
    entries: FlowSidebarContent[];
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
    onNavigate: (step: -1 | 1) => void;
    /** Jumps directly to a given page index within the active step. */
    onSelectPage: (page: number) => void;
    /**
     * The panel's root element, bound out to `_FlowLayout.svelte` so it can
     * move keyboard focus here on an explicit Cluster activation (see
     * `activate` in `_flowSidebar.ts`).
     */
    panelEl?: HTMLDivElement;
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
    void content;
    void page;
    if (scrollContainer) scrollContainer.scrollTop = 0;
  });

  const isOpen = $derived(content !== null);
  const pageCount = $derived(content?.children.length ?? 0);
  // "Weiter" advances to a new cluster (rather than just the next page
  // within the current cluster) only
  // when the current cluster's last page is shown and there's a following
  // cluster to move on to (i.e. not `isLast`).
  const nextIsNewCluster = $derived(!isLast && page === pageCount - 1);

  let drawerHeight = $state(300); // px

  const MIN_DRAWER_HEIGHT = 140; // px, matches the `max-h` floor below
  const MAX_DRAWER_HEIGHT_RATIO = 0.9; // fraction of viewport height

  let dragStart: { pointerY: number; drawerHeight: number } | undefined;

  function handleHandlePointerDown(event: PointerEvent) {
    dragStart = { pointerY: event.clientY, drawerHeight };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function handleHandlePointerMove(event: PointerEvent) {
    if (!dragStart) return;
    // Dragging up (negative clientY delta) should grow the drawer, since the
    // sheet is anchored to the bottom of the screen on mobile.
    const delta = dragStart.pointerY - event.clientY;
    const maxHeight = window.innerHeight * MAX_DRAWER_HEIGHT_RATIO;
    drawerHeight = Math.min(
      Math.max(dragStart.drawerHeight + delta, MIN_DRAWER_HEIGHT),
      maxHeight,
    );
  }

  function handleHandlePointerUp() {
    dragStart = undefined;
  }
</script>

<aside
  aria-label="Details zum Prozessschritt"
  class="col-start-1 row-start-1 lg:col-start-2 self-stretch overflow-x-clip w-full lg:w-[calc(100vw-var(--cluster-inner-width))]"
>
  <div
    class={`sticky top-0 z-50 h-screen w-full lg:w-[calc(100vw-var(--cluster-inner-width))] flex items-end lg:items-center pointer-events-none transition-transform duration-500 ease-out ${isOpen ? "" : "max-lg:translate-y-full lg:translate-x-full"} [--sb-padding:16px] md:[--sb-padding:40px]`}
    style={content?.color ? `--content-color: ${content.color}` : undefined}
  >
    <div
      bind:this={panelEl}
      id="flow-sidebar"
      role="region"
      aria-label={content?.title}
      tabindex="-1"
      class="flex max-h-[max(140px,var(--drawer-h))] lg:max-h-screen w-full max-w-full flex-col pointer-events-auto lg:h-full bg-lavender-200 focus:outline-2 focus:-outline-offset-2 focus:outline-(--kern-color-action-focus-default)/20"
      style={`--drawer-h: ${drawerHeight}px`}
    >
      {#if content}
        <button
          type="button"
          aria-label="Größe einstellen"
          data-sidebar-mobile-handle
          class="lg:hidden shrink-0 py-16 touch-none"
          onpointerdown={handleHandlePointerDown}
          onpointermove={handleHandlePointerMove}
          onpointerup={handleHandlePointerUp}
          onpointercancel={handleHandlePointerUp}
        >
          <div class="bg-[#D9D9D9] rounded-full h-10 w-55 mx-auto"></div>
        </button>
      {/if}

      <div
        bind:this={scrollContainer}
        class="scroll-shadow kern-body--small min-h-0 flex-1 overflow-y-auto px-(--sb-padding) pt-0 lg:pt-(--sb-padding) pb-24 [&_h3]:kern-heading-medium [&_h3]:mt-16 [&_h3]:md:mt-32 [&_h4]:text-lg"
      >
        {#if content}
          <div class="flex items-center justify-between gap-16 shrink-0">
            <p class="kern-label kern-label--small mb-0" aria-hidden="true">
              {content.title}
            </p>
            <button
              class="opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto kern-btn kern-btn--tertiary"
              onclick={() => {
                document
                  .getElementById(content.id)
                  ?.querySelector("button")
                  ?.focus();
              }}>zur Grafik</button
            >
          </div>
        {/if}
        {#each entries as entry (entry.id)}
          {@const isEntryActive = entry.id === content?.id}
          <div
            id={`sidebar-content-${entry.id}`}
            class={isEntryActive ? "" : "sr-only"}
            use:scopeFocusable={isEntryActive}
          >
            {#if isEntryActive}
              {@render entry.children[
                Math.min(page, entry.children.length - 1)
              ]()}
            {:else}
              {#each entry.children as entryPage, i (i)}
                {@render entryPage()}
              {/each}
            {/if}
          </div>
        {/each}
      </div>

      {#if content}
        <div
          class="flex shrink-0 justify-end gap-8 px-(--sb-padding) pt-16 md:pt-24 pb-(--sb-padding) bg-lavender-200"
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
    </div>
  </div>
</aside>

<style>
  /* Pure-CSS "scroll shadow"
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
