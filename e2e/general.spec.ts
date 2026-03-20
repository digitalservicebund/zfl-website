import { routes } from "@/config/routes";
import { expect, test } from "@playwright/test";

const TITLE_404 = "Seite nicht gefunden — Zentrum für Legistik";

const getTitle = (title?: string) =>
  title === "Zentrum für Legistik" ? title : `${title} — Zentrum für Legistik`;

test.describe("page titles", () => {
  Object.values(routes).forEach((route) => {
    test(`${route.path} has correct title`, async ({ page }) => {
      await page.goto(route.path);
      const expectedTitle = route.isStagingOnly ? TITLE_404 : getTitle(route.title);
      await expect(page).toHaveTitle(expectedTitle);
      expect(page.getByRole("heading", { level: 1 })).toBeDefined();
    });
  });
});
