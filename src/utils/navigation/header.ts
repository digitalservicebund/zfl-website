import { routes } from "@/config/routes";
import {
  isRouteVisible,
  toNavigationItem,
  type NavigationItem,
} from "./navigationItems";
import type { Route } from "./routeModel";

const HEADER_ROUTES: Route[] = [
  routes.werkzeuge,
  routes.begleitungen,
  routes.schulungen,
  routes.ueber,
];

export function getHeaderNavigation(): NavigationItem[] {
  return HEADER_ROUTES.filter(isRouteVisible).map(toNavigationItem);
}
