# AGENTS.md

This file provides guidance to agentic coding assistants when working with code in this repository.

## Commands

```sh
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Production build to ./dist/
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm typecheck        # TypeScript type check
pnpm format:check     # Check formatting
pnpm format:fix       # Auto-format with Prettier
pnpm test             # Unit tests (Vitest)
pnpm test <filename>  # Run specific test (e.g. pnpm test src/components/global/PageHeader.test.ts)
pnpm test:e2e         # E2E tests with Playwright (builds first)
pnpm test:e2e e2e/a11y.spec.ts           # Run specific e2e test file
pnpm test:e2e -- --grep "<test name>"    # Run e2e tests by name
```

## Architecture

**Static site** built with Astro 5, Tailwind CSS 4, Alpine.js, and MDX. Deployed as Docker/nginx.

### Content model

All content lives as files in `src/pages/` — no CMS, no Content Collections (see ADR 0007):

- `.astro` for pages with complex component structure
- `.mdx` for text-heavy pages; must specify `layout: "@/layouts/MdxLayout.astro"` in frontmatter

### Route management

`src/config/routes.ts` is **auto-generated** by the `integrations/routeGenerator.ts` Astro integration at build/dev start. It reads frontmatter metadata from all page files. Never edit `routes.ts` manually — edit the frontmatter in the page files instead.

Every page that should appear in the route registry needs frontmatter with:

```ts
export const frontmatter = {
  title: "Page Title",
  sitemap: true,
  isStagingOnly: false,
};
```

Always import routes from `@/config/routes` and use `routes.somePage.path` for internal links.

### Stage/environment configuration

Environment-specific behavior is determined at **build time** via `PUBLIC_STAGE` env var. Import from `src/config/stage.ts`:

```ts
import { isProduction, isStaging, isPreview } from "@/config/stage";
```

- `production` (default): Posthog analytics enabled
- `staging`: staging-only pages/features visible
- `preview`: GitHub Pages preview deployments with a `base` path

### Component patterns

**Styling with `tailwind-variants`**: Use `tv()` from `tailwind-variants` to define component variants. Accept `class?: string` for overrides. See `doc/tailwind-variants.md`.

**Icons**: Use `<Icon name="ic:..." />` from `astro-icon/components`. Icon set is Google Material Icons (`@iconify-json/ic`). Find icons at `icon-sets.iconify.design/ic/`. Prefix names with `ic:`.

**Layout**: All pages use `<Layout title="...">` from `src/layouts/Layout.astro`, which includes the `PageHeader`, `Footer`, and conditional Posthog analytics.

### Testing

- **Unit tests** (`*.test.ts` alongside source): Use `AstroContainer` to render Astro components — see `src/components/global/PageHeader.test.ts` for the pattern.
- **E2E tests** (`e2e/*.spec.ts`): Playwright with Chromium. Accessibility tests in `e2e/a11y.spec.ts` use `@axe-core/playwright` and run axe on all routes automatically.

### Path alias

`@/` maps to `src/` — use this for all imports within the project.

### Git hooks (lefthook)

Pre-commit/push hooks run: `commitlint` (conventional commits required), `lint`, `typecheck`, `format`, `talisman` (secret scanning), `licenses-audit`. Install with `brew install lefthook talisman && lefthook install`.

## Key docs

- `doc/adr/` — Architecture Decision Records
- `doc/routes.md` — Route management guide
- `doc/tailwind-variants.md` — `tailwind-variants` usage guide
- `doc/icons.md` — Icon usage guide
