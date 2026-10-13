<script lang="ts">
  import ChipBtn from "../_shared/ChipBtn.svelte";
  import ExampleFinder from "../_shared/ExampleFinder.svelte";
  import { getWizardContext, lawTypes } from "./_wizardState.svelte.ts";
  import type { LawExample, VisType } from "./_types";

  let { examples }: { examples: LawExample[] } = $props();

  const wizard = getWizardContext();

  // The vis type is picked on the intro page (?preset=…)
  const headings: Record<VisType, string> = {
    flowchart: "Entscheidungslogik visualisieren",
    swimlane: "Vollzug visualisieren",
    actors: "Normadressaten visualisieren",
  };
</script>

<div class="space-y-32">
  <div class="w-full space-y-16">
    <h2 class="kern-heading-large">{headings[wizard.preset]}</h2>
    <p class="kern-body">
      Geben Sie Ihr Gesetz an, welches Sie visualisieren wollen. Entweder
      bestehende Gesetze oder einen kleinen Textabschnitt Ihres Entwurfes.
    </p>
  </div>
  <div class="space-y-32">
    <div class="flex flex-wrap gap-24">
      {#each lawTypes as lt (lt.id)}
        <ChipBtn
          onclick={() => wizard.selectLawType(lt.id)}
          selected={wizard.selectedLawType === lt.id}>{lt.label}</ChipBtn
        >
      {/each}
    </div>
    {#if wizard.selectedLawType === "existing"}
      <ExampleFinder {examples} bind:selected={wizard.selectedExample} />
    {:else}
      <div class="space-y-16">
        <div class="kern-form-input">
          <label class="kern-label" for="draft">Eigenes Vorhaben</label>
          <textarea
            class="kern-form-input__input h-150"
            id="draft"
            name="draft"
            placeholder="Kopieren Sie einen Ausschnitt ihres Vorhabens hierher, den Sie visualisieren möchten"
            bind:value={wizard.draftText}></textarea>
        </div>
        <div class="flex w-full justify-end gap-8">
          {#if wizard.draftText.trim()}
            <button
              class="kern-btn kern-btn--secondary"
              onclick={() => (wizard.draftText = "")}
            >
              <span class="kern-label">Löschen</span>
            </button>
          {/if}
          <button
            type="button"
            class="kern-btn kern-btn--primary"
            disabled={!wizard.draftText.trim()}
            onclick={() => wizard.analyzeDraft()}
            ><span class="kern-label">Analysieren</span></button
          >
        </div>
      </div>
    {/if}
  </div>
</div>
