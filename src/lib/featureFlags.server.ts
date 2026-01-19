import type { FEATURES } from "../config/features";

export function isEnabled(flag: keyof typeof FEATURES) {
  return import.meta.env[`FEATURE_${flag}`] === "true";
}
