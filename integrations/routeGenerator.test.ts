import { describe, expect, test } from "vitest";
import { toRouteKey } from "./routeGenerator";

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
