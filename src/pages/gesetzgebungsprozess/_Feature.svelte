<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { icons } from "./_icons.ts";
  import BubbleIcon from "./_BubbleIcon.svelte";
  import {
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
    type BubbleHighlightContext,
  } from "./_bubbleHighlight";

  let {
    title,
    children,
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
    icon: keyof typeof icons;
    tag: string;
    color?: string;
  } = $props();

  const highlightContext = getContext<BubbleHighlightContext>(
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
  );

  // const isHighlighted = $derived(highlightContext.highlighted.includes(tag));

  const toggle = () => highlightContext.toggleHighlighted(tag);
</script>

<div class="flex items-start gap-24">
  <button
    type="button"
    class="flex items-start rounded-full"
    title="Schritte hervorheben"
    onfocus={toggle}
    onblur={toggle}
    onmouseenter={toggle}
    onmouseleave={toggle}
  >
    <BubbleIcon {icon} {color} /></button
  >
  <div class="space-y-16">
    <p>
      {#if title}
        <button
          type="button"
          title="Schritte hervorheben"
          class="kern-link text-left"
          onfocus={toggle}
          onblur={toggle}
          onmouseenter={toggle}
          onmouseleave={toggle}
        >
          <strong>{title}: </strong>
        </button>
      {/if}
      {@render children()}
    </p>
  </div>
</div>
