<script lang="ts">
  import mermaid from "mermaid";
  import { onMount } from "svelte";

  // `source` must carry its own Mermaid config (frontmatter): several
  // previews render in parallel, so the global mermaid.initialize() config
  // can't be switched per diagram.
  let { source, id }: { source: string; id: string } = $props();

  // Fits the diagram to the preview's width, but within these zoom limits
  // (relative to its natural size): narrow diagrams don't blow up, wide ones
  // stay legible and get cropped instead.
  const MIN_SCALE = 0.25;
  const MAX_SCALE = 0.35;

  let svg = $state("");

  onMount(() => {
    mermaid.initialize({ startOnLoad: false });
    mermaid.render(id, source).then(({ svg: rendered }) => {
      // The first max-width is the one on the root <svg>, holding its
      // natural width.
      svg = rendered.replace(
        /max-width:\s*([\d.]+)px/,
        (_, width: string) =>
          `width: 100%; min-width: ${Number(width) * MIN_SCALE}px; max-width: ${Number(width) * MAX_SCALE}px`,
      );
    });
  });
</script>

<div class="preview flex items-start justify-center" aria-hidden="true">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- svg comes from mermaid.render() on our own bundled .mmd sources, not user input -->
  {@html svg}
</div>

<style>
  /* Top-aligned at its own aspect ratio; overflow is cropped by the parent. */
  .preview :global(svg) {
    flex: none;
    height: auto;
  }
</style>
