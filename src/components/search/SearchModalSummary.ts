import type {
  HookCallback,
  Instance,
  InstanceEvent,
  PagefindSearchResult,
} from "@pagefind/component-ui";
import { getInstanceManager } from "@pagefind/component-ui";
import { getFuzzyMatch } from "./getFuzzyMatch";

// customized version of https://github.com/Pagefind/pagefind/blob/main/pagefind_ui/component/components/pagefind-summary.ts

type TypedHookCallback<T = unknown> = (arg: T) => void;

class SearchModalSummary extends HTMLElement {
  private instance: Instance | null = null;
  private term = "";
  private fuzzyKeywords: string[] = [];

  connectedCallback() {
    this.className = "pf-summary";
    const instanceName = this.getAttribute("instance") || "default";
    this.instance = getInstanceManager().getInstance(instanceName);
    this.fuzzyKeywords = this.dataset.fuzzyKeywords?.split(".") ?? []; // data-fuzzy-keywords="keyword1.keyword2.keyword3"

    this.on("search", (term: string) => (this.term = term));
    this.on("loading", () => (this.textContent = ""));
    this.on("results", this.renderResults.bind(this));
    this.on("error", this.renderError.bind(this));
  }

  private on<T>(event: InstanceEvent, cb: TypedHookCallback<T>) {
    this.instance?.on(event, cb as HookCallback, this);
  }

  private renderResults(result?: PagefindSearchResult) {
    if (!result || !this.term) return;
    const count = result.results?.length ?? 0;
    const bestProposal = getFuzzyMatch(this.term, this.fuzzyKeywords);

    this.renderResultCount(count, this.term);

    if (bestProposal) {
      this.renderSuggestion(bestProposal);
    } else if (count === 0) {
      this.renderNoResultsTips();
    }
  }

  private renderError() {
    this.innerHTML = `
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
  }

  private renderResultCount(count: number, term: string) {
    const resultsStr = count === 1 ? "Ergebnis" : "Ergebnisse";
    this.innerHTML = `
      <p>
        ${count || "Keine"} ${resultsStr} für <strong>${this.escapeHtml(term)}</strong>
      </p>`;
  }

  private renderSuggestion(suggestion: string) {
    this.innerHTML += `
      <p>
        Meinten Sie vielleicht
        <button id="alternativeTerm" class="text-link">${this.escapeHtml(suggestion)}</button>?
      </p>
    `;
    const buttonEl = this.querySelector("button#alternativeTerm");
    buttonEl?.addEventListener("click", () => this.searchTerm(suggestion));
  }

  private renderNoResultsTips() {
    this.innerHTML += `
      <ul>
        <li>Überprüfen Sie, ob alle Wörter richtig geschrieben sind</li>
        <li>Probieren Sie einen allgemeineren Suchbegriff</li>
      </ul>
    `;
  }
  private searchTerm(suggestion: string) {
    const inputEl = document.querySelector<HTMLInputElement>("input.pf-input");
    if (!inputEl) return;
    inputEl.value = suggestion;
    inputEl.focus();
    inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  }

  private escapeHtml(text: string) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
}

if (!customElements.get("search-modal-summary")) {
  customElements.define("search-modal-summary", SearchModalSummary);
}
