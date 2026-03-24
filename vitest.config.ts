/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export const baseUrl = "https://example.com";

export default getViteConfig(
  {
    test: {
      chaiConfig: {
        truncateThreshold: 200,
      },
      globals: true,
      include: [
        "**/*.test.{ts,tsx}",
        "!tests/**",
        "!**/*.browser.test.{ts,tsx}",
      ],
      typecheck: {
        tsconfig: "./tsconfig.test.json",
      },
    },
  },
  {
    site: baseUrl,
    trailingSlash: "always",
  },
);
