/// <reference types="astro/client" />

export interface SitemapFrontmatter {
  url: string;
  title?: string;
  sitemap?: boolean;
  order?: number;
  showInHeader?: number;
  isStagingOnly?: boolean;
}

export type Route = {
  url: string;
  title: string;
  isStagingOnly?: boolean;
  sitemap?: boolean;
  showInHeader?: number;
  order?: number;
  children?: Route[];
};

type RouteModule = {
  frontmatter?: SitemapFrontmatter;
  url?: string;
};

const modules = import.meta.glob<RouteModule>("@/pages/**/*.{astro,md,mdx}", {
  eager: true,
});

const contentPages = import.meta.glob<RouteModule>(
  "@/content/**/*.{md,mdx,astro}",
  { eager: true },
);

export const removeTrailingSlash = (path: string) =>
  path.replace(/\/$/, "").replace(/^$/, "/");

const excludeList = [/sitemap\.astro/, /\/_/, /404/, /\[slug]/];

export const flatRoutes = [
  ...Object.entries(modules),
  ...Object.entries(contentPages),
]
  .filter(([path]) => !excludeList.some((regex) => regex.test(path)))
  .map((item) => {
    const mod = item[1];
    const title = mod.frontmatter?.title ?? "";

    return {
      url: mod.url || "/",
      title,
      order: mod.frontmatter?.order ?? 999,
      sitemap: mod.frontmatter?.sitemap !== false && !!title,
      children: [] as Route[],
      showInHeader: mod.frontmatter?.showInHeader ?? undefined,
    };
  });

flatRoutes.sort((a, b) => a.url.length - b.url.length);

export const nestedRoutes = flatRoutes.reduce((tree, page) => {
  // Find a parent where the current page's path starts with the parent's path
  // We look for the "deepest" matching parent
  const parent = flatRoutes.find(
    (p) =>
      p.url &&
      page.url !== p.url &&
      p.url !== "/" &&
      page.url.startsWith(p.url + "/"),
  );

  if (parent) {
    parent.children.push(page);
  } else {
    tree.push(page);
  }

  return tree;
}, [] as Route[]);
