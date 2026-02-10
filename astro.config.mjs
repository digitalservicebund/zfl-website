// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://zfl.bund.de",
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
});
