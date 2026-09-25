import { getContext, setContext } from "svelte";
import { steps } from "./_steps.ts";
import type { LawExample, VisOption, VisType } from "./_types";

export type LawType = { id: string; label: string };
export const lawTypes = [
  { id: "own", label: "eigenes Vorhaben" },
  { id: "existing", label: "bestehendes Gesetz" },
] as const satisfies LawType[];

export class WizardState {
  currentStep = $state(1);

  selectedLawType = $state<(typeof lawTypes)[number]["id"]>("own");
  preset = $state<VisType>("flowchart");
  selectedExample = $state<LawExample>();
  draftText = $state("");
  analyzedDraftText = $state<string>();

  selectedVisOption = $state.raw<VisOption>();
  visOptions = $state.raw<VisOption[]>([]);
  visOptionsSessionId = $state<string>();
  visOptionsError = $state<string>();
  isLoadingVisOptions = $state(false);
  loadingStatusMessage = $state("");

  mermaidSource = $state("");
  summary = $state("");
  isLoading = $state(false);
  mermaidError = $state<string>();

  get visOptionsSource(): LawExample | string | undefined {
    return this.selectedLawType === "existing"
      ? this.selectedExample
      : this.analyzedDraftText;
  }

  selectLawType(id: (typeof lawTypes)[number]["id"]) {
    this.selectedExample = undefined;
    this.analyzedDraftText = undefined;
    this.selectedLawType = id;
  }

  analyzeDraft() {
    const trimmed = this.draftText.trim();
    if (!trimmed) return;
    this.analyzedDraftText = trimmed;
  }

  back() {
    this.currentStep = Math.max(1, this.currentStep - 1);
  }

  // Mirrors the auto-advance conditions in the effects in _Wizard.svelte:
  // lets the user manually re-advance after going back with the same
  // input still valid (going back doesn't re-trigger those effects since
  // they only fire when their source value changes).
  get canAdvance(): boolean {
    if (this.currentStep === 1) return !!this.visOptionsSource;
    if (this.currentStep === 2) return !!this.selectedVisOption;
    return false;
  }

  next() {
    if (!this.canAdvance) return;
    this.currentStep = Math.min(steps.length, this.currentStep + 1);
  }

  // Only resets the user's inputs: the effects in _Wizard.svelte clear the
  // loaded vis options, mermaid source and URL params once their source
  // values are gone.
  reset() {
    this.selectedLawType = "own";
    this.preset = "flowchart";
    this.selectedExample = undefined;
    this.draftText = "";
    this.analyzedDraftText = undefined;
    this.selectedVisOption = undefined;
    this.currentStep = 1;
  }
}

const WIZARD_CONTEXT_KEY = Symbol("wizard");

export function setWizardContext(state: WizardState) {
  setContext(WIZARD_CONTEXT_KEY, state);
}

export function getWizardContext(): WizardState {
  return getContext(WIZARD_CONTEXT_KEY);
}
