import { isProduction } from "@/config/stage";
import { getRouteByKey, type Route } from "./routeModel";

export function getRouteLabel(route: Route) {
  return route.navLabel ?? route.title;
}

export function hasVisibleChildren(route: Route) {
  return getVisibleChildren(route).length > 0;
}

export function getVisibleChildren(route: Route) {
  return route.childKeys
    .map((childKey) => getRouteByKey(childKey))
    .filter((childRoute) => isRouteVisible(childRoute))
    .toSorted((routeA, routeB) => compareRoutesForNavigation(routeA, routeB));
}

export function isRouteVisible(route: Route) {
  return !isProduction || !route.isStagingOnly;
}

export function compareRoutesForNavigation(routeA: Route, routeB: Route) {
  const orderA = routeA.navOrder ?? Number.POSITIVE_INFINITY;
  const orderB = routeB.navOrder ?? Number.POSITIVE_INFINITY;

  return orderA !== orderB
    ? orderA - orderB
    : routeA.path.localeCompare(routeB.path);
}
