# ADR-0001: Build-time Feature Flags via Environment Variables in Astro

Status: Accepted

Date: 2026-01-16

## Context

The Astro application requires a mechanism to enable or disable features in a controlled and low-overhead way. Feature toggles are primarily used for development, staged rollouts, and optional functionality. Feature state does not need to change at runtime without redeployment.

Astro favors build-time optimization and static analysis, making runtime feature flag evaluation unnecessary for the current requirements.

## Decision

We will implement build-time feature flags using environment variables, evaluated during the Astro build process.

Feature flags will be:

- Defined as environment variables (e.g. `FEATURE_NEW_DASHBOARD=true`)
- Centralized in a single configuration module
- Accessed through typed helper functions or constants
- Evaluated at build time using import.meta.env

Disabled features will be excluded from the final build via Astro’s dead code elimination.

## Consequences

### Positive

- Zero runtime overhead
- Fully compatible with Astro’s static and SSR builds
- Simple, transparent implementation
- Disabled code is not shipped to the client
- Easy to reason about and test

### Negative

- Enabling or disabling a feature requires a rebuild and redeployment
- Not suitable for per-user or runtime feature control

## Example

```ts
// src/config/features.ts
export const FEATURES = {
  NEW_UI: "new_ui",
  BETA_TRACKING: "beta_tracking",
} as const;
```

```astro
---
import { isEnabled } from "@/lib/featureFlags.server";

const showUI = isEnabled("NEW_UI");
---

{showUI && <NewUI />}
```

## Notes

If future requirements include runtime toggling, experimentation, or user-specific flags, this approach can be extended or replaced with a server-side or third-party feature flag service without changing feature call sites.
