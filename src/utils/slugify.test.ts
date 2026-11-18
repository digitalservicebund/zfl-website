import { describe, expect, test } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  test("lowercases and hyphenates spaces", () => {
    expect(slugify("Hausentwurf & Ressortentwurf")).toBe(
      "hausentwurf-ressortentwurf",
    );
  });

  test("transliterates German umlauts", () => {
    expect(slugify("Frühphase")).toBe("fruehphase");
  });

  test("strips leading/trailing hyphens left by punctuation", () => {
    expect(slugify("Nach der Verkündung!")).toBe("nach-der-verkuendung");
  });
});
