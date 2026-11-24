<script lang="ts" generics="T extends FindableExample">
  import ComboBox from "./ComboBox.svelte";
  import type { FindableExample } from "./types";

  interface Props {
    examples: T[];
    selected: T | undefined;
    showLabel?: boolean;
  }

  let { examples, selected = $bindable(), showLabel }: Props = $props();

  function exampleLabel(example: T): string {
    return `${example.title} (${example.short})`;
  }

  function resetSelection() {
    selected = undefined;
  }
</script>

<div class="kern-form-input max-w-a11y">
  {#if showLabel}
    <label class="kern-label" for="gesetz">Wählen Sie Ihr Gesetz</label>
  {/if}
  <div class="kern-input-group">
    <ComboBox
      items={examples}
      bind:selected
      getLabel={exampleLabel}
      id="gesetz"
      name="gesetz"
      placeholder="Titel oder Kürzel des Gesetzes (z.B. BEEG)"
      class="flex-[999_1_220px]"
    />
    {#if selected}
      <button
        type="button"
        class="kern-btn kern-btn--secondary"
        onclick={resetSelection}
      >
        <span class="kern-label">Löschen</span>
      </button>
    {:else}
      <button class="kern-btn kern-btn--primary">
        <span class="kern-icon kern-icon--search" aria-hidden="true"></span>
        <span class="kern-label">Suchen</span>
      </button>
    {/if}
  </div>
</div>
