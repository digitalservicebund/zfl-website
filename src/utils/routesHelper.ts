export interface SitemapFrontmatter {
  url: string;
  title?: string;
  sitemap?: boolean;
  order?: number;
}

type RouteModule = {
  frontmatter?: SitemapFrontmatter;
};

export const getAllRoutes = (): SitemapFrontmatter[] => {
  const modules = import.meta.glob<RouteModule>(
    "../pages/**/*.{astro,md,mdx}",
    {
      eager: true,
    },
  );

  const excludeList = [/.*sitemap.astro/, /_.*/, /.*404/];

  const routes = Object.entries(modules)
    .filter(([path]) => !excludeList.some((regex) => regex.test(path)))
    .map(([path, mod]) => {
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
    })
    .filter((route) => route.sitemap)
    .sort((a, b) => a.order - b.order);

  routes.forEach((route) => {
    console.log(`{url: "${route.url}", title: "${route.title}"}}`);
  });

  return routes;
};
