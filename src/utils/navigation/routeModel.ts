import { routes } from "@/config/routes";
import { removeTrailingSlash } from "../path";

export type RouteMap = typeof routes;
export type RouteKey = keyof RouteMap;
export type Route = RouteMap[RouteKey];

export function getRouteByKey(routeKey: RouteKey) {
  return routes[routeKey];
}

export function getRouteByPath(pathname: string) {
  return (
    Object.values(routes).find(
      (route) => route.path === removeTrailingSlash(pathname),
    ) ?? null
  );
}

export function getParentRoute(route: Route) {
  return route.parentKey ? getRouteByKey(route.parentKey) : null;
}

export function getRouteChain(route: Route): Route[] {
  const chain: Route[] = [];
  let currentRoute: Route | null = route;

  while (currentRoute) {
    chain.unshift(currentRoute);
    currentRoute = getParentRoute(currentRoute);
  }

  return chain;
}

export function getRouteDepth(route: Route) {
  let depth = 0;
  let currentRoute = getParentRoute(route);

  while (currentRoute) {
    depth += 1;
    currentRoute = getParentRoute(currentRoute);
  }

  return depth;
}
