import { getCollection } from "astro:content";
import { basename } from "node:path";
import type { LawExample } from "./_types";

export async function getVisualisierungExamples(): Promise<LawExample[]> {
  const visualisierungen = await getCollection("kiVisualisierungen");
  return visualisierungen.map(({ data, filePath }) => ({
    ...data,
    // filePath preserves the on-disk casing, unlike the glob loader's
    // lowercased `id` (e.g. "HeizkostenV.yaml" -> id "heizkostenv").
    short: basename(filePath ?? "", ".yaml"),
  }));
}
