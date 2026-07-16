import { allRoutes, home, staging } from "@/config/routes";
import { isProduction, isStaging, stage } from "@/config/stage";
import { expect, test } from "@playwright/test";

const TITLE_404 = "Seite nicht gefunden — Zentrum für Legistik";

const getTitle = (title?: string) =>
  title === "Zentrum für Legistik" ? title : `${title} — Zentrum für Legistik`;

test.describe("page titles", () => {
  const relevantRoutes = allRoutes.filter((route) => route !== staging);
  relevantRoutes.forEach((route) => {
    test(`${route.path} has correct title`, async ({ page }) => {
      await page.goto(route.path);
      const expectedTitle =
        route.isStagingOnly && !isStaging ? TITLE_404 : getTitle(route.title);
      await expect(page).toHaveTitle(expectedTitle);
      await expect(
        page.getByRole("heading", { level: 1 }).first(),
      ).toBeVisible();
    });
  });
});

test("the staging environment page should have a special marker", async ({
  page,
}) => {
  await page.goto(home.path);
  const bannerText = "Offizielle Website – Bundesrepublik Deutschland";
  const banner = page.getByText(bannerText);
  const expectedText = isProduction
    ? bannerText
    : `${bannerText} (${stage.toUpperCase()})`;

  await expect(banner).toHaveText(expectedText);
});

test("staging-only pages are not accessible in production", async ({
  page,
}) => {
  test.skip(!isProduction, "this test only targets production");
  await page.goto(staging.path);
  await expect(page).toHaveTitle(TITLE_404);
});

test("staging-only pages are accessible in staging", async ({ page }) => {
  test.skip(!isStaging, "this test only targets staging");
  await page.goto(staging.path);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Staging");
});

test("the 404 page is served with the correct status code", async ({
  page,
}) => {
  const response = await page.request.get("/404");
  const status = response.status();
  expect(status).toBe(404);
});
