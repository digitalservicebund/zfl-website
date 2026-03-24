// @ts-check
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import process from "node:process";
import { generateRoutes } from "./integrations/routeGenerator";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const PREVIEW_BRANCH = process.env.PREVIEW_BRANCH;

const PRODUCTION_SITE = "https://zfl.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

// https://astro.build/config
export default defineConfig({
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? `/zfl-website/previews/${PREVIEW_BRANCH}` : undefined,
  redirects: {
    "/anleitungen-und-hilfsmittel": "/werkzeuge",
    "/ueber-uns": "/ueber",
    "/ueber-uns/daran-arbeiten-wir": "/ueber/das-ist-neu",
  },
  integrations: [
    icon(),
    alpinejs(),
    sitemap(),
    mdx(),
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
