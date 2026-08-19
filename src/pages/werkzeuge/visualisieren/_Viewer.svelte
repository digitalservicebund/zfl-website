<script lang="ts">
  import { tick } from "svelte";
  import { SvelteMap } from "svelte/reactivity";
  import IconZoomIn from "~icons/ic/outline-zoom-in";
  import IconZoomOut from "~icons/ic/outline-zoom-out";
  import IconRestartAlt from "~icons/ic/outline-restart-alt";
  import IconClose from "~icons/ic/outline-close";

  interface Props {
    open: boolean;
    svg: string;
    title?: string;
  }

  let {
    open = $bindable(false),
    svg,
    title = "Visualisierung",
  }: Props = $props();

  const PINCH_SENSITIVITY = 2;
  const WHEEL_ZOOM_SENSITIVITY = 0.012;
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 8;
  const INITIAL_SCALE = 2;
  // Extra scrollable margin around the diagram, as a fraction of its own
  // size on each side, so there's room to freely scroll/drag past its edges.
  const PADDING_RATIO = 0.5;

  let dialogEl: HTMLDialogElement | undefined = $state();
  let canvasEl: HTMLDivElement | undefined = $state();
  let contentEl: HTMLDivElement | undefined = $state();
  let sizerEl: HTMLDivElement | undefined = $state();

  let scale = $state(1);
  // Unscaled size of the diagram, measured once per open/svg so zoom can
  // resize the sizer synchronously instead of round-tripping through the
  // DOM (which raced under fast, repeated pinch/scroll updates).
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
    if (!dialogEl) return;
    if (open) {
      if (!dialogEl.open) dialogEl.showModal();
      resetView();
    } else if (dialogEl.open) {
      dialogEl.close();
    }
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

  async function resetView() {
    scale = 1;
    await tick();
    if (!canvasEl || !contentEl) return;
    // Measured at scale 1, so this rect is the diagram's unscaled size.
    const rect = contentEl.getBoundingClientRect();
    naturalWidth = rect.width;
    naturalHeight = rect.height;
    scale = clampScale(INITIAL_SCALE);
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

  function requestClose() {
    dialogEl?.close();
  }

  function onDialogClick(event: MouseEvent) {
    // A click that lands on the dialog element itself (not a descendant)
    // only happens on the ::backdrop area.
    if (event.target === dialogEl) requestClose();
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

<dialog
  bind:this={dialogEl}
  class="fixed inset-0 m-auto h-[95vh] w-[95vw] max-w-none border-0 bg-transparent p-0 backdrop:bg-black/[0.72]"
  aria-label={title}
  onclick={onDialogClick}
  onclose={() => (open = false)}
>
  <div
    class="relative flex h-full w-full flex-col overflow-hidden rounded bg-white shadow-xl"
  >
    <button
      type="button"
      class="kern-btn kern-btn--secondary kern-btn--only-icon absolute right-16 top-16 z-20"
      onclick={requestClose}
      aria-label="Schließen"
    >
      <IconClose class="text-cosmic-blue-base text-xl" aria-hidden="true" />
    </button>

    <div class="absolute left-16 top-16 z-20 flex flex-col gap-8">
      <button
        type="button"
        class="kern-btn kern-btn--secondary kern-btn--only-icon"
        onclick={zoomIn}
        aria-label="Vergrößern"
      >
        <IconZoomIn class="text-cosmic-blue-base text-xl" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="kern-btn kern-btn--secondary kern-btn--only-icon"
        onclick={zoomOut}
        aria-label="Verkleinern"
      >
        <IconZoomOut class="text-cosmic-blue-base text-xl" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="kern-btn kern-btn--secondary kern-btn--only-icon"
        onclick={resetView}
        aria-label="Zoom zurücksetzen"
      >
        <IconRestartAlt
          class="text-cosmic-blue-base text-xl"
          aria-hidden="true"
        />
      </button>
    </div>

    <div
      bind:this={canvasEl}
      tabindex="0"
      aria-label="Visualisierung, verschiebbar per Ziehen oder Scrollen"
      class="viewer-canvas h-full w-full touch-none select-none overflow-auto bg-lavender-200 [cursor:grab] active:[cursor:grabbing]"
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
</dialog>
