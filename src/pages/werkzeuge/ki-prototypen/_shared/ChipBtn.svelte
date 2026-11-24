<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    selected?: boolean;
    onclick: () => void;
    // A plain button instead of a tab, for chips outside a tablist; marks the
    // selection with aria-current, since aria-selected is only valid on tabs
    standalone?: boolean;
    "aria-label"?: string;
  }
  let {
    children,
    selected,
    onclick,
    standalone = false,
    "aria-label": ariaLabel,
  }: Props = $props();
</script>

<button
  type="button"
  role={standalone ? undefined : "tab"}
  {onclick}
  aria-selected={!standalone && selected ? "true" : undefined}
  aria-current={standalone && selected ? "true" : undefined}
  aria-label={ariaLabel}
  data-selected={selected || undefined}
  class="flex items-center rounded-full border border-gray-400 bg-white px-16 py-6 text-sm font-medium transition-colors hover:bg-lavender-200 data-selected:border-cosmic-blue-400 data-selected:bg-cosmic-blue-400 data-selected:font-bold data-selected:text-white data-selected:hover:bg-cosmic-blue-base"
>
  {@render children()}
</button>
