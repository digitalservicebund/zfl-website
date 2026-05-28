import type { Instance, PagefindSearchResult } from "@pagefind/component-ui";
import { getInstanceManager } from "@pagefind/component-ui";

// customized version of https://github.com/Pagefind/pagefind/blob/main/pagefind_ui/component/components/pagefind-summary.ts

class SearchModalSummary extends HTMLElement {
  instance: Instance | null = null;
  private term = "";
  private containerEl: HTMLDivElement | null = null;

  connectedCallback() {
    this.containerEl = document.createElement("div");
    this.containerEl.className = "pf-summary";
    this.appendChild(this.containerEl);

    const instanceName = this.getAttribute("instance") || "default";
    this.instance = getInstanceManager().getInstance(instanceName);
    this.register(this.instance);
  }

  private escapeHtml(text: string) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  register(instance: Instance) {
    instance.on(
      "search",
      (rawTerm) => {
        this.term = rawTerm as string;
      },
      this,
    );

    instance.on(
      "loading",
      () => {
        if (!this.containerEl) return;
        this.containerEl.textContent = "";
      },
      this,
    );

    instance.on(
      "results",
      (rawResults) => {
        if (!rawResults || !this.term || !this.containerEl) return;

        const results = rawResults as PagefindSearchResult;
        const count = results.results?.length ?? 0;

        if (count > 0) {
          const resultsStr = count === 1 ? "Ergebnis" : "Ergebnisse";
          this.containerEl.innerHTML = `<p>${count} ${resultsStr} für <strong>${this.escapeHtml(this.term)}</strong></p>`;
          return;
        }

        this.containerEl.innerHTML = `
          <p>Keine Ergebnisse für <strong>${this.escapeHtml(this.term)}</strong></p>
          <ul>
            <li>Überprüfen Sie, ob alle Wörter richtig geschrieben sind</li>
            <li>Probieren Sie einen allgemeineren Suchbegriff</li>
          </ul>
        `;
      },
      this,
    );

    instance.on("error", () => {
      if (!this.containerEl) return;
      this.containerEl.innerHTML = `
        <div class="kern-alert kern-alert--info" role="alert">
          <div class="kern-alert__header">
            <span class="kern-icon kern-icon--info" aria-hidden="true"></span>
            <span class="kern-title">Hinweis</span>
          </div>
          <div class="kern-alert__body">
            <p class="kern-body">Suche nicht verfügbar. Bitte laden Sie die Seite neu oder versuchen Sie es später noch einmal.</p>
          </div>
        </div>
      `;
    });
  }
}

if (!customElements.get("search-modal-summary")) {
  customElements.define("search-modal-summary", SearchModalSummary);
}
