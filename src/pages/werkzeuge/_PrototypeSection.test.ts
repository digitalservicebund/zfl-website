import trainingImage from "@/images/Trainings.jpg";
import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import PrototypeSection from "./_PrototypeSection.astro";

const baseProps = {
  title: "Testprototyp",
  tagline: "Eine kurze Beschreibung.",
  image: trainingImage,
  imageAlt: "Screenshot des Testprototyps",
};

async function render(props: Record<string, unknown> = {}) {
  const { dom } = await renderToDOM(PrototypeSection, {
    props: { ...baseProps, ...props },
    slots: { default: "<p>Inhalt des Prototyps</p>" },
  });
  // The wrapper is a grid with three regions: text, media and actions
  const wrapper = dom.body.firstElementChild!;
  const [text, media, actions] = [...wrapper.children];
  return { dom, wrapper, text, media, actions };
}

const hasClass = (element: Element | null | undefined, className: string) =>
  element?.classList.contains(className) ?? false;

describe("PrototypeSection text", async () => {
  const { text } = await render();

  it("shows the title as h3 and the tagline", () => {
    expect(text?.querySelector("h3")?.textContent).toBe(baseProps.title);
    expect(text?.querySelector("em")?.textContent).toBe(baseProps.tagline);
  });

  it("renders the slot content", () => {
    expect(text?.textContent).toContain("Inhalt des Prototyps");
  });
});

describe("PrototypeSection actions", () => {
  it("links to a contact email with the title as subject", async () => {
    const { actions } = await render();
    const contactLink = [...(actions?.querySelectorAll("a") ?? [])].find(
      (link) => link.textContent?.includes("Sprechen Sie uns an"),
    );
    const href = contactLink?.getAttribute("href") ?? "";
    expect(href.startsWith("mailto:")).toBe(true);
    expect(decodeURIComponent(href)).toContain(
      `subject=Interesse an: ${baseProps.title}`,
    );
  });

  it("has no prototype link without prototypeHref", async () => {
    const { actions } = await render();
    expect(actions?.querySelectorAll("a")).toHaveLength(1);
    expect(actions?.textContent).not.toContain("Zum Online-Prototypen");
  });
});

describe("PrototypeSection prototype link", async () => {
  const href = "https://example.com/prototyp";
  const { actions } = await render({ prototypeHref: href });
  const link = actions?.querySelector(`a[href="${href}"]`);

  it("opens prototypeHref in a new tab", () => {
    expect(link?.textContent).toContain("Zum Online-Prototypen");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("tells that the link opens a new tab", () => {
    // Not .kern-sr-only: KERN makes buttons containing it 48px wide (icon-only)
    expect(link?.querySelector(".kern-sr-only")).toBeNull();
    expect(link?.querySelector(".sr-only")?.textContent).toBe(
      "(öffnet in neuem Tab)",
    );
    expect(
      link
        ?.querySelector(".kern-icon--open-in-new")
        ?.getAttribute("aria-hidden"),
    ).toBe("true");
  });
});

describe("PrototypeSection image", () => {
  it("renders the image as a zoomable tile", async () => {
    const { dom, media } = await render();
    const tile = media?.querySelector("button[popovertarget]");
    expect(tile?.getAttribute("aria-label")).toBe(
      `Bild vergrößern: ${baseProps.imageAlt}`,
    );
    expect(
      tile?.querySelector(`img[alt="${baseProps.imageAlt}"]`),
    ).toBeTruthy();
    expect(
      dom.getElementById(tile?.getAttribute("popovertarget") ?? ""),
    ).toBeTruthy();
  });

  it("uses the blue tile by default", async () => {
    const { media } = await render();
    expect(hasClass(media?.querySelector("button"), "bg-darkblue-150")).toBe(
      true,
    );
  });

  it("uses the tile color from look", async () => {
    const { media } = await render({ look: "green" });
    const tile = media?.querySelector("button");
    expect(hasClass(tile, "bg-green-050")).toBe(true);
    expect(hasClass(tile, "bg-darkblue-150")).toBe(false);
  });
});

/*
  jsdom doesn't apply CSS, so these tests check the markup the grid
  relies on, not the rendered positions. The grid areas in the
  component's <style> place the regions; the reversed class swaps them.
*/
describe("PrototypeSection layout", () => {
  for (const reversed of [false, true]) {
    describe(`with reversed: ${reversed}`, async () => {
      const { wrapper, text, media, actions } = await render({ reversed });

      it("keeps text, image and actions in reading order in the markup", () => {
        expect(hasClass(text, "text")).toBe(true);
        expect(hasClass(media, "media")).toBe(true);
        expect(hasClass(actions, "actions")).toBe(true);
      });

      it(`${reversed ? "sets" : "does not set"} the reversed class`, () => {
        expect(hasClass(wrapper, "prototype")).toBe(true);
        expect(hasClass(wrapper, "reversed")).toBe(reversed);
      });

      const buttonBehaviour = reversed
        ? "starts the buttons at the text column and lets them overflow left"
        : "lets the buttons wrap across the full row";

      it(`${buttonBehaviour} when side by side`, () => {
        const buttons = actions?.firstElementChild;
        for (const className of ["md:flex", "md:justify-end"]) {
          expect(hasClass(actions, className)).toBe(reversed);
        }
        for (const className of [
          "md:min-w-full",
          "md:flex-none",
          "md:flex-nowrap",
        ]) {
          expect(hasClass(buttons, className)).toBe(reversed);
        }
        expect(hasClass(buttons, "flex-wrap")).toBe(true);
      });
    });
  }
});
