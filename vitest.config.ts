import { getViteConfig } from "astro/config";
import { defineConfig } from "vitest/config";

const viteConfig = getViteConfig(
  {},
  {
    site: "https://example.com/",
    trailingSlash: "always",
  },
);

export default defineConfig({
  ...viteConfig,
  test: {
    chaiConfig: {
      truncateThreshold: 200,
    },
    globals: true,
    include: ["**/*.test.{ts,tsx}", "!tests/**", "!**/*.browser.test.{ts,tsx}"],
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
  },
});
