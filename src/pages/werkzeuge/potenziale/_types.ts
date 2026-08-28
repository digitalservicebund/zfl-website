import type { CollectionEntry } from "astro:content";

export type Check = CollectionEntry<"potenziale">["data"]["checks"][number];

export type PotenzialeExample = CollectionEntry<"potenziale">["data"] & {
  short: string;
};
