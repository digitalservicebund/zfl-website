<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import FlowSidebar from "./_FlowSidebar.svelte";
  import {
    FLOW_SIDEBAR_CONTEXT_NAME,
    FLOW_SIDEBAR_STEP_PARAM,
    type FlowSidebarContent,
  } from "./_flowSidebar";

  let {
    orientation = "vertical",
    minimapSize = 100,
    contentId = "flow-with-minimap-content",
    children,
  }: {
    /** Direction the content scrolls/grows in. */
    orientation?: "vertical" | "horizontal";
    /** Fixed cross-axis size of the minimap in px (width when vertical, height when horizontal). */
    minimapSize?: number;
    contentId?: string;
    children: Snippet;
  } = $props();

  const isVertical = $derived(orientation === "vertical");

  // Every bubble/cluster registers its content here as soon as it mounts
  // (regardless of whether it's ever clicked), so the sidebar can show a
  // step straight from a shared `?step=` link or via the browser
  // back/forward buttons.
  let registry = $state<Record<string, FlowSidebarContent>>({});
  let activeId = $state<string | null>(null);

  const sidebarContent = $derived(
    activeId ? (registry[activeId] ?? null) : null,
  );

  function register(entry: FlowSidebarContent) {
    registry[entry.id] = entry;
  }

  function unregister(id: string) {
    delete registry[id];
  }

  function readStepFromUrl(): string | null {
    return new URLSearchParams(location.search).get(FLOW_SIDEBAR_STEP_PARAM);
  }

  // Pushes a new history entry reflecting the current `activeId`, so the
  // sidebar state is shareable via URL and the back/forward buttons step
  // through opened/closed bubbles.
  function syncUrl() {
    const url = new URL(location.href);
    if (activeId) {
      url.searchParams.set(FLOW_SIDEBAR_STEP_PARAM, activeId);
    } else {
      url.searchParams.delete(FLOW_SIDEBAR_STEP_PARAM);
    }
    history.pushState(history.state, "", url);
  }

  function toggle(next: FlowSidebarContent) {
    register(next);
    activeId = activeId === next.id ? null : next.id;
    syncUrl();
  }

  function closeSidebar() {
    activeId = null;
    syncUrl();
  }

  // Ids of all currently registered Cluster steps, in registration order
  // (which follows page/DOM order), used to cycle "Zurück"/"Weiter" through
  // cluster steps only - Bubbles don't participate in this sequence.
  const clusterIds = $derived(
    Object.values(registry)
      .filter((entry) => entry.kind === "cluster")
      .map((entry) => entry.id),
  );

  function navigateCluster(step: -1 | 1) {
    if (
      !sidebarContent ||
      sidebarContent.kind !== "cluster" ||
      clusterIds.length === 0
    ) {
      return;
    }

    const currentIndex = clusterIds.indexOf(sidebarContent.id);
    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + step + clusterIds.length) % clusterIds.length;
    const nextId = clusterIds[nextIndex];
    const nextContent = registry[nextId];
    if (!nextContent) return;

    activeId = nextContent.id;
    syncUrl();
  }

  $effect(() => {
    // Open straight from a shared link on first render. Bubbles register
    // themselves synchronously during their own setup, so by the time this
    // effect runs, the registry already reflects everything currently
    // rendered - but `sidebarContent` above re-derives from `registry` on
    // every change anyway, so this is safe even if ordering ever changed.
    activeId = readStepFromUrl();

    function onPopState() {
      activeId = readStepFromUrl();
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  });

  setContext(FLOW_SIDEBAR_CONTEXT_NAME, {
    get activeId() {
      return activeId;
    },
    register,
    unregister,
    toggle,
    close: closeSidebar,
  });

  // Removes `id` attributes from the minimap clone so it never collides
  // with (and steals native `#hash` navigation from) the real, matching
  // IDs rendered in the actual content further below.
  function stripIds(node: HTMLElement) {
    node.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  }

  let mainEl: HTMLDivElement | undefined = $state();
  // The content is rendered a second time inside a non-clipping wrapper
  // purely so we can measure its natural, unscrolled size (bind:clientWidth/
  // clientHeight on the scroll container itself would only report the
  // clipped viewport size once it becomes scrollable).
  let contentWidth = $state(0);
  let contentHeight = $state(0);

  let scrollRatio = $state(0);
  let viewportRatio = $state(0);

  // Vertical mode relies on the whole page scrolling: the content simply
  // flows to its natural height and we track window scroll relative to
  // the page. Horizontal mode instead needs an internally scrollable
  // container (mainEl itself) so that page chrome like header/footer stays
  // put while only the flow content scrolls sideways - so we track the
  // element's own scroll position directly instead.
  function updateScrollIndicator() {
    if (!mainEl) return;

    if (isVertical) {
      const scrollTop = window.scrollY - mainEl.offsetTop;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = window.innerHeight;

      const elPageRatio = scrollHeight / mainEl.offsetHeight;
      scrollRatio = (scrollTop / scrollHeight) * elPageRatio;
      viewportRatio = (clientHeight / scrollHeight) * elPageRatio;
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = mainEl;

      scrollRatio = scrollWidth ? scrollLeft / scrollWidth : 0;
      viewportRatio = scrollWidth ? clientWidth / scrollWidth : 0;
    }
  }

  $effect(() => {
    updateScrollIndicator();

    const el = mainEl;
    if (isVertical) {
      window.addEventListener("resize", updateScrollIndicator);
      window.addEventListener("scroll", updateScrollIndicator);

      return () => {
        window.removeEventListener("resize", updateScrollIndicator);
        window.removeEventListener("scroll", updateScrollIndicator);
      };
    }

    window.addEventListener("resize", updateScrollIndicator);
    el?.addEventListener("scroll", updateScrollIndicator);

    return () => {
      window.removeEventListener("resize", updateScrollIndicator);
      el?.removeEventListener("scroll", updateScrollIndicator);
    };
  });

  // The content's intrinsic size can change after mount (fonts, images,
  // dynamic content) independently of any scroll/resize event - refresh
  // the indicator whenever our measured size changes too.
  $effect(() => {
    contentWidth;
    contentHeight;
    updateScrollIndicator();
  });

  // Along the scroll axis, the minimap replica spans the full (scaled)
  // content size; along the cross axis, it's pinned to minimapSize.
  const scale = $derived(
    isVertical
      ? contentWidth
        ? minimapSize / contentWidth
        : 0
      : contentHeight
        ? minimapSize / contentHeight
        : 0,
  );
  const minimapWidth = $derived(
    isVertical ? minimapSize : contentWidth * scale,
  );
  const minimapHeight = $derived(
    isVertical ? contentHeight * scale : minimapSize,
  );

  // Scrolls so that the given position within the minimap (in minimap
  // pixels, relative to its own top/left) ends up centered in the viewport.
  function scrollToMinimapOffset(
    minimapOffset: number,
    behavior: ScrollBehavior = "smooth",
  ) {
    if (!mainEl || !scale) return;

    const targetMainElOffset = minimapOffset / scale;

    if (isVertical) {
      const targetScrollY =
        mainEl.offsetTop + targetMainElOffset - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, targetScrollY), behavior });
    } else {
      const targetScrollX = targetMainElOffset - mainEl.clientWidth / 2;
      mainEl.scrollTo({ left: Math.max(0, targetScrollX), behavior });
    }
  }

  function onMinimapClick(event: MouseEvent) {
    // Ignore clicks that are actually the end of a thumb drag.
    if (isDragging) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    scrollToMinimapOffset(
      isVertical ? event.clientY - rect.top : event.clientX - rect.left,
    );
  }

  let isDragging = false;

  function onThumbPointerDown(event: PointerEvent) {
    isDragging = true;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);

    const minimapRect = (
      event.currentTarget as HTMLElement
    ).parentElement!.getBoundingClientRect();

    const onPointerMove = (moveEvent: PointerEvent) => {
      // "smooth" scrolling queues up and lags behind fast pointer moves;
      // jump instantly while actively dragging for a responsive feel.
      const offset = isVertical
        ? moveEvent.clientY - minimapRect.top
        : moveEvent.clientX - minimapRect.left;
      scrollToMinimapOffset(offset, "instant");
    };

    const onPointerUp = () => {
      // Delay resetting so the subsequent synthetic click on the minimap
      // background (if any) is still suppressed.
      requestAnimationFrame(() => {
        isDragging = false;
      });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }
