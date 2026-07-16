<script lang="ts">
  import type { Snippet } from "svelte";
  import { tv } from "tailwind-variants";
  let {
    size = 120,
    orientation = "vertical",
    className = "",
    children,
  }: {
    size?: number;
    orientation?: "vertical" | "horizontal";
    className?: string;
    children?: Snippet;
  } = $props();

  const styles = tv({
    slots: {
      wrapper: "flex justify-center",
      shaft: "flex items-center justify-center bg-[#F7F7F7] p-8",
      tip: "h-0 w-0 border-transparent",
    },
    variants: {
      orientation: {
        vertical: {
          wrapper: "flex-col",
          shaft: "mx-auto -mt-24 h-(--arrow-size) w-120 pt-24",
          tip: "mx-auto border-x-[100px] border-t-[60px] border-t-[#F7F7F7]",
        },
        horizontal: {
          wrapper: "flex-row",
          shaft: "my-auto -ml-24 h-120 w-(--arrow-size) pl-24",
          tip: "my-auto border-y-[100px] border-l-[60px] border-l-[#F7F7F7]",
        },
      },
    },
  });

  const { wrapper, shaft, tip } = $derived(styles({ orientation }));
</script>

<div class={wrapper({ class: className })}>
  <div class={shaft()} style={`--arrow-size: ${size}px`}>
    {#if children}
      <p class="font-bold text-sm text-center">{@render children()}</p>
    {/if}
  </div>
  <div class={tip()}></div>
</div>
