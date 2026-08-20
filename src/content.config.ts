import { withBase } from "@/utils/path";
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
            ? withBase(val)
            : val,
        ),
      image: image().optional(),
    }),
});

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "src/content/articles",
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    paragraphNummer: z.string(),
    paragraphGesetz: z.string(),
    paragraphTitel: z.string().nullable(),
  }),
});

export const collections = {
  werkzeuge,
  articles,
};
