import { liveAi } from "@/config/features";
import { removeTrailingSlash } from "@/utils/path";

// Backend for the live-AI prototypes, set via PUBLIC_TOOL_API at build/dev start.
// Only active with the `liveAi` feature flag; otherwise there is no backend.
// See doc/live-ai-prototypes.md.
const DEV_DEFAULT_TOOL_API = "http://localhost:8000";

export const API_BASE = liveAi
  ? removeTrailingSlash(import.meta.env.PUBLIC_TOOL_API || DEV_DEFAULT_TOOL_API)
  : null;
