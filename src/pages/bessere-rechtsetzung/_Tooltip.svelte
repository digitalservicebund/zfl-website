<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    /** CSS anchor name (e.g. "--bubble-anchor-c0") of the bubble circle
     * this tooltip belongs to */
    anchorName: string;
    id: string;
    children: Snippet;
  }

  let { anchorName, id, children }: Props = $props();
</script>

<div
  data-bubble-tooltip
  {id}
  role="tooltip"
  class="pointer-events-none z-90 py-8"
  style={`position-anchor: ${anchorName};`}
>
  <div class="bg-white w-300 text-left text-sm px-8">
    {@render children()}
  </div>
</div>

<style>
  /* Speech-bubble shape, adapted from https://www.joshwcomeau.com/css/anchor-positioning/ */
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
