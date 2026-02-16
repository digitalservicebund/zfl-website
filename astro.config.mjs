// @ts-check
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import process from "node:process";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const PREVIEW_BRANCH = process.env.PREVIEW_BRANCH;

const PRODUCTION_SITE = "https://zfl.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

// https://astro.build/config
export default defineConfig({
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? `/zfl-website/previews/${PREVIEW_BRANCH}` : undefined,
  integrations: [icon(), alpinejs(), sitemap(), mdx()],
  build: {
    assets: "_astro",
  },
  vite: {
    // @ts-expect-error https://github.com/withastro/astro/issues/14030#issuecomment-3027129338
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    csp: false,
  },
  trailingSlash: "never",
});
