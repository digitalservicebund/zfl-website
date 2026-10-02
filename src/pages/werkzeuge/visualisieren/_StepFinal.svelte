<script lang="ts">
  import { untrack } from "svelte";
  import Select from "../_shared/Select.svelte";
  import ChipBtn from "../_shared/ChipBtn.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import IconInfo from "~icons/ic/outline-info";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { getWizardContext } from "./_wizardState.svelte.ts";
  import { visTypeIcons } from "./_visTypeIcons.ts";
  import ChatInput from "./_ChatInput.svelte";
  import ChatMessages from "./_ChatMessages.svelte";
  import { ChatState } from "./_chatState.svelte.ts";
  import { createRefineChatBackend } from "./_chatBackend.ts";

  const wizard = getWizardContext();

  const chat = new ChatState(createRefineChatBackend(wizard), [
    {
      id: "greeting",
      role: "assistant",
      content: "Haben Sie Änderungswünsche?",
    },
  ]);

  // The chat refers to the current diagram, so it starts over (and cancels
  // a pending refinement) when the user switches to another Teilbereich
  $effect(() => {
    void wizard.selectedVisOption;
    untrack(() => chat.reset());
  });

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
        {#if wizard.versions.length > 0}
          <!-- The generated diagram, like the version chips in the chat
               below; flex keeps the chip from stretching to the full width -->
          <div class="flex mb-16">
            <ChipBtn
              standalone
              selected={wizard.versionIndex === 0}
              onclick={() => wizard.showVersion(0)}
              aria-label="Version 1 anzeigen">Version 1</ChipBtn
            >
          </div>
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
        <ChatMessages
          messages={chat.messages}
          status={chat.status}
          versionIndex={wizard.versionIndex}
          onShowVersion={(index) => wizard.showVersion(index)}
        />
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
      <p class="kern-body--small kern-body--muted flex items-center gap-4">
        <IconInfo class="size-16 shrink-0" aria-hidden="true" />
        KI-generierte Inhalte. Diese können falsch sein.
      </p>
    {/if}
  </div>
</div>

<style>
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
