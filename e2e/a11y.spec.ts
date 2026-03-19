import { routes } from "@/config/routes";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("a11y", () => {
  Object.values(routes).forEach((route) => {
    test(`${route.path} should not have any automatically detectable accessibility issues`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
