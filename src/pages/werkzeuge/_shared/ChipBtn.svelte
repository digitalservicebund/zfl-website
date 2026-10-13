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
  class="flex min-h-32 items-center rounded-full border border-(--kern-color-action-default) bg-white px-16 py-2 text-base/24 font-semibold text-(--kern-color-action-default) transition-colors hover:bg-(--kern-color-action-state-indicator-tint-hover-opacity) data-selected:bg-(--kern-color-action-default) data-selected:text-(--kern-color-action-on-default) data-selected:hover:bg-(--kern-color-action-state-indicator-shade-hover)"
>
  {@render children()}
</button>
