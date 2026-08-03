<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import FlowSidebar from "./_FlowSidebar.svelte";
  import DotNav from "./_DotNav.svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContent,
  } from "./_flowSidebar";
  import { BUBBLE_HIGHLIGHT_CONTEXT_NAME } from "./_bubbleHighlight";

  let {
    orientation = "vertical",
    children,
  }: {
    /** Direction the content scrolls/grows in. */
    orientation?: "vertical" | "horizontal";
    children: Snippet;
  } = $props();

  /**
   * Tags of the bubbles to highlight (matched against each Bubble's
   * `tags` prop). Owned here (rather than by the flow content itself) so
   * the same highlight state is visible both to the flow content and to
   * `_FlowSidebar.svelte`, which is rendered as a sibling of `children`
   * and wouldn't otherwise share its component tree. Bindable so callers
   * can control it externally.
   */
  let highlighted = $state<string[]>([]);

  // Exposed via context (rather than threaded through every `<Bubble>`/
  // `<Feature>` usage) so any descendant - including sidebar content
  // rendered through `_FlowSidebar.svelte` - can reactively read and toggle
  // the current highlight list.
  setContext(BUBBLE_HIGHLIGHT_CONTEXT_NAME, {
    get highlighted() {
      return highlighted;
    },
    toggleHighlighted,
    setHighlighted,
  });

  function toggleHighlighted(tag: string) {
    highlighted = highlighted.includes(tag) ? [] : [tag];
  }
  function setHighlighted(tag: string | null) {
    highlighted = tag ? [tag] : [];
  }

  const isVertical = $derived(orientation === "vertical");

  // Every bubble/cluster registers its content here as soon as it mounts
  // (regardless of whether it's ever clicked), so the sidebar can show a
  // step straight from a shared `?step=` link or via the browser
  // back/forward buttons.
  let registry = $state<Record<string, FlowSidebarContent>>({});
  let activeId = $state<string | null>(null);
  // Index into the active step's `children` pages array. A cluster can
  // define multiple sidebar "pages" (see `_Cluster.svelte`'s `sidebar`
  // prop); this tracks which one is currently shown, so "Zurück"/"Weiter"
  // can cycle through them before moving on to the previous/next step.
  let activePage = $state(0);

  const sidebarContent = $derived(
    activeId ? (registry[activeId] ?? null) : null,
  );

  function register(entry: FlowSidebarContent) {
    registry[entry.id] = entry;
  }

  function unregister(id: string) {
    delete registry[id];
  }

  // Content for `id` is expected to already be in the registry - every
  // Bubble/Cluster registers itself as soon as it mounts, well before it can
  // be clicked.
  function toggle(id: string) {
    activeId = activeId === id ? null : id;
    activePage = 0;
  }

  function setActive(id: string) {
    activeId = id;
    activePage = 0;
  }

  // Marks the flow as "auto-scrolling" while `navigateStep`'s
  // `scrollIntoView` animation is in flight, so `_Cluster.svelte`'s
  // IntersectionObserver-driven `setActive` (triggered as clusters pass the
  // viewport's midline during the smooth scroll) doesn't fight with the
  // step explicitly requested here.
  let jumping = $state(false);
  let jumpingTimeout: ReturnType<typeof setTimeout> | undefined;

  function startJump() {
    jumping = true;
    clearTimeout(jumpingTimeout);
    // Safety net in case `scrollend` never fires (e.g. unsupported browser,
    // or no actual scroll movement needed).
    jumpingTimeout = setTimeout(() => {
      jumping = false;
    }, 1000);
  }

  function endJump() {
    jumping = false;
    clearTimeout(jumpingTimeout);
  }

  function closeSidebar() {
    activeId = null;
    activePage = 0;
  }

  // Ids of all currently registered Cluster steps, in registration
  // order (which follows page/DOM order), used to cycle "Zurück"/"Weiter"
  // through steps of the same kind as the currently open one - Clusters and
  // Bubbles each cycle through their own sequence, never mixed together.
  const clusterIds = $derived(Object.values(registry).map((entry) => entry.id));

  // Cluster dots shown in `_DotNav.svelte`, in the same registration order
  // as `clusterIds`.
  const clusterDots = $derived(
    clusterIds.map((id) => ({ id, color: registry[id]?.color })),
  );

  // Only clusters (not bubbles) get first/last treatment in
  // `_FlowSidebar.svelte`'s "Zurück"/"Weiter" nav - bubbles keep cycling.
  // Also requires being on the first/last *page* of that cluster, so a
  // multi-page cluster's later/earlier pages don't hide "Zurück"/"Weiter"
  // prematurely.
  const isFirstCluster = $derived(
    !!sidebarContent && sidebarContent.id === clusterIds[0] && activePage === 0,
  );
  const isLastCluster = $derived(
    !!sidebarContent &&
      sidebarContent.id === clusterIds[clusterIds.length - 1] &&
      activePage === sidebarContent.children.length - 1,
  );

  // Scrolls `el` into view like `Element.scrollIntoView({ block: "start" })`,
  // but (in vertical orientation) clamps the target scroll position so it
  // never scrolls past the point where the layout wrapper's bottom edge
  // would rise above the viewport - beyond that point, `_FlowSidebar.svelte`
  // (whose sticky containing block is this wrapper) starts scrolling away
  // with the content instead of staying pinned. Most relevant for the last
  // cluster ("Nach der Verkündung"), which would otherwise scroll the
  // sidebar out of view.
  function scrollToStep(el: HTMLElement) {
    startJump();
    if (!isVertical || !wrapperEl) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // `scrollIntoView` honors `scroll-margin-top` (e.g. the cluster titles'
    // `scroll-mt-40`) automatically, but reading `getBoundingClientRect()`
    // directly doesn't - subtract it manually so the clamped scroll lands
    // at the same offset the native call would have used.
    const scrollMarginTop = parseFloat(
      getComputedStyle(el).scrollMarginTop || "0",
    );
    const targetY =
      window.scrollY + el.getBoundingClientRect().top - scrollMarginTop;
    const maxScrollY =
      window.scrollY +
      wrapperEl.getBoundingClientRect().bottom -
      window.innerHeight;
    const clampedY = Math.max(0, Math.min(targetY, maxScrollY));
    window.scrollTo({ top: clampedY, behavior: "smooth" });
  }

  function onDotSelect(id: string) {
    setActive(id);
    const el = document.getElementById(id);
    if (el) scrollToStep(el);
  }

  function navigateStep(step: -1 | 1) {
    if (!sidebarContent) return;

    // Cycle through this step's own sidebar pages first (see
    // `_Cluster.svelte`'s `sidebar` prop), only advancing to the
    // previous/next cluster/bubble once the first/last page is reached.
    const nextPage = activePage + step;
    if (nextPage >= 0 && nextPage < sidebarContent.children.length) {
      activePage = nextPage;
      return;
    }

    const ids = clusterIds;
    if (ids.length === 0) return;

    const currentIndex = ids.indexOf(sidebarContent.id);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + step + ids.length) % ids.length;
    const nextId = ids[nextIndex];
    const nextContent = registry[nextId];
    if (!nextContent) return;

    activeId = nextContent.id;
    // Land on the new step's first page when moving forward ("Weiter"), or
    // its last page when moving backward ("Zurück"), so the "Zurück"/
    // "Weiter" buttons always move exactly one page at a time through a
    // continuous sequence instead of jumping to the same page index in the
    // next step.
    activePage = step === 1 ? 0 : nextContent.children.length - 1;
    const activeEl = document.getElementById(nextContent.id);
    if (activeEl) scrollToStep(activeEl);
  }

  // Jumps directly to a given page within the active step, e.g. when a
  // `_Stepper.svelte` element is clicked, rather than only stepping by ±1.
  function selectPage(index: number) {
    if (!sidebarContent) return;
    if (index < 0 || index >= sidebarContent.children.length) return;

    activePage = index;
  }

  // Clears the `jumping` flag once the auto-scroll triggered by
  // `navigateStep` actually finishes, listening on whichever target scrolls
  // for the current orientation (the window when vertical, `mainEl` itself
  // when horizontal).
  $effect(() => {
    window.addEventListener("scrollend", endJump);
    mainEl?.addEventListener("scrollend", endJump);

    return () => {
      window.removeEventListener("scrollend", endJump);
      mainEl?.removeEventListener("scrollend", endJump);
    };
  });

  setContext(FLOW_SIDEBAR_CONTEXT_NAME, {
    get activeId() {
      return activeId;
    },
    get isJumping() {
      return jumping;
    },
    register,
    unregister,
    toggle,
    setActive,
    close: closeSidebar,
  });

  let mainEl: HTMLDivElement | undefined = $state();
  // The grid wrapper whose bottom edge bounds `_FlowSidebar.svelte`'s sticky
  // positioning - see `scrollToStep`.
  let wrapperEl: HTMLDivElement | undefined = $state();
