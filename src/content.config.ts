import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const WERKZEUGE_CATEGORIES = [
  "Problemanalyse",
  "Praxistauglichkeit",
  "Rechtsförmlichkeit",
  "Beteiligung",
] as const;

export type WerkzeugCategory = (typeof WERKZEUGE_CATEGORIES)[number];

const werkzeuge = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/werkzeuge" }),
  schema: z.object({
    title: z.string(),
    type: z.array(z.enum(["Methode", "Leitfaden", "Tool"])),
    category: z.array(z.enum(WERKZEUGE_CATEGORIES)),
    description: z.string(),
    source: z.string().optional(),
    externalUrl: z.string().optional(),
  }),
});

export const collections = {
  werkzeuge,
};
