# 8. Go Frameworkless for Multi-page Forms / Wizards in Astro

## Status

- 2026-03-27: Proposed

## Context

The application requires a simple, linear wizard consisting of sequence of forms that primarily consists of text-based input elements. This wizard does not conclude with a traditional server-side data submission. Instead, the workflow ends in a final view that summarizes all user inputs, paired with the automated generation and download of a `.docx` document containing the data. This workflow necessitates a technical approach capable of reliably persisting user state across all steps of the wizard and securely handling the final document generation.

### Considerations

- **Framework use:** Astro offers front-end framework integrations and supports a variety of popular frameworks including _React_, _Preact_, _Svelte_, _Vue_, _SolidJS_, and _AlpineJS_ with official integrations.
- **State Persistence:** If we go frameworkless, we don't have access to a built-in global state (like _Redux Store_) and we need to decide how to store the state of the forms itself and the form flow.
- **Validation:** When to validate inputs - before proceeding to the next step or in the end?
- **Routing:** We'd like to use the native browser behavior, where each form step has its own unique URL.

## Decisions

### Framework

We go frameworkless (vanilla JS or _AlpineJS_) to avoid the overhead of UI libraries like _React_ or _Vue_. The Developer Experience stays the same.

### State Persistence

Form input will be saved to `localStorage` and we hydrate form fields with existing data from `localStorage`.

> [!IMPORTANT]
> **To be defined:** Should we store data on next step or on Submit?

### Validation

We will use client side validation with native HTML5 validation to provide instant user feedback.

> [!WARNING]
> The user flow needs to be decided from design perspective.

### Routing

We implement the wizard as a Multi-Page Application (MPA), where every form has a dedicated `.astro` route, so that each step resides at its own URL (e.g., `/steckbrief/schritt-1`, `/steckbrief/schritt-2`).

## Consequences

### Benefits

**Right-sized architecture**: A frameworkless MPA fits the current scope (linear flow, mostly static text inputs) and avoids unnecessary complexity which would have been introduced by UI frameworks.

**Better resilience and UX**: Persisting data in localStorage lets users continue after closing the tab, and native page routing keeps browser back/forward behavior intuitive.

### Drawbacks & Mitigations

**Users can skip steps by URL**: Because each step has its own route, users may jump ahead and generate an incomplete document.

- **Mitigation**: Add client-side route guards that verify required data before allowing access to later steps or the final summary.

**No form library conveniences:**: Without React/Vue form libraries, advanced schema tooling is unavailable.

- **Mitigation**: Use native HTML5 validation (required, pattern, min, max), which is sufficient for current input requirements.

## Implementation

```
src/pages/steckbrief/
├── schritt-1.astro
├── schritt-2.astro
└── schritt-3.astro
└── form-persistence.js <-- Shared logic for localStorage hydration
```
