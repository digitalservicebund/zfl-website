import { describe, expect, it } from "vitest";
import { dev, sitemap, ueber_daranArbeitenWir } from "./routes";
import { isNoIndexPath, isNoIndexRoute } from "./seo";

describe("isNoIndexRoute", () => {
  it("excludes routes with sitemap: false", () => {
    expect(isNoIndexRoute(sitemap)).toBe(true);
  });

  it("excludes staging-only routes", () => {
    expect(isNoIndexRoute(dev)).toBe(true);
  });

  it("keeps regular routes indexable", () => {
    expect(isNoIndexRoute(ueber_daranArbeitenWir)).toBe(false);
  });
});

describe("isNoIndexPath", () => {
  it("matches route paths with and without trailing slash", () => {
    expect(isNoIndexPath(sitemap.path)).toBe(true);
    expect(isNoIndexPath(`${sitemap.path}/`)).toBe(true);
    expect(isNoIndexPath(ueber_daranArbeitenWir.path)).toBe(false);
  });

  it("strips the preview base path", () => {
    const base = "/zfl-website/previews/some-branch/";
    expect(
      isNoIndexPath(`/zfl-website/previews/some-branch${sitemap.path}`, base),
    ).toBe(true);
    expect(
      isNoIndexPath(
        `/zfl-website/previews/some-branch${ueber_daranArbeitenWir.path}`,
        base,
      ),
    ).toBe(false);
  });

  it("does not match unknown paths or partial suffixes", () => {
    expect(isNoIndexPath("/unbekannt")).toBe(false);
    expect(isNoIndexPath(`/ueber${sitemap.path}`)).toBe(false);
  });
});
