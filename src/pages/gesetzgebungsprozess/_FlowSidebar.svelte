<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";
  import {
    BUBBLE_SIDEBAR_CONTEXT_NAME,
    BUBBLE_SIDEBAR_STEP_PARAM,
    type FlowSidebarContent,
  } from "./_flowSidebar";

  // Wraps `children` (rather than being placed as a plain sibling) so that
  // the context set below - which Svelte only propagates to a component's
  // own descendants - reaches every `_Bubble.svelte` instance rendered
  // inside it, no matter how deeply nested.
  let { children }: { children: Snippet } = $props();

  // Every bubble registers its content here as soon as it mounts (regardless
  // of whether it's ever clicked), so a bubble can be shown straight from a
  // shared `?step=` link or via the browser back/forward buttons.
  let registry = $state<Record<string, FlowSidebarContent>>({});
  let activeId = $state<string | null>(null);

  const content = $derived(activeId ? (registry[activeId] ?? null) : null);

  function register(entry: FlowSidebarContent) {
    registry[entry.id] = entry;
  }

  function unregister(id: string) {
    delete registry[id];
  }

  function readStepFromUrl(): string | null {
    return new URLSearchParams(location.search).get(BUBBLE_SIDEBAR_STEP_PARAM);
  }

  // Pushes a new history entry reflecting the current `activeId`, so the
  // sidebar state is shareable via URL and the back/forward buttons step
  // through opened/closed bubbles.
  function syncUrl() {
    const url = new URL(location.href);
    if (activeId) {
      url.searchParams.set(BUBBLE_SIDEBAR_STEP_PARAM, activeId);
    } else {
      url.searchParams.delete(BUBBLE_SIDEBAR_STEP_PARAM);
    }
    history.pushState(history.state, "", url);
  }

  function toggle(next: FlowSidebarContent) {
    register(next);
    activeId = activeId === next.id ? null : next.id;
    syncUrl();
  }

  function close() {
    activeId = null;
    syncUrl();
  }

  // Ids of all currently registered Cluster steps, in registration order
  // (which follows page/DOM order), used to cycle "Zurück"/"Weiter" through
  // cluster steps only - Bubbles don't participate in this sequence.
  const clusterIds = $derived(
    Object.values(registry)
      .filter((entry) => entry.kind === "cluster")
      .map((entry) => entry.id),
  );

  function navigateCluster(step: -1 | 1) {
    if (!content || content.kind !== "cluster" || clusterIds.length === 0) {
      return;
    }

    const currentIndex = clusterIds.indexOf(content.id);
    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + step + clusterIds.length) % clusterIds.length;
    const nextId = clusterIds[nextIndex];
    const nextContent = registry[nextId];
    if (!nextContent) return;

    activeId = nextContent.id;
    syncUrl();
  }

  $effect(() => {
    // Open straight from a shared link on first render. Bubbles register
    // themselves synchronously during their own setup, so by the time this
    // effect runs, the registry already reflects everything currently
    // rendered - but `content` above re-derives from `registry` on every
    // change anyway, so this is safe even if ordering ever changed.
    activeId = readStepFromUrl();

    function onPopState() {
      activeId = readStepFromUrl();
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  });

  setContext(BUBBLE_SIDEBAR_CONTEXT_NAME, {
    get activeId() {
      return activeId;
    },
    register,
    unregister,
    toggle,
    close,
  });
</script>

{@render children()}

{#if content}
  <div
    class="fixed inset-y-0 right-0 z-50 flex h-full w-420 max-w-full flex-col border-l border-lavender-400 bg-[#E9EEF3] shadow-lg"
    transition:fly={{ x: 420, duration: 250 }}
  >
    <div
      class="flex items-center justify-between gap-16 border-b border-lavender-400 p-24"
    >
      <h2 class="kern-heading-small">{content.title}</h2>
      <button
        type="button"
        class="shrink-0 rounded-sm border border-cosmic-blue-base p-8 text-cosmic-blue-base"
        onclick={close}
        aria-label="Seitenleiste schließen"
      >
        ✕
      </button>
    </div>
    <div class="kern-body--small flex-1 overflow-y-auto p-24">
      {@render content.children()}
    </div>
    {#if content.kind === "cluster"}
      <div class="p-24 flex justify-end gap-8">
        <button
          type="button"
          class="kern-btn kern-btn--secondary"
          onclick={() => navigateCluster(-1)}
        >
          <span class="kern-label">Zurück</span>
        </button>
        <button
          type="button"
          class="kern-btn kern-btn--primary"
          onclick={() => navigateCluster(1)}
        >
          <span class="kern-label">Weiter</span>
        </button>
      </div>
    {/if}
  </div>
{/if}
