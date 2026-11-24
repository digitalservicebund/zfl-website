<script lang="ts">
  import { fade } from "svelte/transition";

  let { message }: { message: string } = $props();
</script>

<div class="flex flex-col items-center gap-16 p-32">
  <div class="kern-loader kern-loader--visible" role="status">
    <span class="kern-sr-only">Wird geladen…</span>
  </div>
  <p class="text-cosmic-blue-base" aria-live="polite">
    {#key message}
      <span class="inline-block animate-pulse" in:fade={{ duration: 300 }}>
        {message}
      </span>
    {/key}
  </p>
</div>
