declare const PagefindHighlight: new (options: unknown) => void;

const highlightParam = "search";

document.addEventListener("DOMContentLoaded", async () => {
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
  await import(`${base}/pagefind/pagefind-highlight.js`);
  new PagefindHighlight({
    // NOSONAR
    highlightParam,
    markOptions: {
      className: "pagefind-highlight",
      exclude: [
        "[data-pagefind-ignore]",
        "[data-pagefind-ignore] *",
        ".no-highlight *",
      ],
    },
  });
  const firstMatch = document.querySelector("mark.pagefind-highlight");
  firstMatch?.scrollIntoView({ behavior: "smooth", block: "center" });
});
