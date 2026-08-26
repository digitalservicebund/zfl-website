import type { CollectionEntry } from "astro:content";

export type VisExample =
  CollectionEntry<"visualisierungen">["data"]["visOptions"][number];

export type LawExample = CollectionEntry<"visualisierungen">["data"] & {
  short: string;
};
