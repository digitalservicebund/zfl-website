export type StepDef = { title: string };

// Defines the order of the steps; each step's own component still takes
// its own specific props, wired explicitly where it's rendered in
// _Wizard.svelte.
export const steps: StepDef[] = [
  { title: "Text" },
  { title: "Teilbereich" },
  { title: "Ergebnis" },
];
