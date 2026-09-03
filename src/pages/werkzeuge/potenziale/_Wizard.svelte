<script lang="ts">
  import { untrack } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import { werkzeuge_visualisieren } from "@/config/routes";
  import ChipBtn from "../_shared/ChipBtn.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import ExampleFinder from "../_shared/ExampleFinder.svelte";
  import { createFakeLoadingSequence } from "../_shared/fakeLoading.ts";
  import Hint from "../_shared/Hint.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import Finding from "./_Finding.svelte";
  import PotenzialeSidebar from "./_PotenzialeSidebar.svelte";
  import type { CheckType, PotenzialeExample } from "./_types";
  import type { Finding as FindingData } from "@/content.config";

  let {
    examples,
    visualisierbareShorts,
  }: { examples: PotenzialeExample[]; visualisierbareShorts: string[] } =
    $props();

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

  let selectedCheckType = $state<CheckType>();
  let activeFinding = $state<FindingData>();

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

  let checkTypes = $derived(
    selectedExample
      ? [...new Set(selectedExample.findings.map((finding) => finding.type))]
      : [],
  );

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
    activeFinding = undefined;

    const { promise, cancel } = createFakeLoadingSequence(
      VORHABEN_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    promise.then(() => {
      if (cancelled) return;
      isLoadingChecks = false;

      if (!hasAppliedInitialCheck) {
        hasAppliedInitialCheck = true;
        const initialFinding = example.findings.find(
          (finding) => finding.type === initialCheck,
        );
        if (initialFinding) {
          selectedCheckType = initialFinding.type;
        }
      }
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });

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

    if (selectedCheckType) {
      searchParams.set("check", selectedCheckType);
    } else {
      searchParams.delete("check");
    }

    const query = searchParams.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", newUrl);
  });

  let selectedFindings = $derived(
    selectedExample && selectedCheckType
      ? selectedExample.findings.filter(
          (finding) => finding.type === selectedCheckType,
        )
      : [],
  );

  let isLoadingReport = $state(false);

  $effect(() => {
    if (!selectedCheckType) {
      isLoadingReport = false;
      return;
    }

    activeFinding = undefined;

    let cancelled = false;
    isLoadingReport = true;

    const { promise, cancel } = createFakeLoadingSequence(
      CHECK_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    promise.then(() => {
      if (cancelled) return;
      isLoadingReport = false;
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });
</script>

<div class="grid grid-cols-1 items-start gap-24 lg:grid-cols-[1fr_auto]">
  <div class="breakout-grid py-lg min-w-0 space-y-32">
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
            {#each checkTypes as checkType (checkType)}
              <ChipBtn
                selected={checkType === selectedCheckType}
                onclick={() => (selectedCheckType = checkType)}
              >
                {checkType}
              </ChipBtn>
            {/each}
          </div>
        </div>
      {/if}
      {#if isLoadingChecks || isLoadingReport}
        <LoadingIndicator message={loadingStatusMessage} />
      {:else if selectedFindings.length}
        <div class="space-y-12">
          {#each selectedFindings as finding (`${finding.tag}:${finding.location.offsetFrom}:${finding.location.offsetTo}`)}
            <Finding
              {finding}
              onOpenLocation={(clicked) => (activeFinding = clicked)}
            />
          {/each}
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
      {:else if selectedCheckType}
        <p class="kern-body kern-body--muted">
          Keine Findings für diesen Check.
        </p>
      {/if}
    {/if}
  </div>
  <PotenzialeSidebar
    body={selectedExample?.body ?? ""}
    finding={activeFinding}
    onClose={() => (activeFinding = undefined)}
  />
</div>
