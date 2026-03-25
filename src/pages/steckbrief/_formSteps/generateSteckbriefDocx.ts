import bundLogoUrl from "@/images/logo/bund-logo.png?url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  SectionType,
  ShadingType,
  SimpleField,
  Table,
  TableBorders,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import type { Inputs } from "./types";

const FONT = "Arial";
// Brand colors from global.css
const COLOR_LABEL_BG = "F6F7FB"; // lavender-200
const COLOR_DIVIDER = "CFD4E5"; // lavender-700
// A4 content area: 11906 twips − 2 × 1440 margins = 9026 twips
const CONTENT_WIDTH = 9026;
const LABEL_WIDTH = 2976; // ~33%
const VALUE_WIDTH = CONTENT_WIDTH - LABEL_WIDTH; // ~67%

// ---------------------------------------------------------------------------
// Section 1 helpers — two-column table layout
// ---------------------------------------------------------------------------

function tableFieldRow(label: string, value: string): TableRow {
  const lines = (value || "").split("\n");
  return new TableRow({
    cantSplit: false,
    children: [
      new TableCell({
        verticalAlign: VerticalAlign.TOP,
        shading: { type: ShadingType.CLEAR, fill: COLOR_LABEL_BG },
        width: { size: LABEL_WIDTH, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 160, right: 120 },
        children: [
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: label, bold: true, font: FONT, size: 24 }),
            ],
          }),
        ],
      }),
      new TableCell({
        verticalAlign: VerticalAlign.TOP,
        width: { size: VALUE_WIDTH, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 160, right: 160 },
        children: lines.map(
          (line, i) =>
            new Paragraph({
              spacing: {
                before: i === 0 ? 80 : 0,
                after: i === lines.length - 1 ? 80 : 0,
              },
              children: [new TextRun({ text: line, font: FONT, size: 24 })],
            }),
        ),
      }),
    ],
  });
}

function makeContactTable(data: Inputs): Table {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [LABEL_WIDTH, VALUE_WIDTH],
    layout: TableLayoutType.FIXED,
    borders: TableBorders.NONE,
    rows: [
      tableFieldRow("Arbeitstitel", data.arbeitstitel),
      tableFieldRow("Aktenzeichen", data.aktenzeichen),
      tableFieldRow("Ressort", data.ressort),
      tableFieldRow("Referat", data.referat),
      tableFieldRow("Name", data.name),
      tableFieldRow("E-Mail Adresse", data.email),
      tableFieldRow("Telefonnummer", data.telefonnummer),
    ],
  });
}

// ---------------------------------------------------------------------------
// Sections 2–7 helpers — paragraph-only layout
// ---------------------------------------------------------------------------

function sectionHeading(title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 0, after: 320 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: FONT,
        size: 28,
        color: "000000",
      }),
    ],
  });
}