</script>

<div
  bind:this={wrapperEl}
  class="grid items-start grid-cols-1 lg:grid-cols-[1fr_auto] [--cluster-inner-width:100vw] lg:[--cluster-inner-width:61.8vw]"
>
  <div
    class={`col-start-1 row-start-1 grid min-w-0 ${isVertical ? "mx-auto w-(--cluster-inner-width)" : ""}`}
  >
    <div
      bind:this={mainEl}
      class={`col-start-1 row-start-1 min-w-0 max-w-screen ${isVertical ? "" : "w-screen overflow-x-auto scrollbar-none"}`}
    >
      <!-- `inline-block` (rather than the default block box, which would
         just stretch to 100% of `mainEl`) shrink-wraps to the content's own
         natural width, which in horizontal mode is wider than the viewport -
         without this, `mainEl`'s `overflow-x-auto` would have nothing wider
         than itself to actually scroll. -->
      <div class="inline-block align-top">
        {@render children()}
      </div>
    </div>
    <div
      class={`sticky flex items-center z-50 col-start-1 row-start-1 pointer-events-none ${
        isVertical
          ? "w-full top-0 h-screen justify-end"
          : "w-[50vw] bottom-20 self-end justify-self-start justidfy-center"
      }`}
    >
      <DotNav clusters={clusterDots} {activeId} onSelect={onDotSelect} />
    </div>
  </div>

  <FlowSidebar
    content={sidebarContent}
    page={activePage}
    isFirst={isFirstCluster}
    isLast={isLastCluster}
    onClose={closeSidebar}
    onNavigate={navigateStep}
    onSelectPage={selectPage}
  />
</div>
