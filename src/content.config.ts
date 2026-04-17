import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const WERKZEUGE_CATEGORIES = [
  "Problemanalyse",
  "Strategische Konzeption",
  "Digitaltauglichkeit",
  "Rechtsförmlichkeit",
  "Gesetzesfolgenabschätzung",
  "Beteiligung",
  "Evaluierung",
  "Onboarding",
] as const;

export type WerkzeugCategory = (typeof WERKZEUGE_CATEGORIES)[number];

const werkzeuge = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/werkzeuge" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["Methode", "Leitfaden", "Tool"]),
    categories: z.array(z.enum(WERKZEUGE_CATEGORIES)),
    description: z.string(),
  }),
});

export const collections = {
  werkzeuge,
};
