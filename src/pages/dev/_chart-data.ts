import type { ChartSeries } from "@/components/Chart.astro";

export const singleSeries: ChartSeries[] = [
  {
    label: "Datenreihe 1",
    values: [
      { x: "A", y: 40 },
      { x: "B", y: 70 },
      { x: "C", y: 100 },
    ],
  },
];

export const multiSeries: ChartSeries[] = [
  {
    label: "Datenreihe 1",
    values: [
      { x: "A", y: 2 },
      { x: "B", y: 4 },
      { x: "C", y: 6 },
    ],
  },
  {
    label: "Datenreihe 2",
    values: [
      { x: "A", y: 0 },
      { x: "B", y: 2 },
      { x: "C", y: 3 },
    ],
  },
];

export const pieData: ChartSeries[] = [
  {
    label: "Datenreihe 1",
    values: [{ x: "A", y: 60 }],
  },
  {
    label: "Datenreihe 2",
    values: [{ x: "A", y: 40 }],
  },
];
