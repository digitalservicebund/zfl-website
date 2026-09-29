<script lang="ts">
  import type { ChatMessage } from "./_chatBackend.ts";
  import type { ChatStatus } from "./_chatState.svelte.ts";
  import ChipBtn from "../_shared/ChipBtn.svelte";

  let {
    messages,
    status,
    versionIndex,
    onShowVersion,
  }: {
    messages: ChatMessage[];
    status: ChatStatus;
    /** The diagram version currently shown */
    versionIndex?: number;
    onShowVersion?: (index: number) => void;
  } = $props();
</script>

<!-- role="log" announces new messages to screen readers as they're appended -->
<div role="log" aria-label="Chatverlauf" class="flex flex-col gap-16 py-16">
  {#each messages as message (message.id)}
    {#if message.role === "user"}
      <p
        class="ms-auto max-w-4/5 whitespace-pre-wrap rounded-lg bg-lavender-200 px-16 py-8"
      >
        {message.content}
      </p>
    {:else}
      <div class="space-y-8">
        <p class="whitespace-pre-wrap" class:kern-error={message.isError}>
          {message.content}
        </p>
        {#if message.versionIndex !== undefined && onShowVersion}
          {@const index = message.versionIndex}
          <!-- flex keeps the chip from stretching to the full width -->
          <div class="flex">
            <ChipBtn
              standalone
              selected={index === versionIndex}
              onclick={() => onShowVersion(index)}
              aria-label={`Version ${index + 1} anzeigen`}>v{index + 1}</ChipBtn
            >
          </div>
        {/if}
      </div>
    {/if}
  {/each}
  {#if status === "thinking"}
    <p class="thinking text-cosmic-blue-base">
      Denke nach<span aria-hidden="true"
        ><span>.</span><span>.</span><span>.</span></span
      >
    </p>
  {/if}
</div>

<style>
  .thinking > span > span {
    animation: thinking-dot 1.4s infinite both;
  }
  .thinking > span > span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .thinking > span > span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes thinking-dot {
    0%,
    80%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .thinking > span > span {
      animation: none;
    }
  }
</style>
