# 7. Use Astro or MDX pages for content

## Status

- 2026-03-04: Accepted

## Context

Astro provides several ways of organizing content:

- `.astro`/`.md`/`.mdx`/`.html` files in the `/pages/` folder
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- external sources (e.g., a CMS)

## Decision

We will organize all our content as code files in the `pages` folder:

- `.mdx` for pages with mainly text content (e.g., [`impressum.mdx`](/src/pages/impressum.mdx))
- `.astro` for pages with a more complex HTML/component structure

### Implementation details

- `.mdx` files must specify a `layout` in their frontmatter
- Custom components can be imported and used inline in `.mdx`

```mdx
---
layout: "@/layouts/MdxLayout.astro"
title: Impressum
---

import Hero from "@/components/Hero.astro";

<Hero>
  <h1>Impressum</h1>
</Hero>
```

## Consequences

### Positive

- all content in one place
- file-based routing: each file defines a route
- shared frontmatter structure for all pages
- simple text-editing with Markdown in `.mdx` files, also for non-devs
- no CMS setup, components can be used without defining custom blocks etc.

### Negative

- content-editing only via git and requires full redeploy
- no centralized component mapping for `.mdx` (e.g., overriding default HTML elements)
- each `.mdx` has to specify a `layout` in their frontmatter

## Alternatives Considered

### Content Collections

- **Pros**: centralized component mapping and layouts for `.mdx`
- **Cons**: content in separate folders, routing boilerplate, separate frontmatter
