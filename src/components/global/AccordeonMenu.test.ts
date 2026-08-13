import type { Route } from "@/config/routes";
import { renderToDOM } from "@/utils/testUtils";
import { afterEach, describe, expect, it, vi } from "vitest";

function createRoute(overrides: Partial<Route>): Route {
  return {
    key: "route",
    path: "/route",
    title: "Route",
    navLabel: null,
    navOrder: null,
    parent: null,
    sitemap: true,
    isStagingOnly: false,
    ...overrides,
  };
}

function createUeberBranch() {
  const ueber = createRoute({
    key: "ueber",
    path: "/ueber",
    title: "Über das ZfL",
  });
  const ueberChecklist = createRoute({
    key: "ueber_checklist",
    path: "/ueber/checklist",
    title: "Checklist",
    navLabel: "Checkliste",
    navOrder: 10,
    parent: ueber,
  });
  const ueberChecklistSummary = createRoute({
    key: "ueber_checklist_summary",
    path: "/ueber/checklist/summary",
    title: "Summary",
    navLabel: "Zusammenfassung",
    parent: ueberChecklist,
  });
  const ueberSummary = createRoute({
    key: "ueber_summary",
    path: "/ueber/summary",
    title: "Summary",
    navLabel: "Zusammenfassung",
    navOrder: 20,
    parent: ueber,
  });
  const ueberHidden = createRoute({
    key: "ueber_hidden",
    path: "/ueber/hidden",
    title: "Hidden",
    navLabel: "Versteckt",
    parent: ueber,
    isStagingOnly: true,
  });

  return {
    ueber,
    ueberChecklist,
    ueberChecklistSummary,
    ueberSummary,
    ueberHidden,
    allRoutes: [
      ueber,
      ueberChecklist,
      ueberChecklistSummary,
      ueberSummary,
      ueberHidden,
    ],
  };
}

async function renderAccordeonMenu(
  routes: Route[],
  props: { sectionRoot: Route; currentPath: string },
) {
  vi.resetModules();
  vi.doMock("@/config/routes", () => ({ allRoutes: routes }));
  vi.doMock("@/config/stage", () => ({
    isProduction: true,
    isStaging: false,
    isPreview: false,
  }));

  const { default: AccordeonMenu } = await import("./AccordeonMenu.astro");

  return renderToDOM(AccordeonMenu, { props });
}

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("@/config/routes");
  vi.doUnmock("@/config/stage");
});

describe("AccordeonMenu", () => {
  it("renders the section root as a plain link and its children as accordions or links", async () => {
    const {
      ueber,
      ueberChecklist,
      ueberChecklistSummary,
      ueberSummary,
      allRoutes,
    } = createUeberBranch();

    const { dom } = await renderAccordeonMenu(allRoutes, {
      sectionRoot: ueber,
      currentPath: ueberChecklistSummary.path,
    });

    const rootLink = dom.querySelector(`a[href="${ueber.path}"]`);
    expect(rootLink).toBeTruthy();
    expect(rootLink?.closest("div.accordion-item")).toBeNull();

    const checklistItem = dom
      .querySelector(`a[href="${ueberChecklist.path}"]`)
      ?.closest(".accordion-item");
    expect(checklistItem).toBeTruthy();
    expect(checklistItem?.getAttribute("x-data")).toBe("{ open: true }");

    const toggleButton = checklistItem?.querySelector("button");
    expect(toggleButton?.getAttribute("aria-label")).toBe(
      "Untermenü Checkliste ein-/ausklappen",
    );

    const section = checklistItem?.querySelector("section");
    expect(section?.id).toBeTruthy();
    expect(toggleButton?.getAttribute("aria-controls")).toBe(section?.id);

    const summaryLink = dom.querySelector(`a[href="${ueberSummary.path}"]`);
    expect(summaryLink).toBeTruthy();
    expect(summaryLink?.closest("div.accordion-item")).toBeNull();

    const currentLink = dom.querySelector(
      `a[href="${ueberChecklistSummary.path}"]`,
    );
    expect(currentLink?.getAttribute("aria-current")).toBe("page");
  });

  it("closes accordion items outside the current branch", async () => {
    const { ueber, ueberChecklist, ueberSummary, allRoutes } =
      createUeberBranch();

    const { dom } = await renderAccordeonMenu(allRoutes, {
      sectionRoot: ueber,
      currentPath: ueberSummary.path,
    });

    const checklistItem = dom
      .querySelector(`a[href="${ueberChecklist.path}"]`)
      ?.closest(".accordion-item");
    expect(checklistItem?.getAttribute("x-data")).toBe("{ open: false }");
  });

  it("does not render staging-only routes in production", async () => {
    const { ueber, ueberHidden, allRoutes } = createUeberBranch();

    const { dom } = await renderAccordeonMenu(allRoutes, {
      sectionRoot: ueber,
      currentPath: ueber.path,
    });

    expect(dom.querySelector(`a[href="${ueberHidden.path}"]`)).toBeNull();
  });
});
