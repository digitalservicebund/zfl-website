import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const all = defineCollection({
  loader: glob({
    pattern: "**/*.astro",
    base: "./src",
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    sitemap: z.boolean().default(true),
  }),
});

export const collections = { all, pages };
