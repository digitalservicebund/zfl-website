import { routes } from "@/config/routes";
import { isRouteVisible } from "./navigationItems";
import type { Route } from "./routeModel";

const HEADER_ROUTES: Route[] = [
  routes.werkzeuge,
  routes.begleitungen,
  routes.schulungen,
  routes.ueber,
];

export function getHeaderNavigation(): Route[] {
  return HEADER_ROUTES.filter(isRouteVisible);
}
