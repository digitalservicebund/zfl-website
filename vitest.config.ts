/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig(
  {
    // @ts-expect-error ignore for now
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
    site: "https://example.com/",
    trailingSlash: "always",
  },
);
