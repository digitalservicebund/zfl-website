<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    anchorName,
    id,
    children,
  }: {
    /** CSS anchor name (e.g. "--bubble-anchor-c0") of the bubble circle
     * this tooltip belongs to, set via the `anchor-name` property. Used to
     * position the tooltip above that circle via CSS anchor positioning,
     * see https://www.joshwcomeau.com/css/anchor-positioning/ */
    anchorName: string;
    id: string;
    children: Snippet;
  } = $props();

  // Positions the tooltip above its anchor's top edge, horizontally
  // centered on it, using CSS anchor positioning instead of JS measuring.
  // `fixed` (rather than `absolute`) is required so the browser can place
  // the tooltip anywhere in the viewport regardless of its containing
  // block, matching how anchor positioning is meant to be used.
  const style = $derived(`position-anchor: ${anchorName};`);
</script>

<div
  data-bubble-tooltip
  {id}
  role="tooltip"
  class="pointer-events-none z-90 py-8"
  {style}
>
  <div class="bg-white w-300 text-left text-sm px-8">
    {@render children()}
  </div>
</div>

<style>
  /* The minimap in `_FlowWithMinimap.svelte` renders a second, `inert`
     clone of the whole flow purely to visualize it at a smaller scale.
     That clone's tooltips are anchor-positioned via `position: fixed`,
     which escapes the clone's scale transform and would otherwise render
     at full size on top of the real content - so hide any tooltip found
     within an inert ancestor via plain CSS, independent of the clone's
     own (JS-driven) cleanup. */
  :global([inert] [data-bubble-tooltip]) {
    display: none;
  }

  /* Speech-bubble shape: a rounded rectangle with a small triangular tail
     pointing down at the anchored bubble below it, drawn via `border-shape`
     (falling back to an equivalent `clip-path` in browsers that don't
     support it yet, which just clips the box without adding a real
     stroke around the tail). Adapted from
     https://www.joshwcomeau.com/css/anchor-positioning/ */
  div[data-bubble-tooltip] {
    box-sizing: border-box;
    --r: 6px;
    --ap: 50%;
    --ah: 8px;
    --aw: 8px;

    container-type: anchored;
    position: fixed;
    position-area: top center;
    position-try-fallbacks: bottom;
  }

  div[data-bubble-tooltip] > div {
    border-width: 1px;
    border-style: solid;
    border-color: black;

    /* Compensates for the tail's height, so it doesn't overlap the text. */
    padding-bottom: calc(var(--ah) + 0.25rem);
    padding-top: 0.25rem;

    --downwards-caret: shape(
      from var(--r) 0,
      hline to calc(100% - var(--r)),
      curve to right var(--r) with right top,
      vline to calc(100% - (var(--r) + var(--ah))),
      curve to calc(100% - var(--r)) calc(100% - var(--ah)) with right
        calc(100% - var(--ah)),
      hline to calc(var(--ap) + var(--aw)),
      line by calc(var(--aw) * -1) var(--ah),
      line by calc(var(--aw) * -1) calc(var(--ah) * -1),
      hline to var(--r),
      curve to left calc(100% - (var(--r) + var(--ah))) with left
        calc(100% - var(--ah)),
      vline to var(--r),
      curve to var(--r) top with left top
    );
    --upwards-caret: shape(
      from var(--r) var(--ah),
      hline to calc(var(--ap) - var(--aw)),
      line by var(--aw) calc(var(--ah) * -1),
      line by var(--aw) var(--ah),
      hline to calc(100% - var(--r)),
      curve to right calc(var(--ah) + var(--r)) with right calc(var(--ah)),
      vline to calc(100% - var(--r)),
      curve to calc(100% - var(--r)) bottom with right bottom,
      hline to var(--r),
      curve to left calc(100% - var(--r)) with left bottom,
      vline to calc(var(--ah) + var(--r)),
      curve to var(--r) var(--ah) with left var(--ah)
    );

    border-shape: var(--downwards-caret);

    @container anchored(fallback: bottom) {
      padding-bottom: 0.25rem;
      padding-top: calc(var(--ah) + 0.25rem);
      border-shape: var(--upwards-caret);
    }

    /* Fallback styles for browsers that don’t support "border-shape": */
    @supports not (border-shape: shape(from 0 0, hline to 100%)) {
      clip-path: var(--downwards-caret);
      @container anchored(fallback: bottom) {
        clip-path: var(--upwards-caret);
      }
    }
  }
</style>
