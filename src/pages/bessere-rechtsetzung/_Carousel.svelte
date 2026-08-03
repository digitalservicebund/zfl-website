<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";
  import Stepper from "./_Stepper.svelte";
  import IconPrev from "~icons/ic/round-arrow-back";
  import IconNext from "~icons/ic/round-arrow-forward";

  let { items, className }: { items: Snippet[]; className?: string } = $props();

  let current = $state(0);
  let container: HTMLDivElement | undefined = $state();
  let scrollEndTimeout: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    const target = container?.children[current] as HTMLElement | undefined;
    container?.scrollTo({ left: target?.offsetLeft ?? 0, behavior: "smooth" });
  });

  function handleScroll() {
    if (!container) return;
    // Debounce: only sync `current` once scrolling has settled, otherwise the
    // scroll events fired mid-animation fight the $effect's own scrollTo above.
    clearTimeout(scrollEndTimeout);
    const el = container;
    scrollEndTimeout = setTimeout(() => {
      const children = [...el.children] as HTMLElement[];
      const index = children.reduce(
        (closest, child, i) =>
          Math.abs(child.offsetLeft - el.scrollLeft) <
          Math.abs(children[closest].offsetLeft - el.scrollLeft)
            ? i
            : closest,
        0,
      );
      if (index !== current) current = index;
    }, 100);
  }
</script>

<div class={twMerge("flex flex-col gap-24", className)}>
  <div
    bind:this={container}
    onscroll={handleScroll}
    class="scrollbar-none flex snap-x snap-mandatory gap-24 overflow-x-auto"
  >
    {#each items as item}
      <div class="w-full shrink-0 snap-center">
        {@render item()}
      </div>
    {/each}
  </div>
  <div class="flex justify-between">
    <div class="flex gap-24">
      <button
        class="rounded-full bg-[#D9D9D9] p-2"
        onclick={() => (current = (current - 1 + items.length) % items.length)}
        ><IconPrev /></button
      >
      <button
        class="rounded-full bg-[#D9D9D9] p-2"
        onclick={() => (current = (current + 1) % items.length)}
        ><IconNext /></button
      >
    </div>
    <Stepper
      count={items.length}
      {current}
      onSelect={(i) => (current = i)}
      className="max-w-200"
    />
  </div>
</div>
