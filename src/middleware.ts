import { allRoutes } from "@/config/routes";
import { isDevelopment, isPreview, isStaging } from "@/config/stage";
import {
  buildRoutePath,
  hasTrailingSlash,
  removeTrailingSlash,
} from "@/utils/path";
import { defineMiddleware } from "astro:middleware";

const stagingOnlyPaths = new Set<string>(
  allRoutes.filter((route) => route.isStagingOnly).map((route) => route.path),
);

const notFoundPath = buildRoutePath("/404", import.meta.env.BASE_URL);

export const onRequest = defineMiddleware((context, next) => {
  // Redirect all routes in the dev env to mirror nginx behaviour
  if (isDevelopment && hasTrailingSlash(context.url.pathname)) {
    const noTrailingSlashUrl = removeTrailingSlash(context.url.pathname);
    return context.redirect(noTrailingSlashUrl, 301);
  }

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
