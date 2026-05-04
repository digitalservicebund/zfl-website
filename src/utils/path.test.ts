import { describe, expect, test } from "vitest";
import { buildRoutePath, hasTrailingSlash, removeTrailingSlash } from "./path";

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

describe("check for trailing slashes", () => {
  test("return false if index route", () => {
    expect(hasTrailingSlash("/")).toBe(false);
  });
  test("return false if route has trailing slash", () => {
    expect(hasTrailingSlash("/ueber-uns/")).toBe(false);
  });
  test("return true if route has no trailing slash", () => {
    expect(hasTrailingSlash("/ueber-uns")).toBe(true);
  });
});
