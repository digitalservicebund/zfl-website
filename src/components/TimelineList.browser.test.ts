import "@/styles/global.css";
// The component's <style is:global> block, which the container output doesn't include
import type { ContainerRenderOptions } from "astro/container";
import type { ComponentProps } from "astro/types";
import { beforeAll, describe, expect, it } from "vitest";
import { commands } from "vitest/browser";
import type TimelineList from "./TimelineList.astro";
import "./TimelineList.astro?astro&type=style&index=0&lang.css";

// Defined in vitest.browser.config.ts
declare module "vitest/browser" {
  interface BrowserCommands {
    renderAstro: (
      path: string,
      options?: ContainerRenderOptions,
    ) => Promise<string>;
  }
}

type Props = ComponentProps<typeof TimelineList>;
type Variant = NonNullable<Props["variant"]>;
type ItemType = "default" | "plain" | "year";

// Theme color for dots and lines, set per repo in the @theme of global.css
const COLOR_VAR = "--color-timeline-list";

/*
  What each dimension should produce. `satisfies Record<…>` turns a new
  variant without expectations into a type error.
*/
const variantStyles = {
  default: { marginLeft: "0px", padding: { left: "40px", bottom: "24px" } },
  changelog: { marginLeft: "26px", padding: { left: "48px", bottom: "40px" } },
} satisfies Record<Variant, unknown>;

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

const itemHtml: Record<ItemType, string> = {
  default: "<li><h3>Eintrag</h3><p>Zwei Zeilen<br />Text.</p></li>",
  plain: '<li class="timeline-plain-item"><p>Hinweis</p></li>',
  year: '<li class="timeline-year-item"><span class="timeline-year-badge kern-badge"><span class="kern-label">2026</span></span></li>',
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

const render = async (props: Props, items: string) => {
  document.body.innerHTML = await commands.renderAstro(
    "/src/components/TimelineList.astro",
    { props, slots: { default: items } },
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
        itemOrder.map((type) => itemHtml[type]).join(""),
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
  it("can be recolored per list through the theme variable", async () => {
    const list = await render(
      { class: "[--color-timeline-list:rgb(255,0,0)]" },
      itemHtml.default,
    );
    const item = list.querySelector("li")!;
    expect(css(item, "::before").backgroundColor).toBe("rgb(255, 0, 0)");
    expect(css(item, "::after").backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("merges a class on the list", async () => {
    const list = await render(
      { variant: "changelog", class: "[&_h3]:mt-16" },
      itemHtml.default,
    );
    expect(css(list.querySelector("h3")!).marginTop).toBe("16px");
  });

  it("lets utilities on an item override the timeline styles", async () => {
    const list = await render(
      {},
      '<li class="timeline-plain-item pt-8 after:hidden">Falls zutreffend:</li>',
    );
    const item = list.querySelector("li")!;
    expect(css(item).paddingTop).toBe("8px");
    expect(css(item, "::after").display).toBe("none");
  });

  it("centers year badges on the line", async () => {
    const list = await render({ variant: "changelog" }, itemHtml.year);
    const item = list.querySelector("li")!.getBoundingClientRect();
    const badge = list
      .querySelector(".timeline-year-badge")!
      .getBoundingClientRect();
    // the 1px line sits at 7.5px, so its center is 8px from the item's left edge
    expect(badge.left + badge.width / 2).toBeCloseTo(item.left + 8, 0);
  });

  it("passes attributes through to the list", async () => {
    const list = await render(
      { id: "timeline", "aria-label": "Ablauf" },
      itemHtml.default,
    );
    expect(list.id).toBe("timeline");
    expect(list.getAttribute("aria-label")).toBe("Ablauf");
  });
});
