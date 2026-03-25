import {
  type ContainerRenderOptions,
  experimental_AstroContainer as AstroContainer,
} from "astro/container";
import { JSDOM } from "jsdom";

export async function renderToDOM(
  component: import("astro/runtime/server/index.js").AstroComponentFactory,
  options?: ContainerRenderOptions,
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(component, options);
  const window = new JSDOM(html).window;
  const dom = window.document;
  return { dom, window, html };
}
