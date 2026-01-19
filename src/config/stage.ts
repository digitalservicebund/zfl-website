const stage = import.meta.env.PUBLIC_STAGE || "production";

export const isProduction = stage === "production";
export const isStaging = stage === "staging";
