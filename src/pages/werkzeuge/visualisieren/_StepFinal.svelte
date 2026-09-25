<script lang="ts">
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { getWizardContext } from "./_wizardState.svelte.ts";
  import type { Snippet } from "svelte";

  const wizard = getWizardContext();
  let { buttons }: { buttons: Snippet } = $props();
</script>

<div class="flex flex-col gap-32 h-full">
  <div class="h-full flex flex-col justify-center">
    {#if wizard.isLoading}
      <LoadingIndicator message={wizard.loadingStatusMessage} />
    {:else if wizard.mermaidError}
      <p class="kern-error" role="alert">{wizard.mermaidError}</p>
    {:else if wizard.summary}
      <p class="kern-body kern-body--muted">{wizard.summary}</p>
    {/if}
    {#if !wizard.isLoading && wizard.selectedExample}
      <p class="kern-body kern-body--muted">
        Originaltext: <a
          href={resolveEliUrl(wizard.selectedExample.eli)}
          target="_blank">{wizard.selectedExample.short}</a
        >
      </p>
    {/if}
  </div>
  <div>
    {#if !wizard.isLoading && wizard.mermaidSource}
      {@render buttons()}
    {/if}
  </div>
</div>
