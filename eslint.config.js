import { defineConfig, globalIgnores } from "eslint/config";

import eslint from "@eslint/js";
import markdown from "@eslint/markdown";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["src/pages/**/*.astro"],
    rules: {
      "astro/no-exports-from-components": "off", // to use `export const frontmatter` w/ astro-route-generator
    },
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    extends: ["markdown/processor"],
  },
  globalIgnores([
    ".astro/",
    ".venv/",
    "dist/",
    "doc/",
    "playwright-report/",
    "test-results/",
    "README.md",
    "AGENTS.md",
  ]),
);
