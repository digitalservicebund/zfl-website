import { expect, test } from "@playwright/test";
import { flatRoutes } from "./utils/routes";

const getTitle = (title?: string) =>
  title === "Zentrum für Legistik" ? title : `${title} — Zentrum für Legistik`;

test.describe("page titles", () => {
  flatRoutes.forEach((route) => {
    test(`${route.path} has correct title`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page).toHaveTitle(getTitle(route.title));
      expect(page.getByRole("heading", { level: 1 })).toBeDefined();
    });
  });
});
