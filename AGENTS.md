# AGENTS.md - Agentic Coding Guidelines

This document provides guidelines for agentic coding assistants working on the Zentrum für Legistik website project.

## Project Overview

This is an Astro-based static site for Zentrum für Legistik, using:

- Astro framework with TypeScript
- Tailwind CSS with custom design tokens
- Alpine.js for client-side interactivity
- KERN UX design system integration

## Build/Lint/Test Commands

### Development

- `pnpm dev` - Start development server on localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview production build locally

### Code Quality

- `pnpm lint` - Run ESLint on all files
- `pnpm lint:fix-selected <files>` - Fix linting issues for specific files
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:check` - Check Prettier formatting
- `pnpm format:fix-selected <files>` - Format specific files with Prettier

### Testing

- `pnpm test` - Run unit tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright (requires build first)

### Running a Single Test

- Unit test: `pnpm test <filename>` (e.g., `pnpm test src/layouts/PageHeader.test.ts`)
- E2E test: `pnpm test:e2e -- --grep "<test name>"` or `pnpm test:e2e e2e/pageHeader.spec.ts`

## Code Style Guidelines

### TypeScript Configuration

- Uses `astro/tsconfigs/strict` as base configuration
- Strict type checking enabled
- Path aliases configured:
  - `@components/*` → `./src/components/*`
  - `@layouts/*` → `./src/layouts/*`
  - `@utils/*` → `./src/utils/*`
  - `@config/*` → `./src/config/*`

### Import Organization

- Imports organized automatically by `prettier-plugin-organize-imports`
- Group imports: external packages, then internal aliases, then relative imports
- Type-only imports use `import type` syntax

### Component Structure (Astro)

```astro
---
// Frontmatter: imports, types, props
interface Props {
  title: string;
  class?: string;
}

const { title, class: className } = Astro.props;
---

<!-- Template: semantic HTML with Tailwind classes -->
<div class={className}>
  <h1>{title}</h1>
  <slot />
</div>
```

### Naming Conventions

- **Components**: PascalCase (e.g., `PageHeader.astro`, `Card.tsx`)
- **Files**: kebab-case for pages/routes (e.g., `begleitungen.astro`)
- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase with descriptive names
- **CSS Classes**: kebab-case, prefixed with component name when needed

### Tailwind CSS Usage

- Uses `tailwind-variants` (tv) for component styling
- Custom design tokens: `cosmic-blue-base`, `lavender-base`, etc.
- Responsive classes: `sm:`, `md:`, `lg:` prefixes
- Utility-first approach with semantic component variants

### Error Handling

- TypeScript strict mode catches most type errors
- ESLint catches code quality issues
- Pre-commit hooks prevent commits with issues
- Use try/catch for async operations
- Log errors appropriately (console.error for development)

### Testing Patterns

#### Unit Tests (Vitest)

```typescript
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";

test("ComponentName", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Component);
  expect(result).toContain("expected content");
});
```

#### E2E Tests (Playwright)

```typescript
import { expect, test } from "@playwright/test";

test("feature description", async ({ page }) => {
  await page.goto("/route");
  await expect(page.getByRole("heading")).toContainText("Expected");
});
```

### Commit Message Conventions

- Follow conventional commits with sentence case
- Max header length: 50 characters
- No trailing period in header
- Body starts with capital letter and blank line after header

Examples:

- `Add responsive navigation menu`
- `Fix mobile menu toggle accessibility`
- `Update dependencies for security patches`

### File Organization

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layout components
├── pages/          # Route-based pages
├── utils/          # Utility functions
├── config/         # Configuration files
├── styles/         # Global styles
└── types/          # TypeScript type definitions
```

### Pre-commit Hooks

Automatically run via lefthook:

- ESLint fixes applied to staged files
- TypeScript type checking
- Prettier formatting
- Security scans (talisman, gitleaks)
- License auditing on push

### Security Considerations

- No secrets or credentials committed (talisman + gitleaks checks)
- License compliance verified for dependencies
- Environment variables loaded securely
- No inline scripts or dangerous eval usage

### Accessibility

- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### Performance

- Static generation with Astro
- Optimized images and assets
- Minimal client-side JavaScript
- Efficient Tailwind CSS purging

## Development Workflow

1. Create feature branch from main
2. Make changes with proper TypeScript types
3. Run `pnpm lint` and `pnpm typecheck` locally
4. Write/update tests as needed
5. Format code with `pnpm format:fix`
6. Commit with conventional message
7. Push and create pull request
8. CI/CD runs full test suite and builds

## Tooling Versions

- Node.js: Current LTS (see .node-version)
- pnpm: 10.28.1
- Astro: 5.16.13
- TypeScript: 5.9.3
- ESLint: 9.39.2
- Prettier: 3.8.1
- Vitest: 4.0.17
- Playwright: 1.57.0

## Common Patterns

### Component Props with Variants

```typescript
import { tv, type VariantProps } from "tailwind-variants";

interface Props extends VariantProps<typeof styles> {
  children: string;
}

export const styles = tv({
  base: "component-base-classes",
  variants: {
    size: { sm: "small-styles", lg: "large-styles" },
    variant: { primary: "primary-styles", secondary: "secondary-styles" },
  },
});
```

### Route-based Data Loading

```astro
---
// Use Astro.glob for static data
const posts = await Astro.glob("../content/*.md");
---

<!-- Render content -->{
  posts.map((post) => (
    <article>
      <h2>{post.frontmatter.title}</h2>
    </article>
  ))
}
```

### Alpine.js Integration

````astro
---
// Server-side logic
const initialState = { count: 0 };
---

<!-- Client-side interactivity -->
<div x-data={JSON.stringify(initialState)}>
  <button @click="count++">Increment</button>
  <span x-text="count"></span>
</div>
```
<parameter name="filePath"
  >/Users/basti/Projects/zentrum-fuer-legistik-webseite/AGENTS.md</parameter
>
````
