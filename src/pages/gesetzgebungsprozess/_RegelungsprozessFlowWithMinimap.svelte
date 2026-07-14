<script lang="ts">
  import FlowWithMinimap from "./_FlowWithMinimap.svelte";
  import RegelungsprozessFlow from "./_RegelungsprozessFlow.svelte";

  let { minimapWidth = 100 }: { minimapWidth?: number } = $props();
</script>

<FlowWithMinimap {minimapWidth} contentId="regelungsprozess-flow-content">
  {#snippet children()}
    <RegelungsprozessFlow />
  {/snippet}
</FlowWithMinimap>
