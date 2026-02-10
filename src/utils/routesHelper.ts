/// <reference types="astro/client" />

import { getCollection, type CollectionEntry } from "astro:content";

export interface SitemapFrontmatter {
  url: string;
  title?: string;
  sitemap?: boolean;
  order?: number;
}

type RouteModule = {
  frontmatter?: SitemapFrontmatter;
};

export const getAllRoutes = async (): Promise<SitemapFrontmatter[]> => {
  const modules = import.meta.glob<RouteModule>(
    "../pages/**/*.{astro,md,mdx}",
    {
      eager: true,
    },
  ) as Record<string, RouteModule>;

  const excludeList = [/sitemap\.astro/, /\/_/, /404/, /\[slug\]/];

  const staticRoutes = Object.entries(modules)
    .filter(([path]) => !excludeList.some((regex) => regex.test(path)))
    .map(([path, mod]) => {
      console.log("Processing route:", path);
      const url =
        path
          .replace("../pages", "")
          .replace(/(\/index)?\.(astro|md|mdx)$/, "") || "/";

      const title = mod.frontmatter?.title ?? "";

      return {
        url,
        title,
        order: mod.frontmatter?.order ?? 999,
        sitemap: mod.frontmatter?.sitemap !== false && !!title,
      };
    });

  // dynamic routes from content collections
  const pages = await getCollection("pages");
  const dynamicRoutes = pages.map((page: CollectionEntry<"pages">) => ({
    url: `/${page.slug}`,
    title: page.data.title ?? "",
    order: page.data.order ?? 999,
    sitemap: page.data.sitemap,
  }));

  const allRoutes = [...staticRoutes, ...dynamicRoutes]
    .filter((route) => route.sitemap)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return allRoutes;
};

export const removeTrailingSlash = (path: string) =>
  path.replace(/\/+$/, "").replace(/^$/, "/");
