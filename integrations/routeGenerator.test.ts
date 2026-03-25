import fs, { type Dirent } from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { extractMeta, generateRoutes, toRouteKey } from "./routeGenerator";

vi.mock("node:fs");

describe("toRouteKey", () => {
  it("converts a single route segment to camelCase", () => {
    expect(toRouteKey("/ueber-uns")).toBe("ueberUns");
  });

  it("joins nested route segments with underscores", () => {
    expect(toRouteKey("/ueber-uns/zahlen-und-fakten")).toBe(
      "ueberUns_zahlenUndFakten",
    );
  });

  it("normalizes each nested segment independently", () => {
    expect(toRouteKey("/foo_bar/baz-qux")).toBe("fooBar_bazQux");
  });

  it("quotes route keys that are not valid JavaScript identifiers", () => {
    expect(toRouteKey("/2026/rueckblick")).toBe('"2026_rueckblick"');
  });

  it("converts root to 'home'", () => {
    expect(toRouteKey("/")).toBe("home");
  });
});

describe("extractMeta", () => {
  it("reads literal route metadata from Astro frontmatter", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
export const frontmatter = {
  title: "Example",
  sitemap: true,
  isStagingOnly: true,
};
---
`,
    );

    expect(meta).toEqual({
      title: "Example",
      sitemap: true,
      isStagingOnly: true,
    });
  });

  it("skips non-literal Astro frontmatter values", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
const title = "Example";
export const frontmatter = {
  title: title,
};
---
`,
    );

    expect(meta).toBeNull();
  });

  it("keeps literal Astro frontmatter values when other entries are non-literal", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
const title = "Example";
export const frontmatter = {
  title: "Example",
  seoTitle: title,
};
---
`,
    );

    expect(meta).toEqual({
      title: "Example",
      sitemap: true,
      isStagingOnly: false,
    });
  });

  it("ignores unrelated literal Astro frontmatter fields", () => {
    const meta = extractMeta(
      "src/pages/example.astro",
      `---
export const frontmatter = {
  title: "Example",
  seoTitle: "SEO Example",
};
---
`,
    );

    expect(meta).toEqual({
      title: "Example",
      sitemap: true,
      isStagingOnly: false,
    });
  });

  it("throws error if Astro frontmatter is not an object literal", () => {
    const badAstro = `---
const frontmatter = "not-an-object";
---`;
    expect(() => extractMeta("bad.astro", badAstro)).toThrow();
  });
});

describe("generateRoutes() Integration Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("triggers file generation during astro:build:start", () => {
    const pagesDirs = ["src/pages"];
    const output = "src/routes.ts";
    const integration = generateRoutes({ pagesDirs, output });

    // Mock fs.existsSync and fs.readdirSync for the generate() call
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockReturnValue([
      {
        name: "index.astro",
        isDirectory: () => false,
      } as unknown as Dirent,
    ]);
    vi.mocked(fs.readFileSync).mockReturnValue(`---
const frontmatter = { title: "Home" };
---`);

    // Simulate Astro lifecycle
    if (integration.hooks["astro:config:done"]) {
      // @ts-expect-error - Mocking Astro config object
      integration.hooks["astro:config:done"]({ config: { base: "/" } });
    }

    if (integration.hooks["astro:build:start"]) {
      // @ts-expect-error - Mocking Astro config object
      integration.hooks["astro:build:start"]();
    }

    // Check if file was "written"
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.resolve(output),
      expect.stringContaining('title: "Home"'),
    );
  });
});
