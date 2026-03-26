// @ts-check
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import process from "node:process";
import { generateRoutes } from "./integrations/routeGenerator";

import preact from "@astrojs/preact";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const PREVIEW_BASE_URL = process.env.PREVIEW_BASE_URL;

const PRODUCTION_SITE = "https://zfl.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

// https://astro.build/config
export default defineConfig({
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? PREVIEW_BASE_URL : undefined,
  redirects: {
    "/anleitungen-und-hilfsmittel": "/werkzeuge",
    "/ueber-uns": "/ueber",
    "/ueber-uns/daran-arbeiten-wir": "/ueber/das-ist-neu",
    "/ueber-uns/zahlen-und-fakten": "/ueber/zahlen-und-fakten",
  },
  integrations: [
    icon(),
    alpinejs(),
    sitemap(),
    mdx(),
    preact({ compat: true }),
    generateRoutes({
      pagesDirs: ["src/pages"],
      output: "src/config/routes.ts",
    }),
  ],
  build: {
    assets: "_astro",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
  },
  security: {
    csp: false,
  },
  trailingSlash: "never",
});
