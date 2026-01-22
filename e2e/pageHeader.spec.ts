import { expect, test } from "@playwright/test";

test.describe("Header navigation", () => {
  test("desktop menu shows correct active item", async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.goto("/begleitungen");

    const desktopNav = page.getByTestId("desktop-nav");
    await expect(desktopNav).toBeVisible();

    const activeLink = desktopNav.getByRole("link", {
      name: "Begleitungen",
    });

    await expect(activeLink).toHaveClass(/bg-zfl-main20/);
    await expect(activeLink).toHaveClass(/border-zfl-main80/);

    const inactiveLink = desktopNav.getByRole("link", {
      name: "Schulungen",
    });

    await expect(inactiveLink).not.toHaveClass(/border-zfl-main80/);
  });

  test("mobile menu is hidden by default", async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/begleitungen");

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeHidden();
  });

  test("mobile menu opens on toggle button click", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/begleitungen");

    const toggleButton = page.getByRole("button", {
      name: "Menü öffnen / schließen",
    });

    await toggleButton.click();

    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).toBeVisible();

    // Active link inside mobile menu
    const activeLink = mobileMenu.getByRole("link", {
      name: "Begleitungen",
    });

    await expect(activeLink).toHaveClass(/bg-zfl-main20/);
    await expect(activeLink).toHaveClass(/border-zfl-main80/);
  });

  test("mobile menu highlights active route correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/schulungen");

    const toggleButton = page.getByRole("button", {
      name: "Menü öffnen / schließen",
    });

    await toggleButton.click();

    const mobileMenu = page.locator("#mobile-menu");

    const activeLink = mobileMenu.getByRole("link", {
      name: "Schulungen",
    });

    await expect(activeLink).toHaveClass(/bg-zfl-main20/);
    await expect(activeLink).toHaveClass(/border-zfl-main80/);
  });
});
