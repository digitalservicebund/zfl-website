import "@/styles/global.css";
import type { ContainerRenderOptions } from "astro/container";
import type { ComponentProps } from "astro/types";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { commands, page } from "vitest/browser";
import type TimelineList from "./TimelineList.astro";
import type { FixtureItem } from "./__fixtures__/TimelineListFixture.astro";

// Defined in vitest.browser.config.ts
declare module "vitest/browser" {
  interface BrowserCommands {
    renderAstro: (
      path: string,
      options?: ContainerRenderOptions,
    ) => Promise<string>;
  }
}

type ListProps = ComponentProps<typeof TimelineList>;
type ItemType = "default" | "plain" | "year";

// Theme color for dots and lines, set per repo in the @theme of global.css
const COLOR_VAR = "--color-timeline-list";

// Vitest's default browser viewport, narrower than the lg breakpoint
const DEFAULT_VIEWPORT = { width: 414, height: 896 };

/*
  What each dimension should produce. Add a TimelineList variant here to test
  it: the test can't read the variants from the .astro file, whose props are
  untyped in .ts files.
*/
const variantStyles = {
  default: { marginLeft: "0px", padding: { left: "40px", bottom: "24px" } },
  changelog: { marginLeft: "26px", padding: { left: "48px", bottom: "40px" } },
};

type Variant = keyof typeof variantStyles;

const itemStyles: Record<
  ItemType,
  {
    dot: boolean;
    lineTop?: string;
    lineHeight?: string;
    padding?: { left: string; bottom: string };
  }
> = {
  default: { dot: true, lineTop: "24px" },
  plain: { dot: false, lineTop: "0px" },
  year: {
    dot: false,
    lineHeight: "28px",
    padding: { left: "0px", bottom: "32px" },
  },
};

const items: Record<ItemType, FixtureItem> = {
  default: { html: "<h3>Eintrag</h3><p>Zwei Zeilen<br />Text.</p>" },
  plain: { type: "plain", html: "<p>Hinweis</p>" },
  year: { type: "year", label: "2026" },
};

// Every item type, and each of them as first, middle and last item
const itemOrder: ItemType[] = ["year", "default", "plain", "default"];

const css = (el: Element, pseudo?: string) => getComputedStyle(el, pseudo);

/** The color a CSS variable resolves to, read from a probe element. */
const resolveColor = (variable: string) => {
  const probe = document.createElement("div");
  probe.style.backgroundColor = `var(${variable})`;
  document.body.append(probe);
  const color = css(probe).backgroundColor;
  probe.remove();
  return color;
};

const render = async (list: ListProps, listItems: FixtureItem[]) => {
  document.body.innerHTML = await commands.renderAstro(
    "/src/components/__fixtures__/TimelineListFixture.astro",
    { props: { list, items: listItems } },
  );
  return document.querySelector("ol")!;
};

const variants = Object.keys(variantStyles) as Variant[];

describe("TimelineList theme color", () => {
  it("is defined, so dots and lines are visible", () => {
    expect(resolveColor(COLOR_VAR)).not.toBe("rgba(0, 0, 0, 0)");
  });
});

