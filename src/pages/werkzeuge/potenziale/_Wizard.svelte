<script lang="ts">
  import { untrack } from "svelte";
  import { SvelteURLSearchParams, SvelteMap } from "svelte/reactivity";
  import { werkzeuge_visualisieren } from "@/config/routes";
  import { getChecks } from "../_shared/api.ts";
  import ChipBtn from "../_shared/ChipBtn.svelte";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import ExampleFinder from "../_shared/ExampleFinder.svelte";
  import { createFakeLoadingSequence } from "../_shared/fakeLoading.ts";
  import Hint from "../_shared/Hint.svelte";
  import LoadingIndicator from "../_shared/LoadingIndicator.svelte";
  import FindingsGroup from "./_FindingsGroup.svelte";
  import PotenzialeSidebar from "./_PotenzialeSidebar.svelte";
  import type { CheckType, PotenzialeExample } from "./_types";
  import type { Finding as FindingData } from "@/content.config";

  let {
    examples,
    visualisierbareShorts,
  }: { examples: PotenzialeExample[]; visualisierbareShorts: string[] } =
    $props();

  type VorhabenType = { id: string; label: string };
  const vorhabenTypes = [
    { id: "existing", label: "bestehendes Gesetz" },
    { id: "own", label: "eigenes Vorhaben" },
  ] as const satisfies VorhabenType[];
  let selectedVorhabenType =
    $state<(typeof vorhabenTypes)[number]["id"]>("existing");

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

  let draftText = $state("");
  let analyzedDraftText = $state<string>();

  function analyzeDraft() {
    const trimmed = draftText.trim();
    if (!trimmed) return;
    analyzedDraftText = trimmed;
  }

  let checksSource = $derived<PotenzialeExample | string | undefined>(
    selectedVorhabenType === "existing" ? selectedExample : analyzedDraftText,
  );

  let selectedCheckType = $state<CheckFilter>();
  let activeFinding = $state<FindingData>();

  const VORHABEN_STEP_STATUS_MESSAGES = [
    "Lade Vorhaben …",
    "Analysiere Prüfschemata …",
    "Bereite Checks vor …",
  ];
  let loadingStatusMessage = $state(VORHABEN_STEP_STATUS_MESSAGES[0]);

  let isLoadingChecks = $state(false);
  let findings = $state<FindingData[]>([]);
  let checksError = $state<string>();

  const ALLE_CHECK_TYPE = "alle" as const;
  type CheckFilter = typeof ALLE_CHECK_TYPE | CheckType;

  let checkTypes = $derived<CheckFilter[]>([
    ALLE_CHECK_TYPE,
    ...new Set(findings.map((finding) => finding.type)),
  ]);

  $effect(() => {
    if (!checksSource) {
      findings = [];
      selectedCheckType = undefined;
      checksError = undefined;
      isLoadingChecks = false;
      return;
    }
    const source = checksSource;

    let cancelled = false;
    isLoadingChecks = true;
    selectedCheckType = ALLE_CHECK_TYPE;
    activeFinding = undefined;
    findings = [];
    checksError = undefined;

    const { promise: fakeDelay, cancel } = createFakeLoadingSequence(
      VORHABEN_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    Promise.all([getChecks(source), fakeDelay])
      .then(([result]) => {
        if (cancelled) return;
        findings = result.findings;
        isLoadingChecks = false;

        if (!hasAppliedInitialCheck) {
          hasAppliedInitialCheck = true;
          const initialFinding = result.findings.find(
            (finding) => finding.type === initialCheck,
          );
          if (initialFinding) {
            selectedCheckType = initialFinding.type;
          }
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error(error);
        checksError = "Die Checks konnten nicht geladen werden.";
        isLoadingChecks = false;
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
    !selectedCheckType
      ? []
      : selectedCheckType === ALLE_CHECK_TYPE
        ? findings
        : findings.filter((finding) => finding.type === selectedCheckType),
  );

  let selectedFindingsGroups = $derived.by(() => {
    const groups = new SvelteMap<string, FindingData[]>();
    for (const finding of selectedFindings) {
      const group = groups.get(finding.tag);
      if (group) {
        group.push(finding);
      } else {
        groups.set(finding.tag, [finding]);
      }
    }
    return [...groups.values()];
  });

  $effect(() => {
    selectedCheckType;
    activeFinding = undefined;
  });
</script>

<div class="grid grid-cols-1 items-start lg:grid-cols-[1fr_auto]">
  <div class="breakout-grid py-lg min-w-0 space-y-32">
    <div class="kern-form-input">
      <span class="kern-label">Was möchten Sie prüfen?</span>
      <div class="flex flex-wrap gap-8">
        {#each vorhabenTypes as vt (vt.id)}
          <ChipBtn
            onclick={() => {
              selectedExample = undefined;
              analyzedDraftText = undefined;
              selectedVorhabenType = vt.id;
            }}
            selected={selectedVorhabenType === vt.id}>{vt.label}</ChipBtn
          >
        {/each}
      </div>
    </div>
    {#if selectedVorhabenType === "existing"}
      <ExampleFinder {examples} bind:selected={selectedExample} />
    {:else}
      <div class="space-y-16">
        <div class="kern-form-input">
          <label class="kern-label" for="draft">Ihr Entwurf</label>
          <textarea
            class="kern-form-input__input"
            id="draft"
            name="draft"
            bind:value={draftText}></textarea>
        </div>
        <div>
          <button
            type="button"
            class="kern-btn kern-btn--primary"
            disabled={!draftText.trim()}
            onclick={analyzeDraft}
            ><span class="kern-label">Analysieren</span></button
          >
        </div>
      </div>
    {/if}
    {#if selectedExample?.eli}
      <p class="kern-body kern-body--muted">
        Originaltext: <a
          href={resolveEliUrl(selectedExample.eli)}
          target="_blank">{selectedExample.short}</a
        >
      </p>
    {/if}
    {#if checksSource}
      {#if checksError}
        <p class="kern-error" role="alert">{checksError}</p>
      {:else}
        {#if !isLoadingChecks}
          <div class="kern-form-input">
            <span class="kern-label">Ergebnisse nach Check filtern</span>
            <div class="mt-8 flex flex-wrap gap-8">
              {#each checkTypes as checkType (checkType)}
                <ChipBtn
                  selected={checkType === selectedCheckType}
                  onclick={() => (selectedCheckType = checkType)}
                >
                  {checkType === ALLE_CHECK_TYPE ? "Alle" : checkType}
                </ChipBtn>
              {/each}
            </div>
          </div>
        {/if}
        {#if isLoadingChecks}
          <LoadingIndicator message={loadingStatusMessage} />
        {:else if selectedFindings.length}
          <div class="space-y-12">
            {#each selectedFindingsGroups as findingsGroup (findingsGroup[0].tag)}
              <FindingsGroup
                {findingsGroup}
                onOpenLocation={(clicked) => (activeFinding = clicked)}
              />
            {/each}
          </div>
          {#if canVisualisieren && selectedExample}
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
    {/if}
  </div>
  <PotenzialeSidebar
    body={selectedVorhabenType === "existing"
      ? (selectedExample?.body ?? "")
      : (analyzedDraftText ?? "")}
    finding={activeFinding}
    onClose={() => (activeFinding = undefined)}
  />
</div>
