<script lang="ts">
  let {
    count,
    current,
    onSelect,
    label = "Seite dieses Schritts",
  }: {
    /** Total number of pages/steps to show a bubble for. */
    count: number;
    /** Index of the currently active page/step. */
    current: number;
    onSelect: (index: number) => void;
    /** `aria-label` for the surrounding `role="tablist"` group. */
    label?: string;
  } = $props();
</script>

<div class="flex gap-16" role="tablist" aria-label={label}>
  {#each { length: count } as _, i}
    <button
      type="button"
      class={`w-127 h-8 transition-colors ${i === current ? "bg-(--content-color)" : "bg-[#D9D9D9]"}`}
      role="tab"
      aria-selected={i === current}
      aria-label={`Seite ${i + 1} von ${count}`}
      onclick={() => onSelect(i)}
    ></button>
  {/each}
</div>
