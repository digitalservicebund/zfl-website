import { begleitungen, schulungen, ueber, werkzeuge } from "@/config/routes.ts";
import { renderToDOM } from "@/utils/testUtils.ts";
import { describe, expect, it, vi } from "vitest";
import { baseUrl } from "../../../vitest.config.ts";
import PageHeader from "./PageHeader.astro";

vi.mock("@/config/stage", () => ({
  isProduction: true,
  isStaging: false,
  isPreview: false,
}));

describe("PageHeader in general", async () => {
  const { dom: pageHeader } = await renderToDOM(PageHeader);

  it("shows the Kopfzeile", () => {
    expect(pageHeader.querySelector(".kern-kopfzeile")).toBeTruthy();
  });

  it("shows the federal logo", () => {
    expect(pageHeader.querySelector('img[alt="Logo des Bundes"]')).toBeTruthy();
  });
});

const menuLocations = [
  { name: "desktop menu bar", selector: 'nav[data-testid="desktop-nav"]' },
  { name: "mobile menu list", selector: "nav#page-header-mobile-menu" },
];

describe("link highlighting", async () => {
  const activeRoute = begleitungen;
  const { dom: pageHeader } = await renderToDOM(PageHeader, {
    request: new Request(baseUrl + activeRoute.path),
  });

  for (const { name, selector } of menuLocations) {
    it(`highlights current item in ${name}`, () => {
      const nav = pageHeader?.querySelector(selector);
      expect(nav).toBeTruthy();

      const currentLink = nav?.querySelector(`a[href="${activeRoute.path}"]`);
      expect(currentLink).toBeTruthy();
      expect(currentLink?.classList).toContain("bg-lavender-base");
    });

    it(`doesn't highlight other items in ${name}`, () => {
      const nav = pageHeader?.querySelector(selector);
      expect(nav).toBeTruthy();
      const links = nav?.querySelectorAll(
        `a:not([href="${activeRoute.path}"])`,
      );
      expect(links!.length).toBeGreaterThan(0);

      for (const link of links ?? []) {
        expect(link.classList.contains("bg-lavender-base")).toBe(false);
        expect(link.getAttribute("aria-current")).toBeFalsy();
      }
    });
  }
});

describe("visible menu items", async () => {
  const expectedPaths = [werkzeuge, begleitungen, schulungen, ueber]
    .filter((route) => !route.isStagingOnly)
    .map((route) => route.path);

  const { dom: pageHeader } = await renderToDOM(PageHeader);
  for (const { name, selector } of menuLocations) {
    it(`shows them in the ${name}`, () => {
      const nav = pageHeader?.querySelector(selector);
      expect(nav).toBeTruthy();
      const anchorElements = nav?.querySelectorAll<HTMLAnchorElement>("a");
      expect(anchorElements!.length).toBeGreaterThan(0);
      const actualLinks = Array.from(anchorElements ?? [])
        .map((link) => link.getAttribute("href"))
        .filter(
          (href) => !href?.startsWith("tel:") && !href?.startsWith("mailto:"),
        );

      expect(actualLinks).toEqual(expectedPaths);
    });
  }
});
