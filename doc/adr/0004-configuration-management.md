# ADR-0004: Configuration Management

Status: Accepted

Date: 2026-02-03

## Context

We need a consistent and clear way to manage configuration variables across the application. This includes environment-specific variables (e.g., for staging vs. production), public tokens, and general application constants. The configuration should be type-safe and easily accessible within the Astro framework.

## Decision

We will adopt a hybrid approach for configuration management:

1.  **Environment Variables**: All environment-specific variables, such as deployment stage (`PUBLIC_STAGE`), will be managed through `.env` files. Astro's `import.meta.env` provides type-safe access to these variables. An `.env.example` file will be maintained to document required environment variables.

2.  **Configuration Directory**: A dedicated `src/config/` directory will store non-sensitive, application-wide constants and configurations in TypeScript files. This keeps configuration organized and co-located. Examples include:
    - `stage.ts`: Logic to determine the current deployment stage.
    - `constants.ts`: General constants like contact information.
    - `posthog.ts`: Configuration for third-party services like PostHog.

    Public keys and other non-sensitive tokens for client-side services (like PostHog) may be stored directly in the relevant files under `src/config/`. To prevent warnings from secret-scanning tools, these keys will be explicitly marked with a `gitleaks:allow` comment. This acknowledges that the key is intentionally public and visible in the client-side bundle.

## Consequences

### Positive

- **Type Safety**: Using TypeScript for configuration files and Astro's environment variable handling provides end-to-end type safety.
- **Clear Separation**: A clear distinction exists between environment-specific values (`.env`) and application-level constants (`src/config/`).
- **Organization**: Grouping configuration files in `src/config/` makes them easy to find and manage.
- **Security**: Sensitive secrets are kept out of the repository by using `.env` files, while intentionally public tokens are explicitly marked.

### Negative

- **Boilerplate**: Requires creating multiple files for different configuration aspects.

## Example: Stage Configuration

**`.env.example`**:

```
PUBLIC_STAGE="development"
```

**`src/config/stage.ts`**:

```typescript
const stage = import.meta.env.PUBLIC_STAGE || "production";

export const isProduction = stage === "production";
export const isStaging = stage === "staging";
```

## Example: Public Token

**`src/config/posthog.ts`**:

```typescript
export const posthogKey = "phd_BqKtG4bqKnrrhuUrplewJAgKOWxcm9EE2W95RPYzb3e"; // gitleaks:allow
export const apiHost = "/ph-relay";
export const uiHost = "https://eu.posthog.com";
```
