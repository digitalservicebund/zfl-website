import type { PagefindSearchResult } from "@pagefind/component-ui";
import { getInstanceManager } from "@pagefind/component-ui";
import posthog from "posthog-js";

class SearchTracking extends HTMLElement {
  private term = "";

  connectedCallback() {
    const instanceName = this.getAttribute("instance") || "default";
    const instance = getInstanceManager().getInstance(instanceName);

    instance.on("search", (query) => {
      this.term = query as string;
    });
    instance.on("results", (result) => {
      const results = (result as PagefindSearchResult).results.length;
      this.trackSearch(results, instanceName);
    });
  }

  private readonly trackSearch = debounce(
    (results: number, instance: string) => {
      const query = this.term.trim();
      if (query.length <= 3) return;
      posthog.capture("search_input", { query, results, instance });
    },
    1000,
  );
}

if (!customElements.get("search-tracking")) {
  customElements.define("search-tracking", SearchTracking);
}

function debounce<TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: TArgs) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
