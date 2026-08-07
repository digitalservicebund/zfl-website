<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import type { Snippet } from "svelte";
  import BubbleIcon from "./_BubbleIcon.svelte";
  import ArrowUp from "~icons/ic/round-keyboard-arrow-up";
  import ArrowDown from "~icons/ic/round-keyboard-arrow-down";

  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";
  import { iconMap, type TagName } from "./_icons";

  let {
    children,
    details,
    tag,
    // Defaults to the wrapping Cluster's own color: `_FlowSidebar.svelte`
    // sets `--content-color` on its wrapper from the active Cluster/Bubble's
    // `color`, and Feature is only ever rendered inside a Cluster's
    // `sidebar` snippet, so this always tracks that Cluster's color without
    // needing it passed down explicitly (Svelte context wouldn't work here,
    // since the sidebar snippet renders inside `_FlowSidebar.svelte`, not as
    // a descendant of the Cluster that defines it).
    color = "var(--content-color)",
  }: {
    children: Snippet;
    details?: Snippet;
    tag: TagName;
    color?: string;
  } = $props();

  const icon = $derived(iconMap[tag]);

  const highlightContext = getContext<BubbleHighlightContext>(
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
  );

  // True only while a real mouse hover (not a click/tap) is previewing this
  // Feature's highlight, so a subsequent click can pin it open instead of
  // immediately toggling it back off, and hovering alone doesn't expand
  // the details panel below.
  let previewing = $state(false);

  // Explicit state driven by click/tap rather than `:focus-within` — iOS
  // Safari doesn't focus buttons on tap, so a focus-based active state
  // never activates on touch. Deriving from the shared highlight list
  // (rather than local state) also gives accordion behaviour for free:
  // `toggleHighlighted` replaces the whole list, so opening one Feature
  // always closes any other that's open.
  const expanded = $derived(
    highlightContext.highlighted.includes(tag) && !previewing,
  );

  let canHover = $state(false);
  $effect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    canHover = mql.matches;
    const onChange = (e: MediaQueryListEvent) => (canHover = e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  });

  function previewOn() {
    // Don't steal the highlight from whichever Feature is pinned open.
    if (!canHover || highlightContext.highlighted.length > 0) return;
    highlightContext.setHighlighted(tag);
    previewing = true;
  }

  function previewOff() {
    if (!previewing) return;
    highlightContext.setHighlighted(null);
    previewing = false;
  }

  function toggle() {
    if (previewing) {
      // Already highlighted by hover - clicking pins it open rather than
      // toggling it straight back off.
      previewing = false;
      return;
    }
    highlightContext.toggleHighlighted(tag);
  }

  onDestroy(() => {
    highlightContext.setHighlighted(null);
  });
</script>

<div
  class="group grid grid-cols-[auto_1fr_auto] items-start gap-x-(--feature-spacing) rounded-sm border border-(--border-color) [--feature-spacing:16px]"
  title="Schritte hervorheben"
  style="--border-color: var(--kern-color-decorative-border-default);"
>
  <button
    type="button"
    aria-expanded={details ? expanded : undefined}
    class="col-span-3 grid grid-cols-subgrid items-start max-md:gap-y-(--feature-spacing) text-left focus-visible:outline-4 outline-offset-2 rounded-sm focus-visible:outline-(--kern-color-action-focus-default) p-(--feature-spacing) hover:bg-(--border-color)/20 cursor-pointer aria-expanded:bg-(--border-color)/20"
    onclick={toggle}
    onmouseenter={previewOn}
    onmouseleave={previewOff}
  >
    <div
      class="max-md:col-start-1 max-md:row-start-1 flex flex-col items-center justify-between self-stretch rounded-full"
    >
      <BubbleIcon {icon} {color} />
    </div>
    <div
      class="max-md:col-span-3 max-md:col-start-1 max-md:row-start-2 text-left"
    >
      {@render children()}
    </div>
    {#if details}
      <div
        class="max-md:col-start-3 max-md:row-start-1 text-icon-muted shrink-0 -ml-8 text-xl"
        aria-hidden="true"
      >
        {#if expanded}
          <ArrowUp />
        {:else}
          <ArrowDown />
        {/if}
      </div>
    {/if}
  </button>
  {#if details}
    <div
      class={`md:col-start-2 max-md:col-span-3 max-md:col-start-1 grid transition-[grid-template-rows] duration-100 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div class="overflow-hidden" aria-hidden={!expanded} inert={!expanded}>
        <div class="py-(--feature-spacing) max-md:px-(--feature-spacing)">
          {@render details?.()}
        </div>
      </div>
    </div>
  {/if}
</div>
