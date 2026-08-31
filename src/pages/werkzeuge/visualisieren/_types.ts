import type { CollectionEntry } from "astro:content";

export type VisExample =
  CollectionEntry<"kiVisualisierungen">["data"]["visOptions"][number];

export type LawExample = CollectionEntry<"kiVisualisierungen">["data"] & {
  short: string;
};
