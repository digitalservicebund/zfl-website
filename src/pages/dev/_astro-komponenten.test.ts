import path from "node:path";
import { describe, expect, it } from "vitest";
import source from "./astro-komponenten.astro?raw";

const componentPaths = Object.keys(import.meta.glob("@/components/*.astro"));
const components = componentPaths.map((filePath) => path.basename(filePath));

const componentImportPattern =
  /from ["']@\/components\/(?<file>[^"'/]+\.astro)["']/g;

describe("astro-komponenten.astro covers all components in src/components/", () => {
  const imported = Array.from(
    source.matchAll(componentImportPattern),
    (match) => match.groups?.file,
  );

  it("finds at least one component in src/components/", () => {
    expect(components.length).toBeGreaterThan(0);
  });

  it.each(components)("imports %s", (component) => {
    expect(imported).toContain(component);
  });
});
