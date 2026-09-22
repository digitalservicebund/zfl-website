<script lang="ts">
  import type { Component, Snippet } from "svelte";

  interface Props {
    title?: string;
    children?: Snippet;
    icon?: Component<{ class?: string }>;
    active?: boolean;
    onclick: () => void;
  }
  let { title, children, icon: Icon, active, onclick }: Props = $props();
</script>

<button
  class="rounded-sm border border-(--kern-color-decorative-border-contextual) aria-current:bg-lavender-400 hover:bg-lavender-200 p-16 flex flex-col items-start justify-start gap-16 text-left"
  aria-current={active ? "true" : undefined}
  onclick={() => onclick()}
>
  {#if Icon}
    <Icon class="size-32 text-cosmic-blue-400" />
  {/if}
  {#if title}
    <strong>{title}</strong>
  {/if}
  {@render children?.()}
</button>
