import type { AstroIntegration } from "astro";
import matter from "gray-matter";
import fs, { type Dirent } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { buildRoutePath } from "../src/utils/path";

type Options = {
  pagesDirs: string[];
  output?: string;
};

type RouteMeta = {
  title: string;
  order: number;
  sitemap: boolean;
  showInHeader: boolean;
  isStagingOnly: boolean;
};

type Route = RouteMeta & {
  path: string;
};

type RouteMetaKey = keyof RouteMeta;
type RouteMetaValue = string | number | boolean;
type RouteMetaInput = Partial<Record<RouteMetaKey, RouteMetaValue>>;

export function generateRoutes({
  pagesDirs,
  output = "src/config/routes.ts",
}: Options): AstroIntegration {
  let baseUrl = "";

  return {
    name: "generate-routes",
    hooks: {
      "astro:config:done": ({ config }) => {
        baseUrl = config.base;
      },
      "astro:server:setup": () => generate(pagesDirs, output, baseUrl),
      "astro:build:start": () => generate(pagesDirs, output, baseUrl),
    },
  };
}

const DEFAULT_ROUTE_ORDER = 999;
const SUPPORTED_EXTENSIONS = ["astro", "md", "mdx", "html"];
const SUPPORTED_EXTENSIONS_REGEXP = new RegExp(
  String.raw`\.(${SUPPORTED_EXTENSIONS.join("|")})$`,
);
const ROUTE_META_KEYS = [
  "title",
  "order",
  "sitemap",
  "showInHeader",
  "isStagingOnly",
] as const satisfies RouteMetaKey[];

function generate(pagesDirs: string[], outputFile: string, baseUrl: string) {
  const allFiles = pagesDirs.flatMap((dir) => {
    const absoluteDir = path.resolve(dir);
    if (!fs.existsSync(absoluteDir)) return [];

    return getFiles(absoluteDir).map((file) => ({
      file,
      dir: absoluteDir,
    }));
  });

  // 2. Process the list into routes
  const routes: Record<string, Route> = {};

  for (const { file, dir } of allFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const meta = extractMeta(file, content);

    if (!meta) continue;

    const relativePath =
      file
        .replace(dir, "")
        .replace(SUPPORTED_EXTENSIONS_REGEXP, "")
        .replace(/\/index$/, "") || "/";

    const routeKey = toRouteKey(relativePath);

    routes[routeKey] = {
      path: buildRoutePath(relativePath, baseUrl),
      ...meta,
    };
  }

  // 3. Write output
  fs.writeFileSync(path.resolve(outputFile), buildOutput(routes));
}

/**
 * Recursively retrieves all files from a directory and its subdirectories
 * that match the supported file extensions.
 * @param dir - The starting directory path.
 * @returns An array of absolute or relative strings representing the file paths.
 */
function getFiles(dir: string): string[] {
  // Read directory entries (files and folders) as Dirent objects to easily check types
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry: Dirent<string>) => {
      const full = path.join(dir, entry.name);

      // If the entry is a directory, recurse into it and flatten the resulting array
      if (entry.isDirectory()) {
        return getFiles(full);
      }

      // Only return the file path if it matches our allowed extensions
      // Otherwise, return an empty array (which flatMap will remove)
      return SUPPORTED_EXTENSIONS_REGEXP.test(entry.name) ? [full] : [];
    });
}

export function extractMeta(file: string, raw: string): RouteMeta | null {
  const data = file.endsWith(".astro")
    ? extractAstroRouteMeta(file, raw)
    : (matter(raw).data as RouteMetaInput);

  const title = typeof data.title === "string" ? data.title : undefined;
  if (!title) return null;

  return {
    title,
    sitemap: data.sitemap !== false,
    order: typeof data.order === "number" ? data.order : DEFAULT_ROUTE_ORDER,
    showInHeader: !!data.showInHeader,
    isStagingOnly: !!data.isStagingOnly,
  };
}

// Parse an Astro page's frontmatter block and return the literal route metadata fields.
function extractAstroRouteMeta(file: string, raw: string): RouteMetaInput {
  const frontmatterBlock = extractAstroFrontmatterBlock(raw);
  if (!frontmatterBlock) return {};

  const sourceFile = ts.createSourceFile(
    file,
    frontmatterBlock,
    ts.ScriptTarget.Latest,
  );

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !== "frontmatter"
      ) {
        continue;
      }

      if (
        !declaration.initializer ||
        !ts.isObjectLiteralExpression(declaration.initializer)
      ) {
        throw new Error(
          `${file}: \`frontmatter\` must be declared as a plain object literal.`,
        );
      }

      return readAstroRouteMetaObject(declaration.initializer);
    }
  }

  return {};
}

function extractAstroFrontmatterBlock(raw: string): string | null {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  return match?.[1] ?? null;
}

function readAstroRouteMetaObject(
  objectLiteral: ts.ObjectLiteralExpression,
): RouteMetaInput {
  const meta: RouteMetaInput = {};

  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue;

    const key =
      ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : null;
    if (!key || !isRouteMetaKey(key)) continue;

    const value = readLiteralValue(property.initializer);
    if (value === null) continue;

    meta[key] = value;
  }

  return meta;
}

function isRouteMetaKey(key: string): key is RouteMetaKey {
  return ROUTE_META_KEYS.includes(key as RouteMetaKey);
}

function readLiteralValue(value: ts.Expression): RouteMetaValue | null {
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isNumericLiteral(value)) return Number(value.text);

  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;

  return null;
}

// Convert page/file identifiers into stable camelCase object keys for the route registry.
export function toRouteKey(input: string): string {
  if (input === "/") return "home";
  const routeKey = input
    // Keep nested route boundaries visible in the generated key.
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment
        .replaceAll(/[^a-zA-Z0-9-_]/g, "")
        // Normalize each path segment independently before joining nested segments with `_`.
        .split(/[-_]/)
        .map((part, i) =>
          i === 0
            ? part[0].toLowerCase() + part.slice(1)
            : part[0].toUpperCase() + part.slice(1),
        )
        .join(""),
    )
    .join("_");
  // Quote anything that is not a valid JS identifier so generated code stays syntactically valid.
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(routeKey)
    ? routeKey
    : `"${routeKey}"`;
}

function escapeStringLiteral(input: string): string {
  // Escape characters (backslashes and double quotes) that would break the generated double-quoted string literal.
  return input.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function buildOutput(routes: Record<string, Route>) {
  const entries = Object.entries(routes)
    .sort(([, a], [, b]) => a.order - b.order || a.title.localeCompare(b.title))
    .map(
      ([key, { path, title, sitemap, order, showInHeader, isStagingOnly }]) => `
  ${key}: {
    path: "${escapeStringLiteral(path)}",
    title: "${escapeStringLiteral(title)}",
    sitemap: ${sitemap},
    order: ${order},
    showInHeader: ${showInHeader},
    isStagingOnly: ${isStagingOnly},
  }`,
    )
    .join(",");

  return `// ⚠️ This file is auto-generated by integrations/routeGenerator.ts — do not edit manually. ⚠️

export const routes = {${entries},
} as const;
`;
}
