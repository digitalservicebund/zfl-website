import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import PageHeader from "./PageHeader.astro";

test("PageHeader", async () => {
  const container = await AstroContainer.create();
  const pageHeader = await container.renderToString(PageHeader);

  expect(pageHeader).toContain("Zentrum für Legistik");
});
