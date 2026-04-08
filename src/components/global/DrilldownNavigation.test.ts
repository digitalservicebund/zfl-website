import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import DrilldownNavigation from "./DrilldownNavigation.astro";

describe("DrilldownNavigation", () => {
  it("renders panel links, drilldown buttons, and root footer content", async () => {
    const { dom } = await renderToDOM(DrilldownNavigation, {
      props: {
        navigation: {
          currentPath: "/ueber/summary",
          activePanel: {
            id: "ueber",
            depth: 1,
            parent: {
              id: "root",
              label: "Hauptmenü",
            },
            sectionRoute: {
              path: "/ueber",
              label: "Über das ZfL",
              isVisible: true,
            },
            items: [
              {
                path: "/ueber/summary",
                label: "Zusammenfassung",
                isVisible: true,
                panelId: null,
              },
            ],
          },
          panels: [
            {
              id: "root",
              depth: 0,
              parent: null,
              sectionRoute: null,
              items: [
                {
                  path: "/ueber",
                  label: "Über das ZfL",
                  isVisible: true,
                  panelId: "ueber",
                },
              ],
            },
            {
              id: "ueber",
              depth: 1,
              parent: {
                id: "root",
                label: "Hauptmenü",
              },
              sectionRoute: {
                path: "/ueber",
                label: "Über das ZfL",
                isVisible: true,
              },
              items: [
                {
                  path: "/ueber/summary",
                  label: "Zusammenfassung",
                  isVisible: true,
                  panelId: null,
                },
              ],
            },
          ],
        },
        panelIdPrefix: "test-menu",
        rootPanelId: "root",
      },
      slots: {
        "root-footer": "<div>Kontakt</div>",
      },
    });

    const rootPanel = dom.querySelector('[data-panel="root"]');
    expect(rootPanel).toBeTruthy();
    expect(dom.querySelector("#test-menu-panel-root")).toBeTruthy();
    expect(rootPanel?.textContent).toContain("Kontakt");

    const drilldownButton = dom.querySelector(
      'button[aria-controls="test-menu-panel-ueber"]',
    );
    expect(drilldownButton).toBeTruthy();
    expect(drilldownButton?.textContent).toContain("Über das ZfL");
    expect(drilldownButton?.getAttribute("aria-label")).toBe(
      "Über das ZfL Untermenü öffnen",
    );

    const activePanel = dom.querySelector('[data-panel="ueber"]');
    expect(activePanel).toBeTruthy();
    expect(activePanel?.querySelector("button")?.textContent).toContain(
      "Hauptmenü",
    );
    expect(activePanel?.querySelector("ul")).toBeTruthy();
    expect(activePanel?.querySelectorAll("li")).toHaveLength(2);

    const currentLink = activePanel?.querySelector('a[href="/ueber/summary"]');
    expect(currentLink).toBeTruthy();
    expect(currentLink?.getAttribute("aria-current")).toBe("page");
  });

  it("does not render items marked as invisible", async () => {
    const { dom } = await renderToDOM(DrilldownNavigation, {
      props: {
        navigation: {
          currentPath: "/sichtbar",
          activePanel: {
            id: "root",
            depth: 0,
            parent: null,
            sectionRoute: null,
            items: [
              {
                path: "/sichtbar",
                label: "Sichtbar",
                isVisible: true,
                panelId: null,
              },
              {
                path: "/versteckt",
                label: "Versteckt",
                isVisible: false,
                panelId: null,
              },
            ],
          },
          panels: [
            {
              id: "root",
              depth: 0,
              parent: null,
              sectionRoute: null,
              items: [
                {
                  path: "/sichtbar",
                  label: "Sichtbar",
                  isVisible: true,
                  panelId: null,
                },
                {
                  path: "/versteckt",
                  label: "Versteckt",
                  isVisible: false,
                  panelId: null,
                },
              ],
            },
          ],
        },
        panelIdPrefix: "test-menu",
      },
    });

    expect(dom.querySelector('a[href="/sichtbar"]')).toBeTruthy();
    expect(dom.textContent ?? "").not.toContain("Versteckt");
  });
});
