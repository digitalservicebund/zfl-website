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
// A4 content area: 11906 twips − 2 × 1440 margins = 9026 twips
const CONTENT_WIDTH = 9026;
const LABEL_WIDTH = 2976; // ~33%
const VALUE_WIDTH = CONTENT_WIDTH - LABEL_WIDTH; // ~67%

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
};

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
    borders: TABLE_BORDERS,
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
    spacing: { before: 640, after: 320 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: FONT,
        size: 32,
        color: "000000",
      }),
    ],
  });
}

function fieldParagraphs(label: string, value: string): Paragraph[] {
  const lines = (value || "").split("\n");
  const labelParagraph = label
    ? [
        new Paragraph({
          spacing: { before: 200, after: 40 },
          children: [
            new TextRun({ text: label, bold: true, font: FONT, size: 24 }),
          ],
        }),
      ]
    : [];
  return [
    ...labelParagraph,
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
// Rückmeldeformular helpers — numbered Q&A layout
// ---------------------------------------------------------------------------

function feedbackQuestion(
  num: number,
  question: string,
  hint: string | null,
  answerHint: string = "",
): Paragraph[] {
  const result: Paragraph[] = [
    new Paragraph({
      spacing: { before: 320, after: 80 },
      children: [
        new TextRun({
          text: `${num}. ${question}`,
          bold: true,
          font: FONT,
          size: 24,
        }),
      ],
    }),
  ];
  if (hint) {
    result.push(
      new Paragraph({
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({ text: hint, font: FONT, size: 24, italics: true }),
        ],
      }),
    );
  }
  result.push(
    new Paragraph({
      spacing: { before: 80, after: 40 },
      children: [
        new TextRun({ text: "Antwort:", bold: true, font: FONT, size: 24 }),
        ...(answerHint
          ? [new TextRun({ text: ` ${answerHint}`, font: FONT, size: 24 })]
          : []),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 200 },
      children: [new TextRun({ text: "", font: FONT, size: 24 })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 200 },
      children: [new TextRun({ text: "", font: FONT, size: 24 })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 200 },
      children: [new TextRun({ text: "", font: FONT, size: 24 })],
    }),
  );
  return result;
}

function feedbackQuestionWithOptions(
  num: number,
  question: string,
  options: string[],
): Paragraph[] {
  return [
    new Paragraph({
      spacing: { before: 320, after: 80 },
      children: [
        new TextRun({
          text: `${num}. ${question}`,
          bold: true,
          font: FONT,
          size: 24,
        }),
      ],
    }),
    ...options.map(
      (option) =>
        new Paragraph({
          spacing: { before: 80, after: 80 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: "☐  ", font: FONT, size: 24 }),
            new TextRun({ text: option, font: FONT, size: 24 }),
          ],
        }),
    ),
    new Paragraph({ spacing: { before: 80, after: 0 }, children: [] }),
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
                          text: `Export: ${dateStr}`,
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

  const doc = new Document({
    sections: [
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
                bold: false,
                font: FONT,
                size: 56,
              }),
            ],
          }),
          sectionHeading("Allgemeine Angaben"),
          makeContactTable(data),
          sectionHeading("Kontext"),
          ...fieldParagraphs("", data.kontext),
          sectionHeading("Problembeschreibung"),
          ...fieldParagraphs("", data.problembeschreibung),
          sectionHeading("Vorläufige Zielsetzung"),
          ...fieldParagraphs("", data.zielsetzung),
          sectionHeading("Einflussfaktoren und Akteure"),
          ...fieldParagraphs("Einflussfaktoren", data.einflussfaktoren),
          ...fieldParagraphs("Relevante Akteure", data.relevanteAkteure),
          sectionHeading("Vorhabensplanung"),
          ...fieldParagraphs(
            "Vorhabensbeschreibung",
            data.vorhabensbeschreibung,
          ),
          ...fieldParagraphs("Risikoeinschätzung", data.risikoeinschaetzung),
          ...fieldParagraphs("Komplexitätsgrad", data.komplexitaetsgrad),
          ...fieldParagraphs("Zeithorizont", data.zeithorizont),
          ...fieldParagraphs("Ressourcenschätzung", data.ressourcenschaetzung),
          new Paragraph({
            pageBreakBefore: true,
            spacing: { before: 480, after: 0 },
            children: [
              new TextRun({
                text: "Rückmeldeformular",
                bold: false,
                font: FONT,
                size: 56,
              }),
            ],
          }),
          sectionHeading("Allgemeine Angaben"),
          new Table({
            width: { size: CONTENT_WIDTH, type: WidthType.DXA },
            columnWidths: [LABEL_WIDTH, VALUE_WIDTH],
            layout: TableLayoutType.FIXED,
            borders: TABLE_BORDERS,
            rows: [
              tableFieldRow("Arbeitstitel des Vorhabens", data.arbeitstitel),
              tableFieldRow("Ressort / Organisation", ""),
              tableFieldRow(
                "Ansprechperson für das Vorhaben in der Organisation des/der Rückmeldenden (Name, E-Mail-Adresse, Telefonnummer)",
                "",
              ),
            ],
          }),
          sectionHeading("In Bezug auf den Steckbrief"),
          ...feedbackQuestion(
            1,
            "Das Vorhaben wurde geprüft und hat Relevanz für den Akteur.",
            "Bitte unzutreffendes rauslöschen.",
            "ja/nein",
          ),
          ...feedbackQuestion(
            2,
            "Gibt es Ergänzungen zum Abschnitt Einflussfaktoren und externe Stakeholder?",
            null,
          ),
          ...feedbackQuestion(
            3,
            "Sind spezifische Fachbelange zu berücksichtigen?",
            "(Wenn ja, welche?)",
          ),
          ...feedbackQuestion(
            4,
            "Gibt es Schnittstellen / Synergien, z.B. hilfreiche Vorarbeiten oder ähnliche Vorhaben?",
            "(Wenn ja, welche?)",
          ),
          ...feedbackQuestion(
            5,
            "Kann ein Beratungsangebot bereitgestellt werden?",
            "(Wenn ja, wozu konkret?)",
          ),
          ...feedbackQuestionWithOptions(
            6,
            "Inwieweit soll eine Involvierung in das Vorhaben erfolgen?",
            [
              "als Mitwirkende an der Durchführung (z.B. mitprüfendes Referat)",
              "als Konsultierte in Phase II (z.B. punktuelles Feedback geben, Expertise einbringen)",
              "als Informierte zum Abschluss von Phase I, II und III",
            ],
          ),
          ...feedbackQuestion(
            7,
            "Welche Ressourcen können für eine Involvierung bereitgestellt werden?",
            "(z.B. Materialien, Infrastruktur)",
          ),
          ...feedbackQuestion(
            8,
            "Wie viel personelle Kapazitäten (in Personentagen) können bereitgestellt werden?",
            null,
          ),
          ...feedbackQuestion(
            9,
            "Es wird um Rücksprache gebeten",
            "Wenn über den Steckbrief hinaus Austauschbedarf gesehen wird. Bitte unzutreffendes rauslöschen.",
            "ja/nein",
          ),
          new Paragraph({
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" },
            },
            spacing: { before: 480, after: 240 },
            children: [],
          }),
          new Paragraph({
            spacing: { before: 0, after: 160 },
            children: [
              new TextRun({
                text: "So geht es jetzt weiter",
                bold: true,
                font: FONT,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 200 },
            children: [
              new TextRun({
                text: "Schicken Sie das ausgefüllte Rückmeldeformular an folgende Akteure:",
                font: FONT,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 120 },
            indent: { left: 360 },
            children: [
              new TextRun({
                text: "–  Zurück an das federführende Referat",
                font: FONT,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 120 },
            indent: { left: 360 },
            children: [
              new TextRun({
                text: "–  Das Zentrum für Legistik (",
                font: FONT,
                size: 24,
              }),
              new TextRun({
                text: "kontakt@zfl.bund.de",
                font: FONT,
                size: 24,
              }),
              new TextRun({ text: ")", font: FONT, size: 24 }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const sanitizedTitle = (data.arbeitstitel || "export")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("Ä", "Ae")
    .replaceAll("Ö", "Oe")
    .replaceAll("Ü", "Ue")
    .replaceAll("ß", "ss")
    .replaceAll(/\s/g, "_")
    .replaceAll(/[^a-zA-Z0-9_-]/g, "");
  a.download = `Steckbrief_${sanitizedTitle}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
