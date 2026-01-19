import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routes } from "./utils/routes";

test.describe("a11y", () => {
  routes.forEach((route) => {
    test(`${route.url} should not have any automatically detectable accessibility issues`, async ({
      page,
    }) => {
      await page.goto(route.url);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
