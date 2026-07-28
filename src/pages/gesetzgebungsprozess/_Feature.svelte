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
    children: Snippet;
    icon: keyof typeof icons;
    tag: string;
    color?: string;
  } = $props();

  const highlightContext = getContext<BubbleHighlightContext>(
    BUBBLE_HIGHLIGHT_CONTEXT_NAME,
  );

  const isHighlighted = $derived(highlightContext.highlighted.includes(tag));
</script>

<div class="flex items-start gap-24">
  <button
    type="button"
    class="flex items-start rounded-full"
    title="Schritte hervorheben"
    onclick={() => highlightContext.toggleHighlighted(tag)}
  >
    <BubbleIcon {icon} {color} /></button
  >
  <div class="space-y-16">
    <p>
      {@render children()}
    </p>
    <button
      type="button"
      class="kern-btn kern-btn--secondary"
      onclick={() => highlightContext.toggleHighlighted(tag)}
    >
      <span class="kern-icon kern-icon--arrow-forward" aria-hidden="true"
      ></span>
      <span class="kern-label">
        {isHighlighted ? "alle zeigen" : "jetzt ansehen"}
      </span>
    </button>
  </div>
</div>
