import { describe, expect, it, vi } from "vitest";
import { baseUrl } from "../../../vitest.config";
import { ueber, ueber_dasIstNeu } from "../../config/routes";
import { renderToDOM } from "../../utils/testUtils";
import SectionSidebar from "./SectionSidebar.astro";

vi.mock("@/config/stage", () => ({
  isProduction: true,
  isStaging: false,
  isPreview: false,
}));

describe("SectionSidebar", () => {
  it("renders the sidebar with section navigation for a nested route", async () => {
    const { dom } = await renderToDOM(SectionSidebar, {
      request: new Request(`${baseUrl}${ueber.path}`),
    });

    const sidebar = dom.querySelector('nav[aria-label="Abschnittsnavigation"]');
    expect(sidebar).toBeTruthy();
    expect(
      sidebar?.querySelector(`a[href="${ueber_dasIstNeu.path}"]`),
    ).toBeTruthy();
  });

  it("renders nothing for a route without section navigation", async () => {
    const { dom } = await renderToDOM(SectionSidebar, {
      request: new Request(`${baseUrl}/begleitungen`),
    });

    expect(
      dom.querySelector('nav[aria-label="Abschnittsnavigation"]'),
    ).toBeFalsy();
  });
});
