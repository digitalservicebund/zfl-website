<script lang="ts">
  import { setContext, tick } from "svelte";
  import type { Snippet } from "svelte";
  import FlowSidebar from "./_FlowSidebar.svelte";
  import DotNav from "./_DotNav.svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    type FlowSidebarContent,
  } from "./_flowSidebar";
  import { BUBBLE_HIGHLIGHT_CONTEXT_NAME } from "./_bubbleHighlight";

  let { children }: { children: Snippet } = $props();

  /** Tags of the bubbles to highlight */
  let highlighted = $state<string[]>([]);

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

  // Every Section registers its content here as soon as it mounts
  let registry = $state<Record<string, FlowSidebarContent>>({});
  let activeId = $state<string | null>(null);

  const sidebarContent = $derived(
    activeId ? (registry[activeId] ?? null) : null,
  );

  const sidebarEntries = $derived(Object.values(registry));

  function register(entry: FlowSidebarContent) {
    registry[entry.id] = entry;
  }

  function setActive(id: string) {
    activeId = id;
  }

  // Focus target for `activate` below - see FlowSidebar's `panelEl` bindable prop.
  let sidebarPanelEl: HTMLDivElement | undefined = $state();

  async function focusSidebar() {
    await tick(); // wait for the DOM update from setActive
    sidebarPanelEl?.focus({ preventScroll: true });
  }

  // Moves focus into the sidebar for explicit interactions (e.g. clicking a
  // Cluster title). Scroll-driven activation (setActive) must not do this -
  // it would hijack focus mid-scroll.
  function activate(id: string) {
    setActive(id);
    void focusSidebar();
  }

  // True while navigateStep's scrollIntoView animation is in flight, so
  // Section's IntersectionObserver-driven setActive doesn't fight with it.
  let jumping = $state(false);
  let jumpingTimeout: ReturnType<typeof setTimeout> | undefined;

  function startJump() {
    jumping = true;
    clearTimeout(jumpingTimeout);
    jumpingTimeout = setTimeout(() => {
      jumping = false; // safety net if `scrollend` never fires
    }, 1000);
  }

  function endJump() {
    jumping = false;
    clearTimeout(jumpingTimeout);
  }

  function closeSidebar() {
    activeId = null;
  }

  // Registered Section ids, used to cycle "Zurück"/"Weiter".
  const sectionIds = $derived(Object.values(registry).map((entry) => entry.id));

  // Dots shown in DotNav, in registration order.
  const sectionDots = $derived(
    sectionIds.map((id) => ({
      id,
      title: registry[id]?.title,
      color: registry[id]?.color,
    })),
  );

  const isFirstSection = $derived(
    !!sidebarContent && sidebarContent.id === sectionIds[0],
  );
  const isLastSection = $derived(
    !!sidebarContent &&
      sidebarContent.id === sectionIds[sectionIds.length - 1],
  );

  // Scrolls `el` into view, but clamps the target position so it never
  // scrolls past the point where FlowSidebar's sticky container (this
  // wrapper) would start scrolling away with the content. Most relevant for
  // the last cluster ("Nach der Verkündung").
  function scrollToStep(el: HTMLElement) {
    startJump();
    if (!wrapperEl) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // scrollIntoView honors scroll-margin-top automatically; getBoundingClientRect doesn't.
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

    const ids = sectionIds;
    if (ids.length === 0) return;

    const currentIndex = ids.indexOf(sidebarContent.id);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + step + ids.length) % ids.length;
    const nextId = ids[nextIndex];
    const nextContent = registry[nextId];
    if (!nextContent) return;

    activeId = nextContent.id;
    const activeEl = document.getElementById(nextContent.id);
    if (activeEl) scrollToStep(activeEl);
  }

  $effect(() => {
    window.addEventListener("scrollend", endJump);
    return () => window.removeEventListener("scrollend", endJump);
  });

  setContext(FLOW_SIDEBAR_CONTEXT_NAME, {
    get activeId() {
      return activeId;
    },
    get isJumping() {
      return jumping;
    },
    register,
    setActive,
    activate,
    close: closeSidebar,
  });

  // Bounds FlowSidebar's sticky positioning - see scrollToStep.
  let wrapperEl: HTMLDivElement | undefined = $state();
</script>

<div
  bind:this={wrapperEl}
  class="grid items-start grid-cols-1 lg:grid-cols-[1fr_auto] [--cluster-inner-width:100vw] lg:[--cluster-inner-width:61.8vw]"
>
  <div
    class="col-start-1 row-start-1 grid min-w-0 mx-auto w-(--cluster-inner-width)"
  >
    <div class="col-start-1 row-start-1 min-w-0 max-w-screen">
      {@render children()}
    </div>
    <div
      class="sticky flex items-center z-50 col-start-1 row-start-1 pointer-events-none top-0 h-screen justify-end"
    >
      <DotNav sections={sectionDots} {activeId} onSelect={onDotSelect} />
    </div>
  </div>

  <FlowSidebar
    bind:panelEl={sidebarPanelEl}
    content={sidebarContent}
    entries={sidebarEntries}
    isFirst={isFirstSection}
    isLast={isLastSection}
    onNavigate={navigateStep}
  />
</div>
