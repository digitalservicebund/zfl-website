import { describe, expect, it } from "vitest";

const pages = import.meta.glob<string>(
  // Astro does not route files or folders prefixed with an underscore
  ["/src/pages/**/*.astro", "!/src/pages/**/_*.astro", "!/src/pages/**/_*/**"],
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
