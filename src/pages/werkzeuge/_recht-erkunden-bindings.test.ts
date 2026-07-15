import { renderToDOM } from "@/utils/testUtils.ts";
import { describe, expect, it } from "vitest";
import DetailSidebar from "./_DetailSidebar.astro";
import Step1RechtBestimmen from "./_Step1RechtBestimmen.astro";
import Step2RechtErkunden from "./_Step2RechtErkunden.astro";
import { rechtErkunden } from "./_recht-erkunden-store.ts";

/*
 * Guardrail for the (necessarily) stringly-typed coupling between the Alpine
 * templates in the `_Step*`/`_DetailSidebar` partials and their behaviour in
 * `_recht-erkunden-store.ts`. Alpine expressions live in plain attribute
 * strings, so TypeScript cannot see them: renaming a store member would break
 * the UI at runtime while lint/typecheck stay green.
 *
 * This test renders each partial to static HTML and asserts that every
 * top-level identifier referenced from an Alpine directive is either a member
 * of the real store object, a locally-scoped variable (declared by `x-for` or
 * an inline `x-data="{ ... }"`), or a known Alpine/JS global. It is a fast unit
 * test (no browser), so it can run on every `pnpm test`.
 */

// Alpine magics + JS keywords/literals that may appear in expressions but are
// not store members. `rechtErkunden` is the Alpine.data name used in the page's
// root `x-data`.
const GLOBALS = new Set([
  "$el",
  "$refs",
  "$store",
  "$event",
  "$dispatch",
  "$nextTick",
  "$watch",
  "$root",
  "$data",
  "$id",
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity",
  "in",
  "of",
  "instanceof",
  "typeof",
  "new",
  "void",
  "return",
  "this",
  "rechtErkunden",
]);

const isDirective = (name: string) =>
  name.startsWith("x-") || name.startsWith("@") || name.startsWith(":");

// Remove string-literal noise while keeping the interpolated `${...}` parts of
// template literals (which do contain real references).
function stripLiterals(expr: string): string {
  let out = "";
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (c === "'" || c === '"') {
      i++;
      while (i < expr.length && expr[i] !== c) {
        if (expr[i] === "\\") i++;
        i++;
      }
      i++;
    } else if (c === "`") {
      i++;
      while (i < expr.length && expr[i] !== "`") {
        if (expr[i] === "\\") {
          i += 2;
          continue;
        }
        if (expr[i] === "$" && expr[i + 1] === "{") {
          i += 2;
          let depth = 1;
          let interior = "";
          while (i < expr.length && depth > 0) {
            if (expr[i] === "{") depth++;
            else if (expr[i] === "}") depth--;
            if (depth > 0) interior += expr[i];
            i++;
          }
          // Interpolations can themselves contain string literals.
          out += ` ${stripLiterals(interior)} `;
        } else {
          i++;
        }
      }
      i++;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

// Identifiers not accessed as a property (`.foo`) — i.e. the leading reference
// of each member chain.
function identifiers(expr: string): string[] {
  const cleaned = stripLiterals(expr);
  return cleaned.match(/(?<![\w.$])\$?[A-Za-z_][\w$]*/g) ?? [];
}

function collectXForLocals(value: string, locals: Set<string>) {
  const match = value.match(/^\s*\(?\s*([^)]*?)\s*\)?\s+(?:in|of)\s/);
  if (!match) return;
  for (const raw of match[1].split(",")) {
    const id = raw.trim();
    if (/^[A-Za-z_$][\w$]*$/.test(id)) locals.add(id);
  }
}

function collectXDataLocals(value: string, locals: Set<string>) {
  if (!value.trim().startsWith("{")) return;
  for (const m of value.matchAll(/([A-Za-z_$][\w$]*)\s*:/g)) locals.add(m[1]);
}

// Walk elements including the contents of <template> (jsdom keeps those in a
// separate DocumentFragment that querySelectorAll does not descend into).
function* walk(root: ParentNode): Generator<Element> {
  for (const el of Array.from(root.querySelectorAll("*"))) {
    yield el;
    if (el.tagName === "TEMPLATE") {
      const content = (el as HTMLTemplateElement).content;
      if (content) yield* walk(content);
    }
  }
}

const storeKeys = new Set(Object.keys(rechtErkunden()));

const partials = [
  { name: "Step 1", Component: Step1RechtBestimmen },
  { name: "Step 2", Component: Step2RechtErkunden },
  { name: "Detail sidebar", Component: DetailSidebar },
] as const;

describe("Recht erkunden Alpine bindings", () => {
  it("exposes the store surface the templates rely on", () => {
    // Sanity check so the analysis below cannot silently pass on an empty store.
    expect(storeKeys.has("matrixCell")).toBe(true);
    expect(storeKeys.has("openRelation")).toBe(true);
    expect(storeKeys.has("selectedArea")).toBe(true);
  });

  for (const { name, Component } of partials) {
    it(`only references store members from ${name}`, async () => {
      const { dom } = await renderToDOM(Component);

      const directives: { name: string; value: string }[] = [];
      const locals = new Set<string>();

      for (const el of walk(dom)) {
        for (const attr of Array.from(el.attributes)) {
          if (!isDirective(attr.name) || !attr.value) continue;
          if (attr.name === "x-for") collectXForLocals(attr.value, locals);
          if (attr.name === "x-data") collectXDataLocals(attr.value, locals);
          directives.push({ name: attr.name, value: attr.value });
        }
      }

      // Ensure the partial actually rendered interactive markup.
      expect(directives.length).toBeGreaterThan(0);

      const unknown = new Map<string, string>();
      for (const { name: attrName, value } of directives) {
        // For x-for only the iterable side can reference the store.
        const expr =
          attrName === "x-for"
            ? value.replace(/^.*?\s(?:in|of)\s/, "")
            : attrName === "x-data" && value.trim().startsWith("{")
              ? "" // inline scope object: keys are locals, values are literals
              : value;

        for (const id of identifiers(expr)) {
          if (GLOBALS.has(id) || locals.has(id) || storeKeys.has(id)) continue;
          if (!unknown.has(id)) unknown.set(id, value);
        }
      }

      expect(
        [...unknown.entries()].map(([id, expr]) => `${id}  (in: ${expr})`),
        `Undefined Alpine references in ${name}. Either the store member was ` +
          `renamed/removed or the template has a typo.`,
      ).toEqual([]);
    });
  }
});
