<script lang="ts">
  import { loadPreviewSource } from "./_previewSource.ts";
  import { cachedPreview, renderPreview } from "./_previewRenderer.ts";

  let { short, filename }: { short: string; filename: string } = $props();

  const key = $derived(`${short}/${filename}`);
  let svg = $derived(cachedPreview(key));
  let container: HTMLDivElement;

  // Only renders once the preview (nearly) scrolls into view.
  $effect(() => {
    if (svg) return;
    const controller = new AbortController();
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        renderPreview(
          key,
          () => loadPreviewSource(short, filename),
          controller.signal,
        )
          .then((rendered) => {
            if (rendered) svg = rendered;
          })
          .catch((error: unknown) => {
            console.error(`Preview of ${key} failed`, error);
          });
      },
      { rootMargin: "200px" },
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  });
</script>

<div
  bind:this={container}
  class="preview flex h-full items-start justify-center"
  aria-hidden="true"
>
  {#if svg}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- svg comes from mermaid.render() on our own bundled .mmd sources, not user input -->
    {@html svg}
  {/if}
</div>

<style>
  /* Top-aligned at its own aspect ratio; overflow is cropped by the parent. */
  .preview :global(svg) {
    flex: none;
    height: auto;
  }
</style>
