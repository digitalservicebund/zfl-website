/// <reference types="vitest/config" />
import { playwright } from "@vitest/browser-playwright";
import { getViteConfig } from "astro/config";
import {
  type ContainerRenderOptions,
  experimental_AstroContainer as AstroContainer,
} from "astro/container";
import { isRunnableDevEnvironment } from "vite";
import type { BrowserCommand } from "vitest/node";
import { baseUrl } from "./vitest.config.ts";

const renderAstro: BrowserCommand<
  [path: string, options?: ContainerRenderOptions]
> = async ({ project }, path, options) => {
  const ssr = project.vite.environments.ssr;
  const module = isRunnableDevEnvironment(ssr)
    ? await ssr.runner.import(path)
    : await project.vite.ssrLoadModule(path);
  const container = await AstroContainer.create();
  return container.renderToString(module.default, options);
};

export default getViteConfig(
  {
    test: {
      include: ["**/*.browser.test.{ts,tsx}"],
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: "chromium" }],
        commands: { renderAstro },
      },
    },
  },
  {
    site: baseUrl,
    trailingSlash: "always",
  },
);
