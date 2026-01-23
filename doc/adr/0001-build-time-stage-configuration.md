# ADR-0001: Build-time Stage Configuration via Environment Variables in Astro

Status: Accepted

Date: 2026-01-16

## Context

The Astro application requires a mechanism to differentiate between different deployment environments (production, staging) in a controlled and low-overhead way. Stage configuration is used for conditional behavior based on the deployment environment. Configuration state does not need to change at runtime without redeployment.

Astro favors build-time optimization and static analysis, making runtime environment detection unnecessary for the current requirements.

## Decision

We will implement build-time stage configuration using environment variables, evaluated during the Astro build process.

Stage configuration will be:

- Defined as the `PUBLIC_STAGE` environment variable (e.g., `PUBLIC_STAGE=staging`)
- Centralized in `src/config/stage.ts`
- Accessed through typed boolean constants (`isProduction`, `isStaging`)
- Evaluated at build time using `import.meta.env.PUBLIC_STAGE`

Environment-specific code will be conditionally included/excluded from the final build via Astro's dead code elimination.

## Consequences

### Positive

- Zero runtime overhead
- Fully compatible with Astro's static and SSR builds
- Simple, transparent implementation
- Environment-specific code is conditionally included/excluded from builds
- Easy to reason about and test

### Negative

- Changing stage configuration requires a rebuild and redeployment
- Not suitable for per-user or runtime environment switching

## Example

```ts
// src/config/stage.ts
const stage = import.meta.env.PUBLIC_STAGE || "production";

export const isProduction = stage === "production";
export const isStaging = stage === "staging";
```

```astro
---
import { isStaging } from "@/config/stage";
---

{isStaging && <StagingBanner />}
{isProduction && <ProductionAnalytics />}
```

## Notes

This implementation provides stage-based configuration rather than individual feature flags. If future requirements include feature toggling beyond stage differences, a separate feature flag system can be implemented alongside this stage configuration.

If future requirements include runtime toggling, experimentation, or user-specific flags, this approach can be extended or replaced with a server-side or third-party feature flag service without changing configuration call sites.
