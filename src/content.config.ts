import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const werkzeuge = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/werkzeuge" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      fidelity: z.enum(["einfach", "digital", "pro"]),
      link: z.string(),
      ressorts: z.array(z.string()).optional(),
      img: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
    }),
});

export const collections = { werkzeuge };
