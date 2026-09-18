import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import Chart, { type ChartSeries } from "./Chart.astro";

function cssVar(style: string, name: string): number {
  return Number(style.match(new RegExp(`--${name}:\\s*([\\d.]+)`))?.[1]);
}

const twoSeries: ChartSeries[] = [
  {
    label: "A",
    values: [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 5 },
    ],
  },
  {
    label: "B",
    values: [
      { x: "Jan", y: 5 },
      { x: "Feb", y: 20 },
    ],
  },
];

describe("Chart bar scaling", () => {
  it("scales --size against summed category totals when stacked", async () => {
    const { dom } = await renderToDOM(Chart, {
      props: { data: twoSeries, stack: true },
    });
    const sizes = [...dom.querySelectorAll("tbody td")].map((td) =>
      cssVar(td.getAttribute("style")!, "size"),
    );

    // axisMax = max(10 + 5, 5 + 20) = 25, not the largest single value
    expect(sizes).toEqual([10 / 25, 5 / 25, 5 / 25, 20 / 25]);
  });

  it("scales --size against the largest single value when grouped", async () => {
    const { dom } = await renderToDOM(Chart, {
      props: { data: twoSeries, stack: false },
    });
    const sizes = [...dom.querySelectorAll("tbody td")].map((td) =>
      cssVar(td.getAttribute("style")!, "size"),
    );

    // axisMax = max(10, 5, 5, 20) = 20
    expect(sizes).toEqual([10 / 20, 5 / 20, 5 / 20, 20 / 20]);
  });
});

describe("Chart pie slices", () => {
  it("accumulates --start/--end fractions across categories in order", async () => {
    const values = [1, 2, 3, 4];
    const data: ChartSeries[] = [
      { label: "Total", values: values.map((y, i) => ({ x: `cat${i}`, y })) },
    ];

    const { dom } = await renderToDOM(Chart, { props: { data, type: "pie" } });
    const slices = [...dom.querySelectorAll("tbody td")].map((td) => {
      const style = td.getAttribute("style")!;
      return { start: cssVar(style, "start"), end: cssVar(style, "end") };
    });

    const total = values.reduce((sum, v) => sum + v, 0);
    let cumulative = 0;
    const expected = values.map((v) => {
      const start = cumulative / total;
      cumulative += v;
      return { start, end: cumulative / total };
    });

    expect(slices).toEqual(expected);
  });
});

describe("Chart legend", () => {
  it("renders one entry per series only for multi-series data", async () => {
    const { dom: multi } = await renderToDOM(Chart, {
      props: { data: twoSeries },
    });
    expect(
      [...multi.querySelectorAll(".legend li")].map((li) => li.textContent),
    ).toEqual(["A", "B"]);

    const { dom: single } = await renderToDOM(Chart, {
      props: { data: [twoSeries[0]] },
    });
    expect(single.querySelector(".legend")).toBeFalsy();
  });
});
