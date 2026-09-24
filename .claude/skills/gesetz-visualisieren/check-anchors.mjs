// Prüft, ob alle {{ELI}}-Links in .mmd-Dateien auf Anker-IDs zeigen, die im
// RIS-HTML des Gesetzes existieren.
// Aufruf aus dem Repo-Root:
//   node .claude/skills/gesetz-visualisieren/check-anchors.mjs <gesetz.html> <datei.mmd>...
import { readFileSync } from "node:fs";

const [, , html, ...files] = process.argv;
if (!html || files.length === 0) {
  console.error("Aufruf: check-anchors.mjs <gesetz.html> <datei.mmd>...");
  process.exit(1);
}

const ids = new Set(
  [...readFileSync(html, "utf8").matchAll(/id="([^"]+)"/g)].map((m) => m[1]),
);

let missing = 0;
for (const file of files) {
  const src = readFileSync(file, "utf8");
  // {{ELI}}#art-zN_abs-zM (Absatz) und {{ELI}}/art-zN (ganzer Paragraph)
  for (const [, anchor] of src.matchAll(/\{\{ELI\}\}[#/]([^'"\s]+)/g)) {
    if (!ids.has(anchor)) {
      console.log(`${file}: Anker fehlt im HTML: ${anchor}`);
      missing++;
    }
  }
}

if (missing) process.exit(1);
console.log(`OK: alle Anker in ${files.length} Datei(en) gefunden`);
