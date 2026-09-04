<script lang="ts">
  import type { Finding } from "@/content.config";
  import { scoreRank } from "./_findingScore";

  let { score, label }: { score: Finding["confidence"]; label?: string } =
    $props();
  let scoreValue = $derived(scoreRank(score) + 1);
</script>

<span class="inline-flex items-center gap-8">
  {#if label}
    <span>{label}</span>
  {/if}
  <span class="inline-flex items-center gap-4">
    {#each [1, 2, 3] as circle (circle)}
      <span
        class={`size-16 rounded-full border-2 border-cosmic-blue-400 ${
          circle <= scoreValue ? "bg-cosmic-blue-400" : "bg-transparent"
        }`}
      ></span>
    {/each}
  </span>
</span>
