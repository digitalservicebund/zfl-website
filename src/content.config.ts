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

const visualisierungen = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "src/pages/werkzeuge/visualisieren/_data",
  }),
  schema: z.object({
    title: z.string(),
    /** ELI-Pfad des Gesetzes auf rechtsinformationen.bund.de, z.B.
     * "eli/bund/bgbl-1/2000/s1966/2022-08-01/1/deu". Wird verwendet, um
     * "{{ELI}}"-Platzhalter in den .mmd-Dateien zu Norm-Links aufzulösen.
     * Für EU-Rechtsakte (nicht in RIS indexiert) stattdessen eine volle
     * EUR-Lex-URL, z.B. "https://eur-lex.europa.eu/eli/reg/2026/1738/oj/deu". */
    eli: z.string(),
    visOptions: z.array(
      z.object({
        name: z.string(),
        filename: z.string(),
        /** Relevante Paragraphen/Artikel, auf denen die Visualisierung
         * basiert bzw. auf die sie sich bezieht, inkl. Präfix wie im
         * Gesetzestext verwendet, z.B. "§29a" oder "Art. 17". */
        articles: z.array(z.string()).default([]),
      }),
    ),
  }),
});

export const collections = {
  werkzeuge,
  visualisierungen,
};
