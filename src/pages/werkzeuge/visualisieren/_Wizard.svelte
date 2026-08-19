<script lang="ts">
  import mermaid from "mermaid";
  import { deflate } from "pako";
  import {
    isMermaidFlowchart,
    mermaidFlowchartToRulemapXml,
  } from "./_mermaid2RulemapXML.ts";
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

  const initialSearchParams =
    typeof window === "undefined"
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
  const initialNorm = initialSearchParams.get("norm");
  const initialVisualization = initialSearchParams.get("visualization");
  let hasAppliedInitialVisualization = false;

  let selectedTitle = $state(
    examples.find((example) => example.short === initialNorm)?.title ??
      examples[0]?.title,
  );

  let selectedExample = $derived(
    examples.find((example) => example.title === selectedTitle),
  );

  let selectedType = $state<string>();

  $effect(() => {
    if (!selectedExample) {
      selectedType = undefined;
      return;
    }

    if (!hasAppliedInitialVisualization) {
      hasAppliedInitialVisualization = true;
      const initialOption = selectedExample.visOptions.find(
        (option) => option.name === initialVisualization,
      );
      if (initialOption) {
        selectedType = initialOption.name;
        return;
      }
    }

    selectedType = selectedExample.visOptions[0]?.name;
  });

  let selectedOption = $derived(
    selectedExample?.visOptions.find((option) => option.name === selectedType),
  );

  $effect(() => {
    if (!selectedExample || !selectedOption) return;

    const params = new URLSearchParams(window.location.search);
    params.set("norm", selectedExample.short);
    params.set("visualization", selectedOption.name);
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
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
      return;
    }

    let cancelled = false;
    isLoading = true;

    const path = `./_data/${selectedExample.short}/${selectedOption.filename}.mmd`;
    const eli = selectedExample.eli;
    mermaidSources[path]().then((source) => {
      if (!cancelled) mermaidSource = resolveNormLinks(source, eli);
    });

    return () => {
      cancelled = true;
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

<div class="space-y-24 min-h-[50vh]">
  <div class="kern-form-input">
    <label class="kern-label" for="gesetz">Gesetz</label>
    <div class="kern-form-input__select-wrapper">
      <select
        class="kern-form-input__select"
        id="gesetz"
        bind:value={selectedTitle}
      >
        {#each examples as example (example.title)}
          <option value={example.title}
            >{example.title} ({example.short})</option
          >
        {/each}
      </select>
    </div>
  </div>
  {#if selectedExample}
    <div class="kern-form-input">
      <label class="kern-label" for="darstellung">Darstellung</label>
      <div class="kern-form-input__select-wrapper">
        <select
          class="kern-form-input__select"
          id="darstellung"
          bind:value={selectedType}
        >
          {#each selectedExample.visOptions as option (option.name)}
            <option value={option.name}>{option.name}</option>
          {/each}
        </select>
      </div>
    </div>
  {/if}
  {#if isLoading}
    <div class="flex justify-center p-32">
      <div class="kern-loader kern-loader--visible" role="status">
        <span class="kern-sr-only">Wird geladen…</span>
      </div>
    </div>
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
