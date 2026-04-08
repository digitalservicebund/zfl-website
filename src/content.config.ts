import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const toolSchemaShape = {
  name: z.string(),
  fidelity: z.enum(["einfach", "digital", "pro"]),
  link: z.string(),
  visualizations: z.array(
    z.enum(["schaubild", "entscheidungsbaum", "flussdiagramm"]),
  ),
  ressorts: z.array(z.string()).optional(),
};

const werkzeuge = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/werkzeuge" }),
  schema: ({ image }) =>
    z.object({
      ...toolSchemaShape,
      img: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

const werkzeugeAlt = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/werkzeuge-alt" }),
  schema: ({ image }) =>
    z.object({
      ...toolSchemaShape,
      img: z.object({ src: image(), alt: z.string() }).optional(),
    }),
});

export const collections = { werkzeuge, "werkzeuge-alt": werkzeugeAlt };
