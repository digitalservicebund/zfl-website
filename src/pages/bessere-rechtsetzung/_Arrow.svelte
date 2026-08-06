<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    size = 120,
    className = "",
    children,
    color,
  }: {
    size?: number;
    className?: string;
    children?: Snippet;
    color?: string;
  } = $props();

  let rootEl: HTMLDivElement | undefined = $state();

  const wrapperClass = $derived(`flex justify-center flex-col ${className}`);
  const shaftClass =
    "flex items-center justify-center bg-(--arrow-bg) p-8 mx-auto -mt-24 h-(--arrow-size) w-120 pt-24";
  const tipClass =
    "h-0 w-0 border-transparent mx-auto border-x-[100px] border-t-[60px] border-t-(--arrow-bg)";
</script>

<div
  bind:this={rootEl}
  class={wrapperClass}
  style={`--arrow-color: color-mix(in srgb, ${color} 20%, white); --arrow-bg: #F7F7F7`}
>
  <div class={shaftClass} style={`--arrow-size: ${size}px`}>
    {#if children}
      <p class="font-bold text-sm text-center">{@render children()}</p>
    {/if}
  </div>
  <div class={tipClass}></div>
</div>
