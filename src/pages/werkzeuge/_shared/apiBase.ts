// TODO: move to env/config once the backend has a stable deployment.
// Until then, user-test links can point at a tunnelled backend via
// ?api=https://<name>.trycloudflare.com, which is remembered across pages.
// Import this module on any page a user-test link may land on.
const DEFAULT_API_BASE = "http://localhost:8000";
const API_BASE_STORAGE_KEY = "zfl-api-base";

function isAllowedApiBase(value: string): boolean {
  try {
    const { protocol, hostname } = new URL(value);
    return (
      (protocol === "https:" && hostname.endsWith(".trycloudflare.com")) ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  } catch {
    return false;
  }
}

function resolveApiBase(): string {
  if (typeof window === "undefined") return DEFAULT_API_BASE;
  const fromParam = new URLSearchParams(window.location.search).get("api");
  if (fromParam && isAllowedApiBase(fromParam)) {
    const apiBase = fromParam.replace(/\/+$/, "");
    localStorage.setItem(API_BASE_STORAGE_KEY, apiBase);
    return apiBase;
  }
  const stored = localStorage.getItem(API_BASE_STORAGE_KEY);
  return stored && isAllowedApiBase(stored) ? stored : DEFAULT_API_BASE;
}

export const API_BASE = resolveApiBase();
