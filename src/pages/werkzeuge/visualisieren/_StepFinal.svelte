<script lang="ts">
  import Select from "../_shared/Select.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { getWizardContext } from "./_wizardState.svelte.ts";
  import { visTypeIcons } from "./_visTypeIcons.ts";

  const wizard = getWizardContext();
  let { onSave }: { onSave: () => void } = $props();

  let resetDialogEl: HTMLDialogElement | undefined = $state();
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
      <div class="flex flex-row-reverse justify-start gap-8">
        <button
          type="button"
          class="kern-btn kern-btn--primary"
          onclick={onSave}
        >
          <span
            class="kern-icon kern-icon--download kern-icon--default"
            aria-hidden="true"
          ></span>
          <span class="kern-label">Speichern</span>
        </button>
        <button
          type="button"
          class="kern-btn kern-btn--tertiary"
          onclick={() => resetDialogEl?.showModal()}
        >
          <span
            class="kern-icon kern-icon--autorenew kern-icon--default"
            aria-hidden="true"
          ></span>
          <span class="kern-label">Neu beginnen</span>
        </button>
      </div>
    {/if}
  </div>
</div>

<dialog
  bind:this={resetDialogEl}
  class="kern-dialog"
  aria-labelledby="reset-dialog-title"
  onclick={(event) => {
    if (event.target === resetDialogEl) resetDialogEl?.close();
  }}
>
  <div class="kern-dialog__header">
    <h2 class="kern-title" id="reset-dialog-title">Neu beginnen?</h2>
    <button
      type="button"
      class="kern-btn kern-btn--tertiary kern-btn--only-icon"
      onclick={() => resetDialogEl?.close()}
      aria-label="Schließen"
    >
      <span
        class="kern-icon kern-icon--close kern-icon--default"
        aria-hidden="true"
      ></span>
    </button>
  </div>
  <div class="kern-dialog__body">
    <p class="kern-body">
      Alle Eingaben und die aktuelle Visualisierung gehen verloren.
    </p>
  </div>
  <div class="kern-dialog__footer">
    <button
      type="button"
      class="kern-btn kern-btn--secondary"
      onclick={() => resetDialogEl?.close()}
    >
      <span class="kern-label">Abbrechen</span>
    </button>
    <button
      type="button"
      class="kern-btn kern-btn--primary"
      onclick={() => {
        resetDialogEl?.close();
        wizard.reset();
      }}
    >
      <span class="kern-label">Neu beginnen</span>
    </button>
  </div>
</dialog>

<style>
  /* Tailwind's preflight resets margin to 0, which breaks the browser
     default `margin: auto` that centers a `showModal()`-opened dialog. */
  dialog.kern-dialog {
    margin: auto;
  }
</style>
