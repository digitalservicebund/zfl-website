import {
  allRoutes,
  dev,
  dev_astroKomponenten,
  dev_kernKomponenten,
  staging,
  vorhaben_steckbrief,
} from "@/config/routes";
import { isStaging } from "@/config/stage";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("a11y", () => {
  const excludedRouteKeys: string[] = [
    staging.key,
    dev.key,
    dev_astroKomponenten.key,
    dev_kernKomponenten.key,
    vorhaben_steckbrief.key,
  ];
  const relevantRoutes = allRoutes
    .filter((route) => !route.isStagingOnly || isStaging)
    .filter((route) => !excludedRouteKeys.includes(route.key));
  relevantRoutes.forEach((route) => {
    test(`${route.path} should not have any automatically detectable accessibility issues`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const accessibilityScanResults = await new AxeBuilder({
        page,
      }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
