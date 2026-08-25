<script lang="ts">
  import mermaid from "mermaid";
  import { fade } from "svelte/transition";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import {
    isMermaidFlowchart,
    mermaidFlowchartToRulemapXml,
  } from "./_mermaid2RulemapXML.ts";
  import { parseMmdFrontmatter } from "./_mmdFrontmatter.ts";
  import ChipBtn from "./_ChipBtn.svelte";
  import LawFinder from "./_LawFinder.svelte";
  import Viewer from "./_Viewer.svelte";

  interface VisExample {
    name: string;
    filename: string;
  }

  interface LawExample {
    title: string;
    short: string;
    eli: string;
    visOptions: VisExample[];
  }

  let { examples }: { examples: LawExample[] } = $props();

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

  const mermaidSources = import.meta.glob<string>("./_data/*/*.mmd", {
    query: "?raw",
    import: "default",
  });

  const RIS_BASE_URL = "https://testphase.rechtsinformationen.bund.de/gesetze";

  function resolveNormLinks(source: string, eli: string): string {
    return source.replaceAll("{{ELI}}", `${RIS_BASE_URL}/${eli}`);
  }

  const searchParams = new SvelteURLSearchParams(
    typeof window === "undefined" ? "" : window.location.search,
  );
  const initialNorm = searchParams.get("norm");
  const initialVisualization = searchParams.get("visualization");
  let hasAppliedInitialVisualization = false;

  let selectedExample = $state(
    examples.find((example) => example.short === initialNorm),
  );

  let selectedVisOption = $state<string>();

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
  const FAKE_LOADING_DELAY_MS = 2100;
  const FAKE_LOADING_STATUS_INTERVAL_MS = 700;

  let loadingStatusMessage = $state(LAW_STEP_STATUS_MESSAGES[0]);

  function createFakeLoadingSequence(
    messages: string[],
    onMessage: (message: string) => void,
  ): { promise: Promise<void>; cancel: () => void } {
    let messageIndex = 0;
    onMessage(messages[0]);
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      onMessage(messages[messageIndex]);
    }, FAKE_LOADING_STATUS_INTERVAL_MS);

    let timeoutId: ReturnType<typeof setTimeout>;
    const promise = new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, FAKE_LOADING_DELAY_MS);
    });

    return {
      promise,
      cancel: () => {
        clearInterval(interval);
        clearTimeout(timeoutId);
      },
    };
  }

  let isLoadingVisOptions = $state(false);

  $effect(() => {
    if (!selectedExample) {
      selectedVisOption = undefined;
      isLoadingVisOptions = false;
      return;
    }
    const example = selectedExample;

    let cancelled = false;
    isLoadingVisOptions = true;
    selectedVisOption = undefined;

    const { promise, cancel } = createFakeLoadingSequence(
      LAW_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    promise.then(() => {
      if (cancelled) return;
      isLoadingVisOptions = false;

      if (!hasAppliedInitialVisualization) {
        hasAppliedInitialVisualization = true;
        const initialOption = example.visOptions.find(
          (option) => option.name === initialVisualization,
        );
        if (initialOption) {
          selectedVisOption = initialOption.name;
        }
      }
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });

  let selectedOption = $derived(
    selectedExample?.visOptions.find(
      (option) => option.name === selectedVisOption,
    ),
  );

  $effect(() => {
    if (selectedExample) {
      searchParams.set("norm", selectedExample.short);
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

  let mermaidSource = $state("");
  let summary = $state("");
  let diagramSvg = $state("");
  let isLoading = $state(false);
  let viewerOpen = $state(false);
  let renderCount = 0;

  $effect(() => {
    if (!selectedExample || !selectedOption) {
      mermaidSource = "";
      summary = "";
      isLoading = false;
      return;
    }
    const example = selectedExample;
    const option = selectedOption;

    let cancelled = false;
    isLoading = true;

    const path = `./_data/${example.short}/${option.filename}.mmd`;
    const eli = example.eli;

    const { promise: fakeDelay, cancel } = createFakeLoadingSequence(
      VIS_OPTION_STEP_STATUS_MESSAGES,
      (message) => (loadingStatusMessage = message),
    );

    Promise.all([mermaidSources[path](), fakeDelay]).then(([source]) => {
      if (cancelled) return;
      const parsed = parseMmdFrontmatter(resolveNormLinks(source, eli));
      summary = parsed.summary;
      mermaidSource = parsed.body;
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });

  $effect(() => {
    if (!mermaidSource) return;

    let cancelled = false;

    mermaid
      .render(`mermaid-diagram-${renderCount++}`, mermaidSource)
      .then(({ svg }) => {
        if (cancelled) return;
        diagramSvg = svg;
        isLoading = false;
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

  async function downloadSvg() {
    if (!mermaidSource || !selectedExample || !selectedOption) return;

    const exportSource = stripLinks(mermaidSource);

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
    link.download = `${selectedExample.short}-${selectedOption.name}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  let mermaidCopied = $state(false);
  let mermaidCopiedTimeoutId: ReturnType<typeof setTimeout> | undefined;

  async function copyMermaidSource() {
    if (!mermaidSource) return;

    await navigator.clipboard.writeText(mermaidSource);

    mermaidCopied = true;
    clearTimeout(mermaidCopiedTimeoutId);
    mermaidCopiedTimeoutId = setTimeout(() => {
      mermaidCopied = false;
    }, 1000);
  }

  let canExportRulemap = $derived(
    mermaidSource ? isMermaidFlowchart(mermaidSource) : false,
  );

  function downloadRulemapXml() {
    if (!mermaidSource || !selectedExample || !selectedOption) return;

    const xml = mermaidFlowchartToRulemapXml(
      mermaidSource,
      `${selectedExample.short}: ${selectedOption.name}`,
    );

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedExample.short}-${selectedOption.name}.xml`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // function toBase64Url(bytes: Uint8Array): string {
  //   let binary = "";
  //   for (const byte of bytes) binary += String.fromCharCode(byte);
  //   return btoa(binary)
  //     .replace(/\+/g, "-")
  //     .replace(/\//g, "_")
  //     .replace(/=+$/, "");
  // }
  //
  // let pakoStr = $derived.by(() => {
  //   if (!mermaidSource) return undefined;
  //
  //   const state = {
  //     code: mermaidSource,
  //     mermaid: JSON.stringify({ theme: "default" }, null, 2),
  //     autoSync: true,
  //     updateDiagram: true,
  //   };
  //   const compressed = deflate(JSON.stringify(state), { level: 9 });
  //   return `${toBase64Url(compressed)}`;
  // });
</script>

{#snippet loadingIndicator()}
  <div class="flex flex-col items-center gap-16 p-32">
    <div class="kern-loader kern-loader--visible" role="status">
      <span class="kern-sr-only">Wird geladen…</span>
    </div>
    <p class="text-cosmic-blue-base" aria-live="polite">
      {#key loadingStatusMessage}
        <span class="inline-block animate-pulse" in:fade={{ duration: 300 }}>
          {loadingStatusMessage}
        </span>
      {/key}
    </p>
  </div>
{/snippet}

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
      <!-- <a -->
      <!--   href={`https://mermaid.live/edit#pako:${pakoStr}`} -->
      <!--   target="_blank" -->
      <!--   rel="noreferrer" -->
      <!--   class="kern-btn kern-btn--primary" -->
      <!-- > -->
      <!--   <span -->
      <!--     class="kern-icon kern-icon--open-in-new kern-icon--default" -->
      <!--     aria-hidden="true" -->
      <!--   ></span> -->
      <!--   <span class="kern-label">Im Editor öffnen</span> -->
      <!-- </a> -->
      <button
        class="kern-btn kern-btn--primary"
        onclick={() => {
          viewerOpen = true;
        }}
      >
        <span
          class="kern-icon kern-icon--search kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">Öffnen</span>
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
    <div class="flex gap-8 flex-wrap">
      <button
        type="button"
        onclick={downloadSvg}
        class="kern-btn kern-btn--secondary"
      >
        <span
          class="kern-icon kern-icon--download kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">SVG Export</span>
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
        <span class="kern-label">Rulemap XML Export</span>
      </button>
    </div>
  </div>
{/snippet}

<div class="grid grid-cols-1 sm:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-40">
  <div class="flex min-w-0 flex-col justify-between">
    <div class="space-y-32">
      <LawFinder {examples} bind:selected={selectedExample} />
      {#if selectedExample}
        {#if !isLoadingVisOptions}
          <div class="kern-form-input">
            <span class="kern-label"
              >Welchen Teilbereich möchten Sie visualisieren?</span
            >
            <div class="mt-8 flex flex-wrap gap-8">
              {#each selectedExample.visOptions as option (option.name)}
                <ChipBtn
                  selected={option.name === selectedVisOption}
                  onclick={() => (selectedVisOption = option.name)}
                >
                  {option.name}
                </ChipBtn>
              {/each}
            </div>
          </div>
        {/if}
        {#if isLoadingVisOptions || isLoading}
          {@render loadingIndicator()}
        {:else if summary}
          <div class="kern-body kern-body--muted">{summary}</div>
        {/if}
      {/if}
    </div>
    {#if mermaidSource}
      {@render buttons()}
    {/if}
  </div>
  <div
    class="w-full h-(--preview-height) min-w-0 flex justify-center items-center"
    style="--preview-height: calc(100vh - 128px);"
  >
    {#if isLoading}
      <div
        class="flex w-full h-full items-center justify-center bg-lavender-200 p-16"
      >
        {@render loadingDiagramPlaceholder()}
      </div>
    {:else if mermaidSource}
      <div
        class="diagram-preview relative flex w-full items-center justify-center overflow-hidden bg-lavender-200 p-16"
      >
        <button
          type="button"
          class="absolute inset-0 z-0 cursor-zoom-in"
          aria-label="Visualisierung in Vollbildansicht öffnen"
          onclick={() => (viewerOpen = true)}
        ></button>
        <div class="pointer-events-none relative z-[1]">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- diagramSvg comes from mermaid.render() on our own bundled .mmd sources, not user input -->
          {@html diagramSvg}
        </div>
      </div>
      <Viewer
        bind:open={viewerOpen}
        svg={diagramSvg}
        title={selectedExample && selectedOption
          ? `${selectedExample.title}: ${selectedOption.name}`
          : "Visualisierung"}
      />
    {/if}
  </div>
</div>

<style>
  .diagram-preview :global(svg) {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    height: var(--preview-height);
  }
</style>
