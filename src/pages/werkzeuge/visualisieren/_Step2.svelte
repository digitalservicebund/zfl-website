<script lang="ts">
  import PresetBtn from "./_PresetBtn.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { getWizardContext } from "./_wizardState.svelte.ts";

  const wizard = getWizardContext();

  // Options matching the preset chosen in step 1 first; the sort is stable,
  // so the original order is kept within each group.
  const sortedVisOptions = $derived(
    wizard.visOptions.toSorted(
      (a, b) =>
        Number(b.visType === wizard.preset) -
        Number(a.visType === wizard.preset),
    ),
  );
</script>

<div class="space-y-32">
  {#if wizard.visOptionsSource}
    {#if wizard.visOptionsError}
      <p class="kern-error" role="alert">{wizard.visOptionsError}</p>
    {:else}
      {#if !wizard.isLoadingVisOptions}
        <div class="space-y-24">
          <div class="space-y-8">
            <h2 class="kern-heading-large">
              Welchen Teilbereich möchten Sie visualisieren?
            </h2>
            <p class="kern-body">Wählen Sie einen Teilbereich aus.</p>
          </div>
          <div class="grid gap-16 md:grid-cols-2">
            {#each sortedVisOptions as option (option.name)}
              <PresetBtn
                title={option.name}
                subline={option.articles.join(", ")}
                active={option.name === wizard.selectedVisOption?.name}
                onclick={() => (wizard.selectedVisOption = option)}
              />
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
