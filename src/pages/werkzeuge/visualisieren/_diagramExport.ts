import firaSansBoldUrl from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Bold.woff2?url";
import firaSansRegularUrl from "@kern-ux/native/dist/fonts/fira-sans/FiraSans-Regular.woff2?url";

// Drops <a href="...">text</a> wrappers, keeping just the link text: SVG
// viewers outside the browser (Miro, Illustrator, ...) don't render
// foreignObject/HTML, so exported links must become plain SVG text.
export function stripLinks(source: string): string {
  return source.replace(/<a\b[^>]*>(.*?)<\/a>/gis, "$1");
}

// Without HTML labels, Mermaid prints <b> tags literally but renders
// **bold** in markdown strings ("`...`"), so labels with <b> are turned
// into those. Markdown strings also treat <br/> as a line break.
export function boldToMarkdown(source: string): string {
  return source.replace(
    /"([^"`]*<b>[^"`]*)"/gi,
    (_, label: string) =>
      `"\`${label.replace(/<b>\s*(.*?)\s*<\/b>/gi, "**$1**")}\`"`,
  );
}

export function parseSvg(svg: string): SVGSVGElement | null {
  const container = document.createElement("div");
  container.innerHTML = svg;
  return container.querySelector("svg");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function svgToSvgBlob(svgElement: SVGSVGElement): Blob {
  const serialized = new XMLSerializer().serializeToString(svgElement);
  return new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${serialized}`], {
    type: "image/svg+xml",
  });
}

// Renders at 2x for sharp text on high-DPI screens and when zooming in,
// capped so large diagrams stay within browser canvas size limits.
const PNG_SCALE = 2;
const MAX_CANVAS_SIDE = 16384;

// An SVG drawn as an image can't load external fonts, and KERN's rule
// that sets Fira Sans on every element doesn't reach it. So the PNG
// export embeds Fira Sans as data URLs; Mermaid's own style would
// otherwise fall back to Trebuchet.
async function fontFaceCss(weight: number, url: string): Promise<string> {
  const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
  return `@font-face { font-family: "Fira Sans"; font-weight: ${weight}; src: url("data:font/woff2;base64,${bytes.toBase64()}"); }`;
}

/**
 * Draws the SVG as a PNG. Meant for the diagram as shown on screen, HTML
 * labels included, so the PNG matches it (bold text, line height, box
 * sizes). Change highlights are styled by the page, so they don't show up.
 */
export async function svgToPngBlob(
  svgElement: SVGSVGElement,
): Promise<Blob | null> {
  const fontFaces = await Promise.all([
    fontFaceCss(400, firaSansRegularUrl),
    fontFaceCss(700, firaSansBoldUrl),
  ]);
  const fontStyle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "style",
  );
  fontStyle.textContent = `${fontFaces.join("\n")}
    svg, svg * { font-family: "Fira Sans", sans-serif !important; }`;
  svgElement.append(fontStyle);

  // Mermaid sizes the SVG with width="100%" and a max-width style, which
  // an <img> can't resolve, so fix the size to the viewBox dimensions.
  const { width, height } = svgElement.viewBox.baseVal;
  if (!width || !height) return null;
  svgElement.setAttribute("width", String(width));
  svgElement.setAttribute("height", String(height));
  svgElement.style.removeProperty("max-width");

  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    new XMLSerializer().serializeToString(svgElement),
  )}`;
  await image.decode();

  const scale = Math.min(PNG_SCALE, MAX_CANVAS_SIDE / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const context = canvas.getContext("2d");
  if (!context) return null;

  // The SVG has a transparent background
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}
