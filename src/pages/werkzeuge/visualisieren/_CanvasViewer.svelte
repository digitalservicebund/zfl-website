<script lang="ts">
  import { tick } from "svelte";
  import { SvelteMap } from "svelte/reactivity";
  import IconZoomIn from "~icons/ic/outline-zoom-in";
  import IconZoomOut from "~icons/ic/outline-zoom-out";
  import IconFitScreen from "~icons/ic/outline-fit-screen";
  import IconRotate from "~icons/ic/outline-rotate-90-degrees-cw";
  import IconFullscreen from "~icons/ic/outline-fullscreen";
  import IconFullscreenExit from "~icons/ic/outline-fullscreen-exit";

  interface Props {
    svg: string;
    title?: string;
    // Shows a button to flip the diagram's direction when provided
    onFlip?: () => void;
    isFullscreen?: boolean;
    // Shows a button to toggle fullscreen mode when provided
    onToggleFullscreen?: () => void;
  }

  let {
    svg,
    title = "Visualisierung",
    onFlip,
    isFullscreen = false,
    onToggleFullscreen,
  }: Props = $props();

  const PINCH_SENSITIVITY = 2;
  const WHEEL_ZOOM_SENSITIVITY = 0.012;
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 8;
  // Upper bound for the initial fit, so small diagrams aren't blown up.
  const MAX_INITIAL_SCALE = 2;
  // Share of the viewport the diagram fills along its fitted axis.
  const FIT_MARGIN = 0.9;
  // Extra scrollable margin around the diagram, as a fraction of its own
  // size on each side, so there's room to freely scroll/drag past its edges.
  const PADDING_RATIO = 0.5;

  let canvasEl: HTMLDivElement | undefined = $state();
  let contentEl: HTMLDivElement | undefined = $state();
  let sizerEl: HTMLDivElement | undefined = $state();

  let scale = $state(1);
  // Unscaled size of the diagram, measured once per svg so zoom can resize
  // the sizer synchronously instead of round-tripping through the DOM
  // (which raced under fast, repeated pinch/scroll updates).
  let naturalWidth = 0;
  let naturalHeight = 0;

  let dragOrigin: {
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
  } | null = null;
  const pointers = new SvelteMap<number, { x: number; y: number }>();
  let pinchDistance: number | null = null;

  $effect(() => {
    if (svg) resetView();
  });

  // Computes the sizer's dimensions for a given scale, along with the
  // content's (unpadded) dimensions at that scale. Compared against the
  // viewport size: otherwise, whenever the (padded) diagram is smaller than
  // the viewport, min-w-full/min-h-full below would clamp the sizer down to
  // exactly the viewport size, silently discarding the padding and leaving
  // no room to drag/scroll. That clamp means the sizer doesn't always scale
  // proportionally with `forScale` (it's capped at the viewport size), so
  // zoomAt below reasons in terms of these actual dimensions rather than
  // assuming a fixed ratio between old and new scale.
  function sizerDimensions(forScale: number) {
    if (!canvasEl) {
      return { contentWidth: 0, contentHeight: 0, width: 0, height: 0 };
    }
    const paddingMultiplier = 1 + 2 * PADDING_RATIO;
    const contentWidth = naturalWidth * forScale;
    const contentHeight = naturalHeight * forScale;
    return {
      contentWidth,
      contentHeight,
      width: Math.max(contentWidth, canvasEl.clientWidth) * paddingMultiplier,
      height:
        Math.max(contentHeight, canvasEl.clientHeight) * paddingMultiplier,
    };
  }

  // Resizes the sizer directly (bypassing Svelte's reactive DOM flush) so
  // zoomAt can apply it synchronously, in the same tick as the scroll
  // correction below. Without this, fast repeated pinch/wheel updates could
  // race: a later call would read scroll state before an earlier call's
  // (async) correction had landed, making the zoom drift off the cursor.
  function applySizer(forScale: number) {
    if (!sizerEl) return;
    const { width, height } = sizerDimensions(forScale);
    sizerEl.style.width = `${width}px`;
    sizerEl.style.height = `${height}px`;
  }

  function centerScroll() {
    if (!canvasEl) return;
    canvasEl.scrollLeft = (canvasEl.scrollWidth - canvasEl.clientWidth) / 2;
    canvasEl.scrollTop = (canvasEl.scrollHeight - canvasEl.clientHeight) / 2;
  }

  // Mermaid renders its SVG with width="100%" and a max-width of its natural
  // width, so a diagram wider than the viewport (typically LR) gets squeezed
  // to the viewport width, making it look much smaller than a TD one at the
  // same scale. Pinning the SVG to its natural (viewBox) size makes scale
  // mean the same for every diagram.
  function pinSvgSize() {
    const svgEl = contentEl?.querySelector("svg");
    if (!svgEl) return;
    const { width, height } = svgEl.viewBox.baseVal;
    if (!width || !height) return;
    svgEl.style.maxWidth = "none";
    svgEl.setAttribute("width", `${width}`);
    svgEl.setAttribute("height", `${height}`);
  }

  // Fits the diagram's cross axis to the viewport (width for tall TD
  // diagrams, height for wide LR ones), leaving the flow direction to
  // scroll through. Fitting both axes would shrink long diagrams to an
  // unreadable size.
  function initialScale(): number {
    if (!canvasEl || naturalWidth === 0 || naturalHeight === 0) return 1;
    const fitWidth = canvasEl.clientWidth / naturalWidth;
    const fitHeight = canvasEl.clientHeight / naturalHeight;
    return Math.min(
      Math.max(fitWidth, fitHeight) * FIT_MARGIN,
      MAX_INITIAL_SCALE,
    );
  }

  async function resetView() {
    scale = 1;
    await tick();
    if (!canvasEl || !contentEl) return;
    pinSvgSize();
    // Measured at scale 1, so this rect is the diagram's unscaled size.
    const rect = contentEl.getBoundingClientRect();
    naturalWidth = rect.width;
    naturalHeight = rect.height;
    scale = clampScale(initialScale());
    applySizer(scale);
    await tick();
    centerScroll();
  }

  function clampScale(value: number): number {
    return Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
  }

  // Zooms while keeping the content point under (clientX, clientY) fixed on
  // screen.
  function zoomAt(factor: number, clientX: number, clientY: number) {
    if (!canvasEl || naturalWidth === 0) return;
    const newScale = clampScale(scale * factor);
    if (newScale === scale) return;

    const rect = canvasEl.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    // Find which fraction of the (unpadded) content sits under the cursor,
    // in terms of the sizer's current geometry, then place that same
    // fraction under the cursor again using the new geometry. The sizer's
    // size isn't always proportional to scale (see sizerDimensions), so
    // this can't be done with a single scale factor applied to the scroll
    // offset directly.
    const before = sizerDimensions(scale);
    const beforeLeft = (before.width - before.contentWidth) / 2;
    const beforeTop = (before.height - before.contentHeight) / 2;
    const fracX =
      (canvasEl.scrollLeft + localX - beforeLeft) / before.contentWidth;
    const fracY =
      (canvasEl.scrollTop + localY - beforeTop) / before.contentHeight;

    const after = sizerDimensions(newScale);
    const afterLeft = (after.width - after.contentWidth) / 2;
    const afterTop = (after.height - after.contentHeight) / 2;

    scale = newScale;
    applySizer(newScale);
    canvasEl.scrollLeft = afterLeft + fracX * after.contentWidth - localX;
    canvasEl.scrollTop = afterTop + fracY * after.contentHeight - localY;
  }

  function viewerCenter(): { x: number; y: number } {
    if (!canvasEl) return { x: 0, y: 0 };
    const rect = canvasEl.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function zoomIn() {
    const { x, y } = viewerCenter();
    zoomAt(1.25, x, y);
  }

  function zoomOut() {
    const { x, y } = viewerCenter();
    zoomAt(0.8, x, y);
  }

  function distance(
    a: { x: number; y: number },
    b: { x: number; y: number },
  ): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function midpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function onPointerDown(event: PointerEvent) {
    // Let clicks on links inside the SVG through untouched
    if ((event.target as HTMLElement).closest("a")) return;

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 2) {
      dragOrigin = null;
      const [a, b] = pointers.values();
      pinchDistance = distance(a, b);
    } else if (canvasEl) {
      dragOrigin = {
        x: event.clientX,
        y: event.clientY,
        scrollLeft: canvasEl.scrollLeft,
        scrollTop: canvasEl.scrollTop,
      };
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 2) {
      const [a, b] = pointers.values();
      const dist = distance(a, b);
      const mid = midpoint(a, b);
      if (pinchDistance) {
        const ratio = dist / pinchDistance;
        const dampedFactor = 1 + (ratio - 1) * PINCH_SENSITIVITY;
        zoomAt(dampedFactor, mid.x, mid.y);
      }
      pinchDistance = dist;
      return;
    }

    if (dragOrigin && canvasEl) {
      canvasEl.scrollLeft =
        dragOrigin.scrollLeft - (event.clientX - dragOrigin.x);
      canvasEl.scrollTop =
        dragOrigin.scrollTop - (event.clientY - dragOrigin.y);
    }
  }

  function onPointerUp(event: PointerEvent) {
    pointers.delete(event.pointerId);
    pinchDistance = null;
    if (pointers.size === 1 && canvasEl) {
      const [p] = pointers.values();
      dragOrigin = {
        x: p.x,
        y: p.y,
        scrollLeft: canvasEl.scrollLeft,
        scrollTop: canvasEl.scrollTop,
      };
    } else {
      dragOrigin = null;
    }
  }

  // Plain wheel/trackpad scroll is left alone so the browser scrolls the
  // canvas natively (both axes). Only Ctrl+wheel (trackpad pinch reports as
  // this) zooms.
  function onWheel(event: WheelEvent) {
    if (!event.ctrlKey) return;
    event.preventDefault();
    const factor = Math.exp(-event.deltaY * WHEEL_ZOOM_SENSITIVITY);
    zoomAt(factor, event.clientX, event.clientY);
  }
