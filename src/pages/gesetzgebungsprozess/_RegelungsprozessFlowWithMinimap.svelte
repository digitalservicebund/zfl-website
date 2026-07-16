<script lang="ts">
  import FlowWithMinimap from "./_FlowWithMinimap.svelte";
  import RegelungsprozessFlow from "./_RegelungsprozessFlow.svelte";
  import BubbleSidebar from "./_BubbleSidebar.svelte";

  const contentId = "regelungsprozess-flow-content";

  let orientation = $state<"vertical" | "horizontal">("vertical");
  let clusterOptions = $state<{ id: string; label: string }[]>([]);
  let highlighted = $state<string[]>([]);

  function toggleOrientation() {
    orientation = orientation === "vertical" ? "horizontal" : "vertical";
  }

  // Discovers the cluster title headings actually rendered in the real
  // content (not the minimap clone, which lives elsewhere in the DOM and
  // has its IDs stripped) so the jump-to select always reflects the
  // current set of clusters without needing a hardcoded list.
  function updateClusterOptions() {
    const container = document.getElementById(contentId);
    if (!container) return;

    clusterOptions = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2[id]"),
    ).map((el) => ({ id: el.id, label: el.textContent?.trim() ?? el.id }));
  }

  $effect(() => {
    // Re-run whenever the orientation changes too, in case cluster order
    // or presence changes with layout.
    orientation;
    updateClusterOptions();
  });

  function onJumpToCluster(event: Event) {
    const id = (event.currentTarget as HTMLSelectElement).value;
    if (!id) return;

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  // Bubbles considered part of the early phase of the process (the
  // "Recherche" and "Referentenentwurf" clusters), used to drive the
  // highlighted state.
  const fruehphaseBubbles = [
    "Arbeitsgruppenbildung",
    "Workshops mit Ländern und Kommunen",
    "Federführung",
    "Gesetzesumfeld",
    "Vorschläge von Verbänden",
    "Erarbeiten von Eckpunkten",
    "Gutachten und Sachverständigenkommissionen",
    "Materialrecherche",
    "Ziel- und Wirkungsdefinition",
    "Vorarbeit",
    "Frühzeitige Beteiligung",
    "Austausch",
    "Vorblatt",
    "Rohentwurf",
    "Gesetzesfolgen werden besprochen",
  ];
  const dasIstNeuBubbles = [
    "Frühzeitige Beteiligung",
    "Ziel- und Wirkungsdefinition",
    "Austausch",
  ];

  function onFilterChange(event: Event) {
    const value = (event.currentTarget as HTMLSelectElement).value;

    if (value === "fruehphase") {
      highlighted = fruehphaseBubbles;
    } else if (value === "das-ist-neu") {
      highlighted = dasIstNeuBubbles;
    } else {
      highlighted = [];
    }
  }

  const minimapSize = $derived(orientation === "vertical" ? 165 : 120);
</script>

<BubbleSidebar>
  {#snippet children()}
    <div class="flex flex-col gap-80">
      <div class="ml-40 space-y-24">
        <label class="flex w-fit items-center gap-8">
          <span>Gehe zu</span>
          <select
            class="rounded-md border border-lavender-400 bg-white px-8 py-4"
            onchange={onJumpToCluster}
          >
            <option value="" selected disabled>Wählen...</option>
            {#each clusterOptions as option (option.id)}
              <option value={option.id}>{option.label}</option>
            {/each}
          </select>
        </label>
        <label class="flex w-fit items-center gap-8">
          <span>Filter</span>
          <select
            class="rounded-md border border-lavender-400 bg-white px-8 py-4"
            onchange={onFilterChange}
          >
            <option value="alle">Alle</option>
            <option value="fruehphase">Frühphase</option>
            <option value="das-ist-neu">Das ist neu</option>
          </select>
        </label>
        <label class="flex w-fit cursor-pointer items-center gap-8">
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
      </div>
      <FlowWithMinimap {orientation} {minimapSize} {contentId}>
        {#snippet children()}
          <RegelungsprozessFlow {orientation} bind:highlighted />
        {/snippet}
      </FlowWithMinimap>
    </div>
  {/snippet}
</BubbleSidebar>
