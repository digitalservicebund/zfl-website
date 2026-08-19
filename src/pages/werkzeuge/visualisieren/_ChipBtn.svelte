<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    selected?: boolean;
    onclick: () => void;
  }
  let { children, selected, onclick }: Props = $props();
</script>

<button
  role="tab"
  {onclick}
  aria-selected={selected ? "true" : undefined}
  class="flex items-center rounded-full border border-gray-400 bg-white px-16 py-6 text-sm font-medium transition-colors hover:bg-lavender-200 aria-selected:border-cosmic-blue-400 aria-selected:bg-cosmic-blue-400 aria-selected:font-bold aria-selected:text-white aria-selected:hover:bg-cosmic-blue-base"
>
  {@render children()}
</button>
