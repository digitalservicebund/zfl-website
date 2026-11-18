const ORIGINAL_TABINDEX_ATTR = "data-scope-focusable-original-tabindex";
const FOCUSABLE_SELECTOR =
  "a[href], button, input, select, textarea, [tabindex]";

// Removes `node`'s interactive descendants from the Tab order while `active`
// is false, without hiding them from screen readers - unlike inert/aria-hidden/
// display:none, tabindex="-1" only affects sequential focus navigation.
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
