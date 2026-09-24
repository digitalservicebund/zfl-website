<script lang="ts">
  import ChipBtn from "../_shared/ChipBtn.svelte";
  import ExampleFinder from "../_shared/ExampleFinder.svelte";
  import PresetBtn from "./_PresetBtn.svelte";
  import { getWizardContext, lawTypes } from "./_wizardState.svelte.ts";
  import type { LawExample } from "./_types";
  import { visTypeIcons } from "./_visTypeIcons.ts";

  let { examples }: { examples: LawExample[] } = $props();

  const wizard = getWizardContext();
</script>

{#snippet presets()}
  <div class="grid lg:grid-cols-3 gap-16">
    <PresetBtn
      title="Entscheidungs&shy;logik"
      active={wizard.preset === "flowchart"}
      onclick={() => (wizard.preset = "flowchart")}
      icon={visTypeIcons.flowchart}
    >
      <p class="kern-body--small kern-body--muted">
        Wo sind Komplexitäten/Lücken?
      </p>
    </PresetBtn>
    <PresetBtn
      title="Ablauf in der Praxis"
      active={wizard.preset === "swimlane"}
      onclick={() => (wizard.preset = "swimlane")}
      icon={visTypeIcons.swimlane}
    >
      <p class="kern-body--small kern-body--muted">Wer macht wann was?</p>
    </PresetBtn>
    <PresetBtn
      title="Akteure"
      active={wizard.preset === "actors"}
      onclick={() => (wizard.preset = "actors")}
      icon={visTypeIcons.actors}
    >
      <p class="kern-body--small kern-body--muted">Wer ist involviert?</p>
    </PresetBtn>
  </div>
{/snippet}

<div class="space-y-32">
  <div class="w-full space-y-24">
    <h2 class="step-heading">Was möchten Sie visualisieren?</h2>
    {@render presets()}
  </div>
  <div class="space-y-16">
    <div class="flex flex-wrap gap-8">
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
