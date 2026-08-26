import { slugify } from "@/utils/slugify";

const HEADING_SELECTOR = "h1, h2, h3, h4, h5, h6";

export type TocNode = {
  id: string;
  label: string;
  children: TocNode[];
};

function buildTocTree(headings: HTMLHeadingElement[]): TocNode[] {
  const root: TocNode[] = [];
  const stack: { level: number; node: TocNode }[] = [];

  for (const heading of headings) {
    const label =
      heading.dataset.tocLabel?.trim() || (heading.textContent ?? "").trim();
    if (!label) continue;

    if (!heading.id) {
      heading.id = slugify(label);
    }

    const level = Number(heading.tagName[1]);
    const node: TocNode = { id: heading.id, label, children: [] };

    // -1 as fallback keeps the condition false when the stack is empty.
    while ((stack.at(-1)?.level ?? -1) >= level) {
      stack.pop();
    }

    const parent = stack.at(-1);
    (parent ? parent.node.children : root).push(node);
    stack.push({ level, node });
  }

  return root;
}

/**
 * Scans `contentRoot` for heading elements and returns them as a nested
 * tree, nested by heading level. Headings without an `id` get one
 * generated via `slugify`, and a heading's label can be overridden with a
 * `data-toc-label` attribute.
 */
export function getTocTree(
  contentRoot: ParentNode,
  { excludeSelector = ".kern-card, .kern-accordion" } = {},
): TocNode[] {
  const headings = Array.from(
    contentRoot.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR),
  ).filter((heading) => !heading.closest(excludeSelector));

  return buildTocTree(headings);
}

/**
 * Alpine.js component for SidebarContainer.astro. Populates `items` from
 * the headings found in the element passed to `setup` (see x-init="setup($el)").
 * Register with: Alpine.data("sidebarToc", sidebarTocData)
 */
export function sidebarTocData() {
  return {
    items: [] as TocNode[],
    setup(el: HTMLElement) {
      const content = el.querySelector<HTMLElement>("[data-sidebar-content]");
      if (content) this.items = getTocTree(content);
    },
  };
}