describe("TimelineList", () => {
  describe.each(variants)("variant=%s", (variant) => {
    let list: HTMLOListElement;
    let color: string;

    beforeAll(async () => {
      list = await render(
        { variant },
        itemOrder.map((type) => items[type]),
      );
      color = resolveColor(COLOR_VAR);
    });

    it("indents the list", () => {
      expect(css(list).marginLeft).toBe(variantStyles[variant].marginLeft);
    });

    describe.each(itemOrder.map((type, index) => ({ type, index })))(
      "item $index ($type)",
      ({ type, index }) => {
        const item = () => list.children[index] as HTMLLIElement;
        const expected = itemStyles[type];

        it("has the expected padding", () => {
          const padding = expected.padding ?? variantStyles[variant].padding;
          expect(css(item())).toMatchObject({
            paddingLeft: padding.left,
            paddingBottom: padding.bottom,
          });
        });

        it(
          expected.dot ? "draws a 16px dot in the theme color" : "draws no dot",
          () => {
            const before = css(item(), "::before");
            if (!expected.dot) {
              expect(before.content).toBe("none");
              return;
            }
            expect(before).toMatchObject({
              width: "16px",
              height: "16px",
              top: "4px",
              left: "0px",
              backgroundColor: color,
            });
          },
        );

        it("draws a 1px line in the theme color", () => {
          const after = css(item(), "::after");
          expect(after).toMatchObject({
            width: "1px",
            left: "7.5px",
            backgroundColor: color,
          });
          if (expected.lineTop) expect(after.top).toBe(expected.lineTop);
          if (expected.lineHeight) {
            expect(after.height).toBe(expected.lineHeight);
          } else {
            // the line runs to the bottom of the item
            expect(
              parseFloat(after.top) + parseFloat(after.height),
            ).toBeCloseTo(item().offsetHeight, 0);
          }
        });
      },
    );
  });
});

