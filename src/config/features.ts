// central registry for feature flags
// example: export const myFeatureFlag = !isProduction // true

import { isDevelopment, isPreview } from "./stage";

// Live-AI prototypes: always on in development (backend defaults to localhost),
// in previews only when a backend was passed in. See doc/live-ai-prototypes.md.
export const liveAi =
  isDevelopment || (isPreview && !!import.meta.env.PUBLIC_TOOL_API);
