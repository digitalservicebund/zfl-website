import { type Route, routes } from "@/config/routes";

const isStaging = process.env.PUBLIC_STAGE === "staging";

// TODO: find a better way to handle testing of staging routes
const flatten = (items: Route[]): Route[] =>
  items
    .filter((item) => !item.isStagingOnly || isStaging) // Only include items that are on production
    .flatMap((item) => [
      item,
      ...(item.children ? flatten(Object.values(item.children)) : []),
    ]);

export const flatRoutes = flatten(Object.values(routes));
