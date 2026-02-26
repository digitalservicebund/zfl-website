import { flatRoutes } from "@/utils/routesHelper.ts";
import { expect, test } from "@playwright/test";

const getTitle = (title?: string) =>
  title === "Zentrum für Legistik" ? title : `${title} — Zentrum für Legistik`;

test.describe("page titles", () => {
  flatRoutes.forEach((route) => {
    test(`${route.url} has correct title`, async ({ page }) => {
      await page.goto(route.url);
      await expect(page).toHaveTitle(getTitle(route.title));
      expect(page.getByRole("heading", { level: 1 })).toBeDefined();
    });
  });
});