describe("TimelineList attributes and overrides", () => {
  it("keeps list semantics without list markers", async () => {
    const list = await render({}, [items.default]);
    expect(list.getAttribute("role")).toBe("list");
    expect(css(list).listStyleType).toBe("none");
  });

  it("can be recolored per list through the theme variable", async () => {
    const list = await render(
      { class: "[--color-timeline-list:rgb(255,0,0)]" },
      [items.default],
    );
    const item = list.querySelector("li")!;
    expect(css(item, "::before").backgroundColor).toBe("rgb(255, 0, 0)");
    expect(css(item, "::after").backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("merges a class on the list", async () => {
    const list = await render({ variant: "changelog", class: "[&_h3]:mt-16" }, [
      items.default,
    ]);
    expect(css(list.querySelector("h3")!).marginTop).toBe("16px");
  });

  it("lets utilities on an item override the timeline styles", async () => {
    const list = await render({}, [
      { type: "plain", class: "pt-8 after:hidden", html: "Falls zutreffend:" },
    ]);
    const item = list.querySelector("li")!;
    expect(css(item).paddingTop).toBe("8px");
    expect(css(item, "::after").display).toBe("none");
  });

  it("lets a class on an item override the list's padding", async () => {
    const list = await render({ variant: "changelog" }, [
      { class: "pb-8 pl-16", html: "<h3>Eintrag</h3>" },
    ]);
    expect(css(list.querySelector("li")!)).toMatchObject({
      paddingBottom: "8px",
      paddingLeft: "16px",
    });
  });

  it("puts the label badge above the content", async () => {
    const list = await render({}, [
      { label: "Oktober 2026", html: "<h3>Eintrag</h3>" },
    ]);
    const first = list.querySelector("li")!.firstElementChild!;
    expect(first.classList).toContain("kern-badge");
    expect(first.textContent?.trim()).toBe("Oktober 2026");
  });

  it("centers year badges on the line", async () => {
    const list = await render({ variant: "changelog" }, [items.year]);
    const item = list.querySelector("li")!;
    const itemBox = item.getBoundingClientRect();
    const badge = item.querySelector(".kern-badge")!.getBoundingClientRect();
    expect(item.textContent?.trim()).toBe("2026");
    // the 1px line sits at 7.5px, so its center is 8px from the item's left edge
    expect(badge.left + badge.width / 2).toBeCloseTo(itemBox.left + 8, 0);
  });

  it("passes attributes through to the list", async () => {
    const list = await render({ id: "timeline", "aria-label": "Ablauf" }, [
      items.default,
    ]);
    expect(list.id).toBe("timeline");
    expect(list.getAttribute("aria-label")).toBe("Ablauf");
  });

  it("passes attributes through to the items", async () => {
    const list = await render({}, [
      { "data-entry-index": "0", tabindex: -1, html: "<h3>Eintrag</h3>" },
    ]);
    const item = list.querySelector("li")!;
    expect(item.dataset.entryIndex).toBe("0");
    expect(item.tabIndex).toBe(-1);
  });
});

describe("TimelineList variant=horizontal", () => {
  const steps: FixtureItem[] = ["Woche 1", "Woche 2–4", "Woche 5–6"].map(
    (label) => ({
      label,
      filledBadge: true,
      html: "<h5>Schritt</h5><ul><li>Punkt</li></ul>",
    }),
  );

  describe("from lg", () => {
    let list: HTMLOListElement;
    let items: HTMLLIElement[];

    beforeAll(async () => {
      await page.viewport(1280, 800);
      list = await render({ variant: "horizontal" }, steps);
      items = [...list.children] as HTMLLIElement[];
    });

    afterAll(async () => {
      await page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height);
    });

    it("lays the items out as equal columns, 32px apart", () => {
      expect(css(list)).toMatchObject({ display: "grid", columnGap: "32px" });
      const widths = items.map((item) => item.getBoundingClientRect().width);
      for (const width of widths) expect(width).toBeCloseTo(widths[0]!, 0);
      const [first, second] = items.map((item) => item.getBoundingClientRect());
      expect(second!.top).toBeCloseTo(first!.top, 0);
    });

    it("removes the vertical padding", () => {
      for (const item of items) {
        expect(css(item)).toMatchObject({
          paddingLeft: "0px",
          paddingBottom: "0px",
        });
      }
    });

    it("puts the dot below the badge", () => {
      expect(css(items[0]!, "::before")).toMatchObject({
        top: "40px",
        left: "4px",
        width: "16px",
        height: "16px",
      });
    });

    it("draws the line from the dot through the gap to the next column", () => {
      expect(css(items[0]!, "::after")).toMatchObject({
        top: "47.5px",
        left: "24px",
        right: "-32px",
        height: "1px",
      });
    });

    it("ends the last line at its column", () => {
      expect(css(items.at(-1)!, "::after").right).toBe("0px");
    });

    it("starts the content 72px below the top of the item", () => {
      const item = items[0]!.getBoundingClientRect();
      const heading = items[0]!.querySelector("h5")!.getBoundingClientRect();
      expect(heading.top - item.top).toBeCloseTo(72, 0);
    });

    it("keeps the same layout for items without a label", async () => {
      const mixed = await render({ variant: "horizontal" }, [
        steps[0]!,
        { html: "<h5>Schritt</h5>" },
      ]);
      const [withLabel, withoutLabel] = [...mixed.children];
      const headingTop = (item: Element) =>
        item.querySelector("h5")!.getBoundingClientRect().top -
        item.getBoundingClientRect().top;
      expect(headingTop(withoutLabel!)).toBeCloseTo(headingTop(withLabel!), 0);
      expect(css(withoutLabel!, "::before").top).toBe("40px");
      // render() replaced the page, so restore the list the other tests use
      list = await render({ variant: "horizontal" }, steps);
      items = [...list.children] as HTMLLIElement[];
    });

    it("uses the filled step badge", () => {
      const badge = items[0]!.querySelector(".kern-badge")!;
      expect(css(badge).backgroundColor).toBe(
        resolveColor("--color-cosmic-blue-base"),
      );
    });
  });

  describe("below lg", () => {
    it("falls back to the vertical timeline", async () => {
      const list = await render({ variant: "horizontal" }, steps);
      const item = list.children[0]!;
      expect(css(list).display).toBe("block");
      expect(css(item)).toMatchObject({
        paddingLeft: variantStyles.default.padding.left,
        paddingBottom: variantStyles.default.padding.bottom,
      });
      expect(css(item, "::before").top).toBe("4px");
      expect(css(item, "::after").top).toBe("24px");
    });
  });
});
