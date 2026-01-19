import { expect, test } from "@playwright/test";
import { routes } from "./utils/routes";

const getTitle = (title?: string) =>
  title === "Zentrum für Legistik" ? title : `${title} — Zentrum für Legistik`;

test.describe("page titles", () => {
  routes.forEach((route) => {
    test(`${route.url} has correct title`, async ({ page }) => {
      await page.goto(route.url);
      await expect(page).toHaveTitle(getTitle(route.title));
    });
  });
});
