export const FEATURES = {
  EXAMPLE: "example",
} as const;

const stage = import.meta.env.PUBLIC_STAGE || "production";

export const isProduction = stage === "production";
export const isDevelopment = stage === "development";
