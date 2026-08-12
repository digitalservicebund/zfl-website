import type { Snippet } from "svelte";

// Context key linking the single global FlowSidebar to every Bubble/Section,
// so clicking any bubble opens the shared sidebar instead of a per-bubble popup.
export const FLOW_SIDEBAR_CONTEXT_NAME = Symbol("flow-sidebar");

export interface FlowSidebarContent {
  id: string;
  title: string;
  child: Snippet;
  /** Fill color of the cluster that opened this content. */
  color?: string;
}

export interface FlowSidebarContext {
  readonly activeId: string | null;
  /** True while auto-scrolling to a step; scroll-driven activation should be suppressed until it ends. */
  readonly isJumping: boolean;
  /** Registers a bubble's content so it can be shown before the bubble has ever been clicked. */
  register(content: FlowSidebarContent): void;
  /** Switches the active id without moving focus - for scroll-driven activation. */
  setActive(id: string): void;
  /** Like `setActive`, but also moves keyboard focus into the sidebar - for explicit clicks/keypresses. */
  activate(id: string): void;
  close(): void;
}
