import { renderToDOM } from "@/utils/testUtils";
import { describe, expect, it } from "vitest";
import Modal from "./Modal.astro";

const id = "test-modal";

async function renderFrame(contentClass?: string) {
  const { dom } = await renderToDOM(Modal, {
    props: { id, contentClass },
    slots: { default: "<p>Inhalt</p>" },
  });
  const frame = dom.querySelector(`dialog#${id} > .modal`);
  expect(frame).toBeTruthy();
  return frame!;
}

const hasClass = (element: Element, className: string) =>
  element.classList.contains(className);

describe("FramedModal default classes", () => {
  it("limits the frame to the a11y width and the viewport height", async () => {
    const frame = await renderFrame();
    expect(hasClass(frame, "max-w-a11y")).toBe(true);
    expect(hasClass(frame, "max-h-svh")).toBe(true);
  });

  it("uses the named spacing tokens for padding", async () => {
    const frame = await renderFrame();
    expect(hasClass(frame, "p-md")).toBe(true);
    expect(hasClass(frame, "pb-lg")).toBe(true);
  });
});

describe("FramedModal contentClass", () => {
  // same contentClass as in src/pages/werkzeuge/ressourcen/visualisierungen.astro
  it("replaces the default max width and max height with arbitrary values", async () => {
    const frame = await renderFrame(
      "w-[1712px] max-w-[95vw] h-[926px] max-h-[95vh]",
    );
    for (const className of [
      "w-[1712px]",
      "max-w-[95vw]",
      "h-[926px]",
      "max-h-[95vh]",
    ]) {
      expect(hasClass(frame, className), className).toBe(true);
    }
    expect(hasClass(frame, "max-w-a11y")).toBe(false);
    expect(hasClass(frame, "max-h-svh")).toBe(false);
  });

  it("replaces the default max width with a container size", async () => {
    const frame = await renderFrame("max-w-5xl");
    expect(hasClass(frame, "max-w-5xl")).toBe(true);
    expect(hasClass(frame, "max-w-a11y")).toBe(false);
  });

  it("replaces all default padding with p-0", async () => {
    const frame = await renderFrame("p-0");
    expect(hasClass(frame, "p-0")).toBe(true);
    expect(hasClass(frame, "p-md")).toBe(false);
    expect(hasClass(frame, "pb-lg")).toBe(false);
  });

  it("replaces only the bottom padding with a spacing token", async () => {
    const frame = await renderFrame("pb-sm");
    expect(hasClass(frame, "pb-sm")).toBe(true);
    expect(hasClass(frame, "pb-lg")).toBe(false);
    expect(hasClass(frame, "p-md")).toBe(true);
  });

  it("keeps the other default classes in the frame", async () => {
    const frame = await renderFrame("max-w-[95vw]");
    for (const className of ["overflow-auto", "rounded-sm", "bg-white"]) {
      expect(hasClass(frame, className), className).toBe(true);
    }
  });
});

async function renderHeadless(contentClass?: string) {
  const { dom } = await renderToDOM(Modal, {
    props: { id, contentClass, headless: true, ariaLabel: "Bild schließen" },
    slots: { default: "<img alt='' />" },
  });
  const button = dom.querySelector(`dialog#${id} > button.modal`);
  expect(button).toBeTruthy();
  return button!;
}

describe("HeadlessModal classes", () => {
  it("centers the content in a close button", async () => {
    const button = await renderHeadless();
    for (const className of [
      "flex",
      "items-center",
      "justify-center",
      "cursor-zoom-out",
    ]) {
      expect(hasClass(button, className), className).toBe(true);
    }
    expect(button.getAttribute("popovertargetaction")).toBe("hide");
  });

  it("replaces the alignment with contentClass", async () => {
    const button = await renderHeadless("items-start p-md");
    expect(hasClass(button, "items-start")).toBe(true);
    expect(hasClass(button, "items-center")).toBe(false);
    expect(hasClass(button, "p-md")).toBe(true);
  });
});
