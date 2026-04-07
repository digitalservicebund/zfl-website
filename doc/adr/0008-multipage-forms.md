# 8. Architectural Strategy for Wizards in Astro

## Status

- 2026-03-27: Proposed (Draft)

## Context

The application requires a simple, linear wizard consisting of sequence of forms that primarily consists of text-based input elements. This wizard does not conclude with a traditional server-side data submission. Instead, the workflow ends in a final view that summarizes all user inputs, paired with the automated generation and download of a .docx document containing the data. This workflow necessitates a technical approach capable of reliably persisting user state across all steps of the wizard and securely handling the final document generation. This ADR should conclude how we'd like to implement a wizard with Astro.

## Considerations

Astro offers front-end framework integrations and supports a variety of popular frameworks including React, Preact, Svelte, Vue, SolidJS, and AlpineJS with official integrations.

State Persistence: Since we are frameworkless, the solution lacks a built-in global state (like Redux Store) and we need to decide how to store the state of the forms itself and the form flow.

Validation: When do we validate inputs - before proceeding to the next step or in the end?

Routing: We'd like to use the native browser behavior, where each form step has its own unique URL.

## Decisions

### Framework

We have decided to stay frameworkless (Vanilla JS or Alpine JS) to avoid the overhead of UI libraries like React or Vue. Additionally the Development Experience stays the same.

### Routing

We will implement the wizard as a Multi-Page Application (MPA), where every form is a dedicated .astro route.
Each step resides at its own URL (e.g., /steckbrief/schritt-1, /steckbrief/schritt-2).

> [!IMPORTANT]
> **To be defined:** How do we redirect the user if the form is not opened from step 1?

### State Persistence

Form input will be either saved to localStorage or hydrate form fields with existing data from localStorage.

> [!IMPORTANT]
> **To be defined:** Should we store data on next step or on Submit?

### Validation

We will use client side validation with native HTML5 validation to provide instant user feedback.

> [!WARNING]
> The user flow needs to be decided from design perspective

## File Structure

```
src/pages/steckbrief/
├── schritt-1.astro
├── schritt-2.astro
└── schritt-3.astro
└── form-persistence.js <-- Shared logic for localStorage hydration
```

## Consequences

### Benefits

Performance: No framework runtime (React/Vue) is loaded, keeping the site light.

Persistence: Because data is in localStorage, a user can close the tab and return later to find their progress saved.

UX: The "Back" button works as expected without any extra implementation

### Drawbacks & Mitigations

**Direct Access Risk**

Because we are implementing a multi-page architecture where each form step has its own distinct URL (e.g., /steckbrief/step-3), users can manually type these URLs or use bookmarks to jump directly into the middle of the flow.

Technically, this does not cause a data persistence issue, as the individual form steps do not rely on each other's content to render. However, it introduces a severe UX flaw. A user could bypass initial steps, reach the final summary page, and download the generated .docx document with missing or incomplete information without ever realizing they skipped required sections.

Because our Nginx server is serving static HTML and has no access to the browser's localStorage, we cannot perform state-aware redirects on the server side. To prevent users from silently generating incomplete documents, we must implement route guarding strictly on the client side via Javascript.
