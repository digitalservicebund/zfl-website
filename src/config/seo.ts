// Relative imports only: this module is also loaded by astro.config.mjs,
// where the `@/` alias is not available.
import { removeTrailingSlash } from "../utils/path";
import { allRoutes, type Route } from "./routes";

/**
 * Pages with `sitemap: false` or `isStagingOnly: true` in their frontmatter
 * are excluded from search engines: they get a `noindex` robots tag, no
 * canonical link, and are left out of `sitemap-index.xml`.
 */
export const isNoIndexRoute = (route: Route) =>
  !route.sitemap || route.isStagingOnly;

const noIndexPaths = new Set<string>(
  allRoutes.filter(isNoIndexRoute).map((route) => route.path),
);

/**
 * Checks a URL pathname against the route registry. Pass the site's base
 * path for preview deployments, where pathnames are prefixed with it.
 * Used by Layout.astro (robots meta tag) and astro.config.mjs (sitemap).
 */
export const isNoIndexPath = (pathname: string, basePath = "/") => {
  const base = basePath.replace(/\/$/, "");
  const path = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname;
  return noIndexPaths.has(removeTrailingSlash(path));
};
