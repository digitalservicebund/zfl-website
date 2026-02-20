import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { flatRoutes } from "./utils/routes";

test.describe("a11y", () => {
  flatRoutes.forEach((route) => {
    test(`${route.path} should not have any automatically detectable accessibility issues`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
