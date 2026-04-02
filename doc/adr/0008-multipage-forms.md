# 8. Architectural Strategy for Multi-Step Forms in Astro

## Status

- 2026-03-27: Proposed (Draft)

## Context

Our application requires simple & linear multi-step forms (e.g., "Steckbrief"). We need to decide how we'd like to implement multi forms with Astro.

## Considerations

Astro offers front-end framework integrations and supports a variety of popular frameworks including React, Preact, Svelte, Vue, SolidJS, and AlpineJS with official integrations.
We have decided to stay frameworkless (Vanilla JS or Alpine JS) to align with Astro's "Zero-JS" philosophy and to avoid the overhead of heavy UI libraries like React or Vue. In addition the solution should work severless.

State Persistence: Since we are frameworkless, the solution lacks a built-in global state (like Redux Store) and we need to decide how to store the state of the forms itself and the form flow.

Validation: When do we validate inputs - before proceeding to the next step or in the end?

Routing: We'd like to use the native browser behavior, where each form step has its own unique URL.

## Decision

We will implement the multi-step form as a Multi-Page Application (MPA), where every step is a dedicated .astro route. Data will be persisted via the browser's localStorage.

### Key Technical Details

Routing: Each step resides at its own URL (e.g., /steckbrief/schritt-1, /steckbrief/schritt-2).

Data Persistency: Form input will be either saved to localStorage or hydrate form fields with existing data from localStorage.

> [!IMPORTANT]
> **To be defined:** Should we store data before going to a next step or after input?

Validation: We will use client side validation with native HTML5 validation to provide instant user feedback.

> [!WARNING]
> The user flow needs to be decided from design perspective

Guard logic:

> [!IMPORTANT]
> **To be defined:** How do we redirect the user if the form is not opened from step 1?

### File Structure

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

Resilience: Because data is in localStorage, a user can close the tab and return later to find their progress saved.

UX: The "Back" button works as expected, but transitions feel instantaneous because there is no server round-trip.

### Drawbacks & Mitigations

Direct Access Risk: A user could manually type steckbrief/form3 in the URL.

```

```
