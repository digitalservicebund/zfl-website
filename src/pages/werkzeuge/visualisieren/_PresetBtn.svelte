<script lang="ts">
  import type { Component, Snippet } from "svelte";

  interface Props {
    title?: string;
    children?: Snippet;
    icon?: Component<{ class?: string }>;
    active?: boolean;
    /** Renders the icon smaller and in line before the title/content. */
    inline?: boolean;
    onclick: () => void;
  }
  let {
    title,
    children,
    icon: Icon,
    active,
    inline = false,
    onclick,
  }: Props = $props();
</script>

<button
  class="rounded-sm border border-(--kern-color-decorative-border-contextual) aria-current:bg-lavender-400 hover:bg-lavender-200 p-16 flex justify-start text-left {inline
    ? 'flex-row items-center gap-8'
    : 'flex-col items-start gap-8'}"
  aria-current={active ? "true" : undefined}
  onclick={() => onclick()}
>
  <div class="flex gap-16 items-center">
    {#if Icon}
      <Icon
        class="{inline ? 'size-24' : 'size-32'} shrink-0 text-cosmic-blue-400"
      />
    {/if}
    {#if title}
      <strong>{title}</strong>
    {/if}
  </div>
  {@render children?.()}
</button>
