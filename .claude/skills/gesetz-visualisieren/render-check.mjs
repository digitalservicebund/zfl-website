// Rendert eine .mmd-Datei aus src/content/ki-visualisierungen headless mit
// der im Repo installierten Mermaid-Version und speichert einen Screenshot.
// Aufruf aus dem Repo-Root:
//   node .claude/skills/gesetz-visualisieren/render-check.mjs <datei.mmd> <ausgabe.png>
// Chromium kann in der Sandbox nicht starten (Mach-Port-Registrierung wird
// verweigert), daher außerhalb der Sandbox ausführen.
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const [, , mmd, out] = process.argv;
if (!mmd || !out) {
  console.error("Aufruf: render-check.mjs <datei.mmd> <ausgabe.png>");
  process.exit(1);
}

const require = createRequire(import.meta.url);
const mermaidPath = require.resolve("mermaid/dist/mermaid.min.js");

// Frontmatter entfernen (wie _mmdFrontmatter.ts), {{ELI}} durch Dummy ersetzen
const src = readFileSync(mmd, "utf8")
  .replace(/^---[\s\S]*?---\n/, "")
  .replaceAll("{{ELI}}", "https://example.org");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.setContent(`<html><body><div id="c"></div></body></html>`);
await page.addScriptTag({ path: mermaidPath });
const size = await page.evaluate(async (src) => {
  // gleiche Konfiguration wie _Wizard.svelte
  mermaid.initialize({
    startOnLoad: false,
    htmlLabels: true,
    flowchart: {
      htmlLabels: true,
      wrappingWidth: /^\s*flowchart\s+(LR|RL)\b/.test(src) ? 200 : 400,
    },
  });
  const { svg } = await mermaid.render("d", src);
  document.getElementById("c").innerHTML = svg;
  const b = document.querySelector("#c svg").getBBox();
  return { width: Math.round(b.width), height: Math.round(b.height) };
}, src);
console.log(size);
await page.locator("#c svg").screenshot({ path: out });
await browser.close();
