// Shared Svelte context key linking a `_Section.svelte` instance to the
// `_Cluster.svelte` instances nested inside it, so a Cluster that has no
// `title`/highlight identity of its own (it's just a member of the group)
// can still pick up the enclosing Section's active state - e.g. for the
// `z-10` bump on its bubble content while the group is the current sidebar
// step.
export const FLOW_SECTION_CONTEXT_NAME = Symbol("flow-section");

export interface FlowSectionContext {
  /** Whether the enclosing Section's shared highlight state is currently active - read live via a getter. */
  readonly isActive: boolean;
}
