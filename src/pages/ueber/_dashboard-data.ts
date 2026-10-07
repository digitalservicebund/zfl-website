import type { ChartSeries } from "@/components/Chart.astro";

export const regbegData: ChartSeries[] = [
  {
    label: "Vorhaben umfassend begleitet",
    values: [
      { x: 2023, y: 2 },
      { x: 2024, y: 3 },
      { x: 2025, y: 6 },
      { x: 2026, y: 11 },
    ],
  },
  {
    label: "Vorhaben mit Visualisierung unterstützt",
    values: [
      { x: 2023, y: 0 },
      { x: 2024, y: 2 },
      { x: 2025, y: 1 },
      { x: 2026, y: 7 },
    ],
  },
];

export const schulungenData: ChartSeries[] = [
  {
    label: "Teilnehmende in Online-Schulungen",
    values: [
      { x: 2025, y: 79 },
      { x: 2026, y: 151 },
    ],
  },
];

export const websiteData: ChartSeries[] = [
  {
    label: "Zentrum für Legistik",
    values: [
      { x: "1. Quartal", y: 609 },
      { x: "2. Quartal", y: 1704 },
      { x: "3. Quartal", y: 2336 },
    ],
  },
  {
    label: "Digitalcheck",
    values: [
      { x: "1. Quartal", y: 2538 },
      { x: "2. Quartal", y: 2622 },
      { x: "3. Quartal", y: 3013 },
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
      { x: 2026, y: 234 },
    ],
  },
];

// source: Metabase > NKR: Visualisierungen
export const visualisierungenData: ChartSeries[] = [
  {
    label: "Vorhaben mit Digitalbezug mit Visualisierung",
    values: [{ x: "(2026-Q1+Q2)", y: 40 }],
  },
  {
    label: "Vorhaben mit Digitalbezug ohne Visualisierung",
    values: [{ x: "(2026-Q1+Q2)", y: 97 }],
  },
];

export const interopData: ChartSeries[] = [
  {
    label: "Vorhaben mit Interoperabilitätsbezug",
    values: [
      { x: 2025, y: 12 },
      { x: 2026, y: 20 },
    ],
  },
];
