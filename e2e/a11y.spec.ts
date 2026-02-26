import { flatRoutes } from "@/utils/routesHelper";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("a11y", () => {
  flatRoutes.forEach((route) => {
    test(`${route.url} should not have any automatically detectable accessibility issues`, async ({
      page,
    }) => {
      await page.goto(route.url);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