</script>

<div class="grid grid-cols-1 items-start gap-24 lg:grid-cols-[1fr_auto]">
  <div class="grid min-w-0">
    <div
      class={`sticky z-20 col-start-1 row-start-1 h-fit w-fit rounded-md shadow-md ${
        isVertical
          ? "top-40 mb-40 left-16 xl:left-40 self-start justify-self-start"
          : "bottom-20 self-end justify-self-center"
      }`}
    >
      <div
        class="relative cursor-pointer overflow-hidden rounded-md border border-lavender-400"
        style={`width: ${minimapWidth}px; height: ${minimapHeight}px;`}
        onclick={onMinimapClick}
        role="presentation"
      >
        <!-- Live, scaled-down clone of the main content. Since our bubbles
           are real DOM (not a static image), we render the same content
           a second time and shrink it with a CSS transform; it's
           non-interactive and hidden from assistive tech. -->
        <div
          class="pointer-events-none absolute top-0 left-0 origin-top-left"
          style={isVertical
            ? `width: ${contentWidth}px; transform: scale(${scale});`
            : `height: ${contentHeight}px; transform: scale(${scale});`}
          aria-hidden="true"
          inert
        >
          <!--
          This is a visual-only clone of the content used to render the
          minimap. Rendering the snippet twice would duplicate any element
          IDs used for in-page anchors (e.g. cluster heading IDs), which
          breaks native `#hash` navigation since the browser targets the
          first (this hidden, inert) match in DOM order. Strip all IDs from
          the clone so only the real content below remains addressable.
        -->
          <div use:stripIds>
            {@render children()}
          </div>
        </div>

        <!-- Scroll/viewport indicator (draggable) -->
        <div
          class={`cursor-grab touch-none border border-cosmic-blue-base bg-cosmic-blue-base/20 ${isVertical ? "absolute inset-x-0" : "absolute inset-y-0"}`}
          style={isVertical
            ? `top: ${scrollRatio * 100}%; height: ${viewportRatio * 100}%;`
            : `left: ${scrollRatio * 100}%; width: ${viewportRatio * 100}%;`}
          onpointerdown={onThumbPointerDown}
          role="scrollbar"
          aria-controls={contentId}
          aria-orientation={orientation}
          aria-valuenow={Math.round(scrollRatio * 100)}
          tabindex="-1"
        ></div>
      </div>
    </div>

    <div
      id={contentId}
      bind:this={mainEl}
      class={`col-start-1 row-start-1 min-w-0 max-w-screen ${isVertical ? "" : "overflow-x-auto scrollbar-none"}`}
    >
      <!-- Shrink-wrapping measurement wrapper: reports the content's natural,
         unclipped size even once the parent becomes a scroll container. -->
      <div
        class="inline-block align-top"
        bind:clientWidth={contentWidth}
        bind:clientHeight={contentHeight}
      >
        {@render children()}
      </div>
    </div>
  </div>

  <FlowSidebar
    content={sidebarContent}
    onClose={closeSidebar}
    onNavigateCluster={navigateCluster}
  />
</div>
