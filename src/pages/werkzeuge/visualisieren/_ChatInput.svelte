<script lang="ts">
  import IconStop from "~icons/ic/round-stop";

  let {
    onSubmit,
    onStop,
    isBusy = false,
  }: {
    onSubmit: (text: string) => void;
    onStop: () => void;
    /** While a reply is pending, typing stays possible but sending is blocked. */
    isBusy?: boolean;
  } = $props();

  let text = $state("");
  let textarea: HTMLTextAreaElement;

  const hasText = $derived(text.trim().length > 0);

  function submit() {
    if (!hasText || isBusy) return;
    onSubmit(text);
    text = "";
  }

  function handleKeydown(e: KeyboardEvent) {
    // isComposing: don't submit while an IME composition is being confirmed with Enter
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      submit();
    }
  }

  function focusTextarea(e: MouseEvent) {
    if ((e.target as HTMLElement).closest("button")) return;
    textarea.focus();
  }
</script>

<!-- Clicking anywhere in the box focuses the textarea; keyboard users reach it directly -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<form
  class="flex cursor-text items-end gap-8 rounded-sm border border-gray-400 bg-(--kern-color-layout-layer-surface-contextual) py-8 pr-8 pl-16 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--kern-color-action-focus-default)"
  onclick={focusTextarea}
  onsubmit={(e) => {
    e.preventDefault();
    submit();
  }}
>
  <textarea
    bind:this={textarea}
    bind:value={text}
    onkeydown={handleKeydown}
    placeholder="Ihre Eingabe"
    aria-label="Nachricht"
    class="field-sizing-content max-h-136 min-h-40 flex-1 resize-none self-center overflow-y-auto bg-transparent py-8 leading-24 outline-none"
  ></textarea>
  {#if isBusy}
    <button
      type="button"
      class="kern-btn kern-btn--primary size-40 min-h-0! flex-none! rounded-full! p-0!"
      aria-label="Antwort abbrechen"
      onclick={onStop}
    >
      <!-- KERN only colors .kern-icon/.kern-label inside buttons, not currentColor -->
      <IconStop
        class="size-24 text-(--kern-color-action-on-default-contextual)"
        aria-hidden="true"
      />
    </button>
  {:else if hasText}
    <button
      type="submit"
      class="kern-btn kern-btn--primary size-40 min-h-0! flex-none! rounded-full! p-0!"
      aria-label="Absenden"
    >
      <span
        class="kern-icon kern-icon--arrow-up kern-icon--default"
        aria-hidden="true"
      ></span>
    </button>
  {/if}
</form>
