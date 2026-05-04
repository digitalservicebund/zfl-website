export const removeTrailingSlash = (path: string) =>
  path.replace(/\/$/, "").replace(/^$/, "/");

export const buildRoutePath = (href: string, baseUrl = ""): string => {
  const normalizedBaseUrl = removeTrailingSlash(baseUrl);
  return normalizedBaseUrl === "/" ? href : `${normalizedBaseUrl}${href}`;
};

export const hasTrailingSlash = (path: string): boolean => {
  if (path === "/") {
    return false;
  }

  return path.endsWith("/");
};
