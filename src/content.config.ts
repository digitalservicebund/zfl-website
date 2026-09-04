import { allRoutes } from "@/config/routes";
import { visOptionType } from "@/pages/werkzeuge/visualisieren/_types";
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
  loader: glob({ pattern: "**/*.md", base: "src/content/werkzeuge" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        type: z.array(z.enum(WERKZEUGE_TYPES)),
        category: z.array(z.enum(WERKZEUGE_CATEGORIES)),
        description: z.string(),
        source: z.string().optional(),
        url: z.string().optional(),
        image: image().optional(),
      })
      .transform(({ url, ...rest }) => {
        const route = allRoutes.find((r) => r.key === url);

        let href: string | undefined;
        if (route) {
          href = withBase(route.path);
        } else if (url?.startsWith("/")) {
          // prefix local assets with base URL, e.g. /zfl-website/previews/test-branch
          href = withBase(url);
        } else {
          href = url;
        }

        return { ...rest, href, isExternal: !route };
      }),
});

export const VISUALISIERUNGSARTEN = [
  "Schaubild",
  "Flussdiagramm",
  "Entscheidungsbaum",
] as const;

export const VISUALISIERUNGS_TOOL = [
  "Miro",
  "Miro / digitales Whiteboard",
  "MS Visio",
  "Bizagi",
  "draw.io",
  "PowerPoint",
  "Conceptboard",
] as const;

export const VISUALISIERUNGS_FILTER = [
  "Verknüpft Recht und Prozess",
  "Deckt Potenziale auf",
  "Macht Risiken sichtbar",
  "Schafft Konsens",
  "Vorher-Nachher-Vergleich",
  "Daten",
  "Führt Prozesse zusammen",
  "Klärt Rollen",
  "Mit NKR-Stellungnahme",
] as const;

const visualisierungen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/visualisierungen" }),
  schema: ({ image }) =>
    z.object({
      Titel: z.string(),
      Visualisierungsart: z.enum(VISUALISIERUNGSARTEN),
      Visualisierungstool: z.enum(VISUALISIERUNGS_TOOL).optional(),
      Bild: z.object({
        alternativeText: z.string(),
        path: image(),
      }),
      tags: z.array(z.enum(VISUALISIERUNGS_FILTER)),
      Beispielvorhaben: z.object({
        Titel: z.string(),
        Ressort: z.string(),
        LinkRegelungstext: z.string().nullable(),
        NKRStellungnahmeLink: z.string().nullable(),
      }),
    }),
});

const kiVisualisierungen = defineCollection({
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
    visOptions: z.array(visOptionType),
  }),
});

const findingScore = z.enum(["low", "medium", "high"]);

const baseFinding = {
  // Matches a <!--finding:{id}:start--> / <!--finding:{id}:end--> marker pair
  // embedded in the potenziale entry's markdown body.
  id: z.string(),
  locationLabel: z.string(), // "§ 14 S.2"
  potential: findingScore, // improvement potential, relative to other findings in the same law — drives frontend sort order
  confidence: findingScore, // model's confidence that this is a genuine finding — informational only, not used for sorting
  reasoning: z.string(), // short explanation why this was flagged
  hint: z.string(), // experimental: suggestions, recommendations
};

const findingType = z.discriminatedUnion("type", [
  z.object({
    ...baseFinding,
    type: z.literal("Digitalcheck"),
    tag: z.enum([
      "Prinzip 1.1",
      "Prinzip 1.2",
      "Prinzip 1.3",
      "Prinzip 1.4",
      "Prinzip 1.5",
      "Prinzip 2.1",
      "Prinzip 2.2",
      "Prinzip 2.3",
      "Prinzip 2.4",
      "Prinzip 2.5",
      "Prinzip 3.1",
      "Prinzip 3.2",
      "Prinzip 4.1",
      "Prinzip 4.2",
      "Prinzip 4.3",
      "Prinzip 4.4",
      "Prinzip 4.5",
      "Prinzip 5.1",
      "Prinzip 5.2",
      "EU-Interoperabilität",
    ]),
  }),
  z.object({
    ...baseFinding,
    type: z.literal("Bürgercheck"),
    tag: z.enum([
      "Prinzip 1",
      "Prinzip 2",
      "Prinzip 3",
      "Prinzip 4",
      "Prinzip 5",
    ]),
  }),
  z.object({
    ...baseFinding,
    type: z.literal("Praxischeck"),
    tag: z.enum(["Placeholder PC"]), // TODO: define real Praxischeck tags
  }),
]);

export type Finding = z.infer<typeof findingType>;

const potenziale = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "src/content/potenziale",
  }),
  schema: z.object({
    title: z.string(),
    eli: z.string().optional(),
    findings: z.array(findingType),
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
  visualisierungen,
  kiVisualisierungen,
  potenziale,
  articles,
};
