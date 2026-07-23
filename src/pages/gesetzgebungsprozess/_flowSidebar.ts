import type { Snippet } from "svelte";

// Shared Svelte context identifier linking a single, global `_FlowSidebar.svelte`
// instance (mounted once near the top of the tree) to every `_Bubble.svelte`
// instance beneath it, so clicking any bubble can open/toggle the same
// sidebar with that bubble's content instead of each bubble rendering its
// own popup.
export const FLOW_SIDEBAR_CONTEXT_NAME = Symbol("flow-sidebar");

// Search param used to make the currently open bubble shareable/bookmarkable
// (e.g. `?step=Materialrecherche`) and to support the browser back/forward
// buttons.
export const FLOW_SIDEBAR_STEP_PARAM = "step";

export interface FlowSidebarContent {
  /** Unique identifier of the bubble whose content is shown, e.g. its title. */
  id: string;
  title: string;
  children: Snippet;
  /**
   * Fill color of the bubble/cluster that opened this content, e.g. a hex
   * code. Used by `_FlowSidebar.svelte` to tint its background in a softer
   * version of that color.
   */
  color?: string;
  /**
   * Distinguishes a `_Bubble.svelte` entry from a `_Cluster.svelte` entry, so
   * the sidebar's "Zurück"/"Weiter" navigation cycles through steps of the
   * same kind as the currently open one, without mixing bubbles and
   * clusters into a single sequence.
   */
  kind: "bubble" | "cluster";
}

export interface FlowSidebarContext {
  /** Id of the bubble currently shown in the sidebar, if any. */
  readonly activeId: string | null;
  /**
   * Registers a bubble's content so it can be shown - including when the
   * sidebar is opened straight from a `?step=` URL or via the browser
   * back/forward buttons, before the bubble has ever been clicked.
   */
  register(content: FlowSidebarContent): void;
  unregister(id: string): void;
  /**
   * Opens the sidebar with the already-registered content for `id`, or
   * closes it if already open for that id.
   */
  toggle(id: string): void;
  close(): void;
}
