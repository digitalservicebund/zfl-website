import navItems, { type NavItem } from "@/config/navigation";

const flatten = (items: NavItem[]): NavItem[] =>
  items.flatMap((item) => [
    item,
    ...(item.children ? flatten(item.children) : []),
  ]);

export const flatRoutes = flatten(navItems);
