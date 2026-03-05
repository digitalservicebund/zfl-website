/// <reference types="astro/client" />

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
  );

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

  const allRoutes = staticRoutes
    .filter((route) => route.sitemap)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return allRoutes;
};
