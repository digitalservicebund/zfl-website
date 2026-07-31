<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { icons } from "./_icons.ts";
  import BubbleIcon from "./_BubbleIcon.svelte";
  import ArrowUp from "~icons/ic/round-keyboard-arrow-up";
  import ArrowDown from "~icons/ic/round-keyboard-arrow-down";

  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";

  let {
    title,
    children,
    details,
    icon,
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
    title?: string;
    children: Snippet;
    details?: Snippet;
    icon: keyof typeof icons;
    tag: string;
    color?: string;
  } = $props();

  const highlightContext = getContext<BubbleHighlightContext>(
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
  );

  // const isHighlighted = $derived(highlightContext.highlighted.includes(tag));
  const enable = () => highlightContext.setHighlighted(tag);
  const disable = () => highlightContext.setHighlighted(null);
</script>

<button
  type="button"
  data-feature-button
  class={`group flex items-start gap-24 p-24 rounded-sm border border-(--content-color) hover:bg-(--content-color)/20 focus:bg-(--content-color)/20 focus:outline-2 focus:outline-(--content-color)`}
  title="Schritte hervorheben"
  onmousedown={(e) => {
    if (document.activeElement === e.currentTarget) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }}
  onmouseenter={() =>
    !document.activeElement?.hasAttribute("data-feature-button") && enable()}
  onmouseleave={() =>
    !document.activeElement?.hasAttribute("data-feature-button") && disable()}
  onfocus={enable}
  onblur={disable}
>
  <div
    class="flex flex-col items-center justify-between self-stretch rounded-full"
  >
    <BubbleIcon {icon} {color} />
    <div class="text-icon-muted" aria-hidden="true">
      {#if details}
        <ArrowDown class="group-focus:hidden" />
        <ArrowUp class="hidden group-focus:block" />
      {/if}
    </div>
  </div>
  <div class="text-left">
    <div>
      {#if title}
        <strong>{title}: </strong>
      {/if}
      {@render children()}
    </div>
    {#if details}
      <div
        class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-100 ease-in-out group-focus:grid-rows-[1fr]"
      >
        <div class="overflow-hidden">
          <div class="mt-16">
            {@render details?.()}
          </div>
        </div>
      </div>
    {/if}
  </div>
</button>
