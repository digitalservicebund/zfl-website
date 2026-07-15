<script lang="ts">
  import FlowWithMinimap from "./_FlowWithMinimap.svelte";
  import RegelungsprozessFlow from "./_RegelungsprozessFlow.svelte";

  let orientation = $state<"vertical" | "horizontal">("vertical");

  function toggleOrientation() {
    orientation = orientation === "vertical" ? "horizontal" : "vertical";
  }
</script>

<div class="flex flex-col gap-80">
  <label class="ml-40 flex w-fit cursor-pointer items-center gap-8">
    <span>Vertikal</span>
    <span
      class={`relative inline-flex h-24 w-40 shrink-0 rounded-full border border-lavender-400 transition-colors ${orientation === "horizontal" ? "bg-cosmic-blue-base" : "bg-white"}`}
    >
      <input
        type="checkbox"
        class="sr-only"
        checked={orientation === "horizontal"}
        onchange={toggleOrientation}
      />
      <span
        class={`absolute top-1/2 size-20 -translate-y-1/2 rounded-full bg-white shadow transition-[left] duration-150 ${orientation === "horizontal" ? "left-18" : "left-2"}`}
        aria-hidden="true"
      ></span>
    </span>
    <span>Horizontal</span>
  </label>
  <FlowWithMinimap
    {orientation}
    minimapSize={100}
    contentId="regelungsprozess-flow-content"
  >
    {#snippet children()}
      <RegelungsprozessFlow {orientation} />
    {/snippet}
  </FlowWithMinimap>
</div>
