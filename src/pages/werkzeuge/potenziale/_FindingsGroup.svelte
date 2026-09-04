<script lang="ts">
  import type { Finding } from "@/content.config";
  import ArrowDown from "~icons/ic/round-keyboard-arrow-down";
  import ArrowUp from "~icons/ic/round-keyboard-arrow-up";
  import { findingTagMeta } from "./_findingTags";
  import Score from "./_Score.svelte";

  let {
    findingsGroup,
    onOpenLocation,
  }: {
    findingsGroup: Finding[];
    onOpenLocation: (finding: Finding) => void;
  } = $props();

  let expanded = $state(false);
  let currFinding = $state(findingsGroup[0]);

  const tagMeta = $derived(findingTagMeta(findingsGroup[0].tag));

  function selectFinding(finding: Finding) {
    currFinding = finding;
    onOpenLocation(finding);
  }

  function toggleExpanded() {
    expanded = !expanded;
    if (expanded) {
      onOpenLocation(currFinding);
    }
  }
</script>

<div class="rounded-sm border border-(--kern-color-decorative-border-default)">
  <button
    type="button"
    aria-expanded={expanded}
    class="flex w-full cursor-pointer items-center gap-12 rounded-sm p-16 text-left hover:bg-lavender-100 focus-visible:outline-4 focus-visible:outline-(--kern-color-action-focus-default) outline-offset-2"
    onclick={toggleExpanded}
  >
    <span class={`kern-badge ${tagMeta.badgeClass} shrink-0`}>
      <span class="kern-label">{findingsGroup[0].tag}</span>
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
      <dl class="grid grid-cols-[auto_1fr] gap-x-24 gap-y-16 px-16 pb-16">
        <dt class="kern-body kern-body--bold">Betrifft</dt>
        <dd class="flex flex-wrap gap-8">
          {#each findingsGroup as finding (finding.id)}
            <button
              type="button"
              class="kern-badge kern-badge--small kern-badge--tag interactive"
              aria-pressed={finding.id === currFinding.id}
              data-inactive={finding.id === currFinding.id ? undefined : "true"}
              onclick={() => selectFinding(finding)}
            >
              <span class="kern-label">{finding.locationLabel}</span>
            </button>
          {/each}
        </dd>

        <dt></dt>
        <dd
          class="kern-body kern-body--small kern-body--muted grid grid-cols-2 gap-24"
        >
          <Score score={currFinding.potential} label="Potenzial" />
          <Score score={currFinding.confidence} label="Konfidenz" />
        </dd>

        <dt class="kern-body kern-body--bold">Begründung</dt>
        <dd class="kern-body">{currFinding.reasoning}</dd>

        <dt class="kern-body kern-body--bold">Empfehlung</dt>
        <dd class="kern-body kern-body--muted">{currFinding.hint}</dd>

        {#if tagMeta.links?.length}
          <dt class="kern-body kern-body--bold">Weitere Infos</dt>
          <dd class="kern-body">
            <ul class="list-unstyled space-y-8">
              {#each tagMeta.links as link (link.href)}
                <li><a href={link.href}>{link.label}</a></li>
              {/each}
            </ul>
          </dd>
        {/if}
      </dl>
    </div>
  </div>
</div>
