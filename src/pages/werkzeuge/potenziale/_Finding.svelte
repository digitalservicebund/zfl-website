<script lang="ts">
  import type { Finding } from "@/content.config";
  import ArrowDown from "~icons/ic/round-keyboard-arrow-down";
  import ArrowUp from "~icons/ic/round-keyboard-arrow-up";
  import { findingTagMeta } from "./_findingTags";

  let {
    finding,
    onOpenLocation,
  }: { finding: Finding; onOpenLocation: (finding: Finding) => void } =
    $props();

  let expanded = $state(false);

  const tagMeta = $derived(findingTagMeta(finding.tag));
</script>

<div class="rounded-sm border border-(--kern-color-decorative-border-default)">
  <button
    type="button"
    aria-expanded={expanded}
    class="flex w-full cursor-pointer items-center gap-12 rounded-sm p-16 text-left hover:bg-lavender-100 focus-visible:outline-4 focus-visible:outline-(--kern-color-action-focus-default) outline-offset-2"
    onclick={() => (expanded = !expanded)}
  >
    <span class={`kern-badge ${tagMeta.badgeClass} shrink-0`}>
      <span class="kern-label">{finding.tag}</span>
    </span>
    <span class="kern-body flex-1">{tagMeta.title}</span>
    <span class="text-icon-muted shrink-0 text-xl" aria-hidden="true">
      {#if expanded}
        <ArrowUp />
      {:else}
        <ArrowDown />
      {/if}
    </span>
  </button>
  <div
    data-expanded={expanded ? "true" : undefined}
    class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-100 ease-in-out data-expanded:grid-rows-[1fr]"
  >
    <div class="overflow-hidden" aria-hidden={!expanded} inert={!expanded}>
      <div class="space-y-12 px-16 pb-16">
        <button
          type="button"
          class="kern-badge kern-badge--small kern-badge--tag"
          onclick={() => onOpenLocation(finding)}
        >
          <span class="kern-label">{finding.location.label}</span>
        </button>
        <p class="kern-body">
          <strong>Begründung:</strong>
          {finding.reasoning}
        </p>
        <p class="kern-body kern-body--muted">
          <strong>Empfehlung:</strong>
          {finding.hint}
        </p>
      </div>
    </div>
  </div>
</div>
