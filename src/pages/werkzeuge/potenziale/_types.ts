import type { Finding } from "@/content.config";
import type { CollectionEntry } from "astro:content";

export type PotenzialeExample = CollectionEntry<"potenziale">["data"] & {
  short: string;
  body: string;
};

export type CheckType = Finding["type"];
