import { expect, test } from "@playwright/test";

const MOBILE_MENU_ID = "#page-header-mobile-menu";

test.describe("Header navigation", () => {
  test("desktop menu shows correct active item and supports navigation", async ({
    page,
  }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.goto("/begleitungen");

    const desktopNav = page.getByRole("navigation", {
      name: "Hauptnavigation",
    });
    await expect(desktopNav).toBeVisible();

    const activeLink = desktopNav.getByRole("link", {
      name: "Regelungsbegleitung",
    });

    await expect(activeLink).toHaveClass(/bg-lavender-base/);
    await expect(activeLink).toHaveClass(/border-cosmic-blue-base/);

    const schulungenLink = desktopNav.getByRole("link", {
      name: "Schulungen",
    });

    await expect(schulungenLink).not.toHaveClass(/border-cosmic-blue-base/);

    await schulungenLink.click();

    await expect(page).toHaveURL("/schulungen");
    await expect(schulungenLink).toHaveClass(/bg-lavender-base/);
    await expect(schulungenLink).toHaveClass(/border-cosmic-blue-base/);
    await expect(schulungenLink).toHaveAttribute("aria-current", "page");
    await expect(activeLink).not.toHaveClass(/border-cosmic-blue-base/);
  });

  test("mobile menu is hidden by default", async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/begleitungen");

    const mobileMenu = page.locator(MOBILE_MENU_ID);
    await expect(mobileMenu).toBeHidden();
  });

  test("mobile menu opens on toggle button click", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/begleitungen");

    const toggleButton = page.getByRole("button", {
      name: "Menü öffnen / schließen",
    });

    await toggleButton.click();

    const mobileMenu = page.locator(MOBILE_MENU_ID);
    await expect(mobileMenu).toBeVisible();

    const activeLink = mobileMenu.getByRole("link", {
      name: "Regelungsbegleitung",
    });

    await expect(activeLink).toHaveClass(/bg-cosmic-blue-400/);
    await expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  test("mobile menu highlights active route correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/schulungen");

    const toggleButton = page.getByRole("button", {
      name: "Menü öffnen / schließen",
    });

    await toggleButton.click();

    const mobileMenu = page.locator(MOBILE_MENU_ID);

    const activeLink = mobileMenu.getByRole("link", {
      name: "Schulungen",
    });

    await expect(activeLink).toHaveClass(/bg-cosmic-blue-400/);
    await expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  test("desktop section pages show the sidebar navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/ueber/das-ist-neu");

    const sectionSidebar = page.getByRole("navigation", {
      name: "Abschnittsnavigation",
    });
    await expect(sectionSidebar).toBeVisible();

    const rootPanel = sectionSidebar.locator('[data-panel="ueber"]');
    await expect(rootPanel).toBeVisible();
    await expect(
      rootPanel.getByRole("link", { name: "Über das ZfL", exact: true }),
    ).toBeVisible();
    await expect(
      rootPanel.getByRole("link", { name: "Das ist neu", exact: true }),
    ).toBeVisible();
    const zahlenUndFaktenLink = rootPanel.getByRole("link", {
      name: "Zahlen und Fakten",
      exact: true,
    });
    await expect(zahlenUndFaktenLink).toBeVisible();

    await zahlenUndFaktenLink.click();

    await expect(page).toHaveURL("/ueber/zahlen-und-fakten");
    await expect(zahlenUndFaktenLink).toHaveAttribute("aria-current", "page");
  });

  test("mobile section pages open the contextual submenu and allow navigating back", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/ueber/das-ist-neu");

    await page.getByRole("button", { name: "Menü öffnen / schließen" }).click();

    const mobileMenu = page.locator(MOBILE_MENU_ID);
    await expect(mobileMenu).toBeVisible();

    const ueberPanel = mobileMenu.locator('[data-panel="ueber"]');
    await expect(ueberPanel).toBeVisible();
    await expect(
      ueberPanel.getByRole("link", { name: "Über das ZfL", exact: true }),
    ).toBeVisible();
    await expect(
      ueberPanel.getByRole("link", { name: "Das ist neu", exact: true }),
    ).toHaveAttribute("aria-current", "page");

    await ueberPanel.getByRole("button", { name: /Hauptmenü/ }).click();

    await expect(mobileMenu.locator('[data-panel="root"]')).toBeVisible();
  });
});
