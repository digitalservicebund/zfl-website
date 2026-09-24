<script lang="ts">
  import PresetBtn from "./_PresetBtn.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { getWizardContext } from "./_wizardState.svelte.ts";
  import { visTypeIcons } from "./_visTypeIcons.ts";

  const wizard = getWizardContext();
</script>

<div class="space-y-32">
  {#if wizard.visOptionsSource}
    {#if wizard.visOptionsError}
      <p class="kern-error" role="alert">{wizard.visOptionsError}</p>
    {:else}
      {#if !wizard.isLoadingVisOptions}
        <div class="kern-form-input">
          <h2 class="step-heading">
            Welchen Teilbereich möchten Sie visualisieren?
          </h2>
          <div class="mt-16 flex flex-col w-full gap-8">
            {#each wizard.visOptions as option (option.name)}
              <PresetBtn
                active={option.name === wizard.selectedVisOption}
                onclick={() => (wizard.selectedVisOption = option.name)}
                icon={visTypeIcons[option.visType]}
                inline
              >
                <div class="flex justify-between items-center w-full">
                  <span>{option.name}</span>
                  {#if option.articles.length}
                    <span class="kern-body--muted"
                      >{option.articles.join(", ")}</span
                    >
                  {/if}
                </div>
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
