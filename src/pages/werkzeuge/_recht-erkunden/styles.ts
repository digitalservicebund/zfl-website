import { tv } from "tailwind-variants";

// Shared tv() slots for the Recht erkunden partials (see
// Step1RechtBestimmen.astro, Step2RechtErkunden.astro, DetailSidebar.astro).
export const styles = tv({
  slots: {
    stepBadge:
      "bg-cosmic-blue-base flex h-32 w-32 shrink-0 items-center justify-center rounded-full text-base leading-none font-semibold text-white",
    subStepGroup: "border-lavender-400 space-y-lg ml-16 border-l-2 pl-24",
    subStepHeading: "mb-4 flex items-center gap-10",
    countBadge:
      "bg-lavender-base text-cosmic-blue-base inline-flex w-fit items-center gap-6 rounded-full px-10 py-4 text-xs font-semibold",
    chip: "bg-lavender-base text-cosmic-blue-base inline-flex items-center gap-6 rounded-full px-10 py-4 text-left text-sm transition",
    termChip:
      "border-cosmic-blue-base text-cosmic-blue-base inline-flex items-center gap-8 rounded-full border bg-white px-12 py-6 text-left text-sm transition",
    matrixHeaderCell:
      "border-lavender-400 bg-lavender-base border-b-2 p-12 text-left align-top",
    matrixRowLabel:
      "border-lavender-400 bg-lavender-100 border-b p-12 align-top whitespace-nowrap",
    matrixCell: "border-lavender-400 border-b p-12 align-top",
    searchInput:
      "focus:outline-cosmic-blue-base border-lavender-400 w-full rounded-sm border bg-white py-10 pr-40 pl-40 transition focus:outline-2",
    lawCard:
      "group border-lavender-400 hover:border-cosmic-blue-400 flex w-full cursor-pointer flex-col items-start gap-4 rounded-sm border bg-white p-16 text-left transition",
    areaCard:
      "group flex w-full cursor-pointer flex-col items-start gap-8 rounded-sm border p-16 text-left transition",
    normRow: "flex items-start gap-12 rounded-sm border p-12 transition",
    selectedLawCard:
      "border-cosmic-blue-base bg-lavender-100 flex flex-wrap items-center justify-between gap-12 rounded-sm border p-16",
  },
});
