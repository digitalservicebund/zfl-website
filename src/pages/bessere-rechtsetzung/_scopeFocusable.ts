const ORIGINAL_TABINDEX_ATTR = "data-scope-focusable-original-tabindex";
const FOCUSABLE_SELECTOR =
  "a[href], button, input, select, textarea, [tabindex]";

// Keeps `node`'s interactive descendants reachable by screen readers at all
// times, while removing them from the sighted keyboard Tab sequence whenever
// `active` is false. `tabindex="-1"` (unlike `inert`/`aria-hidden`/
// `display:none`) only affects sequential focus navigation, not
// accessibility-tree membership - swapping it for any of those would put
// this cluster's owned sidebar content (see `_Cluster.svelte`'s static
// `aria-owns`) back behind the same "is it active *right now*" race this
// exists to avoid.
export function scopeFocusable(node: HTMLElement, active: boolean) {
  function apply(isActive: boolean) {
    node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR).forEach((el) => {
      if (isActive) {
        const original = el.getAttribute(ORIGINAL_TABINDEX_ATTR);
        if (original === null) return;
        el.removeAttribute(ORIGINAL_TABINDEX_ATTR);
        if (original === "none") el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", original);
      } else if (!el.hasAttribute(ORIGINAL_TABINDEX_ATTR)) {
        el.setAttribute(
          ORIGINAL_TABINDEX_ATTR,
          el.getAttribute("tabindex") ?? "none",
        );
        el.setAttribute("tabindex", "-1");
      }
    });
  }

  apply(active);

  return {
    update(nextActive: boolean) {
      apply(nextActive);
    },
  };
}
