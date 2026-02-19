import navItems, { type NavItem } from "@/config/navigation";

// TODO: find a better way to handle testing of staging routes
const isStaging = process.env.PUBLIC_STAGE === "staging";

const flatten = (items: NavItem[]): NavItem[] =>
  items
    .filter((item) => !item.isStagingOnly || isStaging) // Only include items that are on production
    .flatMap((item) => [
      item,
      ...(item.children ? flatten(item.children) : []),
    ]);

export const flatRoutes = flatten(navItems);
