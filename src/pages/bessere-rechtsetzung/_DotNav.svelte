<script lang="ts">
  let {
    sections,
    activeId,
    onSelect,
  }: {
    /** Registered sections to show a dot for, in registration order. */
    sections: { id: string; title?: string; color?: string }[];
    activeId: string | null;
    onSelect: (id: string) => void;
  } = $props();
</script>

<nav
  class={`flex px-24 flex-col items-center gap-24 rounded-md transition-opacity duration-500 max-lg:hidden ${activeId ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
  aria-label="Phasen-Navigation"
  aria-hidden="true"
>
  {#each sections as section (section.id)}
    <button
      type="button"
      class="size-24 bg-(--dot-color) shrink-0 rounded-full outline-offset-2 aria-current:outline-2 aria-current:outline-black"
      tabIndex={-1}
      style={`--dot-color: ${section.color ?? "black"}`}
      title={section.title}
      aria-label={section.title}
      aria-current={activeId === section.id ? "true" : undefined}
      onclick={() => onSelect(section.id)}
    ></button>
  {/each}
</nav>
