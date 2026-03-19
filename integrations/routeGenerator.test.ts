import { describe, expect, test } from "vitest";
import { extractMeta, toRouteKey } from "./routeGenerator";

describe("toRouteKey", () => {
  test("converts a single route segment to camelCase", () => {
    expect(toRouteKey("/ueber-uns")).toBe("ueberUns");
  });

  test("joins nested route segments with underscores", () => {
    expect(toRouteKey("/ueber-uns/zahlen-und-fakten")).toBe(
      "ueberUns_zahlenUndFakten",
    );
  });

  test("normalizes each nested segment independently", () => {
    expect(toRouteKey("/foo_bar/baz-qux")).toBe("fooBar_bazQux");
  });

  test("quotes route keys that are not valid JavaScript identifiers", () => {
    expect(toRouteKey("/2026/rueckblick")).toBe('"2026_rueckblick"');
  });
});

describe("extractMeta", () => {
  test("reads literal route metadata from Astro frontmatter", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
export const frontmatter = {
  title: "Example",
  sitemap: true,
  order: 2,
  showInHeader: false,
  isStagingOnly: true,
};
---
`,
    );

    expect(meta).toEqual({
      title: "Example",
      sitemap: true,
      order: 2,
      showInHeader: false,
      isStagingOnly: true,
    });
  });

  test("skips non-literal Astro frontmatter values", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
const title = "Example";
export const frontmatter = {
  title: title,
  order: 2,
};
---
`,
    );

    expect(meta).toBeNull();
  });

  test("keeps literal Astro frontmatter values when other entries are non-literal", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
const title = "Example";
export const frontmatter = {
  title: "Example",
  seoTitle: title,
  order: 2,
};
---
`,
    );

    expect(meta).toEqual({
      title: "Example",
      sitemap: true,
      order: 2,
      showInHeader: false,
      isStagingOnly: false,
    });
  });

  test("ignores unrelated literal Astro frontmatter fields", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
export const frontmatter = {
  title: "Example",
  seoTitle: "SEO Example",
  order: 2,
};
---
`,
    );

    expect(meta).toEqual({
      title: "Example",
      sitemap: true,
      order: 2,
      showInHeader: false,
      isStagingOnly: false,
    });
  });
});
