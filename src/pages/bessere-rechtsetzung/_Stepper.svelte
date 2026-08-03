<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let {
    count,
    current,
    onSelect,
    label = "Seite dieses Schritts",
    className,
  }: {
    /** Total number of pages/steps to show a bubble for. */
    count: number;
    /** Index of the currently active page/step. */
    current: number;
    onSelect: (index: number) => void;
    /** `aria-label` for the surrounding `role="tablist"` group. */
    label?: string;
    className?: string;
  } = $props();
</script>

<div
  class={twMerge("w-full flex gap-16", className)}
  role="tablist"
  aria-label={label}
>
  {#each { length: count } as _, i}
    <button
      type="button"
      class={`w-full max-w-127 h-8 transition-colors ${i === current ? "bg-(--content-color)" : "bg-[#D9D9D9]"}`}
      role="tab"
      aria-selected={i === current}
      aria-label={`Seite ${i + 1} von ${count}`}
      onclick={() => onSelect(i)}
    ></button>
  {/each}
</div>
