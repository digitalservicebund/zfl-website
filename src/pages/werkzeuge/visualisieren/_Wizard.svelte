<script lang="ts">
  import mermaid from "mermaid";
  import { deflate } from "pako";
  import { examples } from "./_data.ts";

  mermaid.initialize({ startOnLoad: false });

  const mermaidSources = import.meta.glob<string>("./_data/*/*.mmd", {
    query: "?raw",
    import: "default",
  });

  let selectedTitle = $state(examples[0]?.title);

  let selectedExample = $derived(
    examples.find((example) => example.title === selectedTitle),
  );

  let selectedType = $state<string>();

  $effect(() => {
    selectedType = selectedExample?.visOptions[0]?.name;
  });

  let selectedOption = $derived(
    selectedExample?.visOptions.find((option) => option.name === selectedType),
  );

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
    mermaidSources[path]().then((source) => {
      if (!cancelled) mermaidSource = source;
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

  function onWheel(event: WheelEvent) {
    event.preventDefault();

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const newScale = Math.min(Math.max(scale - event.deltaY * 0.003, 0.2), 5);
    const ratio = newScale / scale;

    translateX = mouseX - (mouseX - translateX) * ratio;
    translateY = mouseY - (mouseY - translateY) * ratio;
    scale = newScale;
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
          <option value={example.title}>{example.title} ({example.short})</option>
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
      class="touch-none cursor-grab overflow-hidden rounded-md border active:cursor-grabbing"
      onwheel={onWheel}
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onpointerleave={onPointerUp}
    >
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
      <a
        href={`https://mermaid.ink/svg/pako:${pakoStr}`}
        target="_blank"
        rel="noreferrer"
        class="kern-btn kern-btn--secondary"
      >
        <span
          class="kern-icon kern-icon--open-in-new kern-icon--default"
          aria-hidden="true"
        ></span>
        <span class="kern-label">SVG Export</span>
      </a>
    </div>
  {/if}
</div>
