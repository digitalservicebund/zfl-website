import { allRoutes } from "@/config/routes";
import { expect, test } from "@playwright/test";

test.describe("anchor links", () => {
  allRoutes.forEach((route) => {
    test(`${route.path} has valid anchor links`, async ({ page }) => {
      await page.goto(route.path);

      const anchors = page.locator("a[href*='#']");
      const count = await anchors.count();

      if (count === 0) test.skip();

      for (let i = 0; i < count; i++) {
        const anchor = anchors.nth(i);
        const href = await anchor.getAttribute("href");

        if (!href || !href.startsWith("#")) continue;
        const hash = href.slice(1);
        if (hash) {
          const target = page.locator(`#${hash}`);
          const message = `Link [${await anchor.innerText()}](${href})`;
          await expect(target, { message: message }).toBeAttached({
            timeout: 5000,
          });
        }
      }
    });
  });
});
