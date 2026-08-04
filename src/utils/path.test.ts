import { afterEach, describe, expect, test, vi } from "vitest";
import { hasTrailingSlash, removeTrailingSlash, withBase } from "./path";

describe("removeTrailingSlash", () => {
  test("keeps the root path stable", () => {
    expect(removeTrailingSlash("/")).toBe("/");
  });

  test("removes a trailing slash from non-root paths", () => {
    expect(removeTrailingSlash("/ueber-uns/")).toBe("/ueber-uns");
  });
});

describe("withBase", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("returns the href unchanged without a base path", () => {
    expect(withBase("/ueber-uns")).toBe("/ueber-uns");
  });

  test("prefixes the href with the configured base path", () => {
    vi.stubEnv("BASE_URL", "/zfl-website/previews/test-branch");

    expect(withBase("/ueber-uns")).toBe(
      "/zfl-website/previews/test-branch/ueber-uns",
    );
  });
});

describe("check for trailing slashes", () => {
  test("return false if index route", () => {
    expect(hasTrailingSlash("/")).toBe(false);
  });
  test("return false if route has trailing slash", () => {
    expect(hasTrailingSlash("/ueber-uns/")).toBe(true);
  });
  test("return true if route has no trailing slash", () => {
    expect(hasTrailingSlash("/ueber-uns")).toBe(false);
  });
});
