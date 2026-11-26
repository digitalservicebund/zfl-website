<script lang="ts">
  import { liveAi } from "@/config/features";
  import DiagramCard from "./_DiagramCard.svelte";
  import {
    MIN_QUERY_LENGTH,
    searchDiagrams,
    type SearchEntry,
  } from "./_search.ts";

  interface Props {
    entries: SearchEntry[];
    /** Wizard, offered when nothing matches and own drafts can be visualised */
    wizardHref: string;
  }

  let { entries, wizardHref }: Props = $props();

  const PAGE_SIZE = 9;
  const DEBOUNCE_MS = 200;

  let input = $state("");
  let query = $state("");
  let limit = $state(PAGE_SIZE);
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const active = $derived(query.trim().length >= MIN_QUERY_LENGTH);
  const results = $derived(searchDiagrams(entries, query));
  const visibleResults = $derived(results.slice(0, limit));

  function applyQuery() {
    clearTimeout(debounceTimer);
    query = input;
    limit = PAGE_SIZE;
  }

  function handleInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyQuery, DEBOUNCE_MS);
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    applyQuery();
  }

  $effect(() => () => clearTimeout(debounceTimer));
</script>

<div class="space-y-32">
  <form
    role="search"
    class="kern-form-input max-w-a11y"
    onsubmit={handleSubmit}
  >
    <label class="kern-label" for="diagram-search">Suchbegriff</label>
    <div class="kern-input-group">
      <input
        class="kern-form-input__input"
        id="diagram-search"
        type="search"
        autocomplete="off"
        bind:value={input}
        oninput={handleInput}
      />
      <button type="submit" class="kern-btn kern-btn--primary">
        <span class="kern-icon kern-icon--search" aria-hidden="true"></span>
        <span class="kern-sr-only">Suchen</span>
      </button>
    </div>
  </form>

  <div aria-live="polite">
    {#if active}
      <p class="kern-body mb-0">
        {#if results.length === 0}
          Keine Visualisierung gefunden.
          {#if liveAi}
            Ihr Gesetz ist nicht dabei?
            <a href={wizardHref}>Eigenen Entwurf visualisieren</a>
          {/if}
        {:else if results.length === 1}
          1 Visualisierung gefunden
        {:else}
          {results.length} Visualisierungen gefunden
        {/if}
      </p>
    {/if}
  </div>

  {#if active && visibleResults.length > 0}
    <ul class="list-unstyled grid grid-cols-1 gap-24 md:grid-cols-3">
      {#each visibleResults as entry (entry.key)}
        <li>
          <DiagramCard
            short={entry.short}
            filename={entry.filename}
            title={entry.name}
            href={entry.href}
          />
        </li>
      {/each}
    </ul>
    {#if results.length > limit}
      <button
        type="button"
        class="kern-btn kern-btn--secondary"
        onclick={() => (limit += PAGE_SIZE)}
      >
        <span class="kern-label">Weitere Treffer anzeigen</span>
      </button>
    {/if}
  {/if}
</div>
