<script lang="ts">
  import Select from "../_shared/Select.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { getWizardContext } from "./_wizardState.svelte.ts";
  import { visTypeIcons } from "./_visTypeIcons.ts";
  import type { Snippet } from "svelte";

  const wizard = getWizardContext();
  let { buttons }: { buttons: Snippet } = $props();
</script>

<div class="flex flex-col gap-32 h-full">
  <div class="h-full flex flex-col gap-32">
    {#if wizard.selectedExample}
      <h2 class="kern-heading-medium mb-0 p-0">
        {wizard.selectedExample.title}
      </h2>
    {/if}
    <div class="kern-form-input w-full">
      <label class="kern-label" for="vis-option">Teilbereich</label>
      <Select
        items={wizard.visOptions}
        bind:selected={wizard.selectedVisOption}
        getLabel={(option) => option.name}
        id="vis-option"
        class="w-full"
      >
        {#snippet option(option)}
          {@const Icon = visTypeIcons[option.visType]}
          <Icon class="size-24 shrink-0 text-cosmic-blue-400" />
          <span class="truncate">{option.name}</span>
        {/snippet}
      </Select>
    </div>
    {#if wizard.isLoading}
      <LoadingIndicator message={wizard.loadingStatusMessage} />
    {:else if wizard.mermaidError}
      <p class="kern-error" role="alert">{wizard.mermaidError}</p>
    {:else}
      <div>
        {#if wizard.summary}
          <p>{wizard.summary}</p>
        {/if}
        {#if wizard.selectedExample}
          <p class="kern-body kern-body--muted">
            Quelle:
            <a href={resolveEliUrl(wizard.selectedExample.eli)} target="_blank"
              >{wizard.selectedExample.short}</a
            >
            {#if wizard.selectedVisOption?.articles.length}
              {wizard.selectedVisOption.articles.join(", ")}
            {/if}
          </p>
        {/if}
      </div>
    {/if}
  </div>
  <div>
    {#if !wizard.isLoading && wizard.mermaidSource}
      {@render buttons()}
    {/if}
  </div>
</div>
