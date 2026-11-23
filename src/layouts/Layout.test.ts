import { sitemap, ueber_daranArbeitenWir } from "@/config/routes";
import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import { baseUrl } from "../../vitest.config";
import Layout from "./Layout.astro";

describe("Layout section sidebar", () => {
  it("renders the section sidebar with section navigation for nested section routes", async () => {
    const { dom } = await renderToDOM(Layout, {
      props: { title: "Nested page" },
      request: new Request(`${baseUrl}${ueber_daranArbeitenWir.path}`),
      slots: {
        default: "<main>Inhalt</main>",
      },
    });

    const sectionNavigation = dom.querySelector(
      'nav[aria-label="Abschnittsnavigation"]',
    );
    expect(sectionNavigation).toBeTruthy();
    expect(
      sectionNavigation?.querySelector(
        `a[href="${ueber_daranArbeitenWir.path}"]`,
      ),
    ).toBeTruthy();
    expect(dom.querySelector("main")?.textContent).toContain("Inhalt");
  });

  it("does not render the section sidebar for flat routes", async () => {
    const { dom } = await renderToDOM(Layout, {
      props: { title: "Flat page" },
      request: new Request(`${baseUrl}/begleitungen`),
      slots: {
        default: "<main>Inhalt</main>",
      },
    });

    expect(
      dom.querySelector('nav[aria-label="Abschnittsnavigation"]'),
    ).toBeFalsy();
  });
});

describe("Layout search engine indexing", () => {
  const render = (path: string) =>
    renderToDOM(Layout, {
      props: { title: "Page" },
      request: new Request(`${baseUrl}${path}`),
      slots: { default: "<main>Inhalt</main>" },
    });

  it("marks pages with sitemap: false as noindex without canonical link", async () => {
    const { dom } = await render(sitemap.path);

    expect(
      dom.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("noindex, follow");
    expect(dom.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it("keeps regular pages indexable with canonical link", async () => {
    const { dom } = await render(ueber_daranArbeitenWir.path);

    expect(
      dom.querySelector('meta[name="robots"]')?.getAttribute("content"),
    ).toBe("index, follow");
    expect(dom.querySelector('link[rel="canonical"]')).not.toBeNull();
  });
});
