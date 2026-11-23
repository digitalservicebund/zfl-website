import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import Callout from "./Callout.astro";

const icon = '<svg data-icon="test"></svg>';
const text = "<p>Ein kurzer Hinweis.</p>";

async function render(
  props: Record<string, unknown> = {},
  slots: Record<string, string> = { icon, default: text },
) {
  const { dom } = await renderToDOM(Callout, { props, slots });
  const callout = dom.body.firstElementChild!;
  return callout;
}

const hasClass = (element: Element | null | undefined, className: string) =>
  element?.classList.contains(className) ?? false;

describe("Callout tag", () => {
  it("renders a div by default", async () => {
    const callout = await render();
    expect(callout.tagName).toBe("DIV");
  });

  it("renders an li with as='li'", async () => {
    const callout = await render({ as: "li" });
    expect(callout.tagName).toBe("LI");
  });
});

describe("Callout variant", () => {
  it("uses the surface background by default", async () => {
    const callout = await render();
    expect(hasClass(callout, "bg-surface-default")).toBe(true);
    expect(hasClass(callout, "bg-white")).toBe(false);
  });

  it("uses the white background with variant='white'", async () => {
    const callout = await render({ variant: "white" });
    expect(hasClass(callout, "bg-white")).toBe(true);
    expect(hasClass(callout, "bg-surface-default")).toBe(false);
  });
});

describe("Callout class", () => {
  it("adds classes from class to the base classes", async () => {
    const callout = await render({ class: "mb-md" });
    expect(hasClass(callout, "mb-md")).toBe(true);
    expect(hasClass(callout, "rounded-sm")).toBe(true);
  });
});

describe("Callout icon", () => {
  it("renders the icon in a box before the content", async () => {
    const callout = await render();
    const iconBox = callout.firstElementChild;
    expect(iconBox?.querySelector('svg[data-icon="test"]')).toBeTruthy();
  });

  it("hides the icon box from assistive technology", async () => {
    const callout = await render();
    expect(callout.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders no icon box without an icon", async () => {
    const callout = await render({}, { default: text });
    expect([...callout.children].map((child) => child.tagName)).toEqual(["P"]);
  });
});

describe("Callout content", () => {
  it("puts multiple children directly into the callout, without a wrapper", async () => {
    const callout = await render(
      {},
      { icon, default: "<p>Erster Absatz.</p><p>Zweiter Absatz.</p>" },
    );
    const [, ...content] = [...callout.children];
    expect(content.map((child) => child.textContent)).toEqual([
      "Erster Absatz.",
      "Zweiter Absatz.",
    ]);
  });
});
