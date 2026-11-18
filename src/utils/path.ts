export const removeTrailingSlash = (path: string) =>
  path.replace(/\/$/, "").replace(/^$/, "/");

// Prefix a URL path with the site’s base path if set.
export const withBase = (path: string) =>
  (import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "") + path;

export const hasTrailingSlash = (path: string): boolean => {
  if (path === "/") {
    return false;
  }

  return path.endsWith("/");
};
