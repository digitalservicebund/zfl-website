import { describe, expect, it } from "vitest";

const pages = import.meta.glob<string>(
  ["/src/pages/**/*.astro", "!/src/pages/**/_*.astro"],
  { query: "?raw", import: "default", eager: true },
);

describe("every page provides the skip link target", () => {
  it("finds at least one page in src/pages/", () => {
    expect(Object.keys(pages).length).toBeGreaterThan(0);
  });

  it.each(Object.entries(pages))(
    "%s has a <main> with id=main",
    (_, source) => {
      expect(source).toMatch(/<main\b[^>]*\bid="main"/);
    },
  );
});
