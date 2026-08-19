<script lang="ts">
  import mermaid from "mermaid";
  import { deflate } from "pako";
  import { fade } from "svelte/transition";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import {
    isMermaidFlowchart,
    mermaidFlowchartToRulemapXml,
  } from "./_mermaid2RulemapXML.ts";
  import ChipBtn from "./_ChipBtn.svelte";
  import LawFinder from "./_LawFinder.svelte";
  import IconZoomIn from "~icons/ic/outline-zoom-in";
  import IconZoomOut from "~icons/ic/outline-zoom-out";
  import IconRestartAlt from "~icons/ic/outline-restart-alt";

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
  const FAKE_LOADING_DELAY_MS = 3600;
  const FAKE_LOADING_STATUS_INTERVAL_MS = 1200;

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
  let diagramSvg = $state("");
  let isLoading = $state(false);
  let scale = $state(1);
  let translateX = $state(0);
  let translateY = $state(0);
  let dragOrigin: { x: number; y: number } | null = null;
  let renderCount = 0;

  $effect(() => {
    if (!selectedExample || !selectedOption) {
      mermaidSource = "";
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
      if (!cancelled) mermaidSource = resolveNormLinks(source, eli);
    });

    return () => {
      cancelled = true;
      cancel();
    };
  });

  $effect(() => {
    if (!mermaidSource) return;

    scale = 1;
    translateX = 0;
    translateY = 0;

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

  function zoomBy(factor: number) {
    const newScale = Math.min(Math.max(scale * factor, 0.2), 5);
    const ratio = newScale / scale;

    translateX *= ratio;
    translateY *= ratio;
    scale = newScale;
  }

  function zoomIn() {
    zoomBy(1.25);
  }

  function zoomOut() {
    zoomBy(0.8);
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
  }

  function onPointerDown(event: PointerEvent) {
    dragOrigin = {
      x: event.clientX - translateX,
      y: event.clientY - translateY,
    };
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragOrigin) return;
    translateX = event.clientX - dragOrigin.x;
    translateY = event.clientY - dragOrigin.y;
  }

  function onPointerUp() {
    dragOrigin = null;
  }

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

  function toBase64Url(bytes: Uint8Array): string {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  let pakoStr = $derived.by(() => {
    if (!mermaidSource) return undefined;

    const state = {
      code: mermaidSource,
      mermaid: JSON.stringify({ theme: "default" }, null, 2),
      autoSync: true,
      updateDiagram: true,
    };
    const compressed = deflate(JSON.stringify(state), { level: 9 });
    return `${toBase64Url(compressed)}`;
  });
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

<div class="space-y-32 min-h-[50vh]">
  <LawFinder {examples} bind:selected={selectedExample} />
  {#if selectedExample}
    {#if isLoadingVisOptions}
      {@render loadingIndicator()}
    {:else}
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
  {/if}
  {#if isLoading}
    {@render loadingIndicator()}
  {:else if mermaidSource}
    <div
      role="presentation"
      class="relative touch-none cursor-grab overflow-hidden bg-lavender-200 p-16 active:cursor-grabbing"
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onpointerleave={onPointerUp}
    >
      <div class="absolute right-16 top-16 z-10 flex flex-col gap-8">
        <button
          type="button"
          class="kern-btn kern-btn--secondary kern-btn--only-icon"
          onclick={zoomIn}
          aria-label="Vergrößern"
        >
          <IconZoomIn
            class="text-cosmic-blue-base text-xl"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          class="kern-btn kern-btn--secondary kern-btn--only-icon"
          onclick={zoomOut}
          aria-label="Verkleinern"
        >
          <IconZoomOut
            class="text-cosmic-blue-base text-xl"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          class="kern-btn kern-btn--secondary kern-btn--only-icon"
          onclick={resetZoom}
          aria-label="Zoom zurücksetzen"
        >
          <IconRestartAlt
            class="text-cosmic-blue-base text-xl"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        style={`transform: translate(${translateX}px, ${translateY}px) scale(${scale}); transform-origin: 0 0;`}
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- diagramSvg comes from mermaid.render() on our own bundled .mmd sources, not user input -->
        {@html diagramSvg}
      </div>
    </div>
    <div class="flex gap-16">
      <a
        href={`https://mermaid.live/edit#pako:${pakoStr}`}
        target="_blank"
        rel="noreferrer"
        class="kern-btn kern-btn--primary"
      >
        <span
          class="kern-icon kern-icon--open-in-new kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">Im Editor öffnen</span>
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
  {/if}
</div>
