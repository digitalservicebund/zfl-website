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

**Proportional Architecture (Avoiding Over-engineering):** Our requirements for the forms itself are simple: linear progression of mostly static text inputs without any complex branching logic, dynamic field arrays, or any cross-component state synchronization. Adopting a heavy UI framework (like React or Vue) to handle this would introduce unnecessary architectural complexity to solve problems native web standards can solve for us.

**Persistence && UX**: Because data is stored in `localStorage`, a user can safely close the tab or accidentally navigate away and return later to find their progress saved. Additionally, utilizing a MPA architecture ensures the browser's native "Back" button works without requiring a custom implementation.

### Drawbacks & Mitigations

**Direct Access Risk**: Because we are implementing a multi-page architecture where each form step has its own distinct URL (e.g., /steckbrief/step-3), users can manually type these URLs or use bookmarks to jump directly into the middle of the flow.
Technically, this does not cause a data persistence issue, as the individual form steps do not rely on each other's content to render. However, a user could bypass initial steps, reach the final summary page, and download the generated .docx document with missing or incomplete information without realizing they skipped required sections.
Because our Nginx server is serving static HTML and has no access to the browser's localStorage, we cannot perform state-aware redirects on the server side. To prevent users from silently generating incomplete documents, we must implement route guarding strictly on the client side via Javascript.

**Frameworkless Overhead**: By relying on vanilla JS and HTML, we don't have access to form libraries like _React Hook Form_ that handles complex validation schemas out of the box. Therefore, we will rely strictly on native HTML5 validation constraints (`required`, `pattern`, `min`, `max`) to handle validation without external libraries which covers all our usecases for input validation for now.

## Implementation

```
src/pages/steckbrief/
├── schritt-1.astro
├── schritt-2.astro
└── schritt-3.astro
└── form-persistence.js <-- Shared logic for localStorage hydration
```
