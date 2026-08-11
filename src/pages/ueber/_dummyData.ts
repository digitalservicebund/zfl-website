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

export const websiteData: ChartSeries[] = [
  {
    label: "Digitalcheck",
    values: [
      { x: "1. Quartal", y: 2538 },
      { x: "2. Quartal", y: 2622 },
    ],
  },
  {
    label: "Zentrum für Legistik",
    values: [
      { x: "1. Quartal", y: 609 },
      { x: "2. Quartal", y: 1704 },
    ],
  },
];
