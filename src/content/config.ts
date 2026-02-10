import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    sitemap: z.boolean().default(true),
  }),
});

export const collections = {
  pages,
};
