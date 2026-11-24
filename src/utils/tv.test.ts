import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { tv } from "./tv";

/*
  tailwind-merge can't read @theme, so every named token needs an entry
  in the merge config of tv.ts. These tests read the tokens from global.css,
  so a new token without an entry makes them fail.
*/
const css = readFileSync(
  new URL("../styles/global.css", import.meta.url),
  "utf8",
);
const theme = css.slice(css.indexOf("@theme {"), css.indexOf("\n}"));
const tokens = (namespace: string) => [
  ...new Set(
    [...theme.matchAll(new RegExp(`--${namespace}-([\\w-]+):`, "g"))].map(
      ([, name]) => name!,
    ),
  ),
];

// Custom properties in @theme that aren't meant as utility values
const notUtilityTokens = ["padding-inline"];

const spacingTokens = tokens("spacing");
const containerTokens = tokens("container").filter(
  (token) => !notUtilityTokens.includes(token),
);

const merge = (base: string, override: string) =>
  tv({ base })({ class: override });

describe("tv merge config", () => {
  it("finds the tokens in global.css", () => {
    expect(spacingTokens).toContain("md");
    expect(containerTokens).toContain("a11y");
  });

  for (const token of spacingTokens) {
    it(`merges the spacing token ${token}`, () => {
      expect(merge(`p-${token}`, "p-0")).toBe("p-0");
      expect(merge("p-0", `p-${token}`)).toBe(`p-${token}`);
      expect(merge(`gap-${token}`, "gap-8")).toBe("gap-8");
    });
  }

  for (const token of containerTokens) {
    it(`merges the container token ${token}`, () => {
      expect(merge(`max-w-${token}`, "max-w-[95vw]")).toBe("max-w-[95vw]");
      expect(merge("max-w-none", `max-w-${token}`)).toBe(`max-w-${token}`);
    });
  }

  it("keeps a side padding after a padding", () => {
    expect(tv({ base: "p-md pr-32" })()).toBe("p-md pr-32");
  });

  it("keeps classes with different modifiers", () => {
    expect(merge("p-24 md:p-32", "p-md")).toBe("md:p-32 p-md");
  });
});
