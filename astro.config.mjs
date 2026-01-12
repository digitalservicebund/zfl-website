// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import rehypeAddClasses from "rehype-add-classes";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import alpinejs from "@astrojs/alpinejs";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://zfl.bund.de",
  integrations: [icon(), react(), alpinejs(), sitemap()],
  markdown: {
    rehypePlugins: [[rehypeAddClasses, { a: "text-link" }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
