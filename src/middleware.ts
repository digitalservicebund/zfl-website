import { routes } from "@/config/routes";
import { isPreview, isStaging } from "@/config/stage";
import { buildRoutePath, removeTrailingSlash } from "@/utils/path";
import { defineMiddleware } from "astro:middleware";

const stagingOnlyPaths = new Set<string>(
  Object.values(routes)
    .filter((route) => route.isStagingOnly)
    .map((route) => route.path),
);

const notFoundPath = buildRoutePath("/404", import.meta.env.BASE_URL);

export const onRequest = defineMiddleware((context, next) => {
  // Allow staging and preview environments to access staging-only pages
  if (isStaging || isPreview) {
    return next();
  }

  const currentPath = removeTrailingSlash(context.url.pathname);
  if (stagingOnlyPaths.has(currentPath)) {
    return context.redirect(notFoundPath, 302);
  }

  return next();
});
