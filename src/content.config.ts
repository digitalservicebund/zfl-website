import { buildRoutePath } from "@/utils/path";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const WERKZEUGE_CATEGORIES = [
  "Problemanalyse",
  "Praxistauglichkeit",
  "Rechtsförmlichkeit",
  "Folgenabschätzung",
  "Beteiligung",
] as const;

export const WERKZEUGE_TYPES = [
  "Methode",
  "Leitfaden",
  "Tool",
  "Ressource",
] as const;

export type WerkzeugCategory = (typeof WERKZEUGE_CATEGORIES)[number];

const werkzeuge = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/werkzeuge" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.array(z.enum(WERKZEUGE_TYPES)),
      category: z.array(z.enum(WERKZEUGE_CATEGORIES)),
      description: z.string(),
      source: z.string().optional(),
      externalUrl: z
        .string()
        .optional()
        .transform((val) =>
          val?.startsWith("/") // prefix local assets with base URL, e.g. /zfl-website/previews/test-branch
            ? buildRoutePath(val, import.meta.env.BASE_URL)
            : val,
        ),
      image: image().optional(),
    }),
});

export const collections = {
  werkzeuge,
};
