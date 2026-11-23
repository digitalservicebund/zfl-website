// @ts-check
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import { generateRoutes } from "astro-route-generator";
import { defineConfig } from "astro/config";
import process from "node:process";
import { URL } from "node:url";
import Icons from "unplugin-icons/vite";
import { isNoIndexPath } from "./src/config/seo.ts";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const isDevelopment = process.env.PUBLIC_STAGE === "development";
const PREVIEW_BASE_PATH = process.env.PREVIEW_BASE_PATH;
const BASE_PATH = isPreview ? PREVIEW_BASE_PATH : undefined;

const PRODUCTION_SITE = "https://zfl.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

// https://astro.build/config
export default defineConfig({
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: BASE_PATH,
  redirects: {
    "/anleitungen-und-hilfsmittel": "/werkzeuge",
    "/ueber/neue-fruephase": "/ueber/neue-fruehphase",
    "/ueber-uns": "/ueber",
    "/ueber-uns/daran-arbeiten-wir": "/ueber/daran-arbeiten-wir",
    "/ueber/das-ist-neu": "/ueber/daran-arbeiten-wir",
    "/ueber-uns/zahlen-und-fakten": "/ueber/zahlen-und-fakten",
    "/prototyp/ki-gestuetzte-bestandsrechtsanalyse":
      "/werkzeuge/ki-prototypen/pflichten",
  },
  integrations: [
    alpinejs(),
    sitemap({
      filter: (page) => !isNoIndexPath(new URL(page).pathname, BASE_PATH),
    }),
    mdx(),
    generateRoutes({
      pagesDir: "src/pages",
      output: "src/config/routes.ts",
      downloadsDir: "public/downloads",
      downloadsOutput: "src/config/downloads.ts",
    }),
    pagefind({
      indexConfig: {
        excludeSelectors: ["[href^='mailto:']"],
        includeCharacters: ".",
      },
    }),
    svelte(),
  ],
  build: {
    assets: "_astro",
  },
  vite: {
    plugins: [
      tailwindcss(),
      // Renders Iconify icons (e.g. from @iconify-json/ic) as tree-shaken
      // Svelte components
      Icons({ compiler: "svelte" }),
    ],
  },
  prefetch: {
    prefetchAll: true,
  },
  security: {
    csp: false,
  },
  trailingSlash: isDevelopment ? "ignore" : "never",
});
