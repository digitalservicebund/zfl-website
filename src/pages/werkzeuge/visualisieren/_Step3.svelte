<script lang="ts">
  import PresetBtn from "./_PresetBtn.svelte";
  import { getWizardContext } from "./_wizardState.svelte.ts";

  const wizard = getWizardContext();
</script>

<div class="space-y-32">
  <div class="kern-form-input">
    <h2 class="step-heading">
      Welche Perspektive soll die Visualisierung haben?
    </h2>
    <div class="mt-16 flex flex-col w-full gap-8">
      {#each wizard.visPerspectives as option (option.name)}
        <PresetBtn
          active={option.name === wizard.selectedVisPerspective}
          onclick={() => (wizard.selectedVisPerspective = option.name)}
        >
          {option.name}
        </PresetBtn>
      {/each}
    </div>
  </div>
</div>
