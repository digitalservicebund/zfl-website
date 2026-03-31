import {
  begleitungen,
  schulungen,
  ueber,
  ueber_dasIstNeu,
  ueber_zahlenUndFakten,
  werkzeuge,
} from "@/config/routes.ts";
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
  { name: "desktop menu bar", selector: 'nav[aria-label="Hauptnavigation"]' },
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
      /*
       note: classList.contains checks for the token to be in the class list,
       whereas expect().toContain does substring matching. That might break
       with Tailwind variants like `hover:`.
      */
      expect(
        currentLink?.classList.contains(
          name === "mobile menu list" ? "font-bold" : "bg-lavender-base",
        ),
      ).toBe(true);
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

  it("shows them in the desktop menu bar", () => {
    const nav = pageHeader?.querySelector('nav[aria-label="Hauptnavigation"]');
    expect(nav).toBeTruthy();
    const links: HTMLAnchorElement[] = nav
      ? Array.from(nav.querySelectorAll("a"))
      : [];
    const actualLinks = links
      .map((link) => link.getAttribute("href"))
      .filter(
        (href) => !href?.startsWith("tel:") && !href?.startsWith("mailto:"),
      );
    expect(actualLinks).toEqual(expectedPaths);
  });

  it("shows them in the mobile menu root panel", () => {
    const rootPanel = pageHeader?.querySelector(
      'nav#page-header-mobile-menu [data-panel="root"]',
    );
    expect(rootPanel).toBeTruthy();

    for (const path of expectedPaths) {
      const link = rootPanel?.querySelector(`a[href="${path}"]`);
      const button = rootPanel?.querySelector(
        `button[aria-controls*="panel-${path.slice(1)}"]`,
      );
      expect(link ?? button, `Expected ${path} in root panel`).toBeTruthy();
    }
  });
});

describe("nested navigation", () => {
  it("renders the mobile drilldown menu for a nested page", async () => {
    const { dom: pageHeader } = await renderToDOM(PageHeader, {
      request: new Request(baseUrl + ueber_dasIstNeu.path),
    });

    const mobileMenu = pageHeader.querySelector("nav#page-header-mobile-menu");
    expect(mobileMenu).toBeTruthy();
    expect(mobileMenu?.getAttribute("x-data")).toContain(
      'currentPanel: "ueber"',
    );

    const rootPanel = mobileMenu?.querySelector('[data-panel="root"]');
    expect(rootPanel).toBeTruthy();
    expect(rootPanel?.querySelector("button")).toBeTruthy();

    const submenuPanel = mobileMenu?.querySelector('[data-panel="ueber"]');
    expect(submenuPanel).toBeTruthy();
    expect(submenuPanel?.textContent).toContain("Über das ZfL");
    expect(submenuPanel?.querySelector(`a[href="${ueber.path}"]`)).toBeTruthy();
    expect(
      submenuPanel
        ?.querySelector(`a[href="${ueber.path}"]`)
        ?.getAttribute("aria-current"),
    ).toBeNull();
    expect(
      submenuPanel?.querySelector(`a[href="${ueber_dasIstNeu.path}"]`),
    ).toBeTruthy();
    expect(
      submenuPanel?.querySelector(`a[href="${ueber_zahlenUndFakten.path}"]`),
    ).toBeTruthy();
    expect(submenuPanel?.querySelector("button span")?.textContent).toContain(
      "Hauptmenü",
    );
  });

  it("keeps desktop navigation links exact-match only", async () => {
    const { dom: pageHeader } = await renderToDOM(PageHeader, {
      request: new Request(baseUrl + ueber_dasIstNeu.path),
    });

    const desktopNav = pageHeader.querySelector(
      'nav[aria-label="Hauptnavigation"]',
    );
    expect(desktopNav).toBeTruthy();

    const parentLink = desktopNav?.querySelector(`a[href="${ueber.path}"]`);
    expect(parentLink).toBeTruthy();
    expect(parentLink?.classList.contains("bg-lavender-base")).toBe(false);
    expect(parentLink?.getAttribute("aria-current")).toBeNull();
  });

  it("marks the active mobile page link with aria-current", async () => {
    const { dom: pageHeader } = await renderToDOM(PageHeader, {
      request: new Request(baseUrl + schulungen.path),
    });

    const mobileMenu = pageHeader.querySelector("nav#page-header-mobile-menu");
    const activeLink = mobileMenu?.querySelector(
      `a[href="${schulungen.path}"]`,
    );

    expect(activeLink).toBeTruthy();
    expect(activeLink?.getAttribute("aria-current")).toBe("page");
  });
});
