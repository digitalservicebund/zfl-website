<script lang="ts">
  import type { ChatMessage } from "./_chatBackend.ts";
  import type { ChatStatus } from "./_chatState.svelte.ts";

  let {
    messages,
    status,
  }: {
    messages: ChatMessage[];
    status: ChatStatus;
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
      <p class="whitespace-pre-wrap" class:kern-error={message.isError}>
        {message.content}
      </p>
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
