import trainingImage from "@/images/Trainings.jpg";
import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import Image from "./Image.astro";

const alt = "Schulungssituation";

describe("Image without zoom or frame", async () => {
  const { dom } = await renderToDOM(Image, {
    props: { src: trainingImage, alt },
  });

  it("renders only the image, without a wrapper", () => {
    const children = [...dom.body.children];
    expect(children).toHaveLength(1);
    expect(children[0]?.tagName).toBe("IMG");
    expect(children[0]?.getAttribute("alt")).toBe(alt);
  });

  it("renders no zoom button, icon or dialog", () => {
    expect(dom.querySelector("button")).toBeNull();
    expect(dom.querySelector(".kern-btn")).toBeNull();
    expect(dom.querySelector("dialog")).toBeNull();
  });
});

describe("Image with frameClass", async () => {
  const { dom } = await renderToDOM(Image, {
    props: { src: trainingImage, alt, frameClass: "test-frame" },
  });

  it("wraps the image in a div with the frame class", () => {
    const frame = dom.body.firstElementChild;
    expect(frame?.tagName).toBe("DIV");
    expect(frame?.classList.contains("test-frame")).toBe(true);
    expect(frame?.querySelector(`img[alt="${alt}"]`)).toBeTruthy();
  });

  it("is not zoomable", () => {
    expect(dom.querySelector("button")).toBeNull();
    expect(dom.querySelector(".kern-btn")).toBeNull();
    expect(dom.querySelector("dialog")).toBeNull();
    expect(
      dom.body.firstElementChild?.classList.contains("cursor-zoom-in"),
    ).toBe(false);
  });
});

describe("Image with zoom", async () => {
  const { dom } = await renderToDOM(Image, {
    props: { src: trainingImage, alt, zoom: true, class: "thumbnail" },
  });

  const button = dom.querySelector("button");
  const dialog = dom.querySelector("dialog[popover]");

  it("wraps the image in a button labelled with the alt text", () => {
    expect(button).toBeTruthy();
    expect(button?.getAttribute("aria-label")).toBe(`Bild vergrößern: ${alt}`);
    expect(button?.classList.contains("cursor-zoom-in")).toBe(true);
    expect(button?.querySelector(`img[alt="${alt}"]`)).toBeTruthy();
  });

  it("shows the zoom icon, hidden from assistive technology", () => {
    const icon = button?.querySelector(".kern-btn");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("aria-hidden")).toBe("true");
  });

  it("opens a dialog with the same image", () => {
    expect(dialog).toBeTruthy();
    expect(dialog?.id).toBeTruthy();
    expect(button?.getAttribute("popovertarget")).toBe(dialog?.id);
    expect(dialog?.querySelector(`img[alt="${alt}"]`)).toBeTruthy();
  });

  it("applies image attributes to the thumbnail only", () => {
    expect(button?.querySelector("img")?.classList.contains("thumbnail")).toBe(
      true,
    );
    expect(dialog?.querySelector("img")?.classList.contains("thumbnail")).toBe(
      false,
    );
  });
});

describe("Image with zoom and frameClass", async () => {
  const { dom } = await renderToDOM(Image, {
    props: { src: trainingImage, alt, zoom: true, frameClass: "test-frame" },
  });

  it("uses the frame as the zoom button", () => {
    const button = dom.body.firstElementChild;
    expect(button?.tagName).toBe("BUTTON");
    expect(button?.classList.contains("test-frame")).toBe(true);
    expect(button?.classList.contains("cursor-zoom-in")).toBe(true);
    expect(dom.querySelectorAll("div.test-frame")).toHaveLength(0);
  });
});
