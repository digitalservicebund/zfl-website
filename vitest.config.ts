/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig(
  {
    test: {
      chaiConfig: {
        truncateThreshold: 200,
      },

      projects: [
        {
          test: {
            name: "unit",
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
          extends: true,
        },
        /*** If we want to test with vitest browser mode in the future: ***/
        // {
        //   test: {
        //     name: "browser",
        //     include: ["**/*.browser.test.{ts,tsx}", "!tests/**"],
        //     typecheck: {
        //       tsconfig: "./tsconfig.test.json",
        //     },
        //     chaiConfig: {
        //       truncateThreshold: 200,
        //     },
        //     browser: {
        //       provider: playwright(),
        //       enabled: true,
        //       instances: [{ browser: "chromium" }],
        //     },
        //     globals: false,
        //   },
        //   extends: true,
        // },
      ],
    },
  },
  {
    site: "https://example.com/",
    trailingSlash: "always",
  },
);
