// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type EventHandler = (arg?: unknown) => void;

const handlers: Record<string, EventHandler> = {};

vi.mock("@pagefind/component-ui", () => ({
  getInstanceManager: () => ({
    getInstance: () => ({
      on: (event: string, cb: EventHandler) => {
        handlers[event] = cb;
      },
    }),
  }),
}));

vi.mock("./getFuzzyMatch", () => ({ getFuzzyMatch: vi.fn() }));

import { getFuzzyMatch } from "./getFuzzyMatch";
import "./SearchModalSummary";

const getFuzzyMatchMock = vi.mocked(getFuzzyMatch);

function search(term: string, results: object[]) {
  handlers["search"]?.(term);
  handlers["results"]?.({ results });
}

describe("SearchModalSummary", () => {
  let el: Element;

  beforeEach(() => {
    getFuzzyMatchMock.mockReturnValue(undefined);
    el = document.createElement("search-modal-summary");
    el.setAttribute("data-fuzzy-keywords", "Schulungen.Werkzeuge.Kontakt");
    document.body.appendChild(el);
  });

  afterEach(() => el.remove());

  describe("result count", () => {
    it("renders 'Keine Ergebnisse' for empty results", () => {
      search("Beratung", []);
      expect(el.textContent).toContain("Keine Ergebnisse");
    });

    it("renders singular 'Ergebnis' for one result", () => {
      search("Beratung", [{}]);
      expect(el.textContent).toContain("1 Ergebnis");
      expect(el.textContent).not.toContain("Ergebnisse");
    });

    it("renders plural 'Ergebnisse' for multiple results", () => {
      search("Beratung", [{}, {}]);
      expect(el.textContent).toContain("2 Ergebnisse");
    });

    it("renders the search term in a strong element", () => {
      search("Beratung", []);
      expect(el.querySelector("strong")?.textContent).toBe("Beratung");
    });

    it("escapes HTML characters in the search term", () => {
      search("<script>", []);
      expect(el.innerHTML).toContain("&lt;script&gt;");
      expect(el.innerHTML).not.toContain("<script>");
    });
  });

  describe("no-results tips", () => {
    it("shows tips when there are no results and no suggestion", () => {
      search("xyzzy", []);
      expect(el.querySelectorAll("li")).toHaveLength(2);
    });

    it("does not show tips when results exist", () => {
      search("Beratung", [{}]);
      expect(el.querySelector("li")).toBeNull();
    });
  });

  describe("data-fuzzy-keywords attribute", () => {
    it("takes keywords from data-fuzzy-keywords attribute", () => {
      search("Schluungen", []);
      expect(getFuzzyMatchMock).toHaveBeenCalledWith("Schluungen", [
        "Schulungen",
        "Werkzeuge",
        "Kontakt",
      ]);
    });
  });

  describe("suggestion", () => {
    it("renders a suggestion button instead of tips when a proposal exists", () => {
      getFuzzyMatchMock.mockReturnValue("Kontakt");
      search("kntakt", []);
      expect(el.querySelector("button#alternativeTerm")?.textContent).toBe(
        "Kontakt",
      );
      expect(el.querySelector("li")).toBeNull();
    });

    it("escapes HTML characters in the suggestion", () => {
      getFuzzyMatchMock.mockReturnValue("<Kontakt>");
      search("kntakt", []);
      expect(el.innerHTML).toContain("&lt;Kontakt&gt;");
      expect(el.querySelector("button#alternativeTerm")?.textContent).toBe(
        "<Kontakt>",
      );
    });

    it("clicking the suggestion updates the search input", () => {
      getFuzzyMatchMock.mockReturnValue("Kontakt");
      const input = document.createElement("input");
      input.className = "pf-input";
      document.body.appendChild(input);

      search("kntakt", []);
      el.querySelector<HTMLButtonElement>("button#alternativeTerm")?.click();

      expect(input.value).toBe("Kontakt");
      input.remove();
    });
  });

  describe("loading", () => {
    it("clears content on loading", () => {
      search("Beratung", [{}]);
      expect(el.textContent).not.toBe("");
      handlers["loading"]?.();
      expect(el.textContent).toBe("");
    });
  });

  describe("error", () => {
    it("renders the error alert", () => {
      handlers["error"]?.();
      expect(el.querySelector("[role='alert']")).not.toBeNull();
    });
  });
});
