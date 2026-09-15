<script lang="ts">
  import type { Obligation } from "@/content.config";
  import ArrowDown from "~icons/ic/round-keyboard-arrow-down";
  import ArrowUp from "~icons/ic/round-keyboard-arrow-up";

  let {
    obligationGroup,
    onOpenLocation,
  }: {
    obligationGroup: Obligation[];
    onOpenLocation: (obligation: Obligation) => void;
  } = $props();

  let expanded = $state(false);

  function toggleExpanded() {
    expanded = !expanded;
  }
</script>

<div class="rounded-sm border border-(--kern-color-decorative-border-default)">
  <button
    type="button"
    aria-expanded={expanded}
    class="flex w-full cursor-pointer items-center gap-12 rounded-sm p-16 text-left hover:bg-lavender-100 focus-visible:outline-4 focus-visible:outline-(--kern-color-action-focus-default) outline-offset-2 bg-lavender-200"
    onclick={toggleExpanded}
  >
    <span class="kern-body flex-1">{obligationGroup[0].who}</span>
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
      <ul class="list-disc space-y-8 pl-32 pr-16 py-16">
        {#each obligationGroup as obligation (obligation.id)}
          <li>
            <div class="flex flex-wrap items-center gap-8">
              <span class="kern-body flex-1">{obligation.summary}</span>
              <button
                type="button"
                class="kern-badge kern-badge--small kern-badge--tag interactive shrink-0"
                onclick={() => onOpenLocation(obligation)}
              >
                <span class="kern-label">{obligation.locationLabel}</span>
              </button>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
