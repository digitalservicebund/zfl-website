# Route management

Routes are auto-generated from page frontmatter by the `integrations/routeGenerator.ts` Astro integration. It runs at dev start and build time, writing `src/config/routes.ts`. Never edit `routes.ts` manually.

## Registering a page

Every page that should appear in the route registry needs a `frontmatter` export (`.astro`) or frontmatter block (`.mdx`):

**`.astro` pages**

```astro
---
export const frontmatter = {
  title: "My Page",
  sitemap: true,
  order: 2, // controls nav order; lower = earlier; default 999
  showInHeader: true,
  isStagingOnly: false,
};
---
```

**`.mdx` pages**

```md
---
layout: "@/layouts/MdxLayout.astro"
title: My Page
sitemap: true
order: 2
showInHeader: true
isStagingOnly: false
---
```

Pages without a `title` are ignored by the generator.

## Using routes

Import `routes` from `@/config/routes` and use `routes.<key>.path` for links:

```astro
---
import { routes } from "@/config/routes";
---

<a href={routes.schulungen.path}>{routes.schulungen.title}</a>
```

The route key is derived from the page filename in camelCase (e.g. `schulungen`, `anleitungenUndHilfsmittel`). The home page (`index.astro`) maps to `routes.home`. Child routes prefix the route key with the parent route key (e.g. `ueberUns_zahlenUndFakten`).

## Staging-only pages

Set `isStagingOnly: true` in the frontmatter to hide a page on production. Use `isStaging` from `@/config/stage` to conditionally render links to it:

```astro
---
import { isStaging } from "@/config/stage";
import { routes } from "@/config/routes";
---

{isStaging && <a href={routes.ueberUns.path}>Über uns</a>}
```
