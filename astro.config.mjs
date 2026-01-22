// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import rehypeAddClasses from "rehype-add-classes";

import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://zfl.bund.de",
  integrations: [icon(), alpinejs(), sitemap()],
  build: {
    assets: "_astro",
  },
  vite: {
    // @ts-expect-error https://github.com/withastro/astro/issues/14030#issuecomment-3027129338
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [[rehypeAddClasses, { a: "text-link" }]],
  },
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    csp: false,
  },
});
