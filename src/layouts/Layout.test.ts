import { ueber_dasIstNeu } from "@/config/routes";
import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import { baseUrl } from "../../vitest.config";
import Layout from "./Layout.astro";

describe("Layout section sidebar", () => {
  it("renders the section sidebar with section navigation for nested section routes", async () => {
    const { dom } = await renderToDOM(Layout, {
      props: { title: "Nested page" },
      request: new Request(`${baseUrl}/ueber/das-ist-neu`),
      slots: {
        default: "<main>Inhalt</main>",
      },
    });

    const sectionNavigation = dom.querySelector(
      'nav[aria-label="Abschnittsnavigation"]',
    );
    expect(sectionNavigation).toBeTruthy();
    expect(
      sectionNavigation?.querySelector(`a[href="${ueber_dasIstNeu.path}"]`),
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
