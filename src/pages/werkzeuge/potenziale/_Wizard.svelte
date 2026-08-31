<script lang="ts">
  import { marked } from "marked";
  import { untrack } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import { werkzeuge_visualisieren } from "@/config/routes";
  import ChipBtn from "../_shared/ChipBtn.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import ExampleFinder from "../_shared/ExampleFinder.svelte";
  import { createFakeLoadingSequence } from "../_shared/fakeLoading.ts";
  import Hint from "../_shared/Hint.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import type { PotenzialeExample } from "./_types";

  let {
    examples,
    visualisierbareShorts,
  }: { examples: PotenzialeExample[]; visualisierbareShorts: string[] } =
    $props();

  const reportSources = import.meta.glob<string>("./_data/*.md", {
    query: "?raw",
    import: "default",
  });

  const searchParams = new SvelteURLSearchParams(
    typeof window === "undefined" ? "" : window.location.search,
  );
  const initialVorhaben = searchParams.get("vorhaben");
  const initialCheck = searchParams.get("check");
  let hasAppliedInitialCheck = false;

  let selectedExample = $state(
    untrack(() =>
      examples.find((example) => example.short === initialVorhaben),
    ),
  );

  let selectedCheckType = $state<string>();

  const VORHABEN_STEP_STATUS_MESSAGES = [
    "Lade Vorhaben …",
    "Analysiere Prüfschemata …",
    "Bereite Checks vor …",
  ];
  const CHECK_STEP_STATUS_MESSAGES = [
    "Lade Prüfbericht …",
    "Werte Ergebnisse aus …",
    "Rendere Bericht …",
  ];
  let loadingStatusMessage = $state(VORHABEN_STEP_STATUS_MESSAGES[0]);

  let isLoadingChecks = $state(false);

  $effect(() => {
    if (!selectedExample) {
      selectedCheckType = undefined;
      isLoadingChecks = false;
      return;
    }
    const example = selectedExample;

    let cancelled = false;
    isLoadingChecks = true;
    selectedCheckType = undefined;

    const { promise, cancel } = createFakeLoadingSequence(
      VORHABEN_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    promise.then(() => {
      if (cancelled) return;
      isLoadingChecks = false;

      if (!hasAppliedInitialCheck) {
        hasAppliedInitialCheck = true;
        const initialCheckEntry = example.checks.find(
          (check) => check.type === initialCheck,
        );
        if (initialCheckEntry) {
          selectedCheckType = initialCheckEntry.type;
        }
      }
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });

  let selectedCheck = $derived(
    selectedExample?.checks.find((check) => check.type === selectedCheckType),
  );

  let canVisualisieren = $derived(
    selectedExample
      ? visualisierbareShorts.includes(selectedExample.short)
      : false,
  );

  $effect(() => {
    if (selectedExample) {
      searchParams.set("vorhaben", selectedExample.short);
    } else {
      searchParams.delete("vorhaben");
    }

    if (selectedCheck) {
      searchParams.set("check", selectedCheck.type);
    } else {
      searchParams.delete("check");
    }

    const query = searchParams.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", newUrl);
  });

  let reportHtml = $state("");
  let isLoadingReport = $state(false);

  $effect(() => {
    if (!selectedCheck) {
      reportHtml = "";
      isLoadingReport = false;
      return;
    }
    const check = selectedCheck;

    let cancelled = false;
    isLoadingReport = true;

    const path = `./_data/${check.filename}.md`;

    const { promise: fakeDelay, cancel } = createFakeLoadingSequence(
      CHECK_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    Promise.all([reportSources[path](), fakeDelay]).then(async ([source]) => {
      if (cancelled) return;
      reportHtml = await marked.parse(source);
      isLoadingReport = false;
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });
</script>

<div class="space-y-32">
  <ExampleFinder {examples} bind:selected={selectedExample} />
  {#if selectedExample}
    {#if selectedExample.eli}
      <p class="kern-body kern-body--muted">
        Originaltext: <a
          href={resolveEliUrl(selectedExample.eli)}
          target="_blank">{selectedExample.short}</a
        >
      </p>
    {/if}
    {#if !isLoadingChecks}
      <div class="kern-form-input">
        <span class="kern-label">Welchen Check möchten Sie machen?</span>
        <div class="mt-8 flex flex-wrap gap-8">
          {#each selectedExample.checks as check (check.type)}
            <ChipBtn
              selected={check.type === selectedCheckType}
              onclick={() => (selectedCheckType = check.type)}
            >
              {check.type}
            </ChipBtn>
          {/each}
        </div>
      </div>
    {/if}
    {#if isLoadingChecks || isLoadingReport}
      <LoadingIndicator message={loadingStatusMessage} />
    {:else if reportHtml}
      <div class="bg-lavender-200 px-32 py-48 kern-body">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- reportHtml is markdown rendered from our own generated check reports, not user input -->
        {@html reportHtml}
      </div>
      {#if canVisualisieren}
        <Hint>
          Zu {selectedExample.short} gibt es auch Visualisierungen:
          <a
            href={`${werkzeuge_visualisieren.path}?norm=${selectedExample.short}`}
            >Hier ansehen</a
          >
        </Hint>
      {/if}
    {/if}
  {/if}
</div>
