// @ts-check
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { generateRoutes } from "astro-route-generator";
import { defineConfig } from "astro/config";
import process from "node:process";
import { allRoutes } from "./src/config/routes.ts";

import svelte from "@astrojs/svelte";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const isDevelopment = process.env.PUBLIC_STAGE === "development";
const PREVIEW_BASE_PATH = process.env.PREVIEW_BASE_PATH;

const PRODUCTION_SITE = "https://zfl.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

// https://astro.build/config
export default defineConfig({
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? PREVIEW_BASE_PATH : undefined,
  redirects: {
    "/anleitungen-und-hilfsmittel": "/werkzeuge",
    "/ueber/neue-fruephase": "/ueber/neue-fruehphase",
    "/ueber-uns": "/ueber",
    "/ueber-uns/daran-arbeiten-wir": "/ueber/daran-arbeiten-wir",
    "/ueber/das-ist-neu": "/ueber/daran-arbeiten-wir",
    "/ueber-uns/zahlen-und-fakten": "/ueber/zahlen-und-fakten",
    "/prototyp/ki-gestuetzte-bestandsrechtsanalyse":
      "https://digitalservicebund.github.io/zfl-website/previews/prototyp/pflichten/werkzeuge/pflichten/",
  },
  integrations: [
    icon(),
    alpinejs(),
    sitemap({
      filter: (page) =>
        !allRoutes.some(
          (route) => route.isStagingOnly && page.endsWith(route.path),
        ),
    }),
    mdx(),
    generateRoutes({
      pagesDir: "src/pages",
      output: "src/config/routes.ts",
    }),
    pagefind({
      indexConfig: {
        excludeSelectors: ["[href^='mailto:']"],
        includeCharacters: ".",
      },
    }),
    react(),
    svelte(),
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
  trailingSlash: isDevelopment ? "ignore" : "never",
});
