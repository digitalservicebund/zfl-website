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
      { x: 2023, y: 20 },
      { x: 2024, y: 30 },
      { x: 2025, y: 50 },
      { x: 2026, y: 70 },
    ],
  },
];

export const digitalcheckData: ChartSeries[] = [
  {
    label: "angewendete Digitalchecks",
    values: [
      { x: 2023, y: 20 },
      { x: 2024, y: 30 },
      { x: 2025, y: 40 },
      { x: 2026, y: 60 },
    ],
  },
];

export const visualisierungenData: ChartSeries[] = [
  {
    label: "Vorhaben mit Digitalbezug mit Visualisierung",
    values: [{ x: "all", y: 29 }],
  },
  {
    label: "Vorhaben mit Digitalbezug ohne Visualisierung",
    values: [{ x: "all", y: 33 }],
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