function fieldParagraphs(label: string, value: string): Paragraph[] {
  const lines = (value || "").split("\n");
  return [
    new Paragraph({
      spacing: { before: 200, after: 40 },
      children: [
        new TextRun({ text: label, bold: true, font: FONT, size: 24 }),
      ],
    }),
    ...lines.map(
      (line, i) =>
        new Paragraph({
          spacing: { before: 0, after: i === lines.length - 1 ? 160 : 0 },
          children: [new TextRun({ text: line, font: FONT, size: 24 })],
        }),
    ),
  ];
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function generateSteckbriefDocx(data: Inputs): Promise<void> {
  const logoResponse = await fetch(bundLogoUrl);
  const logoBuffer = await logoResponse.arrayBuffer();

  const dateStr = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const titleText = data.arbeitstitel
    ? `Steckbrief: ${data.arbeitstitel}`
    : "Steckbrief";

  // Clean header: compact logo + title on the left, date on the right, subtle divider
  function makeHeader(): Header {
    return new Header({
      children: [
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [6500, 2526],
          layout: TableLayoutType.FIXED,
          borders: TableBorders.NONE,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  verticalAlign: VerticalAlign.CENTER,
                  children: [
                    new Paragraph({
                      spacing: { before: 40, after: 60 },
                      children: [
                        new ImageRun({
                          data: logoBuffer,
                          transformation: { width: 54, height: 36 },
                          type: "png",
                        }),
                        new TextRun({ text: "  ", font: FONT }),
                        new TextRun({
                          text: titleText,
                          bold: true,
                          font: FONT,
                          size: 24,
                          color: "1F2937",
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: VerticalAlign.BOTTOM,
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      spacing: { before: 40, after: 60 },
                      children: [
                        new TextRun({
                          text: `Datum: ${dateStr}`,
                          font: FONT,
                          size: 18,
                          color: "6B7280",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" },
          },
          spacing: { before: 0, after: 120 },
          children: [],
        }),
      ],
    });
  }

  // Centered: "Seite X von Y"
  function makeFooter(): Footer {
    return new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 0 },
          children: [
            new TextRun({
              text: "Seite ",
              font: FONT,
              size: 18,
              color: "888888",
            }),
            new SimpleField("PAGE"),
            new TextRun({
              text: " von ",
              font: FONT,
              size: 18,
              color: "888888",
            }),
            new SimpleField("NUMPAGES"),
          ],
        }),
      ],
    });
  }

  const pageProperties = {
    page: {
      size: { width: 11906, height: 16838 },
      margin: {
        top: 1440,
        right: 1440,
        bottom: 1440,
        left: 1440,
        header: 708,
        footer: 708,
      },
    },
  };

  const nextPageProperties = { ...pageProperties, type: SectionType.NEXT_PAGE };

  const divider = new Paragraph({
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_DIVIDER },
    },
    spacing: { before: 240, after: 400 },
    children: [],
  });

  const doc = new Document({
    sections: [
      // Page 1: title + divider + Allgemeine Angaben (table layout)
      {
        properties: pageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          new Paragraph({
            spacing: { before: 480, after: 0 },
            children: [
              new TextRun({
                text: titleText,
                bold: true,
                font: FONT,
                size: 48,
              }),
            ],
          }),
          divider,
          sectionHeading("Allgemeine Angaben"),
          makeContactTable(data),
        ],
      },
      // Section: Kontext & Genese
      {
        properties: nextPageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          sectionHeading("Kontext & Genese"),
          ...fieldParagraphs("Gesetzesumfeld / Kontext", data.kontext),
        ],
      },
      // Section: Problembeschreibung
      {
        properties: nextPageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          sectionHeading("Problembeschreibung"),
          ...fieldParagraphs("Problembeschreibung", data.problembeschreibung),
        ],
      },
      // Section: Einflussfaktoren & Akteure
      {
        properties: nextPageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          sectionHeading("Einflussfaktoren & Akteure"),
          ...fieldParagraphs("Einflussfaktoren", data.einflussfaktoren),
          ...fieldParagraphs("Relevante Akteure", data.relevanteAkteure),
        ],
      },
      // Section: Vorläufige Zielsetzung
      {
        properties: nextPageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          sectionHeading("Vorläufige Zielsetzung"),
          ...fieldParagraphs("Zielsetzung", data.zielsetzung),
        ],
      },
      // Section: Vorhabensbeschreibung
      {
        properties: nextPageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          sectionHeading("Vorhabensbeschreibung"),
          ...fieldParagraphs(
            "Vorhabensbeschreibung",
            data.vorhabensbeschreibung,
          ),
          ...fieldParagraphs("Maßnahmen", data.massnahmen),
        ],
      },
      // Section: Projektplanung
      {
        properties: nextPageProperties,
        headers: { default: makeHeader() },
        footers: { default: makeFooter() },
        children: [
          sectionHeading("Projektplanung"),
          ...fieldParagraphs("Risikoeinschätzung", data.risikoeinschaetzung),
          ...fieldParagraphs("Komplexitätsgrad", data.komplexitaetsgrad),
          ...fieldParagraphs("Zeithorizont", data.zeithorizont),
          ...fieldParagraphs("Ressourcenschätzung", data.ressourcenschaetzung),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `steckbrief-${data.arbeitstitel || "export"}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
