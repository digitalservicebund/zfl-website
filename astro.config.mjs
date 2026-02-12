// @ts-check
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAddClasses from "rehype-add-classes";

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
  markdown: {
    rehypePlugins: [[rehypeAddClasses, { a: "text-link" }]],
  },
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    csp: false,
  },
  trailingSlash: "never",
});
