<script lang="ts">
  import type { Snippet } from "svelte";
  import { werkzeuge_potenziale } from "@/config/routes";
  import Hint from "../_shared/Hint.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { getWizardContext } from "./_wizardState.svelte.ts";

  const wizard = getWizardContext();
  let { canPruefen, buttons }: { canPruefen: boolean; buttons: Snippet } =
    $props();
</script>

<div class="flex flex-col gap-32 h-full">
  <div class="h-full flex flex-col justify-center">
    {#if wizard.isLoading}
      <LoadingIndicator message={wizard.loadingStatusMessage} />
    {:else if wizard.mermaidError}
      <p class="kern-error" role="alert">{wizard.mermaidError}</p>
    {:else if wizard.summary}
      <p class="kern-body kern-body--muted">{wizard.summary}</p>
      {#if canPruefen && wizard.selectedExample}
        <Hint>
          Zu {wizard.selectedExample.short} gibt es auch einen Potenzialcheck:
          <a
            href={`${werkzeuge_potenziale.path}?vorhaben=${wizard.selectedExample.short}`}
            >Hier ansehen</a
          >
        </Hint>
      {/if}
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
  {#if wizard.mermaidSource}
    <div class="pb-32">{@render buttons()}</div>
  {/if}
</div>
