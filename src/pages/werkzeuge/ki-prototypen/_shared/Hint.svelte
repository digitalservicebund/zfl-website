<script lang="ts">
  import BulbIcon from "~icons/ic/outline-lightbulb";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<p class="kern-body kern-body--muted italic">
  <BulbIcon class="inline mr-4" />
  {@render children()}
</p>
