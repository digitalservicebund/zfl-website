<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    size = 120,
    className = "",
    children,
  }: {
    size?: number;
    className?: string;
    children?: Snippet;
  } = $props();

  let rootEl: HTMLDivElement | undefined = $state();

  const wrapperClass = $derived(`flex justify-center flex-col ${className}`);
  const shaftClass =
    "flex items-center justify-center bg-(--arrow-bg) p-8 mx-auto -mt-24 h-(--arrow-size) w-120 pt-24";
  const tipClass =
    "h-0 w-0 border-transparent mx-auto border-x-[100px] border-t-[60px] border-t-(--arrow-bg)";
</script>

<div bind:this={rootEl} class={wrapperClass}>
  <div class={shaftClass} style={`--arrow-size: ${size}px`}>
    {#if children}
      <p class="font-bold text-sm text-center">{@render children()}</p>
    {/if}
  </div>
  <div class={tipClass}></div>
</div>
