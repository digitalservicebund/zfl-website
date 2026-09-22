<script lang="ts">
  import PresetBtn from "./_PresetBtn.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { getWizardContext } from "./_wizardState.svelte.ts";

  const wizard = getWizardContext();
</script>

<div class="space-y-32">
  {#if wizard.visOptionsSource}
    {#if wizard.visOptionsError}
      <p class="kern-error" role="alert">{wizard.visOptionsError}</p>
    {:else}
      {#if !wizard.isLoadingVisOptions}
        <div class="kern-form-input">
          <span class="kern-label kern-heading-large"
            >Welchen Teilbereich möchten Sie visualisieren?</span
          >
          <div class="mt-16 flex flex-col w-full gap-8">
            {#each wizard.visOptions as option (option.name)}
              <PresetBtn
                active={option.name === wizard.selectedVisOption}
                onclick={() => (wizard.selectedVisOption = option.name)}
              >
                {option.name}
                {#if option.articles.length}
                  ({option.articles.join(", ")})
                {/if}
              </PresetBtn>
            {/each}
          </div>
        </div>
      {/if}
      {#if wizard.isLoadingVisOptions}
        <LoadingIndicator message={wizard.loadingStatusMessage} />
      {/if}
    {/if}
  {/if}
</div>
