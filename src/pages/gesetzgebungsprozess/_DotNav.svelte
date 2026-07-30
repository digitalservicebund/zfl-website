<script lang="ts">
  let {
    clusters,
    activeId,
    onSelect,
  }: {
    /** Registered clusters to show a dot for, in registration order. */
    clusters: { id: string; color?: string }[];
    activeId: string | null;
    onSelect: (id: string) => void;
  } = $props();
</script>

<nav
  class="pointer-events-auto flex w-100 flex-col items-center gap-24 rounded-md"
  aria-label="Phasen-Navigation"
>
  <p class="text-sm text-icon-muted my-0" aria-hidden="true">Phasen</p>
  {#each clusters as cluster (cluster.id)}
    <button
      type="button"
      class={`size-24 bg-(--dot-color) shrink-0 rounded-full outline-offset-2 ${
        activeId === cluster.id ? "outline-2 outline-black" : ""
      }`}
      style={`--dot-color: ${cluster.color ?? "black"}`}
      title={cluster.id}
      aria-label={cluster.id}
      aria-current={activeId === cluster.id ? "true" : undefined}
      onclick={() => onSelect(cluster.id)}
    ></button>
  {/each}
</nav>
