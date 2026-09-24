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
  import CanvasViewer from "./_CanvasViewer.svelte";
  import type { LawExample } from "./_types";
  import Step1 from "./_Step1.svelte";
  import { WizardState, setWizardContext } from "./_wizardState.svelte.ts";
  import Step2 from "./_Step2.svelte";
  import StepFinal from "./_StepFinal.svelte";
  import { steps } from "./_steps.ts";

  let {
    examples,
    pruefbareShorts,
  }: { examples: LawExample[]; pruefbareShorts: string[] } = $props();

  const wizard = new WizardState();
  setWizardContext(wizard);

  function configureMermaid(htmlLabels: boolean) {
    mermaid.initialize({
      startOnLoad: false,
      htmlLabels,
      // Mermaid's default (200px) re-wraps the <br/>-separated lines in the
      // .mmd sources, making nodes narrow and diagrams very tall.
      flowchart: { htmlLabels, wrappingWidth: 400 },
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

  const initialExample = untrack(() =>
    examples.find((example) => example.short === initialNorm),
  );
  const initialOption = initialExample?.visOptions.find(
    (option) => option.name === initialVisualization,
  );

  if (initialExample) {
    wizard.selectedLawType = "existing";
    wizard.selectedExample = initialExample;
  }
  // A shared URL with both norm and visualization should open the result
  // directly instead of walking through the earlier steps.
  if (initialOption) wizard.currentStep = steps.length;

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

    const isInitialLoad = !hasAppliedInitialVisualization;
    hasAppliedInitialVisualization = true;

    // Skips the fake delay when opening a shared URL: the step showing it
    // (step 2) is skipped anyway.
    const { promise: fakeDelay, cancel } =
      isInitialLoad && initialOption
        ? { promise: Promise.resolve(), cancel: () => {} }
        : createFakeLoadingSequence(
            LAW_STEP_STATUS_MESSAGES,
            (message) => (wizard.loadingStatusMessage = message),
          );

    Promise.all([getVisOptions(source), fakeDelay])
      .then(([result]) => {
        if (cancelled) return;
        wizard.visOptions = result.options;
        wizard.visOptionsSessionId = result.sessionId;
        wizard.isLoadingVisOptions = false;

        if (isInitialLoad && initialOption) {
          wizard.selectedVisOption = initialOption.name;
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
  // loading, so StepFinal is on screen to show its own loading state.
  $effect(() => {
    if (wizard.selectedVisOption) {
      untrack(() => {
        if (wizard.currentStep < steps.length)
          wizard.currentStep = steps.length;
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
  let renderCount = 0;
  let saveDialogEl: HTMLDialogElement | undefined = $state();

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

  // Matches the direction in a diagram header, e.g. "flowchart TD"
  const DIRECTION_PATTERN = /^(\s*(?:flowchart|swimlane-beta)\s+)(TD|TB|LR)\b/m;

  let canFlip = $derived(DIRECTION_PATTERN.test(wizard.mermaidSource));

  function flipDirection() {
    wizard.mermaidSource = wizard.mermaidSource.replace(
      DIRECTION_PATTERN,
      (_, prefix: string, direction: string) =>
        `${prefix}${direction === "LR" ? "TD" : "LR"}`,
    );
  }

  let showCanvas = $derived(wizard.currentStep === steps.length);

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
  <div class="flex flex-col items-start">
    <a
      href={drawioUrl}
      target="_blank"
      rel="noreferrer"
      class="kern-btn kern-btn--tertiary"
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
      class="kern-btn kern-btn--tertiary"
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
      class="kern-btn kern-btn--tertiary"
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
      class="kern-btn kern-btn--tertiary"
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
{/snippet}

<div
  id="wizard"
  class="grid grid-cols-1 h-screen overflow-hidden transition-[grid-template-columns] duration-300 ease-in-out sm:grid-cols-[1fr_0fr] data-show-canvas:sm:grid-cols-[1fr_2fr]"
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
        <div class="flex">
          {#if wizard.currentStep > 1}
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
          {/if}
          {#if wizard.currentStep < steps.length && wizard.canAdvance}
            <button
              type="button"
              class="kern-btn kern-btn--tertiary ms-auto"
              onclick={() => wizard.next()}
            >
              <span class="kern-label">Weiter</span>
              <span
                class="kern-icon kern-icon--arrow-forward kern-icon--default"
                aria-hidden="true"
              ></span>
            </button>
          {/if}
        </div>
      </div>
      <div class="h-full w-full flex flex-col gap-32 justify-center">
        {#if wizard.currentStep === 1}
          <Step1 {examples} />
        {:else if wizard.currentStep === 2}
          <Step2 />
        {:else if wizard.currentStep === steps.length}
          <StepFinal {canPruefen} {buttons} />
        {/if}
      </div>
    </div>
  </div>
  {#if showCanvas}
    <div
      id="vis-canvas"
      class="relative w-full h-dvh min-w-0 flex flex-col justify-center items-center bg-lavender-200"
    >
      {#if wizard.isLoading}
        <div class="flex w-full h-full items-center justify-center p-16">
          {@render loadingDiagramPlaceholder()}
        </div>
      {:else if wizard.mermaidSource}
        <CanvasViewer
          svg={diagramSvg}
          title={selectedOption
            ? `${wizard.selectedExample?.title ?? "Eigenes Vorhaben"}: ${selectedOption.name}`
            : "Visualisierung"}
          onFlip={canFlip ? flipDirection : undefined}
        />
        <div class="absolute bottom-24 right-32">
          <button
            type="button"
            class="kern-btn kern-btn--primary"
            onclick={() => saveDialogEl?.showModal()}
          >
            <span
              class="kern-icon kern-icon--download kern-icon--default"
              aria-hidden="true"
            ></span>
            <span class="kern-label">Speichern</span>
          </button>
        </div>
        <dialog
          bind:this={saveDialogEl}
          class="kern-dialog"
          onclick={(event) => {
            if (event.target === saveDialogEl) saveDialogEl?.close();
          }}
        >
          <div class="kern-dialog__header">
            <h2 class="kern-title">Visualisierung exportieren</h2>
            <button
              type="button"
              class="kern-btn kern-btn--tertiary kern-btn--only-icon"
              onclick={() => saveDialogEl?.close()}
              aria-label="Schließen"
            >
              <span
                class="kern-icon kern-icon--close kern-icon--default"
                aria-hidden="true"
              ></span>
            </button>
          </div>
          <div class="kern-dialog__body">
            {@render buttons()}
          </div>
        </dialog>
      {/if}
    </div>
  {/if}
</div>

<style>
  #vis-chat :global(.step-heading) {
    margin-top: -2em;
  }

  /* Tailwind's preflight resets margin to 0, which breaks the browser
     default `margin: auto` that centers a `showModal()`-opened dialog. */
  dialog.kern-dialog {
    margin: auto;
  }
</style>