</script>

<!-- Visual-only label: screen readers get the button's aria-label instead -->
{#snippet tooltip(label: string)}
  <span
    aria-hidden="true"
    class="pointer-events-none absolute left-full top-1/2 ml-8 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-8 py-4 text-sm text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
  >
    {label}
  </span>
{/snippet}

<div class="relative flex h-full w-full flex-col overflow-hidden">
  <div class="absolute left-16 top-16 z-20 flex flex-col gap-8">
    {#if onToggleFullscreen}
      <button
        type="button"
        class="group kern-btn kern-btn--secondary kern-btn--only-icon"
        onclick={onToggleFullscreen}
        aria-label={isFullscreen ? "Vollbild beenden" : "Vollbild"}
      >
        {#if isFullscreen}
          <IconFullscreenExit
            class="text-cosmic-blue-base text-xl"
            aria-hidden="true"
          />
        {:else}
          <IconFullscreen
            class="text-cosmic-blue-base text-xl"
            aria-hidden="true"
          />
        {/if}
        {@render tooltip(isFullscreen ? "Vollbild beenden" : "Vollbild")}
      </button>
    {/if}
    <button
      type="button"
      class="group kern-btn kern-btn--secondary kern-btn--only-icon"
      onclick={zoomIn}
      aria-label="Vergrößern"
    >
      <IconZoomIn class="text-cosmic-blue-base text-xl" aria-hidden="true" />
      {@render tooltip("Vergrößern")}
    </button>
    <button
      type="button"
      class="group kern-btn kern-btn--secondary kern-btn--only-icon"
      onclick={zoomOut}
      aria-label="Verkleinern"
    >
      <IconZoomOut class="text-cosmic-blue-base text-xl" aria-hidden="true" />
      {@render tooltip("Verkleinern")}
    </button>
    <button
      type="button"
      class="group kern-btn kern-btn--secondary kern-btn--only-icon"
      onclick={resetView}
      aria-label="Zoom zurücksetzen"
    >
      <IconFitScreen class="text-cosmic-blue-base text-xl" aria-hidden="true" />
      {@render tooltip("Zoom zurücksetzen")}
    </button>
    {#if onFlip}
      <button
        type="button"
        class="group kern-btn kern-btn--secondary kern-btn--only-icon"
        onclick={onFlip}
        aria-label="Ausrichtung wechseln"
      >
        <IconRotate class="text-cosmic-blue-base text-xl" aria-hidden="true" />
        {@render tooltip("Ausrichtung wechseln")}
      </button>
    {/if}
  </div>

  <div
    bind:this={canvasEl}
    tabindex="0"
    aria-label={`${title}, verschiebbar per Ziehen oder Scrollen`}
    class="viewer-canvas h-full w-full touch-none select-none overflow-auto [cursor:grab] active:[cursor:grabbing]"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    onwheel={onWheel}
  >
    <div
      bind:this={sizerEl}
      class="flex min-h-full min-w-full items-center justify-center"
    >
      <div
        bind:this={contentEl}
        class="inline-block"
        style={`transform: scale(${scale}); transform-origin: center;`}
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- svg comes from mermaid.render() on our own bundled .mmd sources, not user input -->
        {@html svg}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "@/styles/global.css";
  button {
    @apply hover:bg-lavender-200 border-none bg-white shadow-md;
  }
</style>
