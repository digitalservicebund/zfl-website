<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children?: Snippet } = $props();
</script>

<div class="flex justify-center flex-col [--arrow-bg:#F7F7F7]">
  <div
    class="flex items-center justify-center bg-(--arrow-bg) px-8 pb-16 mx-auto -mt-24 w-120 pt-40"
  >
    {#if children}
      <p class="font-bold text-sm text-center">{@render children()}</p>
    {/if}
  </div>
  <div
    class="h-0 w-0 border-transparent mx-auto border-x-100 border-t-60 border-t-(--arrow-bg)"
  ></div>
</div>
