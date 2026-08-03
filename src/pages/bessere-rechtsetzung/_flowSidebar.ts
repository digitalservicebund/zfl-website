import type { Snippet } from "svelte";

// Shared Svelte context identifier linking a single, global `_FlowSidebar.svelte`
// instance (mounted once near the top of the tree) to every `_Bubble.svelte`
// instance beneath it, so clicking any bubble can open/toggle the same
// sidebar with that bubble's content instead of each bubble rendering its
// own popup.
export const FLOW_SIDEBAR_CONTEXT_NAME = Symbol("flow-sidebar");

export interface FlowSidebarContent {
  /** Unique identifier of the bubble whose content is shown, e.g. its title. */
  id: string;
  title: string;
  /**
   * Sidebar "pages" for this step, always normalized to an array (even for
   * a single page) so `_FlowSidebar.svelte`/`_FlowLayout.svelte` don't need
   * to special-case the single-page case. When a `_Cluster.svelte` defines
   * more than one page, `_FlowLayout.svelte`'s "Zurück"/"Weiter" navigation
   * cycles through these pages before moving on to the previous/next
   * cluster.
   */
  children: Snippet[];
  /**
   * Fill color of the cluster that opened this content
   */
  color?: string;
}

export interface FlowSidebarContext {
  /** Id of the bubble currently shown in the sidebar, if any. */
  readonly activeId: string | null;
  /**
   * Whether the flow is currently auto-scrolling (e.g. via `navigateStep`'s
   * `scrollIntoView`). While true, scroll-driven activation (e.g. a
   * `Cluster`'s `IntersectionObserver`) should be suppressed so it doesn't
   * fight with/override the explicitly requested step.
   */
  readonly isJumping: boolean;
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
  setActive(id: string): void;
  close(): void;
}
