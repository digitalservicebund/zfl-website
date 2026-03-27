import * as stage from "@/config/stage.ts";
import { renderToDOM } from "@/utils/testUtils.ts";
import { describe, expect, it, test, vi } from "vitest";
import { baseUrl } from "../../vitest.config.ts";
import Layout from "./Layout.astro";

vi.mock("@/components/global/Posthog.astro", () => ({
  default: Object.assign(() => "mocked-posthog", {
    isAstroComponentFactory: true,
  }),
}));

vi.mock("@/config/stage", () => ({
  isProduction: true,
  isStaging: false,
  isPreview: false,
}));

describe("Layout", async () => {
  const { dom, window } = await renderToDOM(Layout, {
    props: {
      title: "Test Page",
    },
    slots: {
      default: "<main><h1>Main Content</h1></main>",
    },
  });
  const { Node } = window;

  it("renders correct title and conditional components", () => {
    expect(dom.title).toBe("Test Page — Zentrum für Legistik");

    expect(dom.querySelector("h1")?.outerHTML).toBe("<h1>Main Content</h1>");

    expect(dom.querySelector("html")?.getAttribute("lang")).toBe("de");
  });

  it("includes astro-seo properties", () => {
    expect(
      dom.querySelector('*[property="og:title"]')?.getAttribute("content"),
    ).toBe("Test Page — Zentrum für Legistik");

    expect(
      dom.querySelector('*[property="og:image"]')?.getAttribute("content"),
    ).toBe(baseUrl + "/SEO_ZfL.png");
  });

  it("renders header content, slot, and footer in order", () => {
    const header = dom.querySelector("head")!;
    const slotContent = dom.querySelector("main")!;
    const footer = dom.querySelector("footer")!;

    expect(
      header?.compareDocumentPosition(slotContent!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      slotContent?.compareDocumentPosition(footer!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

test("Layout renders default title when no prop is provided", async () => {
  const { dom } = await renderToDOM(Layout, {
    props: { title: undefined },
  });

  expect(dom.title).toBe("Zentrum für Legistik");
});

describe("Posthog script", async () => {
  it.skip("is included in production", async () => {
    const { html } = await renderToDOM(Layout);
    expect(html).toContain("mocked-posthog");
  });
  it("is excluded in staging", async () => {
    vi.mocked(stage).isProduction = false;
    vi.mocked(stage).isStaging = true;
    const { html } = await renderToDOM(Layout);
    expect(html).not.toContain("mocked-posthog");
  });
});
