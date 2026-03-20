import type { ImageMetadata } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

import schaubildClusterImg from "@/images/werkzeugfinder/clusters/schaubild.jpg";
import entscheidungsbaumClusterImg from "@/images/werkzeugfinder/clusters/entscheidungsbaum.jpg";
import flussdiagrammClusterImg from "@/images/werkzeugfinder/clusters/flussdiagramm.jpg";

export interface Entity {
  id: string;
  name: string;
}

export interface Image {
  src: ImageMetadata;
  alt: string;
}

export interface Ressort extends Entity {
  id: string;
  name: string;
}

export interface VisualisationObject extends Entity {
  id: string;
  name: string;
  description?: string;
  cluster: string;
  order: number;
}

export interface Reason extends Entity {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface Fidelity extends Entity {
  id: string;
  name: string;
  order: number;
}

export type Tool = CollectionEntry<"werkzeuge-alt">;

export interface Cluster extends Entity {
  id: string;
  name: string;
  description: string;
  img: Image;
  fidelityToolMaps: readonly {
    fidelity: string;
    toolMap: readonly {
      ressorts: readonly string[];
      primaryTool: string;
      alternativeTools?: readonly string[];
    }[];
  }[];
}

export interface Recommendation {
  fidelity: Fidelity;
  primaryTool: Tool;
  alternativeTools: Tool[];
}

export interface Result {
  cluster: Cluster;
  recommendations: Recommendation[];
}

async function loadTools(): Promise<Map<string, Tool>> {
  const entries = await getCollection("werkzeuge-alt");
  return new Map(entries.map((e: Tool) => [e.id, e]));
}

const data = {
  objects: [
    {
      id: "interaktion",
      name: "Interaktionen von Akteuren oder Datenflüsse",
      description:
        "Ich möchte auf einfache Weise darstellen, wie Betroffene miteinander und mit Dritten agieren; oder welche Daten benötigt werden und wie diese fließen.",
      cluster: "schaubild",
      order: 1,
    },
    {
      id: "logik",
      name: "Entscheidungslogiken",
      description:
        "Im Mittelpunkt meines Regelungsvorhabens stehen voneinander abhängige Entscheidungen, die Auswirkungen auf die Betroffenen haben.",
      cluster: "entscheidungsbaum",
      order: 2,
    },
    {
      id: "prozess",
      name: "Einen ganzen Prozess",
      description:
        "Ich möchte einen großen Teil oder die Gesamtheit der Umsetzung meines Regelungsvorhabens — oder sogar der umliegenden Gesetzeslandschaft — zeigen.",
      cluster: "flussdiagramm",
      order: 3,
    },
    {
      id: "unbekannt",
      name: "Weiß ich nicht",
      cluster: "schaubild",
      order: 4,
    },
    {
      id: "anderes",
      name: "Anderes",
      cluster: "schaubild",
      order: 5,
    },
  ],
  reasons: [
    {
      id: "austausch",
      name: "Für meinen Austausch mit anderen",
      description:
        "z. B. Feedback einholen, gemeinsames Verständnis aufbauen, Ideen austauschen",
      order: 1,
    },
    {
      id: "selbst",
      name: "Für mein eigenes Verständnis",
      description:
        "z. B. Abhängigkeiten strukturieren; Erkennen von Logikbrüchen, Digitaltauglichkeit oder Medienbrüchen",
      order: 2,
    },
    {
      id: "dokumentation",
      name: "Zur nachträglichen Dokumentation",
      order: 3,
    },
    {
      id: "unbekannt",
      name: "Weiß ich nicht",
      order: 4,
    },
    {
      id: "anderes",
      name: "Anderes",
      order: 5,
    },
  ],
  clusters: [
    {
      id: "schaubild",
      name: "Schaubild",
      description:
        "Ein Schaubild zeigt eine Darstellung des Gesamtsystems, nicht unbedingt einen zeitlichen Ablauf. Visualisierungen von Daten- und Informationsflüssen decken Lücken in Systemen auf und helfen beim Austausch mit IT-Experten. Ein Schaubild muss nicht vollständig oder detailliert sein, und kann auch einen Ausschnitt eines Systems zeigen.",
      img: {
        src: schaubildClusterImg,
        alt: "Drei Beispiele für einfache, freie Schaubilder",
      },
      fidelityToolMaps: [
        {
          fidelity: "einfach",
          toolMap: [
            {
              ressorts: [
                "bmwk",
                "bmf",
                "bmi",
                "aa",
                "bmj",
                "bmas",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "papier-schaubild",
            },
          ],
        },
        {
          fidelity: "digital",
          toolMap: [
            {
              ressorts: ["bmi", "bmj"],
              primaryTool: "bundescloud-drawio-schaubild",
              alternativeTools: ["powerpoint"],
            },
            {
              ressorts: ["bmas"],
              primaryTool: "conceptboard-schaubild",
              alternativeTools: ["bundescloud-drawio-schaubild", "powerpoint"],
            },
            {
              ressorts: ["bmf"],
              primaryTool: "powerpoint",
            },
            {
              ressorts: [
                "bmwk",
                "aa",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "bundescloud-drawio-schaubild",
              alternativeTools: ["powerpoint"],
            },
          ],
        },
      ],
    },
    {
      id: "entscheidungsbaum",
      name: "Entscheidungsbaum",
      description:
        "Ein Entscheidungsbaum ordnet Entscheidungen und deren Auswirkungen in ein logisches Verhältnis. Somit fächert sich ein Baum ausgehend von einem Anfangspunkt immer weiter auf. Zusätzlich können logische Verknüpfungen wie ›Und‹, ›Oder‹, ›Exklusiv-Oder‹ dabei helfen, Entscheidungsmöglichkeiten in einen Kontext zu setzen. So können Logikfehler identifiziert und eine Grundlage für Automatisierung geschaffen werden. Der strukturierte Inhalt eines Entscheidungsbaums kann als Basis für einen Regelungstext genutzt werden.",
      img: {
        src: entscheidungsbaumClusterImg,
        alt: "Ein beispielhafter Entscheidungsbaum ohne Text mit logischen Verknüpfungen",
      },
      fidelityToolMaps: [
        {
          fidelity: "einfach",
          toolMap: [
            {
              ressorts: [
                "bmwk",
                "bmf",
                "bmi",
                "aa",
                "bmj",
                "bmas",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "papier-entscheidungsbaum",
            },
          ],
        },
        {
          fidelity: "digital",
          toolMap: [
            {
              ressorts: ["bmas"],
              primaryTool: "conceptboard-entscheidungsbaum",
              alternativeTools: [
                "bundescloud-drawio-entscheidungsbaum",
                "powerpoint",
              ],
            },
            {
              ressorts: ["bmf"],
              primaryTool: "powerpoint",
            },
            {
              ressorts: [
                "bmwk",
                "bmi",
                "aa",
                "bmj",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "bundescloud-drawio-entscheidungsbaum",
              alternativeTools: ["powerpoint"],
            },
          ],
        },
        {
          fidelity: "pro",
          toolMap: [
            {
              ressorts: ["bmas", "bmi", "bmwk"],
              primaryTool: "logos",
              alternativeTools: ["adonis"],
            },
            {
              ressorts: [
                "bmf",
                "aa",
                "bmj",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "logos",
            },
          ],
        },
      ],
    },
    {
      id: "flussdiagramm",
      name: "Flussdiagramm",
      description:
        "Ein Flussdiagramm stellt die gesamte Umsetzung eines Regelungsvorhabens oder einen spezifischen Arbeitsablauf visuell dar. Mit Hilfe standardisierter Symbole wird der Prozess in einzelnen, chronologischen Schritten abgebildet. Flussdiagramme helfen dabei, fehlende Zwischenschritte, Medienbrüche und Möglichkeiten zum Vereinfachen von Prozessen zu erkennen.",
      img: {
        src: flussdiagrammClusterImg,
        alt: "Ein beispielhaftes Flussdiagramms ohne Text",
      },
      fidelityToolMaps: [
        {
          fidelity: "einfach",
          toolMap: [
            {
              ressorts: [
                "bmwk",
                "bmf",
                "bmi",
                "aa",
                "bmj",
                "bmas",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "papier-flussdiagramm",
            },
          ],
        },
        {
          fidelity: "digital",
          toolMap: [
            {
              ressorts: ["bmi", "bmj"],
              primaryTool: "bundescloud-drawio-flussdiagramm",
              alternativeTools: ["conceptboard-flussdiagramm"],
            },
            {
              ressorts: ["bmas"],
              primaryTool: "conceptboard-flussdiagramm",
              alternativeTools: [
                "bundescloud-drawio-flussdiagramm",
                "modulo",
                "powerpoint",
              ],
            },
            {
              ressorts: ["bmf"],
              primaryTool: "powerpoint",
            },
            {
              ressorts: [
                "bmwk",
                "aa",
                "bmvg",
                "bmel",
                "bmfsfj",
                "bmg",
                "bmdv",
                "bmuv",
                "bmbf",
                "bmz",
                "bmwsb",
              ],
              primaryTool: "bundescloud-drawio-flussdiagramm",
              alternativeTools: ["powerpoint"],
            },
          ],
        },
        {
          fidelity: "pro",
          toolMap: [
            {
              ressorts: ["bmi"],
              primaryTool: "adonis",
              alternativeTools: ["bic"],
            },
            {
              ressorts: ["bmf"],
              primaryTool: "msvisio",
              alternativeTools: ["aris-cloud"],
            },
            {
              ressorts: ["bmbf", "bmdv"],
              primaryTool: "aris",
            },
            {
              ressorts: ["bmj", "bmfsfj", "bmg", "bmz"],
              primaryTool: "msvisio",
            },
            {
              ressorts: ["bmas", "bmwk"],
              primaryTool: "adonis",
            },
          ],
        },
      ],
    },
  ],
  fidelities: [
    { id: "einfach", name: "Für den schnellen Start", order: 1 },
    { id: "digital", name: "Eine schnelle digitale Version", order: 2 },
    { id: "pro", name: "Eine Profi-Version", order: 3 },
  ],
  ressorts: [
    { id: "bmwk", name: "BMWK" },
    { id: "bmf", name: "BMF" },
    { id: "bmi", name: "BMI" },
    { id: "aa", name: "AA" },
    { id: "bmj", name: "BMJ" },
    { id: "bmas", name: "BMAS" },
    { id: "bmvg", name: "BMVg" },
    { id: "bmel", name: "BMEL" },
    { id: "bmfsfj", name: "BMFSFJ" },
    { id: "bmg", name: "BMG" },
    { id: "bmdv", name: "BMDV" },
    { id: "bmuv", name: "BMUV" },
    { id: "bmbf", name: "BMBF" },
    { id: "bmz", name: "BMZ" },
    { id: "bmwsb", name: "BMWSB" },
  ],
} as const;

export const getAllRessorts = (): Ressort[] =>
  [...data.ressorts] as unknown as Ressort[];

export const getAllObjects = (): VisualisationObject[] =>
  [...data.objects].sort(
    (a, b) => a.order - b.order,
  ) as unknown as VisualisationObject[];

export const getAllReasons = (): Reason[] =>
  [...data.reasons].sort((a, b) => a.order - b.order) as unknown as Reason[];

export const getAllRessortIds = (): string[] => data.ressorts.map((r) => r.id);

export const getAllObjectIds = (): string[] => data.objects.map((o) => o.id);

export async function findResultByObjectAndRessort(
  objectId: string,
  ressortId: string,
): Promise<Result | null> {
  const object = data.objects.find((o) => o.id === objectId);
  if (!object) return null;

  const cluster = data.clusters.find((c) => c.id === object.cluster);
  if (!cluster) return null;

  const tools = await loadTools();

  const recommendations: Recommendation[] = cluster.fidelityToolMaps.flatMap(
    ({ fidelity: fidelityId, toolMap }) => {
      const toolResult = toolMap.find((t) =>
        (t.ressorts as readonly string[]).includes(ressortId),
      );
      if (!toolResult) return [];

      const fidelity = data.fidelities.find((f) => f.id === fidelityId);
      const primaryTool = tools.get(toolResult.primaryTool);
      if (!fidelity || !primaryTool) return [];

      const altIds: readonly string[] =
        (toolResult as { alternativeTools?: readonly string[] })
          .alternativeTools ?? [];
      const alternativeTools = altIds.flatMap((id: string) => {
        const tool = tools.get(id);
        return tool ? [tool] : [];
      });

      return [
        {
          fidelity: fidelity as unknown as Fidelity,
          primaryTool,
          alternativeTools,
        },
      ];
    },
  );

  return {
    cluster: cluster as unknown as Cluster,
    recommendations,
  };
}

export function getRessortById(id: string): Ressort | undefined {
  return data.ressorts.find((r) => r.id === id) as unknown as Ressort;
}

export function getObjectById(id: string): VisualisationObject | undefined {
  return data.objects.find(
    (o) => o.id === id,
  ) as unknown as VisualisationObject;
}

export function getReasonById(id: string): Reason | undefined {
  return data.reasons.find((r) => r.id === id) as unknown as Reason;
}
