<script lang="ts">
  import Select from "../_shared/Select.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { getWizardContext } from "./_wizardState.svelte.ts";
  import { visTypeIcons } from "./_visTypeIcons.ts";
  import ChatInput from "./_ChatInput.svelte";
  import ChatMessages from "./_ChatMessages.svelte";
  import { ChatState } from "./_chatState.svelte.ts";
  import { createFakeChatBackend } from "./_chatBackend.ts";

  const wizard = getWizardContext();
  let { onSave }: { onSave: () => void } = $props();

  let resetDialogEl: HTMLDialogElement | undefined = $state();

  const chat = new ChatState(createFakeChatBackend(), [
    {
      id: "greeting",
      role: "assistant",
      content: "Haben Sie Änderungswünsche?",
    },
  ]);

  let chatScrollEl: HTMLDivElement | undefined = $state();

  // Keeps the newest message in view, including while a reply streams in
  $effect(() => {
    void chat.messages.length;
    void chat.messages.at(-1)?.content;
    void chat.status;
    chatScrollEl?.scrollTo({
      top: chatScrollEl.scrollHeight,
      behavior: "smooth",
    });
  });
</script>

<div class="flex flex-1 min-h-0 flex-col gap-32">
  <div class="flex flex-1 min-h-0 flex-col gap-32">
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
      <div
        bind:this={chatScrollEl}
        class="scrollable-chat scroll-shadow flex-1 min-h-0 overflow-y-auto"
      >
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
        <ChatMessages messages={chat.messages} status={chat.status} />
      </div>
    {/if}
  </div>
  <div class="space-y-24">
    {#if !wizard.isLoading && wizard.mermaidSource}
      <ChatInput
        onSubmit={(text) => chat.send(text)}
        onStop={() => chat.stop()}
        isBusy={chat.isBusy}
      />
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

  /* Pure-CSS "scroll shadow", same as in bessere-rechtsetzung/_FlowSidebar.svelte
     Reference: https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
  */
  .scroll-shadow {
    background:
    /* Shadow Cover TOP */
      linear-gradient(
          var(--kern-color-layout-background-default) 30%,
          rgba(255, 255, 255, 0)
        )
        center top,
      /* Shadow Cover BOTTOM */
      linear-gradient(
          rgba(255, 255, 255, 0),
          var(--kern-color-layout-background-default) 70%
        )
        center bottom,
      /* Shadow TOP */
      radial-gradient(
          farthest-side at 50% 0,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        )
        center top,
      /* Shadow BOTTOM */
      radial-gradient(
          farthest-side at 50% 100%,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        )
        center bottom;

    background-repeat: no-repeat;
    background-size:
      100% 40px,
      100% 40px,
      100% 14px,
      100% 14px;
    background-attachment: local, local, scroll, scroll;
  }
</style>
