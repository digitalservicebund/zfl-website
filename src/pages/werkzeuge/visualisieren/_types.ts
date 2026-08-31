import { z } from "astro/zod";
import type { CollectionEntry } from "astro:content";

export const visOptionType = z.object({
  name: z.string(),
  filename: z.string().optional(),
  /** Relevante Paragraphen/Artikel, auf denen die Visualisierung
   * basiert bzw. auf die sie sich bezieht, inkl. Präfix wie im
   * Gesetzestext verwendet, z.B. "§29a" oder "Art. 17". */
  articles: z.array(z.string()).default([]),
  /** inline mermaid string (for api content)*/
  mermaid: z.string().optional(),
});

export type VisOption = z.infer<typeof visOptionType>;

export type LawExample = CollectionEntry<"kiVisualisierungen">["data"] & {
  short: string;
};
