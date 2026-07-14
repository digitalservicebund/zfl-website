<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    minimapWidth = 100,
    contentId = "flow-with-minimap-content",
    children,
  }: {
    minimapWidth?: number;
    contentId?: string;
    children: Snippet;
  } = $props();

  let mainEl: HTMLDivElement | undefined = $state();
  let contentWidth = $state(0);
  let contentHeight = $state(0);

  let scrollRatio = $state(0);
  let viewportRatio = $state(0);

  // Mirrors the scroll-indicator math from the previous React
  // implementation (see _deviceHooks.ts / _SVGWithMinimap.tsx): the
  // indicator's position/size are expressed as a ratio of the tracked
  // element's own height, adjusted for how that height relates to the
  // full page height.
  function updateScrollIndicator() {
    if (!mainEl) return;

    const scrollTop = window.scrollY - mainEl.offsetTop;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;

    const elPageRatio = scrollHeight / mainEl.offsetHeight;
    const ratio = (scrollTop / scrollHeight) * elPageRatio;

    scrollRatio = ratio;
    viewportRatio = (clientHeight / scrollHeight) * elPageRatio;
  }

  $effect(() => {
    updateScrollIndicator();

    window.addEventListener("resize", updateScrollIndicator);
    window.addEventListener("scroll", updateScrollIndicator);

    return () => {
      window.removeEventListener("resize", updateScrollIndicator);
      window.removeEventListener("scroll", updateScrollIndicator);
    };
  });

  const scale = $derived(contentWidth ? minimapWidth / contentWidth : 0);
  const minimapHeight = $derived(contentHeight * scale);

  // Scrolls so that the given position within the minimap (in minimap
  // pixels, relative to its own top) ends up centered in the viewport.
  function scrollToMinimapY(
    minimapY: number,
    behavior: ScrollBehavior = "smooth",
  ) {
    if (!mainEl || !scale) return;

    const targetMainElOffset = minimapY / scale;
    const targetScrollY =
      mainEl.offsetTop + targetMainElOffset - window.innerHeight / 2;

    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior,
    });
  }

  function onMinimapClick(event: MouseEvent) {
    // Ignore clicks that are actually the end of a thumb drag.
    if (isDragging) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    scrollToMinimapY(event.clientY - rect.top);
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
      scrollToMinimapY(moveEvent.clientY - minimapRect.top, "instant");
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

<div class="flex flex-row items-start gap-96">
  <div class="sticky top-40 shrink-0">
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
        style={`width: ${contentWidth}px; transform: scale(${scale});`}
        aria-hidden="true"
        inert
      >
        {@render children()}
      </div>

      <!-- Scroll/viewport indicator (draggable) -->
      <div
        class="absolute inset-x-0 cursor-grab touch-none border border-cosmic-blue-base bg-cosmic-blue-base/20 active:cursor-grabbing"
        style={`top: ${scrollRatio * 100}%; height: ${viewportRatio * 100}%;`}
        onpointerdown={onThumbPointerDown}
        role="scrollbar"
        aria-controls={contentId}
        aria-orientation="vertical"
        aria-valuenow={Math.round(scrollRatio * 100)}
        tabindex="-1"
      ></div>
    </div>
  </div>

  <div
    id={contentId}
    bind:this={mainEl}
    bind:clientWidth={contentWidth}
    bind:clientHeight={contentHeight}
    class="min-w-0 flex-1"
  >
    {@render children()}
  </div>
</div>
