<script lang="ts">
  import mermaid from "mermaid";
  import { untrack } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import {
    isMermaidFlowchart,
    mermaidFlowchartToRulemapXml,
  } from "./_mermaid2RulemapXML.ts";
  import { parseMmdFrontmatter } from "./_mmdFrontmatter.ts";
  import { resolveEliUrl } from "../_shared/eli.ts";
  import { createFakeLoadingSequence } from "../_shared/fakeLoading.ts";
  import { getMermaid, getVisOptions } from "../_shared/api.ts";
  import Viewer from "./_Viewer.svelte";
  import type { LawExample } from "./_types";
  import Step1 from "./_Step1.svelte";
  import { WizardState, setWizardContext } from "./_wizardState.svelte.ts";
  import Step2 from "./_Step2.svelte";
  import Step3 from "./_Step3.svelte";

  let {
    examples,
    pruefbareShorts,
  }: { examples: LawExample[]; pruefbareShorts: string[] } = $props();

  const wizard = new WizardState();
  setWizardContext(wizard);

  // Defines the order of the steps; each step's own component still takes
  // its own specific props, wired explicitly where it's rendered below.
  type StepDef = { title: string };
  const steps: StepDef[] = [
    { title: "Vorhaben wählen" },
    { title: "Teilbereich wählen" },
    { title: "Ergebnis" },
  ];

  function configureMermaid(htmlLabels: boolean) {
    mermaid.initialize({
      startOnLoad: false,
      htmlLabels,
      flowchart: { htmlLabels },
    });
  }

  // Interactive, on-screen rendering keeps HTML labels so the <a> links in
  // the .mmd sources (see resolveNormLinks) are clickable.
  configureMermaid(true);

  const mermaidSources = import.meta.glob<string>(
    "../../../content/ki-visualisierungen/*/*.mmd",
    {
      query: "?raw",
      import: "default",
    },
  );

  function resolveNormLinks(source: string, eli: string): string {
    return source.replaceAll("{{ELI}}", resolveEliUrl(eli));
  }

  const searchParams = new SvelteURLSearchParams(
    typeof window === "undefined" ? "" : window.location.search,
  );
  const initialNorm = searchParams.get("norm");
  const initialVisualization = searchParams.get("visualization");
  let hasAppliedInitialVisualization = false;

  wizard.selectedExample = untrack(() =>
    examples.find((example) => example.short === initialNorm),
  );

  const LAW_STEP_STATUS_MESSAGES = [
    "Lese Gesetzestext …",
    "Analysiere Struktur …",
    "Identifiziere mögliche Visualisierungen …",
  ];
  const VIS_OPTION_STEP_STATUS_MESSAGES = [
    "Extrahiere Prozessschritte …",
    "Erstelle Diagramm …",
    "Rendere Visualisierung …",
  ];
  wizard.loadingStatusMessage = LAW_STEP_STATUS_MESSAGES[0];

  $effect(() => {
    if (!wizard.visOptionsSource) {
      wizard.visOptions = [];
      wizard.selectedVisOption = undefined;
      wizard.visOptionsSessionId = undefined;
      wizard.visOptionsError = undefined;
      wizard.isLoadingVisOptions = false;
      return;
    }
    const source = wizard.visOptionsSource;

    let cancelled = false;
    wizard.isLoadingVisOptions = true;
    wizard.selectedVisOption = undefined;
    wizard.visOptions = [];
    wizard.visOptionsSessionId = undefined;
    wizard.visOptionsError = undefined;

    const { promise: fakeDelay, cancel } = createFakeLoadingSequence(
      LAW_STEP_STATUS_MESSAGES,
      (message) => (wizard.loadingStatusMessage = message),
    );

    Promise.all([getVisOptions(source), fakeDelay])
      .then(([result]) => {
        if (cancelled) return;
        wizard.visOptions = result.options;
        wizard.visOptionsSessionId = result.sessionId;
        wizard.isLoadingVisOptions = false;

        if (!hasAppliedInitialVisualization) {
          hasAppliedInitialVisualization = true;
          const initialOption = result.options.find(
            (option) => option.name === initialVisualization,
          );
          if (initialOption) {
            wizard.selectedVisOption = initialOption.name;
          }
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error(error);
        wizard.visOptionsError =
          "Die Visualisierungsoptionen konnten nicht geladen werden.";
        wizard.isLoadingVisOptions = false;
      });

    return () => {
      cancelled = true;
      cancel();
    };
  });

  // Advances past step 1 as soon as a valid input is provided. Reads
  // wizard.currentStep via untrack so navigating back to step 1 (where the
  // input is still set from before) doesn't immediately bounce forward again.
  $effect(() => {
    if (wizard.visOptionsSource) {
      untrack(() => {
        if (wizard.currentStep < 2) wizard.currentStep = 2;
      });
    }
  });

  let selectedOption = $derived(
    wizard.visOptions.find(
      (option) => option.name === wizard.selectedVisOption,
    ),
  );

  // Same rationale as the step 1 → 2 advance above: advances as soon as the
  // user picks a vis option, before the mermaid diagram has even started
  // loading, so Step3 is on screen to show its own loading state.
  $effect(() => {
    if (wizard.selectedVisOption) {
      untrack(() => {
        if (wizard.currentStep < 3) wizard.currentStep = 3;
      });
    }
  });

  let canPruefen = $derived(
    wizard.selectedExample
      ? pruefbareShorts.includes(wizard.selectedExample.short)
      : false,
  );

  $effect(() => {
    if (wizard.selectedExample) {
      searchParams.set("norm", wizard.selectedExample.short);
    } else {
      searchParams.delete("norm");
    }

    if (selectedOption) {
      searchParams.set("visualization", selectedOption.name);
    } else {
      searchParams.delete("visualization");
    }

    const query = searchParams.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", newUrl);
  });

  let diagramSvg = $state("");
  let viewerOpen = $state(false);
  let renderCount = 0;

  $effect(() => {
    if (!selectedOption) {
      wizard.mermaidSource = "";
      wizard.summary = "";
      wizard.isLoading = false;
      wizard.mermaidError = undefined;
      return;
    }

    if (wizard.selectedLawType === "existing") {
      if (!wizard.selectedExample) {
        wizard.mermaidSource = "";
        wizard.summary = "";
        wizard.isLoading = false;
        return;
      }
      const example = wizard.selectedExample;
      const option = selectedOption;

      let cancelled = false;
      wizard.isLoading = true;
      wizard.mermaidError = undefined;

      const path = `../../../content/ki-visualisierungen/${example.short}/${option.filename}.mmd`;
      const eli = example.eli;

      const { promise: fakeDelay, cancel } = createFakeLoadingSequence(
        VIS_OPTION_STEP_STATUS_MESSAGES,
        (message) => (wizard.loadingStatusMessage = message),
      );

      Promise.all([mermaidSources[path](), fakeDelay]).then(([source]) => {
        if (cancelled) return;
        const parsed = parseMmdFrontmatter(resolveNormLinks(source, eli));
        wizard.summary = parsed.summary;
        wizard.mermaidSource = parsed.body;
      });

      return () => {
        cancelled = true;
        cancel();
      };
    } else {
      if (!wizard.visOptionsSessionId) {
        wizard.mermaidSource = "";
        wizard.summary = "";
        wizard.isLoading = false;
        return;
      }
      const sessionId = wizard.visOptionsSessionId;
      const option = selectedOption;

      let cancelled = false;
      wizard.isLoading = true;
      wizard.summary = "";
      wizard.mermaidError = undefined;

      const { promise: fakeDelay, cancel } = createFakeLoadingSequence(
        VIS_OPTION_STEP_STATUS_MESSAGES,
        (message) => (wizard.loadingStatusMessage = message),
      );

      Promise.all([getMermaid(sessionId, option), fakeDelay])
        .then(([source]) => {
          if (cancelled) return;
          wizard.mermaidSource = source;
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          console.error(error);
          wizard.mermaidError = "Das Diagramm konnte nicht erstellt werden.";
          wizard.isLoading = false;
        });

      return () => {
        cancelled = true;
        cancel();
      };
    }
  });

  $effect(() => {
    if (!wizard.mermaidSource) return;

    let cancelled = false;

    mermaid
      .render(`mermaid-diagram-${renderCount++}`, wizard.mermaidSource)
      .then(({ svg }) => {
        if (cancelled) return;
        diagramSvg = svg;
        wizard.isLoading = false;
      });

    return () => {
      cancelled = true;
    };
  });

  // Drops <a href="...">text</a> wrappers, keeping just the link text: SVG
  // viewers outside the browser (Miro, Illustrator, ...) don't render
  // foreignObject/HTML, so exported links must become plain SVG text.
  function stripLinks(source: string): string {
    return source.replace(/<a\b[^>]*>(.*?)<\/a>/gis, "$1");
  }

  let filenameBase = $derived(
    wizard.selectedExample?.short ?? "eigener-entwurf",
  );

  async function downloadSvg() {
    if (!wizard.mermaidSource || !selectedOption) return;

    const exportSource = stripLinks(wizard.mermaidSource);

    configureMermaid(false);
    let svg: string;
    try {
      ({ svg } = await mermaid.render(
        `mermaid-export-${renderCount++}`,
        exportSource,
      ));
    } finally {
      configureMermaid(true);
    }

    const container = document.createElement("div");
    container.innerHTML = svg;
    const svgElement = container.querySelector("svg");
    if (!svgElement) return;

    const serialized = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob(
      [`<?xml version="1.0" encoding="UTF-8"?>\n${serialized}`],
      { type: "image/svg+xml" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filenameBase}-${selectedOption.name}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  let mermaidCopied = $state(false);
  let mermaidCopiedTimeoutId: ReturnType<typeof setTimeout> | undefined;

  async function copyMermaidSource() {
    if (!wizard.mermaidSource) return;

    await navigator.clipboard.writeText(stripLinks(wizard.mermaidSource));

    mermaidCopied = true;
    clearTimeout(mermaidCopiedTimeoutId);
    mermaidCopiedTimeoutId = setTimeout(() => {
      mermaidCopied = false;
    }, 1500);
  }

  let drawioUrl = $derived(
    wizard.mermaidSource
      ? `https://app.diagrams.net/#create=${encodeURIComponent(
          JSON.stringify({ type: "mermaid", data: wizard.mermaidSource }),
        )}`
      : undefined,
  );

  let canExportRulemap = $derived(
    wizard.mermaidSource ? isMermaidFlowchart(wizard.mermaidSource) : false,
  );

  let showCanvas = $derived(wizard.isLoading || !!wizard.mermaidSource);

  function downloadRulemapXml() {
    if (!wizard.mermaidSource || !selectedOption) return;

    const xml = mermaidFlowchartToRulemapXml(
      wizard.mermaidSource,
      `${filenameBase}: ${selectedOption.name}`,
    );

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filenameBase}-${selectedOption.name}.xml`;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

{#snippet loadingDiagramPlaceholder()}
  <svg
    viewBox="0 0 320 260"
    class="h-full max-h-500 w-full max-w-420"
    role="img"
    aria-label="Diagramm wird geladen"
  >
    <g
      class="fill-none stroke-gray-400"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M160 56 V80" />
      <path d="M160 116 V128 H60 V152" />
      <path d="M160 116 V128 H260 V152" />
      <path d="M60 188 V200 H160 V222" />
      <path d="M260 188 V200 H160 V222" />
    </g>
    <g class="stroke-gray-400" stroke-width="2">
      <rect
        x="110"
        y="20"
        width="100"
        height="36"
        rx="6"
        class="fill-gray-300 animate-pulse"
        style="animation-delay: 0ms"
      />
      <rect
        x="110"
        y="80"
        width="100"
        height="36"
        rx="6"
        class="fill-gray-300 animate-pulse"
        style="animation-delay: 150ms"
      />
      <rect
        x="10"
        y="152"
        width="100"
        height="36"
        rx="6"
        class="fill-gray-300 animate-pulse"
        style="animation-delay: 300ms"
      />
      <rect
        x="210"
        y="152"
        width="100"
        height="36"
        rx="6"
        class="fill-gray-300 animate-pulse"
        style="animation-delay: 450ms"
      />
      <rect
        x="110"
        y="222"
        width="100"
        height="36"
        rx="6"
        class="fill-gray-300 animate-pulse"
        style="animation-delay: 600ms"
      />
    </g>
  </svg>
{/snippet}

{#snippet buttons()}
  <div class="flex flex-col gap-8">
    <div class="flex gap-8 flex-wrap">
      <a
        href={drawioUrl}
        target="_blank"
        rel="noreferrer"
        class="kern-btn kern-btn--primary"
      >
        <span
          class="kern-icon kern-icon--edit kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">Bearbeiten mit Draw.io</span>
      </a>
      <button
        type="button"
        onclick={downloadSvg}
        class="kern-btn kern-btn--secondary"
      >
        <span
          class="kern-icon kern-icon--download kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">SVG</span>
      </button>
      <button
        type="button"
        onclick={downloadRulemapXml}
        disabled={!canExportRulemap}
        class="kern-btn kern-btn--secondary"
        title={canExportRulemap
          ? undefined
          : "Rulemap XML Export ist derzeit nur für Flowcharts verfügbar"}
      >
        <span
          class="kern-icon kern-icon--download kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">Rulemap XML</span>
      </button>
      <button
        type="button"
        onclick={copyMermaidSource}
        class="kern-btn kern-btn--secondary"
      >
        <span
          class="kern-icon {mermaidCopied
            ? 'kern-icon--check'
            : 'kern-icon--content-copy'} kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label" aria-live="polite">
          {mermaidCopied ? "In Zwischenablage kopiert" : "Mermaid kopieren"}
        </span>
      </button>
    </div>
  </div>
{/snippet}

<div
  id="wizard"
  class="grid grid-cols-1 h-screen data-show-canvas:sm:grid-cols-[1fr_2fr]"
  data-show-canvas={showCanvas || undefined}
>
  <div
    id="vis-chat"
    class="min-w-0 py-md px-16 w-full max-w-900 mx-auto max-h-full overflow-auto"
  >
    <div class="flex flex-col h-full gap-32">
      <div class="vis-chat-header space-y-16">
        <div class="kern-progress">
          <label class="kern-label" for="progress1"
            >Schritt {wizard.currentStep} von {steps.length}</label
          >
          <progress id="progress1" value={wizard.currentStep} max={steps.length}
          ></progress>
        </div>
        {#if wizard.currentStep > 1}
          <div>
            <button
              type="button"
              class="kern-btn kern-btn--tertiary"
              onclick={() => wizard.back()}
            >
              <span
                class="kern-icon kern-icon--arrow-back kern-icon--default"
                aria-hidden="true"
              ></span>
              <span class="kern-label">Zurück</span>
            </button>
          </div>
        {/if}
      </div>
      <div class="h-full w-full flex flex-col gap-32 justify-center">
        {#if wizard.currentStep === 1}
          <Step1 {examples} />
        {:else if wizard.currentStep === 2}
          <Step2 />
        {:else if wizard.currentStep === 3}
          <Step3 {canPruefen} {buttons} />
        {/if}
      </div>
    </div>
  </div>
  {#if showCanvas}
    <div
      id="vis-canvas"
      class="w-full h-full min-w-0 flex justify-center items-center bg-lavender-200"
      style="--preview-height: 100dvh;"
    >
      {#if wizard.isLoading}
        <div
          class="flex w-full h-full items-center justify-center bg-lavender-200 p-16"
        >
          {@render loadingDiagramPlaceholder()}
        </div>
      {:else if wizard.mermaidSource}
        <div
          class="diagram-preview relative flex w-full items-center justify-center overflow-hidden bg-lavender-200 p-16"
        >
          <button
            type="button"
            class="absolute inset-0 z-0 cursor-zoom-in"
            aria-label="Visualisierung in Vollbildansicht öffnen"
            onclick={() => (viewerOpen = true)}
          ></button>
          <div class="pointer-events-none relative z-1">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -- diagramSvg comes from mermaid.render() on our own bundled .mmd sources, not user input -->
            {@html diagramSvg}
          </div>
        </div>
        <Viewer
          bind:open={viewerOpen}
          svg={diagramSvg}
          title={selectedOption
            ? `${wizard.selectedExample?.title ?? "Eigenes Vorhaben"}: ${selectedOption.name}`
            : "Visualisierung"}
        />
      {/if}
    </div>
  {/if}
</div>

<style>
  .diagram-preview :global(svg) {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    height: var(--preview-height);
  }
  #vis-chat :global(.step-heading) {
    margin-top: -1em;
  }
</style>
