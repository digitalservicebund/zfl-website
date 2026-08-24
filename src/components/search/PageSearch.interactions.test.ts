// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import "./PageSearch";

// jsdom doesn't implement scrollIntoView; PageSearch calls it when jumping
// between matches, so it needs a no-op stub for tests to run.
Element.prototype.scrollIntoView ??= () => {};

function mountPageSearch() {
  document.body.innerHTML = `
    <main>
      <p>
        Katzen sind neugierig. Manche Katzen mögen Wasser. Katzen schlafen
        viel.
      </p>
    </main>
    <page-search>
      <button type="button" data-page-search-toggle aria-expanded="false">
        Suche
      </button>
      <form data-page-search-form hidden>
        <span data-page-search-count></span>
        <input data-page-search-input type="text" />
        <button type="button" data-page-search-prev disabled>
          Vorheriger Treffer
        </button>
        <button type="button" data-page-search-next disabled>
          Nächster Treffer
        </button>
        <button type="button" data-page-search-close>Suche schließen</button>
      </form>
    </page-search>
  `;
  return document.querySelector("page-search")!;
}

function typeQuery(root: Element, query: string) {
  const input = root.querySelector<HTMLInputElement>(
    "[data-page-search-input]",
  )!;
  input.value = query;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

// The search input is debounced by 150ms before it re-scans the page.
function waitForDebounce() {
  return new Promise((resolve) => setTimeout(resolve, 200));
}

describe("performing a search", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("highlights every match and reports the current position", async () => {
    const el = mountPageSearch();
    typeQuery(el, "Katzen");
    await waitForDebounce();

    const marks = document.querySelectorAll("mark.page-search__highlight");
    expect(marks).toHaveLength(3);
    expect(
      marks[0]?.classList.contains("page-search__highlight--current"),
    ).toBe(true);
    expect(el.querySelector("[data-page-search-count]")?.textContent).toBe(
      "1 von 3",
    );
    expect(
      el.querySelector<HTMLButtonElement>("[data-page-search-next]")?.disabled,
    ).toBe(false);
  });

  it("moves to the next match and wraps back around to the first", async () => {
    const el = mountPageSearch();
    typeQuery(el, "Katzen");
    await waitForDebounce();

    const nextButton = el.querySelector<HTMLButtonElement>(
      "[data-page-search-next]",
    )!;
    nextButton.click();
    expect(el.querySelector("[data-page-search-count]")?.textContent).toBe(
      "2 von 3",
    );

    nextButton.click();
    expect(el.querySelector("[data-page-search-count]")?.textContent).toBe(
      "3 von 3",
    );

    nextButton.click();
    expect(el.querySelector("[data-page-search-count]")?.textContent).toBe(
      "1 von 3",
    );
  });

  it("reports no matches for a query that isn't on the page", async () => {
    const el = mountPageSearch();
    typeQuery(el, "Hunde");
    await waitForDebounce();

    expect(
      document.querySelectorAll("mark.page-search__highlight"),
    ).toHaveLength(0);
    expect(el.querySelector("[data-page-search-count]")?.textContent).toBe(
      "Keine Treffer",
    );
  });

  it("removes the highlights and resets the count when closed", async () => {
    const el = mountPageSearch();
    typeQuery(el, "Katzen");
    await waitForDebounce();

    el.querySelector<HTMLButtonElement>("[data-page-search-close]")!.click();

    expect(
      document.querySelectorAll("mark.page-search__highlight"),
    ).toHaveLength(0);
    expect(
      el.querySelector<HTMLInputElement>("[data-page-search-input]")!.value,
    ).toBe("");
    expect(el.querySelector("[data-page-search-count]")?.textContent).toBe("");
  });
});
