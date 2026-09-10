import type { ChartSeries } from "@/components/Chart.astro";

export const regbegData: ChartSeries[] = [
  {
    label: "Vorhaben umfassend begleitet",
    values: [
      { x: 2023, y: 2 },
      { x: 2024, y: 3 },
      { x: 2025, y: 6 },
      { x: 2026, y: 9 },
    ],
  },
  {
    label: "Vorhaben mit Visualisierung unterstützt",
    values: [
      { x: 2023, y: 0 },
      { x: 2024, y: 2 },
      { x: 2025, y: 1 },
      { x: 2026, y: 5 },
    ],
  },
];

export const schulungenData: ChartSeries[] = [
  {
    label: "Teilnehmende in Online-Schulungen",
    values: [
      { x: 2025, y: 79 },
      { x: 2026, y: 99 },
    ],
  },
];

// source: Metabase > NKR: Digitalchecks pro Jahr
export const digitalcheckData: ChartSeries[] = [
  {
    label: "angewendete Digitalchecks",
    values: [
      { x: 2023, y: 268 },
      { x: 2024, y: 346 },
      { x: 2025, y: 277 },
      { x: 2026, y: 209 },
    ],
  },
];

// source: Metabase > NKR: Visualisierungen
export const visualisierungenData: ChartSeries[] = [
  {
    label: "Vorhaben mit Digitalbezug mit Visualisierung",
    values: [{ x: "(2026-Q1+Q2)", y: 34 }],
  },
  {
    label: "Vorhaben mit Digitalbezug ohne Visualisierung",
    values: [{ x: "(2026-Q1+Q2)", y: 82 }],
  },
];

export const interopData: ChartSeries[] = [
  {
    label: "Vorhaben mit Interoperabilitätsbezug",
    values: [
      { x: 2025, y: 12 },
      { x: 2026, y: 18 },
    ],
  },
];

export const websiteData: ChartSeries[] = [
  {
    label: "Zentrum für Legistik",
    values: [
      { x: "1. Quartal", y: 609 },
      { x: "2. Quartal", y: 1704 },
    ],
  },
  {
    label: "Digitalcheck",
    values: [
      { x: "1. Quartal 2026", y: 2538 },
      { x: "2. Quartal 2026", y: 2622 },
    ],
  },
];
