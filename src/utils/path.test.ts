import { describe, expect, test } from "vitest";
import { buildRoutePath, removeTrailingSlash } from "./path";

describe("removeTrailingSlash", () => {
  test("keeps the root path stable", () => {
    expect(removeTrailingSlash("/")).toBe("/");
  });

  test("removes a trailing slash from non-root paths", () => {
    expect(removeTrailingSlash("/ueber-uns/")).toBe("/ueber-uns");
  });
});

describe("buildRoutePath", () => {
  test("returns the href unchanged without a base path", () => {
    expect(buildRoutePath("/ueber-uns")).toBe("/ueber-uns");
  });

  test("prefixes the href with the configured base path", () => {
    expect(
      buildRoutePath("/ueber-uns", "/zfl-website/previews/test-branch"),
    ).toBe("/zfl-website/previews/test-branch/ueber-uns");
  });
});
