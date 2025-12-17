// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import rehypeAddClasses from "rehype-add-classes";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  markdown: {
    rehypePlugins: [
      [rehypeAddClasses, { a: "kern-link", p: "kern-body", li: "kern-body" }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
