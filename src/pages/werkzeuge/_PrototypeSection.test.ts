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
  // MediaText renders a wrapper with two children: the text column and the media column
  const wrapper = dom.body.firstElementChild!;
  const [textColumn, mediaColumn] = [...wrapper.children];
  return { dom, wrapper, textColumn, mediaColumn };
}

const hasClass = (element: Element | null | undefined, className: string) =>
  element?.classList.contains(className) ?? false;

describe("PrototypeSection content", async () => {
  const { textColumn } = await render();

  it("shows the title as h3 and the tagline", () => {
    expect(textColumn?.querySelector("h3")?.textContent).toBe(baseProps.title);
    expect(textColumn?.querySelector("em")?.textContent).toBe(
      baseProps.tagline,
    );
  });

  it("renders the slot content", () => {
    expect(textColumn?.textContent).toContain("Inhalt des Prototyps");
  });

  it("links to a contact email with the title as subject", () => {
    const contactLink = [...(textColumn?.querySelectorAll("a") ?? [])].find(
      (link) => link.textContent?.includes("Sprechen Sie uns an"),
    );
    const href = contactLink?.getAttribute("href") ?? "";
    expect(href.startsWith("mailto:")).toBe(true);
    expect(decodeURIComponent(href)).toContain(
      `subject=Interesse an: ${baseProps.title}`,
    );
  });
});

describe("PrototypeSection prototype link", () => {
  it("is not rendered without prototypeHref", async () => {
    const { textColumn } = await render();
    expect(textColumn?.textContent).not.toContain("Zum Online-Prototypen");
  });

  it("opens prototypeHref in a new tab", async () => {
    const href = "https://example.com/prototyp";
    const { textColumn } = await render({ prototypeHref: href });
    const link = textColumn?.querySelector(`a[href="${href}"]`);
    expect(link?.textContent).toContain("Zum Online-Prototypen");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });
});

describe("PrototypeSection image", () => {
  it("renders the image as a zoomable tile", async () => {
    const { dom, mediaColumn } = await render();
    const tile = mediaColumn?.querySelector("button[popovertarget]");
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
    const { mediaColumn } = await render();
    expect(
      hasClass(mediaColumn?.querySelector("button"), "bg-darkblue-150"),
    ).toBe(true);
  });

  it("uses the tile color from look", async () => {
    const { mediaColumn } = await render({ look: "green" });
    const tile = mediaColumn?.querySelector("button");
    expect(hasClass(tile, "bg-green-050")).toBe(true);
    expect(hasClass(tile, "bg-darkblue-150")).toBe(false);
  });

  it("aligns the tile with the heading text when side by side", async () => {
    const { mediaColumn } = await render();
    expect(
      hasClass(
        mediaColumn?.querySelector("button"),
        "md:mt-(--kern-metric-baseline-heading-large-padding-top)",
      ),
    ).toBe(true);
  });
});

/*
  jsdom doesn't apply CSS, so these tests check the layout classes,
  not the rendered positions. The image is the second child, so
  flex-col-reverse puts it on top when stacked.
*/
describe("PrototypeSection layout", () => {
  for (const reversed of [false, true]) {
    describe(`with reversed: ${reversed}`, async () => {
      const { wrapper, mediaColumn } = await render({ reversed });

      it("puts the image after the text in the markup", () => {
        expect(mediaColumn?.querySelector("img")).toBeTruthy();
      });

      it("shows the image on top when stacked", () => {
        expect(hasClass(wrapper, "flex-col-reverse")).toBe(true);
        // MediaText's default flex-col must be replaced, not kept alongside
        expect(hasClass(wrapper, "flex-col")).toBe(false);
      });

      it(`shows the image on the ${reversed ? "left" : "right"} when side by side`, () => {
        expect(hasClass(wrapper, "md:flex-row")).toBe(!reversed);
        expect(hasClass(wrapper, "md:flex-row-reverse")).toBe(reversed);
      });
    });
  }
});
