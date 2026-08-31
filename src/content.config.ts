import { allRoutes } from "@/config/routes";
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

const potenziale = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "src/pages/werkzeuge/potenziale/_data",
  }),
  schema: z.object({
    title: z.string(),
    eli: z.string().optional(),
    checks: z.array(
      z.object({
        type: z.enum(["Bürgercheck", "Digitalcheck", "Praxischeck"]),
        filename: z.string(),
      }),
    ),
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
