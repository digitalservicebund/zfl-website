import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import PageSearch from "./PageSearch.astro";

describe("PageSearch", () => {
  it("renders a toggle button and a hidden search form", async () => {
    const { dom } = await renderToDOM(PageSearch);

    const toggle = dom.querySelector("[data-page-search-toggle]");
    expect(toggle?.textContent).toContain("Suche");
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");

    const form = dom.querySelector("[data-page-search-form]");
    expect(form?.hasAttribute("hidden")).toBe(true);
  });

  it("renders an input and disabled prev/next buttons by default", async () => {
    const { dom } = await renderToDOM(PageSearch);

    expect(dom.querySelector("[data-page-search-input]")).toBeTruthy();
    expect(
      dom.querySelector("[data-page-search-prev]")?.hasAttribute("disabled"),
    ).toBe(true);
    expect(
      dom.querySelector("[data-page-search-next]")?.hasAttribute("disabled"),
    ).toBe(true);
  });

  it("only sets the keyboard-shortcut attribute when opted in", async () => {
    const { dom: withoutShortcut } = await renderToDOM(PageSearch);
    expect(
      withoutShortcut
        .querySelector("page-search")
        ?.getAttribute("keyboard-shortcut"),
    ).toBeNull();

    const { dom: withShortcut } = await renderToDOM(PageSearch, {
      props: { keyboardShortcut: true },
    });
    expect(
      withShortcut
        .querySelector("page-search")
        ?.getAttribute("keyboard-shortcut"),
    ).toBe("true");
  });
});
